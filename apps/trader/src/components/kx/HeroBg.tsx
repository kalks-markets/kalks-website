'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { PHOTOS, type PhotoKey } from '@/content/photos';
import { REMOTE, cdn, cdnSet, type Remote, type RemoteKey } from '@/content/remote';

export type HeroImage = { local: PhotoKey } | { remote: RemoteKey };

/**
 * The page hero's full-bleed photo with a scrim on top; its bottom fades into the arrow field. Founder photos are
 * small, so they get a light film grain; free-licence photos come from the CDN at their full resolution through a
 * srcset (1280–3840). A slow Ken Burns (1.00 → 1.04) and a little parallax follow the scroll; static with reduced
 * motion.
 */
export function HeroBg({ image }: { image: HeroImage }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = ref.current;
    const img = box?.querySelector<HTMLElement>('.kx-ph-move');
    if (!box || !img || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height)));
      img.style.transform = `translate3d(0, ${p * 60}px, 0) scale(${1 + p * 0.04})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', on);
    };
  }, []);

  if ('remote' in image) {
    const r: Remote = REMOTE[image.remote];
    // shift < 0 widens the photo to the left (hides its left edge behind the viewport), > 0 to the right
    const sx = r.shift ?? 0;
    return (
      <div ref={ref} className="kx-ph-bg" aria-hidden>
        <div className="kx-ph-move" style={sx < 0 ? { left: `${sx * 100}%` } : sx > 0 ? { right: `${-sx * 100}%` } : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cdn(r, 1920)}
            srcSet={cdnSet(r)}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: r.pos }}
          />
        </div>
        <div className="kx-ph-scrim" />
      </div>
    );
  }
  const p = PHOTOS[image.local];
  const shift = 'shift' in p ? (p.shift as number) : 0;
  return (
    <div ref={ref} className="kx-ph-bg" aria-hidden>
      <div className="kx-ph-move" style={shift ? { right: `${-shift * 100}%` } : undefined}>
        <Image src={p.src} alt="" fill priority quality={90} sizes="100vw" className="object-cover" style={{ objectPosition: p.pos }} />
      </div>
      <div className="kx-ph-scrim" />
      <div className="kx-grain" />
    </div>
  );
}
