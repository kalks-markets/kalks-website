import type { Metadata } from 'next';
import { Download } from 'lucide-react';
import { Hero } from '@/components/ui/Hero';
import { Btn } from '@/components/ui/Button';
import { Section, SectionHead, Feature } from '@/components/ui/Section';
import { HeroImage } from '@/components/art/HeroArt';
import { TraderMock } from '@/components/mock/TraderMock';
import { KMark } from '@/components/brand/Logo';
import { ACADEMY, ANDROID_APP, TRADER } from '@/content/facts';
import { CRM_URL, DEMO_HREF, TRADER_URL } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Platforms: Kalks Trader, the Client Area and the Android app',
  description:
    'Kalks Trader is a web terminal for CFDs and options: a big chart, 35 indicators, one-click trading, a depth ladder and full chart mode. The Client Area runs everything around it. Also as an Android app.',
  alternates: { canonical: '/platforms' },
};

const TRADER_FEATURES: [string, string][] = [
  ['Charts', `${TRADER.chartTypes} chart types, ${TRADER.timeframes.length} timeframes from M1 to MN, ${TRADER.indicators} indicators and ${TRADER.drawingTools} drawing tools.`],
  ['Orders', 'Market, limit, stop and stop-limit. Stop loss, take profit, a server-side trailing stop, OCO and expiry by date.'],
  ['One-click trading', 'Sell and buy straight from the chart, or switch it off and confirm every trade.'],
  ['Trade on the chart', 'Drag stop loss, take profit, pending orders and alerts along the price axis.'],
  ['Depth ladder', 'The order book beside the chart, with limit orders in one click.'],
  ['Position tools', 'Partial close, close by, and bulk close: all, winners, losers, buys or sells.'],
  ['Full chart mode', 'Hide everything but the chart when you want to focus.'],
  ['Options', 'Option chains, quick trade and the strategy builder for your Options account.'],
];

const CLIENT_FEATURES: [string, string][] = [
  ['Accounts', 'Open CFD and Options accounts, live and demo; change leverage; set read-only investor passwords.'],
  ['Wallet', 'Deposit and withdraw USDT; move money between wallet and accounts, instantly and free.'],
  ['Copy trading, PAMM, MAM', 'Follow masters, invest in funds, or apply to become a master.'],
  ['Prop challenges', 'Buy a challenge, track every rule live, request payouts, download certificates.'],
  ['Partner dashboard', 'Referral links, clients, your network, commission and weekly payouts.'],
  ['Academy', `${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases, quizzes, exams and certificates.`],
  ['Developer', 'API keys, webhooks, a visual strategy builder, backtests and 24/7 deployments.'],
  ['Support', 'Chat from any page: an instant help assistant, with our team behind it.'],
];

export default function PlatformsPage() {
  return (
    <>
      <Hero
        tone="ink"
        kicker="PLATFORMS"
        title="Kalks Trader. Nothing to install."
        lede="A big, clean chart for CFDs and options, in your browser and on Android. The Client Area runs everything around it."
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
        facts="Desktop and phone browsers · Android · 22 languages"
        art={
          <HeroImage
            name="/images/k2/robot"
            widths={[1672, 1200, 800]}
            w={1672}
            h={941}
            sizes="(max-width: 1100px) 92vw, 700px"
            alt="The Kalks robot: a glossy black helmet in profile with a glowing red eye, in a black leather collar, on red light and black waves"
            mask="radial-gradient(72% 78% at 58% 46%, #000 52%, transparent 100%)"
          />
        }
        strip={[
          { v: TRADER.indicators, l: 'Indicators, plus drawing tools' },
          { v: TRADER.timeframes.length, l: 'Timeframes, from one minute to a month' },
          { v: '1 click', l: 'Trading from the chart, or confirm every order' },
          { v: 22, l: 'Languages, right to left included' },
        ]}
      />

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
          <div className="mx-auto mt-10 grid h-[220px] w-[220px] flex-none place-items-center rounded-[52px] bg-k-ink shadow-[10px_10px_0_#7A5D00] lg:mt-0 lg:h-[280px] lg:w-[280px] lg:rounded-[64px]" aria-hidden>
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
            <Btn href="/white-label#api" v="ink" arrow>
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
