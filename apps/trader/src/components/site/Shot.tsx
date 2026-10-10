'use client';

import { useState, type ReactNode } from 'react';
import { SHOTS, type ShotKey } from '@/content/heroes';
import { cn } from '@/lib/cn';
import { Rise } from './Rise';

export type Pin = { x: number; y: number; title: string; text: string };
/** a screenshot: a key of SHOTS, or a page's own image ({ src, w, h, alt }) */
export type ShotDef = { src: string; w: number; h: number; alt: string };
type ShotRef = ShotKey | ShotDef;
const resolve = (s: ShotRef): ShotDef => (typeof s === 'string' ? SHOTS[s] : s);

/** A real screenshot in a thin frame with an orange glow. `pins` (x/y in % of the image) number the parts. */
export function Shot({ shot, pins, active, onPin, className, flat, priority }: { shot: ShotRef; pins?: Pin[]; active?: number | null; onPin?: (i: number | null) => void; className?: string; flat?: boolean; priority?: boolean }) {
  const s = resolve(shot);
  return (
    <div className={cn('s-shot', flat && 'flat', className)}>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading={priority ? 'eager' : 'lazy'} decoding="async" />
        {pins?.map((p, i) => (
          <button
            key={i}
            type="button"
            className="s-pin"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            data-on={active === i}
            aria-label={`${i + 1}. ${p.title}`}
            onMouseEnter={() => onPin?.(i)}
            onMouseLeave={() => onPin?.(null)}
            onFocus={() => onPin?.(i)}
            onBlur={() => onPin?.(null)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * The detailed tour of one screen: the screenshot with numbered pins, and the numbered list explaining each part.
 * Hovering a pin highlights its line and the other way round. `side` puts the list beside (wide screens) or under it.
 */
export function ShotTour({ shot, pins, side = 'under', intro, scrollMin = 'min-w-[860px]' }: { shot: ShotRef; pins: Pin[]; side?: 'under' | 'right'; intro?: ReactNode; scrollMin?: string | null }) {
  const [on, setOn] = useState<number | null>(null);
  // on phones and tablets a wide screenshot keeps a readable width and scrolls sideways in its own strip, so the
  // numbered pins never pile up
  const media = (priority?: boolean) => (
    <>
      <div className={cn(scrollMin && 'no-sb -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] pb-3 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0')}>
        <div className={cn('w-full', scrollMin, scrollMin && 'lg:min-w-0')}>
          <Shot shot={shot} pins={pins} active={on} onPin={setOn} priority={priority} />
        </div>
      </div>
      {scrollMin && <p className="mt-2 text-[12.5px] text-[var(--s-tx3)] lg:hidden">Swipe sideways to see the whole screen.</p>}
    </>
  );
  const list = (
    <ol className={cn('s-legend', side === 'under' && 'grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3')}>
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
  if (side === 'right')
    return (
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-14">
        <Rise className="min-w-0">{media()}</Rise>
        <Rise delay={120}>
          {intro}
          {list}
        </Rise>
      </div>
    );
  return (
    <div className="flex flex-col gap-12">
      <Rise>{media(true)}</Rise>
      <Rise delay={100}>{list}</Rise>
    </div>
  );
}

/** Copy on one side, a screenshot (or anything) on the other; `flip` swaps them on wide screens. */
export function FeatureSplit({ index, eyebrow, title, text, points, action, media, flip }: { index?: string; eyebrow?: ReactNode; title: ReactNode; text?: ReactNode; points?: ReactNode; action?: ReactNode; media: ReactNode; flip?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <Rise className={cn('flex flex-col gap-6', flip && 'lg:order-2')}>
        {(index || eyebrow) && (
          <div className="flex items-center gap-4">
            {index && <span className="s-index">{index}</span>}
            {eyebrow && <span className="s-eyebrow">{eyebrow}</span>}
          </div>
        )}
        <h3 className="s-h2 !text-[clamp(30px,3.4vw,50px)]">{title}</h3>
        {text && <p className="s-lead">{text}</p>}
        {points}
        {action && <div className="pt-2">{action}</div>}
      </Rise>
      <Rise delay={120} className={cn(flip && 'lg:order-1')}>
        {media}
      </Rise>
    </div>
  );
}

/** A phone frame around the mobile screenshot. */
export function Phone({ shot = 'traderPhone', className }: { shot?: ShotRef; className?: string }) {
  const s = resolve(shot);
  return (
    <div className={cn('s-phone mx-auto', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" />
    </div>
  );
}
