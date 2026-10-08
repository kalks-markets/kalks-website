import { Badges } from '@/components/ui/Flag';
import { KMark } from '@/components/brand/Logo';
import { cn } from '@/lib/cn';

/**
 * Kalks Trader drawn in Kalks 2 (KALKS2 §6.1), static and illustrative: symbol tab, chart bar with inline Sell / Buy,
 * blue-up / red-down candles with a moving average, a buy position line with S / T handles, stop loss and take
 * profit lines, and the order panel. Server-rendered SVG from a seeded walk, so it is identical on every load.
 */
const W = 760;
const H = 360;
const N = 64;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type C = { o: number; h: number; l: number; c: number };

function candles(): { list: C[]; lo: number; hi: number } {
  const r = rng(20261009);
  const list: C[] = [];
  let p = 1.1192;
  for (let i = 0; i < N; i++) {
    const t = i / N;
    const drift = t < 0.3 ? 0.00004 : t < 0.5 ? -0.00006 : t < 0.62 ? -0.00002 : 0.00009;
    const o = p;
    const c = o + drift + (r() - 0.5) * 0.00042;
    const h = Math.max(o, c) + r() * 0.00016;
    const l = Math.min(o, c) - r() * 0.00016;
    list.push({ o, h, l, c });
    p = c;
  }
  const lo = Math.min(...list.map((d) => d.l));
  const hi = Math.max(...list.map((d) => d.h));
  return { list, lo, hi };
}

export function TraderMock({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { list, lo: rawLo, hi: rawHi } = candles();
  const pad = (rawHi - rawLo) * 0.16;
  const lo = rawLo - pad;
  const hi = rawHi + pad * 1.2;
  const y = (v: number) => ((hi - v) / (hi - lo)) * H;
  const step = W / (N + 6);
  const x = (i: number) => 10 + i * step + step / 2;
  const last = list[N - 1].c;
  const span = rawHi - rawLo;
  const entry = Number((rawLo + span * 0.3).toFixed(5));
  const sl = Number((rawLo - span * 0.04).toFixed(5));
  const tp = Number((rawLo + span * 1.06).toFixed(5));
  const ma: string[] = [];
  for (let i = 9; i < N; i++) {
    const avg = list.slice(i - 9, i + 1).reduce((a, d) => a + d.c, 0) / 10;
    ma.push(`${i === 9 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(avg).toFixed(1)}`);
  }
  const ticks: number[] = [];
  const st = 0.0005;
  for (let v = Math.ceil(lo / st) * st; v < hi; v += st) ticks.push(v);
  const pct = (v: number) => `${((hi - v) / (hi - lo)) * 100}%`;
  const fmt = (v: number) => v.toFixed(5);
  const pnl = ((last - entry) * 50000).toFixed(2);

  return (
    <div className={cn('mock flex flex-col !rounded-[22px] bg-bg2 p-1.5', className)} aria-label="Kalks Trader, illustrative">
      {/* title bar */}
      <div className="flex h-[48px] items-center gap-2 px-2">
        <KMark className="h-[22px] w-auto" />
        <div className="ml-1 flex h-[38px] items-center gap-2 rounded-[11px] bg-s1 px-3 shadow-[inset_0_-2px_0_var(--k-yel)]">
          <Badges symbol="EURUSD" size={18} />
          <span className="text-[13px] font-semibold">EUR/USD</span>
          <span className="font-mono text-[12px] text-up-tx">{fmt(last)}</span>
        </div>
        {!compact && (
          <div className="flex h-[38px] items-center gap-2 rounded-[11px] px-3 text-tx2 max-lg:hidden">
            <Badges symbol="XAUUSD" size={18} />
            <span className="text-[13px] font-semibold">XAU/USD</span>
          </div>
        )}
        <div className="ml-auto flex items-center gap-2">
          <span className="tag cfd max-sm:hidden">CFD</span>
          <span className="hidden font-mono text-[12px] text-tx2 sm:inline">LIVE · STANDARD</span>
          <span className="btn v-yel s32 !mb-0 max-sm:hidden" aria-hidden>
            Deposit
          </span>
        </div>
      </div>
      <div className={cn('grid min-h-0 flex-1 gap-1.5', !compact && 'lg:grid-cols-[minmax(0,1fr)_260px]')}>
        {/* chart panel */}
        <div className="relative flex min-w-0 flex-col rounded-[14px] bg-s1 shadow-[inset_0_0_0_1px_var(--line)]">
          <div className="flex h-[42px] items-center gap-1 border-b border-line px-2.5">
            <div className="seg sm !p-[2px]" role="presentation">
              {['1m', '5m', '15m', '1h', '4h', 'D'].map((t) => (
                <button key={t} type="button" tabIndex={-1} aria-pressed={t === '15m'} className="!h-[24px] !px-2 !text-[12px]">
                  {t}
                </button>
              ))}
            </div>
            <span className="ml-2 font-mono text-[12px] text-tx3 max-sm:hidden">ƒx Indicators</span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="btn s32 v-red !mb-0 !mr-[3px] !px-2.5 font-mono !text-[12px]" aria-hidden>
                Sell {fmt(last - 0.00002)}
              </span>
              <span className="btn s32 v-buy !mb-0 !mr-[3px] !px-2.5 font-mono !text-[12px] max-sm:hidden" aria-hidden>
                Buy {fmt(last + 0.00001)}
              </span>
            </div>
          </div>
          <div className="relative flex-1 bg-[var(--chart-bg)] [border-radius:0_0_14px_14px]">
            <div className="relative mr-[64px] h-full min-h-[260px]">
              <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
                {ticks.map((v) => (
                  <line key={v} x1="0" x2={W} y1={y(v)} y2={y(v)} stroke="var(--grid)" vectorEffect="non-scaling-stroke" />
                ))}
                {list.map((d, i) => {
                  const up = d.c >= d.o;
                  const col = up ? 'var(--up)' : 'var(--dn)';
                  const top = y(Math.max(d.o, d.c));
                  const bh = Math.max(1.2, Math.abs(y(d.o) - y(d.c)));
                  return (
                    <g key={i}>
                      <line x1={x(i)} x2={x(i)} y1={y(d.h)} y2={y(d.l)} stroke={col} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      <rect x={x(i) - step * 0.31} y={top} width={step * 0.62} height={bh} fill={col} rx="0.8" />
                    </g>
                  );
                })}
                <path d={ma.join('')} fill="none" stroke="var(--ma)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                <line x1="0" x2={W} y1={y(tp)} y2={y(tp)} stroke="var(--up)" strokeDasharray="6 5" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                <line x1="0" x2={W} y1={y(sl)} y2={y(sl)} stroke="var(--dn)" strokeDasharray="6 5" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
                <line x1="0" x2={W} y1={y(entry)} y2={y(entry)} stroke="var(--up)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
                <line x1="0" x2={W} y1={y(last)} y2={y(last)} stroke="var(--up)" strokeDasharray="2 3" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity=".7" />
              </svg>
              {/* position chip */}
              <div
                className="absolute left-[20%] flex -translate-y-1/2 items-center overflow-hidden rounded-[8px] bg-s1 font-mono text-[11.5px] font-semibold shadow-[0_0_0_1px_var(--up),0_6px_18px_-8px_rgba(0,0,0,0.4)]"
                style={{ top: pct(entry) }}
              >
                <span className="bg-up-face px-2 py-1 text-white">BUY 0.50</span>
                <span className="px-2 py-1 text-up-tx">+${pnl}</span>
                <span className="border-l border-line px-1.5 py-1 text-dn-tx">S</span>
                <span className="border-l border-line px-1.5 py-1 text-up-tx">T</span>
              </div>
              <span className="absolute left-3 -translate-y-[130%] font-mono text-[11px] text-up-tx" style={{ top: pct(tp) }}>
                TP {fmt(tp)}
              </span>
              <span className="absolute left-3 translate-y-[30%] font-mono text-[11px] text-dn-tx" style={{ top: pct(sl) }}>
                SL {fmt(sl)}
              </span>
            </div>
            {/* price axis */}
            <div className="absolute inset-y-0 right-0 w-[64px] border-l border-line font-mono text-[10.5px] text-tx3">
              {ticks.map((v) => (
                <span key={v} className="absolute left-2 -translate-y-1/2" style={{ top: pct(v) }}>
                  {v.toFixed(4)}
                </span>
              ))}
              <span className="absolute left-0 right-1 -translate-y-1/2 rounded-r-[5px] bg-up-face px-1.5 py-[3px] text-white" style={{ top: pct(last) }}>
                {fmt(last)}
              </span>
            </div>
          </div>
        </div>

        {/* order panel */}
        {!compact && (
          <div className="flex flex-col gap-3 rounded-[14px] bg-s1 p-3.5 shadow-[inset_0_0_0_1px_var(--line)] max-lg:hidden">
            <div className="seg sm w-full [&>button]:flex-1" role="presentation">
              {['Market', 'Limit', 'Stop'].map((t) => (
                <button key={t} type="button" tabIndex={-1} aria-pressed={t === 'Market'}>
                  {t}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="translate-x-[2px] translate-y-[2px] rounded-[12px] px-3 py-2.5 shadow-[inset_0_0_0_1.5px_var(--dn-soft)]">
                <p className="text-[11.5px] font-semibold text-dn-tx">Sell</p>
                <p className="mt-1 font-mono text-[13px] text-tx2">
                  {fmt(last - 0.00002).slice(0, -2)}
                  <b className="text-[19px] text-dn-tx">{fmt(last - 0.00002).slice(-2)}</b>
                </p>
              </div>
              <div className="rounded-[12px] bg-up-face px-3 py-2.5 text-white shadow-[1px_1px_0_var(--up-edge),2px_2px_0_var(--up-edge),3px_3px_0_var(--up-edge)]">
                <p className="text-[11.5px] font-semibold opacity-85">Buy</p>
                <p className="mt-1 font-mono text-[13px]">
                  {fmt(last + 0.00001).slice(0, -2)}
                  <b className="text-[19px]">{fmt(last + 0.00001).slice(-2)}</b>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-[12px] bg-s2 px-2 py-1.5 shadow-[inset_0_0_0_1px_var(--line2)]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-s3 font-mono text-tx2">−</span>
              <span className="font-mono text-[14px] font-semibold">0.50 lots</span>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-s3 font-mono text-tx2">+</span>
            </div>
            <dl className="facts [&>div]:py-2 [&>div]:text-[12.5px]">
              <div>
                <dt>Stop loss</dt>
                <dd className="font-mono text-dn-tx">{fmt(sl)}</dd>
              </div>
              <div>
                <dt>Take profit</dt>
                <dd className="font-mono text-up-tx">{fmt(tp)}</dd>
              </div>
              <div>
                <dt>Margin</dt>
                <dd className="font-mono">$56.07</dd>
              </div>
            </dl>
            <span className="btn v-buy block mt-auto !text-[13px]" aria-hidden>
              Buy 0.50 lots
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
