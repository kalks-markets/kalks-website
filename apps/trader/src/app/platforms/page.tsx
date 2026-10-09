import type { Metadata } from 'next';
import { PageHero } from '@/components/kx/PageHero';
import { StatRow } from '@/components/kx/StatRow';
import { Download } from 'lucide-react';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, Feature } from '@/components/ui/Section';
import { TraderMock } from '@/components/mock/TraderMock';
import { KMark } from '@/components/brand/Logo';
import { ANDROID_APP, TRADER } from '@/content/facts';
import { CLIENT_FEATURES, TRADER_FEATURES } from '@/content/platforms';
import { CRM_URL, DEMO_HREF, TRADER_URL } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Platforms: Kalks Trader, the Client Area and the Android app',
  description:
    'Kalks Trader is a web terminal for CFDs and options: a big chart, 35 indicators, one-click trading, a depth ladder and full chart mode. The Client Area runs everything around it. Also as an Android app.',
  alternates: { canonical: '/platforms' },
};

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        kicker="PLATFORMS"
        title="Your screen for every market."
        lede="Kalks Trader in your browser and on Android, with the Client Area around it for accounts, money, copy trading, prop and learning."
        photo="platforms"
        actions={
          <>
            <Btn href={TRADER_URL} v="red" s={56} arrow>
              Open Kalks Trader
            </Btn>
            <Btn href="#mobile" v="ghost" s={56}>
              Get the app
            </Btn>
          </>
        }
      >
        <StatRow items={[
          { v: String(TRADER.indicators), l: 'Indicators, plus drawing tools' },
          { v: String(TRADER.timeframes.length), l: 'Timeframes, from one minute to a month' },
          { v: String('1 click'), l: 'Trading from the chart, or confirm every order' },
          { v: String(22), l: 'Languages, right to left included' },
        ]} />
      </PageHero>

      <Section id="trader" labelledBy="trader-title">
        <SectionHead
          id="trader-title"
          kicker="01 — KALKS TRADER"
          title="Built like the terminals pros use."
          lede="Chart first, watchlist on the side, positions below. Compact and calm. Up is blue, down is red."
        />
        <TraderMock className="h-[600px] max-lg:h-[460px] max-sm:h-[360px]" />
        <p className="mt-3 font-mono text-[11.5px] text-tx3">Illustrative chart and prices.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {TRADER_FEATURES.map(([t, d]) => (
            <Feature key={t} t={t} d={d} />
          ))}
        </div>
      </Section>

      <Section id="client-area" labelledBy="ca-title">
        <SectionHead
          id="ca-title"
          kicker="02 — CLIENT AREA"
          title="Everything around your trading."
          lede="Accounts, money, copy trading, prop, partner earnings and learning in one place, in 22 languages, light or dark."
          action={
            <Btn href={CRM_URL} v="ink" arrow>
              Go to the Client Area
            </Btn>
          }
        />
        <div className="card grid gap-x-10 px-6 py-2 sm:grid-cols-2 sm:px-8">
          {CLIENT_FEATURES.map(([t, d]) => (
            <div key={t} className="border-b border-line py-5 sm:[&:nth-last-child(-n+2)]:border-0 [&:last-child]:border-0">
              <h3 className="text-[15.5px] font-semibold">{t}</h3>
              <p className="mt-1 text-[14.5px] leading-relaxed text-tx2">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="mobile" labelledBy="mob-title">
        <div className="pcard pc-yel !min-h-0 overflow-hidden lg:!flex-row lg:items-center lg:justify-between lg:gap-12 lg:!p-12">
          <div className="max-w-[560px]">
            <span className="k">ANDROID · v{ANDROID_APP.version}</span>
            <h2 id="mob-title" className="d mt-4 text-[clamp(36px,4vw,56px)] leading-[0.92]">
              Kalks on Android.
            </h2>
            <p className="!max-w-[46ch]">
              The Client Area, Kalks Trader and Kalks FX Options in one app, in all 22 languages, with biometric sign-in. Download the
              APK here; the Play Store listing follows.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Btn href={ANDROID_APP.href} v="ink" s={48} download>
                <Download aria-hidden /> Download for Android
              </Btn>
              <Btn href={TRADER_URL} v="ghost" s={48}>
                Open in the browser
              </Btn>
            </div>
            <p className="!mt-5 !text-[12.5px] !leading-relaxed !opacity-80">
              APK · {ANDROID_APP.minAndroid} or newer · {ANDROID_APP.sizeMb} MB · build {ANDROID_APP.build}. Android asks once to allow
              installs from your browser. Older 32-bit phones:{' '}
              <a href={ANDROID_APP.hrefUniversal} className="underline underline-offset-2">
                universal APK
              </a>
              . SHA-256 <span className="break-all font-mono">{ANDROID_APP.sha256}</span>
            </p>
          </div>
          <div className="mx-auto mt-10 grid h-[220px] w-[220px] flex-none place-items-center rounded-[52px] bg-white text-[#0b1640] shadow-[0_30px_70px_-30px_rgba(11,22,64,0.6)] lg:mt-0 lg:h-[280px] lg:w-[280px] lg:rounded-[64px]" aria-hidden>
            <KMark className="h-[42%] w-auto -translate-x-[3%] -translate-y-[3%]" />
          </div>
        </div>
      </Section>

      <Section labelledBy="api-teaser" className="sec-last">
        <div className="card flex flex-col items-start justify-between gap-8 p-7 sm:p-10 lg:flex-row lg:items-center">
          <div>
            <span className="kicker">03 — API &amp; ALGO</span>
            <h2 id="api-teaser" className="d t-h2 mt-3">
              Automate it.
            </h2>
            <p className="body mt-3 max-w-xl">
              Webhook alerts, a REST API with scoped keys, a visual strategy builder and backtests, running on our servers around the
              clock.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn href="/platforms/api" v="ink" arrow>
              API &amp; algo
            </Btn>
            <Btn href={DEMO_HREF} v="ghost">
              Try the demo
            </Btn>
          </div>
        </div>
      </Section>
    </>
  );
}
