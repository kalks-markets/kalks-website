import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Images the redesign can use but the site doesn't have yet. Put the file in /public and its path here; while a path
 * is empty the slot shows its fallback (an existing image) or, without one, a labelled placeholder.
 */
export const IMAGES = {
  /** Home hero figure as a transparent cut-out (PNG or WebP), 1602 × 981 px. Empty: the hero photo, faded into the gradient. */
  heroCutout: '/site/heroes/home-cutout.webp',
  /** The home page's markets block: a photo behind the whole section, edge to edge, dimmed under the tabs, the phone and
   * the tiles (founder 2026-11-02). Landscape, at least 2400 × 1200 px; a soft or motion-blurred photo reads best. Empty:
   * the plain page. */
  marketsBackdrop: '/site/options/example-band.webp',
  /** "The same terminal in your pocket.": a hand holding a phone, transparent background (the screen stays the drawn, separate layer; see POCKET_FRAME). Empty: a CSS phone frame. */
  pocketTerminalFrame: '',
} as const;

/**
 * Where the screen sits inside IMAGES.pocketTerminalFrame, in % of the frame image (scripts/measure-device-frame.mjs
 * prints these). `overlay`: the frame's screen is solid black, so the screenshots sit on top of it.
 */
export const POCKET_FRAME = { sx: '22%', sy: '4%', sw: '56%', sh: '90%', overlay: false };

export type ImageKey = keyof typeof IMAGES;

/** An image from IMAGES, its fallback, or a dashed placeholder naming the key, the recommended size and the file. */
export function ImageSlot({
  name,
  size,
  ratio,
  alt = '',
  className,
  priority,
  width,
  height,
  fallback,
}: {
  name: ImageKey;
  /** recommended size, e.g. "1200 × 1400 px" */
  size: string;
  /** CSS aspect ratio of the placeholder, e.g. "6 / 7" */
  ratio: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  /** the file's own pixel size, so the browser reserves the box before it loads */
  width?: number;
  height?: number;
  fallback?: ReactNode;
}) {
  const path = IMAGES[name];
  if (path)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={path} alt={alt} width={width} height={height} className={className} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
    );
  if (fallback) return <>{fallback}</>;
  return (
    <div className={cn('s-slot', className)} style={{ aspectRatio: ratio }} role="img" aria-label={`Image placeholder: ${name}`}>
      <span>
        <b>{name}</b>
        <br />
        {size}
        <br />
        IMAGES.{name} in components/site/ImageSlot.tsx
      </span>
    </div>
  );
}
