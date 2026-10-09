import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import MetroHero from '@/components/ui/scroll-locked-video-hero';
import { Mark } from '@/components/kx/Marks';
import { Rise } from '@/components/kx/Rise';
import { RoleTabs, type Role } from '@/components/kx/RoleTabs';
import { TradingDay, type Slot } from '@/components/kx/TradingDay';
import { AccountCards, type AccountCard } from '@/components/kx/AccountCards';
import { Accordion } from '@/components/kx/Accordion';
import { OpenBand } from '@/components/kx/OpenBand';
import { Photo } from '@/components/kx/Photo';
import { Check } from 'lucide-react';
import { ACADEMY, ACCOUNTS, DEMO, FUNDING, HOURS, IB, INSTRUMENTS, LANGUAGES, LEVERAGE, OPTIONS, OPTIONS_ACCOUNTS, PROP, SOCIAL } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { CRM_URL, DEMO_HREF, REGISTER_HREF } from '@/lib/crm';
import { NY, ymdIn } from '@/lib/tz';
import { PriceStrip, type StripRow } from '@/components/market/PriceStrip';
import { NewsTicker } from '@/components/news/NewsTicker';
import { getQuotes } from '@/lib/quotes';
import { getMarketNews } from '@/lib/marketNews';

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const TITLE = 'Trade forward.';

const STRIP: StripRow[] = [
  { s: 'EURUSD', label: 'EUR/USD', digits: 5 },
  { s: 'XAUUSD', label: 'Gold', digits: 2 },
  { s: 'GBPUSD', label: 'GBP/USD', digits: 5 },
  { s: 'USDJPY', label: 'USD/JPY', digits: 3 },
  { s: 'USOIL', label: 'US Oil', digits: 2 },
];

const FEATURES: { k: 'arrow' | 'ring' | 'plus'; t: string; d: string; href: string; cta: string }[] = [
  {
    k: 'arrow',
    t: 'Kalks FX Options',
    d: `Calls and puts on ${OPTIONS.fxPairsLive} FX pairs, gold, silver and oil. When you buy, the premium is the most you can lose.`,
    href: '/options',
    cta: 'How options work',
  },
  {
    k: 'ring',
    t: `CFDs on ${INSTRUMENTS.liveMarkets} live markets`,
    d: `Forex, metals, energies, indices and crypto, priced all-in or raw plus commission, with leverage up to 1:${LEVERAGE.accountMax}.`,
    href: '/markets',
    cta: 'See the markets',
  },
  {
    k: 'plus',
    t: 'Copy trading and prop',
    d: `Follow an approved master with limits you set, or take a challenge for a simulated account of up to ${PROP[0].sizes[5][0]}.`,
    href: '/copy-trading',
    cta: 'Copy, PAMM and prop',
  },
];

const ROLES: Role[] = [
  {
    role: 'New trader',
    image: 'roleNew',
    pitch: `Start on a demo with ${DEMO.defaultBalance} of virtual money and live prices. When it clicks, go live from ${ACCOUNTS[0].minDeposit} on a Standard or Cent account, and keep learning with ${ACADEMY.lessons} lessons in the Academy.`,
  },
  {
    role: 'Active trader',
    image: 'roleActive',
    pitch: 'Raw spreads with a fixed commission on ECN and VIP, one-click trading, a depth ladder beside the chart, and stops you drag along the price axis.',
  },
  {
    role: 'Options trader',
    image: 'roleOptions',
    pitch: `Chains on ${OPTIONS.underlyingsLive.length} markets with daily, weekly and monthly expiries, ${OPTIONS.strategies.length} ready-made strategies of up to ${OPTIONS.maxLegs} legs, and a card that states your maximum loss before every order.`,
  },
  {
    role: 'Money manager',
    image: 'roleManager',
    pitch: `Run a PAMM fund or a MAM account, or become a copy master after ${SOCIAL.trackRecordDays} days of track record. Your performance fee is charged only on new highs.`,
  },
  {
    role: 'Partner',
    image: 'rolePartner',
    pitch: `Share your link and get paid for the lots your clients trade, ${IB.tiers} tiers deep, across five levels from Bronze to Diamond. Commission arrives in your USDT wallet every Monday.`,
  },
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
  {
    id: 'tokyo',
    title: 'Tokyo session',
    start: '09:00',
    end: '18:00',
    tz: 'Asia/Tokyo',
    who: '09:00 to 18:00 in Tokyo',
    desc: 'The Asian trading day. The yen and the Australian and New Zealand dollars see most of their activity here.',
    tags: ['Forex'],
    days: WEEKDAYS,
  },
  {
    id: 'london',
    title: 'London session',
    start: '08:00',
    end: '17:00',
    tz: 'Europe/London',
    who: '08:00 to 17:00 in London',
    desc: 'The heaviest hours for currencies, and for gold and silver, which are priced through London.',
    tags: ['Forex', 'Metals'],
    days: WEEKDAYS,
  },
  {
    id: 'newyork',
    title: 'New York session',
    start: '08:00',
    end: '17:00',
    tz: NY,
    who: '08:00 to 17:00 in New York',
    desc: 'New York overlaps London until midday: the deepest hours of the day for the dollar pairs and oil.',
    tags: ['Forex', 'Energies'],
    days: WEEKDAYS,
  },
  {
    id: 'window',
    title: 'Options settlement window',
    start: '09:30',
    end: '10:00',
    tz: NY,
    who: 'The 30 minutes that set the settlement price',
    desc: `${OPTIONS.settlement}. Averaging over half an hour keeps a single spike from deciding the result.`,
    tags: ['Options'],
    days: WEEKDAYS,
  },
  {
    id: 'stocks',
    title: 'US stock market',
    start: '09:30',
    end: '16:00',
    tz: NY,
    who: HOURS.usStocks,
    desc: 'US stock CFDs trade during the exchange’s own hours. Index CFDs keep trading through the forex week.',
    tags: ['Stocks'],
    days: WEEKDAYS,
  },
  {
    id: 'cut',
    title: 'Options cut',
    start: '10:00',
    end: '10:15',
    tz: NY,
    who: 'Daily, weekly and monthly expiries settle',
    desc: `Options expiring today settle in cash, in US dollars, straight to your balance. Daily expiries cover ${OPTIONS.expiries.daily}, weekly ones ${OPTIONS.expiries.weekly}.`,
    tags: ['Options'],
    days: WEEKDAYS,
    cal: true,
  },
  {
    id: 'crypto',
    title: 'Crypto never closes',
    who: 'Bitcoin, Ether and more, around the clock',
    desc: 'Crypto CFDs trade 24 hours a day, 7 days a week. Financing is charged every night, weekends included.',
    tags: ['Crypto'],
  },
  {
    id: 'weekend',
    title: 'The forex week closes',
    start: HOURS.rolloverNy,
    tz: NY,
    who: 'Fridays · it reopens Sunday at 17:00 New York',
    desc: `Forex, metals, energies and index CFDs trade ${HOURS.fxWeek}. Crypto keeps going through the weekend.`,
    tags: ['Forex', 'Metals'],
    days: 'FR',
  },
];

const cfd = (id: string) => ACCOUNTS.find((a) => a.id === id)!;
const CARDS: AccountCard[] = [
  { id: 'standard', photo: 'wallLight', name: 'Standard', big: cfd('standard').minDeposit, bigLabel: 'to open', line: `1:1000 · ${cfd('standard').spread} · no commission`, bio: `${cfd('standard').tagline} ${cfd('standard').bestFor}.`, href: '/accounts#standard' },
  { id: 'pro', photo: 'binoculars', name: 'Pro', big: cfd('pro').minDeposit, bigLabel: 'to open', line: `1:500 · ${cfd('pro').spread} · no commission`, bio: `${cfd('pro').tagline} Hedging or netting.`, href: '/accounts#pro' },
  { id: 'ecn', photo: 'towerWindows', name: 'ECN', big: cfd('ecn').minDeposit, bigLabel: 'to open', line: '1:500 · raw spread · $7 a lot', bio: `${cfd('ecn').tagline} ${cfd('ecn').bestFor}.`, href: '/accounts#ecn' },
  { id: 'cent', photo: 'cloudRest', name: 'Cent', big: cfd('cent').minDeposit, bigLabel: 'to open', line: '1:1000 · balances in US cents', bio: `${cfd('cent').tagline} Margin call ${cfd('cent').marginCall}, stop-out ${cfd('cent').stopOut}.`, href: '/accounts#cent' },
  { id: 'vip', photo: 'brutalistRed', name: 'VIP', big: cfd('vip').minDeposit, bigLabel: 'to open', line: '1:500 · raw spread · $3 a lot', bio: `${cfd('vip').tagline} ${cfd('vip').bestFor}.`, href: '/accounts#vip' },
  { id: 'options-standard', photo: 'redMoon', name: OPTIONS_ACCOUNTS[0].name, big: '$0.25', bigLabel: 'a contract', line: 'No account minimum · no leverage', bio: `${OPTIONS_ACCOUNTS[0].tagline} Commission is capped at 10% of the premium.`, href: '/accounts#options' },
  { id: 'options-pro', photo: 'towersUp', name: OPTIONS_ACCOUNTS[1].name, big: 'Soon', bigLabel: 'in the Client Area', line: OPTIONS_ACCOUNTS[1].tagline, bio: 'The same options, with lower per-contract fees for larger accounts. Details when it opens.', href: '/accounts#options', soon: true },
  { id: 'demo', photo: 'handshake', name: 'Demo', big: DEMO.defaultBalance, bigLabel: 'virtual funds', line: `Every market · refill ${DEMO.refillsPerDay}× a day`, bio: `Pick any balance from ${DEMO.balanceRange}. Live prices, no risk.`, href: '/accounts/demo' },
];


const FAQ_PICK = [
  'Which accounts are there?',
  'Can one account trade CFDs and options?',
  'How do I deposit?',
  'What is the most I can lose?',
  'Is the demo account free?',
  'Which prop plans are there?',
  'Is there a mobile app?',
];
const FAQ_ITEMS = FAQ_PICK.map((q) => FAQ_GROUPS.flatMap((g) => g.items).find((i) => i.q === q)).filter(Boolean) as { q: string; a: string }[];

export default async function HomePage() {
  const ymd = ymdIn(Date.now(), NY);
  const [quotes, news] = await Promise.all([getQuotes(STRIP.map((r) => r.s)), getMarketNews(`${CRM_URL}/calendar`)]);
  return (
    <>
      <div className="kx-hero-wrap" data-cover>
        <MetroHero />
      </div>

      {/* the arrow field band */}
      <section className="kx-open" aria-labelledby="open-title">
        <div className="kx-open-copy">
          <h2 id="open-title" className="kx-h1">
            {/* letters rise in one by one; a translated page shows the plain line instead (no per-letter translation) */}
            <span className="kx-ch-wrap notranslate" translate="no" aria-hidden>
              {TITLE.split('').map((c, i) => (
                <span key={i} className="kx-ch" style={{ ['--i' as string]: i }}>
                  {c === ' ' ? '\u00a0' : c}
                </span>
              ))}
            </span>
            <span className="kx-title-plain">{TITLE}</span>
          </h2>
          <p className="kx-open-tag">
            Options, CFDs and copy trading,
            <br />
            funded from one USDT wallet.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={REGISTER_HREF} className="kx-btn prim lg">
              Open an account <ArrowUpRight size={17} aria-hidden />
            </a>
            <a href={DEMO_HREF} className="kx-btn ghost lg">
              Try the demo
            </a>
          </div>
        </div>
      </section>

      {/* market pulse: live prices and the news line */}
      <section className="kx-wrap -mt-6 flex flex-col gap-3" aria-label="Live prices and market news">
        <PriceStrip rows={STRIP} initial={quotes} />
        <NewsTicker initial={news} />
      </section>

      {/* on the platform */}
      <section className="kx-sec" aria-labelledby="plat-title">
        <div className="kx-wrap">
          <Rise>
            <h2 id="plat-title" className="kx-h2">
              On the platform
            </h2>
            <p className="kx-intro">
              Three ways to put money to work and one Client Area to run them. Every one of them can be practised on a free demo before
              you go live.
            </p>
          </Rise>
          <div className="kx-features">
            {FEATURES.map((f, i) => (
              <Rise key={f.t} delay={i * 90}>
                <Link href={f.href} className="kx-feature">
                  <Mark k={f.k} />
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                  <span className="kx-link">
                    {f.cta} <ArrowUpRight size={14} aria-hidden />
                  </span>
                </Link>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* who it's for */}
      <section className="kx-sec" aria-labelledby="who-title">
        <div className="kx-wrap">
          <Rise>
            <h2 id="who-title" className="kx-h2">
              Who it&rsquo;s for
            </h2>
            <RoleTabs roles={ROLES} />
          </Rise>
        </div>
      </section>

      {/* your trading day */}
      <section className="kx-sec" aria-labelledby="day-title">
        <div className="kx-wrap">
          <Rise className="kx-head mb-8">
            <div>
              <h2 id="day-title" className="kx-h2">
                Your trading day
              </h2>
              <p className="kx-intro">
                The Kalks day turns over at 17:00 New York. Filter by market, open a row for the detail, and save the moments you trade
                around to your calendar.
              </p>
            </div>
          </Rise>
          <div className="kx-panel pad">
            <TradingDay slots={SLOTS} ymd={ymd} />
          </div>
        </div>
      </section>

      {/* accounts as halftone cards */}
      <section className="kx-sec" aria-labelledby="acc-title">
        <div className="kx-wrap">
          <Rise className="kx-head">
            <div>
              <h2 id="acc-title" className="kx-h2">
                Pick your account
              </h2>
              <p className="kx-intro">
                Five CFD accounts priced two ways, an Options account of its own, and a free demo of each. Hold them side by side; one
                USDT wallet funds them all.
              </p>
            </div>
            <Link href="/accounts" className="kx-btn ghost">
              Compare every detail <ArrowUpRight size={15} aria-hidden />
            </Link>
          </Rise>
          <AccountCards cards={CARDS} />
        </div>
      </section>

      {/* everywhere you are */}
      <section className="kx-sec" aria-labelledby="where-title">
        <div className="kx-wrap">
          <Rise>
            <h2 id="where-title" className="kx-h2">
              Everywhere you are
            </h2>
          </Rise>
          <div className="kx-where">
            <Rise className="kx-where-info">
              <h3>22 languages, one account</h3>
              <p className="text-[15px] leading-relaxed text-[var(--kx-tx2)]">
                Kalks Trader and the Client Area are translated in full, with Arabic, Urdu and Persian laid out right to left. Switch at any
                time; your accounts stay exactly as they are.
              </p>
              <ul className="kx-notes">
                {[
                  'In any modern browser, desktop or phone',
                  'Android app for Kalks Trader and the Client Area',
                  `Fund with USDT from ${FUNDING.minDeposit}, usually within a minute`,
                  'Support chat inside the Client Area',
                ].map((n) => (
                  <li key={n}>
                    <Check size={15} aria-hidden /> {n}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
                <Link href="/platforms/android" className="kx-btn light">
                  Get the Android app <ArrowUpRight size={15} aria-hidden />
                </Link>
                <Link href="/platforms" className="kx-link">
                  All platforms
                </Link>
              </div>
            </Rise>
            <div className="kx-panel kx-where-panel">
              <div className="kx-photo-box kx-where-photo">
                <Photo k="redMoon" sizes="(max-width: 640px) 44vw, 340px" />
              </div>
              <div className="flex flex-col justify-end p-5 sm:p-7">
                <p className="kx-kicker">22 languages</p>
                <ul className="kx-langs mt-4">
                  {LANGUAGES.map((l) => (
                    <li key={l} className="notranslate" translate="no">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* on your mind */}
      <section className="kx-sec" aria-labelledby="faq-title">
        <div className="kx-wrap">
          <Rise>
            <h2 id="faq-title" className="kx-h2">
              On your mind
            </h2>
            <div className="kx-panel pad mt-8 !pt-2">
              <Accordion items={FAQ_ITEMS} />
            </div>
            <p className="mt-6">
              <Link href="/faq" className="kx-link">
                Every question, by topic <ArrowUpRight size={14} aria-hidden />
              </Link>
            </p>
          </Rise>
        </div>
      </section>

      <OpenBand
        registerUrl={`${CRM_URL}/register`}
        demoUrl={DEMO_HREF}
        title="Open your account"
        sub={`Register in a couple of minutes, practise on ${DEMO.defaultBalance} of demo money, and go live when you are ready.`}
      />
    </>
  );
}
