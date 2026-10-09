import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, CandlestickChart, Copy, Network, ShieldCheck, Sigma } from 'lucide-react';
import { Btn, RoundArrow } from '@/components/ui/Button';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { ACADEMY, INSTRUMENTS, OPTIONS } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'About Kalks',
  description: `Kalks is a multi-asset trading platform: Kalks FX Options, CFDs on ${INSTRUMENTS.liveMarkets} live markets, prop challenges, copy trading and PAMM, built on our own technology and translated into 22 languages.`,
  alternates: { canonical: '/about' },
};

const PRODUCTS = [
  { Icon: Sigma, t: 'Kalks FX Options', d: `Calls and puts on ${OPTIONS.fxPairsLive} FX pairs, gold, silver and oil, with daily, weekly and monthly expiries.`, href: '/options' },
  { Icon: CandlestickChart, t: 'CFDs', d: `${INSTRUMENTS.liveMarkets} live markets in forex, metals, energies, indices, crypto and stocks.`, href: '/markets' },
  { Icon: ShieldCheck, t: 'Prop challenges', d: 'Classic 2-Step, Rapid 1-Step and Instant Funding, with rules checked live on the server.', href: '/prop' },
  { Icon: Copy, t: 'Copy trading, PAMM, MAM', d: 'Follow approved masters with your own limits, invest in managed funds, or become a master.', href: '/copy-trading' },
  { Icon: Network, t: 'Partners and white-label', d: 'A five-level partner programme, and the whole platform for brokers under their own brand.', href: '/partners' },
  { Icon: BookOpen, t: 'Academy', d: `${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases, from how markets work to macro regimes and FX options.`, href: '/academy' },
];

const PRINCIPLES = [
  {
    t: 'One wallet for everything',
    d: 'CFD and Options accounts, prop, copy trading, PAMM and partner earnings sit side by side in the Client Area, all funded from one USDT wallet.',
  },
  {
    t: 'Plain language',
    d: 'Every account states its pricing in one line. Every options ticket ends with a card that says what you pay, the most you can lose and how it settles.',
  },
  {
    t: 'Built in-house',
    d: 'The trading engine, market data and candles, option pricing, Kalks Trader and the Client Area: all our own technology.',
  },
  {
    t: 'Made for every market',
    d: 'Kalks Trader and the Client Area speak 22 languages, right to left included, and run in any modern browser and on Android.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Kalks"
        title="Built in-house, for traders everywhere."
        lede="Forex options, CFDs, prop challenges, copy trading and a partner programme in one place, on technology we write ourselves, in 22 languages."
        photo="about"
        actions={
          <>
            <Btn href={REGISTER_HREF} v="red" s={56} arrow>
              Open an account
            </Btn>
            <Btn href="/contact" v="ghost" s={56}>
              Talk to us
            </Btn>
          </>
        }
      >
        <StatRow
          items={[
            { v: String(INSTRUMENTS.liveMarkets), l: 'Markets live' },
            { v: String(INSTRUMENTS.assetClasses), l: 'Asset classes' },
            { v: '22', l: 'Languages' },
            { v: String(ACADEMY.lessons), l: 'Academy lessons' },
          ]}
        />
      </PageHero>

      <Section labelledBy="what-title">
        <SectionHead id="what-title" kicker="01 — WHAT WE DO" title="Six products. One platform." lede="From the first demo trade to running a fund or a brokerage." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map(({ Icon, t, d, href }) => (
            <Link key={t} href={href} className="card flex flex-col p-6">
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#e6edff] text-[#2447e0]">
                  <Icon size={20} aria-hidden />
                </span>
                <RoundArrow s={40} />
              </div>
              <h3 className="t-h3 mt-6">{t}</h3>
              <p className="body mt-2">{d}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section labelledBy="how-title" className="sec-last">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead id="how-title" kicker="02 — HOW WE BUILD" title="Clear, fast and our own." />
          <ol className="card flex flex-col px-6 py-2 sm:px-8">
            {PRINCIPLES.map((p, i) => (
              <li key={p.t} className="flex gap-5 border-b border-line py-6 last:border-0">
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="t-h3">{p.t}</h3>
                  <p className="body mt-2 max-w-xl">{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
