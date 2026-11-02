import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, Command, Plus } from 'lucide-react';
import type { SiteImage } from '@/lib/content';
import { cn } from '@/lib/cn';
import { Rise } from './Rise';
// the home page's blocks (the outlined figure, the closing band of dots), which the menu pages share (founder 2026-11-02)
import './home/home.css';

/* ─────────────────────────────────────────────────────────────── buttons */

type BtnVariant = 'primary' | 'ghost' | 'light' | 'dark' | 'deep';
/**
 * One button (site.css): a pill with its arrow in a round disc on the right (founder 2026-11-01, Formix reference);
 * inside the home hero (.s-ref1) a REF-1 square in monospace capitals, the main one with the ⌘ glyph. Hand-offs to the
 * Client Area (/auth/*) and external URLs are plain anchors so the redirect and the campaign forwarder keep query
 * strings; site pages use Link.
 */
export function Btn({ href, children, variant = 'primary', size, icon = true, className }: { href: string; children: ReactNode; variant?: BtnVariant; size?: 'sm'; icon?: boolean; className?: string }) {
  const cls = cn('s-btn', variant !== 'primary' && variant, size, !icon && 'no-ic', className);
  const inner = (
    <>
      {variant === 'primary' && (
        <span className="s-btn-cmd" aria-hidden>
          <Command size={size === 'sm' ? 15 : 17} strokeWidth={2} />
        </span>
      )}
      {children}
      {icon && (
        <span className="s-btn-ic" aria-hidden>
          <ArrowUpRight size={size === 'sm' ? 16 : 18} strokeWidth={2.2} />
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
 * Pill label above a heading: an orange dot (or a small icon) and the label. `index`, the section's number, stays on
 * the call sites but is no longer shown (minimalist pass, founder 2026-11-01).
 */
export function Label({ children, icon, className }: { index?: string; children?: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <span className={cn('s-label', className)}>
      {icon ? (
        <span className="s-label-ic" aria-hidden>
          {icon}
        </span>
      ) : (
        <i className="s-label-dot" aria-hidden />
      )}
      {children}
    </span>
  );
}

/**
 * Section head (REF-2): the pill label, a two-tone title (the <span className="s-mute"> or "s-hot"
 * phrase inside turns orange), an optional lead and the action under it, centred. `align="left"` keeps it left with
 * the action on the right, for split layouts.
 */
export function Head({
  index,
  eyebrow,
  title,
  lead,
  action,
  align = 'center',
  id,
  className,
}: {
  index?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  align?: 'center' | 'left';
  /** kept for older call sites: centred is the default now */
  center?: boolean;
  id?: string;
  className?: string;
}) {
  const left = align === 'left';
  return (
    <Rise className={cn('s-head mb-12 flex flex-col gap-6 lg:mb-16', left ? 'lg:flex-row lg:items-end lg:justify-between' : 'items-center text-center', className)}>
      <div className={cn('flex flex-col gap-6', !left && 'items-center')}>
        {(index || eyebrow) && <Label index={index}>{eyebrow}</Label>}
        <h2 id={id} className={cn('s-h2', left ? 'max-w-[18ch]' : 'max-w-[20ch]')}>
          {title}
        </h2>
        {lead && <p className={cn('s-lead', !left && 'mx-auto')}>{lead}</p>}
      </div>
      {action && <div className={cn('shrink-0', !left && 'pt-2')}>{action}</div>}
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

/**
 * Numbered steps as the home page's quiet dark cards (founder 2026-11-02): the number in an orange disc, the title and
 * the line; side by side on a wide row, one under the other in a narrow column.
 */
export function Steps({ steps, className }: { steps: { t: string; d: ReactNode }[]; className?: string }) {
  return (
    <div className={cn('s-steps', className)}>
      <ol style={{ ['--n' as string]: steps.length }}>
        {steps.map((s, i) => (
          <Rise as="li" key={s.t} delay={i * 70} className="s-step">
            <div className="rf-card">
              <span className="s-step-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          </Rise>
        ))}
      </ol>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── bento */

export type BentoTone = 'cream' | 'orange' | 'glass';
/**
 * A bento card as the home page's quiet dark card (founder 2026-11-02): a hairline, the kicker in orange, a bold title,
 * the round arrow in the corner when it links. `tone` stays on the call sites; "orange" marks the featured card with an
 * orange hairline.
 */
export function BentoCard({ tone = 'cream', href, kicker, title, text, children, className, delay }: { tone?: BentoTone; href?: string; kicker?: ReactNode; title: ReactNode; text?: ReactNode; children?: ReactNode; className?: string; delay?: number }) {
  const cls = cn('s-bento-card s-card', tone === 'orange' && 'hot', className);
  const body = (
    <>
      {href && (
        <span className="s-arrow" aria-hidden>
          <ArrowUpRight size={19} strokeWidth={2.2} />
        </span>
      )}
      {kicker && <div className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--s-orange2)]">{kicker}</div>}
      <h3 className="max-w-[18ch] pe-12 text-[clamp(21px,1.9vw,26px)] font-semibold leading-[1.18] tracking-[-0.025em]">{title}</h3>
      {children && <div className="mt-6 flex-1">{children}</div>}
      {text && <p className="mt-auto pt-8 text-[14.5px] leading-relaxed text-[var(--s-tx2)]">{text}</p>}
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

/**
 * Links to neighbouring pages as service cards: the title at the top, the round arrow in the corner, the line at the
 * foot; quiet dark cards, as on the home page (founder 2026-11-02).
 */
export function LinkTiles({ links, className }: { links: { href: string; t: string; d: string }[]; className?: string }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {links.map((l, i) => (
        <BentoCard key={l.href + l.t} tone="glass" href={l.href} title={l.t} text={l.d} delay={i * 60} className="s-svc" />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── stats */

/**
 * Figures as the home page's tiles (founder 2026-11-02): quiet dark cards, the figure as an outlined 3D numeral
 * (home.css .rf-3d), its label and the note under it, centred. On two columns an odd last card takes the whole row.
 */
export function StatStrip({ items, className, size }: { items: { v: ReactNode; l: ReactNode; sub?: ReactNode }[]; className?: string; size?: 'lg' | 'md' }) {
  // long values ("$10,000", "1:1000") get the smaller size so neighbours never collide
  const longest = Math.max(...items.map((s) => (typeof s.v === 'string' || typeof s.v === 'number' ? String(s.v).length : 4)));
  const md = size ? size === 'md' : longest > 5;
  const n = items.length;
  return (
    <div className={cn('grid grid-cols-2 gap-3 sm:gap-4 max-lg:[&>*:last-child:nth-child(odd)]:col-span-2', n >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3', className)}>
      {items.map((s, i) => (
        <Rise key={i} delay={i * 80} className="h-full">
          <div className="s-stat rf-card h-full">
            <span className={cn('rf-3d', md && 'md')}>{s.v}</span>
            <div className="s-stat-l">{s.l}</div>
            {s.sub && <div className="s-stat-sub">{s.sub}</div>}
          </div>
        </Rise>
      ))}
    </div>
  );
}

/**
 * Figures as tiles (founder 2026-11-01, reference: feature cards): the label in small capitals on top, the figure, the
 * note at the bottom. A tile with an href links, with the arrow in its corner; `accent` is the one bright orange tile.
 */
export function StatTiles({ items, className }: { items: { v: ReactNode; l: ReactNode; sub?: ReactNode; href?: string; accent?: boolean }[]; className?: string }) {
  return (
    <div className={cn('grid grid-cols-2 gap-5', items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3', className)}>
      {items.map((s, i) => {
        const cls = cn('s-tile flex h-full min-h-[190px] flex-col p-5 sm:p-6 lg:min-h-[250px] lg:p-7', s.accent && 'accent');
        const body = (
          <>
            {/* below lg two tiles share a row: the label keeps two lines and the figure follows it, so the figures line up */}
            <div className="s-tile-k min-h-[2.4em] lg:min-h-0">{s.l}</div>
            <div className="s-num whitespace-nowrap pt-5 text-[clamp(30px,4vw,60px)] text-[rgb(var(--fg))] lg:mt-auto lg:pt-8">{s.v}</div>
            <div className="mt-3 flex items-end justify-between gap-3">
              {s.sub && <div className="text-[13px] leading-relaxed text-[rgb(var(--fg)/0.6)]">{s.sub}</div>}
              {s.href && (
                <span className="s-tile-go -mb-2 -me-2" aria-hidden>
                  <ArrowRight size={22} strokeWidth={2.4} />
                </span>
              )}
            </div>
          </>
        );
        return (
          <Rise key={i} delay={i * 80} className="h-full">
            {!s.href ? (
              <div className={cls}>{body}</div>
            ) : s.href.startsWith('/auth/') ? (
              <a href={s.href} className={cls}>
                {body}
              </a>
            ) : (
              <Link href={s.href} className={cls}>
                {body}
              </Link>
            )}
          </Rise>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────── faq */

/** Questions as an accordion (plain <details>, works without JS). */
export function Faq({ items, className }: { items: { q: string; a: ReactNode }[]; className?: string }) {
  return (
    <div className={cn('s-faq', className)}>
      {items.map((it) => (
        <details key={it.q} className="rf-card">
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
 * The closing band on every menu page, the home page's (home/HomeBlocks.tsx CtaBand, founder 2026-11-02): fields of
 * orange dots along the top and bottom edges, one card in the middle with the headline (its <span> phrase in the
 * orange), the line under it and the buttons, one under the other. A dark island in both themes. `facts` and `image`
 * are still accepted from older call sites; the band shows neither.
 */
export function Cta({ title, sub, primary, secondary }: { title: ReactNode; sub?: ReactNode; primary: { href: string; label: string }; secondary?: { href: string; label: string }; facts?: string[]; image?: { src: string; w: number; h: number } | SiteImage }) {
  return (
    <section className="rf-cta s-isl" aria-labelledby="cta-title">
      <i className="rf-cta-dots" aria-hidden />
      <div className="s-wrap">
        <Rise className="rf-cta-card s-cta-card">
          <h2 id="cta-title" className="rf-h2">
            {title}
          </h2>
          {sub && <p className="rf-cta-sub">{sub}</p>}
          <div className="s-cta-acts">
            <Btn href={primary.href} className="rf-cta-btn">
              {primary.label}
            </Btn>
            {secondary && (
              <Btn href={secondary.href} variant="ghost" icon={false} className="rf-cta-btn">
                {secondary.label}
              </Btn>
            )}
          </div>
        </Rise>
      </div>
    </section>
  );
}

/** The Kalks K in 3D (rendered with three.js from public/brand/kalks-mark.svg, scripts/render-3d) */
export const K3D = { src: '/site/3d/k-mark.webp', w: 1200, h: 1000 };
