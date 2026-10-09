'use client';

import { useEffect, useRef, useState } from 'react';
import { REMOTE, cdn, cdnSet, type RemoteKey } from '@/content/remote';
import { cn } from '@/lib/cn';

export type Role = { role: string; pitch: string; image?: RemoteKey };

/**
 * "Who it's for": a row of role chips and one large statement that rewrites itself word by word. It cycles every
 * seven seconds until the visitor picks a role, pauses while hovered, and ← → move between roles.
 */
export function RoleTabs({ roles }: { roles: Role[] }) {
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // only the role on show and the next one are loaded; the rest load when they come up
  const [seen, setSeen] = useState<number[]>([0, 1]);
  useEffect(() => {
    setSeen((v) => Array.from(new Set([...v, i, (i + 1) % roles.length])));
  }, [i, roles.length]);

  useEffect(() => {
    if (!auto || hold) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setI((v) => (v + 1) % roles.length), 7000);
    return () => clearTimeout(t);
  }, [i, auto, hold, roles.length]);

  const pick = (n: number, focus = false) => {
    setAuto(false);
    setI(n);
    if (focus) tabs.current[n]?.focus();
  };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') pick((i + 1) % roles.length, true);
    else if (e.key === 'ArrowLeft') pick((i - 1 + roles.length) % roles.length, true);
    else return;
    e.preventDefault();
  };
  const words = roles[i].pitch.split(/(\s+)/);
  const withPhotos = roles.some((r) => r.image);
  return (
    <div onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} className={cn(withPhotos && 'kx-roles')}>
      <div className="kx-roles-l">
      <div className="kx-chips" role="tablist" aria-label="Who Kalks is for" onKeyDown={key}>
        {roles.map((r, n) => (
          <button
            key={r.role}
            ref={(el) => {
              tabs.current[n] = el;
            }}
            type="button"
            role="tab"
            id={`kx-role-${n}`}
            aria-selected={n === i}
            aria-controls="kx-role-panel"
            tabIndex={n === i ? 0 : -1}
            className="kx-chip"
            data-auto={n === i && auto && !hold ? '' : undefined}
            onClick={() => pick(n)}
          >
            {r.role}
            <span className="kx-chip-bar" key={`${i}-${auto}-${hold}`} />
          </button>
        ))}
      </div>
      <p id="kx-role-panel" role="tabpanel" aria-labelledby={`kx-role-${i}`} aria-live="polite" className="kx-pitch">
        <span key={i}>
          {words.map((w, n) =>
            /\s+/.test(w) ? (
              w
            ) : (
              <span key={n} className="kx-word" style={{ ['--i' as string]: n }}>
                {w}
              </span>
            ),
          )}
        </span>
      </p>
      </div>
      {withPhotos && (
        <div className="kx-role-frame" aria-hidden>
          <div className="kx-role-photo">
            {roles.map((r, n) => {
              if (!r.image) return null;
              const im = REMOTE[r.image];
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={r.role}
                  src={seen.includes(n) ? cdn(im, 1040) : undefined}
                  srcSet={seen.includes(n) ? cdnSet(im, [640, 1040, 1600, 2080]) : undefined}
                  sizes="(max-width: 900px) 92vw, 540px"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={cn('kx-role-ph', n === i && 'on')}
                  style={{ objectPosition: im.pos }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
