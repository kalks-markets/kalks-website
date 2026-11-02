import type { ReactNode } from 'react';
import { Download } from 'lucide-react';
import { Rise } from '@/components/site/Rise';
import { Faq, LinkTiles, Steps, TextLink } from '@/components/site/ui';
import { cn } from '@/lib/cn';

/* Small building blocks for the platforms, copy trading, prop, partners and white-label pages. */

/** Eyebrow + title (Home's inline section heads), for split layouts; `index` is no longer shown. */
export function MiniHead({ eyebrow, title, id, lead, className }: { index: string; eyebrow: ReactNode; title: ReactNode; id?: string; lead?: ReactNode; className?: string }) {
  return (
    <div className={cn('flex flex-col items-start gap-5', className)}>
      <span className="s-eyebrow">{eyebrow}</span>
      <h2 id={id} className="s-h2">
        {title}
      </h2>
      {lead && <p className="s-lead">{lead}</p>}
    </div>
  );
}

/** FAQPage structured data for the questions shown on the page (string answers only). */
export function FaqSchema({ items }: { items: { q: string; a: ReactNode }[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.filter((i) => typeof i.a === 'string').map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

/** The questions block at the foot of a page: head and link on the left, the accordion on the right. */
export function FaqSection({ index, title, items, note, id = 'faq-title', top }: { index: string; title: ReactNode; items: { q: string; a: string }[]; note?: ReactNode; id?: string; /** after a banded section: keep the full top padding */ top?: boolean }) {
  return (
    <section className={cn('s-sec', !top && '!pt-4')} aria-labelledby={id}>
      <div className="s-wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr]">
        <Rise className="flex flex-col items-start gap-6">
          <MiniHead index={index} eyebrow="Questions" id={id} title={title} />
          <TextLink href="/faq">Every question, by topic</TextLink>
        </Rise>
        <Rise delay={100}>
          <Faq items={items} />
          <FaqSchema items={items} />
          {note && <div className="mt-8">{note}</div>}
        </Rise>
      </div>
    </section>
  );
}

/** Label / value rows in a card: small grey uppercase title, hairlines between rows. */
export function FactRows({ title, rows, className, note }: { title?: ReactNode; rows: [ReactNode, ReactNode][]; className?: string; note?: ReactNode }) {
  return (
    <div className={cn('s-card pad', className)}>
      {title && <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.09em] text-[var(--s-tx3)]">{title}</h3>}
      <dl>
        {rows.map(([k, v], i) => (
          <div key={i} className="grid gap-1 border-t border-[var(--s-line)] py-3.5 first:border-t-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] sm:gap-6">
            <dt className="text-[14px] text-[var(--s-tx3)]">{k}</dt>
            <dd className="min-w-0 text-[14.5px] font-medium leading-relaxed text-white [font-variant-numeric:tabular-nums]">{v}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-4 text-[12.5px] leading-relaxed text-[var(--s-tx3)]">{note}</p>}
    </div>
  );
}

/** Numbered steps (ui.tsx Steps: overlapping cards that open one at a time on a wide row). */
export function StepCards({ steps, className }: { steps: { t: string; d: ReactNode }[]; className?: string }) {
  return <Steps steps={steps} className={className} />;
}

/** Editorial numbered rows (Home's "Built for how you trade", without links). */
export function NumberedRows({ items, start = 1 }: { items: { t: ReactNode; d: ReactNode }[]; start?: number }) {
  return (
    <ol className="border-t border-[var(--s-line)]">
      {items.map((r, i) => (
        <Rise as="li" key={i} delay={(i % 4) * 50} className="border-b border-[var(--s-line)]">
          <div className="grid items-baseline gap-3 py-7 lg:grid-cols-[80px_minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-8">
            <span className="s-index">{String(start + i).padStart(2, '0')}</span>
            <span className="text-[clamp(20px,1.9vw,26px)] font-semibold leading-[1.2] tracking-[-0.025em]">{r.t}</span>
            <span className="text-[15.5px] leading-relaxed text-[var(--s-tx2)]">{r.d}</span>
          </div>
        </Rise>
      ))}
    </ol>
  );
}

/** Feature tiles: a short title and a line each, in a hairline grid inside one card. */
export function FeatureGrid({ items, cols = 'sm:grid-cols-2 lg:grid-cols-4' }: { items: [string, string][]; cols?: string }) {
  return (
    <Rise className="s-card overflow-hidden">
      <ul className={cn('grid gap-px bg-[var(--s-line)]', cols)}>
        {items.map(([t, d], i) => (
          <li key={t} className="flex flex-col gap-2 bg-[var(--s-ink)] p-6 lg:p-7">
            <span className="s-index">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.015em] text-white">{t}</h3>
            <p className="text-[14px] leading-relaxed text-[var(--s-tx2)]">{d}</p>
          </li>
        ))}
      </ul>
    </Rise>
  );
}

/** Links to the neighbouring pages, as service cards with the round arrow (ui.tsx LinkTiles). */
export function Related({ links, title = 'Keep exploring', top }: { links: { href: string; t: string; d: string }[]; title?: string; /** after a banded section: keep the top padding */ top?: boolean }) {
  return (
    <section className={cn('s-sec', top ? '!pt-16 lg:!pt-20' : '!pt-0')} aria-label={title}>
      <div className="s-wrap">
        <Rise className="mb-6 flex items-center gap-4">
          <span className="s-eyebrow">{title}</span>
        </Rise>
        <LinkTiles links={links} />
      </div>
    </section>
  );
}

/**
 * A plain download link styled as the site button (Btn routes same-site paths through next/link, which must not
 * fetch or prefetch an APK).
 */
export function DownloadBtn({ href, children, variant, className }: { href: string; children: ReactNode; variant?: 'light' | 'dark'; className?: string }) {
  return (
    <a href={href} download className={cn('s-btn', variant, className)}>
      {children}
      <span className="s-btn-ic" aria-hidden>
        <Download size={17} strokeWidth={2.2} />
      </span>
    </a>
  );
}

/** Small uppercase table header cell. */
export function Th({ children, right, className }: { children: ReactNode; right?: boolean; className?: string }) {
  return (
    <th scope="col" className={cn('px-5 pb-3 pt-5 text-[11.5px] font-semibold uppercase tracking-[0.09em] text-[var(--s-tx3)]', right ? 'text-end' : 'text-start', className)}>
      {children}
    </th>
  );
}
