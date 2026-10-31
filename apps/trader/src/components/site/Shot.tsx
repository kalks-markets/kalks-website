'use client';

import { useState, type ReactNode } from 'react';
import { SHOTS, type ShotKey } from '@/content/heroes';
import type { SiteImage } from '@/lib/content';
import { cn } from '@/lib/cn';
import { Rise } from './Rise';
import { Label } from './ui';
import { useShotOverrides } from './ContentContext';
import { ThemedImage } from './ThemedImage';

export type Pin = { x: number; y: number; title: string; text: string };
/**
 * a screenshot: a key of SHOTS, or a page's own image ({ src, w, h, alt }). `key` (SHOTS / PSHOTS keys) lets the
 * content service replace it (shots.<key>); `dark` is an optional dark-theme file.
 */
export type ShotDef = SiteImage & { key?: string };
export type ShotRef = ShotKey | ShotDef;

/** the screenshot, or its replacement from the content service */
export function useShot(s: ShotRef): ShotDef {
  const overrides = useShotOverrides();
  const def: ShotDef = typeof s === 'string' ? { ...SHOTS[s], key: s } : s;
  return (def.key && overrides[def.key]) || def;
}

/** Screen shapes of a full-screen Mac screenshot (16:10 up to the notched 14"/16"); outside it the image is a crop. */
const MAC_MIN = 1.45;
const MAC_MAX = 1.7;
const MAC_SCREEN = 1.6;

/**
 * A real screenshot on a MacBook (founder 2026-10-31). A full-screen Mac screenshot fills the screen; a crop sits on
 * it as an app window over a Kalks desktop until its Mac screenshot replaces it. `pins` (x/y in % of the image) number
 * the parts; `flat` drops the glow (inside cards).
 */
export function Shot({ shot, pins, active, onPin, className, flat, priority }: { shot: ShotRef; pins?: Pin[]; active?: number | null; onPin?: (i: number | null) => void; className?: string; flat?: boolean; priority?: boolean }) {
  const s = useShot(shot);
  const ar = s.w && s.h ? s.w / s.h : MAC_SCREEN;
  const full = ar >= MAC_MIN && ar <= MAC_MAX;
  // a crop fits in 92% x 86% of the screen
  const win = full
    ? undefined
    : {
        width: `${Math.min(92, (86 * ar) / MAC_SCREEN)}%`,
        aspectRatio: `${ar}`,
      };
  return (
    <div className={cn('s-mac', flat && 'flat', className)}>
      <div className="s-mac-lid">
        <div className="s-mac-bezel">
          <i className="s-mac-cam" aria-hidden />
          <div className={cn('s-mac-screen', !full && 'desk')} style={{ aspectRatio: `${full ? ar : MAC_SCREEN}` }}>
            <div className={cn('s-mac-win relative', full && 'full')} style={win}>
              <ThemedImage image={s} sizes="(min-width: 1024px) 60vw, 100vw" loading={priority ? 'eager' : 'lazy'} decoding="async" />
              <Pins pins={pins} active={active} onPin={onPin} />
            </div>
          </div>
        </div>
      </div>
      <div className="s-mac-base" aria-hidden />
    </div>
  );
}

/** numbered pins over a screenshot, x/y in % of the image */
function Pins({ pins, active, onPin }: { pins?: Pin[]; active?: number | null; onPin?: (i: number | null) => void }) {
  return (
    <>
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
    </>
  );
}

/** Screen shapes of a full-screen iPhone screenshot (1179 x 2556 and its kin); outside it the image is a crop. */
const IPHONE_MIN = 0.43;
const IPHONE_MAX = 0.5;
const IPHONE_SCREEN = 1179 / 2556;

/** The account bar (top 96 px) and the tab bar (bottom 116 px) of the 780 x 1688 phone screenshot (SHOTS.traderPhone). */
const PHONE_HEAD = 96;
const PHONE_TABS = 116;

/**
 * A screenshot on an iPhone (founder 2026-10-31). A full-screen iPhone screenshot fills the screen; a crop (the order
 * ticket) fills it as an app page between the phone app's account bar and tab bar (founder 2026-11-01), until its
 * iPhone screenshot replaces it. `trim` cuts that many source pixels off each edge of a crop (a dialog's own border);
 * `focus` outlines one part of the screenshot (x/y/w/h in % of the image shown).
 */
export function IPhone({ shot, pins, active, onPin, className, trim = 0, focus }: { shot: ShotRef; pins?: Pin[]; active?: number | null; onPin?: (i: number | null) => void; className?: string; trim?: number; focus?: { x: number; y: number; w: number; h: number } }) {
  const s = useShot(shot);
  const app = useShot('traderPhone');
  const ar = s.w && s.h ? s.w / s.h : IPHONE_SCREEN;
  const full = ar >= IPHONE_MIN && ar <= IPHONE_MAX;
  const cw = (s.w ?? 0) - 2 * trim;
  const ch = (s.h ?? 0) - 2 * trim;
  const bar = (h: number, at: 'top' | 'bottom') => <div className="s-iph-bar" style={{ aspectRatio: `${app.w ?? 780} / ${h}`, backgroundImage: `url(${app.src})`, backgroundPosition: `center ${at}` }} aria-hidden />;
  const mark = focus && <i className="s-iph-focus" style={{ left: `${focus.x}%`, top: `${focus.y}%`, width: `${focus.w}%`, height: `${focus.h}%` }} aria-hidden />;
  return (
    <div className={cn('s-iph mx-auto', className)}>
      <div className="s-iph-bezel">
        <div className="s-iph-screen" style={{ aspectRatio: `${full ? ar : IPHONE_SCREEN}` }}>
          {full ? (
            <div className="relative">
              <ThemedImage image={s} sizes="340px" loading="lazy" decoding="async" />
              {mark}
              <Pins pins={pins} active={active} onPin={onPin} />
            </div>
          ) : (
            <div className="s-iph-page">
              <div className="s-iph-status" aria-hidden>
                <b>9:41</b>
                <svg viewBox="0 0 64 12" fill="currentColor">
                  <rect x="0" y="8" width="3" height="4" rx="1" />
                  <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                  <rect x="10" y="3" width="3" height="9" rx="1" />
                  <rect x="15" y="0.5" width="3" height="11.5" rx="1" />
                  <path d="M30 3.2a9 9 0 0 1 12 0l-1.4 1.5a7 7 0 0 0-9.2 0zM32.6 6a5 5 0 0 1 6.8 0L36 9.6z" />
                  <rect x="46.5" y="1" width="15" height="10" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.45" />
                  <rect x="48.2" y="2.7" width="11.6" height="6.6" rx="1.6" />
                  <rect x="62.5" y="4.2" width="1.5" height="3.6" rx="0.75" fillOpacity="0.45" />
                </svg>
              </div>
              {bar(PHONE_HEAD, 'top')}
              <div className="s-iph-crop relative" style={{ aspectRatio: `${cw} / ${ch}` }}>
                <ThemedImage image={s} sizes="340px" loading="lazy" decoding="async" style={{ width: `${(100 * (s.w ?? 0)) / cw}%`, margin: `${(-100 * trim) / cw}%` }} />
                {mark}
                <Pins pins={pins} active={active} onPin={onPin} />
              </div>
              <div className="s-iph-fill" />
              {bar(PHONE_TABS, 'bottom')}
            </div>
          )}
          <i className="s-iph-island" aria-hidden />
          <i className="s-iph-home" aria-hidden />
        </div>
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

/** Copy on one side, a screenshot (or anything) on the other; `flip` swaps them on wide screens, `framed` rules the points and centres the picture. */
export function FeatureSplit({ index, eyebrow, title, text, points, action, media, flip, framed }: { index?: string; eyebrow?: ReactNode; title: ReactNode; text?: ReactNode; points?: ReactNode; action?: ReactNode; media: ReactNode; flip?: boolean; framed?: boolean }) {
  return (
    <div className={cn('grid items-center gap-10 lg:grid-cols-2', framed ? 'lg:gap-14' : 'lg:gap-20')}>
      <Rise className={cn('flex flex-col gap-6', flip && 'lg:order-2')}>
        {(index || eyebrow) && <Label index={index}>{eyebrow}</Label>}
        <h3 className="s-h2 !text-[clamp(30px,3.4vw,50px)]">{title}</h3>
        {text && <p className="s-lead">{text}</p>}
        {/* framed: the points as a ruled list, the picture centred on the page (founder 2026-11-01: "more professional") */}
        {points && framed ? <div className="s-split-list">{points}</div> : points}
        {action && <div className="pt-2">{action}</div>}
      </Rise>
      <Rise delay={120} className={cn(flip && 'lg:order-1', framed && 's-split-media')}>
        {media}
      </Rise>
    </div>
  );
}

/** A phone frame around the mobile screenshot. */
export function Phone({ shot = 'traderPhone', className }: { shot?: ShotRef; className?: string }) {
  const s = useShot(shot);
  return (
    <div className={cn('s-phone mx-auto', className)}>
      <ThemedImage image={s} sizes="320px" loading="lazy" decoding="async" />
    </div>
  );
}
