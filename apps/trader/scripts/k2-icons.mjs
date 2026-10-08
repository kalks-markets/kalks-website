#!/usr/bin/env node
/**
 * Kalks 2 icons (KALKS2 §9): black #0B0809 rounded square, the K as a NeoPOP block (red face, yellow edge) at 60 %
 * of the width, nudged up-left by half the edge so the block looks centred. Writes src/app/icon.png (32),
 * src/app/apple-icon.png (180), public/icons/icon-192.png, icon-512.png, maskable-512.png and public/favicon.ico (32).
 * Run from apps/trader:  node scripts/k2-icons.mjs
 */
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const app = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const K = /K_PATH =\s*'([^']+)'/.exec(readFileSync(resolve(app, 'src/components/brand/paths.ts'), 'utf8'))[1];

function svg(size, { radius = 0.225, scale = 0.6, edge = true, bleed = false } = {}) {
  const kw = 690 * (size * scale) / 690; // K drawn in a 690 × 580 box
  const s = (size * scale) / 690;
  const kh = 580 * s;
  const dx = (size - kw) / 2 - 15 * s;
  const dy = (size - kh) / 2 - 15 * s;
  const steps = edge ? Array.from({ length: 15 }, (_, i) => (i + 1) * 2) : [];
  const r = bleed ? 0 : size * radius;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#0B0809"/>
  <g transform="translate(${dx} ${dy}) scale(${s})">
    ${steps.map((o) => `<path d="${K}" fill="#FFD21F" transform="translate(${o} ${o})"/>`).join('')}
    <path d="${K}" fill="#D4112A"/>
  </g>
</svg>`;
}

const png = (size, opts, out) => sharp(Buffer.from(svg(size, opts))).png().toFile(resolve(app, out));
await png(32, { radius: 0.25, scale: 0.66 }, 'src/app/icon.png');
await png(180, { radius: 0, scale: 0.6, bleed: true }, 'src/app/apple-icon.png');
await png(192, {}, 'public/icons/icon-192.png');
await png(512, {}, 'public/icons/icon-512.png');
await png(512, { scale: 0.46, bleed: true }, 'public/icons/maskable-512.png');
// favicon.ico: a single 32 px PNG inside an ICO container
const p32 = await sharp(Buffer.from(svg(32, { radius: 0.25, scale: 0.66 }))).png().toBuffer();
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12); head.writeUInt32LE(p32.length, 14); head.writeUInt32LE(22, 18);
writeFileSync(resolve(app, 'public/favicon.ico'), Buffer.concat([head, p32]));
console.log('icons written');
