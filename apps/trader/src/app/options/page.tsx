import type { Metadata } from 'next';
import { PageHero, HeroGlass } from '@/components/site/Heroes';
import { Btn, Checks, Cta, Faq, Head, StatStrip, TextLink } from '@/components/site/ui';
import type { Pin } from '@/components/site/Shot';
import { PinTour } from '@/components/site/markets/PinTour';
import { Rise } from '@/components/site/Rise';
import { FactTable, FaqSchema, MiniHead, NumberedRows } from '@/components/site/markets/bits';
import { Payoff, STRATEGY_NOTES } from '@/components/options/Payoff';
import { LiveList, type LiveRow } from '@/components/market/LiveList';
import { RiskNote } from '@/components/ui/RiskNote';
import { DEMO, OPTIONS, OPTIONS_ACCOUNTS } from '@/content/facts';
import { HEROES } from '@/content/heroes';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';
import { getQuotes } from '@/lib/quotes';
import { cn } from '@/lib/cn';

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

const [FEE, FEE_CAP] = OPTIONS.commission.split(', ');

/** the options chain in Kalks Trader, part by part (pins in % of the screenshot) */
const CHAIN_PINS: Pin[] = [
  { x: 31.2, y: 6.4, title: 'Expiry, cut and volatility', text: `The expiry on screen, the countdown to the ${OPTIONS.cut} cut, and the at-the-money implied volatility.` },
  { x: 60.6, y: 11.8, title: 'Quick trade and strategy builder', text: `Turn a view into an option in a few taps, or build spreads, straddles and condors of up to ${OPTIONS.maxLegs} legs. Shift-click prices on the chain to add legs.` },
  { x: 35, y: 13.8, title: 'Chain, charts and analytics', text: 'Switch between the chain, the underlying’s chart, the option’s own chart, both side by side, and analytics.' },
  { x: 26.1, y: 21.9, title: 'Expiries', text: `Daily for ${OPTIONS.expiries.daily}, weekly (W) for ${OPTIONS.expiries.weekly} and monthly (M) for ${OPTIONS.expiries.monthly}.` },
  { x: 84.3, y: 19.4, title: 'Underlyings', text: `${OPTIONS.fxPairsLive} FX pairs, gold, silver, WTI and Brent, with live spot prices. ${OPTIONS.underlyingsSoon.join(', ')} is next.` },
  { x: 22.5, y: 27.5, title: 'Calls', text: 'On the left: profit if the price rises. A buy and a sell price for every strike; tap one to see what you would pay, risk and make.' },
  { x: 55.7, y: 27.5, title: 'Puts', text: 'On the right: profit if the price falls, priced the same way.' },
  { x: 10.7, y: 30.9, title: 'Chance and breakeven', text: 'On every row: the chance the model gives the option of finishing in the money, and the price it needs at expiry to break even.' },
  { x: 45.7, y: 52.8, title: 'The live price', text: 'Drawn across the chain between the strikes, with the at-the-money strike marked ATM.' },
  { x: 15.4, y: 92, title: 'Strikes around the money', text: 'Show 6, 10 or 20 strikes either side of the price, or all of them. In-the-money rows are shaded.' },
];

/** the expiry day, New York time (the cut and the 30-minute window from facts; the stops from the platform rules) */
const EXPIRY_DAY = [
  { t: '09:30', h: 'Settlement window opens', d: 'From here to the cut, one-second mid prices are averaged into the settlement price.' },
  { t: '09:45', h: 'Last new positions', d: 'New positions on the expiry stop 15 minutes before the cut. You can still close.' },
  { t: '09:59', h: 'Final minute', d: 'All trading on the expiry stops.' },
  { t: '10:00', h: 'The cut', d: 'Options expiring today settle in cash, in US dollars, straight to your balance.' },
];

const QUICK = [
  { a: 'Up', b: 'Buys a call' },
  { a: 'Down', b: 'Buys a put' },
  { a: 'Today, tomorrow, later', b: 'A daily, weekly or monthly expiry' },
  { a: 'What happens', b: 'The outcome in plain words, before you confirm' },
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

const RULES = [
  {
    t: 'Selling is allowed, and labelled',
    d: 'Anyone can write options. The ticket says plainly that your risk is not limited to the premium you receive, and shows the margin it uses. Seller margin is stress-tested across 16 price and volatility scenarios.',
  },
  {
    t: 'Analytics that explain the price',
    d: `Volatility smile, term structure, open interest and the put/call ratio for every underlying. Pricing: ${OPTIONS.models}.`,
  },
  {
    t: 'Exchange-style order book',
    tag: <span className="s-chip hot">Coming</span>,
    d: 'Clients trade with each other and the Kalks market maker quotes both sides under the same rules: limit, post-only, IOC and FOK, reduce-only and stop orders.',
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
  const [acc, accPro] = OPTIONS_ACCOUNTS;
  return (
    <>
      <PageHero
        photo="options"
        eyebrow="Kalks FX Options"
        title={
          <>
            Options on forex, <span className="s-mute">with the risk printed first.</span>
          </>
        }
        lead={`Calls and puts on forex, gold, silver and oil, with daily, weekly and monthly expiries. Buy one and the premium is the most you can lose. ${FEE.replace('per contract', 'a contract')}, ${FEE_CAP}, in an Options account of its own.`}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Open account</Btn>
            <Btn href="#how" variant="ghost" icon={false}>
              How it works
            </Btn>
          </>
        }
        facts={[`${OPTIONS.underlyingsLive.length} underlyings`, 'Daily, weekly and monthly expiries', 'Cash-settled in USD']}
        aside={
          <>
            <HeroGlass>
              <div className="s-num text-[44px]">{OPTIONS.cut.split(' ')[0]}</div>
              <div className="mt-2 text-[13.5px] text-white/85">New York cut. Settled in cash, in US dollars.</div>
            </HeroGlass>
            <HeroGlass>
              <div className="s-num text-[44px]">{FEE.split(' ')[0]}</div>
              <div className="mt-2 text-[13.5px] text-white/85">A contract, {FEE_CAP}.</div>
            </HeroGlass>
          </>
        }
      />

      {/* 01 the idea */}
      <section className="s-sec" aria-labelledby="i-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">The idea</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Calls', 'Puts', 'European style'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="i-title" className="s-statement">
              Buy a call or a put and the premium is the most you can lose. <span className="s-mute">A call pays if the market finishes above its strike, a put if it finishes below. Settled in cash in US dollars at {OPTIONS.cut}.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: OPTIONS.underlyingsLive.length, l: 'Underlyings', sub: `${OPTIONS.fxPairsLive} FX pairs, gold, silver, WTI and Brent` },
                  { v: OPTIONS.dailyPerWeek, l: 'Daily expiries a week', sub: 'Plus weekly and monthly expiries' },
                  { v: OPTIONS.strategies.length, l: 'Strategy templates', sub: `Up to ${OPTIONS.maxLegs} legs per order` },
                  { v: FEE.split(' ')[0], l: 'A contract', sub: FEE_CAP.replace(/^c/, 'C') },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 the chain */}
      <section id="how" className="s-sec !pt-8 scroll-mt-20" aria-labelledby="how-title">
        <div className="s-wrap">
          <Head
            id="how-title"
            index="02"
            eyebrow="The chain"
            title={
              <>
                Read a chain <span className="s-mute">in thirty seconds.</span>
              </>
            }
            lead="Every option for one market and one expiry on a single screen in Kalks Trader. Point at a number to see what each part does."
            action={<Btn href="/platforms/trader">Explore Kalks Trader</Btn>}
          />
          <PinTour shot="traderOptions" pins={CHAIN_PINS} layout="under" scrollMin="min-w-[880px]" />
        </div>
      </section>

      {/* 03 expiry day */}
      <section className="s-sec s-band" aria-labelledby="e-title">
        <div className="s-wrap grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          <Rise className="flex flex-col gap-8">
            <MiniHead
              index="03"
              eyebrow="Settlement"
              id="e-title"
              title={
                <>
                  Settled in cash <span className="s-mute">at {OPTIONS.cut}.</span>
                </>
              }
              lead={`${OPTIONS.settlement}. Averaging over half an hour keeps a single spike from deciding the result.`}
            />
            <Checks
              items={['European style: an option settles at expiry, and you can close it any time before', 'Paid in US dollars, straight to your balance, with nothing to deliver', 'Options follow the trading hours of their underlying market']}
            />
          </Rise>
          <Rise delay={100} className="s-card pad">
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.09em] text-[var(--s-tx3)]">An expiry day</span>
              <span className="s-chip">New York time</span>
            </div>
            <ol>
              {EXPIRY_DAY.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[72px_minmax(0,1fr)] gap-5 border-t border-[var(--s-line)] py-5 first:border-t-0 sm:grid-cols-[96px_minmax(0,1fr)]">
                  <span className={cn('s-num text-[30px] sm:text-[36px]', i === EXPIRY_DAY.length - 1 && 'text-[var(--s-orange2)]')}>{s.t}</span>
                  <span>
                    <span className="block text-[16.5px] font-semibold tracking-[-0.01em]">{s.h}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-[var(--s-tx2)]">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Rise>
        </div>
      </section>

      {/* 04 quick trade */}
      <section className="s-sec" aria-labelledby="q-title">
        <div className="s-wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <Rise className="flex flex-col gap-6">
            <MiniHead
              index="04"
              eyebrow="Quick trade"
              id="q-title"
              title={
                <>
                  Up or down. <span className="s-mute">By when. How far.</span>
                </>
              }
              lead="Quick trade turns a view into an option without the jargon. Before you confirm, it shows the cost, the most you can lose and when it settles."
            />
          </Rise>
          <div className="grid gap-4 sm:grid-cols-2">
            {QUICK.map((q, i) => {
              const tone = ['s-orange', 's-cream', 's-card', 's-cream'][i];
              return (
                <Rise key={q.a} delay={i * 70} className="h-full">
                  <div className={cn('s-bento-card h-full !min-h-[190px]', tone)}>
                    <span className={cn('text-[12.5px] font-semibold uppercase tracking-[0.08em]', tone === 's-orange' ? 'text-white/80' : tone === 's-cream' ? 'text-[var(--s-orange)]' : 'text-[var(--s-orange2)]')}>You choose</span>
                    <h3 className="mt-3 text-[clamp(24px,2.3vw,30px)] font-[500] leading-[1.05] tracking-[-0.035em]">{q.a}</h3>
                    <p className={cn('mt-auto pt-6 text-[14.5px] leading-relaxed', tone === 's-orange' ? 'text-white/85' : tone === 's-cream' ? 'text-[var(--s-cream-tx2)]' : 'text-[var(--s-tx2)]')}>{q.b}</p>
                  </div>
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* 05 strategy builder */}
      <section className="s-sec s-band" aria-labelledby="sb-title">
        <div className="s-wrap">
          <Head
            id="sb-title"
            index="05"
            eyebrow="Strategy builder"
            title={
              <>
                Spreads, straddles, <span className="s-mute">iron condors.</span>
              </>
            }
            lead={`Start from a template or build your own: up to ${OPTIONS.maxLegs} legs in one order, filled together or not at all, with the payoff drawn before you send it.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OPTIONS.strategies.map((s, i) => (
              <Rise key={s} delay={(i % 4) * 60} className="s-card flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{s}</h3>
                  <span className="s-chip hot !h-6 !px-2.5 !text-[11.5px]">{STRATEGY_NOTES[s]?.view}</span>
                </div>
                <Payoff name={s} className="mt-5 h-24 w-full overflow-hidden rounded-[14px]" />
                <p className="mt-5 text-[14px] leading-relaxed text-[var(--s-tx2)]">{STRATEGY_NOTES[s]?.d}</p>
              </Rise>
            ))}
          </div>
          <p className="mt-5 text-[12.5px] text-[var(--s-tx3)]">Payoff at expiry, not to scale. Blue: profit. Red: loss. Dashed: breakeven.</p>
        </div>
      </section>

      {/* 06 worked examples */}
      <section className="s-sec" aria-labelledby="ex-title">
        <div className="s-wrap">
          <Head
            id="ex-title"
            index="06"
            eyebrow="Examples"
            title={
              <>
                Three trades, <span className="s-mute">worked through.</span>
              </>
            }
            lead="Illustrative prices to show the arithmetic. Real premiums come from the live chain and move all the time. Commission not included."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {EXAMPLES.map((ex, i) => {
              const tone = ['s-cream', 's-orange', 's-card'][i];
              const muted = tone === 's-cream' ? 'text-[var(--s-cream-tx2)]' : tone === 's-orange' ? 'text-white/80' : 'text-[var(--s-tx3)]';
              const line = tone === 's-cream' ? 'border-[rgba(26,20,16,0.12)]' : tone === 's-orange' ? 'border-white/25' : 'border-[var(--s-line)]';
              return (
                <Rise key={ex.t} delay={i * 80} className="h-full">
                  <div className={cn('s-bento-card h-full', tone)}>
                    <span className={cn('s-num text-[48px]', tone === 's-cream' ? 'text-[var(--s-orange)]' : tone === 's-orange' ? 'text-white' : 'text-[var(--s-orange2)]')}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-5 text-[clamp(22px,2vw,27px)] font-[500] leading-[1.1] tracking-[-0.03em]">{ex.t}</h3>
                    <p className={cn('mt-4 rounded-[14px] px-3.5 py-2.5 text-[14px] font-semibold', tone === 's-cream' ? 'bg-[rgba(242,96,12,0.12)] text-[#a83d00]' : tone === 's-orange' ? 'bg-black/15' : 'bg-[rgba(242,96,12,0.12)] text-[var(--s-orange2)]')}>{ex.trade}</p>
                    <dl className="mt-5">
                      {ex.lines.map(([k, v]) => (
                        <div key={k} className={cn('flex flex-wrap justify-between gap-x-4 gap-y-1 border-t py-3 text-[14px]', line)}>
                          <dt className={muted}>{k}</dt>
                          <dd className="text-right font-semibold [font-variant-numeric:tabular-nums]">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* 07 rules and contract terms */}
      <section className="s-sec s-band" aria-labelledby="r-title">
        <div className="s-wrap">
          <Head
            id="r-title"
            index="07"
            eyebrow="The rules"
            title={
              <>
                Clear rules, <span className="s-mute">stated up front.</span>
              </>
            }
          />
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
            <NumberedRows items={RULES} compact />
            <Rise delay={100}>
              <FactTable
                title="Contract terms"
                rows={[
                  ['Style', 'European, cash-settled in USD'],
                  ['Expiries', `Daily (${OPTIONS.expiries.daily}), weekly (${OPTIONS.expiries.weekly}), monthly (${OPTIONS.expiries.monthly})`],
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
            </Rise>
          </div>
        </div>
      </section>

      {/* 08 underlyings and the account */}
      <section className="s-sec" aria-labelledby="u-title">
        <div className="s-wrap">
          <Head
            id="u-title"
            index="08"
            eyebrow="Underlyings"
            title={
              <>
                Forex majors, <span className="s-mute">metals and oil.</span>
              </>
            }
            lead={`${OPTIONS.fxPairsLive} FX pairs live with ${OPTIONS.underlyingsSoon.join(', ')} next, gold and silver, WTI and Brent crude: the markets you already watch.`}
          />
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <Rise>
              <LiveList rows={UNDERLYINGS} initial={quotes} className="!rounded-[var(--s-r)] !p-3" />
            </Rise>
            <div id="account" className="grid gap-5">
              <Rise delay={80}>
                <div className="s-bento-card s-cream !min-h-0">
                  <span className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--s-orange)]">Options account</span>
                  <h3 className="mt-3 text-[clamp(28px,2.6vw,36px)] font-[500] leading-[1.02] tracking-[-0.035em]">{acc.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--s-cream-tx2)]">{acc.tagline} Daily, weekly and monthly expiries, settled in cash in US dollars.</p>
                  <dl className="mt-6">
                    {[
                      ['Minimum deposit', acc.minDeposit],
                      ['Commission', acc.commission],
                      ['Leverage', acc.leverage],
                      ['Selling options', acc.selling],
                      ['Demo', 'Free, with virtual funds'],
                    ].map(([k, v]) => (
                      <div key={k} className="grid gap-1 border-t border-[rgba(26,20,16,0.12)] py-3 text-[14px] sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-4">
                        <dt className="text-[var(--s-cream-tx2)]">{k}</dt>
                        <dd className="font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Btn href={REGISTER_HREF} variant="dark">
                      Open {acc.name}
                    </Btn>
                  </div>
                </div>
              </Rise>
              <Rise delay={140}>
                <div className="s-card flex flex-col gap-3 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-[22px] font-[500] tracking-[-0.03em]">{accPro.name}</h3>
                    <span className="s-chip hot">Coming soon</span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-[var(--s-tx2)]">{accPro.tagline}</p>
                </div>
              </Rise>
              <Rise delay={180}>
                <p className="text-[14px] leading-relaxed text-[var(--s-tx2)]">
                  Each account trades one product. Hold an Options account next to your CFD account; one USDT wallet funds both, and transfers between them are instant and free.{' '}
                  <TextLink href="/accounts#options">Compare the accounts</TextLink>
                </p>
              </Rise>
            </div>
          </div>
        </div>
      </section>

      {/* 09 questions */}
      <section className="s-sec s-band" aria-labelledby="f-title">
        <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Rise className="flex flex-col items-start gap-6">
            <MiniHead
              index="09"
              eyebrow="Questions"
              id="f-title"
              title={
                <>
                  Options, <span className="s-mute">answered.</span>
                </>
              }
            />
            <TextLink href="/faq">Every question, by topic</TextLink>
          </Rise>
          <Rise delay={100}>
            <Faq items={FAQ} />
            <FaqSchema items={FAQ} />
            <RiskNote options className="mt-10" />
          </Rise>
        </div>
      </section>

      <Cta
        title={
          <>
            Your first option, <span className="text-white/70">on demo.</span>
          </>
        }
        sub={`Open a free demo Options account with ${DEMO.defaultBalance} of virtual money and trade the chain on live prices. Go live when the arithmetic clicks.`}
        primary={{ href: REGISTER_HREF, label: 'Open account' }}
        secondary={{ href: DEMO_HREF, label: 'Try the demo' }}
        facts={[`${OPTIONS.underlyingsLive.length} underlyings`, `${OPTIONS.strategies.length} strategy templates`, `Cut at ${OPTIONS.cut}`]}
        image={HEROES.options}
      />
    </>
  );
}
