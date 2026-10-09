import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { LOGO_D, MARK_D } from '@/components/brand/KalksLogo';

/**
 * Open Graph cards (1200 × 630) in the website's colours: the royal-blue arrow field, a light-blue glow, the
 * original white Kalks logo, a small kicker and the page headline in Inter Tight. No pictures; rendered at build
 * time. Fonts are unmodified OFL files from Google Fonts kept next to this file (next/og cannot use woff2).
 * TONES / OgWordmark / OgK / ogFonts are shared with the Kalks Circle cards (circle/_og).
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = 'image/png';

export type OgTone = 'yellow' | 'red' | 'ink' | 'plain';
type Tone = OgTone;

/** The tone names are kept for older callers; every tone is now blue, navy or light. */
export const TONES: Record<Tone, { bg: string; fg: string; sub: string; kicker: string; kface: string; kedge: string; word: string }> = {
  yellow: { bg: '#2447E0', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.86)', kicker: 'rgba(255,255,255,0.8)', kface: '#FFFFFF', kedge: '#FFFFFF', word: '#FFFFFF' },
  red: { bg: '#2447E0', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.86)', kicker: 'rgba(255,255,255,0.8)', kface: '#FFFFFF', kedge: '#FFFFFF', word: '#FFFFFF' },
  ink: { bg: '#0B1640', fg: '#F5F7FF', sub: '#B9C2DC', kicker: '#A9C3F3', kface: '#FFFFFF', kedge: '#FFFFFF', word: '#FFFFFF' },
  plain: { bg: '#F4F7FF', fg: '#0B1640', sub: '#4A5578', kicker: '#1F3FD6', kface: '#0B1640', kedge: '#0B1640', word: '#0B1640' },
};

const root = process.cwd();
const font = (f: string) => readFile(join(root, 'src/app/_og', f));

/** next/og font entries. The family names are the ones the Circle cards already use. */
export async function ogFonts() {
  const [semi, med, mono] = await Promise.all([font('InterTight-SemiBold.woff'), font('InterTight-Medium.woff'), font('JetBrainsMono-SemiBold.ttf')]);
  return [
    { name: 'Archivo', data: semi, weight: 800 as const, style: 'normal' as const },
    { name: 'Instrument', data: med, weight: 500 as const, style: 'normal' as const },
    { name: 'JBMono', data: mono, weight: 600 as const, style: 'normal' as const },
  ];
}

/** The original Kalks wordmark in the tone's ink. */
export function OgWordmark({ tone, width = 190 }: { tone: Tone; width?: number }) {
  const t = TONES[tone];
  return (
    <svg width={width} height={Math.round((width * 541) / 1954)} viewBox="0 0 1954 541">
      {LOGO_D.map((d, i) => (
        <path key={i} d={d} fill={t.word} fillRule="evenodd" />
      ))}
    </svg>
  );
}

/** The original K mark on its own. */
export function OgK({ tone, width = 420, style }: { tone: Tone; width?: number; style?: Record<string, string | number> }) {
  const t = TONES[tone];
  return (
    <svg width={width} height={Math.round((width * 541) / 653)} viewBox="0 0 653 541" style={style}>
      {MARK_D.map((d, i) => (
        <path key={i} d={d} fill={t.word} fillRule="evenodd" />
      ))}
    </svg>
  );
}

/** A grid of small north-east arrows as one path (the field, drawn faintly behind the card). */
function arrowField(w: number, h: number, cell: number) {
  let d = '';
  const s = cell * 0.3;
  for (let y = cell / 2; y < h; y += cell)
    for (let x = cell / 2; x < w; x += cell) {
      d += `M${x - s} ${y + s}L${x + s} ${y - s}M${x - s * 0.1} ${y - s}H${x + s}V${y + s * 0.1}`;
    }
  return d;
}
const FIELD = arrowField(1200, 630, 22);

export async function og({ kicker, title, sub }: { kicker: string; title: string; sub?: string; tone?: Tone }) {
  const fonts = await ogFonts();
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: 'linear-gradient(180deg, #2447E0 0%, #2F5BFF 60%, #3563FF 100%)' }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', left: 0, top: 0 }}>
          <path d={FIELD} fill="none" stroke="rgba(230,237,255,0.22)" strokeWidth="1.6" />
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundImage:
              'radial-gradient(circle at 78% 30%, rgba(169,195,243,0.55) 0%, rgba(169,195,243,0) 42%), radial-gradient(circle at 10% 100%, rgba(11,22,64,0.45) 0%, rgba(11,22,64,0) 50%)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', width: 1000, height: '100%' }}>
          <OgWordmark tone="red" width={200} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Instrument', fontSize: 22, color: 'rgba(255,255,255,0.86)', letterSpacing: 2.5, textTransform: 'uppercase' }}>
              <div style={{ width: 9, height: 9, borderRadius: 9, background: '#FFFFFF', marginRight: 14, display: 'flex' }} />
              {kicker}
            </div>
            <div style={{ marginTop: 20, fontFamily: 'Archivo', fontSize: title.length > 34 ? 66 : 80, lineHeight: 1.02, letterSpacing: -3, color: '#FFFFFF', maxWidth: 980 }}>
              {title}
            </div>
            {sub && <div style={{ marginTop: 22, fontFamily: 'Instrument', fontSize: 28, lineHeight: 1.35, color: 'rgba(255,255,255,0.86)', maxWidth: 760 }}>{sub}</div>}
          </div>
          <div style={{ fontFamily: 'Instrument', fontSize: 21, color: 'rgba(255,255,255,0.75)' }}>kalkstrade.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
