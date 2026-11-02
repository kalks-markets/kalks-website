import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Rise } from '../Rise';
import { Btn } from '../ui';
import { LineArt, type LineArtName } from './LineArt';
import './home.css';

/*
 * The home page under the hero, block for block after the founder's reference (2026-11-02: a long dark landing page,
 * "exactly like this"): centred bold headings, quiet dark cards, outlined 3D figures, a phone in a tinted band, icon
 * cards with tags, a strip of logos, the closing band of dots and a strip of languages. Kalks content only, from
 * content/facts.ts and the site's pages; the theme's own colours.
 */

/** the heading with its second half in the orange */
function Title({ title, accent }: { title: ReactNode; accent?: ReactNode }) {
  return (
    <>
      {title}
      {accent && (
        <>
          {' '}
          <span className="rf-hl">{accent}</span>
        </>
      )}
    </>
  );
}

/** a centred section heading and the line under it */
export function RfHead({ id, title, accent, sub, className }: { id?: string; title: ReactNode; accent?: ReactNode; sub?: ReactNode; className?: string }) {
  return (
    <Rise className={cn('rf-head', className)}>
      <h2 id={id} className="rf-h2">
        <Title title={title} accent={accent} />
      </h2>
      {sub && <p className="rf-sub">{sub}</p>}
    </Rise>
  );
}

/** A figure set as an outlined 3D numeral. */
export function Fig({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('rf-3d', className)}>{children}</span>;
}

/** Costs as two large cards: the figure, what it is and the line under it; the small print under the pair. */
export function FeeCards({ items, fine }: { items: { v: string; t: string; d: string }[]; fine?: ReactNode }) {
  return (
    <>
      <div className="rf-fees">
        {items.map((it, i) => (
          <Rise key={it.t} delay={i * 80} className="rf-card rf-fee">
            <Fig>{it.v}</Fig>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </Rise>
        ))}
      </div>
      {fine && <p className="rf-fine">{fine}</p>}
    </>
  );
}

/**
 * A feature with its picture on one side (a photo on a rounded card, a small card of facts floating over its corner,
 * a line of small print under it) and the heading, text and button on the other.
 */
export function PhotoFeature({
  image,
  facts,
  factsTitle,
  note,
  title,
  accent,
  text,
  action,
  id,
}: {
  image: { src: string; w: number; h: number; alt: string };
  facts: { k: string; v: string }[];
  factsTitle: string;
  note?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  text: ReactNode;
  action: ReactNode;
  id: string;
}) {
  return (
    <div className="rf-photo">
      <Rise className="rf-photo-media">
        <div className="rf-photo-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.src} width={image.w} height={image.h} alt={image.alt} loading="lazy" decoding="async" />
        </div>
        <div className="rf-float">
          <p className="rf-float-t">
            <i aria-hidden />
            {factsTitle}
          </p>
          <dl>
            {facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        {note && (
          <p className="rf-photo-note">
            <Check size={14} strokeWidth={2.6} aria-hidden />
            {note}
          </p>
        )}
      </Rise>
      <Rise delay={100} className="rf-photo-copy">
        <h2 id={id} className="rf-h2">
          <Title title={title} accent={accent} />
        </h2>
        <p className="rf-text">{text}</p>
        <div>{action}</div>
      </Rise>
    </div>
  );
}

/**
 * A full-width flat panel (founder 2026-11-02, a reference): a small label, the heading, a plain pill button and three
 * points on the left; on the right a phone cut by a line above the panel's foot, the `note` under it, and the 3D ring
 * over its top, cut by the panel's upper edge.
 */
export function PhoneBand({ label, title, accent, action, points, phone, note, id }: { label: string; title: ReactNode; accent?: ReactNode; action: ReactNode; points: ReactNode[]; phone: ReactNode; note?: ReactNode; id: string }) {
  return (
    <section className="rf-band" aria-labelledby={id}>
      <div className="s-wrap rf-band-in">
        <Rise className="rf-band-copy">
          <p className="rf-band-label">{label}</p>
          <h2 id={id} className="rf-h2">
            <Title title={title} accent={accent} />
          </h2>
          <div className="rf-band-act">{action}</div>
          <ul className="rf-band-points">
            {points.map((p, i) => (
              <li key={i}>
                <i aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Rise>
        <Rise delay={120} className="rf-band-side">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/site/3d/ring.webp" width={1200} height={1000} alt="" aria-hidden loading="lazy" decoding="async" className="rf-band-ring" />
          <div className="rf-band-phone">{phone}</div>
          {note && <p className="rf-band-note">{note}</p>}
        </Rise>
      </div>
    </section>
  );
}

/**
 * The site's iPhone (the titanium frame of Shot.tsx IPhone, site.css .s-iph) around a screen drawn in HTML. `light`: a
 * light app screen (a dark home bar); otherwise a dark one. A dark device in both themes.
 */
export function PhoneFrame({ children, light, className }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <div className={cn('s-iph rf-iph s-isl', className)}>
      <div className="s-iph-bezel">
        <div className={cn('s-iph-screen rf-iph-screen', light && 'light')}>
          {children}
          <i className="s-iph-island" aria-hidden />
          <i className="s-iph-home" aria-hidden />
        </div>
      </div>
    </div>
  );
}

/** The phone's status bar (the time, signal and battery), for a screen drawn or captured without one. */
export function PhoneStatus({ dark }: { dark?: boolean }) {
  return (
    <div className={cn('rf-status', dark && 'dark')} aria-hidden>
      <b>9:41</b>
      <span>
        <svg viewBox="0 0 18 12" width="18" height="12">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 26 12" width="26" height="12">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" />
          <rect x="2.5" y="2.5" width="16" height="7" rx="2" />
          <rect x="24" y="4" width="1.6" height="4" rx=".8" opacity=".4" />
        </svg>
      </span>
    </div>
  );
}

/**
 * A screen captured from the platform itself (Kalks Trader at phone width), in the site's iPhone under its status bar;
 * the rest of the screen takes the app's own background.
 */
export function PhoneShot({ src, w, h, alt, bg, light }: { src: string; w: number; h: number; alt: string; bg: string; light?: boolean }) {
  return (
    <PhoneFrame light={light}>
      <div className="rf-shot" style={{ background: bg }}>
        <PhoneStatus dark={!light} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" />
      </div>
    </PhoneFrame>
  );
}

/** Three outlined cards with a line drawing, a title, a line and pill tags (founder 2026-11-02, a reference). */
export function TrustCards({ items }: { items: { art: LineArtName; t: string; d: string; tags: string[] }[] }) {
  return (
    <div className="rf-trust">
      {items.map((it, i) => (
        <Rise key={it.t} delay={i * 80} className="rf-card rf-trust-card">
          <div className="rf-trust-art">
            <LineArt name={it.art} />
          </div>
          <h3>{it.t}</h3>
          <p>{it.d}</p>
          <ul className="rf-tags">
            {it.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Rise>
      ))}
    </div>
  );
}

/** A row of logos in one tone, each with its name. */
export function LogoStrip({ logos }: { logos: { src: string; name: string }[] }) {
  return (
    <Rise as="ul" className="rf-logos">
      {logos.map((l) => (
        <li key={l.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={l.src} width={40} height={40} alt="" loading="lazy" decoding="async" />
          <span>{l.name}</span>
        </li>
      ))}
    </Rise>
  );
}

/**
 * The closing band: fields of orange dots along its top and bottom edges, and one card in the middle with the heading,
 * the line under it and the button. A dark island in both themes.
 */
export function CtaBand({ title, accent, sub, primary }: { title: ReactNode; accent?: ReactNode; sub?: ReactNode; primary: { href: string; label: string } }) {
  return (
    <section className="rf-cta s-isl" aria-labelledby="rf-cta-title">
      <i className="rf-cta-dots" aria-hidden />
      <div className="s-wrap">
        <Rise className="rf-cta-card">
          <h2 id="rf-cta-title" className="rf-h2">
            <Title title={title} accent={accent} />
          </h2>
          {sub && <p className="rf-cta-sub">{sub}</p>}
          <Btn href={primary.href} className="rf-cta-btn">
            {primary.label}
          </Btn>
        </Rise>
      </div>
    </section>
  );
}

/** The languages as a slow strip across the page (still under reduced motion); the copy after the first is hidden. */
export function LangStrip({ names }: { names: readonly string[] }) {
  const row = (hidden?: boolean) => (
    <ul className="rf-langs-row" aria-hidden={hidden || undefined}>
      {names.map((n) => (
        <li key={n}>{n}</li>
      ))}
    </ul>
  );
  return (
    <div className="rf-langs">
      <div className="rf-langs-track">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
