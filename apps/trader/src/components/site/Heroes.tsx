import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { ArrowDown, ChevronsRight } from 'lucide-react';
import { HEROES, type HeroKey } from '@/content/heroes';
import { heroImage } from '@/content/pages';
import type { HeroCopy, HeroImage } from '@/lib/content';
import { cn } from '@/lib/cn';
import { IMAGES, ImageSlot } from './ImageSlot';
import { CountUp, Parallax } from './Motion';
import { Rise } from './Rise';
import { ThemedImage } from './ThemedImage';
import { Btn } from './ui';

/** the n-th step of the hero's load sequence (site.css .s-in, 120 ms apart) */
const step = (i: number) => ({ '--i': i }) as CSSProperties;

/** A headline that rises in word by word (the words themselves unchanged). */
function Words({ text }: { text: ReactNode }) {
  if (typeof text !== 'string') return <>{text}</>;
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="s-word" style={{ '--w': i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Home hero (founder 2026-10-30, REF-1, a dark premium fintech hero): everything centred on a vertical gradient,
 * black at the top to ember at the foot. The small facts as a monospace chip, the headline large, the subtext, the
 * buttons (square, monospace capitals; "Open account" in the orange with the ⌘ glyph), then the figure rising from
 * the foot and fading into the gradient, with light parallax. "Scroll to explore" is the small badge bottom-right.
 * The foot of the hero fades out into the page itself (founder 2026-10-31, a fintech reference), with three figures
 * from content/facts.ts counting up over the fade. Under it the band (the live prices), then the who-we-are intro
 * opens the light page (#after-hero is the first of them).
 * `image` is the hero photo from the content service (default HEROES.home); IMAGES.heroCutout, when set, replaces it.
 */
export function HomeHero({
  line,
  side,
  sub,
  actions,
  ring,
  band,
  intro,
  stats,
  image,
}: {
  /** the headline */
  line: ReactNode;
  /** the small facts, shown as the chip above the headline */
  side?: ReactNode;
  /** under the headline */
  sub?: ReactNode;
  /** the secondary buttons, before the main one */
  actions?: ReactNode;
  /** the main button */
  ring: { href: string; label: ReactNode };
  /** a full-bleed band between the hero and the intro (the live prices) */
  band?: ReactNode;
  /** the intro under the hero: its heading and its text */
  intro: [ReactNode, ReactNode];
  /** figures at the foot of the hero, counting up: the number, a label and a line under it */
  stats?: { v: number; l: ReactNode; sub?: ReactNode }[];
  image?: HeroImage;
}) {
  const h = image ?? heroImage('home');
  return (
    <>
      <section className="s-whero s-ref1" data-hero style={{ ['--hero-bg' as string]: h.bg ?? HEROES.home.bg }} aria-label="Kalks">
        <h1 className="sr-only">Kalks: forex options, CFDs, copy trading and prop</h1>
        <div className="s-wrap s-whero-copy">
          {side && (
            <a href="#after-hero" className="s-chip1 s-in" style={step(0)}>
              <i aria-hidden />
              <span>{side}</span>
              <ChevronsRight size={17} strokeWidth={2} aria-hidden />
            </a>
          )}
          <p className="s-whero-title">
            <Words text={line} />
          </p>
          {sub && (
            <p className="s-whero-sub s-in" style={step(2)}>
              {sub}
            </p>
          )}
          <div className="s-whero-acts s-in" style={step(3)}>
            {actions}
            <Btn href={ring.href}>{ring.label}</Btn>
          </div>
        </div>
        <div className="s-whero-media">
          {/* the cut-out ends right above the figures, so it stays put instead of drifting down over them */}
          <Parallax speed={IMAGES.heroCutout ? 0 : undefined}>
            <div className="s-in-img" style={step(4)}>
              <ImageSlot
                name="heroCutout"
                size="1602 × 981 px"
                ratio="1602 / 981"
                width={1602}
                height={981}
                className="s-whero-fig cut"
                priority
                fallback={<ThemedImage image={h} alt="" aria-hidden fetchPriority="high" className="s-whero-fig" />}
              />
            </div>
          </Parallax>
          <a href="#after-hero" className="s-whero-badge">
            <ArrowDown size={14} aria-hidden />
            Scroll to explore
          </a>
        </div>
        {stats && stats.length > 0 && (
          <div className="s-wrap s-whero-stats">
            {stats.map((st, i) => (
              <Rise key={i} delay={i * 120} className="s-whero-stat">
                <CountUp value={st.v} className="s-whero-num" />
                <p>
                  <b>{st.l}</b>
                  {st.sub && (
                    <>
                      <br />
                      {st.sub}
                    </>
                  )}
                </p>
              </Rise>
            ))}
          </div>
        )}
      </section>

      {band && (
        <div id="after-hero" className="scroll-mt-24">
          {band}
        </div>
      )}

      <section id={band ? undefined : 'after-hero'} className="s-sec scroll-mt-24 !pb-12 !pt-10 lg:!pb-16 lg:!pt-14" aria-label="Who we are">
        <div className="s-wrap grid items-start gap-8 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <Rise>{intro[0]}</Rise>
          <Rise delay={100}>{intro[1]}</Rise>
        </div>
      </section>
    </>
  );
}

/** The two-tone headline of a hero: the title, then its lighter second half. */
export function HeroTitle({ hero }: { hero: HeroCopy }) {
  return (
    <>
      {hero.title}
      {hero.accent && (
        <>
          {' '}
          <span className={hero.accentClass ?? 's-mute'}>{hero.accent}</span>
        </>
      )}
    </>
  );
}

/** The hero's buttons: the main one, and the second as a ghost. */
export function HeroActions({ hero }: { hero: HeroCopy }) {
  if (!hero.cta && !hero.cta2) return null;
  return (
    <>
      {hero.cta && <Btn href={hero.cta.href}>{hero.cta.label}</Btn>}
      {hero.cta2 && (
        <Btn href={hero.cta2.href} variant="ghost" icon={false}>
          {hero.cta2.label}
        </Btn>
      )}
    </>
  );
}

/**
 * Inner-page hero (REF-1 styling): the same black-to-ember gradient, the eyebrow as a monospace chip, the headline,
 * the lead at 70 %, square buttons and small facts, with the load sequence. The copy stays on the left because these
 * heroes carry glass cards and live boards on the right; the page's figure fades in behind them.
 * `hero` (from content/pages.ts, merged with the content service) gives the eyebrow, headline, lead, buttons and
 * photo; the separate props override it. `photo={null}` without `hero.image` gives the typographic version (legal
 * and help pages).
 */
export function PageHero({
  hero,
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
  hero?: HeroCopy;
  photo?: HeroKey | null;
  eyebrow?: ReactNode;
  title?: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  facts?: ReactNode[];
  /** glass cards on the right, over the photo (desktop) */
  aside?: ReactNode;
  /** under the copy, still on the hero (e.g. a price strip) */
  children?: ReactNode;
  compact?: boolean;
}) {
  const h: HeroImage | null = hero ? (hero.image ?? null) : photo ? heroImage(photo) : null;
  const eb = eyebrow ?? hero?.eyebrow;
  const ld = lead ?? hero?.subtitle;
  const act = actions ?? (hero && <HeroActions hero={hero} />);
  return (
    <section className={cn('s-phero s-ref1', !h && 'flat')} data-hero style={h?.bg ? { ['--hero-bg' as string]: h.bg } : undefined}>
      {h && <ThemedImage image={h} alt="" aria-hidden fetchPriority="high" className="s-phero-fig s-in-img" style={step(3)} />}
      <div className={cn('s-wrap relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_340px]', compact ? 'pb-14 lg:pb-20' : 'min-h-[min(640px,78svh)] pb-16 lg:pb-24')}>
        <div className="flex flex-col items-start justify-end">
          {eb && (
            <span className="s-chip1 s-in mb-7" style={step(0)}>
              <i aria-hidden />
              {eb}
            </span>
          )}
          <h1 className={cn('s-h1 s-in max-w-[14ch] text-white', compact && '!text-[clamp(40px,5.4vw,80px)]')} style={step(1)}>
            {title ?? (hero && <HeroTitle hero={hero} />)}
          </h1>
          {ld && (
            <p className="s-in mt-7 max-w-[56ch] text-[clamp(17px,1.4vw,21px)] leading-[1.5] text-white/70" style={step(2)}>
              {ld}
            </p>
          )}
          {act && (
            <div className="s-in mt-10 flex flex-wrap items-center gap-3 max-[479px]:w-full max-[479px]:flex-col max-[479px]:items-stretch" style={step(3)}>
              {act}
            </div>
          )}
          {facts && facts.length > 0 && (
            <div className="s-in mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] font-medium text-white/80" style={step(4)}>
              {facts.map((f, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-[1px] bg-white/85" aria-hidden /> {f}
                </span>
              ))}
            </div>
          )}
          {children && (
            <div className="s-in mt-10 w-full" style={step(5)}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="s-in hidden flex-col justify-end gap-3 lg:flex" style={step(4)}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

/** A small frosted card for the hero's right side (a number with a line, or anything short). */
export function HeroGlass({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('s-glass p-5 text-white', className)}>{children}</div>;
}
