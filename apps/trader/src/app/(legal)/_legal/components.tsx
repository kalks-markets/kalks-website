import type { ReactNode } from 'react';
import { PageHero as KxPageHero } from '@/components/kx/PageHero';
import { Btn } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/* Presentation for the legal documents. The wording lives in each page file and is unchanged. Legal pages stay text-only:
   a short hero on the blue field, the document on a white card. */

export function PageHero({ kicker, title, lead }: { kicker?: string; title: ReactNode; lead?: ReactNode }) {
  return <KxPageHero short kicker={kicker} title={title} lede={lead} />;
}

export function Section({ children, className }: { children: ReactNode; raised?: boolean; className?: string }) {
  return (
    <section className={cn('sec', className)}>
      <div className="wrap">{children}</div>
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
    <section className="sec">
      <div className="wrap">
        <div className="card flex flex-col gap-6 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="d t-h2 !text-[clamp(26px,2.6vw,36px)]">{title}</h2>
            {lead && <p className="body mt-3 max-w-xl">{lead}</p>}
          </div>
          <div className="flex flex-wrap gap-3 lg:flex-none">
            {primary && (
              <Btn href={primary.href} v="red" arrow>
                {primary.label}
              </Btn>
            )}
            {secondary && (
              <Btn href={secondary.href} v="ghost">
                {secondary.label}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
