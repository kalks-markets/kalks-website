import type { ReactNode } from 'react';
import { PageHero } from './PageHero';
import { StatRow } from './StatRow';
import { Block, CtaPanel, FactPanel, Related } from './Blocks';
import { LiveList, type LiveRow } from '@/components/market/LiveList';
import { RiskNote } from '@/components/ui/RiskNote';
import { getQuotes } from '@/lib/quotes';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';
import type { RemoteKey } from '@/content/remote';

/** One asset-class page: photo hero, live prices beside the trading terms, the hours, related pages. */
export async function MarketClass({
  kicker,
  title,
  lede,
  photo,
  stats,
  rows,
  liveTitle,
  liveIntro,
  terms,
  hours,
  extra,
  related,
}: {
  kicker: string;
  title: string;
  lede: string;
  photo: RemoteKey;
  stats: { v: string; l: string }[];
  rows: LiveRow[];
  liveTitle: string;
  liveIntro: string;
  terms: [ReactNode, ReactNode][];
  hours: [ReactNode, ReactNode][];
  extra?: ReactNode;
  related: { href: string; t: string; d: string }[];
}) {
  const quotes = await getQuotes(rows.map((r) => r.s));
  return (
    <>
      <PageHero
        kicker={kicker}
        title={title}
        lede={lede}
        photo={photo}
        actions={
          <>
            <a href={REGISTER_HREF} className="kx-btn prim lg">
              Open an account
            </a>
            <a href={DEMO_HREF} className="kx-btn ghost lg">
              Try the demo
            </a>
          </>
        }
      >
        <StatRow items={stats} />
      </PageHero>

      <Block id="prices" title={liveTitle} intro={liveIntro}>
        <div className="grid items-start gap-6 lg:grid-cols-[1.05fr_1fr]">
          <LiveList rows={rows} initial={quotes} />
          <div className="grid gap-6">
            <FactPanel title="Trading terms" items={terms} />
            <FactPanel title="Hours" items={hours} />
          </div>
        </div>
        <RiskNote className="mt-8 !text-white/70 [&_.text-tx2]:!text-white/85" />
      </Block>

      {extra}

      <Related links={related} />

      <CtaPanel title="Try it on demo first." text="Every market trades on a free demo with live prices. Go live from $10 when you are ready.">
        <a href={REGISTER_HREF} className="kx-btn blue lg">
          Open an account
        </a>
        <a href={DEMO_HREF} className="kx-btn lg !text-[#0b1640] shadow-[inset_0_0_0_1px_rgba(11,22,64,0.2)]">
          Try the demo
        </a>
      </CtaPanel>
    </>
  );
}

export const MARKET_LINKS = [
  { href: '/markets/forex', t: 'Forex', d: '44 currency pairs, majors to exotics.' },
  { href: '/markets/metals-energies', t: 'Metals & energies', d: 'Gold, silver, oil and gas.' },
  { href: '/markets/indices', t: 'Indices', d: '32 stock indices from the US, Europe and Asia.' },
  { href: '/markets/crypto', t: 'Crypto', d: '160 coins, around the clock.' },
  { href: '/markets', t: 'Every market', d: 'Search all 1,389 markets with live prices.' },
  { href: '/options', t: 'FX Options', d: 'Calls and puts on forex, gold, silver and oil.' },
];
