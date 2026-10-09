import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Block, FactPanel, InfoGrid, Related } from '@/components/kx/Blocks';
import { ANDROID_APP } from '@/content/facts';
import { TRADER_URL } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Kalks for Android',
  description: `Download the Kalks Android app (version ${ANDROID_APP.version}, ${ANDROID_APP.sizeMb} MB, ${ANDROID_APP.minAndroid} or newer): Kalks Trader, the Client Area and Kalks FX Options in one app, in 22 languages.`,
  alternates: { canonical: '/platforms/android' },
};

export default function AndroidPage() {
  return (
    <>
      <PageHero
        kicker="Android app"
        title="The whole platform, in your pocket."
        lede="Kalks Trader, the Client Area and Kalks FX Options in one app, in all 22 languages, with biometric sign-in. Download the APK here; the Play Store listing follows."
        photo="android"
        actions={
          <>
            <a href={ANDROID_APP.href} className="kx-btn prim lg" download>
              <Download size={17} aria-hidden /> Download for Android
            </a>
            <a href={TRADER_URL} className="kx-btn ghost lg">
              Open in the browser
            </a>
          </>
        }
      >
        <StatRow
          items={[
            { v: ANDROID_APP.version, l: 'Version' },
            { v: `${ANDROID_APP.sizeMb} MB`, l: 'Download' },
            { v: ANDROID_APP.minAndroid.replace('Android ', ''), l: 'Android or newer' },
            { v: '22', l: 'Languages' },
          ]}
        />
      </PageHero>

      <Block id="install" title="Installing it." intro="Android asks once to allow installs from your browser; after that the app updates like any other.">
        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_1fr]">
          <InfoGrid
            cols={2}
            items={[
              ['1. Download', 'Tap Download for Android on your phone. The APK comes straight from kalkstrade.com.'],
              ['2. Allow the install', 'If Android asks, allow installs from your browser for this one file.'],
              ['3. Open and sign in', 'Use your Kalks account, then turn on biometric sign-in.'],
              ['Older 32-bit phones', 'Use the universal APK below instead.'],
            ]}
          />
          <FactPanel
            title="The file"
            items={[
              ['Version', `${ANDROID_APP.version} (build ${ANDROID_APP.build})`],
              ['Size', `${ANDROID_APP.sizeMb} MB`],
              ['Needs', `${ANDROID_APP.minAndroid} or newer`],
              ['Universal APK', <a key="u" href={ANDROID_APP.hrefUniversal} className="text-[#2447e0] underline underline-offset-2">Download</a>],
              ['SHA-256', <span key="h" className="break-all font-mono text-[12px]">{ANDROID_APP.sha256}</span>],
            ]}
          />
        </div>
      </Block>

      <Related
        links={[
          { href: '/platforms/trader', t: 'Kalks Trader', d: 'The same terminal, in your browser.' },
          { href: '/platforms/client-area', t: 'Client Area', d: 'Accounts, wallet and more.' },
          { href: '/accounts/demo', t: 'Demo', d: 'Practise free on live prices.' },
          { href: '/contact', t: 'Help', d: 'Trouble installing? Ask us.' },
        ]}
      />
    </>
  );
}
