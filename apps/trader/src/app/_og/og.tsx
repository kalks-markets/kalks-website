import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { LOGO_D, MARK_D } from '@/components/brand/KalksLogo';

/**
 * Open Graph cards (1200 × 630) in the website's colours (2026-10-10): black with a Kalks-orange glow, the original
 * white Kalks logo, a small orange kicker, the page headline in Inter Tight, and the K mark large and faint in the
 * corner. No pictures; rendered at build time. Fonts are unmodified OFL files from Google Fonts kept next to this
 * file (next/og cannot use woff2).
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = 'image/png';

export type OgTone = 'yellow' | 'red' | 'ink' | 'plain';
type Tone = OgTone;

/** The tone names are kept for older callers; the cards are black + orange now. */
export const TONES: Record<Tone, { bg: string; fg: string; sub: string; kicker: string; kface: string; kedge: string; word: string }> = {
  yellow: { bg: '#050404', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.74)', kicker: '#FF7A2E', kface: '#FFFFFF', kedge: '#FFFFFF', word: '#FFFFFF' },
  red: { bg: '#050404', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.74)', kicker: '#FF7A2E', kface: '#FFFFFF', kedge: '#FFFFFF', word: '#FFFFFF' },
  ink: { bg: '#050404', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.74)', kicker: '#FF7A2E', kface: '#FFFFFF', kedge: '#FFFFFF', word: '#FFFFFF' },
  plain: { bg: '#F5EDE1', fg: '#1A1410', sub: '#5F5347', kicker: '#F2600C', kface: '#1A1410', kedge: '#1A1410', word: '#1A1410' },
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

export async function og({ kicker, title, sub }: { kicker: string; title: string; sub?: string; tone?: Tone }) {
  const fonts = await ogFonts();
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#050404' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundImage:
              'radial-gradient(circle at 88% 8%, rgba(242,96,12,0.62) 0%, rgba(242,96,12,0) 46%), radial-gradient(circle at 0% 100%, rgba(122,38,6,0.55) 0%, rgba(122,38,6,0) 45%)',
          }}
        />
        <svg width="560" height={Math.round((560 * 541) / 653)} viewBox="0 0 653 541" style={{ position: 'absolute', right: -60, bottom: -80 }}>
          {MARK_D.map((d, i) => (
            <path key={i} d={d} fill="rgba(242,96,12,0.22)" fillRule="evenodd" />
          ))}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', width: 1000, height: '100%' }}>
          <OgWordmark tone="red" width={200} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Instrument', fontSize: 22, color: '#FF7A2E', letterSpacing: 2.5, textTransform: 'uppercase' }}>
              <div style={{ width: 9, height: 9, borderRadius: 9, background: '#F2600C', marginRight: 14, display: 'flex' }} />
              {kicker}
            </div>
            <div style={{ marginTop: 20, fontFamily: 'Archivo', fontSize: title.length > 34 ? 66 : 80, lineHeight: 1.02, letterSpacing: -3, color: '#FFFFFF', maxWidth: 980 }}>
              {title}
            </div>
            {sub && <div style={{ marginTop: 22, fontFamily: 'Instrument', fontSize: 28, lineHeight: 1.35, color: 'rgba(255,255,255,0.74)', maxWidth: 760 }}>{sub}</div>}
          </div>
          <div style={{ fontFamily: 'Instrument', fontSize: 21, color: 'rgba(255,255,255,0.6)' }}>kalkstrade.com</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
