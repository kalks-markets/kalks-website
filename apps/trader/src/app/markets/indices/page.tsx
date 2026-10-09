import type { Metadata } from 'next';
import { MarketClass, MARKET_LINKS } from '@/components/kx/MarketClass';
import { HOURS, INSTRUMENTS, LEVERAGE } from '@/content/facts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Indices: 32 stock indices',
  description: `Trade ${INSTRUMENTS.byClass.indices.live} stock indices as CFDs on Kalks, from the Dow and the Nasdaq to the DAX and the Nikkei, with leverage up to 1:${LEVERAGE.coreCaps.indices}.`,
  alternates: { canonical: '/markets/indices' },
};

export default function IndicesPage() {
  return (
    <MarketClass
      kicker="Indices"
      title="Whole markets, in one trade."
      lede={`${INSTRUMENTS.byClass.indices.live} stock indices from the US, Europe and Asia on real money, with leverage up to 1:${LEVERAGE.coreCaps.indices}. Take a view on an economy rather than a single company.`}
      photo="indices"
      stats={[
        { v: String(INSTRUMENTS.byClass.indices.live), l: 'Indices live' },
        { v: `1:${LEVERAGE.coreCaps.indices}`, l: 'Highest leverage' },
        { v: '24/5', l: 'With the forex week' },
        { v: HOURS.tripleSwap.indicesEnergies, l: 'Triple financing' },
      ]}
      rows={[
        { s: 'US30', name: 'Dow Jones 30', digits: 1 },
        { s: 'NAS100', name: 'Nasdaq 100', digits: 1 },
        { s: 'SPX500', name: 'S&P 500', digits: 1 },
        { s: 'GER40', name: 'Germany 40', digits: 1 },
        { s: 'UK100', name: 'UK 100', digits: 1 },
        { s: 'JP225', name: 'Japan 225', digits: 0 },
        { s: 'AUS200', name: 'Australia 200', digits: 1 },
        { s: 'EUSTX50', name: 'Euro Stoxx 50', digits: 1 },
      ]}
      liveTitle="The big indices, live."
      liveIntro="Index CFDs follow the forex week, so you can react to news outside the exchanges' own hours."
      terms={[
        ['Leverage', `Up to 1:${LEVERAGE.coreCaps.indices}`],
        ['Pricing', 'All-in spread, or raw spread + commission on ECN and VIP'],
        ['Direction', 'Long or short, without owning the shares'],
      ]}
      hours={[
        ['Trading week', HOURS.fxWeek],
        ['Daily rollover', `${HOURS.rolloverNy} New York`],
        ['Triple financing', `${HOURS.tripleSwap.indicesEnergies} night`],
      ]}
      related={MARKET_LINKS.filter((l) => l.href !== '/markets/indices').slice(0, 4)}
    />
  );
}
