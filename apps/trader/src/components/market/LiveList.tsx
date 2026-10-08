'use client';

import { Badges } from '@/components/ui/Flag';
import { useLiveQuotes } from '@/lib/useLiveQuotes';
import { useFlash } from '@/lib/useFlash';
import { changePct, formatPct, formatPrice, mid, type QuoteMap } from '@/lib/quotes';
import { cn } from '@/lib/cn';

export type LiveRow = { s: string; name: string; digits: number; group?: string; soon?: boolean; cls?: string };

/** Compact live price list in a card (options underlyings). */
export function LiveList({ rows, initial, className }: { rows: LiveRow[]; initial: QuoteMap; className?: string }) {
  const { quotes, live } = useLiveQuotes(
    rows.filter((r) => !r.soon).map((r) => r.s),
    initial,
  );
  const flash = useFlash(quotes);
  let lastGroup: string | undefined;
  return (
    <div className={cn('card p-2', className)}>
      <div className="flex items-center justify-between px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.07em] text-tx3">
        <span>Underlying</span>
        <span className="flex items-center gap-2 font-mono normal-case tracking-normal">
          <i className={cn('live-dot', live && 'on')} />
          {live ? 'Streaming' : 'Latest prices'}
        </span>
      </div>
      <ul>
        {rows.map((r) => {
          const header = r.group && r.group !== lastGroup ? r.group : null;
          lastGroup = r.group;
          const q = quotes[r.s];
          const ch = changePct(q);
          return (
            <li key={r.s}>
              {header && <p className="px-4 pb-1 pt-4 font-mono text-[11.5px] font-semibold text-red-tx">{header}</p>}
              <div className="flex items-center gap-3 rounded-[14px] px-4 py-2.5 transition-colors hover:bg-s3">
                <Badges symbol={r.s} cls={r.cls} />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold">{r.s}</p>
                  <p className="truncate text-[12.5px] text-tx3">{r.name}</p>
                </div>
                {r.soon ? (
                  <span className="tag">Soon</span>
                ) : (
                  <>
                    <span className={cn('px', flash[r.s] && `flash-${flash[r.s]}`)}>{formatPrice(mid(q), r.digits)}</span>
                    <span className={cn('chg w-[72px] justify-center', ch !== undefined && (ch >= 0 ? 'up' : 'dn'))}>{formatPct(ch)}</span>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
