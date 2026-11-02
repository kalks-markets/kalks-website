/*
 * The safety cards' pictures as isometric line art (founder 2026-11-02, reference: dark cards with white outline
 * drawings, a soft glow on one detail of each, specks of light around). Drawn here in SVG, not images: every solid
 * is a slab (an outline on a plane, pushed back by its thickness) filled with the card's colour, so whatever stands
 * in front hides what is behind, back to front. The line, fill and glow colours come from the card (home.css
 * .rf-trust-card), so the drawings follow the theme.
 */

type P2 = readonly [number, number];
type P3 = readonly [number, number, number];

const CX = Math.cos(Math.PI / 6);
const X: P3 = [1, 0, 0];
const Y: P3 = [0, 1, 0];
const Z: P3 = [0, 0, 1];
const NY: P3 = [0, -1, 0];

/** isometric: x runs right and down, y left and down, z up; the viewer looks from (1, 1, 1) */
const pr = ([x, y, z]: P3): P2 => [(x - y) * CX, (x + y) / 2 - z];
const add = (a: P3, b: P3, k = 1): P3 => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
/** the point (a, b) of the plane through o spanned by u and v */
const at = (o: P3, u: P3, v: P3, a: number, b: number) => add(add(o, u, a), v, b);
const lay = (pts: readonly P2[], o: P3, u: P3, v: P3) => pts.map(([a, b]) => at(o, u, v, a, b));

function rrect(w: number, h: number, r: number, n = 6): P2[] {
  const out: P2[] = [];
  const corners: P2[] = [
    [w / 2 - r, h / 2 - r],
    [-w / 2 + r, h / 2 - r],
    [-w / 2 + r, -h / 2 + r],
    [w / 2 - r, -h / 2 + r],
  ];
  corners.forEach(([cx, cy], k) => {
    for (let i = 0; i <= n; i++) {
      const a = ((k + i / n) * Math.PI) / 2;
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
  });
  return out;
}

const circle = (r: number, n = 56): P2[] => Array.from({ length: n }, (_, i) => [r * Math.cos((2 * Math.PI * i) / n), r * Math.sin((2 * Math.PI * i) / n)] as P2);

const fx = (n: number) => String(Math.round(n * 10) / 10);
const d2 = (pts: readonly P2[], close = true) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${fx(x)} ${fx(y)}`).join('') + (close ? 'Z' : '');
const d3 = (pts: readonly P3[], close = true) => d2(pts.map(pr), close);

function hull(ps: P2[]): P2[] {
  const p = [...ps].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: P2, a: P2, b: P2) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo: P2[] = [];
  const up: P2[] = [];
  for (const q of p) {
    while (lo.length >= 2 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop();
    lo.push(q);
  }
  for (const q of p.reverse()) {
    while (up.length >= 2 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop();
    up.push(q);
  }
  return [...lo.slice(0, -1), ...up.slice(0, -1)];
}

/** a solid slab: its face toward the viewer, and the same outline t behind it along -n; the side is the hull of both */
function Slab({ face, n, t }: { face: P3[]; n: P3; t: number }) {
  const back = face.map((p) => add(p, n, -t));
  return (
    <>
      <path className="la-solid" d={d2(hull([...face, ...back].map(pr)))} />
      <path className="la-solid" d={d3(face)} />
    </>
  );
}

/** specks of light: a fixed scatter (seeded, so the server and every visit draw the same) */
function Specks({ seed, box: [x0, y0, w, h] }: { seed: number; box: [number, number, number, number] }) {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  return (
    <g className="la-speck">
      {Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={fx(x0 + rnd() * w)} cy={fx(y0 + rnd() * h)} r={fx(0.6 + rnd() * 0.9)} opacity={fx(0.25 + rnd() * 0.6)} />
      ))}
    </g>
  );
}

/** a soft glow and a sharp core of the same shape */
function Glow({ id, d, core = true }: { id: string; d: string; core?: boolean }) {
  return (
    <>
      <path className="la-halo" d={d} filter={`url(#${id}-blur)`} />
      {core && <path className="la-glow" d={d} />}
    </>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={`${id}-blur`} x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
      <linearGradient id={`${id}-beam`} x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stopColor="var(--art-glow)" stopOpacity="0.24" />
        <stop offset="1" stopColor="var(--art-glow)" stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${id}-pool`}>
        <stop offset="0" stopColor="var(--art-glow)" stopOpacity="0.3" />
        <stop offset="1" stopColor="var(--art-glow)" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/** A code for new devices: an envelope, and the code rising out of it on a tile, its four digits lit. */
function CodeArt() {
  const id = 'la-code';
  const top: P3 = [0, 0, 8];
  const c = (a: number, b: number) => at(top, X, Y, a, b);
  const tip = c(2, 8);
  const tileO: P3 = [0, 0, 110];
  const dots = [-39, -13, 13, 39].map((u) => d3(lay(circle(5.5, 28), at(tileO, X, Z, u, 0), X, Z)));
  return (
    <svg className="rf-art" viewBox="-122 -184 245 259" aria-hidden>
      <Defs id={id} />
      <Specks seed={11} box={[-122, -184, 245, 259]} />
      <path d={d3(lay(circle(70), top, X, Y))} fill={`url(#${id}-pool)`} />
      <Slab face={lay(rrect(150, 100, 6), top, X, Y)} n={Z} t={8} />
      <path className="la-line" d={d3([c(-75, -50), tip, c(75, -50)], false)} />
      <path className="la-line la-faint" d={d3([c(-75, 50), tip, c(75, 50)], false)} />
      <path d={d3([c(-24, 0), c(24, 0), at(top, X, Z, 24, 74), at(top, X, Z, -24, 74)])} fill={`url(#${id}-beam)`} />
      <Slab face={lay(rrect(124, 58, 12), tileO, X, Z)} n={Y} t={9} />
      {dots.map((dd, i) => (
        <Glow key={i} id={id} d={dd} />
      ))}
    </svg>
  );
}

/** One USDT wallet: a phone lying flat, one coin sinking into it through a lit slot and another falling in after it. */
function WalletArt() {
  const id = 'la-wallet';
  const top: P3 = [0, 0, 8];
  const cy = 14;
  const coinB: P3 = [3, cy, 8];
  const coinA: P3 = [3, cy, 96];
  // the screen cuts the sinking coin: keep what lies above the line where its face meets the screen
  const [lx, ly] = pr(coinB);
  const [dx, dy] = pr(Y);
  const clip = d2([
    [lx - dx * 400, ly - dy * 400],
    [lx + dx * 400, ly + dy * 400],
    [lx + dx * 400, ly + dy * 400 - 600],
    [lx - dx * 400, ly - dy * 400 - 600],
  ]);
  const coin = (o: P3) => (
    <>
      <Slab face={lay(circle(26), o, Y, Z)} n={X} t={6} />
      <path className="la-line la-faint" d={d3(lay(circle(19), o, Y, Z))} />
    </>
  );
  return (
    <svg className="rf-art" viewBox="-116 -134 232 207" aria-hidden>
      <Defs id={id} />
      <clipPath id={`${id}-cut`}>
        <path d={clip} />
      </clipPath>
      <Specks seed={23} box={[-116, -134, 232, 207]} />
      <Slab face={lay(rrect(84, 168, 14), top, X, Y)} n={Z} t={8} />
      <path className="la-screen" d={d3(lay(rrect(72, 154, 9), top, X, Y))} />
      <path className="la-line la-faint" d={d3(lay(rrect(22, 5, 2.5), at(top, X, Y, 0, -70), X, Y))} />
      <path d={d3(lay(circle(44), at(top, X, Y, 0, cy), X, Y))} fill={`url(#${id}-pool)`} />
      <path d={d3([at(top, Y, Z, cy - 26, 0), at(top, Y, Z, cy + 26, 0), at(top, Y, Z, cy + 26, 62), at(top, Y, Z, cy - 26, 62)])} fill={`url(#${id}-beam)`} />
      <g clipPath={`url(#${id}-cut)`}>{coin(coinB)}</g>
      <Glow id={id} d={d3([at(coinB, Y, Z, -27, 0), at(coinB, Y, Z, 27, 0)], false)} core={false} />
      <path className="la-glow-line" d={d3([at(coinB, Y, Z, -24, 0), at(coinB, Y, Z, 24, 0)], false)} />
      {coin(coinA)}
    </svg>
  );
}

/** Verified withdrawals: an identity card under a camera's scan, a lit scan line across it, a check badge. */
function IdArt() {
  const id = 'la-id';
  const o: P3 = [0, 0, 64];
  const f = (a: number, b: number) => at(o, NY, Z, a, b);
  const front: P3 = [5, 0, 64];
  const g = (a: number, b: number) => at(front, NY, Z, a, b);
  const shoulders = Array.from({ length: 25 }, (_, i) => {
    const a = (Math.PI * i) / 24;
    return f(-46 - 17 * Math.cos(a), -23 + 15 * Math.sin(a));
  });
  const corner = (a: number, b: number, sa: number, sb: number) => d3([g(a + 22 * sa, b), g(a, b), g(a, b + 22 * sb)], false);
  const badge: P3 = add(f(74, 46), X, 22);
  return (
    <svg className="rf-art" viewBox="-96 -189 208 255" aria-hidden>
      <Defs id={id} />
      <Specks seed={37} box={[-96, -189, 208, 255]} />
      <Slab face={lay(rrect(156, 100, 10), o, NY, Z)} n={X} t={8} />
      <path className="la-screen" d={d3(lay(rrect(46, 58, 6), f(-46, 4), NY, Z))} />
      <path className="la-line" d={d3(lay(circle(9, 32), f(-46, 10), NY, Z))} />
      <path className="la-line" d={d3(shoulders, false)} />
      <path className="la-line" d={d3([f(-10, 22), f(58, 22)], false)} />
      <path className="la-line" d={d3([f(-10, 8), f(42, 8)], false)} />
      <path className="la-line la-faint" d={d3([f(-10, -6), f(50, -6)], false)} />
      <path className="la-line la-faint" d={d3([f(-10, -20), f(26, -20)], false)} />
      <path d={d3([g(-100, -4), g(100, -4), g(100, 30), g(-100, 30)])} fill={`url(#${id}-beam)`} />
      <Glow id={id} d={d3([g(-100, -4), g(100, -4)], false)} core={false} />
      <path className="la-glow-line" d={d3([g(-96, -4), g(96, -4)], false)} />
      <path className="la-line" d={corner(-95, 66, 1, -1)} />
      <path className="la-line" d={corner(95, 66, -1, -1)} />
      <path className="la-line" d={corner(-95, -66, 1, 1)} />
      <path className="la-line" d={corner(95, -66, -1, 1)} />
      <Slab face={lay(circle(17), badge, NY, Z)} n={X} t={5} />
      <path className="la-glow-line" d={d3([at(badge, NY, Z, -7, 0), at(badge, NY, Z, -2, -5), at(badge, NY, Z, 8, 6)], false)} />
    </svg>
  );
}

export type LineArtName = 'code' | 'wallet' | 'id';

export function LineArt({ name }: { name: LineArtName }) {
  return name === 'code' ? <CodeArt /> : name === 'wallet' ? <WalletArt /> : <IdArt />;
}
