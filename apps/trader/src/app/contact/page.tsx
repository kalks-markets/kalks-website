import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import Link from 'next/link';
import { ArrowUpRight, Building2, Mail, MessageCircle } from 'lucide-react';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead } from '@/components/ui/Section';
import { BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { CRM_URL } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Help & contact',
  description: 'Reach Kalks support through the chat in the Client Area or by email, and find answers on accounts, funding, trading, options, prop and partners.',
  alternates: { canonical: '/contact' },
};

const TOPICS = [
  { t: 'Accounts and verification', d: 'CFD and Options accounts, demo, leverage, identity checks.', href: '/faq#accounts' },
  { t: 'Deposits and withdrawals', d: 'USDT on BNB Chain and TRON: limits, fees and timing.', href: '/faq#funding' },
  { t: 'Trading conditions', d: 'Spreads, commission, margin and the markets you can trade.', href: '/faq#trading' },
  { t: 'Kalks FX Options', d: 'How the chain works, costs, settlement and risk.', href: '/faq#options' },
  { t: 'Prop challenges', d: 'Plans, rules, payouts and certificates.', href: '/faq#prop' },
  { t: 'Partners', d: 'Links, levels, commission and payouts.', href: '/faq#partners' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="HELP & CONTACT"
        title="We are here to help."
        lede="Clients get the fastest answers in the support chat inside the Client Area. Anyone can write to us by email."
        photo="contact"
      />

      <Section label="Ways to reach us" className="!pt-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="card flex flex-col p-6">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#e6edff] text-[#2447e0]">
              <MessageCircle size={20} aria-hidden />
            </span>
            <h2 className="t-h3 mt-6">Support chat</h2>
            <p className="body mt-2">Open the chat from any page of the Client Area. An instant help assistant answers common questions; our team takes over when you need a person.</p>
            <div className="mt-auto pt-6">
              <Btn href={`${CRM_URL}/support`} v="red" arrow>
                Open support
              </Btn>
            </div>
          </div>
          <div className="card flex flex-col p-6">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#e6edff] text-[#2447e0]">
              <Mail size={20} aria-hidden />
            </span>
            <h2 className="t-h3 mt-6">Email</h2>
            <p className="body mt-2">For anything else: questions before you open an account, partnerships and data requests.</p>
            <a href={`mailto:${BRAND_SUPPORT_EMAIL}`} className="link mt-auto self-start pt-6 text-[16px]">
              {BRAND_SUPPORT_EMAIL}
            </a>
          </div>
          <div className="card flex flex-col p-6">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-s3 text-tx2">
              <Building2 size={20} aria-hidden />
            </span>
            <h2 className="t-h3 mt-6">Company</h2>
            <dl className="facts mt-3">
              <div>
                <dt>Legal entity</dt>
                <dd className="!font-medium !text-tx2">[to be provided by Kalks]</dd>
              </div>
              <div>
                <dt>Registered address</dt>
                <dd className="!font-medium !text-tx2">[to be provided by Kalks]</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section labelledBy="topics-title" className="sec-last">
        <SectionHead id="topics-title" kicker="HELP TOPICS" title="Find an answer now." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TOPICS.map((t) => (
            <Link key={t.t} href={t.href} className="card flex items-start justify-between gap-6 p-6">
              <span>
                <span className="block text-[16px] font-semibold">{t.t}</span>
                <span className="body mt-1 block !text-[14.5px]">{t.d}</span>
              </span>
              <ArrowUpRight size={18} className="mt-1 flex-none text-tx3" aria-hidden />
            </Link>
          ))}
        </div>
        <p className="mt-8 text-[14px] text-tx3">
          Legal documents:{' '}
          <Link href="/terms" className="link">
            Terms
          </Link>
          ,{' '}
          <Link href="/privacy" className="link">
            Privacy
          </Link>
          ,{' '}
          <Link href="/risk-warning" className="link">
            Risk warning
          </Link>{' '}
          and{' '}
          <Link href="/restricted-countries" className="link">
            Restricted countries
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
