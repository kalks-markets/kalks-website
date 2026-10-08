import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Hero } from '@/components/ui/Hero';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, FactList, Steps } from '@/components/ui/Section';
import { Faq } from '@/components/ui/Faq';
import { RiskNote } from '@/components/ui/RiskNote';
import { AccountCardsArt } from '@/components/art/HeroArt';
import { ACCOUNTS, DEMO, FUNDING, OPTIONS_ACCOUNTS } from '@/content/facts';
import { DEMO_HREF, REGISTER_HREF } from '@/lib/crm';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Accounts: five CFD accounts, an Options account and free demo',
  description:
    'Compare Kalks accounts: Standard, Pro, ECN, Cent and VIP for CFDs, from $10 with leverage up to 1:1000, and Options Standard for calls and puts. One USDT wallet funds them all. Free demo with $10,000.',
  alternates: { canonical: '/accounts' },
};

const ROWS: [string, (a: (typeof ACCOUNTS)[number]) => string][] = [
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

export default function AccountsPage() {
  const [optStd, optPro] = OPTIONS_ACCOUNTS;
  return (
    <>
      <Hero
        tone="ink"
        kicker="ACCOUNTS"
        title="Five ways to trade CFDs. One for options."
        lede={`All-in spreads or raw pricing with commission, in dollars or cents, from $10. Options get their own account. Free demo with ${DEMO.defaultBalance} in virtual funds.`}
        actions={
          <>
            <Btn href={REGISTER_HREF} v="red" s={56} arrow>
              Open account
            </Btn>
            <Btn href="#compare" v="ghost" s={56}>
              Compare accounts
            </Btn>
          </>
        }
        facts="One USDT wallet funds every account"
        art={<AccountCardsArt />}
        strip={[
          { v: '$10', l: 'Minimum deposit on Standard and Cent' },
          { v: '1:1000', l: 'Maximum leverage on Standard and Cent' },
          { v: '$3', l: 'Per lot round turn on VIP, raw spread' },
          { v: DEMO.defaultBalance, l: `Free demo, refill up to ${DEMO.refillsPerDay} times a day` },
        ]}
      />

      <Section id="cfd" labelledBy="cfd-title">
        <SectionHead
          id="cfd-title"
          kicker="01 — CFD ACCOUNTS"
          title="Pick your pricing."
          lede="All five trade forex, metals, energies, indices, crypto and stocks. They differ in pricing, minimum deposit and leverage."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ACCOUNTS.map((a) => (
            <div key={a.id} id={a.id} className={cn('card relative flex scroll-mt-28 flex-col p-6', a.highlight && 'shadow-[var(--sh1),inset_0_0_0_2px_var(--red)]')}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="tag cfd">CFD</span>
                  <h3 className="d-wide text-[26px]">{a.name}</h3>
                </div>
                {a.highlight && <span className="tag new">Popular</span>}
              </div>
              <p className="body mt-2">{a.tagline}</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[12.5px] font-semibold text-tx3">From</p>
                  <p className="money mt-1 text-[28px]">{a.minDeposit}</p>
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold text-tx3">Leverage up to</p>
                  <p className="money mt-1 text-[28px]">{a.leverage}</p>
                </div>
              </div>
              <FactList
                className="mt-5"
                items={[
                  ['Spread', a.spread],
                  ['Commission', a.commission],
                  ['Margin call / stop out', `${a.marginCall} / ${a.stopOut}`],
                  ['Mode', a.mode],
                ]}
              />
              <div className="mt-auto pt-6">
                <Btn href={REGISTER_HREF} v={a.highlight ? 'red' : 'ink'} s={40}>
                  Open {a.name}
                </Btn>
              </div>
            </div>
          ))}
          <div id="demo" className="pcard pc-yel scroll-mt-28 !min-h-0">
            <span className="k">DEMO</span>
            <h3>Practise for free.</h3>
            <p>Virtual funds on live prices, for CFDs and options.</p>
            <p className="money !mt-5 !text-[30px] !opacity-100">{DEMO.defaultBalance}</p>
            <ul className="mt-4 flex flex-col gap-2 text-[14px]">
              <li>Any balance from {DEMO.balanceRange}</li>
              <li>Refill up to {DEMO.refillsPerDay} times a day</li>
              <li>Every market, stocks included</li>
            </ul>
            <div className="mt-auto pt-6">
              <Btn href={DEMO_HREF} v="ink">
                Try the demo
              </Btn>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[12.5px] text-tx3">
          1 pip = 10 points on a 5-digit FX pair. Raw spreads are our price feed’s spreads and move with the market. Figures are the
          current defaults and can change.
        </p>
      </Section>

      <Section id="options" labelledBy="opt-title">
        <SectionHead
          id="opt-title"
          kicker="02 — OPTIONS ACCOUNT"
          title="Options get their own account."
          lede="An account trades one product. Open an Options account next to your CFD account: one wallet funds both, transfers are instant and free."
        />
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <div className="card flex flex-col p-6 sm:p-8">
            <div className="flex items-center gap-2">
              <span className="tag opt">Options</span>
              <h3 className="d-wide text-[26px]">{optStd.name}</h3>
            </div>
            <p className="body mt-2">{optStd.tagline} Daily, weekly and monthly expiries, settled in cash in US dollars.</p>
            <FactList
              className="mt-5"
              items={[
                ['Minimum deposit', optStd.minDeposit],
                ['Commission', optStd.commission],
                ['Leverage', optStd.leverage],
                ['Selling options', optStd.selling],
                ['Demo', 'Free, with virtual funds'],
              ]}
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Btn href={REGISTER_HREF} v="red" arrow>
                Open {optStd.name}
              </Btn>
              <Btn href="/options" v="ghost">
                How options work
              </Btn>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="card flex flex-col p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="tag opt">Options</span>
                  <h3 className="d-wide text-[22px]">{optPro.name}</h3>
                </div>
                <span className="st st-warn">Coming soon</span>
              </div>
              <p className="body mt-3">{optPro.tagline}</p>
            </div>
            <div className="card flex flex-1 flex-col gap-3 p-6">
              <h3 className="t-h3 !text-[18px]">How the split works</h3>
              <ul className="flex flex-col gap-2.5 text-[14.5px] text-tx2">
                {[
                  'A CFD account trades CFDs. An Options account trades options.',
                  'Hold both at once, live and demo.',
                  'One USDT wallet funds every account.',
                  'Prop, copy, PAMM and MAM accounts trade CFDs only.',
                ].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <Check size={18} className="mt-0.5 flex-none text-up-tx" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section id="compare" labelledBy="cmp-title">
        <SectionHead id="cmp-title" kicker="03 — SIDE BY SIDE" title="Compare the CFD accounts." />
        <div className="card overflow-hidden px-2 py-2">
          <div className="overflow-x-auto">
            <table className="tb min-w-[880px]">
              <thead>
                <tr>
                  <th scope="col" className="w-[190px]">
                    <span className="sr-only">Feature</span>
                  </th>
                  {ACCOUNTS.map((a) => (
                    <th key={a.id} scope="col" className="!text-[13px] !normal-case !tracking-normal !text-tx">
                      {a.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([label, get]) => (
                  <tr key={label}>
                    <th scope="row" className="!font-medium !text-tx3">
                      {label}
                    </th>
                    {ACCOUNTS.map((a) => (
                      <td key={a.id} className={cn('align-top', a.highlight && 'bg-[color-mix(in_srgb,var(--red-soft)_45%,transparent)]')}>
                        {get(a)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section id="open" labelledBy="open-title">
        <SectionHead id="open-title" kicker="04 — GET STARTED" title="Trading in four steps." />
        <Steps
          steps={[
            { t: 'Sign up', d: 'Create your Kalks profile in the Client Area with your email. It takes a minute.' },
            { t: 'Open an account', d: 'CFD or Options, live or demo. Choose the type and leverage; your login is issued at once.' },
            { t: 'Fund your wallet', d: `Deposit ${FUNDING.methods}. Credited ${FUNDING.creditTime}.` },
            { t: 'Trade', d: 'Move funds to your account, instantly and free, and trade in Kalks Trader.' },
          ]}
        />
      </Section>

      <Section id="funding" labelledBy="fund-title">
        <div className="pcard pc-ink !min-h-0 gap-10 lg:!flex-row lg:items-end lg:justify-between lg:!p-10">
          <div>
            <span className="k !text-k-yel">05 — FUNDING</span>
            <h2 id="fund-title" className="d mt-4 max-w-[12ch] text-[clamp(32px,3.4vw,46px)] leading-[0.95]">
              Deposit USDT. Trade in a minute.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-[#B8AAA5]">
              {FUNDING.methods}, verified on-chain. Pay from MetaMask or TronLink, or send to your deposit address. USDT is credited
              1:1 as US dollars.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] bg-[rgba(255,255,255,0.08)] lg:w-[460px] lg:flex-none">
            {[
              [FUNDING.minDeposit, 'Minimum deposit'],
              ['~1 min', 'Usual time to credit'],
              ['$0', 'Wallet to account, instant'],
              [FUNDING.withdrawalFee.replace(' flat', ''), 'Flat withdrawal fee'],
            ].map(([v, l]) => (
              <div key={l} className="flex flex-col-reverse bg-[#0B0809] p-4">
                <dt className="mt-1 text-[12.5px] text-[#B8AAA5]">{l}</dt>
                <dd className="money text-[26px] text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-4 text-[12.5px] text-tx3">
          Withdrawals from {FUNDING.withdrawalRange} per request need a verified identity and are reviewed before they are sent. To
          protect your account, funds cannot be withdrawn within 24 hours of a deposit.
        </p>
      </Section>

      <Section labelledBy="afaq-title" className="sec-last">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead id="afaq-title" kicker="06 — QUESTIONS" title="Accounts, answered." />
          <div>
            <Faq items={FAQ} schema />
            <RiskNote options className="mt-8" />
          </div>
        </div>
      </Section>
    </>
  );
}
