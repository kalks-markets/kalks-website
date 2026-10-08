import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Hero } from '@/components/ui/Hero';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, Feature } from '@/components/ui/Section';
import { RiskNote } from '@/components/ui/RiskNote';
import { Badges } from '@/components/ui/Flag';
import { LiveBoard } from '@/components/market/PriceStrip';
import { MarketsTable } from '@/components/market/MarketsTable';
import { INSTRUMENTS, LEVERAGE } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';
import { getQuotes } from '@/lib/quotes';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Markets: ${INSTRUMENTS.liveMarkets} live markets in forex, metals, energies, indices and crypto`,
  description: `Trade CFDs on ${INSTRUMENTS.liveMarkets} live markets: ${INSTRUMENTS.byClass.forex.live} forex pairs, ${INSTRUMENTS.byClass.metals.live} metals, ${INSTRUMENTS.byClass.energies.live} energies, ${INSTRUMENTS.byClass.indices.live} indices and ${INSTRUMENTS.byClass.crypto.live} cryptocurrencies, with 1,100 US, Hong Kong and Tokyo stocks on demo. Search every market with live prices.`,
  alternates: { canonical: '/markets' },
};

const BOARD = [
  { s: 'EURUSD', label: 'EUR/USD', name: 'Forex', digits: 5 },
  { s: 'XAUUSD', label: 'Gold', name: 'Metals', digits: 2 },
  { s: 'USOIL', label: 'WTI oil', name: 'Energies', digits: 2 },
  { s: 'NAS100', label: 'US Tech 100', name: 'Indices', digits: 1, cls: 'indices' },
  { s: 'BTCUSD', label: 'Bitcoin', name: 'Crypto · 24/7', digits: 2, cls: 'crypto' },
  { s: 'NVDA', label: 'NVIDIA', name: 'Stocks', digits: 2, cls: 'stocks' },
];

const C = INSTRUMENTS.byClass;
const CLASSES = [
  {
    id: 'forex',
    name: 'Forex',
    live: C.forex.live,
    sym: 'EURUSD',
    lev: `Up to 1:${LEVERAGE.coreCaps.forex}`,
    hours: '24 hours, Monday to Friday',
    eg: 'EURUSD · GBPUSD · USDJPY · AUDUSD · EURGBP · USDCNH',
    d: 'Majors, minors and exotics, priced from the interbank feed.',
  },
  {
    id: 'metals',
    name: 'Metals',
    live: C.metals.live,
    sym: 'XAUUSD',
    lev: `Up to 1:${LEVERAGE.coreCaps.metals} on gold`,
    hours: '24 hours, Monday to Friday, 1-hour daily break',
    eg: 'XAUUSD · XAGUSD · XPTUSD · copper',
    d: 'Gold and silver against the dollar, platinum, copper and more.',
  },
  {
    id: 'energies',
    name: 'Energies',
    live: C.energies.live,
    sym: 'USOIL',
    lev: `Up to 1:${LEVERAGE.coreCaps.energies}`,
    hours: '23 hours, Monday to Friday',
    eg: 'USOIL (WTI) · UKOIL (Brent) · natural gas',
    d: 'The two crude oil benchmarks and natural gas.',
  },
  {
    id: 'indices',
    name: 'Indices',
    live: C.indices.live,
    sym: 'NAS100',
    lev: `Up to 1:${LEVERAGE.coreCaps.indices}`,
    hours: 'Each index on its exchange hours',
    eg: 'US30 · NAS100 · SPX500 · GER40 · UK100 · JP225 · HK50',
    d: 'Benchmark indices from Wall Street to Frankfurt, London, Tokyo and Hong Kong.',
  },
  {
    id: 'crypto',
    name: 'Crypto',
    live: C.crypto.live,
    sym: 'BTCUSD',
    lev: `Up to 1:${LEVERAGE.coreCaps.crypto}`,
    hours: '24/7, weekends included',
    eg: 'BTCUSD · ETHUSD · SOLUSD · XRPUSD · BNBUSD · DOGEUSD',
    d: 'Bitcoin, Ether and over 150 more coins against the dollar, long or short, as CFDs.',
  },
  {
    id: 'stocks',
    name: 'Stocks',
    live: C.stocks.live,
    sym: 'NVDA',
    lev: `Up to 1:${LEVERAGE.coreCaps.stocks}`,
    hours: 'Exchange hours (US 09:30–16:00 New York)',
    eg: 'AAPL · NVDA · TSLA · META · NFLX · 00700.HK · 7203.JP',
    d: 'Apple, NVIDIA, Tesla, Meta and Netflix live today. 800 US, 150 Hong Kong and 150 Tokyo stocks on demo, coming to live accounts.',
    soon: true,
  },
];

export default async function MarketsPage() {
  const quotes = await getQuotes(BOARD.map((b) => b.s));
  return (
    <>
      <Hero
        tone="yellow"
        kicker="MARKETS"
        title={`${INSTRUMENTS.liveMarkets} markets live. Six asset classes.`}
        lede="Forex, metals, energies, indices, crypto and stocks, long or short, from $10. Every market, the 1,100 demo-only stocks included, trades on a free demo."
        actions={
          <>
            <Btn href={REGISTER_HREF} v="red" s={56} arrow>
              Open account
            </Btn>
            <Btn href="#list" v="ghost" s={56}>
              Search markets
            </Btn>
          </>
        }
        facts={`Prices from the Kalks market-data feed · checked ${INSTRUMENTS.checked}`}
        art={
          <div className="flex h-full items-center">
            <LiveBoard rows={BOARD} initial={quotes} />
          </div>
        }
        strip={[
          { v: INSTRUMENTS.liveMarkets, l: 'Markets live on real-money accounts' },
          { v: INSTRUMENTS.total.toLocaleString('en-US'), l: 'Markets on demo, stocks included' },
          { v: `1:${LEVERAGE.accountMax}`, l: 'Maximum leverage, on FX with Standard and Cent' },
          { v: '24/7', l: 'Crypto, weekends included' },
        ]}
      />

      <Section labelledBy="classes-title">
        <SectionHead
          id="classes-title"
          kicker="01 — ASSET CLASSES"
          title="Every market that moves."
          lede="CFDs let you go long or short with leverage, without owning the asset. The leverage on a trade is the lower of your account’s and the market’s own cap."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CLASSES.map((c) => (
            <a key={c.id} href={`/markets?class=${c.id}#list`} className="card flex flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Badges symbol={c.sym} cls={c.id} size={30} />
                  <h3 className="t-h3 !text-[22px]">{c.name}</h3>
                </div>
                {c.soon ? <span className="st st-warn">{c.live} live · more soon</span> : <span className="tag live">{c.live} live</span>}
              </div>
              <p className="body mt-4">{c.d}</p>
              <dl className="facts mt-5">
                <div>
                  <dt>Leverage</dt>
                  <dd>{c.lev}</dd>
                </div>
                <div>
                  <dt>Hours</dt>
                  <dd>{c.hours}</dd>
                </div>
              </dl>
              <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-tx3">{c.eg}</p>
            </a>
          ))}
        </div>
      </Section>

      <Section id="list" labelledBy="list-title">
        <SectionHead id="list-title" kicker="02 — LIVE LIST" title="Find your market." />
        <Suspense fallback={null}>
          <MarketsTable />
        </Suspense>
      </Section>

      <Section labelledBy="cond-title" className="sec-last">
        <SectionHead id="cond-title" kicker="03 — CONDITIONS" title="What you see is what you pay." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Feature t="Spreads" d="Measured on the live stream for each market. Your account adds its stated markup, or none with a commission." />
          <Feature
            t="Overnight financing"
            d="Shown in Kalks Trader in its real unit before you trade: a yearly percentage for most markets. Crypto is charged every night."
          />
          <Feature t="Contract sizes" d="Set per market and shown in the order ticket. Crypto and index lots are sized to about 1,000 to 10,000 USD." />
          <Feature t="Protection" d="Margin call at 100% and stop out at 50% (Cent: 60% and 20%). Negative balance protection resets a negative balance to zero." />
        </div>
        <RiskNote className="mt-8" />
      </Section>
    </>
  );
}
