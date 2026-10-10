import type { Metadata } from 'next';
import { PageHero, HeroGlass } from '@/components/site/Heroes';
import { Btn, Checks, Cta, Faq, Head, TextLink } from '@/components/site/ui';
import { Shot, type Pin } from '@/components/site/Shot';
import { PinTour } from '@/components/site/markets/PinTour';
import { Rise } from '@/components/site/Rise';
import { FaqSchema, MiniHead, StepCards } from '@/components/site/markets/bits';
import { RiskNote } from '@/components/ui/RiskNote';
import { ACCOUNTS, DEMO, FUNDING, LEVERAGE, OPTIONS_ACCOUNTS, type AccountType } from '@/content/facts';
import { HEROES } from '@/content/heroes';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Accounts: five CFD accounts, an Options account and free demo',
  description:
    'Compare Kalks accounts: Standard, Pro, ECN, Cent and VIP for CFDs, from $10 with leverage up to 1:1000, and Options Standard for calls and puts. One USDT wallet funds them all. Free demo with $10,000.',
  alternates: { canonical: '/accounts' },
};

const ROWS: [string, (a: AccountType) => string][] = [
  ['Account currency', (a) => a.currency],
  ['Minimum deposit', (a) => a.minDeposit],
  ['Leverage', (a) => a.leverageOptions],
  ['Pricing', (a) => a.pricing],
  ['Spread', (a) => a.spread],
  ['Commission', (a) => a.commission],
  ['Margin call / stop out', (a) => `${a.marginCall} / ${a.stopOut}`],
  ['Position mode', (a) => a.mode],
  ['Negative balance protection', () => 'Yes'],
  ['Best for', (a) => a.bestFor],
];

/** card colours for the five CFD accounts (Home's bento: one orange, cream and dark glass) */
const TONE: Record<string, 'orange' | 'cream' | 'glass'> = { standard: 'orange', pro: 'cream', ecn: 'glass', cent: 'glass', vip: 'cream' };

/** the accounts block on the Client Area home, part by part (pins in % of the screenshot) */
const CA_PINS: Pin[] = [
  { x: 2.7, y: 11.1, title: 'Shortcuts', text: 'Deposit, withdraw, transfer, open an account, Kalks Trader, markets, options, copy trading and more, one tap each.' },
  { x: 86, y: 6.6, title: 'Open another account', text: 'CFD or Options, live or demo, from the same screen.' },
  { x: 91.6, y: 18.7, title: 'Live or demo', text: 'Every card says which kind of account it is.' },
  { x: 57.6, y: 41.9, title: 'Your account as a card', text: 'Login number, equity, free margin, leverage, account type and mode, and the balance.' },
  { x: 81.4, y: 74.5, title: 'Swipe between accounts', text: 'Each live and demo account is a card of its own.' },
  { x: 76.6, y: 85.4, title: 'Trade or fund', text: 'Trade opens Kalks Trader on the account; Fund account moves money in from your wallet.' },
];

const FAQ = [
  {
    q: 'Can one account trade CFDs and options?',
    a: 'No. Each account trades one product: a CFD account trades CFDs, an Options account trades options. Open one of each in the Client Area; one USDT wallet funds both, and moving money between them is instant and free.',
  },
  {
    q: 'How many accounts can I open?',
    a: 'Several live and demo accounts at once, up to five of each account type, and you can move money between them and your wallet instantly.',
  },
  {
    q: 'What is the difference between hedging and netting?',
    a: 'In hedging mode you can hold buy and sell positions on the same market at once, each with its own stop loss and take profit. In netting mode each market has one position; new trades add to it or reduce it. Pro accounts come in both modes.',
  },
  {
    q: 'What is a Cent account?',
    a: 'Its balance is shown in US cents, so a $10 deposit appears as 1,000 cents. You trade the same markets at a smaller size: a good way to test a strategy with real money.',
  },
  {
    q: 'Can I change my leverage later?',
    a: 'Yes, in the Client Area, while the account has no open positions. The leverage on any trade is also capped by the market’s own limit. Leverage does not apply to options: you pay the premium in cash.',
  },
  {
    q: 'Do I need to verify my identity?',
    a: 'Not to sign up, open accounts or deposit. Withdrawals need a verified identity (KYC), which you complete in the Client Area with your phone camera.',
  },
  {
    q: 'What does “raw spread” mean?',
    a: 'The spread from our price feed with no markup. ECN and VIP trade on it and pay a fixed commission per lot. Standard, Pro and Cent add a fixed markup and charge no commission.',
  },
];

function AccountCard({ a, delay }: { a: AccountType; delay: number }) {
  const tone = TONE[a.id] ?? 'glass';
  const cls = tone === 'orange' ? 's-orange' : tone === 'cream' ? 's-cream' : 's-card';
  const muted = tone === 'cream' ? 'text-[var(--s-cream-tx2)]' : tone === 'orange' ? 'text-white/80' : 'text-[var(--s-tx3)]';
  const line = tone === 'cream' ? 'border-[rgba(26,20,16,0.12)]' : tone === 'orange' ? 'border-white/25' : 'border-[var(--s-line)]';
  const kicker = tone === 'cream' ? 'text-[var(--s-orange)]' : tone === 'orange' ? 'text-white/80' : 'text-[var(--s-orange2)]';
  return (
    <div id={a.id} className="scroll-mt-28">
      <Rise delay={delay} className="h-full">
        <div className={cn('s-bento-card h-full', cls)}>
          <div className="flex items-center justify-between gap-3">
            <span className={cn('text-[12.5px] font-semibold uppercase tracking-[0.08em]', kicker)}>{a.pricing.startsWith('Raw') ? 'Raw spread + commission' : 'All-in spread'}</span>
            {a.highlight && <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-[var(--s-cream-tx)]">Most traders</span>}
          </div>
          <h3 className="mt-3 text-[clamp(30px,2.8vw,40px)] font-[500] leading-none tracking-[-0.04em]">{a.name}</h3>
          <p className={cn('mt-3 text-[14.5px] leading-relaxed', muted)}>{a.tagline}</p>
          <div className="mt-7 grid grid-cols-2 gap-4">
            <div>
              <div className={cn('text-[12.5px] font-medium', muted)}>From</div>
              <div className="s-num mt-1 text-[clamp(36px,3.4vw,48px)]">{a.minDeposit}</div>
            </div>
            <div>
              <div className={cn('text-[12.5px] font-medium', muted)}>Leverage up to</div>
              <div className="s-num mt-1 text-[clamp(36px,3.4vw,48px)]">{a.leverage}</div>
            </div>
          </div>
          <dl className="mt-6">
            {[
              ['Spread', a.spread],
              ['Commission', a.commission],
              ['Margin call / stop out', `${a.marginCall} / ${a.stopOut}`],
              ['Mode', a.mode],
            ].map(([k, v]) => (
              <div key={k} className={cn('flex flex-wrap justify-between gap-x-4 gap-y-1 border-t py-3 text-[14px]', line)}>
                <dt className={muted}>{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-auto pt-6">
            <Btn href={REGISTER_HREF} size="sm" variant={tone === 'orange' ? 'light' : tone === 'cream' ? 'dark' : 'primary'}>
              Open {a.name}
            </Btn>
          </div>
        </div>
      </Rise>
    </div>
  );
}

/** rows whose values are numbers (set in mono) */
const MONO = new Set(['Minimum deposit', 'Leverage', 'Spread', 'Commission', 'Margin call / stop out']);

const th = 'px-4 py-3.5 text-start text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[var(--s-tx3)]';
const rowHead = 'sticky left-0 z-[1] bg-[#100d0c] px-4 py-3.5 text-start text-[13.5px] font-medium text-[var(--s-tx3)]';
const cell = 'px-4 py-3.5 align-top text-[14px] leading-relaxed text-white';

export default function AccountsPage() {
  const [optStd, optPro] = OPTIONS_ACCOUNTS;
  const vip = ACCOUNTS.find((a) => a.id === 'vip')!;
  return (
    <>
      <PageHero
        photo="accounts"
        eyebrow="Accounts"
        title={
          <>
            Two kinds of account. <span className="s-mute">One wallet.</span>
          </>
        }
        lead={`Five CFD accounts, priced all-in or raw plus commission, and an Options account of its own. Fund every one of them from the same USDT wallet, from ${ACCOUNTS[0].minDeposit}.`}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Open an account</Btn>
            <Btn href="#compare" variant="ghost" icon={false}>
              Compare accounts
            </Btn>
          </>
        }
        facts={[`${ACCOUNTS[0].minDeposit} to open Standard or Cent`, `Leverage up to 1:${LEVERAGE.accountMax}`, `${DEMO.defaultBalance} free demo funds`]}
        aside={
          <>
            <HeroGlass>
              <div className="s-num text-[44px]">{vip.commission.split(' ')[0]}</div>
              <div className="mt-2 text-[13.5px] text-white/85">A lot round turn on VIP, raw spread</div>
            </HeroGlass>
            <HeroGlass>
              <div className="s-num text-[44px]">{FUNDING.minDeposit}</div>
              <div className="mt-2 text-[13.5px] text-white/85">Funds the wallet behind every account</div>
            </HeroGlass>
          </>
        }
      />

      {/* 01 CFD accounts */}
      <section id="cfd" className="s-sec scroll-mt-16" aria-labelledby="cfd-title">
        <div className="s-wrap">
          <Head
            id="cfd-title"
            index="01"
            eyebrow="CFD accounts"
            title={
              <>
                Pick your <span className="s-hot">pricing.</span>
              </>
            }
            lead="All five trade forex, metals, energies, indices, crypto and stocks. They differ in pricing, minimum deposit and leverage."
            action={<TextLink href="#compare">Every detail, side by side</TextLink>}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {ACCOUNTS.map((a, i) => (
              <AccountCard key={a.id} a={a} delay={(i % 3) * 70} />
            ))}
            <div id="demo" className="scroll-mt-28">
              <Rise delay={140} className="h-full">
                <div className="s-bento-card s-card h-full">
                  <span className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--s-orange2)]">Free</span>
                  <h3 className="mt-3 text-[clamp(30px,2.8vw,40px)] font-[500] leading-none tracking-[-0.04em]">Demo</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--s-tx3)]">Virtual funds on live prices, for CFDs and options.</p>
                  <div className="s-num mt-7 text-[clamp(44px,4.4vw,64px)] text-[var(--s-orange2)]">{DEMO.defaultBalance}</div>
                  <Checks className="mt-6" items={[`Any balance from ${DEMO.balanceRange}`, `Refill up to ${DEMO.refillsPerDay} times a day`, 'Every market, stocks included']} />
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <Btn href={DEMO_HREF} size="sm">
                      Try the demo
                    </Btn>
                    <Btn href="/accounts/demo" size="sm" variant="ghost" icon={false}>
                      How it works
                    </Btn>
                  </div>
                </div>
              </Rise>
            </div>
          </div>
          <p className="mt-5 text-[12.5px] text-[var(--s-tx3)]">1 pip = 10 points on a 5-digit FX pair. Raw spreads are our price feed’s spreads and move with the market. Figures are the current defaults and can change.</p>
        </div>
      </section>

      {/* 02 in the Client Area */}
      <section className="s-sec s-band" aria-labelledby="ca-title">
        <div className="s-wrap">
          <Head
            id="ca-title"
            index="02"
            eyebrow="Client Area"
            title={
              <>
                Your accounts, <span className="s-mute">as cards.</span>
              </>
            }
            lead="In the Client Area every account is a card with its login, equity, free margin and leverage. Open, fund and trade from the same screen. Point at a number to see each part."
            action={<TextLink href="/platforms/client-area">Tour the Client Area</TextLink>}
          />
          <PinTour shot="caAccounts" pins={CA_PINS} cols="lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]" scrollMin="min-w-[720px]" />
          <Rise className="mt-14 grid items-center gap-6 lg:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] lg:gap-12">
            <Shot shot="caTypes" flat />
            <div>
              <div className="text-[18px] font-semibold tracking-[-0.02em]">Every type, before you open it</div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--s-tx2)]">The accounts page of the Client Area shows each type as a card with its minimum deposit, maximum leverage, position mode and pricing. Pro also comes as Pro Netting.</p>
            </div>
          </Rise>
        </div>
      </section>

      {/* 03 the Options account */}
      <section id="options" className="s-sec scroll-mt-16" aria-labelledby="opt-title">
        <div className="s-wrap">
          <Head
            id="opt-title"
            index="03"
            eyebrow="Options account"
            title={
              <>
                Options get <span className="s-mute">their own account.</span>
              </>
            }
            lead="An account trades one product. Open an Options account next to your CFD account: one wallet funds both, transfers are instant and free."
            action={<TextLink href="/options">How options work</TextLink>}
          />
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <Rise className="h-full">
              <div className="s-bento-card s-cream h-full">
                <span className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--s-orange)]">Options · live</span>
                <h3 className="mt-3 text-[clamp(30px,2.8vw,40px)] font-[500] leading-none tracking-[-0.04em]">{optStd.name}</h3>
                <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[var(--s-cream-tx2)]">{optStd.tagline} Daily, weekly and monthly expiries, settled in cash in US dollars.</p>
                <dl className="mt-7">
                  {[
                    ['Minimum deposit', optStd.minDeposit],
                    ['Commission', optStd.commission],
                    ['Leverage', optStd.leverage],
                    ['Selling options', optStd.selling],
                    ['Demo', 'Free, with virtual funds'],
                  ].map(([k, v]) => (
                    <div key={k} className="grid gap-1 border-t border-[rgba(26,20,16,0.12)] py-3 text-[14.5px] sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-4">
                      <dt className="text-[var(--s-cream-tx2)]">{k}</dt>
                      <dd className="font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-auto flex flex-wrap gap-3 pt-7">
                  <Btn href={REGISTER_HREF} variant="dark">
                    Open {optStd.name}
                  </Btn>
                </div>
              </div>
            </Rise>
            <div className="grid gap-4">
              <Rise delay={80}>
                <div className="s-card flex flex-col gap-3 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-[24px] font-[500] tracking-[-0.03em]">{optPro.name}</h3>
                    <span className="s-chip hot">Coming soon</span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-[var(--s-tx2)]">{optPro.tagline}</p>
                </div>
              </Rise>
              <Rise delay={140} className="h-full">
                <div className="s-card flex h-full flex-col gap-5 p-6">
                  <h3 className="text-[20px] font-[500] tracking-[-0.02em]">How the split works</h3>
                  <Checks items={['A CFD account trades CFDs. An Options account trades options.', 'Hold both at once, live and demo.', 'One USDT wallet funds every account.', 'Prop, copy, PAMM and MAM accounts trade CFDs only.']} />
                </div>
              </Rise>
            </div>
          </div>
        </div>
      </section>

      {/* 04 side by side */}
      <section id="compare" className="s-sec s-band scroll-mt-16" aria-labelledby="cmp-title">
        <div className="s-wrap">
          <Head
            id="cmp-title"
            index="04"
            eyebrow="Side by side"
            title={
              <>
                Compare <span className="s-mute">every account.</span>
              </>
            }
            lead="The five CFD accounts first, then the Options accounts. Scroll the table sideways on a phone."
          />
          <Rise className="s-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse">
                <caption className="sr-only">CFD accounts compared</caption>
                <thead>
                  <tr className="border-b border-[var(--s-line2)]">
                    <th scope="col" className={cn(th, 'sticky left-0 z-[1] w-[200px] bg-[#100d0c]')}>
                      CFD accounts
                    </th>
                    {ACCOUNTS.map((a) => (
                      <th key={a.id} scope="col" className={cn(th, '!text-[15px] !normal-case !tracking-[-0.01em] !text-white', a.highlight && 'bg-[rgba(242,96,12,0.1)]')}>
                        <a href={`#${a.id}`} className="hover:text-[var(--s-orange2)]">
                          {a.name}
                        </a>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map(([label, get]) => (
                    <tr key={label} className="border-b border-[var(--s-line)] last:border-b-0">
                      <th scope="row" className={rowHead}>
                        {label}
                      </th>
                      {ACCOUNTS.map((a) => (
                        <td key={a.id} className={cn(cell, MONO.has(label) && 'font-mono text-[13.5px]', a.highlight && 'bg-[rgba(242,96,12,0.06)]')}>
                          {get(a)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Rise>
          <Rise className="s-card mt-5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <caption className="sr-only">Options accounts compared</caption>
                <thead>
                  <tr className="border-b border-[var(--s-line2)]">
                    <th scope="col" className={cn(th, 'sticky left-0 z-[1] w-[200px] bg-[#100d0c]')}>
                      Options accounts
                    </th>
                    <th scope="col" className={cn(th, '!text-[15px] !normal-case !tracking-[-0.01em] !text-white')}>
                      {optStd.name}
                    </th>
                    <th scope="col" className={cn(th, '!text-[15px] !normal-case !tracking-[-0.01em] !text-white')}>
                      {optPro.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      ['Status', 'Live', 'Coming soon'],
                      ['In short', optStd.tagline, optPro.tagline],
                      ['Minimum deposit', optStd.minDeposit, 'To be announced'],
                      ['Commission', optStd.commission, 'To be announced'],
                      ['Leverage', optStd.leverage, 'To be announced'],
                      ['Selling options', optStd.selling, 'To be announced'],
                    ] as const
                  ).map(([label, s, p]) => (
                    <tr key={label} className="border-b border-[var(--s-line)] last:border-b-0">
                      <th scope="row" className={rowHead}>
                        {label}
                      </th>
                      <td className={cn(cell, label === 'Status' && 'font-semibold text-[var(--s-orange2)]')}>{s}</td>
                      <td className={cn(cell, 'text-[var(--s-tx2)]')}>{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Rise>
        </div>
      </section>

      {/* 05 get started */}
      <section id="open" className="s-sec scroll-mt-16" aria-labelledby="open-title">
        <div className="s-wrap">
          <Head
            id="open-title"
            index="05"
            eyebrow="Get started"
            title={
              <>
                Trading <span className="s-mute">in four steps.</span>
              </>
            }
            action={<Btn href={REGISTER_HREF}>Open an account</Btn>}
          />
          <StepCards
            steps={[
              { t: 'Sign up', d: 'Create your Kalks profile in the Client Area with your email. It takes a minute.' },
              { t: 'Open an account', d: 'CFD or Options, live or demo. Choose the type and leverage; your login is issued at once.' },
              { t: 'Fund your wallet', d: `Deposit ${FUNDING.methods}. Credited ${FUNDING.creditTime}.` },
              { t: 'Trade', d: 'Move funds to your account, instantly and free, and trade in Kalks Trader.' },
            ]}
          />
        </div>
      </section>

      {/* 06 funding */}
      <section id="funding" className="s-sec s-band scroll-mt-16" aria-labelledby="fund-title">
        <div className="s-wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <Rise className="flex flex-col gap-7">
            <MiniHead
              index="06"
              eyebrow="Funding"
              id="fund-title"
              title={
                <>
                  Deposit USDT. <span className="s-mute">Trade in a minute.</span>
                </>
              }
              lead={`${FUNDING.methods}, verified on-chain. Pay from MetaMask or TronLink, or send to your deposit address. USDT is credited 1:1 as US dollars.`}
            />
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7">
              {[
                [FUNDING.minDeposit, 'Minimum deposit'],
                ['~1 min', 'Usual time to credit'],
                ['$0', 'Wallet to account, instant'],
                [FUNDING.withdrawalFee.replace(' flat', ''), 'Flat withdrawal fee'],
              ].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-3 flex items-center gap-2 border-t border-[rgba(242,96,12,0.45)] pt-3 text-[13.5px] text-[var(--s-tx2)]">{l}</dt>
                  <dd className="s-num text-[clamp(34px,3.4vw,48px)]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-[12.5px] leading-relaxed text-[var(--s-tx3)]">
              Withdrawals from {FUNDING.withdrawalRange} per request need a verified identity and are reviewed before they are sent. To protect your account, funds cannot be withdrawn within 24 hours of a deposit.
            </p>
            <div>
              <Btn href="/accounts/funding" variant="ghost">
                Funding, step by step
              </Btn>
            </div>
          </Rise>
          <Rise delay={120}>
            <Shot shot="caWallet" />
          </Rise>
        </div>
      </section>

      {/* 07 questions */}
      <section className="s-sec" aria-labelledby="afaq-title">
        <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Rise className="flex flex-col items-start gap-6">
            <MiniHead
              index="07"
              eyebrow="Questions"
              id="afaq-title"
              title={
                <>
                  Accounts, <span className="s-mute">answered.</span>
                </>
              }
            />
            <TextLink href="/faq">Every question, by topic</TextLink>
          </Rise>
          <Rise delay={100}>
            <Faq items={FAQ} />
            <FaqSchema items={FAQ} />
            <RiskNote options className="mt-10" />
          </Rise>
        </div>
      </section>

      <Cta
        title={
          <>
            Open your account <span className="text-white/70">today.</span>
          </>
        }
        sub={`Sign up once, open CFD and Options accounts side by side, and practise on ${DEMO.defaultBalance} of demo money before you go live from ${ACCOUNTS[0].minDeposit}.`}
        primary={{ href: REGISTER_HREF, label: 'Open an account' }}
        secondary={{ href: DEMO_HREF, label: 'Try the demo' }}
        facts={[`${ACCOUNTS.length} CFD accounts`, `${OPTIONS_ACCOUNTS[0].name}`, `${FUNDING.withdrawalFee} withdrawal fee`]}
        image={HEROES.accounts}
      />
    </>
  );
}
