import type { Metadata } from 'next';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { BentoCard, Btn, Cta, Head, StatStrip } from '@/components/site/ui';
import { Shot, type Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { FaqSection, StepCards, Th } from '@/components/site/platforms/bits';
import { PinTour } from '@/components/site/platforms/ShotTours';
import { PSHOTS } from '@/components/site/platforms/shots';
import { IB, IB_LEVELS } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES } from '@/content/heroes';
import { REGISTER_HREF } from '@/lib/crm';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Partners: get paid for the lots your clients trade',
  description:
    'Every Kalks client is a partner from sign-up. Per-lot commission on three tiers of referrals, CPA rewards, five levels from Bronze to Diamond, weekly payouts in USDT.',
  alternates: { canonical: '/partners' },
};

const TOP = IB_LEVELS[IB_LEVELS.length - 1];

/** pins in % of the partner dashboard screenshot */
const DASH_PINS: Pin[] = [
  { x: 37.4, y: 39.1, title: 'Payouts', text: `Your payout history. ${IB.payout}.` },
  { x: 62.3, y: 39.1, title: 'Copy your link', text: 'One tap copies your referral link, ready to share anywhere.' },
  { x: 18.1, y: 53.7, title: 'Your level', text: `${IB_LEVELS.length} levels from ${IB_LEVELS[0].name} to ${TOP.name}, with your partner code beside it.` },
  { x: 59.3, y: 48.8, title: 'Rate card', text: 'Your per-lot rates by asset class at your current level.' },
  { x: 14.8, y: 61.6, title: 'Progress to the next level', text: 'Active clients and monthly network lots against the next level, reset each month.' },
  { x: 90.5, y: 59.5, title: 'Link and code on a card', text: 'Your referral link and code. Clients who sign up with them stay linked to you.' },
];

const ALL = FAQ_GROUPS.find((g) => g.id === 'partners')!.items;
const pick = (q: string) => ALL.find((i) => i.q === q)!;
const FAQ = [
  pick('How do I become a partner?'),
  pick('How am I paid?'),
  { q: 'What counts towards commission?', a: 'Closed trades on your clients’ live accounts that were held for at least two minutes. Prop accounts do not count.' },
  {
    q: 'What is CPA?',
    a: `A one-off reward for each new client who deposits at least $500 and places a first trade, paid after a 30-day hold: $${IB_LEVELS[0].cpa} at ${IB_LEVELS[0].name} and ${IB_LEVELS[1].name}, $${IB_LEVELS[2].cpa} from ${IB_LEVELS[2].name}.`,
  },
  { q: 'Can I give part of my commission back?', a: 'Yes. Pass up to 50% to clients as a rebate and up to 50% to your sub-partners.' },
  { q: 'How do levels work?', a: `You start at ${IB_LEVELS[0].name}. Levels rise with your active clients and the lots they trade each month, and every level raises your per-lot rates.` },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        photo="partners"
        eyebrow="Partners"
        title={
          <>
            Get paid for the lots <span className="s-mute">your clients trade.</span>
          </>
        }
        lead={`Every Kalks client is a partner from day one. Share your link, earn per lot on ${IB.tiers} tiers of referrals, and get paid every Monday in USDT.`}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Become a partner</Btn>
            <Btn href="#levels" variant="ghost" icon={false}>
              See the rates
            </Btn>
          </>
        }
        facts={[`${IB.tiers} tiers deep`, 'Paid every Monday', `From ${IB.minPayout}`]}
        aside={
          <HeroGlass>
            <div className="s-num text-[56px] text-white">${TOP.fxMajor}</div>
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
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">Partner programme</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Per lot', 'CPA', 'Weekly'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              Every client is a partner from sign-up. <span className="s-mute">Your link, code and dashboard are in the Client Area from day one, with no separate application, and every lot your clients trade pays you a fixed amount.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: `$${TOP.fxMajor}`, l: 'Per FX major lot', sub: `At ${TOP.name}` },
                  { v: IB.tiers, l: 'Tiers deep', sub: `${IB.tierShares} of the rate` },
                  { v: IB_LEVELS.length, l: 'Levels', sub: `${IB_LEVELS[0].name} to ${TOP.name}` },
                  { v: IB.minPayout, l: 'Minimum payout', sub: 'Every Monday, to your USDT wallet' },
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
              { t: 'Clients trade', d: 'Earn a fixed amount per lot your clients trade, set by asset class and your level.' },
              { t: 'Your network grows', d: `Earn on ${IB.tiers} tiers: ${IB.tierShares} of the per-lot rate. Share part with sub-partners or as a rebate.` },
              { t: 'Get paid weekly', d: `${IB.payout}, from ${IB.minPayout}.` },
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
            lead="Commission in US dollars per standard lot traded by your direct clients. Your level updates as your network grows."
          />
          <Rise className="s-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--s-line)]">
                    <Th>Level</Th>
                    <Th right>FX majors</Th>
                    <Th right>Metals</Th>
                    <Th right>Crypto</Th>
                    <Th right>CPA</Th>
                    <Th className="ps-10">To reach it</Th>
                  </tr>
                </thead>
                <tbody>
                  {IB_LEVELS.map((l, i) => {
                    const top = i === IB_LEVELS.length - 1;
                    return (
                      <tr key={l.name} className={cn('border-b border-[var(--s-line)] last:border-0', top && 'bg-[rgba(242,96,12,0.08)]')}>
                        <th scope="row" className="px-5 py-4 text-start">
                          <span className="flex items-center gap-3 text-[20px] font-[400] tracking-[-0.025em] text-white">
                            <span className="size-2.5 rounded-full bg-[var(--s-orange)]" style={{ opacity: 0.3 + i * 0.175 }} aria-hidden />
                            {l.name}
                          </span>
                        </th>
                        <td className={cn('px-5 py-4 text-end font-mono text-[15px] [font-variant-numeric:tabular-nums]', top ? 'text-[var(--s-orange2)]' : 'text-white')}>${l.fxMajor}</td>
                        <td className="px-5 py-4 text-end font-mono text-[15px] text-white [font-variant-numeric:tabular-nums]">${l.metals}</td>
                        <td className="px-5 py-4 text-end font-mono text-[15px] text-white [font-variant-numeric:tabular-nums]">${l.crypto}</td>
                        <td className="px-5 py-4 text-end font-mono text-[15px] text-white [font-variant-numeric:tabular-nums]">${l.cpa}</td>
                        <td className="py-4 pe-5 ps-10 text-[14px] text-[var(--s-tx2)]">{l.needs}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Rise>
          <p className="mt-5 max-w-[90ch] text-[12.5px] leading-relaxed text-[var(--s-tx3)]">
            FX minors, indices, energies and stocks have their own rates at each level, shown in your partner dashboard. These are the current default rates and can change.
          </p>
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
            lead={`Clients you refer, the clients they refer, and one level further: ${IB.tierShares} of the per-lot rate. Clients stay in your tree for good.`}
          />
          <Rise>
            <div className="no-sb max-lg:-mx-[var(--gutter)] max-lg:overflow-x-auto max-lg:px-[var(--gutter)] max-lg:pb-3">
              <div className="min-w-[760px] lg:min-w-0">
                <Shot shot={PSHOTS.partnerTiers} />
              </div>
            </div>
          </Rise>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <BentoCard tone="cream" kicker="Network" title={`${IB.tiers} tiers deep`} text={`Earn on clients referred by your clients: ${IB.tierShares} of the per-lot rate.`} className="!min-h-[220px]" />
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
        items={FAQ}
      />

      <Cta
        title={
          <>
            Share your link <span className="text-white/70">this week.</span>
          </>
        }
        sub={`Sign up and your partner link is ready at once. Earn on ${IB.tiers} tiers, paid every Monday from ${IB.minPayout}.`}
        primary={{ href: REGISTER_HREF, label: 'Become a partner' }}
        secondary={{ href: '#levels', label: 'See the rates' }}
        facts={[`Up to $${TOP.fxMajor} per FX major lot`, `${IB.tiers} tiers deep`, 'Weekly in USDT']}
        image={HEROES.partners}
      />
    </>
  );
}
