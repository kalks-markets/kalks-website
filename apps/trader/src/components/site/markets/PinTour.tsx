'use client';

import { useState, type ReactNode } from 'react';
import { Shot, type Pin, type ShotDef } from '@/components/site/Shot';
import type { ShotKey } from '@/content/heroes';
import { Rise } from '@/components/site/Rise';
import { cn } from '@/lib/cn';

/**
 * A screenshot with numbered pins and its legend, hovering one highlights the other (like ShotTour), with two extras:
 * - `layout="side"` (default) puts the legend beside the image in the `cols` you pass, for narrow crops;
 *   `layout="under"` puts it under the image in three columns.
 * - `scrollMin` (a Tailwind min-width class such as "min-w-[900px]") keeps a wide screenshot readable on phones: below
 *   1024 px the image keeps that width and scrolls sideways inside its own strip, so the pins do not pile up.
 */
export function PinTour({
  shot,
  pins,
  cols = 'lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]',
  flip,
  maxW,
  intro,
  outro,
  layout = 'side',
  scrollMin,
}: {
  shot: ShotKey | ShotDef;
  pins: Pin[];
  cols?: string;
  flip?: boolean;
  maxW?: string;
  intro?: ReactNode;
  outro?: ReactNode;
  layout?: 'side' | 'under';
  scrollMin?: string;
}) {
  const [on, setOn] = useState<number | null>(null);
  const media = (
    <>
      <div className={cn(scrollMin && 'no-sb -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-3 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0')}>
        <div className={cn('mx-auto w-full', maxW, scrollMin, scrollMin && 'lg:min-w-0')}>
          <Shot shot={shot} pins={pins} active={on} onPin={setOn} />
        </div>
      </div>
      {scrollMin && <p className="mt-2 text-[12.5px] text-[var(--s-tx3)] lg:hidden">Swipe sideways to see the whole screen.</p>}
    </>
  );
  const legend = (
    <ol className={cn('s-legend', layout === 'under' && 'grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3')}>
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
  if (layout === 'under')
    return (
      <div className="flex flex-col gap-12">
        <Rise>{media}</Rise>
        <Rise delay={100}>
          {intro}
          {legend}
          {outro}
        </Rise>
      </div>
    );
  return (
    <div className={cn('grid grid-cols-1 items-center gap-10 lg:gap-16', cols)}>
      <Rise className={cn('min-w-0', flip && 'lg:order-2')}>{media}</Rise>
      <Rise delay={120} className={cn(flip && 'lg:order-1')}>
        {intro}
        {legend}
        {outro}
      </Rise>
    </div>
  );
}
