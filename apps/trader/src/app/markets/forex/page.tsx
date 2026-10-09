import type { Metadata } from 'next';
import { MarketClass, MARKET_LINKS } from '@/components/kx/MarketClass';
import { HOURS, INSTRUMENTS, LEVERAGE, OPTIONS } from '@/content/facts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Forex: 44 currency pairs',
  description: `Trade ${INSTRUMENTS.byClass.forex.live} currency pairs as CFDs on Kalks, long or short, with leverage up to 1:${LEVERAGE.coreCaps.forex}, all-in or raw pricing, and options on ${OPTIONS.fxPairsLive} of the majors.`,
  alternates: { canonical: '/markets/forex' },
};

export default function ForexPage() {
  return (
    <MarketClass
      kicker="Forex"
      title={`${INSTRUMENTS.byClass.forex.live} currency pairs, priced to the pip.`}
      lede={`Majors, minors and exotics on real money, long or short, with leverage up to 1:${LEVERAGE.coreCaps.forex} on Standard and Cent. Calls and puts on ${OPTIONS.fxPairsLive} of the majors as well.`}
      photo="forex"
      stats={[
        { v: String(INSTRUMENTS.byClass.forex.live), l: 'Pairs live' },
        { v: `1:${LEVERAGE.coreCaps.forex}`, l: 'Highest leverage' },
        { v: '0.3 pip', l: 'Over raw on Pro' },
        { v: '24/5', l: 'Sunday to Friday' },
      ]}
      rows={[
        { s: 'EURUSD', name: 'Euro / US Dollar', digits: 5 },
        { s: 'GBPUSD', name: 'British Pound / US Dollar', digits: 5 },
        { s: 'USDJPY', name: 'US Dollar / Japanese Yen', digits: 3 },
        { s: 'AUDUSD', name: 'Australian Dollar / US Dollar', digits: 5 },
        { s: 'USDCAD', name: 'US Dollar / Canadian Dollar', digits: 5 },
        { s: 'USDCHF', name: 'US Dollar / Swiss Franc', digits: 5 },
        { s: 'EURJPY', name: 'Euro / Japanese Yen', digits: 3 },
        { s: 'GBPJPY', name: 'British Pound / Japanese Yen', digits: 3 },
      ]}
      liveTitle="The majors, live."
      liveIntro="Prices stream from the Kalks market-data feed. The full list of pairs is on the markets page."
      terms={[
        ['Leverage', `Up to 1:${LEVERAGE.coreCaps.forex} (Standard, Cent), 1:500 (Pro, ECN, VIP)`],
        ['Standard and Cent', 'Raw + 1.0 pip, no commission'],
        ['Pro', 'Raw + 0.3 pip, no commission'],
        ['ECN · VIP', 'Raw spread, $7 · $3 a lot round turn'],
        ['Options', `Calls and puts on ${OPTIONS.fxPairsLive} majors, in an Options account`],
      ]}
      hours={[
        ['Trading week', HOURS.fxWeek],
        ['Daily rollover', `${HOURS.rolloverNy} New York`],
        ['Triple financing', `${HOURS.tripleSwap.forexMetals} night`],
      ]}
      related={MARKET_LINKS.filter((l) => l.href !== '/markets/forex').slice(0, 4)}
    />
  );
}
