'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Badges } from '@/components/ui/Flag';
import { useLiveQuotes } from '@/lib/useLiveQuotes';
import { changePct, formatPct, formatPrice } from '@/lib/quotes';
import { TRADER_URL } from '@/lib/crm';
import { cn } from '@/lib/cn';

/** Row in public/data/instruments.json: [symbol, name, class, exchange, status, digits] */
type Row = [string, string, string, string, 'live' | 'soon', number];

export const CLASSES = [
  { id: 'all', label: 'All' },
  { id: 'forex', label: 'Forex' },
  { id: 'metals', label: 'Metals' },
  { id: 'energies', label: 'Energies' },
  { id: 'indices', label: 'Indices' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'stocks', label: 'Stocks' },
] as const;

const PAGE = 30;

/** Searchable list of every market a live account can trade (and the stocks on demo), with live prices. */
export function MarketsTable() {
  const params = useSearchParams();
  const router = useRouter();
  const initialClass = CLASSES.some((c) => c.id === params.get('class')) ? (params.get('class') as string) : 'all';
  const [cls, setCls] = useState<string>(initialClass);
  const [q, setQ] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const [visibleKey, setVisibleKey] = useState<string[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  // Load the list only when the table comes close to the viewport.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!near || rows) return;
    fetch('/data/instruments.json')
      .then((r) => r.json())
      .then((d: { rows: Row[] }) => setRows(d.rows))
      .catch(() => setFailed(true));
  }, [near, rows]);

  useEffect(() => {
    const c = params.get('class');
    if (c && CLASSES.some((x) => x.id === c)) setCls(c);
  }, [params]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const needle = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (cls === 'all' || r[2] === cls) &&
        (!needle || r[0].toLowerCase().includes(needle) || r[1].toLowerCase().includes(needle) || r[3].toLowerCase().includes(needle)),
    );
  }, [rows, cls, q]);
  const shown = filtered.slice(0, limit);

  // Debounce which symbols get live prices.
  const shownKey = shown.map((r) => r[0]).join(',');
  useEffect(() => {
    const t = window.setTimeout(() => setVisibleKey(shownKey ? shownKey.split(',') : []), 350);
    return () => window.clearTimeout(t);
  }, [shownKey]);
  const { quotes, live } = useLiveQuotes(visibleKey, {}, visibleKey.length > 0);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows?.length ?? 0 };
    rows?.forEach((r) => (c[r[2]] = (c[r[2]] || 0) + 1));
    return c;
  }, [rows]);

  const pick = (id: string) => {
    setCls(id);
    setLimit(PAGE);
    const url = id === 'all' ? '/markets' : `/markets?class=${id}`;
    router.replace(url + '#list', { scroll: false });
  };

  return (
    <div ref={box}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div role="tablist" aria-label="Asset class" className="no-sb -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] xl:mx-0 xl:px-0">
          {CLASSES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cls === c.id}
              type="button"
              onClick={() => pick(c.id)}
              className={cn('chip flex-none', cls === c.id && 'sel')}
            >
              {c.label}
              {rows && <span className="font-mono text-[11px] opacity-70">{counts[c.id] ?? 0}</span>}
            </button>
          ))}
        </div>
        <label className="field w-full xl:w-[340px]">
          <Search size={17} aria-hidden />
          <span className="sr-only">Search markets</span>
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Search EURUSD, gold, Apple…"
          />
        </label>
      </div>

      <div className="card mt-5 overflow-hidden px-2 pb-2">
        <div className="flex items-center justify-between px-4 py-3.5 font-mono text-[12px] text-tx3">
          <span>{rows ? `${filtered.length.toLocaleString('en-US')} markets` : 'Loading markets…'}</span>
          <span className="flex items-center gap-2">
            <i className={cn('live-dot', live && 'on')} />
            {live ? 'Streaming where live' : 'Latest prices'}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="tb">
            <thead className="max-sm:hidden">
              <tr>
                <th scope="col">Market</th>
                <th scope="col" className="max-md:hidden">
                  Class
                </th>
                <th scope="col" className="r">
                  Bid
                </th>
                <th scope="col" className="r max-sm:hidden">
                  Ask
                </th>
                <th scope="col" className="r">
                  Day
                </th>
                <th scope="col" className="r max-lg:hidden">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {!rows &&
                !failed &&
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6}>
                      <div className="h-4 w-1/3 animate-pulse rounded bg-s3" />
                    </td>
                  </tr>
                ))}
              {failed && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-tx2">
                    The list did not load. Refresh the page to try again.
                  </td>
                </tr>
              )}
              {shown.map(([s, name, c, ex, status, digits]) => {
                const qq = quotes[s];
                const ch = changePct(qq);
                return (
                  <tr key={s}>
                    <td>
                      <a href={TRADER_URL} className="flex items-center gap-3">
                        <Badges symbol={s} cls={c} />
                        <span className="min-w-0">
                          <span className="block text-[14px] font-semibold">{s}</span>
                          <span className="block max-w-[44vw] truncate text-[12.5px] text-tx3 sm:max-w-[300px]">
                            {name}
                            {ex ? ` · ${ex}` : ''}
                          </span>
                        </span>
                      </a>
                    </td>
                    <td className="capitalize text-tx2 max-md:hidden">{c}</td>
                    <td className="r m">{formatPrice(qq?.bid, digits)}</td>
                    <td className="r m max-sm:hidden">{formatPrice(qq?.ask, digits)}</td>
                    <td className="r">
                      <span className={cn('chg', ch !== undefined && (ch >= 0 ? 'up' : 'dn'))}>{formatPct(ch)}</span>
                    </td>
                    <td className="r max-lg:hidden">{status === 'live' ? <span className="tag live">Live</span> : <span className="tag">Demo now</span>}</td>
                  </tr>
                );
              })}
              {rows && !filtered.length && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-tx2">
                    Nothing matches “{q}”. Try a symbol like XAUUSD or a name like Tesla.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > limit && (
          <div className="flex justify-center p-4">
            <button type="button" onClick={() => setLimit((l) => l + PAGE * 2)} className="btn v-ghost">
              Show more ({(filtered.length - limit).toLocaleString('en-US')} left)
            </button>
          </div>
        )}
      </div>
      <p className="mt-4 text-[12.5px] text-tx3">
        Bid and ask from the Kalks public market-data feed. Day change is the mid price against today&rsquo;s open. Markets that
        are not streaming show their latest snapshot. Your account type sets the spread you trade on.
      </p>
    </div>
  );
}
