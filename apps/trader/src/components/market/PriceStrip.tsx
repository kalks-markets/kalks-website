'use client';

import { Badges } from '@/components/ui/Flag';
import { useLiveQuotes } from '@/lib/useLiveQuotes';
import { useFlash } from '@/lib/useFlash';
import { changePct, formatPct, formatPrice, mid, type QuoteMap } from '@/lib/quotes';
import { cn } from '@/lib/cn';

export type StripRow = { s: string; label: string; digits: number; cls?: string };

/** Day range marker: where the price sits between today's low and high. */
function Range({ q }: { q?: QuoteMap[string] }) {
  const m = mid(q);
  if (m === undefined || !q?.h || !q?.l || q.h <= q.l) return <span className="rng" aria-hidden />;
  const p = Math.min(100, Math.max(0, ((m - q.l) / (q.h - q.l)) * 100));
  return (
    <span className="rng" title="Position in today's range" aria-hidden>
      <i style={{ left: `${p}%` }} />
    </span>
  );
}

/** Home: the live price strip under the hero (sample "web-tick"), real quotes from the public market-data feed. */
export function PriceStrip({ rows, initial }: { rows: StripRow[]; initial: QuoteMap }) {
  const { quotes, live } = useLiveQuotes(
    rows.map((r) => r.s),
    initial,
  );
  const flash = useFlash(quotes);
  return (
    <div className="ticks card overflow-hidden !rounded-[24px]">
      <div className="lab">
        <b>Live prices</b>
        <span>
          <i className={cn('live-dot', live && 'on')} />
          {live ? 'Streaming' : 'Latest'}
        </span>
      </div>
      <div className="tick-row">
        {rows.map((r) => {
          const q = quotes[r.s];
          const ch = changePct(q);
          return (
            <div className="tk" key={r.s}>
              <span className="pair">
                <Badges symbol={r.s} cls={r.cls} />
              </span>
              <div className="ln">
                <b>{r.label}</b>
                <span className={cn('chg', ch !== undefined && (ch >= 0 ? 'up' : 'dn'))}>{formatPct(ch)}</span>
              </div>
              <div className="ln">
                <span className={cn('px', flash[r.s] && `flash-${flash[r.s]}`)}>{formatPrice(mid(q), r.digits)}</span>
                <Range q={q} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Markets hero: a compact live board (one market per class) on a dark glass card. */
export function LiveBoard({ rows, initial }: { rows: (StripRow & { name: string })[]; initial: QuoteMap }) {
  const { quotes, live } = useLiveQuotes(
    rows.map((r) => r.s),
    initial,
  );
  const flash = useFlash(quotes);
  return (
    <div className="theme-dark relative mx-auto w-full max-w-[520px] rounded-[26px] bg-[rgba(11,8,9,0.92)] p-2 text-tx shadow-[0_40px_80px_-30px_rgba(60,40,0,0.55),inset_0_0_0_1px_rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-between px-4 pb-2 pt-3">
        <span className="font-mono text-[12px] font-semibold tracking-[0.04em] text-k-yel">LIVE BOARD</span>
        <span className="flex items-center gap-2 font-mono text-[12px] text-tx3">
          <i className={cn('live-dot', live && 'on')} />
          {live ? 'Streaming' : 'Latest'}
        </span>
      </div>
      <ul>
        {rows.map((r) => {
          const q = quotes[r.s];
          const ch = changePct(q);
          return (
            <li key={r.s} className="flex items-center gap-3 rounded-[16px] px-4 py-3 [&+li]:shadow-[inset_0_1px_0_var(--line)]">
              <Badges symbol={r.s} cls={r.cls} size={26} />
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-semibold">{r.label}</p>
                <p className="truncate text-[12.5px] text-tx3">{r.name}</p>
              </div>
              <span className={cn('px !text-[15px]', flash[r.s] && `flash-${flash[r.s]}`)}>{formatPrice(mid(q), r.digits)}</span>
              <span className={cn('chg w-[74px] justify-center', ch !== undefined && (ch >= 0 ? 'up' : 'dn'))}>{formatPct(ch)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
