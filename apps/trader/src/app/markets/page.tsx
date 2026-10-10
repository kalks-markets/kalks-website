import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHero } from '@/components/site/Heroes';
import { BentoCard, Btn, Cta, Faq, Head, StatStrip, TextLink, type BentoTone } from '@/components/site/ui';
import { Rise } from '@/components/site/Rise';
import type { Pin, ShotDef } from '@/components/site/Shot';
import { PinTour } from '@/components/site/markets/PinTour';
import { FaqSchema, MiniHead, NumberedRows } from '@/components/site/markets/bits';
import { LiveBoard } from '@/components/market/PriceStrip';
import { MarketsTable } from '@/components/market/MarketsTable';
import { RiskNote } from '@/components/ui/RiskNote';
import { ACCOUNTS, DEMO, FUNDING, INSTRUMENTS, LEVERAGE } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES } from '@/content/heroes';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';
import { getQuotes } from '@/lib/quotes';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Markets: ${INSTRUMENTS.liveMarkets} live markets in forex, metals, energies, indices and crypto`,
  description: `Trade CFDs on ${INSTRUMENTS.liveMarkets} live markets: ${INSTRUMENTS.byClass.forex.live} forex pairs, ${INSTRUMENTS.byClass.metals.live} metals, ${INSTRUMENTS.byClass.energies.live} energies, ${INSTRUMENTS.byClass.indices.live} indices and ${INSTRUMENTS.byClass.crypto.live} cryptocurrencies, with 1,100 US, Hong Kong and Tokyo stocks on demo. Search every market with live prices.`,
  alternates: { canonical: '/markets' },
};

const C = INSTRUMENTS.byClass;

/** one market per class, live in the hero */
const BOARD = [
  { s: 'EURUSD', label: 'EUR/USD', name: 'Forex', digits: 5 },
  { s: 'XAUUSD', label: 'Gold', name: 'Metals', digits: 2 },
  { s: 'USOIL', label: 'US Oil', name: 'Energies', digits: 2 },
  { s: 'NAS100', label: 'Nasdaq 100', name: 'Indices', digits: 1 },
  { s: 'BTCUSD', label: 'Bitcoin', name: 'Crypto', digits: 2 },
];

const CLASSES: { id: string; name: string; live: number; unit: string; href: string; lev: string; hours: string; eg: string; d: string; tone: BentoTone; soon?: boolean }[] = [
  {
    id: 'forex',
    name: 'Forex',
    live: C.forex.live,
    unit: 'pairs live',
    href: '/markets/forex',
    lev: `Up to 1:${LEVERAGE.coreCaps.forex}`,
    hours: '24 hours, Monday to Friday',
    eg: 'EURUSD · GBPUSD · USDJPY · AUDUSD · EURGBP · USDCNH',
    d: 'Majors, minors and exotics, priced from the interbank feed.',
    tone: 'orange',
  },
  {
    id: 'metals',
    name: 'Metals',
    live: C.metals.live,
    unit: 'metals live',
    href: '/markets/metals-energies',
    lev: `Up to 1:${LEVERAGE.coreCaps.metals} on gold`,
    hours: '24 hours, Monday to Friday, 1-hour daily break',
    eg: 'XAUUSD · XAGUSD · XPTUSD · copper',
    d: 'Gold and silver against the dollar, platinum, copper and more.',
    tone: 'cream',
  },
  {
    id: 'energies',
    name: 'Energies',
    live: C.energies.live,
    unit: 'energies live',
    href: '/markets/metals-energies',
    lev: `Up to 1:${LEVERAGE.coreCaps.energies}`,
    hours: '23 hours, Monday to Friday',
    eg: 'USOIL (WTI) · UKOIL (Brent) · natural gas',
    d: 'The two crude oil benchmarks and natural gas.',
    tone: 'glass',
  },
  {
    id: 'indices',
    name: 'Indices',
    live: C.indices.live,
    unit: 'indices live',
    href: '/markets/indices',
    lev: `Up to 1:${LEVERAGE.coreCaps.indices}`,
    hours: 'Each index on its exchange hours',
    eg: 'US30 · NAS100 · SPX500 · GER40 · UK100 · JP225 · HK50',
    d: 'Benchmark indices from Wall Street to Frankfurt, London, Tokyo and Hong Kong.',
    tone: 'glass',
  },
  {
    id: 'crypto',
    name: 'Crypto',
    live: C.crypto.live,
    unit: 'coins live',
    href: '/markets/crypto',
    lev: `Up to 1:${LEVERAGE.coreCaps.crypto}`,
    hours: '24/7, weekends included',
    eg: 'BTCUSD · ETHUSD · SOLUSD · XRPUSD · BNBUSD · DOGEUSD',
    d: 'Bitcoin, Ether and over 150 more coins against the dollar, long or short, as CFDs.',
    tone: 'cream',
  },
  {
    id: 'stocks',
    name: 'Stocks',
    live: C.stocks.live,
    unit: 'live · more soon',
    href: '/markets?class=stocks#list',
    lev: `Up to 1:${LEVERAGE.coreCaps.stocks}`,
    hours: 'Exchange hours (US 09:30–16:00 New York)',
    eg: 'AAPL · NVDA · TSLA · META · NFLX · 00700.HK · 7203.JP',
    d: 'Apple, NVIDIA, Tesla, Meta and Netflix live today. 800 US, 150 Hong Kong and 150 Tokyo stocks on demo, coming to live accounts.',
    tone: 'glass',
    soon: true,
  },
];

/** crop of the instruments panel in Kalks Trader (trader-workspace.webp) */
const INSTRUMENTS_SHOT: ShotDef = {
  src: '/site/shots/markets-instruments.webp',
  w: 690,
  h: 912,
  alt: 'The instruments panel in Kalks Trader: search, favourites, asset-class tabs and live bid, ask and daily change for each market',
};

const PANEL_PINS: Pin[] = [
  { x: 55.7, y: 4, title: 'Order book and ticks', text: 'The depth of the market and the latest ticks, one tab over.' },
  { x: 68, y: 12.4, title: 'Search', text: 'Type a symbol to find any market, live or demo.' },
  { x: 85.5, y: 12.4, title: 'List or tiles', text: 'Show the markets as a list or as tiles.' },
  { x: 36.2, y: 33.4, title: 'Favourites', text: 'Star the markets you watch; the star tab lists only them.' },
  { x: 43, y: 23.6, title: 'One tab per asset class', text: 'Filter the list by asset class, or show them all.' },
  { x: 65, y: 26.8, title: 'Bid and ask, live', text: 'Both prices with every tick. The large digits are the pips, the small one is the fraction of a pip.' },
  { x: 82.5, y: 26.8, title: 'The day’s change', text: 'Blue when a market is up on the day, red when it is down.' },
];

const CONDITIONS = [
  { t: 'Spreads', d: 'Measured on the live stream for each market. Your account adds its stated markup, or none with a commission.' },
  { t: 'Overnight financing', d: 'Shown in Kalks Trader in its real unit before you trade: a yearly percentage for most markets. Crypto is charged every night.' },
  { t: 'Contract sizes', d: 'Set per market and shown in the order ticket. Crypto and index lots are sized to about 1,000 to 10,000 USD.' },
  { t: 'Protection', d: 'Margin call at 100% and stop out at 50% (Cent: 60% and 20%). Negative balance protection resets a negative balance to zero.' },
];

const FAQ = FAQ_GROUPS.find((g) => g.id === 'trading')!.items;

export default async function MarketsPage() {
  const quotes = await getQuotes(BOARD.map((r) => r.s));
  return (
    <>
      <PageHero
        photo="markets"
        eyebrow="Markets"
        title={
          <>
            {INSTRUMENTS.liveMarkets} markets, <span className="s-mute">live on real money.</span>
          </>
        }
        lead={`Forex, metals, energies, indices and crypto, long or short, from ${ACCOUNTS[0].minDeposit}. The full catalogue of ${INSTRUMENTS.total.toLocaleString('en-US')} markets, stocks included, is open on a free demo.`}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Open an account</Btn>
            <Btn href="#list" variant="ghost" icon={false}>
              Search the markets
            </Btn>
          </>
        }
        facts={[`${INSTRUMENTS.total.toLocaleString('en-US')} on demo`, `Leverage up to 1:${LEVERAGE.accountMax}`, 'Crypto 24/7']}
        aside={<LiveBoard rows={BOARD} initial={quotes} />}
      />

      {/* 01 in numbers */}
      <section className="s-sec" aria-labelledby="n-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">The markets</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Long', 'Short', 'Leverage'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              CFDs let you go long or short with leverage, without owning the asset. <span className="s-mute">The leverage on a trade is the lower of your account’s and the market’s own cap.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: INSTRUMENTS.liveMarkets, l: 'Live markets', sub: 'On real-money accounts' },
                  { v: INSTRUMENTS.total.toLocaleString('en-US'), l: 'On demo', sub: 'Every market, stocks included' },
                  { v: `1:${LEVERAGE.accountMax}`, l: 'Highest leverage', sub: 'Standard and Cent accounts' },
                  { v: '24/7', l: 'Crypto', sub: 'Weekends included' },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 asset classes */}
      <section className="s-sec !pt-4" aria-labelledby="c-title">
        <div className="s-wrap">
          <Head
            id="c-title"
            index="02"
            eyebrow="Asset classes"
            title={
              <>
                Six asset classes <span className="s-mute">to choose from.</span>
              </>
            }
            lead={`${INSTRUMENTS.assetClasses} classes, one account. Each class has its own leverage cap and trading hours.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CLASSES.map((c, i) => {
              const sub = c.tone === 'cream' ? 'text-[var(--s-cream-tx2)]' : c.tone === 'orange' ? 'text-white/85' : 'text-[var(--s-tx2)]';
              return (
                <BentoCard key={c.id} tone={c.tone} kicker={c.lev} title={c.name} href={c.href} delay={(i % 3) * 60} text={c.d} className="min-h-[360px]">
                  <div className="flex items-baseline gap-3">
                    <span className="s-num text-[clamp(56px,5.4vw,80px)]">{c.live}</span>
                    <span className={`text-[14px] font-medium ${sub}`}>{c.unit}</span>
                  </div>
                  <div className={`mt-3 text-[13.5px] ${sub}`}>{c.hours}</div>
                  <p className={`mt-4 font-mono text-[11.5px] leading-relaxed ${sub}`}>{c.eg}</p>
                </BentoCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 the live list */}
      <section id="list" className="s-sec s-band scroll-mt-20" aria-labelledby="list-title">
        <div className="s-wrap">
          <Head
            id="list-title"
            index="03"
            eyebrow="Live list"
            title={
              <>
                Find <span className="s-hot">your market.</span>
              </>
            }
            lead="Filter by class or search by symbol or name. Live markets stream their prices; demo-only stocks show their latest snapshot."
          />
          <Rise className="[&_.card]:!rounded-[var(--s-r)] [&_.card]:!bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] [&_.overflow-x-auto]:max-h-[660px] [&_.overflow-x-auto]:overflow-y-auto [&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-[1] [&_thead_th]:bg-[#121010]">
            <Suspense fallback={null}>
              <MarketsTable />
            </Suspense>
          </Rise>
        </div>
      </section>

      {/* 04 in Kalks Trader */}
      <section className="s-sec" aria-labelledby="t-title">
        <div className="s-wrap">
          <Head
            id="t-title"
            index="04"
            eyebrow="In Kalks Trader"
            title={
              <>
                Every market, <span className="s-mute">one panel.</span>
              </>
            }
            lead="Beside the chart in Kalks Trader, the instruments panel lists every market you can trade with its live prices. Point at a number to see each part."
            action={<Btn href="/platforms/trader">Explore Kalks Trader</Btn>}
          />
          <PinTour shot={INSTRUMENTS_SHOT} pins={PANEL_PINS} maxW="max-w-[460px]" cols="lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]" />
        </div>
      </section>

      {/* 05 conditions */}
      <section className="s-sec s-band" aria-labelledby="cond-title">
        <div className="s-wrap">
          <Head
            id="cond-title"
            index="05"
            eyebrow="Conditions"
            title={
              <>
                What you see <span className="s-mute">is what you pay.</span>
              </>
            }
            action={<TextLink href="/accounts#compare">Compare the accounts</TextLink>}
          />
          <NumberedRows items={CONDITIONS} />
          <RiskNote className="mt-10" />
        </div>
      </section>

      {/* 06 questions */}
      <section className="s-sec" aria-labelledby="f-title">
        <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Rise className="flex flex-col items-start gap-6">
            <MiniHead
              index="06"
              eyebrow="Questions"
              id="f-title"
              title={
                <>
                  Trading <span className="s-mute">conditions.</span>
                </>
              }
            />
            <TextLink href="/faq">Every question, by topic</TextLink>
          </Rise>
          <Rise delay={100}>
            <Faq items={FAQ} />
            <FaqSchema items={FAQ} />
          </Rise>
        </div>
      </section>

      <Cta
        title={
          <>
            Try every market <span className="text-white/70">on demo.</span>
          </>
        }
        sub={`All ${INSTRUMENTS.total.toLocaleString('en-US')} markets trade on a free demo with ${DEMO.defaultBalance} of virtual money and live prices. Go live from ${ACCOUNTS[0].minDeposit} when you are ready.`}
        primary={{ href: REGISTER_HREF, label: 'Open an account' }}
        secondary={{ href: DEMO_HREF, label: 'Try the demo' }}
        facts={[`${INSTRUMENTS.liveMarkets} live markets`, `Fund with ${FUNDING.minDeposit}`, `${FUNDING.withdrawalFee} withdrawal fee`]}
        image={HEROES.markets}
      />
    </>
  );
}
