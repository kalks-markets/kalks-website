'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/** seconds the video's last frame takes to fade out over its first ones */
const FADE = 0.9;

/**
 * A muted video that loops without a jump (founder 2026-11-02: "the loop should run smoothly"). When it ends, its
 * last frame is held on a canvas over it, the video starts again from the beginning, and the held frame fades out
 * over the first seconds, so the end blends into the start (one file, one decoder). The file loads only when the
 * video comes near the screen and plays only while it is on screen; with reduced motion it stays on its poster.
 */
export function LoopVideo({ src, poster, ratio, label, className }: { src: string; poster: string; ratio: number; label: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const hold = useRef<HTMLCanvasElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = box.current;
    const v = vid.current;
    const c = hold.current;
    if (!el || !v || !c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    v.muted = true;
    let seen = false;
    const play = () => seen && v.play().catch(() => {});
    const ended = () => {
      c.width = v.videoWidth;
      c.height = v.videoHeight;
      c.getContext('2d')?.drawImage(v, 0, 0, c.width, c.height);
      c.style.transition = 'none';
      c.style.opacity = '1';
      v.currentTime = 0;
      play();
      // two frames later, so the held frame is painted before it starts to fade
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          c.style.transition = `opacity ${FADE}s ease-in-out`;
          c.style.opacity = '0';
        }),
      );
    };
    v.addEventListener('ended', ended);
    v.addEventListener('canplay', play);
    const near = new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: '600px 0px' });
    const view = new IntersectionObserver(
      ([e]) => {
        seen = e.isIntersecting;
        if (seen) play();
        else v.pause();
      },
      { threshold: 0.1 },
    );
    near.observe(el);
    view.observe(el);
    return () => {
      v.removeEventListener('ended', ended);
      v.removeEventListener('canplay', play);
      near.disconnect();
      view.disconnect();
    };
  }, []);

  return (
    <div ref={box} className={cn('s-loopv', className)} style={{ aspectRatio: ratio }} role="img" aria-label={label}>
      <video ref={vid} src={load ? src : undefined} poster={poster} muted playsInline preload={load ? 'auto' : 'none'} aria-hidden />
      <canvas ref={hold} aria-hidden />
    </div>
  );
}
