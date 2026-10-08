import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** A page section on the canvas: 1440 max, page gutters, the standard top rhythm. */
export function Section({
  id,
  children,
  className,
  label,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} className={cn('sec scroll-mt-28', className)} aria-label={label} aria-labelledby={labelledBy}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Mono kicker in red, a wide display headline (ends with a full stop), an optional one-line lede on the right. */
export function SectionHead({
  id,
  kicker,
  title,
  lede,
  action,
  className,
}: {
  id?: string;
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('sec-h', className)}>
      <div>
        {kicker && <span className="kicker">{kicker}</span>}
        <h2 id={id} className="d t-h2">
          {title}
        </h2>
      </div>
      {(lede || action) && (
        <div className="flex flex-col items-start gap-5">
          {lede && <p>{lede}</p>}
          {action}
        </div>
      )}
    </div>
  );
}

/** Label / value rows. */
export function FactList({ items, className }: { items: [ReactNode, ReactNode][]; className?: string }) {
  return (
    <dl className={cn('facts', className)}>
      {items.map(([k, v], i) => (
        <div key={i}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Numbered steps in cards. */
export function Steps({ steps, className }: { steps: { t: string; d: ReactNode }[]; className?: string }) {
  return (
    <ol className={cn('grid gap-4 md:grid-cols-2 xl:grid-cols-4', className)}>
      {steps.map((s, i) => (
        <li key={s.t} className="card flex flex-col gap-4 p-6">
          <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3 className="t-h3">{s.t}</h3>
            <p className="body mt-2">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Small feature card: title + one or two sentences. */
export function Feature({ t, d, icon, className }: { t: string; d: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <div className={cn('card flex flex-col gap-3 p-6', className)}>
      {icon && <span className="grid h-10 w-10 place-items-center rounded-xl bg-s3 text-tx2 [&_svg]:h-5 [&_svg]:w-5">{icon}</span>}
      <h3 className="t-h3 !text-[18px]">{t}</h3>
      <p className="body !text-[14.5px]">{d}</p>
    </div>
  );
}
