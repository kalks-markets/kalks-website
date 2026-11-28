import type { Metadata } from 'next';
import { PageHero } from '@/components/site/Heroes';
import { Checks, Cta, Head } from '@/components/site/ui';
import { Rise } from '@/components/site/Rise';
import { FactRows, FaqSection, StepCards, Th } from '@/components/site/platforms/bits';
import { RateCard } from '@/components/site/partners/RateCard';
import { IB, IB_AS_OF, IB_GROUPS, IB_LEVELS, usd, usd2 } from '@/content/facts';
import { getPage } from '@/content/pages';
import { REGISTER_HREF } from '@/lib/crm';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Partner plan: every rate, level and rule',
  description: `The full Kalks partner (IB) plan: commission per lot for forex, metals, oil, indices, crypto and stocks and per options contract at all ${IB_LEVELS.length} levels, how to reach each level, ${IB.tiers} tiers (${IB.tierShares}), what counts, and daily USDT payouts from ${IB.minPayout}.`,
  alternates: { canonical: '/partners/plan' },
};

const lv = (k: string) => IB_LEVELS.find((l) => l.key === k)!;
const BRONZE = IB_LEVELS[0];
const SILVER = lv('silver');
const GOLD = lv('gold');
const TOP = IB_LEVELS[IB_LEVELS.length - 1];
const [, T2, T3] = IB.tierPcts;

/** worked examples, computed from the live rates */
const EX_FX = { lots: 5, rate: GOLD.rates['fx-major'] };
const EX_GOLD = { lots: 2, rate: SILVER.rates.metals };
const EX_OPT = { contracts: 10, rate: GOLD.optionsUsd };
const EX_CENT = { centLots: 300, rate: BRONZE.rates['fx-minor'] };
const EX_TIER = { lots: 10, rate: GOLD.rates['fx-major'] };
const tier1 = EX_TIER.lots * EX_TIER.rate;

const EXAMPLES = [
  {
    k: 'Forex',
    t: `${EX_FX.lots} lots of EURUSD at ${GOLD.name}`,
    sum: `${EX_FX.lots} × ${usd(EX_FX.rate)} = ${usd2(EX_FX.lots * EX_FX.rate)}`,
    d: `A direct client opens and closes ${EX_FX.lots} standard lots of EURUSD, a forex major. Each lot pays your level's forex rate once, when the trade closes.`,
  },
  {
    k: 'Gold',
    t: `${EX_GOLD.lots} lots of XAUUSD at ${SILVER.name}`,
    sum: `${EX_GOLD.lots} × ${usd(EX_GOLD.rate)} = ${usd2(EX_GOLD.lots * EX_GOLD.rate)}`,
    d: `Gold is in the metals group, which pays ${usd(SILVER.rates.metals)} a lot at ${SILVER.name} (${usd(BRONZE.rates.metals)} at ${BRONZE.name} up to ${usd(TOP.rates.metals)} at ${TOP.name}).`,
  },
  {
    k: 'Options',
    t: `${EX_OPT.contracts} option contracts at ${GOLD.name}`,
    sum: `${EX_OPT.contracts} × ${usd(EX_OPT.rate)} = ${usd2(EX_OPT.contracts * EX_OPT.rate)}`,
    d: 'Kalks FX Options pay a fixed amount per contract, round turn, whatever the premium. Calls and puts, bought or written, pay the same.',
  },
  {
    k: 'Cent account',
    t: `${EX_CENT.centLots} cent lots of GBPJPY at ${BRONZE.name}`,
    sum: `${EX_CENT.centLots} × ${IB.centLotFactor} = ${EX_CENT.centLots * IB.centLotFactor} lots × ${usd(EX_CENT.rate)} = ${usd2(EX_CENT.centLots * IB.centLotFactor * EX_CENT.rate)}`,
    d: `On a Cent account 1 cent lot counts as ${IB.centLotFactor} of a standard lot; GBPJPY is a forex cross at the forex rate.`,
  },
];

const FAQ = [
  {
    q: 'What is a standard lot, round turn?',
    a: `Commission is paid per standard lot your client trades, counted once for opening and closing the trade, and paid when it closes. A partial close pays for the part closed. Cent lots count as ${IB.centLotFactor} of a standard lot. Options are paid per contract instead.`,
  },
  {
    q: 'Do all account types pay the same?',
    a: 'Yes. Standard, Pro, ECN and VIP accounts pay the full rate card for your level, and Cent accounts pay it on standard-lot equivalents. Options accounts pay your level’s rate per contract. Demo and prop accounts never pay.',
  },
  {
    q: 'Which rate applies when my level changes?',
    a: 'The rate of the level you are on when the trade closes. Levels are checked every day; you move up the day after you meet both targets of a higher level.',
  },
  {
    q: 'Do option contracts count towards my level?',
    a: 'No. Levels count the standard lots your network trades on CFDs. Option contracts earn their own rate but do not add to the lot target.',
  },
  {
    q: 'Is there a CPA or a client rebate?',
    a: `No. The plan pays per lot and per contract only: no one-off CPA per client, and no rebates to clients. You can pass up to ${IB.maxSplitPct}% of what you earn on a sub-partner’s clients to that sub-partner.`,
  },
  {
    q: 'Can the rates change?',
    a: `Rates can change with ${IB.noticeDays} days’ notice. This page shows the plan as of ${IB_AS_OF}; your partner dashboard always shows the rates you are paid.`,
  },
];

export default async function PartnerPlanPage() {
  const page = await getPage('partners-plan');
  return (
    <>
      <PageHero hero={page.hero} compact facts={[`Rates as of ${IB_AS_OF}`, `${IB_LEVELS.length} levels`, `${IB.tiers} tiers`, `Paid daily from ${IB.minPayout}`]} />

      {/* 01 how it works */}
      <section className="s-sec !pt-8" aria-labelledby="hw-title">
        <div className="s-wrap">
          <Head id="hw-title" index="01" eyebrow="How it works" title={<>From sign-up <span className="s-mute">to a daily payout.</span></>} />
          <StepCards
            steps={[
              { t: 'Sign up', d: 'Every Kalks client is a partner. Your link, code and partner dashboard are in the Client Area at once, with no application.' },
              { t: 'Share your link', d: 'Clients who sign up with your link or code stay linked to you for good. Make a campaign link for each channel.' },
              { t: 'Clients trade', d: `Each lot your clients close pays a fixed amount by market and your level; options pay per contract. Sub-partners’ clients pay ${T2}% and ${T3}% more down the tree.` },
              { t: 'Paid daily', d: `Each day’s commission goes to your USDT wallet in the Client Area, from ${IB.minPayout}. Less than that carries over to the next day.` },
            ]}
          />
        </div>
      </section>

      {/* 02 rate card */}
      <section id="rates" className="s-sec s-band scroll-mt-20" aria-labelledby="rc-title">
        <div className="s-wrap">
          <Head
            id="rc-title"
            index="02"
            eyebrow="Rate card"
            title={<>Every market, <span className="s-mute">every level.</span></>}
            lead="US dollars per standard lot, round turn, on trades your direct clients close. The same on every CFD account type. Options: per contract."
          />
          <Rise>
            <RateCard />
          </Rise>
          <p className="mt-5 max-w-[90ch] text-[12.5px] leading-relaxed text-[var(--s-tx3)]">
            Rates as of {IB_AS_OF}. Forex minors and crosses pay the forex major rate. Each market falls into exactly one group; your partner dashboard shows the rate on every trade. Rates can change with {IB.noticeDays} days’ notice.
          </p>
        </div>
      </section>

      {/* 03 levels */}
      <section id="levels" className="s-sec scroll-mt-20" aria-labelledby="lv-title">
        <div className="s-wrap">
          <Head
            id="lv-title"
            index="03"
            eyebrow="Levels"
            title={<>{IB_LEVELS.length} levels. <span className="s-mute">Two targets each.</span></>}
            lead={`Everyone starts at ${BRONZE.name}. A level needs both its targets over the last ${IB.windowDays} days: lots traded by your whole network and active direct clients.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {IB_LEVELS.map((l, i) => (
              <Rise key={l.key} delay={i * 50} className={cn('s-card pad flex flex-col gap-4', i === IB_LEVELS.length - 1 && 'ring-1 ring-[var(--s-orange)]')}>
                <div className="flex items-center gap-3">
                  <span className="size-2.5 rounded-full bg-[var(--s-orange)]" style={{ opacity: 0.3 + i * 0.175 }} aria-hidden />
                  <h3 className="text-[20px] font-[500] tracking-[-0.025em] text-white">{l.name}</h3>
                </div>
                <dl className="grid grid-cols-2 gap-3 border-y border-[var(--s-line)] py-4">
                  <div>
                    <dt className="text-[11.5px] uppercase tracking-[0.09em] text-[var(--s-tx3)]">Network lots</dt>
                    <dd className="s-num mt-1 text-[22px] text-white">{l.minLots.toLocaleString('en-US')}</dd>
                  </div>
                  <div>
                    <dt className="text-[11.5px] uppercase tracking-[0.09em] text-[var(--s-tx3)]">Active clients</dt>
                    <dd className="s-num mt-1 text-[22px] text-white">{l.minClients}</dd>
                  </div>
                </dl>
                <Checks items={[...l.perks]} className="!gap-2 [&_li]:text-[13.5px]" />
              </Rise>
            ))}
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <FactRows
              title="How levels move"
              rows={[
                ['Window', `The last ${IB.windowDays} days, up to the end of yesterday`],
                ['Network lots', `Standard lots closed by clients on all ${IB.tiers} tiers of your network, on trades that qualify`],
                ['Active clients', 'Your direct clients with at least one qualifying trade in the window'],
                ['Options', 'Option contracts earn their own rate but do not count as lots'],
              ]}
            />
            <FactRows
              title="Up and down"
              rows={[
                ['Moving up', 'Checked every day: the day after you meet both targets you move to the highest level you meet'],
                ['Moving down', 'On the 1st of each month, if the last 90 days miss your level’s targets, you move down one level'],
                ['New rates', 'Apply to trades that close after the change'],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 04 tiers */}
      <section id="tiers" className="s-sec s-band scroll-mt-20" aria-labelledby="tr-title">
        <div className="s-wrap">
          <Head
            id="tr-title"
            index="04"
            eyebrow="Tiers"
            title={<>{IB.tiers} tiers deep: <span className="s-mute">{IB.tierShares}.</span></>}
            lead={`Your rate on your direct clients. When a partner you brought in earns on their clients, you earn ${T2}% of that, and the partner above you ${T3}%.`}
          />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <Rise className="s-card overflow-hidden">
              <table className="w-full border-collapse">
                <caption className="sr-only">Tier example</caption>
                <thead>
                  <tr className="border-b border-[var(--s-line)]">
                    <Th>Tier</Th>
                    <Th>Who</Th>
                    <Th right>Share</Th>
                    <Th right>Earns</Th>
                  </tr>
                </thead>
                <tbody className="text-[14.5px]">
                  {[
                    ['1', `The client’s partner (${GOLD.name})`, `${IB.tierPcts[0]}% of own rate`, tier1],
                    ['2', 'The partner who brought them in', `${T2}% of tier 1`, (tier1 * T2) / 100],
                    ['3', 'One level further up', `${T3}% of tier 1`, (tier1 * T3) / 100],
                  ].map(([t, who, share, v]) => (
                    <tr key={t as string} className="border-b border-[var(--s-line)] last:border-0">
                      <td className="px-5 py-3.5 font-mono text-[var(--s-orange2)]">{t}</td>
                      <td className="px-5 py-3.5 text-white">{who}</td>
                      <td className="px-5 py-3.5 text-end text-[var(--s-tx2)]">{share}</td>
                      <td className="px-5 py-3.5 text-end font-mono text-white [font-variant-numeric:tabular-nums]">{usd2(v as number)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Rise>
            <Rise delay={80} className="s-card pad flex flex-col gap-4">
              <h3 className="text-[18px] font-semibold tracking-[-0.015em] text-white">The example</h3>
              <p className="text-[14.5px] leading-relaxed text-[var(--s-tx2)]">
                A client trades {EX_TIER.lots} lots of EURUSD. Their partner is at {GOLD.name}: {EX_TIER.lots} × {usd(EX_TIER.rate)} = {usd2(tier1)}. The partner above earns {T2}% of {usd2(tier1)} = {usd2((tier1 * T2) / 100)}, and the next one up {T3}% = {usd2((tier1 * T3) / 100)}, whatever their own levels.
              </p>
              <p className="text-[14.5px] leading-relaxed text-[var(--s-tx2)]">
                Tiers 2 and 3 are paid on top: the client’s partner keeps the full {usd2(tier1)}. A partner can pass up to {IB.maxSplitPct}% of their tier share to the sub-partner directly below them, from the dashboard.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      {/* 05 accounts */}
      <section id="accounts" className="s-sec scroll-mt-20" aria-labelledby="ac-title">
        <div className="s-wrap">
          <Head id="ac-title" index="05" eyebrow="Account types" title={<>One rate card <span className="s-mute">on every account.</span></>} />
          <div className="grid gap-4 lg:grid-cols-2">
            <FactRows
              title="How each account pays"
              rows={[
                ['Standard, Pro, ECN, VIP', '100% of your level’s rate card, per standard lot'],
                ['Cent', `100% of the rate card on standard-lot equivalents: 1 cent lot = ${IB.centLotFactor} lot`],
                ['Options Standard, Options Pro', 'Your level’s options rate per contract (not scaled on any account)'],
                ['Demo, prop challenges and funded accounts', 'Never pay commission'],
              ]}
            />
            <FactRows
              title="Payouts"
              rows={[
                ['When', 'Daily: each UTC day’s commission is batched after midnight UTC'],
                ['Where', 'Your USDT wallet in the Client Area'],
                ['Minimum', `${IB.minPayout}; a smaller balance carries over and is added to the next day`],
                ['Reversals', 'If a trade is reopened or reversed, its commission is reversed too'],
                ['CPA and rebates', 'None: commission per lot and per contract only'],
              ]}
            />
          </div>
        </div>
      </section>

      {/* 06 what counts */}
      <section id="counts" className="s-sec s-band scroll-mt-20" aria-labelledby="wc-title">
        <div className="s-wrap">
          <Head id="wc-title" index="06" eyebrow="What counts" title={<>What earns, <span className="s-mute">and what does not.</span></>} />
          <div className="grid gap-4 lg:grid-cols-2">
            <Rise className="s-card pad">
              <h3 className="mb-5 text-[18px] font-semibold tracking-[-0.015em] text-white">Counts</h3>
              <Checks
                items={[
                  'Closed trades on your clients’ live accounts',
                  `Trades held open for at least ${IB.minHoldMinutes} minutes`,
                  `Every market in the rate card: forex, metals, oil and energies, indices, crypto and stocks, and Kalks FX Options`,
                  'Copy trading, PAMM and MAM: the lots on your client’s own account, counted once',
                  'Partial closes, for the volume closed',
                ]}
              />
            </Rise>
            <Rise delay={80} className="s-card pad">
              <h3 className="mb-5 text-[18px] font-semibold tracking-[-0.015em] text-white">Does not count</h3>
              <ul className="flex flex-col gap-3 text-[15px] leading-relaxed text-[var(--s-tx2)]">
                {[
                  'Demo accounts, prop challenges and funded accounts',
                  `Trades closed in under ${IB.minHoldMinutes} minutes`,
                  'Trades that are reopened, reversed or corrected',
                  'Your own accounts, and clients who share your IP address, device or identity (held until we review them)',
                  'Mirrored trades between clients to generate volume (flagged and held)',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-[9px] size-1.5 flex-none rounded-full bg-[var(--s-tx3)]" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>
      </section>

      {/* 07 examples */}
      <section id="examples" className="s-sec scroll-mt-20" aria-labelledby="ex-title">
        <div className="s-wrap">
          <Head id="ex-title" index="07" eyebrow="Examples" title={<>The arithmetic, <span className="s-mute">with real rates.</span></>} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXAMPLES.map((e, i) => (
              <Rise key={e.k} delay={i * 50} className="s-card pad flex flex-col gap-3">
                <span className="s-eyebrow">{e.k}</span>
                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-white">{e.t}</h3>
                <p className="font-mono text-[15px] text-[var(--s-orange2)] [font-variant-numeric:tabular-nums]">{e.sum}</p>
                <p className="text-[14px] leading-relaxed text-[var(--s-tx2)]">{e.d}</p>
              </Rise>
            ))}
          </div>
          <p className="mt-5 max-w-[90ch] text-[12.5px] leading-relaxed text-[var(--s-tx3)]">
            Groups: {IB_GROUPS.map((g) => g.name).join(', ')}, plus Kalks FX Options per contract. Examples use the rates as of {IB_AS_OF}.
          </p>
        </div>
      </section>

      <FaqSection top index="08" title={<>The plan, <span className="s-mute">answered.</span></>} items={page.faq(FAQ)} />

      <Cta
        title={<>Start earning <span className="text-white/70">this week.</span></>}
        sub={`Sign up and your partner link is ready at once. Up to ${usd(TOP.rates['fx-major'])} per forex lot, ${IB.tiers} tiers deep, paid daily from ${IB.minPayout}.`}
        primary={{ href: REGISTER_HREF, label: 'Become a partner' }}
        secondary={{ href: '/partners', label: 'Partners overview' }}
      />
    </>
  );
}
