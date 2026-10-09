import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, Feature } from '@/components/ui/Section';
import { API_FEATURES as API } from '@/content/platforms';
import { ALGO } from '@/content/facts';
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
  ['The whole platform', 'The same trading engine, option pricing, market data and 22 languages that run Kalks.'],
];


export default function WhiteLabelPage() {
  const mailto = `mailto:${BRAND_SUPPORT_EMAIL}?subject=${encodeURIComponent('White-label enquiry')}`;
  return (
    <>
      <PageHero
        kicker="FOR BUSINESS"
        title="Your brokerage. Our platform."
        lede="Launch a broker under your own brand and domains, with forex options, CFDs, prop, copy trading and partners built in. Or connect your systems through the API."
        photo="whitelabel"
        actions={
          <>
            <Btn href={mailto} v="red" s={56} arrow>
              Talk to us
            </Btn>
            <Btn href="#api" v="ghost" s={56}>
              API &amp; algo
            </Btn>
          </>
        }
      >
        <StatRow items={[
          { v: String(4), l: 'Apps under your brand: website, Client Area, Trader, Back Office' },
          { v: String(22), l: 'Languages, right to left included' },
          { v: String('Modules'), l: 'Options, prop, copy, partners: on or off per broker' },
          { v: String('Isolated'), l: 'Your clients and money, separate in the database' },
        ]} />
      </PageHero>

      <Section labelledBy="wl-title">
        <SectionHead
          id="wl-title"
          kicker="01 — WHITE-LABEL"
          title="Everything Kalks runs, under your name."
          lede="Each broker gets its own website, Client Area, trading terminal and Back Office. Terms combine a setup fee, a monthly licence and a revenue share; ask us for details."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {WL.map(([t, d]) => (
            <Feature key={t} t={t} d={d} />
          ))}
        </div>
      </Section>

      <Section id="api" labelledBy="api-title" className="sec-last">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionHead id="api-title" kicker="02 — API & ALGO" title="Automate your trading." className="!mb-6" />
            <p className="lede max-w-[44ch]">
              Everything runs on Kalks servers, around the clock, on demo or live accounts. Algo trading covers CFDs; options stay manual
              for now.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn href={REGISTER_HREF} v="ink" arrow>
                Create an account
              </Btn>
              <Btn href={mailto} v="ghost">
                Talk to us
              </Btn>
            </div>
            <p className="well mt-7 px-4 py-3 font-mono text-[12.5px] text-tx2">
              api.kalkstrade.com/algo/public/v1 · OpenAPI · {ALGO.rateLimit}
            </p>
          </div>
          <dl className="card flex flex-col px-6 py-2 sm:px-8">
            {API.map(([t, d], i) => (
              <div key={t} className="flex gap-4 border-b border-line py-6 last:border-0">
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <dt className="t-h3 !text-[18px]">{t}</dt>
                  <dd className="body mt-1.5">{d}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
