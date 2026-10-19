import type { Metadata, Viewport } from 'next';
import { Golos_Text, Be_Vietnam_Pro, Inter_Tight } from 'next/font/google';
import localFont from 'next/font/local';
import { draftMode } from 'next/headers';
import './globals.css';
import './site.css';
import Nav from '@/components/site/Nav';
import Footer from '@/components/site/Footer';
import GoogleTranslate from '@/components/chrome/GoogleTranslate';
import CampaignForwarder from '@/components/util/CampaignForwarder';
import { BrandSprite } from '@/components/brand/Logo';
import { ContentProvider } from '@/components/site/ContentContext';
import { PreviewBadge } from '@/components/chrome/PreviewBadge';
import { PSHOTS } from '@/components/site/platforms/shots';
import { SHOTS } from '@/content/heroes';
import { FOOTER_COPY, NAV_COPY } from '@/content/site';
import { THEME_BOOT, THEME_COLOR } from '@/lib/theme';
import { BRAND_NAME, SITE_URL } from '@/lib/brand';
import { getContent, mergeFooter, mergeNav, mergeShot, shotOverrides, type PageContent, type SiteImage } from '@/lib/content';

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
    { media: '(prefers-color-scheme: light)', color: THEME_COLOR.light },
    { media: '(prefers-color-scheme: dark)', color: THEME_COLOR.dark },
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

/** screenshots the content service replaced, merged over SHOTS / PSHOTS: key → image (for the client Shot) */
function shotsFrom(global: PageContent | undefined): Record<string, SiteImage> {
  const overrides = shotOverrides(global);
  const out: Record<string, SiteImage> = {};
  for (const [key, d] of [...Object.entries(SHOTS), ...Object.entries(PSHOTS)]) {
    const s = mergeShot(overrides, key, d);
    if (s !== d) out[key] = s;
  }
  return out;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // nav, footer and screenshots (page "global"); the defaults when the content service is unreachable
  const content = await getContent(['global']);
  const global = content.pages.global;
  const previewing = (await draftMode()).isEnabled;
  // html[data-theme] is set by THEME_BOOT before first paint (none in the markup: the CSS default is dark)
  return (
    <html lang="en" className={`${interTight.variable} ${interTightExt.variable} ${jbmono.variable} ${golos.variable} ${beVietnam.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <link rel="preconnect" href="https://api.kalkstrade.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }} />
      </head>
      <body suppressHydrationWarning>
        <BrandSprite />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav copy={mergeNav(global, NAV_COPY)} />
        <ContentProvider shots={shotsFrom(global)}>
          <main id="main">{children}</main>
        </ContentProvider>
        <Footer copy={mergeFooter(global, FOOTER_COPY)} />
        <CampaignForwarder />
        <GoogleTranslate />
        {previewing && <PreviewBadge state={content.preview ? 'drafts' : content.previewExpired ? 'expired' : 'published'} />}
      </body>
    </html>
  );
}
