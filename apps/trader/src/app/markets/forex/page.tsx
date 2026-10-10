import type { Metadata } from 'next';
import { ClassPage } from '@/components/site/markets/ClassPage';
import { PinTour } from '@/components/site/markets/PinTour';
import type { Pin } from '@/components/site/Shot';
import { FAQ_GROUPS } from '@/content/faq';
import { ACCOUNTS, HOURS, INSTRUMENTS, LEVERAGE, OPTIONS } from '@/content/facts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Forex: ${INSTRUMENTS.byClass.forex.live} currency pairs`,
  description: `Trade ${INSTRUMENTS.byClass.forex.live} currency pairs as CFDs on Kalks, long or short, with leverage up to 1:${LEVERAGE.coreCaps.forex}, all-in or raw pricing, and options on ${OPTIONS.fxPairsLive} of the majors.`,
  alternates: { canonical: '/markets/forex' },
};

const acc = (id: string) => ACCOUNTS.find((a) => a.id === id)!;
const perLot = (id: string) => acc(id).commission.replace(' per lot round turn', '');

/** the order ticket, part by part (pins in % of the screenshot) */
const TICKET_PINS: Pin[] = [
  { x: 43, y: 22.2, title: 'Sell and Buy, side by side', text: 'Both live prices, with what each side means: Sell profits if the price falls, Buy if it rises.' },
  { x: 71, y: 27.8, title: 'Order type and spread', text: 'Market, limit, stop and stop-limit orders, with the current spread shown in points.' },
  { x: 54.6, y: 39.6, title: 'Volume presets', text: 'From 0.01 lot, or type your own size.' },
  { x: 60, y: 48.7, title: 'Stop loss and take profit', text: 'By price, pips or money. A trailing stop, a comment and a maximum price change sit under More options.' },
  { x: 45, y: 66.2, title: 'Margin and pip value', text: 'The margin the trade needs, the value of one pip, the position size and your free margin after it.' },
  { x: 92, y: 81.5, title: 'Overnight swap', text: `Long and short financing before you trade. ${HOURS.tripleSwap.forexMetals} counts three times for forex.` },
  { x: 55, y: 95.6, title: 'One-click trading', text: 'Switch it on when you want speed: trades go straight from the chart.' },
];

const FAQ = FAQ_GROUPS.find((g) => g.id === 'trading')!.items;

export default function ForexPage() {
  return (
    <ClassPage
      self="/markets/forex"
      eyebrow="Forex"
      title={
        <>
          {INSTRUMENTS.byClass.forex.live} currency pairs, <span className="s-mute">priced to the pip.</span>
        </>
      }
      lead={`Majors, minors and exotics on real money, long or short, with leverage up to 1:${LEVERAGE.coreCaps.forex} on Standard and Cent. Calls and puts on ${OPTIONS.fxPairsLive} of the majors as well.`}
      heroFacts={[`${INSTRUMENTS.byClass.forex.live} pairs live`, `Leverage up to 1:${LEVERAGE.coreCaps.forex}`, 'Sunday to Friday']}
      glass={[
        { v: '0.3 pip', l: 'Over raw on Pro, no commission' },
        { v: OPTIONS.fxPairsLive, l: 'Majors with calls and puts' },
      ]}
      statement={
        <>
          Currencies, long or short. <span className="s-mute">Majors, minors and exotics on real money, priced all-in with no commission, or on the raw spread with a fixed commission per lot.</span>
        </>
      }
      chips={['Majors', 'Minors', 'Exotics']}
      stats={[
        { v: INSTRUMENTS.byClass.forex.live, l: 'Pairs live', sub: 'Majors, minors and exotics' },
        { v: `1:${LEVERAGE.coreCaps.forex}`, l: 'Highest leverage', sub: 'Standard and Cent accounts' },
        { v: '0.3', l: 'Pip over raw on Pro', sub: 'No commission' },
        { v: '24/5', l: 'Sunday to Friday', sub: HOURS.fxWeek },
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
      liveTitle={
        <>
          The majors, <span className="s-mute">live.</span>
        </>
      }
      liveIntro="Prices stream from the Kalks market-data feed. The full list of pairs is on the markets page."
      terms={[
        ['Leverage', `Up to 1:${LEVERAGE.coreCaps.forex} (Standard, Cent), 1:500 (Pro, ECN, VIP)`],
        ['Standard and Cent', `${acc('standard').spread}, no commission`],
        ['Pro', `${acc('pro').spread}, no commission`],
        ['ECN · VIP', `Raw spread, ${perLot('ecn')} · ${perLot('vip')} a lot round turn`],
        ['Options', `Calls and puts on ${OPTIONS.fxPairsLive} majors, in an Options account`],
      ]}
      hours={[
        ['Trading week', HOURS.fxWeek],
        ['Daily rollover', `${HOURS.rolloverNy} New York`],
        ['Triple financing', `${HOURS.tripleSwap.forexMetals} night`],
      ]}
      trader={{
        eyebrow: 'Order ticket',
        title: (
          <>
            Every number <span className="s-mute">before you click.</span>
          </>
        ),
        lead: 'The Kalks Trader ticket shows the spread, the margin, the pip value and the overnight swap before you choose Sell or Buy. Point at a number to see each part.',
        body: <PinTour shot="traderTicket" pins={TICKET_PINS} maxW="max-w-[440px]" cols="lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]" />,
      }}
      faq={FAQ}
    />
  );
}
