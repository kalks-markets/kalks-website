'use client';

import { useEffect, useState } from 'react';
import { impactLabel, relativeTime, type MarketNews } from '@/lib/marketNews';
import { cn } from '@/lib/cn';

/**
 * Home: the market news ticker. Headlines from official sources and upcoming high-impact calendar events, from the
 * platform's news service (read server-side; the browser refreshes through /api/market-news every minute).
 * Times are first rendered against the server's clock (no hydration mismatch), then against the visitor's.
 * Pauses on hover and focus; with reduced motion it becomes a scrollable row.
 */
export function NewsTicker({ initial }: { initial: MarketNews }) {
  const [data, setData] = useState(initial);
  const [now, setNow] = useState(() => Date.parse(initial.updatedAt));

  useEffect(() => {
    setNow(Date.now());
    let stop = false;
    const load = async () => {
      try {
        const r = await fetch('/api/market-news', { cache: 'no-store' });
        if (!r.ok) return;
        const d = (await r.json()) as MarketNews;
        if (!stop && d.items?.length) setData(d);
      } catch {
        /* keep what we have */
      }
      if (!stop) setNow(Date.now());
    };
    if (!initial.items.length) load();
    const id = window.setInterval(() => document.visibilityState === 'visible' && load(), 60_000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [initial.items.length]);

  const items = data.items.slice(0, 16);
  if (!items.length) return null;
  const list = (dup: boolean) =>
    items.map((it, i) => (
      <a
        key={`${dup ? 'b' : 'a'}${i}`}
        href={it.url}
        target="_blank"
        rel="noopener noreferrer"
        className="it"
        tabIndex={dup ? -1 : undefined}
        aria-hidden={dup || undefined}
      >
        {it.kind === 'event' ? (
          <>
            <span className={cn('tag', it.impact === 3 ? 'new' : '')}>{impactLabel(it.impact)}</span>
            <span className="src">{it.source}</span>
          </>
        ) : (
          <span className="src">{it.source}</span>
        )}
        <span className="font-semibold text-tx">{it.title}</span>
        <span className="src">{relativeTime(it.at, now)}</span>
      </a>
    ));
  return (
    <div className="news card !rounded-[18px]" aria-label="Market news">
      <div className="nl">
        <i className="live-dot on !bg-[var(--neon-r)]" />
        Market news
      </div>
      <div className="track no-sb">
        <div className="run" style={{ ['--dur' as string]: `${Math.max(50, items.length * 7)}s` }}>
          {list(false)}
          {list(true)}
        </div>
      </div>
    </div>
  );
}
