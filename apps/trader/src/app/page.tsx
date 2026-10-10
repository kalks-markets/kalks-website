import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ACADEMY, ACCOUNTS, DEMO, FUNDING, HOURS, IB, INSTRUMENTS, LANGUAGES, LEVERAGE, OPTIONS, OPTIONS_ACCOUNTS, PROP, SOCIAL } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { CRM_URL, DEMO_HREF, LOGIN_HREF, REGISTER_HREF } from '@/lib/crm';
import { NY, ymdIn } from '@/lib/tz';
import { PriceStrip, type StripRow } from '@/components/market/PriceStrip';
import { getQuotes } from '@/lib/quotes';
import { WordmarkHero } from '@/components/site/Heroes';
import { BentoCard, Btn, Checks, Cta, Faq, Head, StatStrip, TextLink } from '@/components/site/ui';
import { FeatureSplit, Phone, Shot, ShotTour, type Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { TradingDay, type Slot } from '@/components/site/TradingDay';
import { HEROES } from '@/content/heroes';

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const STRIP: StripRow[] = [
  { s: 'EURUSD', label: 'EUR/USD', digits: 5 },
  { s: 'XAUUSD', label: 'Gold', digits: 2 },
  { s: 'GBPUSD', label: 'GBP/USD', digits: 5 },
  { s: 'USDJPY', label: 'USD/JPY', digits: 3 },
  { s: 'USOIL', label: 'US Oil', digits: 2 },
];

/** the Kalks Trader workspace, part by part (pins in % of the screenshot) */
const TRADER_PINS: Pin[] = [
  { x: 5.5, y: 8.4, title: 'Charts as tabs', text: 'Open several markets side by side, switch timeframes from M1 to MN, and split the screen into 1, 2 or 4 charts.' },
  { x: 47.5, y: 8.4, title: 'One-click Sell · lot · Buy', text: 'A slim bar in the chart toolbar: set the lot size and trade at the live price, or open the full ticket first. It never covers the candles.' },
  { x: 62, y: 65.5, title: 'Position, stop and target lines', text: 'Every position, stop loss and take profit is a line on the chart with its live P&L. Drag a line to move the level.' },
  { x: 2, y: 30, title: 'Drawing tools', text: 'Trend lines, horizontal levels, channels, rectangles and the crosshair, on a rail beside the chart.' },
  { x: 82.5, y: 8.4, title: 'Instruments, order book and ticks', text: `${INSTRUMENTS.liveMarkets} live markets with bid, ask and the day's change, favourites, search by symbol, and the depth of the market.` },
  { x: 25, y: 96.8, title: 'Account at a glance', text: 'Balance, equity, floating P&L, margin, free margin and margin level, updated with every tick.' },
];

const OPTIONS_PINS: Pin[] = [
  { x: 27, y: 10.5, title: 'Expiries', text: `Daily, weekly and monthly: ${OPTIONS.expiries.daily}, ${OPTIONS.expiries.weekly} and ${OPTIONS.expiries.monthly}.` },
  { x: 12, y: 36, title: 'Calls and puts by strike', text: 'Buy and sell prices for every strike, around the money, with the current price marked in the middle.' },
  { x: 9.5, y: 22.5, title: 'Chance and breakeven', text: 'The chance of finishing in the money and the price you need at expiry, on every row.' },
  { x: 33, y: 5, title: 'Quick trade and strategy builder', text: `One tap for a call or a put, or ${OPTIONS.strategies.length} ready-made strategies of up to ${OPTIONS.maxLegs} legs, with the most you can lose shown first.` },
];

const ROLES = [
  { role: 'New trader', pitch: `Start on a demo with ${DEMO.defaultBalance} of virtual money and live prices. When it clicks, go live from ${ACCOUNTS[0].minDeposit} on a Standard or Cent account, and keep learning with ${ACADEMY.lessons} lessons in the Academy.`, href: '/accounts/demo' },
  { role: 'Active trader', pitch: 'Raw spreads with a fixed commission on ECN and VIP, one-click trading, a depth ladder beside the chart, and stops you drag along the price axis.', href: '/platforms/trader' },
  { role: 'Options trader', pitch: `Chains on ${OPTIONS.underlyingsLive.length} markets with daily, weekly and monthly expiries, ${OPTIONS.strategies.length} ready-made strategies of up to ${OPTIONS.maxLegs} legs, and a card that states your maximum loss before every order.`, href: '/options' },
  { role: 'Money manager', pitch: `Run a PAMM fund or a MAM account, or become a copy master after ${SOCIAL.trackRecordDays} days of track record. Your performance fee is charged only on new highs.`, href: '/copy-trading' },
  { role: 'Partner', pitch: `Share your link and get paid for the lots your clients trade, ${IB.tiers} tiers deep, across five levels from Bronze to Diamond. Commission arrives in your USDT wallet every Monday.`, href: '/partners' },
];

const WEEKDAYS = 'MO,TU,WE,TH,FR';
/* The platform's day, from the 17:00 New York rollover (00:00 server time). */
const SLOTS: Slot[] = [
  {
    id: 'rollover',
    title: 'A new trading day begins',
    start: HOURS.rolloverNy,
    tz: NY,
    who: 'Server time 00:00 · overnight financing is booked',
    desc: `Positions held past ${HOURS.rolloverNy} New York are charged or credited overnight financing, shown for each market in Kalks Trader. ${HOURS.tripleSwap.forexMetals} counts three times for forex and metals, ${HOURS.tripleSwap.indicesEnergies} for indices and energies.`,
    tags: ['Forex', 'Metals'],
    days: 'MO,TU,WE,TH',
  },
  { id: 'tokyo', title: 'Tokyo session', start: '09:00', end: '18:00', tz: 'Asia/Tokyo', who: '09:00 to 18:00 in Tokyo', desc: 'The Asian trading day. The yen and the Australian and New Zealand dollars see most of their activity here.', tags: ['Forex'], days: WEEKDAYS },
  { id: 'london', title: 'London session', start: '08:00', end: '17:00', tz: 'Europe/London', who: '08:00 to 17:00 in London', desc: 'The heaviest hours for currencies, and for gold and silver, which are priced through London.', tags: ['Forex', 'Metals'], days: WEEKDAYS },
  { id: 'newyork', title: 'New York session', start: '08:00', end: '17:00', tz: NY, who: '08:00 to 17:00 in New York', desc: 'New York overlaps London until midday: the deepest hours of the day for the dollar pairs and oil.', tags: ['Forex', 'Energies'], days: WEEKDAYS },
  { id: 'window', title: 'Options settlement window', start: '09:30', end: '10:00', tz: NY, who: 'The 30 minutes that set the settlement price', desc: `${OPTIONS.settlement}. Averaging over half an hour keeps a single spike from deciding the result.`, tags: ['Options'], days: WEEKDAYS },
  { id: 'stocks', title: 'US stock market', start: '09:30', end: '16:00', tz: NY, who: HOURS.usStocks, desc: 'US stock CFDs trade during the exchange’s own hours. Index CFDs keep trading through the forex week.', tags: ['Stocks'], days: WEEKDAYS },
  { id: 'cut', title: 'Options cut', start: '10:00', end: '10:15', tz: NY, who: 'Daily, weekly and monthly expiries settle', desc: `Options expiring today settle in cash, in US dollars, straight to your balance. Daily expiries cover ${OPTIONS.expiries.daily}, weekly ones ${OPTIONS.expiries.weekly}.`, tags: ['Options'], days: WEEKDAYS, cal: true },
  { id: 'crypto', title: 'Crypto never closes', who: 'Bitcoin, Ether and more, around the clock', desc: 'Crypto CFDs trade 24 hours a day, 7 days a week. Financing is charged every night, weekends included.', tags: ['Crypto'] },
  { id: 'weekend', title: 'The forex week closes', start: HOURS.rolloverNy, tz: NY, who: 'Fridays · it reopens Sunday at 17:00 New York', desc: `Forex, metals, energies and index CFDs trade ${HOURS.fxWeek}. Crypto keeps going through the weekend.`, tags: ['Forex', 'Metals'], days: 'FR' },
];

const cfd = (id: string) => ACCOUNTS.find((a) => a.id === id)!;

const FAQ_PICK = ['Which accounts are there?', 'Can one account trade CFDs and options?', 'How do I deposit?', 'What is the most I can lose?', 'Is the demo account free?', 'Which prop plans are there?', 'Is there a mobile app?'];
const FAQ_ITEMS = FAQ_PICK.map((q) => FAQ_GROUPS.flatMap((g) => g.items).find((i) => i.q === q)).filter(Boolean) as { q: string; a: string }[];

export default async function HomePage() {
  const ymd = ymdIn(Date.now(), NY);
  const quotes = await getQuotes(STRIP.map((r) => r.s));
  return (
    <>
      <WordmarkHero
        line="Options, CFDs and copy trading, funded from one USDT wallet."
        side={`${LANGUAGES.length} languages · Android app · USDT on TRON and BNB Chain`}
        ring={{ href: REGISTER_HREF, label: 'Open account' }}
        intro={[
          <h2 key="a" className="text-[clamp(36px,3.6vw,56px)] font-[500] leading-[0.98] tracking-[-0.045em] text-white">
            Who we
            <br />
            are?
          </h2>,
          <p key="b" className="max-w-[46ch] text-[clamp(17px,1.45vw,21px)] leading-[1.6] text-white/92">
            <span className="text-[1.5em] font-[500] leading-none">K</span>alks is a broker built on its own technology:{' '}
            <b className="font-semibold text-white">Kalks FX Options</b>, CFDs on {INSTRUMENTS.liveMarkets} live markets, copy trading and prop
            challenges, all in one Client Area.
          </p>,
          <div key="c" className="flex flex-col gap-5">
            <p className="text-[clamp(26px,2.3vw,36px)] font-[300] leading-[1.08] tracking-[-0.035em] text-white">
              Start trading
              <br />
              from {ACCOUNTS[0].minDeposit}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Btn href={LOGIN_HREF} variant="dark" size="sm">
                Log in
              </Btn>
              <Btn href={DEMO_HREF} variant="ghost" size="sm" icon={false}>
                Try the demo
              </Btn>
            </div>
          </div>,
        ]}
      />

      {/* live prices */}
      <section className="s-wrap relative z-[2] -mt-2 pb-4" aria-label="Live prices">
        <PriceStrip rows={STRIP} initial={quotes} />
      </section>

      {/* 01 the platform in numbers */}
      <section className="s-sec" aria-labelledby="p-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">The platform</span>
              </div>
              <div className="flex gap-2">
                {['TRC20', 'BEP20', 'Android'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="p-title" className="s-statement">
              We build the platform we trade on. <span className="s-mute">Options where the premium is the most you can lose, CFDs priced two ways, and copy trading with limits you set, in one Client Area on one wallet.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: INSTRUMENTS.liveMarkets, l: 'Live markets', sub: 'Forex, metals, energies, indices, crypto' },
                  { v: `1:${LEVERAGE.accountMax}`, l: 'Maximum leverage', sub: 'Standard and Cent accounts' },
                  { v: ACCOUNTS[0].minDeposit, l: 'To open a live account', sub: `Fund with ${FUNDING.minDeposit}` },
                  { v: LANGUAGES.length, l: 'Languages', sub: 'Arabic, Urdu and Persian right to left' },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 Kalks Trader, part by part */}
      <section className="s-sec !pt-8" aria-labelledby="t-title">
        <div className="s-wrap">
          <Head
            id="t-title"
            index="02"
            eyebrow="Kalks Trader"
            title={
              <>
                The terminal, <span className="s-mute">part by part.</span>
              </>
            }
            lead="Our own trading terminal in the browser and on Android. Point at a number to see what each part does."
            action={<Btn href="/platforms/trader">Explore Kalks Trader</Btn>}
          />
          <ShotTour shot="traderWorkspace" pins={TRADER_PINS} />
        </div>
      </section>

      {/* 03 order ticket */}
      <section className="s-sec" aria-label="The order ticket">
        <div className="s-wrap">
          <FeatureSplit
            index="03"
            eyebrow="Order ticket"
            title={
              <>
                Every number <span className="s-mute">before you click.</span>
              </>
            }
            text="The ticket shows the margin you need, the pip value, the position size, your free margin after the trade and the overnight swap, before you choose Sell or Buy."
            points={
              <Checks
                items={['Market, limit, stop and stop-limit orders', 'Volume presets from 0.01 lot, or type your own', 'Stop loss and take profit by price, pips or money', 'Trailing stop, comment and maximum price change', 'One-click trading when you want speed']}
              />
            }
            media={
              <div className="relative mx-auto max-w-[460px]">
                <div aria-hidden className="absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(circle,rgba(242,96,12,0.35),transparent_65%)] sm:-inset-10" />
                <Shot shot="traderTicket" />
              </div>
            }
          />
        </div>
      </section>

      {/* 04 positions */}
      <section className="s-sec !pt-0" aria-labelledby="pos-title">
        <div className="s-wrap">
          <Rise className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="s-index">04</span>
                <span className="s-eyebrow">Positions</span>
              </div>
              <h2 id="pos-title" className="s-h2 !text-[clamp(30px,3.4vw,50px)]">
                Live P&amp;L, <span className="s-mute">one click to close.</span>
              </h2>
            </div>
            <p className="s-lead lg:justify-self-end">Open price to current price, stops and targets you can add inline, swap and commission, and bulk actions: close all, close profitable, close losing, close by symbol or move every stop to breakeven.</p>
          </Rise>
          <Rise>
            <Shot shot="traderPositions" />
          </Rise>
        </div>
      </section>

      {/* 05 options */}
      <section className="s-sec s-band" aria-labelledby="o-title">
        <div className="s-wrap">
          <Head
            id="o-title"
            index="05"
            eyebrow="Kalks FX Options"
            title={
              <>
                Options, <span className="s-hot">made simple.</span>
              </>
            }
            lead={`Calls and puts on ${OPTIONS.fxPairsLive} FX pairs, gold, silver and oil. Buy an option and the premium is the most you can lose. Cash-settled in US dollars at ${OPTIONS.cut}.`}
            action={<Btn href="/options">How options work</Btn>}
          />
          <ShotTour shot="traderOptions" pins={OPTIONS_PINS} side="right" />
        </div>
      </section>

      {/* 06 phone */}
      <section className="s-sec" aria-label="On your phone">
        <div className="s-wrap">
          <FeatureSplit
            index="06"
            eyebrow="On your phone"
            title={
              <>
                The same terminal <span className="s-mute">in your pocket.</span>
              </>
            }
            text="Kalks Trader on Android and in any phone browser: the chart with your lines, Sell and Buy at the bottom, watchlist, positions and history one tap away."
            points={<Checks items={['Android app for Kalks Trader and the Client Area', `Translated in full, ${LANGUAGES.length} languages`, 'Sign in once, switch accounts in a tap']} />}
            action={<Btn href="/platforms/android">Get the Android app</Btn>}
            media={<Phone />}
            flip
          />
        </div>
      </section>

      {/* 07 Client Area */}
      <section className="s-sec s-band" aria-labelledby="c-title">
        <div className="s-wrap">
          <Head
            id="c-title"
            index="07"
            eyebrow="Client Area"
            title={
              <>
                Everything around <span className="s-mute">your trading.</span>
              </>
            }
            lead="Your wallet, accounts, copy trading, partner programme and support, in one place. Your accounts look like cards; the AI assistant answers questions about your account."
            action={<TextLink href="/platforms/client-area">Tour the Client Area</TextLink>}
          />
          <div className="grid gap-5 lg:grid-cols-3">
            <Rise className="s-card overflow-hidden p-3 lg:col-span-2">
              <Shot shot="caDashboard" flat />
              <div className="px-3 pb-2 pt-5">
                <div className="text-[18px] font-semibold tracking-[-0.02em]">Home</div>
                <p className="mt-1 text-[14px] text-[var(--s-tx2)]">Ask the AI assistant, see every balance, and hide the amounts with one tap.</p>
              </div>
            </Rise>
            <div className="grid gap-5">
              <Rise delay={80} className="s-card overflow-hidden p-3">
                <Shot shot="caAccounts" flat />
                <div className="px-3 pb-2 pt-4 text-[15px] font-semibold">Accounts as cards</div>
              </Rise>
              <Rise delay={140} className="s-card overflow-hidden p-3">
                <Shot shot="caCopy" flat />
                <div className="px-3 pb-2 pt-4 text-[15px] font-semibold">Copy trading masters</div>
              </Rise>
            </div>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {[
              { shot: 'caWallet' as const, t: 'USDT wallet', d: `${FUNDING.methods}, ${FUNDING.creditTime}.` },
              { shot: 'caPamm' as const, t: 'PAMM funds', d: 'Invest by units at the next rollover NAV; fees only above the high-water mark.' },
              { shot: 'caTypes' as const, t: 'Account types as cards', d: 'Every account type side by side, with its minimum deposit and maximum leverage.' },
            ].map((c, i) => (
              <Rise key={c.t} delay={i * 70} className="s-card overflow-hidden p-3">
                <Shot shot={c.shot} flat />
                <div className="px-3 pb-2 pt-4">
                  <div className="text-[15px] font-semibold">{c.t}</div>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--s-tx2)]">{c.d}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* 08 accounts */}
      <section className="s-sec" aria-labelledby="a-title">
        <div className="s-wrap">
          <Head
            id="a-title"
            index="08"
            eyebrow="Accounts"
            title={
              <>
                Pick your <span className="s-hot">account.</span>
              </>
            }
            lead="Five CFD accounts priced two ways, an Options account of its own, and a free demo of each. Hold them side by side; one USDT wallet funds them all."
            action={<Btn href="/accounts">Compare every detail</Btn>}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:row-span-2">
              <BentoCard tone="orange" kicker="Most traders" title="Standard" href="/accounts#standard" text={cfd('standard').tagline} className="min-h-[420px]">
                <div className="s-num text-[clamp(64px,7vw,104px)]">{cfd('standard').minDeposit}</div>
                <div className="mt-2 text-[14px] font-medium text-white/85">to open · 1:1000 · {cfd('standard').spread}</div>
              </BentoCard>
            </div>
            {(['pro', 'ecn', 'cent'] as const).map((id, i) => (
              <BentoCard key={id} tone={i === 1 ? 'glass' : 'cream'} title={cfd(id).name} href={`/accounts#${id}`} delay={i * 60} text={`${cfd(id).pricing} · ${cfd(id).leverage}`}>
                <div className="s-num text-[52px]">{cfd(id).minDeposit}</div>
                <div className={i === 1 ? 'mt-2 text-[13px] text-[var(--s-tx2)]' : 'mt-2 text-[13px] text-[var(--s-cream-tx2)]'}>{cfd(id).commission === 'None' ? cfd(id).spread : cfd(id).commission}</div>
              </BentoCard>
            ))}
            <BentoCard tone="glass" title="VIP" href="/accounts#vip" text={`${cfd('vip').commission} · ${cfd('vip').leverage}`}>
              <div className="s-num text-[52px]">{cfd('vip').minDeposit}</div>
            </BentoCard>
            <BentoCard tone="cream" kicker="Options" title={OPTIONS_ACCOUNTS[0].name} href="/accounts#options" text={OPTIONS_ACCOUNTS[0].commission}>
              <div className="s-num text-[52px]">$0.25</div>
              <div className="mt-2 text-[13px] text-[var(--s-cream-tx2)]">a contract · no account minimum</div>
            </BentoCard>
            <BentoCard tone="glass" kicker="Free" title="Demo" href="/accounts/demo" text={`Any balance from ${DEMO.balanceRange}, refilled ${DEMO.refillsPerDay}× a day.`}>
              <div className="s-num text-[52px]">{DEMO.defaultBalance}</div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* 09 who it's for */}
      <section className="s-sec !pt-4" aria-labelledby="w-title">
        <div className="s-wrap">
          <Head
            id="w-title"
            index="09"
            eyebrow="Who it's for"
            title={
              <>
                Built for how <span className="s-mute">you trade.</span>
              </>
            }
          />
          <ol className="border-t border-[var(--s-line)]">
            {ROLES.map((r, i) => (
              <Rise as="li" key={r.role} delay={i * 50} className="border-b border-[var(--s-line)]">
                <Link href={r.href} className="group grid items-baseline gap-3 py-8 lg:grid-cols-[80px_minmax(0,0.9fr)_minmax(0,1.6fr)_48px] lg:gap-8">
                  <span className="s-index">0{i + 1}</span>
                  <span className="text-[clamp(28px,3vw,44px)] font-[400] leading-none tracking-[-0.04em] transition-colors group-hover:text-[var(--s-orange2)]">{r.role}</span>
                  <span className="text-[15.5px] leading-relaxed text-[var(--s-tx2)]">{r.pitch}</span>
                  <span className="hidden size-11 place-items-center rounded-full border border-[var(--s-line2)] transition-[background-color,transform] group-hover:rotate-45 group-hover:bg-[var(--s-orange)] lg:grid" aria-hidden>
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      {/* 10 the trading day */}
      <section className="s-sec !pt-4" aria-labelledby="d-title">
        <div className="s-wrap">
          <Head
            id="d-title"
            index="10"
            eyebrow="Your trading day"
            title={
              <>
                The day turns over <span className="s-mute">at 17:00 New York.</span>
              </>
            }
            lead="Filter by market, open a row for the detail, and save the moments you trade around to your calendar."
          />
          <Rise className="s-card pad">
            <TradingDay slots={SLOTS} ymd={ymd} />
          </Rise>
        </div>
      </section>

      {/* 11 questions */}
      <section className="s-sec !pt-4" aria-labelledby="f-title">
        <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Rise className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-4">
              <span className="s-index">11</span>
              <span className="s-eyebrow">Questions</span>
            </div>
            <h2 id="f-title" className="s-h2">
              On your <span className="s-mute">mind.</span>
            </h2>
            <TextLink href="/faq">Every question, by topic</TextLink>
          </Rise>
          <Rise delay={100}>
            <Faq items={FAQ_ITEMS} />
          </Rise>
        </div>
      </section>

      <Cta
        title={
          <>
            Open your account <span className="text-white/70">today.</span>
          </>
        }
        sub={`Register in a couple of minutes, practise on ${DEMO.defaultBalance} of demo money, and go live from ${ACCOUNTS[0].minDeposit} when you are ready.`}
        primary={{ href: `${CRM_URL}/register`, label: 'Open account' }}
        secondary={{ href: DEMO_HREF, label: 'Try the demo' }}
        facts={[`${PROP.length} prop plans`, `${ACADEMY.lessons} Academy lessons`, `${FUNDING.withdrawalFee} withdrawal fee`]}
        image={HEROES.options}
      />
    </>
  );
}
