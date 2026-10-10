import type { Metadata } from 'next';
import { ACADEMY, INSTRUMENTS, LANGUAGES, OPTIONS } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { BentoCard, Btn, Cta, Head, StatStrip } from '@/components/site/ui';
import { Rise } from '@/components/site/Rise';
import { HEROES } from '@/content/heroes';

export const metadata: Metadata = {
  title: 'About Kalks',
  description: `Kalks is a multi-asset trading platform: Kalks FX Options, CFDs on ${INSTRUMENTS.liveMarkets} live markets, prop challenges, copy trading and PAMM, built on our own technology and translated into 22 languages.`,
  alternates: { canonical: '/about' },
};

const PRODUCTS = [
  { t: 'Kalks FX Options', d: `Calls and puts on ${OPTIONS.fxPairsLive} FX pairs, gold, silver and oil, with daily, weekly and monthly expiries.`, href: '/options', tone: 'orange' as const },
  { t: 'CFDs', d: `${INSTRUMENTS.liveMarkets} live markets in forex, metals, energies, indices, crypto and stocks.`, href: '/markets', tone: 'cream' as const },
  { t: 'Prop challenges', d: 'Classic 2-Step, Rapid 1-Step and Instant Funding, with rules checked live on the server.', href: '/prop', tone: 'glass' as const },
  { t: 'Copy trading, PAMM, MAM', d: 'Follow approved masters with your own limits, invest in managed funds, or become a master.', href: '/copy-trading', tone: 'glass' as const },
  { t: 'Partners and white-label', d: 'A five-level partner programme, and the whole platform for brokers under their own brand.', href: '/partners', tone: 'cream' as const },
  { t: 'Academy', d: `${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases, from how markets work to macro regimes and FX options.`, href: '/academy', tone: 'orange' as const },
];

const PRINCIPLES = [
  { t: 'One wallet for everything', d: 'CFD and Options accounts, prop, copy trading, PAMM and partner earnings sit side by side in the Client Area, all funded from one USDT wallet.' },
  { t: 'Plain language', d: 'Every account states its pricing in one line. Every options ticket ends with a card that says what you pay, the most you can lose and how it settles.' },
  { t: 'Built in-house', d: 'The trading engine, market data and candles, option pricing, Kalks Trader and the Client Area: all our own technology.' },
  { t: 'Made for every market', d: 'Kalks Trader and the Client Area speak 22 languages, right to left included, and run in any modern browser and on Android.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        photo="about"
        eyebrow="About Kalks"
        title={
          <>
            Built in-house, <span className="text-white/60">for traders everywhere.</span>
          </>
        }
        lead="Forex options, CFDs, prop challenges, copy trading and a partner programme in one place, on technology we write ourselves, in 22 languages."
        actions={
          <>
            <Btn href={REGISTER_HREF}>Open an account</Btn>
            <Btn href="/contact" variant="ghost" icon={false}>
              Talk to us
            </Btn>
          </>
        }
        aside={
          <HeroGlass>
            <div className="s-num text-[56px]">{INSTRUMENTS.liveMarkets}</div>
            <div className="mt-2 text-[13.5px] text-white/80">markets live on real-money accounts</div>
          </HeroGlass>
        }
      />

      <section className="s-sec" aria-labelledby="n-title">
        <div className="s-wrap">
          <Rise className="mb-14 max-w-[920px]">
            <h2 id="n-title" className="s-statement">
              Six products, <span className="s-mute">one platform, from the first demo trade to running a fund or a brokerage.</span>
            </h2>
          </Rise>
          <StatStrip
            items={[
              { v: INSTRUMENTS.liveMarkets, l: 'Markets live' },
              { v: INSTRUMENTS.assetClasses, l: 'Asset classes' },
              { v: LANGUAGES.length, l: 'Languages' },
              { v: ACADEMY.lessons, l: 'Academy lessons' },
            ]}
          />
        </div>
      </section>

      <section className="s-sec s-band" aria-labelledby="what-title">
        <div className="s-wrap">
          <Head id="what-title" index="01" eyebrow="What we do" title={<>Six products. <span className="s-mute">One platform.</span></>} lead="From the first demo trade to running a fund or a brokerage." />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <BentoCard key={p.t} tone={p.tone} title={p.t} text={p.d} href={p.href} delay={i * 50} />
            ))}
          </div>
        </div>
      </section>

      <section className="s-sec" aria-labelledby="how-title">
        <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
          <Rise className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="s-index">02</span>
              <span className="s-eyebrow">How we build</span>
            </div>
            <h2 id="how-title" className="s-h2">
              Clear, fast <span className="s-mute">and our own.</span>
            </h2>
          </Rise>
          <ol className="border-t border-[var(--s-line)]">
            {PRINCIPLES.map((p, i) => (
              <Rise as="li" key={p.t} delay={i * 60} className="grid gap-3 border-b border-[var(--s-line)] py-8 sm:grid-cols-[64px_1fr]">
                <span className="s-index">0{i + 1}</span>
                <div>
                  <h3 className="s-h3">{p.t}</h3>
                  <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-[var(--s-tx2)]">{p.d}</p>
                </div>
              </Rise>
            ))}
          </ol>
        </div>
      </section>

      <Cta
        title={
          <>
            Trade on a platform <span className="text-white/70">we build every day.</span>
          </>
        }
        sub="Open an account in a couple of minutes, or start on a free demo with live prices."
        primary={{ href: REGISTER_HREF, label: 'Open an account' }}
        secondary={{ href: '/contact', label: 'Talk to us' }}
        image={HEROES.markets}
      />
    </>
  );
}
