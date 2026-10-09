import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, FactList, Feature } from '@/components/ui/Section';
import { Faq } from '@/components/ui/Faq';
import { RiskNote } from '@/components/ui/RiskNote';
import { OptionChain } from '@/components/mock/OptionChain';
import { QuickTicket } from '@/components/mock/QuickTicket';
import { Payoff, STRATEGY_NOTES } from '@/components/options/Payoff';
import { LiveList, type LiveRow } from '@/components/market/LiveList';
import { OPTIONS, OPTIONS_ACCOUNTS } from '@/content/facts';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';
import { getQuotes } from '@/lib/quotes';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Kalks FX Options: calls and puts on forex, gold, silver and oil',
  description:
    'Buy or sell calls and puts on 8 FX pairs, gold, silver and oil with daily, weekly and monthly expiries. Settled in cash in US dollars. $0.25 a contract, capped at 10% of the premium.',
  alternates: { canonical: '/options' },
};

const UNDERLYINGS: LiveRow[] = [
  { s: 'EURUSD', name: 'Euro / US Dollar', digits: 5, group: 'FOREX' },
  { s: 'GBPUSD', name: 'British Pound / US Dollar', digits: 5, group: 'FOREX' },
  { s: 'USDJPY', name: 'US Dollar / Japanese Yen', digits: 3, group: 'FOREX' },
  { s: 'AUDUSD', name: 'Australian Dollar / US Dollar', digits: 5, group: 'FOREX' },
  { s: 'USDCAD', name: 'US Dollar / Canadian Dollar', digits: 5, group: 'FOREX' },
  { s: 'USDCHF', name: 'US Dollar / Swiss Franc', digits: 5, group: 'FOREX' },
  { s: 'EURJPY', name: 'Euro / Japanese Yen', digits: 3, group: 'FOREX' },
  { s: 'GBPJPY', name: 'British Pound / Japanese Yen', digits: 3, group: 'FOREX' },
  { s: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', digits: 5, group: 'FOREX', soon: true },
  { s: 'XAUUSD', name: 'Gold / US Dollar', digits: 2, group: 'METALS' },
  { s: 'XAGUSD', name: 'Silver / US Dollar', digits: 3, group: 'METALS' },
  { s: 'USOIL', name: 'WTI crude oil', digits: 2, group: 'ENERGIES' },
  { s: 'UKOIL', name: 'Brent crude oil', digits: 2, group: 'ENERGIES' },
];

const CHAIN_NOTES = [
  { t: 'Expiries', d: 'Daily for the next five business days, weekly (W) on Fridays, monthly (M) at month-end.' },
  { t: 'Calls', d: 'On the left, in blue. A call pays if the market finishes above its strike.' },
  { t: 'Strikes', d: 'In the middle, with the live price drawn across the chain.' },
  { t: 'Puts', d: 'On the right, in red. A put pays if the market finishes below its strike.' },
  { t: 'Breakeven and chance', d: 'Where an option starts to pay at expiry, and the chance the model gives it.' },
];

const EXAMPLES = [
  {
    t: 'You think gold rises before Friday.',
    trade: 'Buy 1 XAUUSD call, strike 4,150, weekly',
    lines: [
      ['You pay', '$28 (1 oz)'],
      ['Breakeven', '4,178'],
      ['Gold settles at 4,200', 'It pays $50: you make $22'],
      ['Gold at or below 4,150', 'It expires: you lose $28'],
    ],
  },
  {
    t: 'You hold EURUSD and fear a drop at the ECB meeting.',
    trade: 'Buy 1 EURUSD put, strike 1.1150, daily',
    lines: [
      ['You pay', '$8 (10,000 EUR)'],
      ['EURUSD settles at 1.1050', 'It pays $100 against your CFD loss'],
      ['EURUSD stays above 1.1150', 'You lose the $8, like insurance'],
      ['Most you can lose', '$8'],
    ],
  },
  {
    t: 'You expect a big oil move, either way.',
    trade: 'Buy a USOIL straddle at 88.00',
    lines: [
      ['You pay', '$9 + $8 = $17 (10 barrels)'],
      ['Breakevens', '86.30 and 89.70'],
      ['Oil settles at 92.00', 'The call pays $40: you make $23'],
      ['Oil settles at 88.00', 'Both expire: you lose $17'],
    ],
  },
];

const FAQ = [
  {
    q: 'What is an FX option?',
    a: 'The right, not the obligation, to gain if a market finishes above or below a price (the strike) at a set time (the expiry). A call pays above the strike, a put below it. Kalks FX Options are European style: they settle at expiry, and you can close them any time before.',
  },
  {
    q: 'Can I lose more than I pay?',
    a: 'Not when you buy. The most you can lose is the premium you paid. Selling (writing) an option is different: you receive the premium, your loss is not limited to it, and the position uses margin.',
  },
  {
    q: 'Do I need a separate account?',
    a: 'Yes, an Options account. Each Kalks account trades one product, so you open an Options account next to your CFD account in the Client Area. One USDT wallet funds both, and moving money between them is instant and free. Prop, copy trading, PAMM and MAM accounts cannot trade options.',
  },
  {
    q: 'How do options settle?',
    a: `In cash, in US dollars, automatically. The settlement price is the average of one-second mid prices over the 30 minutes before the ${OPTIONS.cut} cut, so a single tick cannot decide the outcome.`,
  },
  {
    q: 'What does it cost?',
    a: `The premium shown on the chain, plus ${OPTIONS.commission}.`,
  },
  {
    q: 'When can I trade?',
    a: 'Options follow the hours of their underlying market. New positions stop 15 minutes before the cut, and all trading on an expiry stops in its final minute.',
  },
  {
    q: 'Can I practise first?',
    a: 'Yes. Open a free demo Options account in the Client Area and trade with virtual funds on live prices.',
  },
];

export default async function OptionsPage() {
  const quotes = await getQuotes(UNDERLYINGS.filter((u) => !u.soon).map((u) => u.s));
  const acc = OPTIONS_ACCOUNTS[0];
  return (
    <>
      <PageHero
        kicker="Kalks FX Options"
        title="Options on forex, with the risk printed first."
        lede="Calls and puts on forex, gold, silver and oil, with daily, weekly and monthly expiries. Buy one and the premium is the most you can lose. $0.25 a contract, capped at 10% of the premium, in an Options account of its own."
        photo="options"
        actions={
          <>
            <Btn href={REGISTER_HREF} v="wht" s={56} arrow>
              Open account
            </Btn>
            <Btn href="#how" v="ghost" s={56}>
              How it works
            </Btn>
          </>
        }
      >
        <StatRow items={[
          { v: String(OPTIONS.underlyingsLive.length), l: `Underlyings: ${OPTIONS.fxPairsLive} FX pairs, gold, silver, WTI and Brent` },
          { v: String('Daily'), l: `${OPTIONS.dailyPerWeek} a week, plus weekly and monthly expiries` },
          { v: String(OPTIONS.strategies.length), l: `Strategy templates, up to ${OPTIONS.maxLegs} legs per order` },
          { v: String('USD'), l: 'Settled in cash, straight to your balance' },
        ]} />
      </PageHero>

      <Section id="how" labelledBy="how-title">
        <SectionHead
          id="how-title"
          kicker="01 — THE CHAIN"
          title="Read a chain in thirty seconds."
          lede="Every option for one market and one expiry on a single screen. Tap a price and the ticket opens with that option filled in."
        />
        <OptionChain numbered />
        <ol className="mt-6 grid gap-x-6 gap-y-1 sm:grid-cols-2 xl:grid-cols-5">
          {CHAIN_NOTES.map((m, i) => (
            <li key={m.t} className="flex gap-3 border-t border-line py-4">
              <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-[#2447e0] font-mono text-[11.5px] font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-[15px] font-semibold">{m.t}</h3>
                <p className="mt-1 text-[14px] leading-relaxed text-tx2">{m.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="qt-title">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
          <QuickTicket className="mx-auto max-lg:order-2" />
          <div>
            <SectionHead id="qt-title" kicker="02 — QUICK TRADE" title="Up or down. By when. How far." className="!mb-6" />
            <p className="lede max-w-[46ch]">
              Quick trade turns a view into an option without the jargon. Before you confirm, it shows the cost, the most you can
              lose and when it settles.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                ['Up', 'Buys a call'],
                ['Down', 'Buys a put'],
                ['Today, tomorrow, later', 'Daily, weekly or monthly expiry'],
                ['What happens', 'The outcome in plain words, before you confirm'],
              ].map(([a, b]) => (
                <li key={a} className="card p-4">
                  <p className="text-[15px] font-semibold">{a}</p>
                  <p className="mt-1 text-[14px] text-tx2">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="sb-title">
        <SectionHead
          id="sb-title"
          kicker="03 — STRATEGY BUILDER"
          title="Spreads, straddles, iron condors."
          lede={`Start from a template or build your own: up to ${OPTIONS.maxLegs} legs in one order, filled together or not at all, with the payoff drawn before you send it.`}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {OPTIONS.strategies.map((s) => (
            <div key={s} className="card flex flex-col p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[16px] font-semibold">{s}</h3>
                <span className="tag">{STRATEGY_NOTES[s]?.view}</span>
              </div>
              <Payoff name={s} className="mt-4 h-20 w-full overflow-hidden rounded-[10px]" />
              <p className="mt-4 text-[14px] leading-relaxed text-tx2">{STRATEGY_NOTES[s]?.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11.5px] text-tx3">Payoff at expiry, not to scale. Blue: profit. Red: loss. Dashed: breakeven.</p>
      </Section>

      <Section labelledBy="ex-title">
        <SectionHead
          id="ex-title"
          kicker="04 — EXAMPLES"
          title="Three trades, worked through."
          lede="Illustrative prices to show the arithmetic. Real premiums come from the live chain and move all the time. Commission not included."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {EXAMPLES.map((ex, i) => (
            <div key={ex.t} className="card flex flex-col p-6">
              <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="t-h3 mt-5">{ex.t}</h3>
              <p className="mt-3 rounded-[12px] bg-yel-soft px-3.5 py-2.5 text-[14px] font-semibold text-yel-tx">{ex.trade}</p>
              <FactList className="mt-4" items={ex.lines.map(([k, v]) => [k, v] as [string, string])} />
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="rules-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead id="rules-title" kicker="05 — THE RULES" title="Clear rules, stated up front." className="!mb-6" />
            <div className="grid gap-4">
              <Feature
                t="Selling is allowed, and labelled"
                d="Anyone can write options. The ticket says plainly that your risk is not limited to the premium you receive, and shows the margin it uses. Seller margin is stress-tested across 16 price and volatility scenarios."
              />
              <Feature
                t="Analytics that explain the price"
                d={`Volatility smile, term structure, open interest and the put/call ratio for every underlying. Pricing: ${OPTIONS.models}.`}
              />
              <div className="card flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="t-h3 !text-[18px]">Exchange-style order book</h3>
                  <span className="st st-warn">Coming</span>
                </div>
                <p className="body !text-[14.5px]">
                  Clients trade with each other and the Kalks market maker quotes both sides under the same rules: limit, post-only,
                  IOC and FOK, reduce-only and stop orders.
                </p>
              </div>
            </div>
          </div>
          <div className="card self-start p-6 sm:p-8">
            <h3 className="font-mono text-[12px] font-semibold tracking-[0.04em] text-red-tx">CONTRACT TERMS</h3>
            <FactList
              className="mt-3"
              items={[
                ['Style', 'European, cash-settled in USD'],
                ['Expiries', 'Daily (next 5 business days), weekly (next 4 Fridays), monthly (next 3 month-ends)'],
                ['Cut', OPTIONS.cut],
                ['Settlement price', 'Average of 1-second mids over the last 30 minutes'],
                ['FX contract', OPTIONS.contract.fx],
                ['Gold · Silver', `${OPTIONS.contract.xau} · ${OPTIONS.contract.xag}`],
                ['WTI · Brent', OPTIONS.contract.oil],
                ['Contracts per order', OPTIONS.contractsPerOrder],
                ['Commission', OPTIONS.commission],
                ['Last new position', '15 minutes before the cut'],
                ['Buying', 'No margin; the most you can lose is the premium'],
                ['Selling', 'Uses margin; losses can exceed the premium'],
                ['Account', `An Options account (${acc.name}); CFDs trade in a separate CFD account`],
              ]}
            />
          </div>
        </div>
      </Section>

      <Section labelledBy="und-title">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              id="und-title"
              kicker="06 — UNDERLYINGS"
              title="Forex majors, metals and oil."
              className="!mb-6"
            />
            <p className="lede max-w-[40ch]">
              {OPTIONS.fxPairsLive} FX pairs live with NZDUSD next, gold and silver, WTI and Brent crude: the markets you already watch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={REGISTER_HREF} v="red" arrow>
                Open account
              </Btn>
              <Btn href={DEMO_HREF} v="ghost">
                Try the demo
              </Btn>
            </div>
          </div>
          <LiveList rows={UNDERLYINGS} initial={quotes} />
        </div>
      </Section>

      <Section labelledBy="faq-title" className="sec-last">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead id="faq-title" kicker="07 — QUESTIONS" title="Options, answered." />
          <div>
            <Faq items={FAQ} schema />
            <RiskNote options className="mt-8" />
          </div>
        </div>
      </Section>
    </>
  );
}
