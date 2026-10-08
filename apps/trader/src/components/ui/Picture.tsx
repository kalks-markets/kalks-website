import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

/**
 * A pre-encoded AVIF / WebP picture from public/images/k2 (scripts/k2-images.mjs).
 * SHARPNESS (KALKS2 §8): the image is never drawn larger than its native pixels per device pixel. `px-cap` limits
 * the rendered box to native / devicePixelRatio (--dpr is set in <head> before paint), whatever the layout asks for.
 */
export function Picture({
  name,
  widths,
  w,
  h,
  alt,
  sizes,
  className,
  imgClassName,
  priority = false,
  style,
}: {
  /** e.g. /images/k2/figure (files: figure.avif, figure-480.avif, …) */
  name: string;
  /** native width first, then the smaller encodes */
  widths: number[];
  /** native size */
  w: number;
  h: number;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  style?: CSSProperties;
}) {
  const set = (ext: string) =>
    widths
      .slice()
      .reverse()
      .map((x) => `${name}${x === widths[0] ? '' : `-${x}`}.${ext} ${x}w`)
      .join(', ');
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${name}.webp`}
        srcSet={set('webp')}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={cn('px-cap', imgClassName)}
        style={{ ['--nw' as string]: w, ['--nh' as string]: h, ...style }}
      />
    </picture>
  );
}
