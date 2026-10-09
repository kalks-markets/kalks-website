import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Block, CtaPanel, FactPanel, InfoGrid, Related } from '@/components/kx/Blocks';
import { DEMO, INSTRUMENTS, OPTIONS_ACCOUNTS } from '@/content/facts';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Demo account: practise free on live prices',
  description: `A free Kalks demo account starts with ${DEMO.defaultBalance} in virtual funds, trades all ${INSTRUMENTS.total.toLocaleString('en-US')} markets on live prices and refills up to ${DEMO.refillsPerDay} times a day.`,
  alternates: { canonical: '/accounts/demo' },
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        kicker="Demo account"
        title="Rehearse on live prices. Risk nothing."
        lede={`A free demo account with ${DEMO.defaultBalance} of virtual money, every market on real-time prices, and the same Kalks Trader you will use live.`}
        photo="demo"
        actions={
          <>
            <a href={DEMO_HREF} className="kx-btn prim lg">
              Start a free demo
            </a>
            <a href={REGISTER_HREF} className="kx-btn ghost lg">
              Open a live account
            </a>
          </>
        }
      >
        <StatRow
          items={[
            { v: DEMO.defaultBalance, l: 'Virtual funds to start' },
            { v: INSTRUMENTS.total.toLocaleString('en-US'), l: 'Markets on demo' },
            { v: `${DEMO.refillsPerDay}×`, l: 'Refills a day' },
            { v: '$0', l: 'Cost' },
          ]}
        />
      </PageHero>

      <Block id="what" title="A full rehearsal." intro="Everything on a demo account behaves the way it does on a live one, except that the money is not real.">
        <InfoGrid
          items={[
            ['Live prices', 'Quotes come from the same market-data feed as live accounts.'],
            ['Every market', `All ${INSTRUMENTS.total.toLocaleString('en-US')} markets, the ${INSTRUMENTS.demoOnly.toLocaleString('en-US')} demo-only stocks included.`],
            ['CFDs and options', `Practise CFDs on a demo CFD account and options on a demo ${OPTIONS_ACCOUNTS[0].name} account.`],
            ['Your balance, your choice', `Pick any starting balance from ${DEMO.balanceRange}.`],
            ['Start again', `Refill your balance up to ${DEMO.refillsPerDay} times a day.`],
            ['Same tools', 'Kalks Trader, the option chain, quick trade and the strategy builder, in your browser or on Android.'],
          ]}
        />
      </Block>

      <Block id="facts" title="The details.">
        <div className="grid gap-6 lg:grid-cols-2">
          <FactPanel
            title="Demo account"
            items={[
              ['Starting balance', DEMO.defaultBalance],
              ['Balance range', DEMO.balanceRange],
              ['Refills', `Up to ${DEMO.refillsPerDay} a day`],
              ['Markets', `All ${INSTRUMENTS.total.toLocaleString('en-US')}`],
              ['Cost', 'Free'],
            ]}
          />
          <FactPanel
            title="When you go live"
            items={[
              ['Lowest deposit', '$10 on Standard or Cent'],
              ['Funding', 'USDT on TRON or BNB Chain'],
              ['Accounts', 'Five CFD accounts and an Options account'],
              ['Demo stays', 'Keep practising alongside your live accounts'],
            ]}
          />
        </div>
      </Block>

      <Related
        links={[
          { href: '/accounts', t: 'Live accounts', d: 'Five CFD accounts and an Options account.' },
          { href: '/accounts/funding', t: 'Funding', d: 'USDT in, usually within a minute.' },
          { href: '/academy', t: 'Academy', d: '118 lessons to learn alongside the demo.' },
          { href: '/platforms/trader', t: 'Kalks Trader', d: 'The screen you will practise on.' },
        ]}
      />

      <CtaPanel title="Your first trade is a practice one." text="Register in the Client Area and open a demo in a couple of minutes.">
        <a href={DEMO_HREF} className="kx-btn blue lg">
          Start a free demo
        </a>
      </CtaPanel>
    </>
  );
}
