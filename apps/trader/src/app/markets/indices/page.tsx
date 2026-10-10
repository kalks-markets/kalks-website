import type { Metadata } from 'next';
import { ClassPage } from '@/components/site/markets/ClassPage';
import type { Pin } from '@/components/site/Shot';
import { PinTour } from '@/components/site/markets/PinTour';
import { FAQ_GROUPS } from '@/content/faq';
import { HOURS, INSTRUMENTS, LEVERAGE } from '@/content/facts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Indices: ${INSTRUMENTS.byClass.indices.live} stock indices`,
  description: `Trade ${INSTRUMENTS.byClass.indices.live} stock indices as CFDs on Kalks, from the Dow and the Nasdaq to the DAX and the Nikkei, with leverage up to 1:${LEVERAGE.coreCaps.indices}.`,
  alternates: { canonical: '/markets/indices' },
};

/** the positions panel, part by part (pins in % of the screenshot) */
const PINS: Pin[] = [
  { x: 19.5, y: 20.3, title: 'Positions, orders and history', text: 'Open positions, pending orders and closed trades, one tab each.' },
  { x: 33.1, y: 20.3, title: 'Alerts, news and the calendar', text: 'One tab away from your open trades.' },
  { x: 80.5, y: 27, title: 'Close positions', text: 'Close all, close profitable, close losing, close by symbol, or move every stop to breakeven.' },
  { x: 31.9, y: 46.4, title: 'Open to current price', text: 'Where you got in and where the market is now, on every position.' },
  { x: 53.5, y: 59.5, title: 'Stops and targets inline', text: 'Add or change a stop loss or take profit straight from the row.' },
  { x: 77.5, y: 59.5, title: 'Swap and commission', text: `Overnight financing and commission per position. ${HOURS.tripleSwap.indicesEnergies} counts three times for indices.` },
  { x: 91, y: 46.4, title: 'Live P&L, one click to close', text: 'Profit and loss with every tick, and a Close button on each row.' },
];

const FAQ = FAQ_GROUPS.find((g) => g.id === 'trading')!.items;

export default function IndicesPage() {
  return (
    <ClassPage
      self="/markets/indices"
      eyebrow="Indices"
      title={
        <>
          Whole markets, <span className="s-mute">in one trade.</span>
        </>
      }
      lead={`${INSTRUMENTS.byClass.indices.live} stock indices from the US, Europe and Asia on real money, with leverage up to 1:${LEVERAGE.coreCaps.indices}. Take a view on an economy rather than a single company.`}
      heroFacts={[`${INSTRUMENTS.byClass.indices.live} indices live`, `Leverage up to 1:${LEVERAGE.coreCaps.indices}`, 'With the forex week']}
      glass={[
        { v: INSTRUMENTS.byClass.indices.live, l: 'Indices live, US, Europe and Asia' },
        { v: `1:${LEVERAGE.coreCaps.indices}`, l: 'Highest leverage' },
      ]}
      statement={
        <>
          Take a view on an economy. <span className="s-mute">Benchmark indices from Wall Street to Frankfurt, London, Tokyo and Hong Kong, long or short, without owning the shares.</span>
        </>
      }
      chips={['US', 'Europe', 'Asia']}
      stats={[
        { v: INSTRUMENTS.byClass.indices.live, l: 'Indices live', sub: 'US30, NAS100, SPX500, GER40, UK100, JP225 and more' },
        { v: `1:${LEVERAGE.coreCaps.indices}`, l: 'Highest leverage', sub: 'Account and market caps apply' },
        { v: '24/5', l: 'With the forex week', sub: HOURS.fxWeek },
        { v: HOURS.tripleSwap.indicesEnergies, l: 'Triple financing', sub: 'Charged three times that night' },
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
      liveTitle={
        <>
          The big indices, <span className="s-mute">live.</span>
        </>
      }
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
      trader={{
        eyebrow: 'Positions',
        title: (
          <>
            Manage the trade, <span className="s-mute">not the screen.</span>
          </>
        ),
        lead: 'Under the chart in Kalks Trader: every open position with its live P&L, stops you can add inline, and bulk actions for when the market moves fast. Point at a number to see each part.',
        body: <PinTour shot="traderPositions" pins={PINS} layout="under" scrollMin="min-w-[960px]" />,
      }}
      faq={FAQ}
    />
  );
}
