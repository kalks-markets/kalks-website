import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Badges } from '@/components/ui/Flag';
import { CHAIN, usd } from './chain';

/** Kalks FX Options quick trade, drawn in Kalks 2 (illustrative prices): up or down, by when, how far, what happens. */
export function QuickTicket({ className }: { className?: string }) {
  const pick = CHAIN[4];
  return (
    <div className={`mock w-full max-w-[400px] p-5 ${className ?? ''}`} aria-label="Quick trade ticket, illustrative">
      <div className="flex items-center gap-3">
        <Badges symbol="EURUSD" size={24} />
        <div className="flex-1">
          <p className="text-[15px] font-semibold">EUR/USD</p>
          <p className="font-mono text-[12px] text-tx3">Quick trade</p>
        </div>
        <span className="tag opt">Options</span>
      </div>

      <p className="mt-5 font-mono text-[11.5px] font-semibold text-tx3">1 · UP OR DOWN?</p>
      <div className="mt-2 grid grid-cols-2 gap-2.5">
        <div className="flex items-center gap-2 rounded-[12px] bg-up-face px-3 py-3 text-white shadow-[1px_1px_0_var(--up-edge),2px_2px_0_var(--up-edge),3px_3px_0_var(--up-edge)]">
          <ArrowUpRight size={18} aria-hidden />
          <span className="text-[14px] font-semibold">Up</span>
          <span className="ml-auto text-[12px]">call</span>
        </div>
        <div className="flex translate-x-[2px] translate-y-[2px] items-center gap-2 rounded-[12px] bg-dn-soft px-3 py-3 text-dn-tx shadow-[inset_0_0_0_1.5px_var(--dn-soft)]">
          <ArrowDownRight size={18} aria-hidden />
          <span className="text-[14px] font-semibold">Down</span>
          <span className="ml-auto text-[12px]">put</span>
        </div>
      </div>

      <p className="mt-5 font-mono text-[11.5px] font-semibold text-tx3">2 · BY WHEN?</p>
      <div className="seg sm mt-2 w-full [&>button]:flex-1" role="presentation">
        <button type="button" tabIndex={-1} aria-pressed="false">
          Today
        </button>
        <button type="button" tabIndex={-1} aria-pressed="false">
          Tomorrow
        </button>
        <button type="button" tabIndex={-1} aria-pressed="true">
          Friday
        </button>
        <button type="button" tabIndex={-1} aria-pressed="false">
          Month
        </button>
      </div>

      <p className="mt-5 font-mono text-[11.5px] font-semibold text-tx3">3 · HOW FAR?</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[CHAIN[3], CHAIN[4], CHAIN[5]].map((r) => (
          <div
            key={r.k}
            className={`rounded-[12px] px-2.5 py-2 text-center ${r === pick ? 'bg-tx text-bg' : 'bg-s3 text-tx2'}`}
          >
            <p className="font-mono text-[13px] font-semibold">{r.k}</p>
            <p className="mt-1 text-[11.5px] opacity-80">{r.cp}% chance</p>
          </div>
        ))}
      </div>

      <div className="well mt-5 px-4 py-1">
        <dl className="facts [&>div:first-child]:border-0 [&>div]:py-2.5 [&>div]:text-[13px]">
          <div>
            <dt>You pay</dt>
            <dd className="font-mono">{usd(pick.c)}</dd>
          </div>
          <div>
            <dt>Most you can lose</dt>
            <dd className="font-mono">{usd(pick.c)}</dd>
          </div>
          <div>
            <dt>Profit if above at expiry</dt>
            <dd className="font-mono">{pick.cb}</dd>
          </div>
          <div>
            <dt>Settles</dt>
            <dd>In cash, in USD</dd>
          </div>
        </dl>
      </div>
      <span className="btn v-buy block mt-4" aria-hidden>
        Buy call · {usd(pick.c)}
      </span>
      <p className="mt-1 text-center font-mono text-[11px] text-tx3">Illustrative prices</p>
    </div>
  );
}
