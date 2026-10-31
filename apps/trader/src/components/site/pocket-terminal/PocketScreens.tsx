import { Bell, CandlestickChart, ChevronLeft, History, List, Minus, Plus, Star, User, ArrowLeftRight } from 'lucide-react';
import { BadgesEm } from '@/components/ui/Flag';

/*
 * The phone's screens, drawn rather than screenshotted (founder 2026-10-30: "professional, minimalist"): a light Kalks
 * Trader in its own words (the terminal's labels: Equity, Balance, Free margin, P&L, Watchlist, Positions, Sell, Buy and
 * the five tabs). One demo account with one gold position, so every number agrees with the next: 1.00 lot XAUUSD bought
 * at 3,984.13, bid 3,994.24 → +1,011.00 (100 oz); margin at 1:500 = 798.85. Prices are a recent sample-data session.
 * Everything is sized in em off the screen's width (pocket-terminal.css .ps), so it scales with the phone.
 */

const ROWS: { s: string; name: string; px: string; ch: number }[] = [
  { s: 'XAUUSD', name: 'Gold vs US Dollar', px: '3,994.24', ch: -0.73 },
  { s: 'EURUSD', name: 'Euro vs US Dollar', px: '1.11907', ch: 0.1 },
  { s: 'GBPUSD', name: 'Pound vs US Dollar', px: '1.34158', ch: 0.31 },
  { s: 'USDJPY', name: 'US Dollar vs Yen', px: '157.329', ch: -0.23 },
  { s: 'AUDUSD', name: 'Aussie vs US Dollar', px: '0.70322', ch: 0.05 },
  { s: 'USDCAD', name: 'US Dollar vs Loonie', px: '1.39658', ch: -0.17 },
  { s: 'XAGUSD', name: 'Silver vs US Dollar', px: '50.861', ch: -2.59 },
  { s: 'US30', name: 'Dow Jones 30', px: '52,474.0', ch: 0.21 },
  { s: 'NAS100', name: 'Nasdaq 100', px: '28,842.1', ch: -0.84 },
  { s: 'SPX500', name: 'S&P 500', px: '7,654.7', ch: -0.28 },
  { s: 'GER40', name: 'Germany 40', px: '26,023.6', ch: -0.2 },
  { s: 'USOIL', name: 'WTI Crude Oil', px: '103.42', ch: 0.55 },
  { s: 'BTCUSD', name: 'Bitcoin', px: '77,920.00', ch: -1.18 },
  { s: 'ETHUSD', name: 'Ethereum', px: '2,227.08', ch: -1.36 },
];

const pct = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(2)}%`;

/** Screen 1: the account at a glance, then the watchlist. */
export function ScreenWatchlist() {
  return (
    <div className="ps">
      <div className="ps-head">
        <div className="ps-acct">
          <b>90022871</b>
          <span className="ps-tag">Demo</span>
        </div>
        <span className="ps-ic" aria-hidden>
          <Bell />
        </span>
      </div>

      <div className="ps-card ps-eq">
        <span className="ps-k">Equity</span>
        <div className="ps-big">
          101,011.00 <small>USD</small>
        </div>
        <div className="ps-kv">
          <div>
            <span className="ps-k">Balance</span>
            <b>100,000.00</b>
          </div>
          <div>
            <span className="ps-k">Free margin</span>
            <b>100,212.15</b>
          </div>
          <div>
            <span className="ps-k">P&amp;L</span>
            <b className="up">+1,011.00</b>
          </div>
        </div>
      </div>

      <div className="ps-title">Watchlist</div>
      <div className="ps-chips">
        <span className="on">All</span>
        <span>Forex</span>
        <span>Metals</span>
        <span>Indices</span>
        <span>Energies</span>
      </div>
      <ul className="ps-list">
        {ROWS.map((r) => (
          <li key={r.s}>
            <span className="ps-mark">
              <BadgesEm symbol={r.s} />
            </span>
            <span className="ps-name">
              <b>{r.s}</b>
              <span>{r.name}</span>
            </span>
            <span className="ps-px">
              <b>{r.px}</b>
              <span className={r.ch >= 0 ? 'up' : 'dn'}>{pct(r.ch)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* A 15-minute gold chart that matches the numbers above: drifts, dips to ~3,965, then rallies and closes at 3,994.24
   (deterministic, so the server and the browser draw the same candles). */
const KEYS = [3986, 3988.5, 3984, 3979, 3971, 3966, 3970, 3977, 3983, 3988, 3993, 3998, 3994.24];
function candles(n = 34) {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
  const out: { o: number; h: number; l: number; c: number }[] = [];
  let prev = KEYS[0];
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * (KEYS.length - 1);
    const k = Math.floor(t);
    const base = KEYS[k] + (KEYS[Math.min(k + 1, KEYS.length - 1)] - KEYS[k]) * (t - k);
    const c = i === n - 1 ? KEYS[KEYS.length - 1] : base + rnd() * 2.2;
    const o = prev;
    out.push({ o, c, h: Math.max(o, c) + Math.abs(rnd()) * 2.4 + 0.4, l: Math.min(o, c) - Math.abs(rnd()) * 2.4 - 0.4 });
    prev = c;
  }
  return out;
}
const CANDLES = candles();
const LO = 3958;
const HI = 4004;
const W = 300;
const H = 290;
const PLOT = 252; // the candles' width; the price axis takes the rest
const y = (p: number) => +(((HI - p) / (HI - LO)) * H).toFixed(2);

/** Screen 2: the gold chart with the position line, the position, and Sell · volume · Buy. */
export function ScreenChart() {
  const step = PLOT / CANDLES.length;
  return (
    <div className="ps">
      <div className="ps-head">
        <span className="ps-ic" aria-hidden>
          <ChevronLeft />
        </span>
        <div className="ps-sym">
          <span className="ps-mark">
            <BadgesEm symbol="XAUUSD" />
          </span>
          <span className="ps-name">
            <b>XAUUSD</b>
            <span>Gold vs US Dollar</span>
          </span>
        </div>
        <span className="ps-ic" aria-hidden>
          <Star />
        </span>
      </div>

      <div className="ps-quote">
        <div className="ps-big">3,994.24</div>
        <span className="dn">{pct(-0.73)}</span>
      </div>
      <div className="ps-tf">
        {['M5', 'M15', 'H1', 'H4', 'D1'].map((t) => (
          <span key={t} className={t === 'M15' ? 'on' : undefined}>
            {t}
          </span>
        ))}
      </div>

      <svg className="ps-chart" viewBox={`0 0 ${W} ${H}`} aria-hidden>
        {[4000, 3990, 3980, 3970, 3960].map((p) => (
          <g key={p}>
            <line x1="0" x2={PLOT} y1={y(p)} y2={y(p)} className="grid" />
            <text x={W - 2} y={y(p) + 3} textAnchor="end" className="ax">
              {p.toLocaleString('en-US')}
            </text>
          </g>
        ))}
        {CANDLES.map((k, i) => {
          const x = i * step + step / 2;
          const up = k.c >= k.o;
          return (
            <g key={i} className={up ? 'cu' : 'cd'}>
              <line x1={x} x2={x} y1={y(k.h)} y2={y(k.l)} />
              <rect x={x - step * 0.32} width={step * 0.64} y={y(Math.max(k.o, k.c))} height={Math.max(0.8, y(Math.min(k.o, k.c)) - y(Math.max(k.o, k.c)))} rx="0.6" />
            </g>
          );
        })}
        {/* the open position */}
        <line x1="0" x2={PLOT} y1={y(3984.13)} y2={y(3984.13)} className="pos" />
        <rect x="4" y={y(3984.13) - 7} width="52" height="14" rx="3" className="pos-tag" />
        <text x="30" y={y(3984.13) + 3.4} textAnchor="middle" className="pos-tx">
          BUY 1.00
        </text>
        {/* the last price */}
        <line x1="0" x2={PLOT} y1={y(3994.24)} y2={y(3994.24)} className="last" />
        <rect x={PLOT + 2} y={y(3994.24) - 7} width={W - PLOT - 2} height="14" rx="3" className="last-tag" />
        <text x={W - 3} y={y(3994.24) + 3.4} textAnchor="end" className="last-tx">
          3,994.24
        </text>
      </svg>

      <div className="ps-title">Positions (1)</div>
      <div className="ps-card ps-pos">
        <span className="ps-mark">
          <BadgesEm symbol="XAUUSD" />
        </span>
        <span className="ps-name">
          <b>
            XAUUSD <em className="up">buy</em> 1.00
          </b>
          <span>3,984.13 → 3,994.24</span>
        </span>
        <b className="up ps-pl">+1,011.00</b>
      </div>

      <div className="ps-trade">
        <span className="sell">
          <small>Sell</small>
          <b>3,994.24</b>
        </span>
        <span className="vol">
          <Minus aria-hidden />
          <b>1.00</b>
          <Plus aria-hidden />
        </span>
        <span className="buy">
          <small>Buy</small>
          <b>3,994.67</b>
        </span>
      </div>
    </div>
  );
}

/** The tab bar, fixed at the foot of the screen; the engine marks the tab of the screen in view. */
export function ScreenTabs() {
  const tabs = [
    { label: 'Watchlist', Icon: List },
    { label: 'Chart', Icon: CandlestickChart },
    { label: 'Trade', Icon: ArrowLeftRight },
    { label: 'History', Icon: History },
    { label: 'Account', Icon: User },
  ];
  return (
    <div className="ps-tabs" aria-hidden>
      {tabs.map(({ label, Icon }, i) => (
        <span key={label} data-tab={i}>
          <Icon />
          {label}
        </span>
      ))}
    </div>
  );
}
