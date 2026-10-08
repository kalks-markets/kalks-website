import type { ReactNode } from 'react';
import { Hero } from '@/components/ui/Hero';
import { Btn } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/* Presentation for the legal documents (Kalks 2). The wording lives in each page file and is unchanged. */

export function PageHero({ kicker, title, lead }: { kicker?: string; title: ReactNode; lead?: ReactNode }) {
  return <Hero tone="plain" compact kicker={kicker?.toUpperCase()} title={title} lede={lead} style={{ ['--h1' as string]: 'clamp(38px, 4.4vw, 60px)', ['--h1-s' as string]: '36px' }} />;
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
