import type { Metadata } from 'next';
import { PageHero } from '@/components/site/Heroes';
import { Btn, Checks, Cta, Head, StatStrip } from '@/components/site/ui';
import { FeatureSplit, Shot, type Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { FeatureGrid, Related } from '@/components/site/platforms/bits';
import { PinTour } from '@/components/site/platforms/ShotTours';
import { PSHOTS } from '@/components/site/platforms/shots';
import { ALGO, DEMO } from '@/content/facts';
import { HEROES } from '@/content/heroes';
import { API_FEATURES } from '@/content/platforms';
import { BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'API & algo trading',
  description: `Automate CFD trading on Kalks: webhook alerts, a REST API with scoped keys (${ALGO.rateLimit}), a visual strategy builder, backtests and 24/7 deployments on Kalks servers.`,
  alternates: { canonical: '/platforms/api' },
};

/** the leading number of "60 requests a minute per key" */
const PER_MINUTE = ALGO.rateLimit.split(' ')[0];

/** pins in % of the strategy builder screenshot */
const BUILDER_PINS: Pin[] = [
  { x: 13.5, y: 21.9, title: 'Templates', text: 'Start from a proven structure: EMA crossover, RSI reversion, Donchian breakout, or MACD with an H4 trend filter.' },
  { x: 47, y: 10.8, title: 'Visual or code', text: 'Build the rules with blocks, or switch to code and back.' },
  { x: 38.5, y: 27.2, title: 'Buy when, sell when', text: 'Entry rules for longs and shorts with AND and OR groups, and exits besides the stop and target.' },
  { x: 33.5, y: 65.3, title: 'Risk and session', text: 'Size in lots or risk %, stop loss, take profit, trailing stop, breakeven, a trading window, and limits on trades and daily loss.' },
  { x: 89.5, y: 10.2, title: 'AI assistant', text: 'Describe a strategy in plain words and the assistant drafts it. Nothing trades until you save, backtest and deploy.' },
  { x: 89.5, y: 52.2, title: 'Deploy 24/7', text: 'Runs on our servers, not in your browser, on a demo or a live account.' },
  { x: 78, y: 4.1, title: 'Backtest and running strategies', text: `Test on history with ${ALGO.indicatorSeries} indicator series that match Kalks Trader; stop everything at once with the kill switch.` },
];

export default function ApiPage() {
  const mailto = `mailto:${BRAND_SUPPORT_EMAIL}?subject=${encodeURIComponent('API question')}`;
  return (
    <>
      <PageHero
        compact
        photo="platforms"
        eyebrow="API & algo"
        title={
          <>
            Write the rules once. <span className="s-mute">Let them run.</span>
          </>
        }
        lead="Webhook alerts, a REST API with scoped keys, a visual strategy builder and backtests, all running on Kalks servers around the clock, on demo or live accounts. Algo trading covers CFDs; options stay manual for now."
        actions={
          <>
            <Btn href={REGISTER_HREF}>Create an account</Btn>
            <Btn href={mailto} variant="ghost" icon={false}>
              Ask a question
            </Btn>
          </>
        }
        facts={[ALGO.rateLimit.charAt(0).toUpperCase() + ALGO.rateLimit.slice(1), `Up to ${ALGO.webhookRoutes} accounts per webhook`, `${ALGO.indicatorSeries} indicator series`, '24/7 deployments']}
      />

      {/* 01 in numbers */}
      <section className="s-sec" aria-labelledby="n-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">Automation</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['REST', 'Webhooks', 'Backtests'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              Your rules, on our servers. <span className="s-mute">Alerts from your charting tool, your own code through the API, or a strategy built with blocks, running on demo or live while your computer is off.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: PER_MINUTE, l: 'Requests a minute', sub: 'Per API key' },
                  { v: ALGO.webhookRoutes, l: 'Accounts per webhook', sub: 'Each with its own size' },
                  { v: ALGO.indicatorSeries, l: 'Indicator series', sub: 'Matching Kalks Trader' },
                  { v: '24/7', l: 'Deployments', sub: 'With kill switches' },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 toolkit */}
      <section id="tools" className="s-sec !pt-4 scroll-mt-20" aria-labelledby="tools-title">
        <div className="s-wrap">
          <Head
            id="tools-title"
            index="02"
            eyebrow="The toolkit"
            title={
              <>
                Six tools, <span className="s-hot">one account.</span>
              </>
            }
            lead={
              <span className="font-mono text-[14px] text-[var(--s-tx2)]">
                api.kalkstrade.com/algo/public/v1 · OpenAPI · {ALGO.rateLimit}
              </span>
            }
          />
          <FeatureGrid items={API_FEATURES} cols="sm:grid-cols-2 lg:grid-cols-3" />
        </div>
      </section>

      {/* 03 strategy builder */}
      <section className="s-sec s-band" aria-labelledby="sb-title">
        <div className="s-wrap">
          <Head
            id="sb-title"
            index="03"
            eyebrow="Strategy builder"
            title={
              <>
                Blocks, code <span className="s-mute">or plain words.</span>
              </>
            }
            lead="In the Client Area under Developer. Point at a number to see each part."
          />
          <PinTour shot={PSHOTS.apiBuilder} pins={BUILDER_PINS} cols="lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" scrollMin="min-w-[560px]" />
        </div>
      </section>

      {/* 04 keys and safety */}
      <section className="s-sec" aria-labelledby="k-title">
        <div className="s-wrap">
          <FeatureSplit
            index="04"
            eyebrow="REST API"
            title={
              <span id="k-title">
                Keys that trade, <span className="s-mute">never withdraw.</span>
              </span>
            }
            text="API keys with read and trade scopes, never withdrawals. Bearer or HMAC signing, and an IP allow-list for live trading keys."
            points={<Checks items={[ALGO.rateLimit.charAt(0).toUpperCase() + ALGO.rateLimit.slice(1), 'Every API order is marked on your account and statements', 'One kill switch stops API and webhook orders and every strategy']} />}
            action={
              <Btn href={REGISTER_HREF} variant="ghost">
                Create your keys
              </Btn>
            }
            media={<Shot shot={PSHOTS.apiSafety} />}
          />
        </div>
      </section>

      <Related
        links={[
          { href: '/platforms/trader', t: 'Kalks Trader', d: 'Where your trades show up.' },
          { href: '/white-label', t: 'White-label', d: 'The whole platform under your brand.' },
          { href: '/accounts/demo', t: 'Demo', d: 'Run strategies on virtual funds.' },
          { href: '/markets', t: 'Markets', d: 'What your strategies can trade.' },
        ]}
      />

      <Cta
        title={
          <>
            Start <span className="text-white/70">on demo.</span>
          </>
        }
        sub={`Create API keys in the Client Area and deploy to a demo account first, with ${DEMO.defaultBalance} of virtual money.`}
        primary={{ href: REGISTER_HREF, label: 'Create an account' }}
        secondary={{ href: mailto, label: 'Ask a question' }}
        facts={[ALGO.rateLimit, `${ALGO.indicatorSeries} indicator series`, '24/7 deployments']}
        image={HEROES.platforms}
      />
    </>
  );
}
