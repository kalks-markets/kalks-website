import type { Metadata } from 'next';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { BentoCard, Btn, Cta, Head, StatStrip } from '@/components/site/ui';
import { Shot, type Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { FaqSection, StepCards } from '@/components/site/platforms/bits';
import { RateCard } from '@/components/site/partners/RateCard';
import { PinTour } from '@/components/site/platforms/ShotTours';
import { PSHOTS } from '@/components/site/platforms/shots';
import { IB, IB_AS_OF, IB_LEVELS, usd, usd2 } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { REGISTER_HREF } from '@/lib/crm';
import { getPage } from '@/content/pages';

export const metadata: Metadata = {
  title: 'Partners: get paid for the lots your clients trade',
  description:
    'Every Kalks client is a partner from sign-up. Per-lot commission on forex, metals, oil, indices, crypto and stocks, a fixed amount per options contract, three tiers of referrals, five levels from Bronze to Diamond, daily payouts in USDT. The full rate card is on the page.',
  alternates: { canonical: '/partners' },
};

const TOP = IB_LEVELS[IB_LEVELS.length - 1];
const EX = IB_LEVELS[2];

/** pins in % of the partner dashboard screenshot */
const DASH_PINS: Pin[] = [
  { x: 37.4, y: 39.1, title: 'Payouts', text: `Your payout history. ${IB.payout}.` },
  { x: 62.3, y: 39.1, title: 'Copy your link', text: 'One tap copies your referral link, ready to share anywhere.' },
  { x: 18.1, y: 53.7, title: 'Your level', text: `${IB_LEVELS.length} levels from ${IB_LEVELS[0].name} to ${TOP.name}, with your partner code beside it.` },
  { x: 59.3, y: 48.8, title: 'Rate card', text: 'Your rates by market at your current level: per lot on CFDs, per contract on options.' },
  { x: 14.8, y: 61.6, title: 'Progress to the next level', text: 'Active clients and network lots over the last 3 months against the next level.' },
  { x: 90.5, y: 59.5, title: 'Link and code on a card', text: 'Your referral link and code. Clients who sign up with them stay linked to you.' },
];

const ALL = FAQ_GROUPS.find((g) => g.id === 'partners')!.items;
const pick = (q: string) => ALL.find((i) => i.q === q)!;
const FAQ = [
  pick('How do I become a partner?'),
  pick('How am I paid?'),
  { q: 'What counts towards commission?', a: 'Closed trades on your clients’ live accounts that were held for at least three minutes. Demo and prop accounts do not count, nor do your own accounts or clients who share your IP address, device or identity. The full rules are in the partner plan.' },
  {
    q: 'Do options earn commission?',
    a: `Yes: a fixed amount per contract your clients trade, round turn, on the same tiers as CFD lots: ${IB_LEVELS.map((l) => `${usd(l.optionsUsd)} at ${l.name}`).join(', ')}. For example, 10 option contracts at ${EX.name} = 10 × ${usd(EX.optionsUsd)} = ${usd2(10 * EX.optionsUsd)}.`,
  },
  { q: 'Can I share my commission?', a: `You can pass up to ${IB.maxSplitPct}% of what you earn on a sub-partner’s clients to that sub-partner. Client rebates are not offered.` },
  { q: 'How do levels work?', a: `You start at ${IB_LEVELS[0].name}. Levels rise with your active clients and the lots they trade over the last ${IB.windowDays} days, checked daily, and every level raises your rates. Both targets of a level must be met.` },
];

export default async function PartnersPage() {
  const page = await getPage('partners');
  const { hero } = page;
  return (
    <>
      <PageHero
        hero={hero}
        facts={[`${IB.tiers} tiers deep`, 'Paid daily', `From ${IB.minPayout}`]}
        aside={
          <HeroGlass>
            <div className="s-num text-[56px] text-white">{usd(TOP.rates['fx-major'])}</div>
            <p className="mt-2 text-[14px] text-white/85">
              Per FX major lot at {TOP.name}, the top level
            </p>
          </HeroGlass>
        }
      />

      {/* 01 in numbers */}
      <section className="s-sec" aria-labelledby="n-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div>
              <span className="s-eyebrow">Partner programme</span>
            </div>
            <h2 id="n-title" className="s-statement">
              Every client is a partner from sign-up. <span className="s-mute">Your link, code and dashboard are in the Client Area from day one, with no separate application, and every lot your clients trade pays you a fixed amount.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: usd(TOP.rates['fx-major']), l: 'Per FX major lot', sub: `At ${TOP.name}` },
                  { v: IB.tiers, l: 'Tiers deep', sub: 'Your rate, then 10% and 5% below' },
                  { v: IB_LEVELS.length, l: 'Levels', sub: `${IB_LEVELS[0].name} to ${TOP.name}` },
                  { v: IB.minPayout, l: 'Minimum payout', sub: 'Daily, to your USDT wallet' },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 how it works */}
      <section className="s-sec !pt-4" aria-labelledby="ph-title">
        <div className="s-wrap">
          <Head
            id="ph-title"
            index="02"
            eyebrow="How it works"
            title={
              <>
                Share, earn, <span className="s-hot">get paid.</span>
              </>
            }
          />
          <StepCards
            steps={[
              { t: 'Share your link', d: 'Your link and code are ready when you sign up, with campaign links and a QR code for each channel.' },
              { t: 'Clients trade', d: 'Earn a fixed amount per lot your clients trade, set by asset class and your level, the same on every account type.' },
              { t: 'Your network grows', d: `Earn on ${IB.tiers} tiers: your rate on direct clients, then 10% and 5% of what the partners below you earn. Pass up to 70% of your rate to sub-partners.` },
              { t: 'Get paid daily', d: `${IB.payout}, from ${IB.minPayout}. Smaller amounts carry over to the next day.` },
            ]}
          />
        </div>
      </section>

      {/* 03 levels */}
      <section id="levels" className="s-sec s-band scroll-mt-20" aria-labelledby="lv-title">
        <div className="s-wrap">
          <Head
            id="lv-title"
            index="03"
            eyebrow="Levels"
            title={
              <>
                {IB_LEVELS.length} levels. <span className="s-mute">Higher rates at each.</span>
              </>
            }
            lead="Commission in US dollars per standard lot, round turn, on every market your direct clients trade (options: per contract), the same on every account type. Your level updates as your network grows."
          />
          <Rise>
            <RateCard />
          </Rise>
          <div className="mt-6 flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[80ch] text-[12.5px] leading-relaxed text-[var(--s-tx3)]">
              Rates as of {IB_AS_OF}. Options pay a fixed amount per contract your clients trade: {usd(IB_LEVELS[0].optionsUsd)} at {IB_LEVELS[0].name} up to {usd(TOP.optionsUsd)} at {TOP.name}, on the same tiers as CFD lots. Levels need both targets over the last {IB.windowDays} days. Rates can change with {IB.noticeDays} days’ notice.
            </p>
            <Btn href="/partners/plan" variant="ghost">
              Read the full plan
            </Btn>
          </div>
        </div>
      </section>

      {/* 04 the dashboard */}
      <section className="s-sec" aria-labelledby="d-title">
        <div className="s-wrap">
          <Head
            id="d-title"
            index="04"
            eyebrow="Partner dashboard"
            title={
              <>
                Your level, link <span className="s-mute">and payouts.</span>
              </>
            }
            lead="In the Client Area from the day you sign up. Point at a number to see each part."
          />
          <PinTour shot="caPartner" pins={DASH_PINS} layout="under" scrollMin="min-w-[640px]" />
        </div>
      </section>

      {/* 05 network */}
      <section className="s-sec s-band" aria-labelledby="nw-title">
        <div className="s-wrap">
          <Head
            id="nw-title"
            index="05"
            eyebrow="Your network"
            title={
              <>
                {IB.tiers} tiers deep, <span className="s-mute">tracked for you.</span>
              </>
            }
            lead="Clients you refer, the clients they refer, and one level further: your rate on direct clients, then 10% and 5% of what the partners below you earn. Clients stay in your tree for good."
          />
          <Rise>
            <div className="no-sb max-lg:-mx-[var(--gutter)] max-lg:overflow-x-auto max-lg:px-[var(--gutter)] max-lg:pb-3">
              <div className="min-w-[760px] lg:min-w-0">
                <Shot shot={PSHOTS.partnerTiers} />
              </div>
            </div>
          </Rise>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <BentoCard tone="cream" kicker="Network" title={`${IB.tiers} tiers deep`} text="Earn on clients referred by your clients: 10% and 5% of what the partners below you earn." className="!min-h-[220px]" />
            <BentoCard tone="glass" kicker="Tracking" title="Campaign links" text="One link per channel, with clicks, sign-ups and first deposits tracked for each." delay={60} className="!min-h-[220px]" />
            <BentoCard tone="orange" kicker="For business" title="White-label ready" href="/white-label" text="Bringing a whole business? Run your own brand on the Kalks platform." delay={120} className="!min-h-[220px]" />
          </div>
        </div>
      </section>

      <FaqSection
        top
        index="06"
        title={
          <>
            Partners, <span className="s-mute">answered.</span>
          </>
        }
        items={page.faq(FAQ)}
      />

      <Cta
        title={
          <>
            Share your link <span className="text-white/70">this week.</span>
          </>
        }
        sub={`Sign up and your partner link is ready at once. Earn on ${IB.tiers} tiers, paid daily from ${IB.minPayout}.`}
        primary={{ href: REGISTER_HREF, label: 'Become a partner' }}
        secondary={{ href: '/partners/plan', label: 'Read the full plan' }}
        facts={[`Up to ${usd(TOP.rates['fx-major'])} per FX major lot`, `${IB.tiers} tiers deep`, 'Daily in USDT']}
        image={page.ctaImage}
      />
    </>
  );
}
