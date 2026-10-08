import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Golos_Text, Unbounded, Be_Vietnam_Pro } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/chrome/Nav';
import Footer from '@/components/chrome/Footer';
import GoogleTranslate from '@/components/chrome/GoogleTranslate';
import CampaignForwarder from '@/components/util/CampaignForwarder';
import { BrandSprite } from '@/components/brand/Logo';
import { THEME_BOOT } from '@/lib/theme';
import { BRAND_NAME, SITE_URL } from '@/lib/brand';

/* Kalks 2 type (KALKS2 §3): Archivo (display), Instrument Sans (text), JetBrains Mono (prices).
   Archivo is self-hosted as a variable font cut to the axis ranges the site uses (wdth 108–125, wght 700–800; Google's
   OFL file instanced with fontTools: 41 KB instead of 90 KB per subset). latin-ext and Vietnamese load only when those
   glyphs appear (Google-translated pages). Fallbacks for other scripts load the same way: Golos Text + Unbounded
   (Cyrillic), Be Vietnam Pro (Vietnamese text). */
const archivo = localFont({
  src: './fonts/archivo-k2-latin.woff2',
  weight: '700 800',
  variable: '--font-archivo',
  display: 'swap',
  declarations: [{ prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const archivoExt = localFont({
  src: './fonts/archivo-k2-latin-ext.woff2',
  weight: '700 800',
  variable: '--font-archivo-ext',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const archivoVi = localFont({
  src: './fonts/archivo-k2-vietnamese.woff2',
  weight: '700 800',
  variable: '--font-archivo-vi',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: 'unicode-range', value: 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB' }],
});
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' });
/* JetBrains Mono, instanced to wght 500–700 (30 KB); other scripts use the system monospace. */
const jbmono = localFont({ src: './fonts/jbmono-k2-latin.woff2', weight: '500 700', variable: '--font-jbmono', display: 'swap', preload: false });
const golos = Golos_Text({ subsets: ['cyrillic'], variable: '--font-golos', display: 'swap', preload: false });
const unbounded = Unbounded({ subsets: ['cyrillic'], weight: ['700', '800'], variable: '--font-unbounded', display: 'swap', preload: false });
const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bevietnam',
  display: 'swap',
  preload: false,
});

/* The display stack: Archivo, then its latin-ext / Vietnamese cuts, then Archivo's size-matched fallback (so those
   glyphs never drop to the fallback while the cuts exist). */
const fams = (f: { style: { fontFamily: string } }) => f.style.fontFamily.split(',').map((x) => x.trim());
const [archivoMain, archivoFallback] = fams(archivo);
const DISP_STACK = `:root{--font-disp-stack:${[archivoMain, fams(archivoExt)[0], fams(archivoVi)[0], archivoFallback].filter(Boolean).join(', ')}}`;

const TITLE = `${BRAND_NAME}: options on forex, CFDs and prop trading`;
const DESCRIPTION =
  'Calls and puts on forex, gold, silver and oil, where buying an option means the premium is the most you can lose. Plus CFDs on 261 live markets, prop challenges, copy trading and PAMM. Start with $10, fund with USDT.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${BRAND_NAME}` },
  description: DESCRIPTION,
  applicationName: BRAND_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: BRAND_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F1EE' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0809' },
  ],
  colorScheme: 'light dark',
};

const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BRAND_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/brand/kalks-mark.svg`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${archivoExt.variable} ${archivoVi.variable} ${instrument.variable} ${jbmono.variable} ${golos.variable} ${unbounded.variable} ${beVietnam.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <style dangerouslySetInnerHTML={{ __html: DISP_STACK }} />
        <link rel="preconnect" href="https://api.kalkstrade.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      </head>
      <body suppressHydrationWarning>
        <BrandSprite />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <CampaignForwarder />
        <GoogleTranslate />
      </body>
    </html>
  );
}
