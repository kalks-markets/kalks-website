import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { K_EDGE_STEPS, K_PATH, REST_PATH } from '@/components/brand/paths';

/**
 * Open Graph cards in the Kalks 2 style (1200 × 630): one flat palette colour, the K wordmark, a mono kicker, the page
 * headline in Archivo Expanded ExtraBold, and the page's hero subject on the right. Rendered at build time (static).
 * Fonts are static OFL instances from Google Fonts kept next to this file (next/og cannot use variable axes).
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = 'image/png';

type Tone = 'yellow' | 'red' | 'ink' | 'plain';

const TONES: Record<Tone, { bg: string; fg: string; sub: string; kicker: string; kface: string; kedge: string; word: string }> = {
  yellow: { bg: '#FFD224', fg: '#0B0809', sub: '#2A2016', kicker: '#4A3A20', kface: '#D4112A', kedge: '#0B0809', word: '#0B0809' },
  red: { bg: '#D4112A', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.86)', kicker: 'rgba(255,255,255,0.78)', kface: '#0B0809', kedge: '#FFD21F', word: '#FFFFFF' },
  ink: { bg: '#0B0809', fg: '#F6EEE8', sub: '#B8AAA5', kicker: '#FFD21F', kface: '#D4112A', kedge: '#FFD21F', word: '#F6EEE8' },
  plain: { bg: '#F6F1EE', fg: '#160F0E', sub: '#5A4E4C', kicker: '#C8102E', kface: '#D4112A', kedge: '#FFD21F', word: '#0B0809' },
};

const root = process.cwd();
const font = (f: string) => readFile(join(root, 'src/app/_og', f));
const image = async (f: string) => `data:image/jpeg;base64,${(await readFile(join(root, 'public/images/k2', f))).toString('base64')}`;

export async function og({
  kicker,
  title,
  sub,
  tone,
  img,
  imgFit = 'right',
}: {
  kicker: string;
  title: string;
  sub?: string;
  tone: Tone;
  /** a JPEG from public/images/k2 (…-og.jpg) */
  img?: string;
  /** 'right': a portrait subject on the right edge · 'cover': a wide image on the right half */
  imgFit?: 'right' | 'cover';
}) {
  const t = TONES[tone];
  const [disp, text, mono] = await Promise.all([
    font('Archivo-ExpandedExtraBold.ttf'),
    font('InstrumentSans-Medium.ttf'),
    font('JetBrainsMono-SemiBold.ttf'),
  ]);
  const src = img ? await image(img) : null;
  const wide = imgFit === 'cover';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: t.bg, position: 'relative' }}>
        {src && !wide && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" width={428} height={630} style={{ position: 'absolute', right: 40, bottom: 0, height: 630, width: 428, objectFit: 'cover' }} />
        )}
        {src && wide && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" width={640} height={630} style={{ position: 'absolute', right: 0, top: 0, height: 630, width: 640, objectFit: 'cover' }} />
        )}
        {src && wide && (
          <div style={{ position: 'absolute', right: 380, top: 0, width: 260, height: 630, display: 'flex', backgroundImage: `linear-gradient(90deg, ${t.bg}, transparent)` }} />
        )}
        {!src && (
          <svg width="420" height="353" viewBox="0 0 690 580" style={{ position: 'absolute', right: 70, top: 140 }}>
            {K_EDGE_STEPS.map((o) => (
              <path key={o} d={K_PATH} fill={t.kedge} transform={`translate(${o} ${o})`} />
            ))}
            <path d={K_PATH} fill={t.kface} />
          </svg>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', width: src ? 720 : 760, height: '100%' }}>
          <svg width="190" height="55" viewBox="0 0 1990 580">
            {K_EDGE_STEPS.map((o) => (
              <path key={o} d={K_PATH} fill={t.kedge} transform={`translate(${o} ${o})`} />
            ))}
            <path d={K_PATH} fill={t.kface} />
            <path d={REST_PATH} fill={t.word} fillRule="evenodd" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'JBMono', fontSize: 22, color: t.kicker, letterSpacing: 1 }}>{kicker}</div>
            <div style={{ marginTop: 22, fontFamily: 'Archivo', fontSize: title.length > 34 ? 62 : 74, lineHeight: 0.95, letterSpacing: -2.6, color: t.fg }}>
              {title}
            </div>
            {sub && <div style={{ marginTop: 24, fontFamily: 'Instrument', fontSize: 26, lineHeight: 1.35, color: t.sub, maxWidth: 600 }}>{sub}</div>}
          </div>
          <div style={{ fontFamily: 'JBMono', fontSize: 20, color: t.kicker }}>kalkstrade.com</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Archivo', data: disp, weight: 800, style: 'normal' },
        { name: 'Instrument', data: text, weight: 500, style: 'normal' },
        { name: 'JBMono', data: mono, weight: 600, style: 'normal' },
      ],
    },
  );
}
