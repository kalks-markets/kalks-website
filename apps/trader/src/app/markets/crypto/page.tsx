import type { Metadata } from 'next';
import { ClassPage } from '@/components/site/markets/ClassPage';
import type { Pin } from '@/components/site/Shot';
import { PinTour } from '@/components/site/markets/PinTour';
import { FAQ_GROUPS } from '@/content/faq';
import { FUNDING, HOURS, INSTRUMENTS, LEVERAGE, TRADER } from '@/content/facts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Crypto: ${INSTRUMENTS.byClass.crypto.live} coins, 24/7`,
  description: `Trade ${INSTRUMENTS.byClass.crypto.live} crypto CFDs on Kalks around the clock, weekends included, long or short, with leverage up to 1:${LEVERAGE.coreCaps.crypto}.`,
  alternates: { canonical: '/markets/crypto' },
};

/** a Bitcoin chart in Kalks Trader, part by part (pins in % of the screenshot) */
const PINS: Pin[] = [
  { x: 44.6, y: 2.6, title: `Timeframes, ${TRADER.timeframes[0]} to ${TRADER.timeframes[TRADER.timeframes.length - 1]}`, text: `${TRADER.timeframes.join(', ')}, one click each.` },
  { x: 64, y: 5.6, title: 'One-click Sell · lot · Buy', text: 'Set the size and trade at the live price, straight from the chart toolbar.' },
  { x: 16.5, y: 10.2, title: 'Indicators on the chart', text: `${TRADER.indicators} indicators, such as the moving averages shown here, with their values beside the price.` },
  { x: 2, y: 19, title: 'Drawing tools', text: 'Trend lines, horizontal levels, channels and rectangles, on a rail beside the chart.' },
  { x: 78.8, y: 33.4, title: 'Take profit line', text: 'The level and the profit it would lock in. Drag it to move the target.' },
  { x: 77, y: 67.3, title: 'Your position', text: 'Side, size and live P&L, drawn at your entry price.' },
  { x: 79.7, y: 86.4, title: 'Stop loss line', text: 'The level and the loss it caps. Drag it along the price axis to move it.' },
];

const FAQ = FAQ_GROUPS.find((g) => g.id === 'trading')!.items;

export default function CryptoPage() {
  return (
    <ClassPage
      self="/markets/crypto"
      eyebrow="Crypto"
      title={
        <>
          Crypto that <span className="s-mute">never closes.</span>
        </>
      }
      lead={`${INSTRUMENTS.byClass.crypto.live} coins as CFDs on real money, from Bitcoin and Ether to newer names, long or short, every hour of every day. No wallet or exchange account needed.`}
      heroFacts={[`${INSTRUMENTS.byClass.crypto.live} coins live`, '24/7, weekends included', `Leverage up to 1:${LEVERAGE.coreCaps.crypto}`]}
      glass={[
        { v: '24/7', l: 'Weekends included' },
        { v: INSTRUMENTS.byClass.crypto.live, l: 'Coins against the dollar' },
      ]}
      statement={
        <>
          Bitcoin at 3 a.m. on a Sunday. <span className="s-mute">Crypto CFDs trade around the clock, long or short, priced in US dollars and funded with USDT. No coins are held for you, so there is no wallet to manage.</span>
        </>
      }
      chips={['Bitcoin', 'Ether', 'Altcoins']}
      stats={[
        { v: INSTRUMENTS.byClass.crypto.live, l: 'Coins live', sub: 'BTC, ETH, SOL, XRP, BNB, DOGE and more' },
        { v: '24/7', l: 'Weekends included', sub: 'Financing every night' },
        { v: `1:${LEVERAGE.coreCaps.crypto}`, l: 'Highest leverage', sub: 'Account and market caps apply' },
        { v: 'USDT', l: 'Fund and withdraw', sub: FUNDING.methods },
      ]}
      rows={[
        { s: 'BTCUSD', name: 'Bitcoin / US Dollar', digits: 2 },
        { s: 'ETHUSD', name: 'Ether / US Dollar', digits: 2 },
        { s: 'SOLUSD', name: 'Solana / US Dollar', digits: 3 },
        { s: 'XRPUSD', name: 'XRP / US Dollar', digits: 4 },
        { s: 'ADAUSD', name: 'Cardano / US Dollar', digits: 5 },
        { s: 'AAVEUSD', name: 'Aave / US Dollar', digits: 2 },
      ]}
      liveTitle={
        <>
          Coins, <span className="s-mute">live.</span>
        </>
      }
      liveIntro={`The full list of ${INSTRUMENTS.byClass.crypto.live} coins is on the markets page.`}
      terms={[
        ['Leverage', `Up to 1:${LEVERAGE.coreCaps.crypto}`],
        ['Direction', 'Long or short, as CFDs: no coins are held for you'],
        ['Pricing', 'All-in spread, or raw spread + commission on ECN and VIP'],
      ]}
      hours={[
        ['Trading', 'Around the clock, 7 days a week'],
        ['Financing', 'Charged every night, weekends included'],
        ['Rollover', `${HOURS.rolloverNy} New York`],
      ]}
      trader={{
        eyebrow: 'The chart',
        title: (
          <>
            Your trade, <span className="s-mute">on the chart.</span>
          </>
        ),
        lead: 'A Bitcoin position in Kalks Trader: entry, stop loss and take profit drawn on the chart with their live P&L. Point at a number to see each part.',
        body: <PinTour shot="traderChart" pins={PINS} cols="lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]" scrollMin="min-w-[640px]" />,
      }}
      faq={FAQ}
    />
  );
}
