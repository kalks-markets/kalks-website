import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, FactList, Steps } from '@/components/ui/Section';
import { Faq } from '@/components/ui/Faq';
import { RiskNote } from '@/components/ui/RiskNote';
import { PROP } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Prop challenges: Classic 2-Step, Rapid 1-Step and Instant Funding',
  description:
    'Get funded and keep up to 90%: simulated accounts from $5k to $200k, fees from $49, a 1-step or 2-step evaluation or instant funding, rules checked live on the server, payouts in USDT.',
  alternates: { canonical: '/prop' },
};

const SIZES = ['$5k', '$10k', '$25k', '$50k', '$100k', '$200k'];

const FAQ = [
  {
    q: 'Is the capital real?',
    a: 'Challenge and funded accounts trade simulated funds. Your share of the profit on a funded account is paid in real money to your Kalks wallet, on your plan’s payout schedule.',
  },
  {
    q: 'When does the trading day reset?',
    a: 'At 17:00 New York time. Daily loss limits are measured from that point.',
  },
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
  {
    q: 'Do I get the fee back?',
    a: 'On Classic and Rapid, yes: the fee is refunded with your first payout. Instant Funding fees are not refunded.',
  },
];

export default function PropPage() {
  return (
    <>
      <PageHero
        kicker="Prop challenges"
        title="Earn your wings. Keep up to 90%."
        lede="Pass a one-step or two-step evaluation, or start funded today. Simulated accounts from $5k to $200k, every rule checked live on the server, payouts in USDT."
        photo="prop"
        actions={
          <>
            <a href={REGISTER_HREF} className="kx-btn prim lg">
              Start a challenge
            </a>
            <a href="#plans" className="kx-btn ghost lg">
              Compare the plans
            </a>
          </>
        }
      >
        <StatRow
          items={[
            { v: '90%', l: 'Top profit split' },
            { v: '$200k', l: 'Largest account' },
            { v: '$49', l: 'Lowest fee' },
            { v: '14 days', l: 'To a first payout' },
          ]}
        />
      </PageHero>

      <Section id="plans" labelledBy="plans-title">
        <SectionHead
          id="plans-title"
          kicker="01 — PLANS"
          title="Three ways to get funded."
          lede="The rules below are the plan defaults shown in the Client Area when you buy."
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {PROP.map((p, i) => (
            <div key={p.id} className={cn('card flex flex-col p-6 sm:p-7', i === 0 && 'shadow-[var(--sh1),inset_0_0_0_2px_var(--red)]')}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="d-wide text-[24px]">{p.name}</h3>
                {i === 0 && <span className="tag new">Popular</span>}
              </div>
              <p className="body mt-2">{p.summary}</p>
              <FactList
                className="mt-5"
                items={[
                  ['Targets', p.phases],
                  ['Minimum days', p.minDays],
                  ['Daily loss limit', p.dailyLoss],
                  ['Maximum drawdown', p.maxDrawdown],
                  ['Profit split', p.split],
                  ['Payouts', p.payouts],
                  ['Leverage', p.leverage],
                  ['Challenge fee', p.refund],
                  ['Style', p.news],
                ]}
              />
              <div className="mt-auto pt-6">
                <Btn href={REGISTER_HREF} v={i === 0 ? 'red' : 'ink'}>
                  Start {p.name}
                </Btn>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="price-title">
        <SectionHead id="price-title" kicker="02 — FEES" title="One fee, by account size." lede="Paid once, in USDT from your Kalks wallet. Instant Funding goes up to $100k." />
        <div className="card overflow-hidden p-2">
          <div className="overflow-x-auto">
            <table className="tb min-w-[620px]">
              <thead>
                <tr>
                  <th scope="col">Account size</th>
                  {PROP.map((p) => (
                    <th key={p.id} scope="col" className="r">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((size) => (
                  <tr key={size}>
                    <th scope="row" className="money !text-[18px]">
                      {size}
                    </th>
                    {PROP.map((p) => {
                      const hit = p.sizes.find(([s]) => s === size);
                      return (
                        <td key={p.id} className="r m">
                          {hit ? hit[1] : <span className="text-tx3">—</span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section labelledBy="how-prop">
        <SectionHead id="how-prop" kicker="03 — HOW IT WORKS" title="From challenge to payout." />
        <Steps
          steps={[
            { t: 'Choose a challenge', d: 'Pick a plan and an account size, and pay the fee from your USDT wallet.' },
            { t: 'Hit the target', d: 'Trade within the rules. Every limit is checked about once a second, with warnings at 50%, 75% and 90% of your daily loss.' },
            { t: 'Get funded', d: 'Pass and your funded account opens, with a certificate anyone can verify online.' },
            { t: 'Get paid', d: 'Request payouts on schedule once your identity is verified. The account grows 25% every four months at 10% profit.' },
          ]}
        />
      </Section>

      <Section labelledBy="pfaq-title" className="sec-last">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead id="pfaq-title" kicker="04 — QUESTIONS" title="Prop, answered." />
          <div>
            <Faq items={FAQ} schema />
            <p className="mt-8 max-w-[110ch] text-[12.5px] leading-relaxed text-tx3">
              Challenge and funded accounts use simulated funds; the fee pays for the evaluation. Payouts follow your plan’s rules and
              need a verified identity.
            </p>
            <RiskNote className="mt-3" />
          </div>
        </div>
      </Section>
    </>
  );
}
