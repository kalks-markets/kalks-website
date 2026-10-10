import type { ReactNode } from 'react';
import { PageHero, HeroGlass } from '@/components/site/Heroes';
import { Btn, Cta, Faq, Head, StatStrip, TextLink } from '@/components/site/ui';
import { Rise } from '@/components/site/Rise';
import { LiveList, type LiveRow } from '@/components/market/LiveList';
import { RiskNote } from '@/components/ui/RiskNote';
import { ACCOUNTS, DEMO, FUNDING } from '@/content/facts';
import { HEROES } from '@/content/heroes';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';
import { getQuotes } from '@/lib/quotes';
import { FactTable, FaqSchema, LinkCards, MARKET_PAGES, MiniHead } from './bits';

/**
 * One asset-class page in the new design: compact photo hero, the class in numbers, live prices beside the trading
 * terms and hours, the class in Kalks Trader (real screenshot with pins), more markets, questions, call to action.
 */
export async function ClassPage({
  self,
  eyebrow,
  title,
  lead,
  heroFacts,
  glass,
  statement,
  chips,
  stats,
  rows,
  liveTitle,
  liveIntro,
  terms,
  hours,
  trader,
  faq,
}: {
  /** this page's path (left out of "more markets") */
  self: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  heroFacts: string[];
  glass: { v: ReactNode; l: ReactNode }[];
  statement: ReactNode;
  chips: string[];
  stats: { v: ReactNode; l: ReactNode; sub?: ReactNode }[];
  rows: LiveRow[];
  liveTitle: ReactNode;
  liveIntro: string;
  terms: [ReactNode, ReactNode][];
  hours: [ReactNode, ReactNode][];
  /** section 03: the class in Kalks Trader */
  trader: { eyebrow: string; title: ReactNode; lead: string; body: ReactNode };
  faq: { q: string; a: string }[];
}) {
  const quotes = await getQuotes(rows.filter((r) => !r.soon).map((r) => r.s));
  const related = MARKET_PAGES.filter((l) => l.href !== self).slice(0, 4);
  return (
    <>
      <PageHero
        photo="markets"
        compact
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Open an account</Btn>
            <Btn href="#prices" variant="ghost" icon={false}>
              Live prices
            </Btn>
          </>
        }
        facts={heroFacts}
        aside={glass.map((g, i) => (
          <HeroGlass key={i}>
            <div className="s-num text-[44px]">{g.v}</div>
            <div className="mt-2 text-[13.5px] text-white/85">{g.l}</div>
          </HeroGlass>
        ))}
      />

      {/* 01 in numbers */}
      <section className="s-sec" aria-labelledby="n-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">{eyebrow}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              {statement}
            </h2>
            <div className="lg:col-span-2">
              <StatStrip items={stats} />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 live prices, terms and hours */}
      <section id="prices" className="s-sec s-band scroll-mt-24" aria-labelledby="l-title">
        <div className="s-wrap">
          <Head id="l-title" index="02" eyebrow="Live prices" title={liveTitle} lead={liveIntro} action={<TextLink href="/markets#list">Search every market</TextLink>} />
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
            <Rise>
              <LiveList rows={rows} initial={quotes} className="!rounded-[var(--s-r)] !p-3" />
            </Rise>
            <Rise delay={100} className="grid gap-5">
              <FactTable title="Trading terms" rows={terms} />
              <FactTable title="Hours" rows={hours} />
            </Rise>
          </div>
          <RiskNote className="mt-10" />
        </div>
      </section>

      {/* 03 in Kalks Trader */}
      <section className="s-sec" aria-labelledby="t-title">
        <div className="s-wrap">
          <Head id="t-title" index="03" eyebrow={trader.eyebrow} title={trader.title} lead={trader.lead} action={<Btn href="/platforms/trader">Explore Kalks Trader</Btn>} />
          {trader.body}
        </div>
      </section>

      {/* 04 more markets */}
      <section className="s-sec s-band" aria-labelledby="m-title">
        <div className="s-wrap">
          <Head
            id="m-title"
            index="04"
            eyebrow="More markets"
            title={
              <>
                Keep <span className="s-mute">exploring.</span>
              </>
            }
            action={<TextLink href="/markets">Every market</TextLink>}
          />
          <LinkCards links={related} />
        </div>
      </section>

      {/* 05 questions */}
      <section className="s-sec" aria-labelledby="f-title">
        <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Rise className="flex flex-col items-start gap-6">
            <MiniHead
              index="05"
              eyebrow="Questions"
              id="f-title"
              title={
                <>
                  Trading <span className="s-mute">conditions.</span>
                </>
              }
            />
            <TextLink href="/faq">Every question, by topic</TextLink>
          </Rise>
          <Rise delay={100}>
            <Faq items={faq} />
            <FaqSchema items={faq} />
          </Rise>
        </div>
      </section>

      <Cta
        title={
          <>
            Try it on demo <span className="text-white/70">first.</span>
          </>
        }
        sub={`Every market trades on a free demo with ${DEMO.defaultBalance} of virtual money and live prices. Go live from ${ACCOUNTS[0].minDeposit} when you are ready.`}
        primary={{ href: REGISTER_HREF, label: 'Open an account' }}
        secondary={{ href: DEMO_HREF, label: 'Try the demo' }}
        facts={[`Fund with ${FUNDING.minDeposit}`, `${FUNDING.withdrawalFee} withdrawal fee`, 'Free demo']}
        image={HEROES.markets}
      />
    </>
  );
}
