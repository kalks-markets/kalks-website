import type { Metadata } from 'next';
import { MarketClass, MARKET_LINKS } from '@/components/kx/MarketClass';
import { HOURS, INSTRUMENTS, LEVERAGE, OPTIONS } from '@/content/facts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Metals & energies: gold, silver, oil and gas',
  description: `Trade ${INSTRUMENTS.byClass.metals.live} metals and ${INSTRUMENTS.byClass.energies.live} energies as CFDs on Kalks, with options on gold, silver, US and UK oil.`,
  alternates: { canonical: '/markets/metals-energies' },
};

export default function MetalsPage() {
  return (
    <MarketClass
      kicker="Metals & energies"
      title="Gold, silver, oil. Long or short."
      lede={`${INSTRUMENTS.byClass.metals.live} metals and ${INSTRUMENTS.byClass.energies.live} energies on real money, from gold and silver to copper, crude and natural gas. Options on gold, silver and both oils.`}
      photo="metals"
      stats={[
        { v: String(INSTRUMENTS.byClass.metals.live), l: 'Metals live' },
        { v: String(INSTRUMENTS.byClass.energies.live), l: 'Energies live' },
        { v: `1:${LEVERAGE.coreCaps.metals}`, l: 'Metals leverage' },
        { v: `1:${LEVERAGE.coreCaps.energies}`, l: 'Energies leverage' },
      ]}
      rows={[
        { s: 'XAUUSD', name: 'Gold / US Dollar', digits: 2 },
        { s: 'XAGUSD', name: 'Silver / US Dollar', digits: 3 },
        { s: 'XPDUSD', name: 'Palladium / US Dollar', digits: 2 },
        { s: 'XCUUSD', name: 'Copper / US Dollar', digits: 4 },
        { s: 'USOIL', name: 'US crude oil (WTI)', digits: 2 },
        { s: 'UKOIL', name: 'UK crude oil (Brent)', digits: 2 },
        { s: 'NGAS', name: 'Natural gas', digits: 3 },
      ]}
      liveTitle="Metals and energies, live."
      liveIntro="Gold, silver and oil are also the underlyings for Kalks FX Options."
      terms={[
        ['Leverage', `Metals up to 1:${LEVERAGE.coreCaps.metals}, energies up to 1:${LEVERAGE.coreCaps.energies}`],
        ['Pricing', 'All-in spread, or raw spread + commission on ECN and VIP'],
        ['Options contracts', `Gold ${OPTIONS.contract.xau} · silver ${OPTIONS.contract.xag} · oil ${OPTIONS.contract.oil}`],
      ]}
      hours={[
        ['Trading week', HOURS.fxWeek],
        ['Daily rollover', `${HOURS.rolloverNy} New York`],
        ['Triple financing', `Metals ${HOURS.tripleSwap.forexMetals}, energies ${HOURS.tripleSwap.indicesEnergies}`],
      ]}
      related={MARKET_LINKS.filter((l) => l.href !== '/markets/metals-energies').slice(0, 4)}
    />
  );
}
