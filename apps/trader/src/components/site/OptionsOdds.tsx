import { TrendingUp, TriangleAlert } from 'lucide-react';
import { OPTIONS } from '@/content/facts';
import { Rise } from '@/components/site/Rise';
import { RiskNote } from '@/components/ui/RiskNote';

// Kalks FX Options, both sides (founder 2026-10-28: "tell the risk and opportunity"): what a buyer can gain, what a
// buyer and a seller can lose, and one worked example. Never a promise of profit; the risk wording follows it.

const OPPORTUNITY = [
  { t: 'A fixed, known cost', d: 'Buy a call or a put and the premium you pay is the most you can lose. You see it before you confirm.' },
  { t: 'Bigger moves than the market', d: 'A small move in your direction can change an option’s value by a much larger percentage than the market itself moved.' },
  { t: 'Up or down, short or longer', d: `A call if you think the price rises, a put if it falls. Daily and weekly expiries on ${OPTIONS.fxPairsLive} FX pairs, gold, silver and oil.` },
];

const RISK = [
  { t: 'You can lose the whole premium', d: 'If the market does not move your way by expiry, a bought option can expire worth nothing.' },
  { t: 'Time works against buyers', d: 'An option loses value every day, even when the market does not move. Short expiries lose it fastest.' },
  { t: 'Prices swing fast near expiry', d: 'In the last hours an option’s price can rise or fall sharply within minutes.' },
  { t: 'Selling carries more risk', d: 'Writing an option pays you the premium, but your loss is not limited to it and margin is held.' },
];

/** Opportunity | Risk, then a worked example and the risk wording. */
export function OptionsOdds({ className }: { className?: string }) {
  const col = (title: string, tone: 'up' | 'risk', items: { t: string; d: string }[]) => (
    <div className="s-card pad h-full">
      <div className={`flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] ${tone === 'up' ? 'text-[var(--s-blue,#2447e0)]' : 'text-[#d6303f]'}`}>
        {tone === 'up' ? <TrendingUp className="size-4" aria-hidden /> : <TriangleAlert className="size-4" aria-hidden />}
        {title}
      </div>
      <ul className="mt-5 grid gap-4">
        {items.map((x) => (
          <li key={x.t}>
            <div className="text-[16px] font-semibold text-tx">{x.t}</div>
            <p className="mt-1 text-[14.5px] leading-relaxed text-tx2">{x.d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className={className} data-options-odds>
      <div className="grid gap-4 md:grid-cols-2">
        <Rise className="h-full">{col('The opportunity', 'up', OPPORTUNITY)}</Rise>
        <Rise delay={80} className="h-full">{col('The risk', 'risk', RISK)}</Rise>
      </div>
      <Rise delay={140}>
        <div className="s-card pad mt-4">
          <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-tx3">Example, illustrative only</div>
          <p className="mt-2 max-w-[90ch] text-[15px] leading-relaxed text-tx2">
            You buy one at-the-money gold call (10 oz) for about <b className="text-tx">$195</b>, that is $19.50 an ounce. At expiry: if gold is <b className="text-tx">$40</b> higher, the
            option pays $400, about <b className="text-[var(--s-blue,#2447e0)]">+$205 (+105%)</b>; about <b className="text-tx">$19.50</b> higher, you break even; flat or lower, it expires worthless
            and you lose the <b className="text-[#d6303f]">$195 (−100%)</b>. Before expiry, a quick $20 rise could lift its value by roughly $100 to $120, while time decay works against you every
            day. Prices, premiums and outcomes vary with the market; past performance is not a reliable indicator of future results.
          </p>
        </div>
      </Rise>
      <RiskNote options cfd={false} className="mt-6" />
    </div>
  );
}
