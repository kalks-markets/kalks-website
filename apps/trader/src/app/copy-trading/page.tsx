import type { Metadata } from 'next';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { Btn, Cta, Head, StatStrip } from '@/components/site/ui';
import { Shot, type Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { FactRows, FaqSection, MiniHead, StepCards } from '@/components/site/platforms/bits';
import { PinTour } from '@/components/site/platforms/ShotTours';
import { PSHOTS } from '@/components/site/platforms/shots';
import { RiskNote } from '@/components/ui/RiskNote';
import { SOCIAL } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES } from '@/content/heroes';
import { REGISTER_HREF } from '@/lib/crm';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Copy trading, PAMM and MAM',
  description:
    'Follow approved masters with limits you set, invest in PAMM funds, or link your account to a MAM manager. Or become a master and earn a performance fee on new highs.',
  alternates: { canonical: '/copy-trading' },
};

const lower = (xs: readonly string[]) => xs.join(', ').toLowerCase();
/** "up to 50%" → "50%" */
const TOP_FEE = SOCIAL.perfFee.replace(/^up to /, '');

const WAYS = [
  {
    id: 'copy',
    tone: 's-orange',
    k: 'Copy trading',
    t: 'Mirror a master.',
    d: 'A copy account repeats every trade of the master you follow: opens, partial closes, stop loss and take profit changes, pending orders.',
    pts: [`Sizing: ${lower(SOCIAL.sizingModes)}`, `Your limits: ${lower(SOCIAL.followerControls)}`, `From ${SOCIAL.minAllocation}`],
  },
  {
    id: 'pamm',
    tone: 's-cream',
    k: 'PAMM funds',
    t: 'Invest in a fund.',
    d: 'Put money in a pooled fund run by a manager. Your share is tracked as units, with a net asset value that starts at 1.00.',
    pts: ['The manager sets the minimum, lock-in and maximum drawdown', 'Set your own stop loss on your investment', 'The manager keeps at least 5% of the fund as own capital'],
  },
  {
    id: 'mam',
    tone: 's-card',
    k: 'MAM',
    t: 'Let a manager trade.',
    d: 'Link your own account to a money manager. They trade; the account and the money stay yours.',
    pts: [`Allocation by ${lower(SOCIAL.mamMethods)}`, 'Trading authority only: no deposits or withdrawals', 'Performance fee up to 90% and management fee up to 10% a year, shown before you accept'],
  },
];

/** pins in % of each screenshot */
const BOARD_PINS: Pin[] = [
  { x: 28, y: 11.3, title: 'Sort and search', text: 'Sort by return, lowest drawdown, assets under management, followers or age, or search by nickname or strategy.' },
  { x: 37, y: 11.3, title: 'Copy or PAMM', text: 'Show masters you can copy, PAMM funds, or both.' },
  { x: 51, y: 11.3, title: 'Risk', text: 'Filter by the risk score: 1 to 3, 4 to 6, or 7 to 10.' },
  { x: 65, y: 11.3, title: 'Track record', text: 'Filter by how long a master has traded, with more filters beside it.' },
  { x: 27.5, y: 33.5, title: 'House strategies', text: 'Strategies Kalks runs on its own live accounts are labelled, so you always know who is behind a card.' },
  { x: 3, y: 42, title: 'Return, drawdown, followers', text: "Return after the master's trading costs and before your fee, the deepest drawdown, and how many people copy." },
  { x: 31.5, y: 42, title: 'Risk score', text: 'From 1 to 10, worked out by the platform, not the master.' },
  { x: 3, y: 52.5, title: 'Copy', text: 'Choose how trades are sized and set your limits. A copy account opens, funded from your wallet.' },
  { x: 79.5, y: 94.8, title: 'Invest', text: 'Masters who also run a PAMM fund show Invest beside Copy.' },
];

const PAMM_PINS: Pin[] = [
  { x: 13.2, y: 35.5, title: 'Units and NAV', text: 'You own units of the fund; their value is units × NAV, which starts at 1.00.' },
  { x: 34.4, y: 35.5, title: 'Rollover queue', text: 'Invest and redeem requests execute at the next rollover.' },
  { x: 54.3, y: 35.5, title: 'High-water mark', text: 'The performance fee is only charged on profit above your previous peak.' },
  { x: 73.8, y: 35.5, title: 'Your stop loss', text: 'You are redeemed if your value drops by the percentage you choose.' },
  { x: 92.6, y: 35.5, title: 'Drawdown freeze', text: 'Trading stops if the fund breaches the maximum drawdown its manager set.' },
  { x: 30.3, y: 58.4, title: 'Each fund as a card', text: 'NAV per unit, return, assets and drawdown, with the manager behind it.' },
  { x: 18.1, y: 89.5, title: 'Terms up front', text: 'The rollover schedule, minimum, lock-in and drawdown freeze, before you invest.' },
  { x: 34.5, y: 94.7, title: 'Invest', text: 'From your USDT wallet; units are issued at the next rollover NAV.' },
];

const MASTER_PINS: Pin[] = [
  { x: 6.4, y: 8.8, title: 'Programme', text: 'Copy trading, a PAMM fund, or both, with one strategy and one track record.' },
  { x: 6.4, y: 49.3, title: 'Your fee', text: `A performance fee ${SOCIAL.perfFee}, charged only above the high-water mark.` },
  { x: 41, y: 65.3, title: 'A worked example', text: 'Move the slider and the example shows what a follower pays and what you keep.' },
  { x: 29.5, y: 86, title: 'Settlement', text: 'Copy fees settle daily, weekly or monthly, at the server-day rollover.' },
  { x: 93.6, y: 86, title: 'Minimum allocation', text: `What a follower needs to start, at least ${SOCIAL.minAllocation}.` },
];

const ALL = FAQ_GROUPS.find((g) => g.id === 'copy')!.items;
const pick = (q: string) => ALL.find((i) => i.q === q)!;
const FAQ = [
  pick('How does copy trading work?'),
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
  pick('Can I lose money copying?'),
  {
    q: 'Can I become a master?',
    a: 'Yes, from the Client Area. Meet the requirements, set your fee and strategy description, and apply. Kalks keeps 20% of the performance fees you earn.',
  },
];

export default function CopyTradingPage() {
  return (
    <>
      <PageHero
        photo="copy"
        eyebrow="Copy trading · PAMM · MAM"
        title={
          <>
            Trade alongside <span className="s-mute">someone who has done it.</span>
          </>
        }
        lead="Mirror approved traders with limits you set, invest in a managed fund, or let a manager trade your account. Fees only on new highs."
        actions={
          <>
            <Btn href={REGISTER_HREF}>Start copying</Btn>
            <Btn href="#master" variant="ghost" icon={false}>
              Become a master
            </Btn>
          </>
        }
        facts={[`Performance fee ${SOCIAL.perfFee}`, 'On new highs only', `From ${SOCIAL.minAllocation}`]}
        aside={
          <>
            <HeroGlass>
              <div className="s-num text-[52px] text-white">{SOCIAL.minAllocation}</div>
              <p className="mt-2 text-[14px] text-white/85">The lowest amount to start copying</p>
            </HeroGlass>
            <HeroGlass>
              <div className="s-num text-[52px] text-white">{SOCIAL.trackRecordDays} days</div>
              <p className="mt-2 text-[14px] text-white/85">Minimum track record before a master is approved</p>
            </HeroGlass>
          </>
        }
      />

      {/* 01 in numbers */}
      <section className="s-sec" aria-labelledby="n-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">Social trading</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Copy', 'PAMM', 'MAM'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              Follow traders our team has approved. <span className="s-mute">You choose the size and the limits, you can pause or stop at any time, and the fee is only charged when your account reaches a new high.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: TOP_FEE, l: 'Highest performance fee', sub: 'On new highs only' },
                  { v: SOCIAL.trackRecordDays, l: 'Days of track record', sub: 'Before a master is approved' },
                  { v: SOCIAL.minAllocation, l: 'To start copying', sub: 'From your USDT wallet' },
                  { v: SOCIAL.sizingModes.length, l: 'Ways to size', sub: lower(SOCIAL.sizingModes) },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 three ways in */}
      <section className="s-sec !pt-4" aria-labelledby="ways-title">
        <div className="s-wrap">
          <Head
            id="ways-title"
            index="02"
            eyebrow="Three ways in"
            title={
              <>
                As hands-on <span className="s-hot">as you like.</span>
              </>
            }
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {WAYS.map((w, i) => {
              const muted = w.tone === 's-cream' ? 'text-[var(--s-cream-tx2)]' : w.tone === 's-orange' ? 'text-white/85' : 'text-[var(--s-tx2)]';
              const line = w.tone === 's-cream' ? 'border-[rgba(26,20,16,0.12)]' : w.tone === 's-orange' ? 'border-white/25' : 'border-[var(--s-line)]';
              return (
                <Rise key={w.id} delay={i * 70} className="h-full">
                  <div id={w.id} className={cn('s-bento-card h-full scroll-mt-28', w.tone)}>
                    <div className={cn('mb-3 text-[12.5px] font-semibold uppercase tracking-[0.08em]', w.tone === 's-cream' ? 'text-[var(--s-orange)]' : w.tone === 's-orange' ? 'text-white/80' : 'text-[var(--s-orange2)]')}>{w.k}</div>
                    <h3 className="text-[clamp(28px,2.6vw,38px)] font-[500] leading-[1.02] tracking-[-0.035em]">{w.t}</h3>
                    <p className={cn('mt-4 text-[15px] leading-relaxed', muted)}>{w.d}</p>
                    <ul className="mt-auto pt-8">
                      {w.pts.map((pt) => (
                        <li key={pt} className={cn('border-t py-3 text-[14px] leading-relaxed', line)}>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Rise>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 the leaderboard */}
      <section className="s-sec s-band" aria-labelledby="lb-title">
        <div className="s-wrap">
          <Head
            id="lb-title"
            index="03"
            eyebrow="In the Client Area"
            title={
              <>
                Pick a master <span className="s-mute">on the numbers.</span>
              </>
            }
            lead="The leaderboard of approved masters, with returns, drawdown and a risk score for each. Point at a number to see each part."
          />
          <PinTour shot={PSHOTS.copyLeaderboard} pins={BOARD_PINS} layout="under" scrollMin="min-w-[680px]" />
        </div>
      </section>

      {/* 04 how copying works */}
      <section className="s-sec" aria-labelledby="cs-title">
        <div className="s-wrap">
          <Head
            id="cs-title"
            index="04"
            eyebrow="How copying works"
            title={
              <>
                Four steps. <span className="s-mute">Your rules.</span>
              </>
            }
          />
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <StepCards
              cols="sm:grid-cols-2"
              steps={[
                { t: 'Pick a master', d: 'Compare track records, risk scores from 1 to 10 and fees, all shown up front.' },
                { t: 'Choose sizing', d: 'In proportion to equity, a fixed amount, a multiplier or a fixed lot size.' },
                { t: 'Set your limits', d: 'Equity stop, maximum drawdown, maximum lot size and markets you never want copied.' },
                { t: 'Copying starts', d: 'A copy account opens and mirrors every trade. Pause or stop whenever you like.' },
              ]}
            />
            <Rise delay={120}>
              <Shot shot={PSHOTS.copyRules} />
            </Rise>
          </div>
        </div>
      </section>

      {/* 05 PAMM */}
      <section className="s-sec s-band" aria-labelledby="pm-title">
        <div className="s-wrap">
          <Head
            id="pm-title"
            index="05"
            eyebrow="PAMM funds"
            title={
              <>
                Own units <span className="s-mute">of a managed fund.</span>
              </>
            }
            lead="Pooled accounts run by approved masters. You buy units at the next rollover NAV and redeem them the same way."
          />
          <PinTour shot="caPamm" pins={PAMM_PINS} layout="under" legendCols="sm:grid-cols-2 lg:grid-cols-4" scrollMin="min-w-[680px]" />
        </div>
      </section>

      {/* 06 MAM */}
      <section className="s-sec" aria-labelledby="mam-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <MiniHead
              index="06"
              eyebrow="MAM"
              id="mam-title"
              title={
                <>
                  Let a manager <span className="s-mute">trade your account.</span>
                </>
              }
              lead="Link your own account to a money manager's programme. Every trade they open is allocated across the linked accounts; the account and the money stay yours."
            />
            <FactRows
              className="!border-0 !bg-none !p-0"
              rows={[
                ['Allocation', lower(SOCIAL.mamMethods).replace(/^./, (c) => c.toUpperCase())],
                ['Authority', 'Trading only: no deposits or withdrawals'],
                ['Fees', 'Performance fee up to 90% and management fee up to 10% a year, shown before you accept'],
                ['Who runs it', 'Approved masters only: identity verified, a live track record and our review'],
              ]}
            />
          </Rise>
        </div>
      </section>

      {/* 07 become a master */}
      <section id="master" className="s-sec s-band scroll-mt-20" aria-labelledby="m-title">
        <div className="s-wrap">
          <Head
            id="m-title"
            index="07"
            eyebrow="For traders with a record"
            title={
              <>
                Become a master. <span className="s-hot">Earn on new highs.</span>
              </>
            }
            lead="Publish your strategy, let others copy it or invest in your fund, and earn a performance fee each time your followers reach a new high."
            action={<Btn href={REGISTER_HREF}>Apply in the Client Area</Btn>}
          />
          <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <Rise>
              <FactRows
                title="Requirements and terms"
                rows={[
                  ['Performance fee', `${SOCIAL.perfFee}, new highs only`],
                  ['Track record', `${SOCIAL.trackRecordDays} days minimum`],
                  ['Master equity', `${SOCIAL.minMasterEquity} minimum`],
                  ['PAMM own capital', 'At least 5% of the fund'],
                  ['Approval', 'Verified identity and a live account'],
                  ['Platform share', '20% of the fees you earn'],
                ]}
              />
            </Rise>
            <PinTour shot={PSHOTS.copyMaster} pins={MASTER_PINS} layout="card" scrollMin="min-w-[520px]" />
          </div>
        </div>
      </section>

      <FaqSection
        top
        index="08"
        title={
          <>
            Copying, <span className="s-mute">answered.</span>
          </>
        }
        items={FAQ}
        note={
          <>
            <p className="max-w-[110ch] text-[12.5px] leading-relaxed text-[var(--s-tx3)]">Past performance is not a reliable indicator of future results. Copy trading, PAMM and MAM accounts trade CFDs and cannot trade options.</p>
            <RiskNote className="mt-3" />
          </>
        }
      />

      <Cta
        title={
          <>
            Start copying <span className="text-white/70">today.</span>
          </>
        }
        sub={`Register, fund your USDT wallet and follow a master from ${SOCIAL.minAllocation}, with your own limits from the first trade.`}
        primary={{ href: REGISTER_HREF, label: 'Start copying' }}
        secondary={{ href: '#master', label: 'Become a master' }}
        facts={[`Fee ${SOCIAL.perfFee}, new highs only`, `${SOCIAL.trackRecordDays}-day track record`, `${SOCIAL.historyDelay} history delay`]}
        image={HEROES.copy}
      />
    </>
  );
}
