'use client';

import { useState } from 'react';
import { IB_GROUPS, IB_LEVELS, ibNeeds, usd } from '@/content/facts';
import { cn } from '@/lib/cn';

/**
 * The full partner rate card: every symbol group and options against the 5 levels, in USD per standard lot round
 * turn (options per contract). A table from md up; on a phone, a level switcher and one column of rates.
 */
export function RateCard({ needs = true }: { needs?: boolean }) {
  const [pick, setPick] = useState(0);
  const lv = IB_LEVELS[pick];
  const last = IB_LEVELS.length - 1;
  const num = 'font-mono text-[15px] [font-variant-numeric:tabular-nums]';
  return (
    <div className="s-card overflow-hidden">
      {/* md and up: groups down, levels across */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px] border-collapse">
          <caption className="sr-only">Partner commission in US dollars per standard lot round turn, options per contract, by level</caption>
          <thead>
            <tr className="border-b border-[var(--s-line)]">
              <th scope="col" className="px-5 pb-3 pt-5 text-start text-[11.5px] font-semibold uppercase tracking-[0.09em] text-[var(--s-tx3)]">
                Per lot, round turn
              </th>
              {IB_LEVELS.map((l, i) => (
                <th key={l.key} scope="col" className="px-5 pb-3 pt-5 text-end">
                  <span className="inline-flex items-center gap-2 text-[16px] font-[500] tracking-[-0.02em] text-white">
                    <span className="size-2 rounded-full bg-[var(--s-orange)]" style={{ opacity: 0.3 + i * 0.175 }} aria-hidden />
                    {l.name}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {IB_GROUPS.map((g) => (
              <tr key={g.key} className="border-b border-[var(--s-line)]">
                <th scope="row" className="px-5 py-3.5 text-start align-top">
                  <span className="block text-[15px] font-medium text-white">{g.name}</span>
                  <span className="block text-[12.5px] font-normal text-[var(--s-tx3)]">{g.covers}</span>
                </th>
                {IB_LEVELS.map((l, i) => (
                  <td key={l.key} className={cn('px-5 py-3.5 text-end', num, i === last ? 'text-[var(--s-orange2)]' : 'text-white')}>
                    {usd(l.rates[g.key])}
                  </td>
                ))}
              </tr>
            ))}
            <tr className={cn(needs && 'border-b border-[var(--s-line)]', 'bg-[rgba(242,96,12,0.06)]')}>
              <th scope="row" className="px-5 py-3.5 text-start align-top">
                <span className="block text-[15px] font-medium text-white">Kalks FX Options</span>
                <span className="block text-[12.5px] font-normal text-[var(--s-tx3)]">Per contract, round turn</span>
              </th>
              {IB_LEVELS.map((l, i) => (
                <td key={l.key} className={cn('px-5 py-3.5 text-end', num, i === last ? 'text-[var(--s-orange2)]' : 'text-white')}>
                  {usd(l.optionsUsd)}
                </td>
              ))}
            </tr>
            {needs && (
              <tr>
                <th scope="row" className="px-5 py-4 text-start text-[13px] font-medium text-[var(--s-tx3)]">
                  To reach it (last 90 days)
                </th>
                {IB_LEVELS.map((l) => (
                  <td key={l.key} className="px-5 py-4 text-end text-[13px] leading-snug text-[var(--s-tx2)]">
                    {l.minLots === 0 ? 'From sign-up' : (
                      <>
                        {l.minLots.toLocaleString('en-US')} lots
                        <br />
                        {l.minClients} active clients
                      </>
                    )}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* phones: pick a level */}
      <div className="md:hidden">
        <div role="tablist" aria-label="Level" className="no-sb flex gap-2 overflow-x-auto p-4 pb-2">
          {IB_LEVELS.map((l, i) => (
            <button key={l.key} type="button" role="tab" aria-selected={pick === i} onClick={() => setPick(i)} className={cn('chip flex-none', pick === i && 'sel')}>
              {l.name}
            </button>
          ))}
        </div>
        <div role="tabpanel" aria-label={`${lv.name} rates`} className="px-4 pb-4">
          {needs && <p className="px-1 pb-2 pt-1 text-[13px] text-[var(--s-tx3)]">{ibNeeds(lv)}</p>}
          <dl>
            {IB_GROUPS.map((g) => (
              <div key={g.key} className="flex items-baseline justify-between gap-4 border-t border-[var(--s-line)] px-1 py-3">
                <dt className="min-w-0">
                  <span className="block text-[14.5px] font-medium text-white">{g.name}</span>
                  <span className="block text-[12px] text-[var(--s-tx3)]">{g.covers}</span>
                </dt>
                <dd className={cn(num, 'flex-none whitespace-nowrap text-white')}>{usd(lv.rates[g.key])}<span className="text-[11px] text-[var(--s-tx3)]"> /lot</span></dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 border-t border-[var(--s-line)] px-1 py-3">
              <dt>
                <span className="block text-[14.5px] font-medium text-white">Kalks FX Options</span>
                <span className="block text-[12px] text-[var(--s-tx3)]">Per contract, round turn</span>
              </dt>
              <dd className={cn(num, 'flex-none whitespace-nowrap text-white')}>{usd(lv.optionsUsd)}<span className="text-[11px] text-[var(--s-tx3)]"> /contract</span></dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
