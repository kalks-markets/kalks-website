import type { ReactNode } from 'react';
import { PageHero as SitePageHero } from '@/components/site/Heroes';
import { Btn } from '@/components/site/ui';
import { cn } from '@/lib/cn';

/* Presentation for the legal documents. The wording lives in each page file and is unchanged. Legal pages stay
   text-only: the typographic hero (black with an orange glow), the document in a dark card with the contents rail. */

export function PageHero({ kicker, title, lead }: { kicker?: string; title: ReactNode; lead?: ReactNode }) {
  return <SitePageHero photo={null} compact eyebrow={kicker ?? 'Legal'} title={title} lead={lead} />;
}

export function Section({ children, className }: { children: ReactNode; raised?: boolean; className?: string }) {
  return (
    <section className={cn('s-sec !pt-6', className)}>
      <div className="s-wrap">{children}</div>
    </section>
  );
}

export function CtaBanner({
  title,
  lead,
  primary,
  secondary,
}: {
  title: ReactNode;
  lead?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="s-sec !pt-0">
      <div className="s-wrap">
        <div className="s-cream flex flex-col gap-6 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-[clamp(26px,2.6vw,38px)] font-[450] leading-[1.05] tracking-[-0.035em]">{title}</h2>
            {lead && <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-[var(--s-cream-tx2)]">{lead}</p>}
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-none">
            {primary && <Btn href={primary.href}>{primary.label}</Btn>}
            {secondary && (
              <Btn href={secondary.href} variant="dark" icon={false}>
                {secondary.label}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
