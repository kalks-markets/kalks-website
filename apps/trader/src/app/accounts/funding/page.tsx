import type { Metadata } from 'next';
import { PageHero, HeroGlass } from '@/components/site/Heroes';
import { Btn, Cta, Faq, Head, StatStrip, TextLink } from '@/components/site/ui';
import type { Pin } from '@/components/site/Shot';
import { PinTour } from '@/components/site/markets/PinTour';
import { Rise } from '@/components/site/Rise';
import { FactTable, FaqSchema, LinkCards, MiniHead, StepCards } from '@/components/site/markets/bits';
import { FAQ_GROUPS } from '@/content/faq';
import { ACCOUNTS, FUNDING } from '@/content/facts';
import { HEROES } from '@/content/heroes';
import { REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Funding: deposit and withdraw USDT',
  description: `Fund Kalks with ${FUNDING.methods}, from ${FUNDING.minDeposit}, ${FUNDING.creditTime}. Withdraw ${FUNDING.withdrawalRange} for a flat ${FUNDING.withdrawalFee.replace(' flat', '')}.`,
  alternates: { canonical: '/accounts/funding' },
};

const FEE = FUNDING.withdrawalFee.replace(' flat', '');

const STEPS = [
  { t: 'Copy your address', d: 'The Client Area shows your own USDT deposit address and QR code for TRON (TRC20) or BNB Chain (BEP20).' },
  { t: 'Send USDT', d: `Send from MetaMask, TronLink or any wallet, from ${FUNDING.minDeposit}. Only USDT on the network you chose.` },
  { t: 'It arrives', d: `It is credited 1:1 as US dollars to your wallet, ${FUNDING.creditTime}.` },
  { t: 'Move it to an account', d: 'Transfer from the wallet to any CFD or Options account, instantly and free.' },
];

/** the wallet in the Client Area, part by part (pins in % of the screenshot) */
const WALLET_PINS: Pin[] = [
  { x: 61.4, y: 53.6, title: 'Deposit USDT', text: 'Your own deposit address and QR code for TRON (TRC20) or BNB Chain (BEP20), or pay from MetaMask or TronLink.' },
  { x: 38.3, y: 53.6, title: 'History', text: 'Your deposits, withdrawals and transfers in one list.' },
  { x: 7.4, y: 66.5, title: 'Wallet balance', text: 'Held in USDT and credited 1:1 as US dollars.' },
  { x: 10.7, y: 85.9, title: 'Available, in progress, total', text: 'What you can transfer or withdraw now, what is still in progress, and the total.' },
  { x: 95.1, y: 81.6, title: 'Withdraw', text: `${FUNDING.withdrawalRange} per request to your own USDT address, for ${FUNDING.withdrawalFee}.` },
  { x: 95.1, y: 92.4, title: 'Transfer', text: `${FUNDING.transfers}, to any CFD or Options account and back.` },
];

const FAQ = FAQ_GROUPS.find((g) => g.id === 'funding')?.items ?? [];

export default function FundingPage() {
  return (
    <>
      <PageHero
        photo="accounts"
        compact
        eyebrow="Funding"
        title={
          <>
            USDT in. <span className="s-mute">Trading in a minute.</span>
          </>
        }
        lead={`One wallet funds every account. Deposit ${FUNDING.methods}, ${FUNDING.creditTime}, and move money between accounts for free.`}
        actions={
          <>
            <Btn href={REGISTER_HREF}>Open an account</Btn>
            <Btn href="#deposit" variant="ghost" icon={false}>
              How to deposit
            </Btn>
          </>
        }
        facts={[`From ${FUNDING.minDeposit}`, 'TRC20 and BEP20', `${FEE} to withdraw`]}
        aside={
          <>
            <HeroGlass>
              <div className="s-num text-[44px]">{FUNDING.minDeposit}</div>
              <div className="mt-2 text-[13.5px] text-white/85">Lowest deposit</div>
            </HeroGlass>
            <HeroGlass>
              <div className="s-num text-[44px]">{FEE}</div>
              <div className="mt-2 text-[13.5px] text-white/85">Flat fee per withdrawal</div>
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
                <span className="s-eyebrow">One wallet</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['TRC20', 'BEP20', 'USDT'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              One wallet funds every account. <span className="s-mute">Deposit USDT on TRON or BNB Chain, see it credited 1:1 as US dollars, and move it to any CFD or Options account for free.</span>
            </h2>
            <div className="lg:col-span-2 [&_.s-num]:!text-[clamp(30px,4.6vw,68px)]">
              <StatStrip
                items={[
                  { v: FUNDING.minDeposit, l: 'Lowest deposit', sub: FUNDING.methods },
                  { v: '~1 min', l: 'Usual time to credit', sub: 'Verified on-chain' },
                  { v: '$0', l: 'Wallet to account', sub: 'Instant transfers' },
                  { v: FEE, l: 'Withdrawal fee', sub: `Flat, ${FUNDING.withdrawalRange} per request` },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 the wallet */}
      <section className="s-sec !pt-4" aria-labelledby="w-title">
        <div className="s-wrap">
          <Head
            id="w-title"
            index="02"
            eyebrow="Client Area"
            title={
              <>
                Your USDT wallet, <span className="s-mute">part by part.</span>
              </>
            }
            lead="Deposit, withdraw and transfer from one page in the Client Area. Point at a number to see each part."
            action={<TextLink href="/platforms/client-area">Tour the Client Area</TextLink>}
          />
          <PinTour shot="caWallet" pins={WALLET_PINS} cols="lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]" scrollMin="min-w-[720px]" />
        </div>
      </section>

      {/* 03 depositing */}
      <section id="deposit" className="s-sec s-band scroll-mt-16" aria-labelledby="dep-title">
        <div className="s-wrap">
          <Head
            id="dep-title"
            index="03"
            eyebrow="Deposits"
            title={
              <>
                Depositing, <span className="s-mute">step by step.</span>
              </>
            }
            action={<Btn href={REGISTER_HREF}>Open an account</Btn>}
          />
          <StepCards steps={STEPS} />
        </div>
      </section>

      {/* 04 limits and fees */}
      <section id="limits" className="s-sec scroll-mt-16" aria-labelledby="lim-title">
        <div className="s-wrap">
          <Head
            id="lim-title"
            index="04"
            eyebrow="Limits and fees"
            title={
              <>
                What it costs, <span className="s-mute">in full.</span>
              </>
            }
            action={<TextLink href="/deposit-withdrawal">Deposit and withdrawal policy</TextLink>}
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <Rise>
              <FactTable
                title="Deposits"
                rows={[
                  ['Methods', 'USDT on TRON (TRC20) and BNB Chain (BEP20)'],
                  ['Minimum', FUNDING.minDeposit],
                  ['Credited', `1:1 as US dollars, ${FUNDING.creditTime}`],
                  ['Fee', 'None from Kalks'],
                ]}
              />
            </Rise>
            <Rise delay={100}>
              <FactTable
                title="Withdrawals"
                rows={[
                  ['Per request', FUNDING.withdrawalRange],
                  ['Fee', FUNDING.withdrawalFee],
                  ['Needs', 'A verified identity; every request is reviewed'],
                  ['Transfers', FUNDING.transfers],
                ]}
              />
            </Rise>
          </div>
          <p className="mt-5 max-w-[90ch] text-[12.5px] leading-relaxed text-[var(--s-tx3)]">To protect your account, funds cannot be withdrawn within 24 hours of a deposit. Card and bank transfers are not accepted at the moment.</p>
        </div>
      </section>

      {/* 05 questions */}
      {FAQ.length > 0 && (
        <section className="s-sec s-band" aria-labelledby="f-title">
          <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
            <Rise className="flex flex-col items-start gap-6">
              <MiniHead
                index="05"
                eyebrow="Questions"
                id="f-title"
                title={
                  <>
                    Funding <span className="s-mute">questions.</span>
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
      )}

      {/* 06 related */}
      <section className="s-sec" aria-labelledby="m-title">
        <div className="s-wrap">
          <Head
            id="m-title"
            index="06"
            eyebrow="Related"
            title={
              <>
                Where your <span className="s-mute">money goes next.</span>
              </>
            }
          />
          <LinkCards
            links={[
              { href: '/accounts', t: 'Accounts', d: 'Five CFD accounts and an Options account.' },
              { href: '/accounts/demo', t: 'Demo', d: 'Practise before you deposit.' },
              { href: '/platforms/client-area', t: 'Client Area', d: 'Where your wallet lives.' },
              { href: '/deposit-withdrawal', t: 'Deposit policy', d: 'The full deposit and withdrawal policy.' },
            ]}
          />
        </div>
      </section>

      <Cta
        title={
          <>
            Ready <span className="text-white/70">to fund?</span>
          </>
        }
        sub={`Register, send your first USDT from ${FUNDING.minDeposit}, and trade from ${ACCOUNTS[0].minDeposit} on a Standard or Cent account.`}
        primary={{ href: REGISTER_HREF, label: 'Open an account' }}
        secondary={{ href: '/accounts/demo', label: 'Try the demo first' }}
        facts={[FUNDING.methods, FUNDING.creditTime.replace(/^u/, 'U'), `${FUNDING.withdrawalFee} withdrawal fee`]}
        image={HEROES.accounts}
      />
    </>
  );
}
