import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Block, CtaPanel, FactPanel, Related } from '@/components/kx/Blocks';
import { Accordion } from '@/components/kx/Accordion';
import { FAQ_GROUPS } from '@/content/faq';
import { FUNDING } from '@/content/facts';
import { REGISTER_HREF } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Funding: deposit and withdraw USDT',
  description: `Fund Kalks with ${FUNDING.methods}, from ${FUNDING.minDeposit}, ${FUNDING.creditTime}. Withdraw ${FUNDING.withdrawalRange} for a flat ${FUNDING.withdrawalFee.replace(' flat', '')}.`,
  alternates: { canonical: '/accounts/funding' },
};

const STEPS: [string, string][] = [
  ['Copy your address', 'The Client Area shows your own USDT deposit address and QR code for TRON (TRC20) or BNB Chain (BEP20).'],
  ['Send USDT', `Send from MetaMask, TronLink or any wallet, from ${FUNDING.minDeposit}. Only USDT on the network you chose.`],
  ['It arrives', `It is credited 1:1 as US dollars to your wallet, ${FUNDING.creditTime}.`],
  ['Move it to an account', 'Transfer from the wallet to any CFD or Options account, instantly and free.'],
];

export default function FundingPage() {
  const faq = FAQ_GROUPS.find((g) => g.id === 'funding')?.items ?? [];
  return (
    <>
      <PageHero
        kicker="Funding"
        title="USDT in. Trading in a minute."
        lede={`One wallet funds every account. Deposit ${FUNDING.methods}, ${FUNDING.creditTime}, and move money between accounts for free.`}
        photo="funding"
        actions={
          <a href={REGISTER_HREF} className="kx-btn prim lg">
            Open an account
          </a>
        }
      >
        <StatRow
          items={[
            { v: FUNDING.minDeposit, l: 'Lowest deposit' },
            { v: '~1 min', l: 'Usual time to credit' },
            { v: '$0', l: 'Wallet to account' },
            { v: '1 USDT', l: 'Withdrawal fee' },
          ]}
        />
      </PageHero>

      <Block id="deposit" title="Depositing, step by step.">
        <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="kx-panel pad">
              <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-[18px] font-semibold tracking-[-0.015em]">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4a5578]">{d}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="limits" title="Limits and fees.">
        <div className="grid gap-6 lg:grid-cols-2">
          <FactPanel
            title="Deposits"
            items={[
              ['Methods', 'USDT on TRON (TRC20) and BNB Chain (BEP20)'],
              ['Minimum', FUNDING.minDeposit],
              ['Credited', `1:1 as US dollars, ${FUNDING.creditTime}`],
              ['Fee', 'None from Kalks'],
            ]}
          />
          <FactPanel
            title="Withdrawals"
            items={[
              ['Per request', FUNDING.withdrawalRange],
              ['Fee', FUNDING.withdrawalFee],
              ['Needs', 'A verified identity; every request is reviewed'],
              ['Transfers', FUNDING.transfers],
            ]}
          />
        </div>
      </Block>

      {faq.length > 0 && (
        <Block id="questions" title="Funding questions.">
          <div className="kx-panel pad">
            <Accordion items={faq} />
          </div>
        </Block>
      )}

      <Related
        links={[
          { href: '/accounts', t: 'Accounts', d: 'Five CFD accounts and an Options account.' },
          { href: '/accounts/demo', t: 'Demo', d: 'Practise before you deposit.' },
          { href: '/platforms/client-area', t: 'Client Area', d: 'Where your wallet lives.' },
          { href: '/deposit-withdrawal', t: 'Deposit policy', d: 'The full deposit and withdrawal policy.' },
        ]}
      />

      <CtaPanel title="Ready to fund?" text="Register, verify, and send your first USDT.">
        <a href={REGISTER_HREF} className="kx-btn blue lg">
          Open an account
        </a>
      </CtaPanel>
    </>
  );
}
