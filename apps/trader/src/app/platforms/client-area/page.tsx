import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Block, CtaPanel, InfoGrid, Related } from '@/components/kx/Blocks';
import { ACADEMY } from '@/content/facts';
import { CLIENT_FEATURES } from '@/content/platforms';
import { CRM_URL, REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'The Client Area',
  description:
    'The Kalks Client Area runs everything around your trading: CFD and Options accounts, the USDT wallet, copy trading, PAMM and MAM, prop challenges, partner earnings, the Academy and support.',
  alternates: { canonical: '/platforms/client-area' },
};

export default function ClientAreaPage() {
  return (
    <>
      <PageHero
        kicker="Client Area"
        title="One place for everything around the trade."
        lede="Accounts, money, copy trading, prop challenges, partner earnings and learning, side by side, in 22 languages."
        photo="clientarea"
        actions={
          <>
            <a href={REGISTER_HREF} className="kx-btn prim lg">
              Open an account
            </a>
            <a href={CRM_URL} className="kx-btn ghost lg">
              Log in
            </a>
          </>
        }
      >
        <StatRow
          items={[
            { v: '1', l: 'USDT wallet for every account' },
            { v: '22', l: 'Languages' },
            { v: String(ACADEMY.lessons), l: 'Academy lessons' },
            { v: 'Chat', l: 'Support from any page' },
          ]}
        />
      </PageHero>

      <Block id="inside" title="What is inside.">
        <InfoGrid items={CLIENT_FEATURES} cols={4} />
      </Block>

      <Related
        links={[
          { href: '/platforms/trader', t: 'Kalks Trader', d: 'Where the trading happens.' },
          { href: '/accounts/funding', t: 'Funding', d: 'USDT in, usually within a minute.' },
          { href: '/copy-trading', t: 'Copy trading', d: 'Follow an approved master.' },
          { href: '/prop', t: 'Prop challenges', d: 'Simulated accounts up to $200k.' },
        ]}
      />

      <CtaPanel title="Get your own Client Area." text="Register in a couple of minutes, then open a demo or a live account.">
        <a href={REGISTER_HREF} className="kx-btn blue lg">
          Open an account
        </a>
      </CtaPanel>
    </>
  );
}
