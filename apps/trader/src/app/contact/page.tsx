import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Building2, Mail, MessageCircle } from 'lucide-react';
import { BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { CRM_URL } from '@/lib/crm';
import { PageHero } from '@/components/site/Heroes';
import { Btn, Head } from '@/components/site/ui';
import { Rise } from '@/components/site/Rise';

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
        photo="contact"
        compact
        eyebrow="Help & contact"
        title={
          <>
            We are here <span className="text-white/60">to help.</span>
          </>
        }
        lead="Clients get the fastest answers in the support chat inside the Client Area. Anyone can write to us by email."
      />

      <section className="s-sec" aria-label="Ways to reach us">
        <div className="s-wrap grid gap-4 lg:grid-cols-3">
          <Rise className="s-orange flex flex-col p-7 sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-white text-[var(--s-orange)]">
              <MessageCircle size={20} aria-hidden />
            </span>
            <h2 className="mt-8 text-[28px] font-[500] leading-none tracking-[-0.035em]">Support chat</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/88">
              Open the chat from any page of the Client Area. An instant help assistant answers common questions; our team takes over when you need a person.
            </p>
            <div className="mt-auto pt-8">
              <Btn href={`${CRM_URL}/support`} variant="light">
                Open support
              </Btn>
            </div>
          </Rise>
          <Rise delay={70} className="s-cream flex flex-col p-7 sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-[var(--s-cream-tx)] text-white">
              <Mail size={20} aria-hidden />
            </span>
            <h2 className="mt-8 text-[28px] font-[500] leading-none tracking-[-0.035em]">Email</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--s-cream-tx2)]">For anything else: questions before you open an account, partnerships and data requests.</p>
            <a href={`mailto:${BRAND_SUPPORT_EMAIL}`} className="mt-auto self-start pt-8 text-[17px] font-semibold underline decoration-[var(--s-orange)] decoration-2 underline-offset-4">
              {BRAND_SUPPORT_EMAIL}
            </a>
          </Rise>
          <Rise delay={140} className="s-card flex flex-col p-7 sm:p-8">
            <span className="grid size-12 place-items-center rounded-full bg-white/10 text-white">
              <Building2 size={20} aria-hidden />
            </span>
            <h2 className="mt-8 text-[28px] font-[500] leading-none tracking-[-0.035em]">Company</h2>
            <dl className="mt-5 flex flex-col gap-4 text-[14.5px]">
              <div>
                <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--s-tx3)]">Legal entity</dt>
                <dd className="mt-1 text-[var(--s-tx2)]">[to be provided by Kalks]</dd>
              </div>
              <div>
                <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--s-tx3)]">Registered address</dt>
                <dd className="mt-1 text-[var(--s-tx2)]">[to be provided by Kalks]</dd>
              </div>
            </dl>
          </Rise>
        </div>
      </section>

      <section className="s-sec !pt-4" aria-labelledby="topics-title">
        <div className="s-wrap">
          <Head id="topics-title" index="01" eyebrow="Help topics" title={<>Find an answer <span className="s-mute">now.</span></>} />
          <ul className="border-t border-[var(--s-line)]">
            {TOPICS.map((t, i) => (
              <Rise as="li" key={t.t} delay={i * 40} className="border-b border-[var(--s-line)]">
                <Link href={t.href} className="group grid items-center gap-2 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_44px] sm:gap-8">
                  <span className="text-[clamp(20px,2vw,28px)] font-[450] tracking-[-0.03em] transition-colors group-hover:text-[var(--s-orange2)]">{t.t}</span>
                  <span className="text-[15px] text-[var(--s-tx2)]">{t.d}</span>
                  <span className="hidden size-11 place-items-center rounded-full border border-[var(--s-line2)] transition-[background-color,transform] group-hover:rotate-45 group-hover:bg-[var(--s-orange)] sm:grid" aria-hidden>
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </Rise>
            ))}
          </ul>
          <p className="mt-10 text-[14px] text-[var(--s-tx3)]">
            Legal documents:{' '}
            <Link href="/terms" className="text-white/80 underline underline-offset-2 hover:text-white">
              Terms
            </Link>
            ,{' '}
            <Link href="/privacy" className="text-white/80 underline underline-offset-2 hover:text-white">
              Privacy
            </Link>
            ,{' '}
            <Link href="/risk-warning" className="text-white/80 underline underline-offset-2 hover:text-white">
              Risk warning
            </Link>{' '}
            and{' '}
            <Link href="/restricted-countries" className="text-white/80 underline underline-offset-2 hover:text-white">
              Restricted countries
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
