import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ_GROUPS as GROUPS } from '@/content/faq';
import { BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { PageHero } from '@/components/site/Heroes';
import { Faq } from '@/components/site/ui';
import { RiskNote } from '@/components/ui/RiskNote';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers about Kalks accounts, USDT deposits and withdrawals, trading conditions, Kalks FX Options, prop challenges, copy trading, partners and the platform.',
  alternates: { canonical: '/faq' },
};

const LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GROUPS.flatMap((g) => g.items).map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        photo={null}
        compact
        eyebrow="FAQ"
        title={
          <>
            Questions, <span className="text-white/55">answered.</span>
          </>
        }
        lead="Accounts, funding, trading conditions, options, prop, copy trading, partners and the platform."
      />
      <section className="s-sec !pt-8" aria-label="Frequently asked questions">
        <div className="s-wrap grid grid-cols-1 gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="FAQ topics" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <ul className="no-sb -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
              {GROUPS.map((g, i) => (
                <li key={g.id} className="flex-none">
                  <a href={`#${g.id}`} className="s-chip lg:!h-auto lg:!border-0 lg:!px-0 lg:!py-1.5 lg:!text-[15px] lg:hover:!text-white">
                    <span className="hidden font-mono text-[11px] text-[var(--s-orange2)] lg:inline">{String(i + 1).padStart(2, '0')}</span>
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex min-w-0 flex-col gap-16">
            {GROUPS.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-28">
                <h2 className="mb-4 text-[clamp(26px,2.6vw,38px)] font-[450] tracking-[-0.035em]">{g.title}</h2>
                <Faq items={g.items} />
              </div>
            ))}
            <p className="text-[15px] text-[var(--s-tx2)]">
              Still have a question?{' '}
              <Link href="/contact" className="s-link">
                Contact us
              </Link>{' '}
              or write to{' '}
              <a href={`mailto:${BRAND_SUPPORT_EMAIL}`} className="s-link">
                {BRAND_SUPPORT_EMAIL}
              </a>
              .
            </p>
            <RiskNote options />
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    </>
  );
}
