import type { Metadata } from 'next';
import { MarketClass, MARKET_LINKS } from '@/components/kx/MarketClass';
import { HOURS, INSTRUMENTS, LEVERAGE } from '@/content/facts';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Crypto: 160 coins, 24/7',
  description: `Trade ${INSTRUMENTS.byClass.crypto.live} crypto CFDs on Kalks around the clock, weekends included, long or short, with leverage up to 1:${LEVERAGE.coreCaps.crypto}.`,
  alternates: { canonical: '/markets/crypto' },
};

export default function CryptoPage() {
  return (
    <MarketClass
      kicker="Crypto"
      title="Crypto that never closes."
      lede={`${INSTRUMENTS.byClass.crypto.live} coins as CFDs on real money, from Bitcoin and Ether to newer names, long or short, every hour of every day. No wallet or exchange account needed.`}
      photo="crypto"
      stats={[
        { v: String(INSTRUMENTS.byClass.crypto.live), l: 'Coins live' },
        { v: '24/7', l: 'Weekends included' },
        { v: `1:${LEVERAGE.coreCaps.crypto}`, l: 'Highest leverage' },
        { v: 'USDT', l: 'Fund and withdraw' },
      ]}
      rows={[
        { s: 'BTCUSD', name: 'Bitcoin / US Dollar', digits: 2 },
        { s: 'ETHUSD', name: 'Ether / US Dollar', digits: 2 },
        { s: 'SOLUSD', name: 'Solana / US Dollar', digits: 3 },
        { s: 'XRPUSD', name: 'XRP / US Dollar', digits: 4 },
        { s: 'ADAUSD', name: 'Cardano / US Dollar', digits: 5 },
        { s: 'AAVEUSD', name: 'Aave / US Dollar', digits: 2 },
      ]}
      liveTitle="Coins, live."
      liveIntro="The full list of 160 coins is on the markets page."
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
      related={MARKET_LINKS.filter((l) => l.href !== '/markets/crypto').slice(0, 4)}
    />
  );
}
