import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import Link from 'next/link';
import { Faq } from '@/components/ui/Faq';
import { RiskNote } from '@/components/ui/RiskNote';
import { FAQ_GROUPS as GROUPS } from '@/content/faq';
import { BRAND_SUPPORT_EMAIL } from '@/lib/brand';

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
        kicker="FAQ"
        title="Questions, answered."
        lede="Accounts, funding, trading conditions, options, prop, copy trading, partners and the platform."
        photo="faq"
      />
      <section className="sec sec-last" aria-label="Frequently asked questions">
        <div className="wrap grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="no-sb -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
              {GROUPS.map((g) => (
                <li key={g.id} className="flex-none">
                  <a href={`#${g.id}`} className="chip lg:!h-auto lg:!bg-transparent lg:!px-0 lg:!py-1.5 lg:!text-[14px] lg:hover:!text-tx">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-12">
            {GROUPS.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-28">
                <h2 className="d-wide mb-2 text-[22px]">{g.title}</h2>
                <Faq items={g.items} />
              </div>
            ))}
            <p className="text-[14.5px] text-tx2">
              Still have a question?{' '}
              <Link href="/contact" className="link">
                Contact us
              </Link>{' '}
              or write to{' '}
              <a href={`mailto:${BRAND_SUPPORT_EMAIL}`} className="link">
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
