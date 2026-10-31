'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { OPTIONS } from '@/content/facts';
import { BadgesEm } from '@/components/ui/Flag';
import { RiskNote } from '@/components/ui/RiskNote';
import { GlassIcon, type GlassIconName } from '../GlassIcon';
import { OPPORTUNITY, OptionsExample, RISK } from '../OptionsOdds';
import { Rise } from '../Rise';
import type { Pin } from '../Shot';
import './options-bento.css';

/*
 * The home page's options section as a bento (founder 2026-10-31, reference: an app landing page of rounded cards —
 * a wide card with a stack of entries beside its text, two half cards, a card with progress bars). Every word comes
 * from the site: the options tour lines (OPTIONS_PINS), the opportunity, the risk and the worked example
 * (OptionsOdds.tsx). The stack shows EURUSD strikes from the option chain of a Kalks Trader demo session (the
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

const OPP_ICONS: GlassIconName[] = ['shield', 'zap', 'updown'];
const N = OPPORTUNITY.length;
const SLIDE_MS = 1000; // .ob-track's transition
const mod = (v: number) => ((v % N) + N) % N;

/**
 * The three opportunity lines in one card (founder 2026-10-31): the card stays, its inner panel slides. Three copies of
 * the panels sit side by side and the track only ever moves forward; when a move leaves the middle copy it jumps back
 * to the same panel there with no transition, so the loop has no seam. The title and text under it fade in step. The
 * header's progress bar fills while a panel stays (its animation's end moves on, so a hover pauses both); paused off
 * screen; swipe on touch screens.
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
      <div className="ob-feature-head">
        <span className="ob-feature-ic" aria-hidden>
          {OPP_ICONS.map((name, k) => (
            <span key={name} data-on={k === at || undefined}>
              <GlassIcon name={name} size={44} />
            </span>
          ))}
        </span>
        <div className="ob-steps" role="group" aria-label="Pick a card">
          {OPPORTUNITY.map((o, k) => (
            <button key={o.t} type="button" aria-label={`${k + 1} of ${N}: ${o.t}`} aria-pressed={k === at} data-done={k < at || undefined} onClick={() => go(mod(k - at))}>
              {k === at ? <i key={`a${moves}`} style={{ animationPlayState: hold || !seen ? 'paused' : 'running' }} onAnimationEnd={() => go(1)} /> : <i key="idle" />}
            </button>
          ))}
        </div>
        <span className="ob-feature-n">
          0{at + 1} / 0{N}
        </span>
      </div>
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

/** A bar for one outcome of the worked example (what the option pays at expiry, out of $400). */
function Outcome({ label, result, tone, share, note }: { label: string; result: ReactNode; tone: 'up' | 'flat' | 'dn'; share: number; note: string }) {
  return (
    <div className="ob-outcome">
      <div className="ob-outcome-row">
        <span>{label}</span>
        <b className={tone}>{result}</b>
      </div>
      <div className="ob-bar">
        <i className={tone} style={{ ['--share' as string]: share }} />
      </div>
      <small>{note}</small>
    </div>
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

      {/* 4. the worked example, its three outcomes as bars */}
      <Rise delay={120} className="s-tile calm ob-card ob-wide ob-example">
        <div className="ob-copy">
          <h3>Example, illustrative only</h3>
          <OptionsExample className="ob-lead" />
        </div>
        <div className="ob-inner ob-outcomes">
          <div className="ob-outcomes-head">
            <div>
              <b>Gold call · 10 oz</b>
              <span>$19.50 an ounce</span>
            </div>
            <div className="ob-premium">
              <b>$195</b>
              <span>Premium</span>
            </div>
          </div>
          <Outcome label="Gold $40 higher" result="+$205 (+105%)" tone="up" share={1} note="The option pays $400" />
          <Outcome label="About $19.50 higher" result="Break even" tone="flat" share={0.4875} note="The option pays $195" />
          <Outcome label="Flat or lower" result="−$195 (−100%)" tone="dn" share={0} note="It expires worthless" />
        </div>
      </Rise>

      <RiskNote options cfd={false} className="ob-note" />
    </div>
  );
}
