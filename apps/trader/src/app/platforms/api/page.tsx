import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Block, CtaPanel, InfoGrid, Related } from '@/components/kx/Blocks';
import { ALGO } from '@/content/facts';
import { API_FEATURES } from '@/content/platforms';
import { BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'API & algo trading',
  description: `Automate CFD trading on Kalks: webhook alerts, a REST API with scoped keys (${ALGO.rateLimit}), a visual strategy builder, backtests and 24/7 deployments on Kalks servers.`,
  alternates: { canonical: '/platforms/api' },
};

export default function ApiPage() {
  return (
    <>
      <PageHero
        kicker="API & algo"
        title="Write the rules once. Let them run."
        lede="Webhook alerts, a REST API with scoped keys, a visual strategy builder and backtests, all running on Kalks servers around the clock, on demo or live accounts. Algo trading covers CFDs; options stay manual for now."
        photo="api"
        actions={
          <>
            <a href={REGISTER_HREF} className="kx-btn prim lg">
              Create an account
            </a>
            <a href={`mailto:${BRAND_SUPPORT_EMAIL}?subject=${encodeURIComponent('API question')}`} className="kx-btn ghost lg">
              Ask a question
            </a>
          </>
        }
      >
        <StatRow
          items={[
            { v: '60/min', l: 'Requests per key' },
            { v: String(ALGO.webhookRoutes), l: 'Accounts per webhook' },
            { v: String(ALGO.indicatorSeries), l: 'Indicator series' },
            { v: '24/7', l: 'Deployments' },
          ]}
        />
      </PageHero>

      <Block id="tools" title="The toolkit." intro={`api.kalkstrade.com/algo/public/v1 · OpenAPI · ${ALGO.rateLimit}`}>
        <InfoGrid items={API_FEATURES} />
      </Block>

      <Related
        links={[
          { href: '/platforms/trader', t: 'Kalks Trader', d: 'Where your trades show up.' },
          { href: '/white-label', t: 'White-label', d: 'The whole platform under your brand.' },
          { href: '/accounts/demo', t: 'Demo', d: 'Run strategies on virtual funds.' },
          { href: '/markets', t: 'Markets', d: 'What your strategies can trade.' },
        ]}
      />

      <CtaPanel title="Start on demo." text="Create API keys in the Client Area and deploy to a demo account first.">
        <a href={REGISTER_HREF} className="kx-btn blue lg">
          Create an account
        </a>
      </CtaPanel>
    </>
  );
}
