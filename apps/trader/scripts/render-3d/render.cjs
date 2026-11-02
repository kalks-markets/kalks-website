// Renders scene.html in headless Chromium and saves each mark as a transparent WebP in public/site/3d.
// node scripts/render-3d/render.cjs  (needs playwright-core; three and sharp come from the app's node_modules)
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PW || 'playwright-core');
const sharp = require('sharp');

const app = path.resolve(__dirname, '../..');
const files = {
  '/scene.html': [path.join(__dirname, 'scene.html'), 'text/html'],
  '/mark.svg': [path.join(app, 'public/brand/kalks-mark.svg'), 'image/svg+xml'],
};
const three = path.join(app, 'node_modules/three');

(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1200, height: 1000 } });
  p.on('console', (m) => console.log('page:', m.text()));
  p.on('pageerror', (e) => console.log('pageerror:', e.message));
  await p.route('http://render.local/**', (route) => {
    const u = new URL(route.request().url()).pathname;
    const [file, type] = files[u] ?? [path.join(three, u.replace(/^\/three\//, '')), 'text/javascript'];
    route.fulfill({ body: fs.readFileSync(file), contentType: type });
  });
  for (const [obj, out] of [['k', 'k-mark'], ['ring', 'ring']]) {
    await p.goto(`http://render.local/scene.html?obj=${obj}`);
    await p.waitForFunction(() => window.__done, null, { timeout: 120000 });
    const data = await p.evaluate(() => document.querySelector('canvas').toDataURL('image/png'));
    const png = Buffer.from(data.split(',')[1], 'base64');
    const dest = path.join(app, 'public/site/3d', `${out}.webp`);
    await sharp(png).resize(1200, 1000).webp({ quality: 88, alphaQuality: 100, effort: 6 }).toFile(dest);
    fs.writeFileSync(path.join(process.env.TMPDIR || '/tmp', `${out}.png`), png);
    console.log('saved', dest);
  }
  await b.close();
})();
