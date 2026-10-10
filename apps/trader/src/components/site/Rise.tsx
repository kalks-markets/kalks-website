'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Rises into place the first time it scrolls into view. Already in view, reduced motion or no JS: shown as is. */
export function Rise({ children, className, as: Tag = 'div', delay = 0, id }: { children: ReactNode; className?: string; as?: ElementType; delay?: number; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.classList.add('pre');
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          el.classList.remove('pre');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} id={id} className={cn('s-rise', className)} style={delay ? { ['--d' as string]: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  );
}
