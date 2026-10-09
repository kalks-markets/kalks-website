import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FactList } from '@/components/ui/Section';
import { cn } from '@/lib/cn';

/** A page section on the blue field: a white title, an optional line and action, then its content. */
export function Block({ id, title, intro, action, children, className }: { id?: string; title: ReactNode; intro?: ReactNode; action?: ReactNode; children?: ReactNode; className?: string }) {
  const hid = id ? `${id}-title` : undefined;
  return (
    <section id={id} className={cn('kx-sec scroll-mt-24', className)} aria-labelledby={hid}>
      <div className="kx-wrap">
        <div className="kx-head mb-8">
          <div>
            <h2 id={hid} className="kx-h2">
              {title}
            </h2>
            {intro && <p className="kx-intro">{intro}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}

/** White cards with a title and a sentence or two. */
export function InfoGrid({ items, cols = 3 }: { items: [ReactNode, ReactNode][]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2', cols === 3 && 'xl:grid-cols-3', cols === 4 && 'xl:grid-cols-4')}>
      {items.map(([t, d], i) => (
        <div key={i} className="kx-panel pad">
          <h3 className="text-[18px] font-semibold tracking-[-0.015em]">{t}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-[#4a5578]">{d}</p>
        </div>
      ))}
    </div>
  );
}

/** Label / value rows on a white card. */
export function FactPanel({ title, items }: { title?: string; items: [ReactNode, ReactNode][] }) {
  return (
    <div className="card p-6 sm:p-8">
      {title && <h3 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.09em] text-[#2447e0]">{title}</h3>}
      <FactList items={items} />
    </div>
  );
}

/** Links to related pages, as a row of white tiles. */
export function Related({ links }: { links: { href: string; t: string; d: string }[] }) {
  return (
    <section className="kx-sec" aria-label="Related pages">
      <div className="kx-wrap grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="kx-panel pad group flex flex-col gap-2 transition-transform hover:-translate-y-0.5">
            <span className="flex items-center justify-between text-[17px] font-semibold tracking-[-0.015em]">
              {l.t} <ArrowUpRight size={17} className="text-[#2447e0]" aria-hidden />
            </span>
            <span className="text-[14px] leading-relaxed text-[#4a5578]">{l.d}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** A closing white card with a line and the calls to action. */
export function CtaPanel({ title, text, children }: { title: ReactNode; text?: ReactNode; children: ReactNode }) {
  return (
    <section className="kx-sec" aria-label="Get started">
      <div className="kx-wrap">
        <div className="kx-panel flex flex-col items-start justify-between gap-6 p-7 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-[clamp(28px,3vw,40px)] font-semibold leading-[1.05] tracking-[-0.035em]">{title}</h2>
            {text && <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed text-[#4a5578]">{text}</p>}
          </div>
          <div className="flex flex-wrap gap-3">{children}</div>
        </div>
      </div>
    </section>
  );
}
