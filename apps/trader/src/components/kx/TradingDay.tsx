'use client';

import { useMemo, useState } from 'react';
import { Bookmark, CalendarPlus, ChevronDown, Download } from 'lucide-react';
import { buildIcs, downloadText, hhmmIn, zoned, NY, type CalEvent } from '@/lib/tz';
import { cn } from '@/lib/cn';

export type Slot = {
  id: string;
  title: string;
  /** wall-clock times in `tz`; omit both for all-day rows */
  start?: string;
  end?: string;
  tz?: string;
  /** a line under the title */
  who: string;
  desc: string;
  tags: string[];
  /** BYDAY for the calendar file, e.g. MO,TU,WE,TH,FR; rows without it cannot be saved */
  days?: string;
  /** shows its own "Add to calendar" link */
  cal?: boolean;
};

/**
 * "Your trading day": the platform's day from the 17:00 New York rollover onwards, as a list you can filter by
 * market, open for details and bookmark into a calendar file. Times are shown in New York time or the visitor's.
 */
export function TradingDay({ slots, ymd }: { slots: Slot[]; ymd: string }) {
  const tags = useMemo(() => Array.from(new Set(slots.flatMap((s) => s.tags))), [slots]);
  const [tag, setTag] = useState('All');
  const [open, setOpen] = useState<string | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [mine, setMine] = useState(false);
  const [bump, setBump] = useState(0);

  const shown = slots.filter((s) => tag === 'All' || s.tags.includes(tag));
  const time = (s: Slot, which: 'start' | 'end') => {
    const v = s[which];
    if (!v || !s.tz) return null;
    const t = zoned(ymd, v, s.tz);
    return mine ? hhmmIn(t) : hhmmIn(t, NY);
  };
  const ev = (s: Slot): CalEvent => ({
    uid: `kalks-${s.id}`,
    title: `${s.title} (Kalks)`,
    ymd,
    start: s.start!,
    end: s.end ?? s.start!,
    tz: s.tz!,
    days: s.days,
    description: `${s.who}. ${s.desc}`,
  });
  const toggle = (id: string) => {
    setSaved((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));
    setBump((n) => n + 1);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="kx-chips !mt-0" role="group" aria-label="Filter by market">
          {['All', ...tags].map((t) => (
            <button key={t} type="button" className="kx-chip" aria-pressed={tag === t} onClick={() => setTag(t)}>
              {t}
              <span className="kx-chip-n">{t === 'All' ? slots.length : slots.filter((s) => s.tags.includes(t)).length}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="kx-chips !mt-0" role="group" aria-label="Time zone">
            <button type="button" className="kx-chip" aria-pressed={!mine} onClick={() => setMine(false)}>
              New York time
            </button>
            <button type="button" className="kx-chip" aria-pressed={mine} onClick={() => setMine(true)}>
              Your time
            </button>
          </div>
          <div className="kx-saved" data-on={bump ? '' : undefined} key={bump}>
            {saved.length ? (
              <>
                <b>{saved.length}</b> saved
                <button
                  type="button"
                  className="kx-btn sm blue"
                  onClick={() => downloadText('kalks-trading-day.ics', buildIcs(slots.filter((s) => saved.includes(s.id)).map(ev)))}
                >
                  <Download size={14} aria-hidden /> Download .ics
                </button>
              </>
            ) : (
              <span className="py-1.5 pr-2">
                <Bookmark size={13} className="-mt-0.5 mr-1 inline" aria-hidden /> Bookmark a row to save it
              </span>
            )}
          </div>
        </div>
      </div>

      <ul className="kx-agenda">
        {shown.map((s, k) => {
          const isOpen = open === s.id;
          const a = time(s, 'start');
          const b = time(s, 'end');
          return (
            <li key={`${tag}-${s.id}`} className="kx-row" style={{ ['--k' as string]: k }} data-open={isOpen ? '' : undefined}>
              <div className="kx-row-main">
                <button type="button" className="kx-row-btn" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.id)}>
                  <span className="kx-row-time">
                    {a ?? 'All day'}
                    <small>{a ? (b && b !== a ? b : mine ? 'your time' : 'New York') : '24 / 7'}</small>
                  </span>
                  <span className="min-w-0">
                    <span className="kx-row-title block">{s.title}</span>
                    <span className="kx-row-who block">{s.who}</span>
                  </span>
                  <span className="flex gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="kx-tag">
                        {t}
                      </span>
                    ))}
                  </span>
                  <ChevronDown size={14} className="kx-chev" data-open={isOpen ? '' : undefined} aria-hidden />
                </button>
                {s.days ? (
                  <button type="button" className="kx-save" aria-pressed={saved.includes(s.id)} aria-label={`Save ${s.title}`} onClick={() => toggle(s.id)}>
                    <Bookmark size={16} fill={saved.includes(s.id) ? 'currentColor' : 'none'} aria-hidden />
                  </button>
                ) : (
                  <span className="w-9" />
                )}
              </div>
              <div className="kx-more">
                <div>
                  <p>{s.desc}</p>
                  {s.cal && s.days ? (
                    <button type="button" className="kx-link" onClick={() => downloadText(`kalks-${s.id}.ics`, buildIcs([ev(s)]))}>
                      <CalendarPlus size={15} aria-hidden /> Add to my calendar
                    </button>
                  ) : (
                    <span className="block h-[22px]" />
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className={cn('mt-4 text-[12.5px] text-[var(--kx-tx3)]')}>
        Session hours are market conventions; Kalks Trader shows each market&rsquo;s exact hours and holidays.
      </p>
    </div>
  );
}
