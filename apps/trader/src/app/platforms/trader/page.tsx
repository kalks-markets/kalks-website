import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Block, CtaPanel, InfoGrid, Related } from '@/components/kx/Blocks';
import { TraderMock } from '@/components/mock/TraderMock';
import { TRADER } from '@/content/facts';
import { TRADER_FEATURES } from '@/content/platforms';
import { DEMO_HREF, TRADER_URL } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Kalks Trader: the trading terminal',
  description: `Kalks Trader runs in your browser and on Android: ${TRADER.chartTypes} chart types, ${TRADER.timeframes.length} timeframes, ${TRADER.indicators} indicators, one-click trading, a depth ladder and the option chain.`,
  alternates: { canonical: '/platforms/trader' },
};

export default function TraderPage() {
  return (
    <>
      <PageHero
        kicker="Kalks Trader"
        title="Every instrument on one screen."
        lede="A big, quiet chart with the market list beside it and your positions below, for CFDs and options alike. In your browser and on Android, with nothing to install on a computer."
        photo="trader"
        actions={
          <>
            <a href={TRADER_URL} className="kx-btn prim lg">
              Open Kalks Trader
            </a>
            <a href={DEMO_HREF} className="kx-btn ghost lg">
              Try the demo
            </a>
          </>
        }
      >
        <StatRow
          items={[
            { v: String(TRADER.chartTypes), l: 'Chart types' },
            { v: String(TRADER.timeframes.length), l: 'Timeframes' },
            { v: String(TRADER.indicators), l: 'Indicators' },
            { v: String(TRADER.drawingTools), l: 'Drawing tools' },
          ]}
        />
      </PageHero>

      <Block id="screen" title="Chart first." intro="Illustrative chart and prices. Up candles are blue, down candles red.">
        <TraderMock className="h-[600px] max-lg:h-[460px] max-sm:h-[360px]" />
      </Block>

      <Block id="features" title="What is on it.">
        <InfoGrid items={TRADER_FEATURES} cols={4} />
      </Block>

      <Related
        links={[
          { href: '/platforms/client-area', t: 'Client Area', d: 'Accounts, wallet, copy, prop and more.' },
          { href: '/platforms/android', t: 'Android app', d: 'Kalks Trader in your pocket.' },
          { href: '/platforms/api', t: 'API & algo', d: 'Automate your trading.' },
          { href: '/options', t: 'FX Options', d: 'The chain, quick trade and the strategy builder.' },
        ]}
      />

      <CtaPanel title="Open it in your browser." text="Sign in with your Kalks account, or look around with live prices first.">
        <a href={TRADER_URL} className="kx-btn blue lg">
          Open Kalks Trader
        </a>
      </CtaPanel>
    </>
  );
}
