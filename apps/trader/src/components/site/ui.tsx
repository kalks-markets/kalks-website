import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Rise } from './Rise';

/* ─────────────────────────────────────────────────────────────── buttons */

type BtnVariant = 'primary' | 'ghost' | 'light' | 'dark';
/**
 * Pill button with the arrow in a white circle (Formix style). Hand-offs to the Client Area (/auth/*) and external
 * URLs are plain anchors so the redirect and the campaign forwarder keep query strings; site pages use Link.
 */
export function Btn({ href, children, variant = 'primary', size, icon = true, className }: { href: string; children: ReactNode; variant?: BtnVariant; size?: 'sm'; icon?: boolean; className?: string }) {
  const cls = cn('s-btn', variant !== 'primary' && variant, size, !icon && 'no-ic', className);
  const inner = (
    <>
      {children}
      {icon && (
        <span className="s-btn-ic" aria-hidden>
          <ArrowUpRight size={size === 'sm' ? 15 : 17} strokeWidth={2.2} />
        </span>
      )}
    </>
  );
  // hand-offs, files (the APK under /download/) and external links are plain anchors: no client routing or prefetch
  const plain = href.startsWith('/auth/') || href.startsWith('/download/') || /^(https?:|mailto:|tel:|#)/.test(href);
  return plain ? (
    <a href={href} className={cls} {...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener' } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const plain = href.startsWith('/auth/') || /^(https?:|mailto:|#)/.test(href);
  const inner = (
    <>
      {children} <ArrowUpRight size={15} aria-hidden />
    </>
  );
  return plain ? (
    <a href={href} className={cn('s-link', className)}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cn('s-link', className)}>
      {inner}
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────── headings */

/**
 * Section head: an index ("01") and eyebrow on one line, a two-tone title (pass <span className="s-mute"> or
 * "s-hot" inside), an optional lead and an action on the right.
 */
export function Head({
  index,
  eyebrow,
  title,
  lead,
  action,
  center,
  id,
  className,
}: {
  index?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  center?: boolean;
  id?: string;
  className?: string;
}) {
  return (
    <Rise className={cn('mb-12 flex flex-col gap-6 lg:mb-16', !center && 'lg:flex-row lg:items-end lg:justify-between', center && 'items-center text-center', className)}>
      <div className={cn('flex flex-col gap-5', center && 'items-center')}>
        {(index || eyebrow) && (
          <div className="flex items-center gap-4">
            {index && <span className="s-index">{index}</span>}
            {eyebrow && <span className="s-eyebrow">{eyebrow}</span>}
          </div>
        )}
        <h2 id={id} className="s-h2 max-w-[18ch]">
          {title}
        </h2>
        {lead && <p className={cn('s-lead', center && 'mx-auto')}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Rise>
  );
}

/* ─────────────────────────────────────────────────────────────── lists */

export function Checks({ items, className, tone = 'dark' }: { items: ReactNode[]; className?: string; tone?: 'dark' | 'cream' }) {
  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {items.map((it, i) => (
        <li key={i} className={cn('flex items-start gap-3 text-[15px] leading-relaxed', tone === 'cream' ? 'text-[var(--s-cream-tx2)]' : 'text-[var(--s-tx2)]')}>
          <span className={cn('s-check mt-0.5', tone === 'cream' && '!bg-[rgba(242,96,12,0.14)] !text-[var(--s-orange)]')}>
            <Check size={13} strokeWidth={3} aria-hidden />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────────────────────────────────────────────────────── bento */

export type BentoTone = 'cream' | 'orange' | 'glass';
/** A bento card: cream (dark text), orange or dark glass, with the round arrow in the corner when it links. */
export function BentoCard({ tone = 'cream', href, kicker, title, text, children, className, delay }: { tone?: BentoTone; href?: string; kicker?: ReactNode; title: ReactNode; text?: ReactNode; children?: ReactNode; className?: string; delay?: number }) {
  const cls = cn('s-bento-card', tone === 'cream' ? 's-cream' : tone === 'orange' ? 's-orange' : 's-card', className);
  const muted = tone === 'cream' ? 'text-[var(--s-cream-tx2)]' : tone === 'orange' ? 'text-white/85' : 'text-[var(--s-tx2)]';
  const body = (
    <>
      {href && (
        <span className="s-arrow" aria-hidden>
          <ArrowUpRight size={17} strokeWidth={2.2} />
        </span>
      )}
      {kicker && <div className={cn('mb-3 text-[12.5px] font-semibold uppercase tracking-[0.08em]', tone === 'cream' ? 'text-[var(--s-orange)]' : tone === 'orange' ? 'text-white/80' : 'text-[var(--s-orange2)]')}>{kicker}</div>}
      <h3 className="max-w-[16ch] pe-10 text-[clamp(24px,2.3vw,32px)] font-[500] leading-[1.02] tracking-[-0.035em]">{title}</h3>
      {children && <div className="mt-6 flex-1">{children}</div>}
      {text && <p className={cn('mt-auto pt-8 text-[14.5px] leading-relaxed', muted)}>{text}</p>}
    </>
  );
  return (
    <Rise delay={delay} className="h-full">
      {href ? (
        <Link href={href} className={cn(cls, 'h-full')}>
          {body}
        </Link>
      ) : (
        <div className={cn(cls, 'h-full')}>{body}</div>
      )}
    </Rise>
  );
}

/* ─────────────────────────────────────────────────────────────── stats */

/** Big light numbers with an orange rule under each (the agency reference's strip). */
export function StatStrip({ items, className, size }: { items: { v: ReactNode; l: ReactNode; sub?: ReactNode }[]; className?: string; size?: 'lg' | 'md' }) {
  // long values ("$10,000", "1:1000") get the smaller size so neighbours never collide
  const longest = Math.max(...items.map((s) => (typeof s.v === 'string' || typeof s.v === 'number' ? String(s.v).length : 4)));
  const md = size ? size === 'md' : longest > 5;
  return (
    <div className={cn('grid grid-cols-2 gap-x-8 gap-y-12', items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3', className)}>
      {items.map((s, i) => (
        <Rise key={i} delay={i * 80} className="flex flex-col">
          <div className={cn('s-num whitespace-nowrap text-white', md ? 'text-[clamp(40px,4.4vw,68px)]' : 'text-[clamp(48px,6vw,92px)]')}>{s.v}</div>
          <div className="mt-5 flex items-center gap-2 text-[13.5px] font-medium text-[var(--s-tx2)]">
            <span className="s-dot" aria-hidden /> {s.l}
          </div>
          <div className="s-rule mt-4" />
          {s.sub && <div className="mt-3 text-[12.5px] leading-relaxed text-[var(--s-tx3)]">{s.sub}</div>}
        </Rise>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── faq */

/** Questions as an accordion (plain <details>, works without JS). */
export function Faq({ items, className }: { items: { q: string; a: ReactNode }[]; className?: string }) {
  return (
    <div className={cn('s-faq', className)}>
      {items.map((it) => (
        <details key={it.q}>
          <summary>
            {it.q}
            <i aria-hidden>
              <Plus size={16} />
            </i>
          </summary>
          <div className="s-faq-a">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── closing call to action */

/**
 * The closing band on every page: a big two-tone line, the two buttons, and a row of small facts. On an orange panel
 * with a soft glow, the figure of the page's hero on the right (optional).
 */
export function Cta({ title, sub, primary, secondary, facts, image }: { title: ReactNode; sub?: ReactNode; primary: { href: string; label: string }; secondary?: { href: string; label: string }; facts?: string[]; image?: { src: string; w: number; h: number } }) {
  return (
    <section className="s-sec" aria-label="Get started">
      <div className="s-wrap">
        <Rise className="s-orange relative overflow-hidden px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,200,140,0.55),transparent_65%)]" />
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.src}
              alt=""
              aria-hidden
              width={image.w}
              height={image.h}
              loading="lazy"
              className="pointer-events-none absolute bottom-0 right-0 hidden h-[115%] w-auto max-w-none opacity-90 mix-blend-multiply [mask-image:linear-gradient(90deg,transparent,#000_35%)] lg:block"
            />
          )}
          <div className="relative max-w-[640px]">
            <h2 className="s-h2 !text-white">{title}</h2>
            {sub && <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-white/88">{sub}</p>}
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn href={primary.href} variant="light">
                {primary.label}
              </Btn>
              {secondary && (
                <Btn href={secondary.href} variant="ghost" icon={false}>
                  {secondary.label}
                </Btn>
              )}
            </div>
            {facts && (
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] font-medium text-white/85">
                {facts.map((f) => (
                  <span key={f} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-white" aria-hidden /> {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Rise>
      </div>
    </section>
  );
}
