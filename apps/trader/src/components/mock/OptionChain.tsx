import { Fragment } from 'react';
import { Badges } from '@/components/ui/Flag';
import { ATM_AFTER, CHAIN, SPOT } from './chain';
import { cn } from '@/lib/cn';

/** EURUSD option chain in Kalks 2 (illustrative): calls left (blue = profit if it rises), strikes centre, puts right. */
export function OptionChain({ className, numbered = false }: { className?: string; numbered?: boolean }) {
  const N = ({ n }: { n: number }) =>
    numbered ? (
      <span className="ml-1.5 inline-grid h-[18px] w-[18px] place-items-center rounded-full bg-k-yel align-middle font-mono text-[10.5px] font-bold text-k-ink">
        {n}
      </span>
    ) : null;
  return (
    <div className={cn('mock', className)} aria-label="EURUSD option chain, illustrative">
      <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3.5">
        <Badges symbol="EURUSD" size={22} />
        <span className="text-[14.5px] font-semibold">EUR/USD options</span>
        <div className="seg sm ml-auto" role="presentation">
          {['Mon', 'Tue', 'Wed', 'Fri W', 'Oct M'].map((d, i) => (
            <button key={d} type="button" tabIndex={-1} aria-pressed={i === 3}>
              {d}
            </button>
          ))}
        </div>
        <N n={1} />
      </div>
      <div className="overflow-x-auto">
        <table className="tb min-w-[640px] text-center [&_td]:!py-2.5 [&_td]:!text-center [&_th]:!text-center">
          <thead>
            <tr>
              <th colSpan={3} className="!text-up-tx">
                Calls · profit if it rises
                <N n={2} />
              </th>
              <th>
                Strike
                <N n={3} />
              </th>
              <th colSpan={3} className="!text-dn-tx">
                Puts · profit if it falls
                <N n={4} />
              </th>
            </tr>
            <tr>
              <th>
                Breakeven
                <N n={5} />
              </th>
              <th>Chance</th>
              <th>Buy</th>
              <th />
              <th>Buy</th>
              <th>Chance</th>
              <th>Breakeven</th>
            </tr>
          </thead>
          <tbody>
            {CHAIN.map((r, i) => (
              <Fragment key={r.k}>
                {i === ATM_AFTER && (
                  <tr className="pointer-events-none">
                    <td colSpan={7} className="!border-0 !p-0">
                      <div className="relative flex items-center justify-center py-1">
                        <span className="absolute inset-x-3 top-1/2 h-px bg-red" />
                        <span className="relative rounded-full bg-red px-3 py-1 font-mono text-[11.5px] font-semibold text-white">
                          EURUSD {SPOT.toFixed(5)}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="m text-tx3">{r.cb}</td>
                  <td className="m text-tx2">{r.cp}%</td>
                  <td>
                    <span className="inline-block min-w-[64px] rounded-[8px] bg-up-soft px-2 py-1 font-mono text-[13px] font-semibold text-up-tx">
                      {r.c.toFixed(2)}
                    </span>
                  </td>
                  <td className="m !font-bold">{r.k}</td>
                  <td>
                    <span className="inline-block min-w-[64px] rounded-[8px] bg-dn-soft px-2 py-1 font-mono text-[13px] font-semibold text-dn-tx">
                      {r.p.toFixed(2)}
                    </span>
                  </td>
                  <td className="m text-tx2">{r.pp}%</td>
                  <td className="m text-tx3">{r.pb}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line px-5 py-2.5 font-mono text-[11px] text-tx3">Illustrative prices · USD per contract (10,000 EUR)</p>
    </div>
  );
}
