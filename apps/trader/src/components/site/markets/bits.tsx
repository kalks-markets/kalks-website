import type { ReactNode } from 'react';
import { Rise } from '@/components/site/Rise';
import { LinkTiles, Steps } from '@/components/site/ui';
import { INSTRUMENTS, OPTIONS } from '@/content/facts';
import { cn } from '@/lib/cn';

/** Eyebrow + title for split layouts (Home's inline section heads); `index` is no longer shown. */
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

/** Label / value rows in a card: small grey uppercase title, hairlines between rows. */
export function FactTable({ title, rows, className, note }: { title?: ReactNode; rows: [ReactNode, ReactNode][]; className?: string; note?: ReactNode }) {
  return (
    <div className={cn('s-card pad', className)}>
      {title && <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.09em] text-[var(--s-tx3)]">{title}</h3>}
      <dl>
        {rows.map(([k, v], i) => (
          <div key={i} className="grid gap-1 border-t border-[var(--s-line)] py-3.5 first:border-t-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] sm:gap-6">
            <dt className="text-[14px] text-[var(--s-tx3)]">{k}</dt>
            <dd className="text-[14.5px] font-medium leading-relaxed text-white [font-variant-numeric:tabular-nums]">{v}</dd>
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

/** Editorial numbered rows (Home's "Built for how you trade" without links). */
export function NumberedRows({ items, start = 1, compact }: { items: { t: ReactNode; d: ReactNode; tag?: ReactNode }[]; start?: number; compact?: boolean }) {
  return (
    <ol className="border-t border-[var(--s-line)]">
      {items.map((r, i) => (
        <Rise as="li" key={i} delay={i * 50} className="border-b border-[var(--s-line)]">
          <div className={cn('grid items-baseline gap-3 py-7', compact ? 'sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-x-6' : 'lg:grid-cols-[80px_minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-8')}>
            <span className="s-index">{String(start + i).padStart(2, '0')}</span>
            <span className="flex flex-wrap items-center gap-3 text-[clamp(20px,1.9vw,26px)] font-semibold leading-[1.2] tracking-[-0.025em]">
              {r.t}
              {r.tag}
            </span>
            <span className={cn('text-[15.5px] leading-relaxed text-[var(--s-tx2)]', compact && 'sm:col-start-2')}>{r.d}</span>
          </div>
        </Rise>
      ))}
    </ol>
  );
}

/** Small link cards (related pages), as service cards (ui.tsx LinkTiles). */
export function LinkCards({ links, className }: { links: { href: string; t: string; d: string }[]; className?: string }) {
  return <LinkTiles links={links} className={className} />;
}

/** FAQPage structured data for a page's questions (plain-text answers only). */
export function FaqSchema({ items }: { items: { q: string; a: unknown }[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.filter((i) => typeof i.a === 'string').map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

/** The asset-class pages, with counts from facts. */
export const MARKET_PAGES = [
  { href: '/markets/forex', t: 'Forex', d: `${INSTRUMENTS.byClass.forex.live} currency pairs, majors to exotics.` },
  { href: '/markets/metals-energies', t: 'Metals & energies', d: 'Gold, silver, oil and gas.' },
  { href: '/markets/indices', t: 'Indices', d: `${INSTRUMENTS.byClass.indices.live} stock indices from the US, Europe and Asia.` },
  { href: '/markets/crypto', t: 'Crypto', d: `${INSTRUMENTS.byClass.crypto.live} coins, around the clock.` },
  { href: '/markets', t: 'Every market', d: `Search all ${INSTRUMENTS.total.toLocaleString('en-US')} markets with live prices.` },
  { href: '/options', t: 'FX Options', d: `Calls and puts on ${OPTIONS.fxPairsLive} FX pairs, gold, silver and oil.` },
];
