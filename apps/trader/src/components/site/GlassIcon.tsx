import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * The site's icons (founder 2026-11-01, reference: a duotone glass set): a solid Kalks orange shape behind, a frosted
 * glass shape in front that blurs whatever part of it sits behind, and a white mark on the glass. Flat, no shadows; the
 * colours are tokens on .s-gico (site.css), so they follow the theme. Decorative: the text next to each icon says what
 * it means. A new icon keeps the pattern: one solid shape up and to the right, the glass down and to the left.
 */
type Pt = [number, number];

/** A closed polygon with its corners rounded by r. */
function rounded(pts: Pt[], r: number) {
  const n = pts.length;
  const fmt = (v: number) => +v.toFixed(2);
  return (
    pts
      .map((p, i) => {
        const to = (q: Pt) => {
          const dx = q[0] - p[0];
          const dy = q[1] - p[1];
          const k = Math.min(r, Math.hypot(dx, dy) / 2) / Math.hypot(dx, dy);
          return `${fmt(p[0] + dx * k)} ${fmt(p[1] + dy * k)}`;
        };
        return `${i ? 'L' : 'M'}${to(pts[(i + n - 1) % n])}Q${p[0]} ${p[1]} ${to(pts[(i + 1) % n])}`;
      })
      .join('') + 'Z'
  );
}

const TRIANGLE = (x: number, y: number) => rounded([[x, y], [x + 17, y + 30], [x - 17, y + 30]], 4.5);
const ARROW_UP = (cx: number) => rounded([[cx, 5], [cx + 11, 17], [cx + 4.5, 17], [cx + 4.5, 40], [cx - 4.5, 40], [cx - 4.5, 17], [cx - 11, 17]], 2.4);
const ARROW_DOWN = (cx: number) => rounded([[cx, 43], [cx + 11, 31], [cx + 4.5, 31], [cx + 4.5, 8], [cx - 4.5, 8], [cx - 4.5, 31], [cx - 11, 31]], 2.4);
const BOLT = rounded([[24, 3], [8, 27], [20, 27], [17, 45], [35, 19], [23, 19]], 2.2);

type Glyph = { back: ReactNode; glass: ReactNode; mark?: ReactNode };

const ICONS = {
  // Expiries
  calendar: {
    back: (
      <>
        <rect x="13" y="5" width="6" height="13" rx="3" />
        <rect x="29" y="5" width="6" height="13" rx="3" />
      </>
    ),
    glass: <rect x="6" y="11" width="36" height="32" rx="9" />,
    mark: [16, 24, 32].flatMap((x) => [26, 34].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.3" stroke="none" />)),
  },
  // Chance and breakeven
  percent: {
    back: <circle cx="33" cy="15" r="11" />,
    glass: <circle cx="20" cy="28" r="15" />,
    mark: (
      <>
        <circle cx="15.5" cy="23" r="2.6" stroke="none" />
        <circle cx="24.5" cy="33" r="2.6" stroke="none" />
        <path d="M25 22 15 34" fill="none" />
      </>
    ),
  },
  // Quick trade and strategy builder
  sliders: {
    back: <rect x="19" y="5" width="24" height="26" rx="7" />,
    glass: <rect x="5" y="15" width="29" height="28" rx="8" />,
    mark: (
      <>
        <path d="M11 25h17M11 34h17" fill="none" />
        <circle cx="23" cy="25" r="3.4" stroke="none" />
        <circle cx="16" cy="34" r="3.4" stroke="none" />
      </>
    ),
  },
  // The opportunity
  trend: {
    back: <circle cx="34" cy="14" r="10" />,
    glass: <rect x="5" y="14" width="34" height="29" rx="8" />,
    mark: <path d="M11 35l6.5-6.5 4.5 4 10-10m-5.5 0H32v5.5" fill="none" />,
  },
  // The risk
  alert: {
    back: <path d={TRIANGLE(29, 4)} />,
    glass: <path d={TRIANGLE(20, 12)} />,
    mark: (
      <>
        <path d="M20 25v6" fill="none" />
        <circle cx="20" cy="36.5" r="1.9" stroke="none" />
      </>
    ),
  },
  // A fixed, known cost
  shield: {
    back: <circle cx="33" cy="14" r="10" />,
    glass: <path d="M21 10c4 2.6 9 3.6 14 3.6V25c0 9-6 15-14 18-8-3-14-9-14-18V13.6c5 0 10-1 14-3.6Z" />,
    mark: <path d="M15 27l4.5 4.5 8-8" fill="none" />,
  },
  // Bigger moves than the market
  zap: {
    back: <circle cx="31" cy="25" r="13" />,
    glass: <path d={BOLT} />,
  },
  // Up or down, short or longer
  updown: {
    back: <path d={ARROW_UP(29)} />,
    glass: <path d={ARROW_DOWN(19)} />,
  },
  // One USDT wallet
  wallet: {
    back: <rect x="13" y="4" width="28" height="20" rx="6" />,
    glass: <rect x="5" y="14" width="38" height="29" rx="8" />,
    mark: <circle cx="33" cy="29" r="2.8" stroke="none" />,
  },
  // A verified identity
  id: {
    back: <circle cx="34" cy="13" r="9" />,
    glass: <rect x="5" y="13" width="36" height="29" rx="8" />,
    mark: (
      <>
        <circle cx="15.5" cy="25" r="3.4" stroke="none" />
        <path d="M11 35.5c1.2-2.6 2.8-3.6 4.5-3.6s3.3 1 4.5 3.6M25 24.5h9M25 31h6" fill="none" />
      </>
    ),
  },
} satisfies Record<string, Glyph>;

export type GlassIconName = keyof typeof ICONS;

export function GlassIcon({ name, size = 48, className }: { name: GlassIconName; size?: number; className?: string }) {
  const icon: Glyph = ICONS[name];
  const u = `gi${useId().replace(/[^\w-]/g, '')}`;
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={cn('s-gico', className)} aria-hidden focusable="false">
      <defs>
        <clipPath id={`${u}c`}>{icon.glass}</clipPath>
        <filter id={`${u}f`} x="-8" y="-8" width="64" height="64" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="3.4" />
        </filter>
      </defs>
      <g className="gi-solid">{icon.back}</g>
      <g clipPath={`url(#${u}c)`}>
        <rect className="gi-glass" width="48" height="48" />
        <g className="gi-solid gi-blur" filter={`url(#${u}f)`}>
          {icon.back}
        </g>
      </g>
      <g className="gi-rim">{icon.glass}</g>
      {icon.mark && <g className="gi-mark">{icon.mark}</g>}
    </svg>
  );
}
