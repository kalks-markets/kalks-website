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

/** the big line of the lockup holds the last words up to about this many characters ("trading platform.") */
const BIG_CHARS = 18;

/**
 * The home headline as a poster lockup (founder 2026-11-02, an editorial poster reference): line one an italic serif
 * clause and a heavy sans phrase, centred (founder 2026-11-02: no hairline); line two the last words, huge, in a tall
 * condensed serif.
 * Split from the text itself, since the Back Office can edit it: the big line takes the last words that fit
 * BIG_CHARS, the words before them break after their last comma (italic before, heavy after), or after the first
 * half when there is none. The orange marks (founder 2026-11-02, "too simple"): the italic clause's last word, an
 * ampersand, the closing full stop. The words still rise in one by one.
 */
function Lockup({ text }: { text: ReactNode }) {
  if (typeof text !== 'string') return <>{text}</>;
  const words = text.trim().split(/\s+/);
  let big = 1;
  while (big < words.length - 2 && words.slice(-(big + 1)).join(' ').length <= BIG_CHARS) big++;
  if (words.length - big < 2) return <Words text={text} />;
  const rest = words.slice(0, -big);
  let cut = Math.floor(rest.length / 2);
  for (let i = rest.length - 2; i >= 0; i--) {
    if (rest[i].endsWith(',')) {
      cut = i + 1;
      break;
    }
  }
  let n = 0;
  const run = (ws: string[], tone: (w: string, i: number) => string | undefined = () => undefined, stop = false) =>
    ws.map((w, i) => (
      <Fragment key={i}>
        <span className={cn('s-word', tone(w, i))} style={{ '--w': n++ } as CSSProperties}>
          {stop && i === ws.length - 1 && /[.!]$/.test(w) ? (
            <>
              {w.slice(0, -1)}
              <span className="s-lock-dot">{w.slice(-1)}</span>
            </>
          ) : (
            w
          )}
        </span>
        {i < ws.length - 1 && ' '}
      </Fragment>
    ));
  const italic = rest.slice(0, cut);
  return (
    <span className="s-lock">
      <span className="s-lock-top">
        <em>{run(italic, (_, i) => (i === italic.length - 1 ? 's-lock-hot' : undefined))}</em>{' '}
        <b>{run(rest.slice(cut), (w) => (w === '&' ? 's-lock-amp' : undefined))}</b>
      </span>
      <span className="s-lock-big">{run(words.slice(-big), undefined, true)}</span>
    </span>
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
            <Lockup text={line} />
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

/** a hero photo's backdrop is dark (the duotoned ones) when its luminance is low */
function darkBg(hex?: string) {
  const m = hex && /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  if (!m) return false;
  const [r, g, b] = m.slice(1).map((c) => (parseInt(c, 16) / 255) ** 2.2);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.06;
}

/** The page's small facts in one quiet row under the hero, hairlines between them (minimalist pass, 2026-11-01). */
export function FactBand({ items }: { items: ReactNode[] }) {
  return (
    <div className="s-wrap">
      <ul className="s-facts" aria-label="At a glance">
        {items.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Inner-page hero (founder 2026-11-01, two references: Formix, an orange agency page, and Hype On, a dark one with a
 * glowing horizon): a rounded panel inset from the window, on the photo's own backdrop with the Kalks orange rising
 * from the lower left, the figure in full colour on the right. The eyebrow as a hairline pill, a large light
 * headline, the lead, pill buttons; the cards in `aside` stand at the lower right (the first cream, the rest glass).
 * Under the panel the facts in one quiet row. Without a photo the panel is black with the glowing horizon.
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
  const tone = !h ? 'flat' : darkBg(h.bg) ? 'dark' : 'bright';
  return (
    <>
      <section className={cn('s-phero', tone, compact && 'compact')} data-hero>
        <div className="s-phero-panel" style={h?.bg ? { ['--hero-bg' as string]: h.bg } : undefined}>
          {h && <ThemedImage image={h} alt="" aria-hidden fetchPriority="high" className="s-phero-fig s-in-img" style={step(3)} />}
          <div className="s-wrap s-phero-grid">
            <div className="s-phero-copy">
              {eb && (
                <span className="s-phero-chip s-in" style={step(0)}>
                  <i aria-hidden />
                  {eb}
                </span>
              )}
              <h1 className="s-phero-title s-in" style={step(1)}>
                {title ?? (hero && <HeroTitle hero={hero} />)}
              </h1>
              {ld && (
                <p className="s-phero-lead s-in" style={step(2)}>
                  {ld}
                </p>
              )}
              {act && (
                <div className="s-phero-acts s-in" style={step(3)}>
                  {act}
                </div>
              )}
              {children && (
                <div className="s-in mt-10 w-full" style={step(5)}>
                  {children}
                </div>
              )}
            </div>
            {aside && (
              <div className="s-phero-aside s-in" style={step(4)}>
                {aside}
              </div>
            )}
          </div>
        </div>
      </section>
      {facts && facts.length > 0 && <FactBand items={facts} />}
    </>
  );
}

/** A figure card for the hero's lower right (a number with a line): the first one cream, the next ones glass. */
export function HeroGlass({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('s-hcard', className)}>{children}</div>;
}
