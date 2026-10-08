import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type HeroTone = 'yellow' | 'red' | 'ink' | 'plain';
export type StripItem = { v: ReactNode; l: ReactNode };

/**
 * Page hero (KALKS2 §6, sample "01 Website"): a solid-colour card inset from the viewport, the nav floating over its
 * top (the nav reads the tone from data-tone). Copy on the left: kicker or eyebrow, display headline (≤ 6 words a
 * line, ends with a full stop), one sentence, one saturated action + a ghost, a mono facts line. `art` sits in the
 * right column; `backdrop` is a free layer inside the card (the home figure). `strip` is the glass stat strip.
 */
export function Hero({
  tone,
  eyebrow,
  kicker,
  title,
  lede,
  actions,
  facts,
  art,
  backdrop,
  strip,
  compact = false,
  className,
  style,
  below,
}: {
  tone: HeroTone;
  eyebrow?: ReactNode;
  kicker?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  facts?: ReactNode;
  art?: ReactNode;
  backdrop?: ReactNode;
  strip?: StripItem[];
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
  /** content under the copy inside the card (e.g. the About image) */
  below?: ReactNode;
}) {
  return (
    <section
      className={cn('hero', strip && 'has-strip', compact && 'compact', !art && 'no-art', className)}
      data-tone={tone}
      aria-labelledby="hero-title"
      style={style}
    >
      {backdrop}
      <div className="hero-in">
        <div className="hero-copy">
          {eyebrow}
          {kicker && <span className="hero-kicker">{kicker}</span>}
          <h1 id="hero-title" className={cn('d', !eyebrow && !kicker && '!mt-0')}>
            {title}
          </h1>
          {lede && <p className="hero-lede">{lede}</p>}
          {actions && <div className="hero-cta">{actions}</div>}
          {facts && <p className="hero-facts">{facts}</p>}
        </div>
        {art && <div className="hero-art">{art}</div>}
        {below}
      </div>
      {strip && (
        <div className="hero-strip" style={{ ['--n' as string]: strip.length }}>
          {strip.map((s, i) => (
            <div key={i}>
              <b>{s.v}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/** "NEW · Kalks FX Options" pill. */
export function Eyebrow({ tag = 'New', children }: { tag?: string | null; children: ReactNode }) {
  return (
    <span className="eyebrow">
      {tag ? <span className="tag new">{tag}</span> : <span className="w-1" />}
      {children}
    </span>
  );
}
