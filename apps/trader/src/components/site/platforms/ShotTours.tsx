'use client';

import { useState, type ReactNode } from 'react';
import { Shot, type Pin, type ShotDef } from '@/components/site/Shot';
import type { ShotKey } from '@/content/heroes';
import { Rise } from '@/components/site/Rise';
import { cn } from '@/lib/cn';

function Legend({ pins, on, setOn, className }: { pins: Pin[]; on: number | null; setOn: (i: number | null) => void; className?: string }) {
  return (
    <ol className={cn('s-legend', className)}>
      {pins.map((p, i) => (
        <li key={i} data-on={on === i} onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)}>
          <b aria-hidden>{i + 1}</b>
          <div>
            <div className="text-[15.5px] font-semibold tracking-[-0.01em] text-white">{p.title}</div>
            <p className="mt-1 text-[14px] leading-relaxed text-[var(--s-tx2)]">{p.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * A screenshot with numbered pins and the legend that explains them.
 * - `layout="side"`: legend beside the image on wide screens (`cols` sets the split, `flip` swaps the sides).
 * - `layout="under"`: legend under the image in `legendCols` columns.
 * - `layout="card"`: the image and its legend stacked inside one card (for two tours side by side).
 * `scrollMin` (a min-width class) keeps a thin strip readable below 1024 px: the image scrolls sideways there.
 */
export function PinTour({
  shot,
  pins,
  layout = 'side',
  cols = 'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]',
  legendCols = 'sm:grid-cols-2 lg:grid-cols-3',
  flip,
  maxW,
  scrollMin,
  intro,
  outro,
  className,
}: {
  shot: ShotKey | ShotDef;
  pins: Pin[];
  layout?: 'side' | 'under' | 'card';
  cols?: string;
  legendCols?: string;
  flip?: boolean;
  maxW?: string;
  scrollMin?: string;
  intro?: ReactNode;
  outro?: ReactNode;
  className?: string;
}) {
  const [on, setOn] = useState<number | null>(null);
  const image = (
    <div className={cn('mx-auto w-full', maxW)}>
      {scrollMin ? (
        <>
          <div className={cn('no-sb max-lg:-mx-[var(--gutter)] max-lg:overflow-x-auto max-lg:px-[var(--gutter)] max-lg:pb-3', pins.some((p) => p.y < 0) ? 'max-lg:pt-9' : 'max-lg:pt-4')}>
            <div className={cn(scrollMin, 'lg:min-w-0')}>
              {/* the orange glow would be cut square by the scroller: no shadow while it scrolls */}
              <Shot shot={shot} pins={pins} active={on} onPin={setOn} className="max-lg:!shadow-none" />
            </div>
          </div>
          <p className="mt-1.5 text-[12px] text-[var(--s-tx3)] sm:hidden">Swipe sideways to see the whole screen.</p>
        </>
      ) : (
        <Shot shot={shot} pins={pins} active={on} onPin={setOn} />
      )}
    </div>
  );
  if (layout === 'card')
    return (
      <Rise className={cn('s-card flex h-full min-w-0 flex-col gap-8 p-5 sm:p-7', className)}>
        {intro && <div className="min-w-0">{intro}</div>}
        {image}
        <Legend pins={pins} on={on} setOn={setOn} />
        {outro && <div className="min-w-0">{outro}</div>}
      </Rise>
    );
  if (layout === 'under')
    return (
      <div className={cn('flex flex-col gap-10', className)}>
        <Rise className="min-w-0">{image}</Rise>
        <Rise delay={100} className="min-w-0">
          {intro && <div className="min-w-0">{intro}</div>}
          <Legend pins={pins} on={on} setOn={setOn} className={cn('grid gap-x-10', legendCols)} />
          {outro && <div className="min-w-0">{outro}</div>}
        </Rise>
      </div>
    );
  return (
    <div className={cn('grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:gap-16', cols, className)}>
      <Rise className={cn('min-w-0', flip && 'lg:order-2')}>{image}</Rise>
      <Rise delay={120} className={cn('min-w-0', flip && 'lg:order-1')}>
        {intro && <div className="min-w-0">{intro}</div>}
        <Legend pins={pins} on={on} setOn={setOn} />
        {outro && <div className="min-w-0">{outro}</div>}
      </Rise>
    </div>
  );
}

/** The phone screenshot in its frame, with numbered pins, and the legend beside it (or above it on phones). */
export function PhoneTour({ shot, pins, intro, outro, flip }: { shot: ShotDef; pins: Pin[]; intro?: ReactNode; outro?: ReactNode; flip?: boolean }) {
  const [on, setOn] = useState<number | null>(null);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
      <Rise className={cn(flip && 'lg:order-2')}>
        <div className="s-phone mx-auto">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading="lazy" decoding="async" />
            {pins.map((p, i) => (
              <button
                key={i}
                type="button"
                className="s-pin"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                data-on={on === i}
                aria-label={`${i + 1}. ${p.title}`}
                onMouseEnter={() => setOn(i)}
                onMouseLeave={() => setOn(null)}
                onFocus={() => setOn(i)}
                onBlur={() => setOn(null)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </Rise>
      <Rise delay={120} className={cn(flip && 'lg:order-1')}>
        {intro && <div className="min-w-0">{intro}</div>}
        <Legend pins={pins} on={on} setOn={setOn} />
        {outro && <div className="min-w-0">{outro}</div>}
      </Rise>
    </div>
  );
}
