import type { ReactNode } from 'react';
import { ArrowDown } from 'lucide-react';
import { KalksLogo } from '@/components/brand/KalksLogo';
import { HEROES, type HeroKey } from '@/content/heroes';
import { cn } from '@/lib/cn';

/**
 * Home hero (founder 2026-10-10, RAZE reference): the figure on its own solid orange, the giant white KALKS wordmark
 * across it, a short line top-left, the round "Open account" button in the middle, "Scroll to explore" bottom-right,
 * dotted guide lines, and a three-column intro along the foot (who we are · what we do · get started).
 */
export function WordmarkHero({
  line,
  ring,
  side,
  intro,
}: {
  /** the short line top-left */
  line: ReactNode;
  /** the round button in the middle */
  ring: { href: string; label: ReactNode };
  /** under the line on the left (small facts) */
  side?: ReactNode;
  /** the three columns at the foot */
  intro: [ReactNode, ReactNode, ReactNode];
}) {
  const h = HEROES.home;
  return (
    <section className="s-whero" style={{ ['--hero-bg' as string]: h.bg }} aria-label="Kalks">
      <div className="s-guides" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={h.src} alt="" aria-hidden width={h.w} height={h.h} fetchPriority="high" className="s-whero-fig" />
      <h1 className="sr-only">Kalks: forex options, CFDs, copy trading and prop</h1>
      <KalksLogo className="s-whero-word" title="Kalks" />

      <div className="s-wrap relative z-[3] flex min-h-[max(760px,100svh)] flex-col pb-10 pt-[120px]">
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[26%_1fr_26%]">
          <div className="flex flex-col justify-between gap-8 lg:pe-6 lg:pt-[9vh]">
            <p className="max-w-[24ch] text-[15px] font-semibold leading-[1.9] text-white [text-shadow:0_1px_14px_rgba(80,10,0,0.35)]">{line}</p>
            {side && <div className="hidden text-[13px] font-medium text-white/90 lg:block">{side}</div>}
          </div>
          <div className="hidden justify-center lg:flex lg:items-end lg:pb-[3vh]">
            <a href={ring.href} className="s-ring" aria-label={typeof ring.label === 'string' ? ring.label : 'Open account'}>
              <span>{ring.label}</span>
            </a>
          </div>
          <div className="hidden items-end justify-end lg:flex lg:pb-[3vh]">
            <a href="#after-hero" className="flex flex-col items-center gap-1 text-[13px] font-semibold text-white">
              <ArrowDown size={18} aria-hidden />
              Scroll to explore
            </a>
          </div>
        </div>
        <div id="after-hero" className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-[26%_1fr_26%] lg:gap-0">
          <div className="lg:pe-8">{intro[0]}</div>
          <div className="lg:px-10">{intro[1]}</div>
          <div className="lg:ps-8">{intro[2]}</div>
        </div>
      </div>
    </section>
  );
}

/**
 * Inner-page hero (orange agency reference): eyebrow, a big two-tone headline, a lead, buttons and small facts on
 * the left; the page's figure on the right on its own solid colour; optional glass cards beside the figure.
 * `photo={null}` gives the typographic version (legal and help pages): black with an orange glow.
 */
export function PageHero({
  photo,
  eyebrow,
  title,
  lead,
  actions,
  facts,
  aside,
  children,
  compact,
}: {
  photo: HeroKey | null;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  facts?: ReactNode[];
  /** glass cards on the right, over the photo (desktop) */
  aside?: ReactNode;
  /** under the copy, still on the hero (e.g. a price strip) */
  children?: ReactNode;
  compact?: boolean;
}) {
  const h = photo ? HEROES[photo] : null;
  return (
    <section className={cn('s-phero', !h && 'flat')} style={h ? { ['--hero-bg' as string]: h.bg } : undefined}>
      {h && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={h.src} alt="" aria-hidden width={h.w} height={h.h} fetchPriority="high" className="s-phero-fig" />
      )}
      <div className={cn('s-wrap relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px]', compact ? 'pb-14 lg:pb-16' : 'min-h-[min(640px,78svh)] pb-16 lg:pb-24')}>
        <div className="flex flex-col justify-end">
          {eyebrow && <span className="s-eyebrow mb-6 !text-white/90">{eyebrow}</span>}
          <h1 className={cn('s-h1 max-w-[13ch] text-white [text-shadow:0_2px_30px_rgba(40,6,0,0.25)]', compact && '!text-[clamp(40px,5.6vw,80px)]')}>{title}</h1>
          {lead && <p className="mt-7 max-w-[54ch] text-[clamp(16px,1.3vw,19px)] leading-relaxed text-white/90">{lead}</p>}
          {actions && <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>}
          {facts && facts.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] font-medium text-white/85">
              {facts.map((f, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-white" aria-hidden /> {f}
                </span>
              ))}
            </div>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
        {aside && <div className="hidden flex-col justify-end gap-3 lg:flex">{aside}</div>}
      </div>
    </section>
  );
}

/** A small frosted card for the hero's right side (a number with a line, or anything short). */
export function HeroGlass({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('s-glass p-5 text-white', className)}>{children}</div>;
}
