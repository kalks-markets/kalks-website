'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { Smartphone } from 'lucide-react';
import { BRAND_NAME } from '@/lib/brand';
import { IMAGES, POCKET_FRAME } from '../ImageSlot';
import { Btn } from '../ui';
import { initPocketTerminal } from './pocket-terminal';
import { ScreenChart, ScreenTabs, ScreenWatchlist } from './PocketScreens';
import './pocket-terminal.css';

export type PocketNote = { title: string; time: string; body?: string };

/** the mosaic's two rows, one letter per column: a accent, d deep, s solid deep, n white, l light */
const MOSAIC = 'analdadlsnaala';

/** when each note enters (and on phones, leaves), as progress windows of the pinned scroll */
const NOTE_WINDOWS = [
  { in: '.30,.40', from: 'left', inM: '.30,.38', outM: '.50,.56' },
  { in: '.46,.56', from: 'right', inM: '.54,.62', outM: '.74,.80' },
  { in: '.62,.72', from: 'left', inM: '.78,.86' },
];

/**
 * "The same terminal in your pocket." as a pinned scroll story (founder 2026-10-30): the head fades away, the phone
 * rises into the middle, its screen (drawn in PocketScreens.tsx) scrolls through the watchlist and slides across to the chart, and
 * notification cards slide in from the sides (phones: drop in from the top). pocket-terminal.ts drives it from the
 * page scroll; pocket-terminal.css styles it. A CSS phone frame unless IMAGES.pocketTerminalFrame is set (photo mode).
 */
export function PocketTerminal({
  index,
  eyebrow,
  sub,
  cta,
  notes = [],
}: {
  index?: string;
  eyebrow?: ReactNode;
  sub?: ReactNode;
  cta?: { href: string; label: string };
  /** up to three notification cards, in order */
  notes?: PocketNote[];
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (/[?&]pt-debug\b/.test(window.location.search)) ref.current?.classList.add('pt-debug');
    return initPocketTerminal(ref.current);
  }, []);

  const photo = Boolean(IMAGES.pocketTerminalFrame);
  const frameVars = photo ? ({ '--sx': POCKET_FRAME.sx, '--sy': POCKET_FRAME.sy, '--sw': POCKET_FRAME.sw, '--sh': POCKET_FRAME.sh } as CSSProperties) : undefined;

  return (
    <section ref={ref} className="pt" id="pocket-terminal" aria-labelledby="pt-title">
      <div className="pt-sticky">
        <div className="pt-gridlines" aria-hidden="true" />

        <header className="pt-head" data-pt="head">
          {eyebrow && (
            <span className="pt-chip">
              <Smartphone size={14} strokeWidth={2.2} aria-hidden />
              {index && <b>{index}</b>}
              {eyebrow}
            </span>
          )}
          <h2 id="pt-title">
            The same terminal <br className="pt-br" />
            in your <span className="pt-hl">pocket.</span>
          </h2>
          {sub && <p className="pt-sub">{sub}</p>}
          {cta && (
            <div className="pt-cta">
              <Btn href={cta.href} variant="deep" icon={false}>
                {cta.label}
              </Btn>
            </div>
          )}
        </header>

        <div className="pt-mosaic" aria-hidden="true">
          {[...MOSAIC].map((t, i) => (
            <i key={i} className={`t-${t}`} />
          ))}
        </div>

        <div
          className={photo ? `pt-device pt-device--photo${POCKET_FRAME.overlay ? ' is-overlay' : ''}` : 'pt-device pt-device--css'}
          style={frameVars}
          data-pt="device"
          role="img"
          aria-label={`${BRAND_NAME} mobile app`}
        >
          <div className="pt-screen">
            <div className="pt-pages" data-pt="pages">
              {[ScreenWatchlist, ScreenChart].map((Screen, i) => (
                <div key={i} className="pt-page">
                  <div className="pt-page-track">
                    <Screen />
                  </div>
                </div>
              ))}
            </div>
            <ScreenTabs />
            <div className="pt-island" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {photo && <img className="pt-frame" src={IMAGES.pocketTerminalFrame} alt="" draggable={false} />}
        </div>

        {notes.slice(0, 3).map((n, i) => {
          const w = NOTE_WINDOWS[i];
          return (
            <div
              key={n.title}
              className={`pt-note pt-note--${i + 1}`}
              data-pt-note
              aria-hidden="true"
              data-in={w.in}
              data-from={w.from}
              data-in-m={w.inM}
              data-out-m={w.outM}
            >
              <div className="pt-note__head">
                <span className="pt-note__icon" />
                <b className="pt-note__title">{n.title}</b>
                <span className="pt-note__time">{n.time}</span>
              </div>
              {n.body && <p className="pt-note__body">{n.body}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
