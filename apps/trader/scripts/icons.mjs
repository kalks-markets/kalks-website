#!/usr/bin/env node
/**
 * Website icons: the original white Kalks K mark (public/brand/kalks-mark.svg) on a royal-blue (#2447E0) rounded
 * square. Writes src/app/icon.png (32), src/app/apple-icon.png (180), public/icons/icon-192.png, icon-512.png,
 * maskable-512.png (full bleed, safe zone) and public/favicon.ico (32, PNG-in-ICO).
 * Run from apps/trader:  node scripts/icons.mjs
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mark = readFileSync(resolve(app, 'public/brand/kalks-mark.svg'), 'utf8');
const inner = /<svg[^>]*>([\s\S]*)<\/svg>/.exec(mark)[1];

function svg(size, { radius = 0.22, scale = 0.56, bleed = false } = {}) {
  const w = size * scale; // mark drawn in a 653 × 541 box
  const s = w / 653;
  const h = 541 * s;
  const x = (size - w) / 2;
  const y = (size - h) / 2;
  const r = bleed ? 0 : size * radius;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#2447E0"/>
  <g transform="translate(${x} ${y}) scale(${s})" fill="#FFFFFF">${inner.replace(/currentColor/g, '#FFFFFF')}</g>
</svg>`);
}
const png = (size, o) => sharp(svg(size, o)).png().toBuffer();

writeFileSync(resolve(app, 'src/app/icon.png'), await png(32, { scale: 0.62 }));
writeFileSync(resolve(app, 'src/app/apple-icon.png'), await png(180, { bleed: true, scale: 0.52 }));
writeFileSync(resolve(app, 'public/icons/icon-192.png'), await png(192));
writeFileSync(resolve(app, 'public/icons/icon-512.png'), await png(512));
writeFileSync(resolve(app, 'public/icons/maskable-512.png'), await png(512, { bleed: true, scale: 0.44 }));
// favicon.ico: one 32 × 32 PNG wrapped in an ICO header
const ico32 = await png(32, { scale: 0.62 });
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6);
head.writeUInt8(32, 7);
head.writeUInt8(0, 8);
head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10);
head.writeUInt16LE(32, 12);
head.writeUInt32LE(ico32.length, 14);
head.writeUInt32LE(22, 18);
writeFileSync(resolve(app, 'public/favicon.ico'), Buffer.concat([head, ico32]));
console.log('icons written');
