#!/usr/bin/env node
/**
 * Kalks 2 website imagery (KALKS2.md §8): one subject on one flat palette colour. Builds AVIF + WebP from the
 * founder's sources into public/images/k2/. Sources are never upscaled; each image is written at its native width
 * and smaller widths for phones. Run from apps/trader:  node scripts/k2-images.mjs
 *
 *   figure   docs/design/img/figure-yellow.jpg (the founder's figure, re-graded amber -> #FFD224); the dark floor strip
 *            at the bottom is cropped and the backdrop is snapped to the exact hex so the CSS extension never shows a seam
 *   robot    public/images/brand/src-hero-robot.png (the Kalks robot, red and black)
 *   emblem   kalks/Crimson Kalks Fashion Emblem.png (About)
 *   glyph    kalks/kalksmodel2.jpg (masked figure with yellow glyphs), blue skin graded to warm black, blacks lifted
 *            to ink #0B0809 so it sits on the ink hero without a box
 */
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync, existsSync } from 'node:fs';

const require = createRequire(import.meta.url);
const sharp = require('sharp');
const here = dirname(fileURLToPath(import.meta.url));
const app = resolve(here, '..');
const platform = resolve(app, '../../../kalks');
const out = resolve(app, 'public/images/k2');
mkdirSync(out, { recursive: true });

const SRC = {
  figure: resolve(platform, 'docs/design/img/figure-yellow.jpg'),
  robot: resolve(app, 'public/images/brand/src-hero-robot.png'),
  emblem: resolve(platform, 'Crimson Kalks Fashion Emblem.png'),
  glyph: resolve(platform, 'kalksmodel2.jpg'),
};

async function raw(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}
const fromRaw = ({ data, w, h }) => sharp(data, { raw: { width: w, height: h, channels: 3 } });

async function write(name, img, widths, ogWidth, avif = { quality: 58, chromaSubsampling: '4:4:4' }) {
  const meta = await img.clone().metadata();
  // a plain JPEG for the Open Graph images (next/og renders PNG/JPEG only)
  if (ogWidth) await img.clone().resize({ width: ogWidth, withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true }).toFile(resolve(out, `${name}-og.jpg`));
  for (const w of widths) {
    const base = w === widths[0] ? name : `${name}-${w}`;
    const s = img.clone().resize({ width: w, withoutEnlargement: true });
    await s.clone().avif({ effort: 6, ...avif }).toFile(resolve(out, `${base}.avif`));
    await s.clone().webp({ quality: 84, effort: 6 }).toFile(resolve(out, `${base}.webp`));
  }
  console.log(`${name}: ${meta.width}x${meta.height} -> ${widths.join(', ')}`);
}

/* figure on yellow: crop the floor, snap the backdrop to #FFD224 */
{
  const r = await raw(SRC.figure);
  const H = 1086; // rows below are the dark plinth strip
  const T = [0xff, 0xd2, 0x24];
  const d = Buffer.alloc(r.w * H * 3);
  for (let i = 0; i < r.w * H; i++) {
    const p = i * 3;
    const c = [r.data[p], r.data[p + 1], r.data[p + 2]];
    const dist = Math.hypot(c[0] - T[0], c[1] - T[1], (c[2] - T[2]) * 0.6);
    const k = dist < 18 ? 1 : dist < 46 ? 1 - (dist - 18) / 28 : 0;
    for (let j = 0; j < 3; j++) d[p + j] = Math.round(c[j] + (T[j] - c[j]) * k);
  }
  // the home LCP image: 4:2:0 at q52 is visually identical on flat yellow and half the bytes of 4:4:4
  await write('figure', fromRaw({ data: d, w: r.w, h: H }), [736, 480], 480, { quality: 52, chromaSubsampling: '4:2:0' });
}

/* robot */
await write('robot', sharp(SRC.robot), [1672, 1200, 800], 1000);

/* emblem */
if (existsSync(SRC.emblem)) await write('emblem', sharp(SRC.emblem), [1672, 1200, 800], 1000);

/* glyph figure: blue -> warm neutral, blacks lifted to ink */
{
  const r = await raw(SRC.glyph);
  const INK = [0x0b, 0x08, 0x09];
  const d = Buffer.alloc(r.data.length);
  for (let p = 0; p < r.data.length; p += 3) {
    let [R, G, B] = [r.data[p], r.data[p + 1], r.data[p + 2]];
    const mx = Math.max(R, G, B), mn = Math.min(R, G, B);
    const blueish = B >= R && B >= G && mx - mn > 4;
    if (blueish) {
      // keep luminance, drop the blue cast (warm grey)
      const L = 0.3 * R + 0.59 * G + 0.11 * B;
      const t = 0.9;
      R = R + (L * 1.04 - R) * t;
      G = G + (L * 0.99 - G) * t;
      B = B + (L * 0.97 - B) * t;
    }
    // lift blacks to ink (screen-like floor)
    d[p] = Math.round(INK[0] + (R * (255 - INK[0])) / 255);
    d[p + 1] = Math.round(INK[1] + (G * (255 - INK[1])) / 255);
    d[p + 2] = Math.round(INK[2] + (B * (255 - INK[2])) / 255);
  }
  await write('glyph', fromRaw({ data: d, w: r.w, h: r.h }), [673, 448], 400);
}
