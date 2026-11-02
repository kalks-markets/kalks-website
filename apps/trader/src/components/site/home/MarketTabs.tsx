'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Bell, CandlestickChart, ChartNoAxesColumnIncreasing, History, List, Search, User } from 'lucide-react';
import { BadgesEm } from '@/components/ui/Flag';
import type { LiveRow } from '@/components/market/LiveList';
import { changePct, type Quote, type QuoteMap } from '@/lib/quotes';
import { useFlash } from '@/lib/useFlash';
import { useLiveQuotes } from '@/lib/useLiveQuotes';
import { cn } from '@/lib/cn';
import { Fig, PhoneFrame, PhoneStatus } from './HomeBlocks';
import { Rise } from '../Rise';
import './home.css';

/** a watchlist row; `badge` overrides the badge (an index shows its country's flag, as in Kalks Trader) */
export type MarketRow = LiveRow & { badge?: string[] };
export type MarketTab = { id: string; label: string; rows: MarketRow[] };

/** a price the way Kalks Trader sets it: the last two whole pips large, a fifth (or third) decimal raised */
function Px({ v, digits }: { v?: number; digits: number }) {
  if (v === undefined || !Number.isFinite(v)) return <>—</>;
  const s = v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  if (digits >= 3)
    return (
      <>
        {s.slice(0, -3)}
        <b>{s.slice(-3, -1)}</b>
        <sup>{s.slice(-1)}</sup>
      </>
    );
  if (digits === 2)
    return (
      <>
        {s.slice(0, -2)}
        <b>{s.slice(-2)}</b>
      </>
    );
  return <>{s}</>;
}

const pct = (n?: number) => (n === undefined ? '—' : `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(2)}%`);

/**
 * Kalks Trader's watchlist on a phone, as the platform draws it (trade.kalkstrade.com at phone width, 2026-11-02): the
 * CFD | Options switch and the brand bar, the class chips with their counts, the search field, a row a market with its
 * badges, the day's change and the name, the Sell and Buy prices in their red and blue boxes, and the five tabs. Live
 * prices; the chips follow the tab chosen above it. The site's orange stands in for the platform's accent.
 */
function PlatformWatchlist({ tabs, at, quotes, live }: { tabs: MarketTab[]; at: number; quotes: Record<string, Quote | undefined>; live: boolean }) {
  const chips = useRef<HTMLDivElement>(null);
  const flash = useFlash(quotes as QuoteMap);
  const tab = tabs[at];
  const total = tabs.reduce((n, t) => n + t.rows.length, 0);
  useEffect(() => {
    const row = chips.current;
    const on = row?.querySelector<HTMLElement>('[data-on]');
    if (row && on) row.scrollTo({ left: on.offsetLeft - row.clientWidth / 2 + on.offsetWidth / 2, behavior: 'smooth' });
  }, [at]);
  return (
    <div className="kw">
      <PhoneStatus />
      <div className="kw-bar" aria-hidden>
        <span className="kw-seg">
          <b>CFD</b>
          <span>
            Options <i />
          </span>
        </span>
        <span className="kw-brand">
          <b>Kalks Trader</b>
          <small>
            <i className={cn('kw-live', live && 'on')} />
            Live market data
          </small>
        </span>
        <Bell className="kw-bell" />
        <span className="kw-open">Open account</span>
      </div>
      <div className="kw-chips" ref={chips} aria-hidden>
        <span>
          All <small>{total}</small>
        </span>
        {tabs.map((t, i) => (
          <span key={t.id} data-on={i === at || undefined}>
            {t.label} <small>{t.rows.length}</small>
          </span>
        ))}
      </div>
      <div className="kw-search" aria-hidden>
        <Search />
        Search symbols
      </div>
      <ul className="kw-list" key={tab.id}>
        {tab.rows.map((r) => {
          const q = quotes[r.s];
          const ch = changePct(q);
          return (
            <li key={r.s}>
              <span className="kw-mark">
                <BadgesEm symbol={r.s} codes={r.badge} />
              </span>
              <span className="kw-name">
                <b>{r.s}</b>
                <span>
                  <em className={ch === undefined ? undefined : ch >= 0 ? 'up' : 'dn'}>{pct(ch)}</em> · {r.name}
                </span>
              </span>
              <span className={cn('kw-px sell', flash[r.s] && `fl-${flash[r.s]}`)}>
                <Px v={q?.bid} digits={r.digits} />
              </span>
              <span className={cn('kw-px buy', flash[r.s] && `fl-${flash[r.s]}`)}>
                <Px v={q?.ask} digits={r.digits} />
              </span>
            </li>
          );
        })}
      </ul>
      <nav className="kw-tabs" aria-hidden>
        <span data-on>
          <List />
          Watchlist
        </span>
        <span>
          <CandlestickChart />
          Chart
        </span>
        <span>
          <ChartNoAxesColumnIncreasing />
          Trade
        </span>
        <span>
          <History />
          History
        </span>
        <span>
          <User />
          Account
        </span>
      </nav>
    </div>
  );
}

/**
 * Markets after the reference's tabbed block: pill tabs for the asset classes, Kalks Trader's watchlist on a phone at
 * live prices (only the chosen class is subscribed, passively) and four tiles of figures beside it. Arrow keys, Home
 * and End move between the tabs (mirrored right to left).
 */
export function MarketTabs({ tabs, initial, tiles }: { tabs: MarketTab[]; initial: QuoteMap; tiles: { v: string; t: string }[] }) {
  const [at, setAt] = useState(0);
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const { quotes, live } = useLiveQuotes(
    tabs[at].rows.map((r) => r.s),
    initial,
  );

  const pick = (i: number) => {
    setAt(i);
    refs.current[i]?.focus();
    refs.current[i]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };
  const onKey = (e: KeyboardEvent) => {
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const n = tabs.length;
    const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key as 'ArrowRight' | 'ArrowLeft'];
    if (step) pick((at + step + n) % n);
    else if (e.key === 'Home') pick(0);
    else if (e.key === 'End') pick(n - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="rf-mk">
      <div className="rf-tabs" role="tablist" aria-label="Markets" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}t${i}`}
            aria-selected={i === at}
            aria-controls={`${uid}p`}
            tabIndex={i === at ? 0 : -1}
            className="rf-tab"
            onClick={() => setAt(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rf-mk-grid">
        <Rise className="rf-mk-phone">
          <div role="tabpanel" id={`${uid}p`} aria-labelledby={`${uid}t${at}`}>
            <PhoneFrame light>
              <PlatformWatchlist tabs={tabs} at={at} quotes={quotes} live={live} />
            </PhoneFrame>
          </div>
        </Rise>
        <ul className="rf-mk-tiles">
          {tiles.map((t, i) => (
            <Rise as="li" key={t.t} delay={i * 70} className="rf-card rf-tile">
              <Fig>{t.v}</Fig>
              <p>{t.t}</p>
            </Rise>
          ))}
        </ul>
      </div>
    </div>
  );
}
