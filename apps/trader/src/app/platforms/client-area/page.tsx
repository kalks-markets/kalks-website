import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/site/Heroes';
import { Btn, Checks, Cta, Head } from '@/components/site/ui';
import { Shot, type Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { FaqSection, MiniHead, NumberedRows, Related } from '@/components/site/platforms/bits';
import { PinTour } from '@/components/site/platforms/ShotTours';
import { ACADEMY, DEMO, FUNDING, IB, LANGUAGES, PROP, SOCIAL } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES } from '@/content/heroes';
import { CLIENT_FEATURES } from '@/content/platforms';
import { CRM_URL, LOGIN_HREF, REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'The Client Area',
  description:
    'The Kalks Client Area runs everything around your trading: CFD and Options accounts, the USDT wallet, copy trading, PAMM and MAM, prop challenges, partner earnings, the Academy and support.',
  alternates: { canonical: '/platforms/client-area' },
};

/** pins in % of each screenshot */
const HOME_PINS: Pin[] = [
  { x: 71.8, y: 52.9, title: 'Ask the AI assistant', text: 'Questions about your account or trading, in plain words, from the top of the page.' },
  { x: 26, y: 61.3, title: 'Suggested questions', text: 'How do I deposit, what is my free margin, explain margin level: one tap to ask.' },
  { x: 13.5, y: 78.8, title: 'Total balance', text: 'Your live accounts and your wallet in one number, with equity and open positions beside it.' },
  { x: 17.5, y: 78.8, title: 'Hide the amounts', text: 'One tap on the eye hides every balance, for when you are not alone.' },
  { x: 51.1, y: 85.6, title: 'P&L by day', text: "Today's P&L, with the days of the week under it." },
  { x: 90.7, y: 78.8, title: 'Rewards', text: 'Your loyalty points and how far it is to the next level.' },
];

const ACCOUNT_PINS: Pin[] = [
  { x: 2.7, y: 11.1, title: 'Shortcuts', text: 'Deposit, withdraw, transfer, open an account, Kalks Trader, options, copy trading, prop, partner, the Academy and more, one tap each.' },
  { x: 86, y: 6.6, title: 'Open an account', text: 'A new CFD or Options account, live or demo, with the type and leverage you choose.' },
  { x: 57.6, y: 41.9, title: 'Accounts as cards', text: 'Number, equity, free margin, leverage, type and balance on a card for each account. Swipe to the next.' },
  { x: 91.6, y: 18.7, title: 'Live or demo', text: 'Marked on every card, so you always know which money you are looking at.' },
  { x: 76.6, y: 85.4, title: 'Trade or fund', text: 'Open Kalks Trader on this account, or move money in from your wallet.' },
  { x: 96.2, y: 78.4, title: 'Hide the numbers', text: 'The eye hides the amounts on the card.' },
];

const WALLET_PINS: Pin[] = [
  { x: 7.4, y: 66.5, title: 'Wallet balance', text: 'Available, in progress and total, in USDT, credited 1:1 in US dollars.' },
  { x: 95.1, y: 70.8, title: 'Deposit', text: `${FUNDING.methods}, from ${FUNDING.minDeposit}, ${FUNDING.creditTime}.` },
  { x: 95.1, y: 81.6, title: 'Withdraw', text: `To your own USDT address: ${FUNDING.withdrawalRange}, ${FUNDING.withdrawalFee} fee.` },
  { x: 95.1, y: 92.4, title: 'Transfer', text: `${FUNDING.transfers}.` },
];

const FAQ = FAQ_GROUPS.find((g) => g.id === 'platform')!.items;

export default function ClientAreaPage() {
  return (
    <>
      <PageHero
        compact
        photo="platforms"
        eyebrow="Client Area"
        title={
          <>
            Everything <span className="s-mute">around the trade.</span>
          </>
        }
        lead={`Accounts, money, copy trading, prop challenges, partner earnings and learning, side by side, in ${LANGUAGES.length} languages.`}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Open an account</Btn>
            <Btn href={LOGIN_HREF} variant="ghost" icon={false}>
              Log in
            </Btn>
          </>
        }
        facts={['One USDT wallet for every account', `${LANGUAGES.length} languages`, `${ACADEMY.lessons} Academy lessons`, 'Support chat from any page']}
      />

      {/* 01 home */}
      <section className="s-sec" aria-labelledby="h-title">
        <div className="s-wrap">
          <Head
            id="h-title"
            index="01"
            eyebrow="Home"
            title={
              <>
                Your money, <span className="s-mute">at a glance.</span>
              </>
            }
            lead="The first page after you sign in. Point at a number to see what each part does."
          />
          <PinTour shot="caDashboard" pins={HOME_PINS} layout="under" legendCols="sm:grid-cols-2 lg:grid-cols-4" scrollMin="min-w-[640px]" />
        </div>
      </section>

      {/* 02 accounts */}
      <section className="s-sec s-band" aria-labelledby="a-title">
        <div className="s-wrap">
          <Head
            id="a-title"
            index="02"
            eyebrow="Accounts"
            title={
              <>
                Accounts <span className="s-hot">as cards.</span>
              </>
            }
            lead="Open CFD and Options accounts, live and demo, side by side; change leverage; set read-only investor passwords."
            action={<Btn href="/accounts">Compare the accounts</Btn>}
          />
          <PinTour shot="caAccounts" pins={ACCOUNT_PINS} cols="lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]" scrollMin="min-w-[640px]" />
          <Rise className="s-card mt-12 overflow-hidden p-3">
            <Shot shot="caTypes" flat />
            <p className="px-3 pb-2 pt-4 text-[14px] text-[var(--s-tx2)]">
              <b className="font-semibold text-white">Pick a type.</b> The same instruments and Kalks Trader on every type; the card shows the minimum deposit and the highest leverage.
            </p>
          </Rise>
        </div>
      </section>

      {/* 03 wallet */}
      <section className="s-sec" aria-labelledby="w-title">
        <div className="s-wrap">
          <PinTour
            shot="caWallet"
            pins={WALLET_PINS}
            scrollMin="min-w-[600px]"
            flip
            cols="lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
            intro={
              <MiniHead
                index="03"
                eyebrow="Wallet"
                id="w-title"
                className="mb-10"
                title={
                  <>
                    One USDT wallet <span className="s-mute">for everything.</span>
                  </>
                }
                lead="Deposit once and fund any account from it. Prop fees, copy allocations and partner payouts use the same wallet."
              />
            }
            outro={
              <div className="mt-8">
                <Btn href="/accounts/funding" variant="ghost">
                  Funding in detail
                </Btn>
              </div>
            }
          />
        </div>
      </section>

      {/* 04 copy, PAMM and partners */}
      <section className="s-sec s-band" aria-labelledby="c-title">
        <div className="s-wrap">
          <Head
            id="c-title"
            index="04"
            eyebrow="Beyond your own trades"
            title={
              <>
                Copy, invest <span className="s-mute">or refer.</span>
              </>
            }
            lead="Follow masters, invest in funds, or apply to become a master. Share your link and watch your partner commission grow."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { shot: 'caCopy' as const, t: 'Copy trading', d: `Masters as cards with return, drawdown, followers and risk. Start from ${SOCIAL.minAllocation}.`, href: '/copy-trading' },
              { shot: 'caPamm' as const, t: 'PAMM funds', d: 'Invest by units at the next rollover NAV; fees only above the high-water mark.', href: '/copy-trading#pamm' },
              { shot: 'caPartner' as const, t: 'Partner dashboard', d: `Your level, your link and your network, ${IB.tiers} tiers deep, paid every Monday.`, href: '/partners' },
            ].map((c, i) => (
              <Rise key={c.t} delay={i * 70} className="h-full">
                <Link href={c.href} className="group s-card flex h-full flex-col overflow-hidden p-3 transition-colors hover:border-[var(--s-line2)]">
                  <Shot shot={c.shot} flat />
                  <div className="px-3 pb-2 pt-5">
                    <div className="text-[17px] font-semibold tracking-[-0.015em] transition-colors group-hover:text-[var(--s-orange2)]">{c.t}</div>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--s-tx2)]">{c.d}</p>
                  </div>
                </Link>
              </Rise>
            ))}
          </div>
          <Rise className="mt-10">
            <Checks items={['Prop challenges: buy one, track every rule live, request payouts, download certificates', `The Academy: ${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases, quizzes, exams and certificates`, 'Support: chat from any page, an instant help assistant with our team behind it']} />
          </Rise>
        </div>
      </section>

      {/* 05 everything inside */}
      <section id="inside" className="s-sec scroll-mt-20" aria-labelledby="in-title">
        <div className="s-wrap">
          <Head
            id="in-title"
            index="05"
            eyebrow="What is inside"
            title={
              <>
                The whole list, <span className="s-mute">in short.</span>
              </>
            }
            action={
              <Btn href={CRM_URL} variant="ghost">
                Go to the Client Area
              </Btn>
            }
          />
          <NumberedRows items={CLIENT_FEATURES.map(([t, d]) => ({ t, d }))} />
        </div>
      </section>

      <Related
        links={[
          { href: '/platforms/trader', t: 'Kalks Trader', d: 'Where the trading happens.' },
          { href: '/accounts/funding', t: 'Funding', d: 'USDT in, usually within a minute.' },
          { href: '/copy-trading', t: 'Copy trading', d: 'Follow an approved master.' },
          { href: '/prop', t: 'Prop challenges', d: `Simulated accounts up to ${PROP[0].sizes[PROP[0].sizes.length - 1][0]}.` },
        ]}
      />

      <FaqSection
        index="06"
        title={
          <>
            The Client Area, <span className="s-mute">answered.</span>
          </>
        }
        items={FAQ}
      />

      <Cta
        title={
          <>
            Get your own <span className="text-white/70">Client Area.</span>
          </>
        }
        sub={`Register in a couple of minutes, then open a demo with ${DEMO.defaultBalance} of virtual money, or a live account.`}
        primary={{ href: REGISTER_HREF, label: 'Open an account' }}
        secondary={{ href: LOGIN_HREF, label: 'Log in' }}
        facts={[`${LANGUAGES.length} languages`, `Fund with ${FUNDING.minDeposit}`, `${FUNDING.withdrawalFee} withdrawal fee`]}
        image={HEROES.platforms}
      />
    </>
  );
}
