// The home page's closing band squares (node scripts/cta-squares.mjs): a strip that tiles sideways, dense at the edge it sits on and thinning away from it
// (a seeded random dither, so the file never changes). Writes cta-squares-top.svg and cta-squares-bottom.svg.
import { writeFileSync } from 'fs';
const OUT = new URL('../public/site/home/', import.meta.url).pathname;
const W = 960, H = 272, CELL = 16, SQ = 6, ROWS = H / CELL, COLS = W / CELL;
let seed = 20261102;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const cells = [];
for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
  const p = Math.pow(Math.max(0, 1 - r / (ROWS - 1)), 1.7) * 0.92;
  if (rnd() < p) cells.push({ r, c, hi: rnd() < 0.35 });
}
const path = (flip, hi) => cells.filter((x) => x.hi === hi).map(({ r, c }) => `M${c * CELL + 5} ${(flip ? H - CELL - r * CELL : r * CELL) + 5}h${SQ}v${SQ}h-${SQ}z`).join('');
for (const [name, flip] of [['top', false], ['bottom', true]]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><path fill="#f2600c" fill-opacity=".55" d="${path(flip, false)}"/><path fill="#ff7a2e" d="${path(flip, true)}"/></svg>`;
  writeFileSync(`${OUT}cta-squares-${name}.svg`, svg);
  console.log(name, svg.length, 'bytes', cells.length, 'squares');
}
