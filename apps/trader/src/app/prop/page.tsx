import type { Metadata } from 'next';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { Btn, Cta, Head, StatStrip } from '@/components/site/ui';
import { Shot, type Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { FaqSection, StepCards, Th } from '@/components/site/platforms/bits';
import { PinTour } from '@/components/site/platforms/ShotTours';
import { PSHOTS } from '@/components/site/platforms/shots';
import { RiskNote } from '@/components/ui/RiskNote';
import { PROP } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES } from '@/content/heroes';
import { REGISTER_HREF } from '@/lib/crm';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Prop challenges: Classic 2-Step, Rapid 1-Step and Instant Funding',
  description:
    'Get funded and keep up to 90%: simulated accounts from $5k to $200k, fees from $49, a 1-step or 2-step evaluation or instant funding, rules checked live on the server, payouts in USDT.',
  alternates: { canonical: '/prop' },
};

/** every account size offered by any plan, in order */
const SIZES = [...new Set(PROP.flatMap((p) => p.sizes.map(([s]) => s)))];
const LARGEST = SIZES[SIZES.length - 1];
const LOWEST_FEE = PROP[0].sizes[0][1];
/** "80%, scaling to 90%" → "90%" */
const TOP_SPLIT = PROP[0].split.match(/(\d+%)$/)?.[1] ?? '';
/** "Every 2 weeks, first after 14 days" → "14 days" */
const FIRST_PAYOUT = PROP[0].payouts.match(/first after (.+)$/)?.[1] ?? '';

const RULES: [string, (p: (typeof PROP)[number]) => string][] = [
  ['Targets', (p) => p.phases],
  ['Minimum days', (p) => p.minDays],
  ['Daily loss limit', (p) => p.dailyLoss],
  ['Maximum drawdown', (p) => p.maxDrawdown],
  ['Profit split', (p) => p.split],
  ['Payouts', (p) => p.payouts],
  ['Leverage', (p) => p.leverage],
  ['Challenge fee', (p) => p.refund],
  ['Style', (p) => p.news],
];

/** pins in % of the Client Area screenshot */
const BUY_PINS: Pin[] = [
  { x: 27.3, y: 20, title: 'Pick a model', text: '1-Step, 2-Step or Instant, each with its own rules.' },
  { x: 10.5, y: 35.5, title: 'Pick a size', text: 'The fee for each account size shows under it.' },
  { x: 8.8, y: 55.6, title: 'Your path', text: 'Each phase with its target and minimum days, then the funded account and its split.' },
  { x: 3.2, y: 86, title: 'The limits', text: 'Daily loss, maximum drawdown, minimum days and profit split, in money as well as percent.' },
  { x: 79.5, y: 7.7, title: 'Everything before you pay', text: 'Targets, limits, leverage, split and whether the fee comes back, in one summary.' },
  { x: 69, y: 84, title: 'Buy', text: 'Paid once, in USDT from your Kalks wallet.' },
];

const ALL = FAQ_GROUPS.find((g) => g.id === 'prop')!.items;
const pick = (q: string) => ALL.find((i) => i.q === q)!;
const FAQ = [
  pick('Which prop plans are there?'),
  pick('How much of the profit do I keep?'),
  {
    q: 'Is the capital real?',
    a: 'Challenge and funded accounts trade simulated funds. Your share of the profit on a funded account is paid in real money to your Kalks wallet, on your plan’s payout schedule.',
  },
  { q: 'When does the trading day reset?', a: 'At 17:00 New York time. Daily loss limits are measured from that point.' },
  {
    q: 'What is not allowed?',
    a: 'High-frequency trading, latency arbitrage, tick scalping, and copying or hedging across accounts. Rapid and Instant plans also exclude news trading and holding over the weekend.',
  },
  {
    q: 'What can I trade?',
    a: 'CFDs on the markets available to your prop account. Prop accounts cannot trade options and do not count towards partner commission.',
  },
  {
    q: 'What is the consistency rule?',
    a: 'On Rapid (40%) and Instant (30%), no single day may make up more than that share of your total profit. Classic has no consistency rule.',
  },
  { q: 'Do I get the fee back?', a: 'On Classic and Rapid, yes: the fee is refunded with your first payout. Instant Funding fees are not refunded.' },
];

const TONES = ['s-orange', 's-cream', 's-card'] as const;

export default function PropPage() {
  return (
    <>
      <PageHero
        photo="prop"
        eyebrow="Prop challenges"
        title={
          <>
            Earn your wings. <span className="s-mute">Keep up to {TOP_SPLIT}.</span>
          </>
        }
        lead={`Pass a one-step or two-step evaluation, or start funded today. Simulated accounts from ${SIZES[0]} to ${LARGEST}, every rule checked live on the server, payouts in USDT.`}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Start a challenge</Btn>
            <Btn href="#plans" variant="ghost" icon={false}>
              Compare the plans
            </Btn>
          </>
        }
        facts={[`${PROP.length} plans`, `Fees from ${LOWEST_FEE}`, `Up to ${LARGEST}`, 'Payouts in USDT']}
        aside={
          <HeroGlass>
            <div className="s-num text-[56px] text-white">{TOP_SPLIT}</div>
            <p className="mt-2 text-[14px] text-white/85">Top profit split, with the scaling plan</p>
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
                <span className="s-eyebrow">Get funded</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['1-Step', '2-Step', 'Instant'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              Trade simulated capital under clear rules. <span className="s-mute">Hit the target without breaking a limit, and get paid a share of the profit on your funded account, in USDT to your Kalks wallet.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: TOP_SPLIT, l: 'Top profit split', sub: 'With the scaling plan' },
                  { v: LARGEST, l: 'Largest account', sub: 'Classic and Rapid' },
                  { v: LOWEST_FEE, l: 'Lowest fee', sub: `${SIZES[0]} Classic 2-Step` },
                  { v: FIRST_PAYOUT, l: 'To a first payout', sub: 'Classic and Rapid' },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 plans */}
      <section id="plans" className="s-sec !pt-4 scroll-mt-20" aria-labelledby="plans-title">
        <div className="s-wrap">
          <Head
            id="plans-title"
            index="02"
            eyebrow="Plans"
            title={
              <>
                Three ways <span className="s-hot">to get funded.</span>
              </>
            }
            lead="The rules below are the plan defaults shown in the Client Area when you buy."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {PROP.map((p, i) => {
              const tone = TONES[i];
              const muted = tone === 's-cream' ? 'text-[var(--s-cream-tx2)]' : tone === 's-orange' ? 'text-white/80' : 'text-[var(--s-tx3)]';
              const line = tone === 's-cream' ? 'border-[rgba(26,20,16,0.12)]' : tone === 's-orange' ? 'border-white/25' : 'border-[var(--s-line)]';
              return (
                <Rise key={p.id} delay={i * 70} className="h-full">
                  <div id={p.id} className={cn('s-bento-card h-full scroll-mt-28', tone)}>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[clamp(26px,2.4vw,34px)] font-[500] leading-[1.02] tracking-[-0.035em]">{p.name}</h3>
                      {i === 0 && <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[var(--s-cream-tx)]">Popular</span>}
                    </div>
                    <p className={cn('mt-3 text-[15px] leading-relaxed', tone === 's-orange' ? 'text-white/90' : tone === 's-cream' ? 'text-[var(--s-cream-tx2)]' : 'text-[var(--s-tx2)]')}>{p.summary}</p>
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="s-num text-[52px]">{p.sizes[0][1]}</span>
                      <span className={cn('text-[13.5px] font-medium', muted)}>from, for {p.sizes[0][0]}</span>
                    </div>
                    <dl className="mt-6">
                      {RULES.map(([k, get]) => (
                        <div key={k} className={cn('grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] gap-4 border-t py-2.5 text-[14px]', line)}>
                          <dt className={muted}>{k}</dt>
                          <dd className="font-medium">{get(p)}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-auto pt-7">
                      <Btn href={REGISTER_HREF} variant={tone === 's-orange' ? 'light' : tone === 's-cream' ? 'dark' : 'primary'}>
                        Start {p.name}
                      </Btn>
                    </div>
                  </div>
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 fees */}
      <section id="fees" className="s-sec s-band scroll-mt-20" aria-labelledby="price-title">
        <div className="s-wrap">
          <Head
            id="price-title"
            index="03"
            eyebrow="Fees"
            title={
              <>
                One fee, <span className="s-mute">by account size.</span>
              </>
            }
            lead={`Paid once, in USDT from your Kalks wallet. Instant Funding goes up to ${PROP[2].sizes[PROP[2].sizes.length - 1][0]}.`}
          />
          <Rise className="s-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--s-line)]">
                    <Th>Account size</Th>
                    {PROP.map((p) => (
                      <Th key={p.id} right>
                        {p.name}
                      </Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SIZES.map((size) => (
                    <tr key={size} className="border-b border-[var(--s-line)] last:border-0">
                      <th scope="row" className="px-5 py-4 text-start text-[22px] font-[400] tracking-[-0.03em] text-white">
                        {size}
                      </th>
                      {PROP.map((p, i) => {
                        const hit = p.sizes.find(([s]) => s === size);
                        return (
                          <td key={p.id} className={cn('px-5 py-4 text-end font-mono text-[15px] [font-variant-numeric:tabular-nums]', i === 0 ? 'text-[var(--s-orange2)]' : 'text-white')}>
                            {hit ? hit[1] : <span className="text-[var(--s-tx3)]">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Rise>
        </div>
      </section>

      {/* 04 in the Client Area */}
      <section className="s-sec" aria-labelledby="ca-title">
        <div className="s-wrap">
          <Head
            id="ca-title"
            index="04"
            eyebrow="In the Client Area"
            title={
              <>
                Choose it, <span className="s-mute">see every rule, buy.</span>
              </>
            }
            lead={`${PROP[1].name} at ${PROP[1].sizes[3][0]}, as the Client Area shows it before you pay. Point at a number to see each part.`}
          />
          <PinTour shot={PSHOTS.propChallenge} pins={BUY_PINS} layout="under" scrollMin="min-w-[680px]" />
          <Rise className="mt-14">
            <div className="no-sb max-lg:-mx-[var(--gutter)] max-lg:overflow-x-auto max-lg:px-[var(--gutter)] max-lg:pb-3">
              <div className="min-w-[760px] lg:min-w-0">
                <Shot shot={PSHOTS.propRules} flat />
              </div>
            </div>
          </Rise>
        </div>
      </section>

      {/* 05 how it works */}
      <section className="s-sec s-band" aria-labelledby="how-prop">
        <div className="s-wrap">
          <Head
            id="how-prop"
            index="05"
            eyebrow="How it works"
            title={
              <>
                From challenge <span className="s-mute">to payout.</span>
              </>
            }
          />
          <StepCards
            steps={[
              { t: 'Choose a challenge', d: 'Pick a plan and an account size, and pay the fee from your USDT wallet.' },
              { t: 'Hit the target', d: 'Trade within the rules. Every limit is checked about once a second, with warnings at 50%, 75% and 90% of your daily loss.' },
              { t: 'Get funded', d: 'Pass and your funded account opens, with a certificate anyone can verify online.' },
              { t: 'Get paid', d: 'Request payouts on schedule once your identity is verified. The account grows 25% every four months at 10% profit.' },
            ]}
          />
        </div>
      </section>

      <FaqSection
        top
        index="06"
        title={
          <>
            Prop, <span className="s-mute">answered.</span>
          </>
        }
        items={FAQ}
        note={
          <>
            <p className="max-w-[110ch] text-[12.5px] leading-relaxed text-[var(--s-tx3)]">
              Challenge and funded accounts use simulated funds; the fee pays for the evaluation. Payouts follow your plan’s rules and need a verified identity.
            </p>
            <RiskNote className="mt-3" />
          </>
        }
      />

      <Cta
        title={
          <>
            Start a challenge <span className="text-white/70">today.</span>
          </>
        }
        sub={`Pick a plan from ${LOWEST_FEE}, trade within the rules, and keep up to ${TOP_SPLIT} of the profit on your funded account.`}
        primary={{ href: REGISTER_HREF, label: 'Start a challenge' }}
        secondary={{ href: '#plans', label: 'Compare the plans' }}
        facts={[`${PROP.length} plans`, `${SIZES[0]} to ${LARGEST}`, 'Payouts in USDT']}
        image={HEROES.prop}
      />
    </>
  );
}
