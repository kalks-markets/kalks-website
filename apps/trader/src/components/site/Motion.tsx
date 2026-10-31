'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { cn } from '@/lib/cn';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Lenis smooth scrolling for the whole site (off with reduced motion). In-page anchors scroll smoothly too; anything
 * marked data-lenis-prevent (the menu, the More panel, the language list) keeps its own native scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -88 }, lerp: 0.11 });
    return () => lenis.destroy();
  }, []);
  return null;
}

/** Light parallax: the content moves at about 0.85× the scroll speed while it is near the top of the page. */
export function Parallax({ children, className, speed = 0.15 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.5) return;
      el.style.transform = `translate3d(0, ${(y * speed).toFixed(1)}px, 0)`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={ref} className={cn('will-change-transform', className)}>
      {children}
    </div>
  );
}

/**
 * A number that counts up from 0 the first time it scrolls into view (1.4 s, easing out). The server renders the
 * final value, so it reads right without JS or with reduced motion; the box keeps the final width while it counts.
 */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = value.toLocaleString('en-US');
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.textContent = '0';
    let raf = 0;
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1400);
          el.textContent = Math.round(value * (1 - Math.pow(1 - k, 3))).toLocaleString('en-US');
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [value, final]);
  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', minWidth: `${final.length}ch` }}>
      {final}
    </span>
  );
}
