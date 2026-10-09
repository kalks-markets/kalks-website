import type { Metadata, Viewport } from 'next';
import { Golos_Text, Be_Vietnam_Pro, Inter_Tight } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import './kx.css';
import Nav from '@/components/chrome/Nav';
import Footer from '@/components/chrome/Footer';
import GoogleTranslate from '@/components/chrome/GoogleTranslate';
import CampaignForwarder from '@/components/util/CampaignForwarder';
import { BrandSprite } from '@/components/brand/Logo';
import { FieldBackdrop } from '@/components/kx/FieldBackdrop';
import { THEME_BOOT } from '@/lib/theme';
import { BRAND_NAME, SITE_URL } from '@/lib/brand';

/* Type: Inter Tight for everything (OFL, self-hosted by next/font; only Latin is preloaded, Latin Extended and
   Cyrillic load when those glyphs appear on a translated page). JetBrains Mono for prices. Be Vietnam Pro covers
   Vietnamese text, Golos Text is a last Cyrillic fallback; other scripts use the system's fonts. */
const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-inter-tight', display: 'swap' });
const interTightExt = Inter_Tight({ subsets: ['latin-ext', 'cyrillic'], variable: '--font-inter-tight-ext', display: 'swap', preload: false, adjustFontFallback: false });
/* JetBrains Mono, instanced to wght 500–700 (30 KB); other scripts use the system monospace. */
const jbmono = localFont({ src: './fonts/jbmono-k2-latin.woff2', weight: '500 700', variable: '--font-jbmono', display: 'swap', preload: false });
const golos = Golos_Text({ subsets: ['cyrillic'], variable: '--font-golos', display: 'swap', preload: false });
const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-bevietnam',
  display: 'swap',
  preload: false,
});

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
    { media: '(prefers-color-scheme: light)', color: '#2447e0' },
    { media: '(prefers-color-scheme: dark)', color: '#2447e0' },
  ],
  colorScheme: 'dark',
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
      data-theme="dark"
      className={`${interTight.variable} ${interTightExt.variable} ${jbmono.variable} ${golos.variable} ${beVietnam.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <link rel="preconnect" href="https://api.kalkstrade.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      </head>
      <body suppressHydrationWarning>
        <BrandSprite />
        <FieldBackdrop />
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
