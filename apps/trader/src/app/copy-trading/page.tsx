import type { Metadata } from 'next';
import { Hero } from '@/components/ui/Hero';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, Steps } from '@/components/ui/Section';
import { Faq } from '@/components/ui/Faq';
import { RiskNote } from '@/components/ui/RiskNote';
import { FigurePair } from '@/components/art/HeroArt';
import { SOCIAL } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Copy trading, PAMM and MAM',
  description:
    'Follow approved masters with limits you set, invest in PAMM funds, or link your account to a MAM manager. Or become a master and earn a performance fee on new highs.',
  alternates: { canonical: '/copy-trading' },
};

const lower = (xs: readonly string[]) => xs.join(', ').toLowerCase();

const WAYS = [
  {
    id: 'copy',
    cls: 'pc-red',
    k: 'COPY TRADING',
    t: 'Mirror a master.',
    d: 'A copy account repeats every trade of the master you follow: opens, partial closes, stop loss and take profit changes, pending orders.',
    pts: [`Sizing: ${lower(SOCIAL.sizingModes)}`, `Your limits: ${lower(SOCIAL.followerControls)}`, `From ${SOCIAL.minAllocation}`],
  },
  {
    id: 'pamm',
    cls: 'pc-ink',
    k: 'PAMM FUNDS',
    t: 'Invest in a fund.',
    d: 'Put money in a pooled fund run by a manager. Your share is tracked as units, with a net asset value that starts at 1.00.',
    pts: ['The manager sets the minimum, lock-in and maximum drawdown', 'Set your own stop loss on your investment', 'The manager keeps at least 5% of the fund as own capital'],
  },
  {
    id: 'mam',
    cls: 'pc-yel',
    k: 'MAM',
    t: 'Let a manager trade.',
    d: 'Link your own account to a money manager. They trade; the account and the money stay yours.',
    pts: [`Allocation by ${lower(SOCIAL.mamMethods)}`, 'Trading authority only: no deposits or withdrawals', 'Performance fee up to 90% and management fee up to 10% a year, shown before you accept'],
  },
];

const FAQ = [
  {
    q: 'How are masters chosen?',
    a: `Our team approves every master. They need a verified identity, a live account, at least ${SOCIAL.trackRecordDays} days of track record and at least ${SOCIAL.minMasterEquity} in equity.`,
  },
  {
    q: 'How do fees work?',
    a: `Masters charge a performance fee of ${SOCIAL.perfFee} of profit, only on new highs (a high-water mark), so you never pay twice for the same gain. Fees are settled daily, weekly or monthly, as the master chooses.`,
  },
  {
    q: 'Why is trade history delayed?',
    a: `A master’s public history shows with a ${SOCIAL.historyDelay} delay so nobody can front-run their positions. Your copy account receives trades in real time.`,
  },
  {
    q: 'Can I lose money copying?',
    a: 'Yes. Copying takes the same market risk the master takes, scaled to your size. Past performance does not guarantee future results; use the equity stop and drawdown limits.',
  },
  {
    q: 'Can I become a master?',
    a: 'Yes, from the Client Area. Meet the requirements, set your fee and strategy description, and apply. Kalks keeps 20% of the performance fees you earn.',
  },
];

export default function CopyTradingPage() {
  return (
    <>
      <Hero
        tone="yellow"
        className="hero--pair"
        kicker="COPY TRADING · PAMM · MAM"
        title="Follow a master. Or become one."
        lede="Mirror approved traders with limits you set, invest in a managed fund, or let a manager trade your account. Fees only on new highs."
        actions={
          <>
            <Btn href={REGISTER_HREF} v="red" s={56} arrow>
              Start copying
            </Btn>
            <Btn href="#master" v="ghost" s={56}>
              Become a master
            </Btn>
          </>
        }
        facts="CFD accounts only · pause or stop at any time"
        backdrop={<FigurePair />}
        strip={[
          { v: '50%', l: 'Highest performance fee, on new highs only' },
          { v: `${SOCIAL.trackRecordDays} days`, l: 'Minimum track record for a master' },
          { v: SOCIAL.minAllocation, l: 'Lowest amount to start copying' },
          { v: SOCIAL.sizingModes.length, l: 'Ways to size the trades you copy' },
        ]}
      />

      <Section labelledBy="ways-title">
        <SectionHead id="ways-title" kicker="01 — THREE WAYS IN" title="As hands-on as you like." />
        <div className="grid gap-4 lg:grid-cols-3">
          {WAYS.map((w) => (
            <div key={w.id} id={w.id} className={`pcard ${w.cls} scroll-mt-28`}>
              <span className="k">{w.k}</span>
              <h3>{w.t}</h3>
              <p>{w.d}</p>
              <ul className="mt-6 flex flex-col">
                {w.pts.map((pt) => (
                  <li key={pt} className="border-t border-current/20 py-3 text-[14px] [border-top-color:color-mix(in_srgb,currentColor_18%,transparent)]">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section labelledBy="cs-title">
        <SectionHead id="cs-title" kicker="02 — HOW COPYING WORKS" title="Four steps. Your rules." />
        <Steps
          steps={[
            { t: 'Pick a master', d: 'Compare track records, risk scores from 1 to 10 and fees, all shown up front.' },
            { t: 'Choose sizing', d: 'In proportion to equity, a fixed amount, a multiplier or a fixed lot size.' },
            { t: 'Set your limits', d: 'Equity stop, maximum drawdown, maximum lot size and markets you never want copied.' },
            { t: 'Copying starts', d: 'A copy account opens and mirrors every trade. Pause or stop whenever you like.' },
          ]}
        />
      </Section>

      <Section id="master" labelledBy="m-title">
        <div className="pcard pc-ink !min-h-0 gap-10 lg:!grid lg:grid-cols-2 lg:!p-12">
          <div>
            <span className="k !text-k-yel">03 — FOR TRADERS WITH A RECORD</span>
            <h2 id="m-title" className="d mt-4 max-w-[12ch] text-[clamp(32px,3.4vw,46px)] leading-[0.95]">
              Become a master. Earn on new highs.
            </h2>
            <p className="!max-w-[44ch] text-[#B8AAA5]">
              Publish your strategy, let others copy it or invest in your fund, and earn a performance fee each time your followers
              reach a new high.
            </p>
            <div className="mt-7">
              <Btn href={REGISTER_HREF} v="yel" arrow>
                Apply in the Client Area
              </Btn>
            </div>
          </div>
          <dl className="grid gap-px self-end overflow-hidden rounded-[18px] bg-[rgba(255,255,255,0.08)] sm:grid-cols-2">
            {[
              ['Performance fee', `${SOCIAL.perfFee}, new highs only`],
              ['Track record', `${SOCIAL.trackRecordDays} days minimum`],
              ['Master equity', `${SOCIAL.minMasterEquity} minimum`],
              ['PAMM own capital', 'At least 5% of the fund'],
              ['Approval', 'Verified identity and a live account'],
              ['Platform share', '20% of the fees you earn'],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#0B0809] p-4">
                <dt className="font-mono text-[11.5px] font-semibold text-[#B8AAA5]">{k.toUpperCase()}</dt>
                <dd className="mt-1.5 text-[15px] font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section labelledBy="cfaq-title" className="sec-last">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead id="cfaq-title" kicker="04 — QUESTIONS" title="Copying, answered." />
          <div>
            <Faq items={FAQ} schema />
            <p className="mt-8 max-w-[110ch] text-[12.5px] leading-relaxed text-tx3">
              Past performance is not a reliable indicator of future results. Copy trading, PAMM and MAM accounts trade CFDs and cannot
              trade options.
            </p>
            <RiskNote className="mt-3" />
          </div>
        </div>
      </Section>
    </>
  );
}
