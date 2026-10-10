import type { Metadata } from 'next';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { BentoCard, Btn, Cta, Head, StatStrip, type BentoTone } from '@/components/site/ui';
import { Shot } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { MiniHead, Related } from '@/components/site/platforms/bits';
import { API_FEATURES as API } from '@/content/platforms';
import { ALGO, LANGUAGES, TRADER } from '@/content/facts';
import { HEROES } from '@/content/heroes';
import { BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'White-label brokerage and API & algo trading',
  description:
    'Launch your own brokerage on the Kalks platform with your brand and domains, or automate trading with webhooks, a REST API, a visual strategy builder and backtests.',
  alternates: { canonical: '/white-label' },
};

const WL: [string, string][] = [
  ['Your brand', 'Your name, logo, colours and support email across the website, Client Area, Kalks Trader and every email.'],
  ['Your domains', 'Your own addresses for the website, the Client Area, the trading terminal and your Back Office.'],
  ['Your product mix', 'Switch modules on per broker: options, prop, copy trading, PAMM and MAM, partners, academy, rewards.'],
  ['Your data, isolated', 'Each broker’s clients, accounts and money are separated at the database level.'],
  ['Your back office', 'Clients, KYC, deposits and withdrawals, dealing, risk, partners and content, with staff roles.'],
  ['The whole platform', `The same trading engine, option pricing, market data and ${LANGUAGES.length} languages that run Kalks.`],
];
const TONES: BentoTone[] = ['orange', 'cream', 'glass', 'glass', 'cream', 'orange'];

export default function WhiteLabelPage() {
  const mailto = `mailto:${BRAND_SUPPORT_EMAIL}?subject=${encodeURIComponent('White-label enquiry')}`;
  return (
    <>
      <PageHero
        photo="whitelabel"
        eyebrow="For business"
        title={
          <>
            Your brokerage. <span className="s-mute">Our platform.</span>
          </>
        }
        lead="Launch a broker under your own brand and domains, with forex options, CFDs, prop, copy trading and partners built in. Or connect your systems through the API."
        actions={
          <>
            <Btn href={mailto}>Talk to us</Btn>
            <Btn href="#api" variant="ghost" icon={false}>
              API &amp; algo
            </Btn>
          </>
        }
        facts={['4 apps under your brand', `${LANGUAGES.length} languages`, 'Modules on or off per broker', 'Data isolated per broker']}
        aside={
          <HeroGlass>
            <div className="s-num text-[56px] text-white">4</div>
            <p className="mt-2 text-[14px] leading-snug text-white/85">apps under your brand: website, Client Area, Kalks Trader and Back Office</p>
          </HeroGlass>
        }
      />

      {/* 01 in numbers */}
      <section className="s-sec" aria-labelledby="n-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">White-label</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Brand', 'Domains', 'Modules'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              Everything Kalks runs, under your name. <span className="s-mute">Each broker gets its own website, Client Area, trading terminal and Back Office. Terms combine a setup fee, a monthly licence and a revenue share; ask us for details.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: 4, l: 'Apps under your brand', sub: 'Website, Client Area, Trader, Back Office' },
                  { v: LANGUAGES.length, l: 'Languages', sub: 'Right to left included' },
                  { v: TRADER.indicators, l: 'Indicators', sub: 'In the trading terminal' },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 what you get */}
      <section id="white-label" className="s-sec !pt-4 scroll-mt-20" aria-labelledby="wl-title">
        <div className="s-wrap">
          <Head
            id="wl-title"
            index="02"
            eyebrow="What you get"
            title={
              <>
                Your brand, <span className="s-hot">our engine.</span>
              </>
            }
            lead="What every white-label broker gets."
            action={<Btn href={mailto}>Talk to us</Btn>}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WL.map(([t, d], i) => (
              <BentoCard key={t} tone={TONES[i]} kicker={String(i + 1).padStart(2, '0')} title={t} text={d} delay={(i % 3) * 60} className="!min-h-[230px]" />
            ))}
          </div>
        </div>
      </section>

      {/* 03 the apps */}
      <section className="s-sec s-band" aria-labelledby="ap-title">
        <div className="s-wrap">
          <Head
            id="ap-title"
            index="03"
            eyebrow="The apps your clients use"
            title={
              <>
                The same screens, <span className="s-mute">in your colours.</span>
              </>
            }
            lead="Kalks Trader and the Client Area as your clients will see them. Shown here with the Kalks brand; yours carry your name, logo and colours."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <Rise className="s-card overflow-hidden p-3">
              <Shot shot="traderWorkspace" flat />
              <div className="px-3 pb-2 pt-5">
                <div className="text-[17px] font-semibold tracking-[-0.015em]">The trading terminal</div>
                <p className="mt-1 text-[14px] text-[var(--s-tx2)]">Charts, one-click trading, the order ticket and the option chain.</p>
              </div>
            </Rise>
            <Rise delay={80} className="s-card overflow-hidden p-3">
              <Shot shot="caDashboard" flat />
              <div className="px-3 pb-2 pt-5">
                <div className="text-[17px] font-semibold tracking-[-0.015em]">The Client Area</div>
                <p className="mt-1 text-[14px] text-[var(--s-tx2)]">Accounts, wallet, copy trading, prop, partners and support.</p>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* 04 API & algo */}
      <section id="api" className="s-sec scroll-mt-20" aria-labelledby="api-title">
        <div className="s-wrap grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <Rise className="lg:sticky lg:top-28">
            <MiniHead
              index="04"
              eyebrow="API & algo"
              id="api-title"
              title={
                <>
                  Automate <span className="s-mute">your trading.</span>
                </>
              }
              lead="Everything runs on Kalks servers, around the clock, on demo or live accounts. Algo trading covers CFDs; options stay manual for now."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href={REGISTER_HREF}>Create an account</Btn>
              <Btn href="/platforms/api" variant="ghost" icon={false}>
                API &amp; algo in detail
              </Btn>
            </div>
            <p className="mt-8 inline-block rounded-2xl border border-[var(--s-line)] px-4 py-3 font-mono text-[12.5px] text-[var(--s-tx2)]">
              api.kalkstrade.com/algo/public/v1 · OpenAPI · {ALGO.rateLimit}
            </p>
          </Rise>
          <Rise delay={100} className="s-card px-6 py-2 sm:px-8">
            <dl>
              {API.map(([t, d], i) => (
                <div key={t} className="flex gap-5 border-b border-[var(--s-line)] py-6 last:border-0">
                  <span className="s-index pt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <dt className="text-[19px] font-[500] tracking-[-0.02em] text-white">{t}</dt>
                    <dd className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--s-tx2)]">{d}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Rise>
        </div>
      </section>

      <Related
        links={[
          { href: '/partners', t: 'Partners', d: 'Get paid for the lots your clients trade.' },
          { href: '/platforms/trader', t: 'Kalks Trader', d: 'The terminal your clients would use.' },
          { href: '/platforms/client-area', t: 'Client Area', d: 'Accounts, wallet, copy, prop and more.' },
          { href: '/contact', t: 'Contact', d: 'Talk to the team behind the platform.' },
        ]}
      />

      <Cta
        title={
          <>
            Talk to us about <span className="text-white/70">your brand.</span>
          </>
        }
        sub="Tell us about your business. Terms combine a setup fee, a monthly licence and a revenue share."
        primary={{ href: mailto, label: 'Talk to us' }}
        secondary={{ href: '/platforms/api', label: 'API & algo' }}
        facts={['4 apps under your brand', `${LANGUAGES.length} languages`, 'Modules on or off per broker']}
        image={HEROES.whitelabel}
      />
    </>
  );
}
