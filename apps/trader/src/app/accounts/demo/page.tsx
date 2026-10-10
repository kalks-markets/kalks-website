import type { Metadata } from 'next';
import { PageHero, HeroGlass } from '@/components/site/Heroes';
import { BentoCard, Btn, Cta, Faq, Head, StatStrip, TextLink, type BentoTone } from '@/components/site/ui';
import type { Pin } from '@/components/site/Shot';
import { PinTour } from '@/components/site/markets/PinTour';
import { Rise } from '@/components/site/Rise';
import { FactTable, FaqSchema, LinkCards, MiniHead } from '@/components/site/markets/bits';
import { ACADEMY, ACCOUNTS, DEMO, FUNDING, INSTRUMENTS, OPTIONS_ACCOUNTS } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES } from '@/content/heroes';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Demo account: practise free on live prices',
  description: `A free Kalks demo account starts with ${DEMO.defaultBalance} in virtual funds, trades all ${INSTRUMENTS.total.toLocaleString('en-US')} markets on live prices and refills up to ${DEMO.refillsPerDay} times a day.`,
  alternates: { canonical: '/accounts/demo' },
};

const TOTAL = INSTRUMENTS.total.toLocaleString('en-US');

const REHEARSAL: { t: string; d: string; tone: BentoTone }[] = [
  { t: 'Live prices', d: 'Quotes come from the same market-data feed as live accounts.', tone: 'orange' },
  { t: 'Every market', d: `All ${TOTAL} markets, the ${INSTRUMENTS.demoOnly.toLocaleString('en-US')} demo-only stocks included.`, tone: 'cream' },
  { t: 'CFDs and options', d: `Practise CFDs on a demo CFD account and options on a demo ${OPTIONS_ACCOUNTS[0].name} account.`, tone: 'glass' },
  { t: 'Your balance, your choice', d: `Pick any starting balance from ${DEMO.balanceRange}.`, tone: 'glass' },
  { t: 'Start again', d: `Refill your balance up to ${DEMO.refillsPerDay} times a day.`, tone: 'cream' },
  { t: 'Same tools', d: 'Kalks Trader, the option chain, quick trade and the strategy builder, in your browser or on Android.', tone: 'glass' },
];

/** a demo session in Kalks Trader, part by part (pins in % of the screenshot) */
const DEMO_PINS: Pin[] = [
  { x: 24, y: 2.6, title: 'CFDs and options', text: `Practise CFDs on a demo CFD account and options on a demo ${OPTIONS_ACCOUNTS[0].name} account, side by side.` },
  { x: 62.6, y: 2.6, title: 'Marked DEMO', text: 'The account number carries a DEMO badge, so you always know the money is virtual.' },
  { x: 82.4, y: 2.6, title: 'Your demo balance', text: `Start from ${DEMO.defaultBalance}, or pick any balance from ${DEMO.balanceRange}.` },
  { x: 86, y: 2.6, title: 'Top up demo', text: `Refill the balance up to ${DEMO.refillsPerDay} times a day and start again.` },
  { x: 47.5, y: 8.4, title: 'The same tools', text: 'Charts, one-click trading, the order ticket, stops and targets: the Kalks Trader you will use live.' },
  { x: 85.7, y: 16.6, title: 'Every market', text: `All ${TOTAL} markets trade on demo, stocks included.` },
  { x: 25, y: 96.8, title: 'Real account maths', text: 'Balance, equity, floating P&L, margin and margin level move just as they would on a live account.' },
];

const FAQ_PICK = ['Is the demo account free?', 'How do I open an account?', 'Can one account trade CFDs and options?', 'Which accounts are there?'];
const FAQ = FAQ_PICK.map((q) => FAQ_GROUPS.flatMap((g) => g.items).find((i) => i.q === q)).filter(Boolean) as { q: string; a: string }[];

export default function DemoPage() {
  return (
    <>
      <PageHero
        photo="accounts"
        compact
        eyebrow="Demo account"
        title={
          <>
            Rehearse on live prices. <span className="s-mute">Risk nothing.</span>
          </>
        }
        lead={`A free demo account with ${DEMO.defaultBalance} of virtual money, every market on real-time prices, and the same Kalks Trader you will use live.`}
        actions={
          <>
            <Btn href={DEMO_HREF}>Start a free demo</Btn>
            <Btn href={REGISTER_HREF} variant="ghost" icon={false}>
              Open a live account
            </Btn>
          </>
        }
        facts={[`${DEMO.defaultBalance} virtual funds`, `${TOTAL} markets`, `Refills ${DEMO.refillsPerDay}× a day`]}
        aside={
          <>
            <HeroGlass>
              <div className="s-num text-[44px]">{DEMO.defaultBalance}</div>
              <div className="mt-2 text-[13.5px] text-white/85">Virtual funds to start</div>
            </HeroGlass>
            <HeroGlass>
              <div className="s-num text-[44px]">$0</div>
              <div className="mt-2 text-[13.5px] text-white/85">What it costs</div>
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
                <span className="s-eyebrow">The demo</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Free', 'Live prices', 'CFDs and options'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              Everything on a demo account behaves the way it does on a live one, <span className="s-mute">except that the money is not real.</span>
            </h2>
            <div className="lg:col-span-2 [&_.s-num]:!text-[clamp(40px,4.6vw,68px)]">
              <StatStrip
                items={[
                  { v: DEMO.defaultBalance, l: 'Virtual funds to start', sub: `Any balance from ${DEMO.balanceRange}` },
                  { v: TOTAL, l: 'Markets on demo', sub: 'Stocks included' },
                  { v: `${DEMO.refillsPerDay}×`, l: 'Refills a day', sub: 'Top up and start again' },
                  { v: '$0', l: 'Cost', sub: 'Free, with no deposit' },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 a full rehearsal */}
      <section className="s-sec !pt-4" aria-labelledby="r-title">
        <div className="s-wrap">
          <Head
            id="r-title"
            index="02"
            eyebrow="A full rehearsal"
            title={
              <>
                Practise the way <span className="s-mute">you will trade.</span>
              </>
            }
            lead="Live prices, every market, CFDs and options, and the same terminal."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REHEARSAL.map((r, i) => (
              <BentoCard key={r.t} tone={r.tone} title={r.t} text={r.d} delay={(i % 3) * 60} kicker={String(i + 1).padStart(2, '0')} className="!min-h-[220px]" />
            ))}
          </div>
        </div>
      </section>

      {/* 03 in Kalks Trader */}
      <section className="s-sec s-band" aria-labelledby="t-title">
        <div className="s-wrap">
          <Head
            id="t-title"
            index="03"
            eyebrow="In Kalks Trader"
            title={
              <>
                The real terminal, <span className="s-mute">on demo money.</span>
              </>
            }
            lead="A demo session in Kalks Trader. Point at a number to see each part."
            action={<Btn href="/platforms/trader">Explore Kalks Trader</Btn>}
          />
          <PinTour shot="traderWorkspace" pins={DEMO_PINS} layout="under" scrollMin="min-w-[880px]" />
        </div>
      </section>

      {/* 04 the details */}
      <section className="s-sec" aria-labelledby="d-title">
        <div className="s-wrap">
          <Head
            id="d-title"
            index="04"
            eyebrow="The details"
            title={
              <>
                Demo now, <span className="s-mute">live when you’re ready.</span>
              </>
            }
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <Rise>
              <FactTable
                title="Demo account"
                rows={[
                  ['Starting balance', DEMO.defaultBalance],
                  ['Balance range', DEMO.balanceRange],
                  ['Refills', `Up to ${DEMO.refillsPerDay} a day`],
                  ['Markets', `All ${TOTAL}`],
                  ['Cost', 'Free'],
                ]}
              />
            </Rise>
            <Rise delay={100}>
              <FactTable
                title="When you go live"
                rows={[
                  ['Lowest deposit', `${ACCOUNTS[0].minDeposit} on Standard or Cent`],
                  ['Funding', 'USDT on TRON or BNB Chain'],
                  ['Accounts', 'Five CFD accounts and an Options account'],
                  ['Demo stays', 'Keep practising alongside your live accounts'],
                ]}
              />
            </Rise>
          </div>
        </div>
      </section>

      {/* 05 related */}
      <section className="s-sec s-band" aria-labelledby="m-title">
        <div className="s-wrap">
          <Head
            id="m-title"
            index="05"
            eyebrow="Next steps"
            title={
              <>
                After <span className="s-mute">the demo.</span>
              </>
            }
          />
          <LinkCards
            links={[
              { href: '/accounts', t: 'Live accounts', d: 'Five CFD accounts and an Options account.' },
              { href: '/accounts/funding', t: 'Funding', d: `USDT in, ${FUNDING.creditTime}.` },
              { href: '/academy', t: 'Academy', d: `${ACADEMY.lessons} lessons to learn alongside the demo.` },
              { href: '/platforms/trader', t: 'Kalks Trader', d: 'The screen you will practise on.' },
            ]}
          />
        </div>
      </section>

      {/* 06 questions */}
      <section className="s-sec" aria-labelledby="f-title">
        <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Rise className="flex flex-col items-start gap-6">
            <MiniHead
              index="06"
              eyebrow="Questions"
              id="f-title"
              title={
                <>
                  Demo, <span className="s-mute">answered.</span>
                </>
              }
            />
            <TextLink href="/faq">Every question, by topic</TextLink>
          </Rise>
          <Rise delay={100}>
            <Faq items={FAQ} />
            <FaqSchema items={FAQ} />
          </Rise>
        </div>
      </section>

      <Cta
        title={
          <>
            Your first trade is <span className="text-white/70">a practice one.</span>
          </>
        }
        sub="Register in the Client Area and open a demo in a couple of minutes."
        primary={{ href: DEMO_HREF, label: 'Start a free demo' }}
        secondary={{ href: '/accounts', label: 'Compare live accounts' }}
        facts={[`${DEMO.defaultBalance} virtual funds`, `${TOTAL} markets`, `Refills ${DEMO.refillsPerDay}× a day`]}
        image={HEROES.accounts}
      />
    </>
  );
}
