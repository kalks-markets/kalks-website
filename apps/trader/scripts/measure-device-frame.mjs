// Where the screen sits in a hand-and-phone photo (IMAGES.pocketTerminalFrame), for POCKET_FRAME in
// src/components/site/ImageSlot.tsx. Usage: node scripts/measure-device-frame.mjs public/site/frame.webp
// From the centre pixel: transparent (alpha < 16) = hole mode, the screen sits under the frame; otherwise overlay mode
// (the frame's screen is black), the screen sits on top. Walks out while pixels still match, then prints the edges in
// % of the image (overlay mode inset by 0.6 %). Check the result on the page with ?pt-debug.
import sharp from 'sharp';

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts/measure-device-frame.mjs <frame image>');
  process.exit(1);
}
const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const px = (x, y) => {
  const i = (y * W + x) * C;
  return [data[i], data[i + 1], data[i + 2], data[i + 3]];
};
const cx = Math.floor(W / 2);
const cy = Math.floor(H / 2);
const hole = px(cx, cy)[3] < 16;
const inScreen = (x, y) => {
  const [r, g, b, a] = px(x, y);
  return hole ? a < 16 : Math.max(r, g, b) < 28;
};
const walk = (dx, dy) => {
  let x = cx;
  let y = cy;
  while (x + dx >= 0 && x + dx < W && y + dy >= 0 && y + dy < H && inScreen(x + dx, y + dy)) {
    x += dx;
    y += dy;
  }
  return dx ? x : y;
};
const left = walk(-1, 0);
const right = walk(1, 0);
const top = walk(0, -1);
const bottom = walk(0, 1);
const inset = hole ? 0 : 0.6;
const pct = (v, total) => `${((v / total) * 100).toFixed(2)}%`;
const sx = pct(left + (inset / 100) * W, W);
const sy = pct(top + (inset / 100) * H, H);
const sw = pct(right - left - (2 * inset * W) / 100, W);
const sh = pct(bottom - top - (2 * inset * H) / 100, H);
console.log(`mode: ${hole ? 'hole (screen under the frame)' : 'overlay (screen on top)'}`);
console.log(`POCKET_FRAME = { sx: '${sx}', sy: '${sy}', sw: '${sw}', sh: '${sh}', overlay: ${!hole} }`);
