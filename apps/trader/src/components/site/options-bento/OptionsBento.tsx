'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { OPTIONS } from '@/content/facts';
import { DEMO_HREF } from '@/lib/crm';
import { BadgesEm } from '@/components/ui/Flag';
import { RiskNote } from '@/components/ui/RiskNote';
import { GlassIcon, type GlassIconName } from '../GlassIcon';
import { OPPORTUNITY, RISK } from '../OptionsOdds';
import { Rise } from '../Rise';
import type { Pin } from '../Shot';
import './options-bento.css';

/*
 * The home page's options section as a bento (founder 2026-10-31, reference: an app landing page of rounded cards —
 * a wide card with a stack of entries beside its text, two half cards); the worked example follows it as a photo band
 * (OptionsExampleBand). Every word comes from the site: the options tour lines (OPTIONS_PINS), the opportunity, the
 * risk and the worked example (OptionsOdds.tsx). The stack shows EURUSD strikes from the option chain of a Kalks Trader demo session (the
 * site's options screenshot): the buy price a contract, the chance of finishing in the money.
 */

const CHAIN = [
  { side: 'Call', strike: '1.1150', buy: '54.21', chance: 83 },
  { side: 'Put', strike: '1.1175', buy: '11.29', chance: 32 },
  { side: 'Call', strike: '1.1200', buy: '20.53', chance: 49 },
  { side: 'Put', strike: '1.1225', buy: '37.05', chance: 70 },
  { side: 'Call', strike: '1.1250', buy: '5.55', chance: 17 },
];

const FEATURE_ICONS: GlassIconName[] = ['calendar', 'percent', 'sliders'];

/** One strike, as an entry in the stack. */
function Strike({ c }: { c: (typeof CHAIN)[number] }) {
  return (
    <div className="ob-entry">
      <div className="ob-entry-top">
        <span className="ob-entry-mark">
          <BadgesEm symbol="EURUSD" />
        </span>
        <b>EURUSD</b>
        <span className={c.side === 'Call' ? 'ob-side up' : 'ob-side dn'}>
          {c.side} {c.strike}
        </span>
        <span className="ob-entry-meta">Daily · {OPTIONS.cut}</span>
      </div>
      <div className="ob-entry-bottom">
        <span className="ob-price">
          ${c.buy} <small>a contract</small>
        </span>
        <span className="ob-chip">Chance {c.chance}%</span>
      </div>
    </div>
  );
}

/**
 * Each opportunity as a card image (founder 2026-10-31: "a professional card image, modern and premium"), rendered
 * from HTML with the site's fonts, wordmark and market badges; every figure on them comes from the gold example
 * (OptionsOdds.tsx) and the options facts. The alt text carries the same figures.
 */
const OPP_CARDS = [
  { src: '/site/options/opportunity-1.webp', alt: 'XAUUSD call, 10 oz: premium $195, the most you can lose $195, daily, 10:00 New York' },
  { src: '/site/options/opportunity-2.webp', alt: 'Gold +$20, about 0.5%; the option +$100 to $120, about 51% to 62%' },
  { src: '/site/options/opportunity-3.webp', alt: 'Call if the price rises, put if it falls; daily and weekly; 8 FX pairs, gold, silver and oil' },
];

function OppArt({ k, active }: { k: number; active: boolean }) {
  const c = OPP_CARDS[k];
  return (
    <div className="ob-art" data-active={active || undefined} aria-hidden={!active}>
      <span className="ob-art-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.src} alt={c.alt} width={1280} height={808} decoding="async" draggable={false} />
      </span>
    </div>
  );
}

const N = OPPORTUNITY.length;
const SLIDE_MS = 1000; // .ob-track's transition
const STAY_MS = 5000;
const mod = (v: number) => ((v % N) + N) % N;

/**
 * The three opportunity lines in one card (founder 2026-10-31): the card stays, its inner panel slides. Three copies of
 * the panels sit side by side and the track only ever moves forward; when a move leaves the middle copy it jumps back
 * to the same panel there with no transition, so the loop has no seam. The title and text under it fade in step. No
 * header (founder 2026-11-02: icon, bars and count removed); a panel stays STAY_MS, a hover or focus holds it, paused
 * off screen; swipe on touch screens.
 */
function Carousel() {
  const [pos, setPos] = useState(N);
  const [moves, setMoves] = useState(0);
  const [snap, setSnap] = useState(false);
  const [hold, setHold] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x0 = useRef<number | null>(null);
  const at = mod(pos);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (pos >= N && pos < 2 * N) return;
    const t = window.setTimeout(() => {
      setSnap(true);
      setPos(N + mod(pos));
    }, SLIDE_MS + 40);
    return () => window.clearTimeout(t);
  }, [pos]);
  useEffect(() => {
    if (!snap) return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => (r2 = requestAnimationFrame(() => setSnap(false))));
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [snap]);
  useEffect(() => {
    if (hold || !seen) return;
    const t = window.setTimeout(() => {
      setPos((p) => (p + 1 >= 3 * N ? N + mod(p + 1) : p + 1));
      setMoves((m) => m + 1);
    }, STAY_MS);
    return () => window.clearTimeout(t);
  }, [moves, hold, seen]);

  const go = (d: number) => {
    if (!d) return;
    setPos((p) => (p + d < 0 || p + d >= 3 * N ? N + mod(p + d) : p + d));
    setMoves((m) => m + 1);
  };

  return (
    <div
      ref={ref}
      className="ob-feature"
      data-tone={at}
      data-snap={snap || undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label="The opportunity"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      onPointerDown={(e) => (x0.current = e.pointerType === 'mouse' ? null : e.clientX)}
      onPointerUp={(e) => {
        if (x0.current == null) return;
        const dx = e.clientX - x0.current;
        x0.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
      onPointerCancel={() => (x0.current = null)}
    >
      <div className="ob-viewport">
        <div className="ob-track" style={{ ['--at' as string]: pos }}>
          {[0, 1, 2].flatMap((copy) => OPPORTUNITY.map((_, k) => <OppArt key={copy * N + k} k={k} active={copy * N + k === pos} />))}
        </div>
      </div>
      <div className="ob-feature-copy">
        {OPPORTUNITY.map((o, k) => (
          <div key={o.t} data-on={k === at || undefined} aria-hidden={k !== at}>
            <h4>{o.t}</h4>
            <p>{o.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** 2 and 3: the opportunity (the sliding card) and the risk, side by side. */
function OddsCards() {
  return (
    <>
      {/* 2. the opportunity */}
      <Rise delay={80} className="s-tile ob-card ob-opp">
        <h3 className="ob-title">
          <GlassIcon name="trend" size={48} /> The opportunity
        </h3>
        <Carousel />
      </Rise>

      {/* 3. the risk */}
      <Rise delay={160} className="s-tile ob-card">
        <h3 className="ob-title">
          <GlassIcon name="alert" size={48} /> The risk
        </h3>
        <ul className="ob-inner ob-risks">
          {RISK.map((r) => (
            <li key={r.t}>
              <b>{r.t}</b>
              <span>{r.d}</span>
            </li>
          ))}
        </ul>
      </Rise>
    </>
  );
}

export function OptionsBento({ pins }: { pins: Pin[] }) {
  const [main, ...rest] = [pins[1], pins[0], pins[2], pins[3]];
  return (
    <div className="ob">
      {/* 1. calls and puts by strike, with the other three parts of the chain beside the stack */}
      <Rise className="s-tile calm ob-card ob-wide ob-chain">
        <div className="ob-copy">
          <h3>{main.title}</h3>
          <p className="ob-lead">{main.text}</p>
          <ul className="ob-features">
            {rest.map((f, k) => {
              return (
                <li key={f.title}>
                  <span className="ob-ic" aria-hidden>
                    <GlassIcon name={FEATURE_ICONS[k]} size={48} />
                  </span>
                  <span>
                    <b>{f.title}</b>
                    {f.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="ob-stack" aria-hidden>
          <div className="ob-stack-track">
            {[...CHAIN, ...CHAIN].map((c, k) => (
              <Strike key={k} c={c} />
            ))}
          </div>
        </div>
      </Rise>

      <OddsCards />
    </div>
  );
}

/** The worked example's outcomes at expiry: what the $195 option pays, as a share of the most it pays here ($400). */
const OUTCOMES = [
  { label: 'Gold $40 higher', result: '+$205 (+105%)', tone: 'up', share: 1, note: 'The option pays $400' },
  { label: 'About $19.50 higher', result: 'Break even', tone: 'flat', share: 0.4875, note: 'The option pays $195' },
  { label: 'Flat or lower', result: '−$195 (−100%)', tone: 'dn', share: 0, note: 'It expires worthless' },
];

/**
 * The worked example as a full-bleed photo band after the bento (founder 2026-11-01, reference: a landing page's
 * closing band — a motion-blurred photo edge to edge, a centred headline, one bar of a bordered field and a white
 * button). The photo is the home hero's figure, panned. The worked example's words are split around the bar:
 * the purchase as the line under the headline, the three outcomes in the bar, the rest and the risk warning below it.
 */
export function OptionsExampleBand() {
  return (
    <section className="ob-band" aria-labelledby="ob-band-title">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ob-band-bg" src="/site/options/example-band.webp" alt="" width={2560} height={1120} loading="lazy" decoding="async" />
      <Rise className="ob-band-in">
        <h2 id="ob-band-title">Example, illustrative only</h2>
        <p className="ob-band-sub">
          You buy one at-the-money gold call (10 oz) for about <b>$195</b>, that is $19.50 an ounce.
        </p>
        <p className="ob-band-at">At expiry</p>
        <div className="ob-band-bar">
          <ul>
            {OUTCOMES.map((o) => (
              <li key={o.label}>
                <span>{o.label}</span>
                <b className={o.tone}>{o.result}</b>
                <small>{o.note}</small>
                <i className={o.tone} style={{ ['--share' as string]: o.share }} aria-hidden />
              </li>
            ))}
          </ul>
          <Link href={DEMO_HREF} className="ob-band-cta">
            Try the demo
          </Link>
        </div>
        <p className="ob-band-fine">
          Before expiry, a quick $20 rise could lift its value by roughly $100 to $120, while time decay works against you every day. Prices, premiums and outcomes
          vary with the market; past performance is not a reliable indicator of future results.
        </p>
        <RiskNote options cfd={false} className="ob-band-risk" />
      </Rise>
    </section>
  );
}

/** The opportunity and the risk on their own (the options page; founder 2026-11-01: its older plain block replaced). */
export function OptionsOddsBento() {
  return (
    <div className="ob">
      <OddsCards />
    </div>
  );
}
