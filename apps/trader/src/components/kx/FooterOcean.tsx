'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The very bottom of every page: a calm open-ocean horizon (Pexels, "Serene Open Ocean Under Clear Blue Sky" by
 * Marianna Sigov, Pexels License: free to use, no attribution needed), hotlinked until the founder approves
 * self-hosting. 1920 × 1080 (7.2 MB) on wide screens, 1280 × 720 (2.2 MB) on phones. The footer's light background melts into the sky;
 * the band is flush with the bottom of the page. The clip loads only when the footer is within ~600 px of the
 * viewport; reduced motion and Save-Data keep the still poster.
 */
const CLIP = {
  page: 'https://www.pexels.com/video/serene-open-ocean-under-clear-blue-sky-30966672/',
  video1080: 'https://videos.pexels.com/video-files/30966672/13238055_1920_1080_30fps.mp4',
  video720: 'https://videos.pexels.com/video-files/30966672/13238054_1280_720_30fps.mp4',
  poster: (w: number) => `https://images.pexels.com/videos/30966672/pexels-photo-30966672.jpeg?auto=compress&cs=tinysrgb&w=${w}`,
};

export function FooterOcean() {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const save = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (still || save) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSrc(window.innerWidth * (window.devicePixelRatio || 1) > 1400 ? CLIP.video1080 : CLIP.video720);
          io.disconnect();
        }
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (src) vid.current?.play().catch(() => {});
  }, [src]);

  return (
    <div ref={box} className="kx-ocean" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="kx-ocean-media"
        src={CLIP.poster(1920)}
        srcSet={`${CLIP.poster(960)} 960w, ${CLIP.poster(1920)} 1920w`}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
      />
      {src && <video ref={vid} className="kx-ocean-media" src={src} muted loop playsInline autoPlay preload="auto" />}
      <div className="kx-ocean-melt" />
    </div>
  );
}
