import type { Metadata } from 'next';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { BentoCard, Btn, Checks, Cta, Head, StatStrip, TextLink } from '@/components/site/ui';
import { FeatureSplit, Phone, Shot } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { DownloadBtn, FaqSection, FeatureGrid } from '@/components/site/platforms/bits';
import { PSHOTS } from '@/components/site/platforms/shots';
import { ACADEMY, ALGO, ANDROID_APP, DEMO, LANGUAGES, TRADER } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES } from '@/content/heroes';
import { CLIENT_FEATURES, TRADER_FEATURES } from '@/content/platforms';
import { CRM_URL, DEMO_HREF, REGISTER_HREF, TRADER_URL } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Platforms: Kalks Trader, the Client Area and the Android app',
  description:
    'Kalks Trader is a web terminal for CFDs and options: a big chart, 35 indicators, one-click trading, a depth ladder and full chart mode. The Client Area runs everything around it. Also as an Android app.',
  alternates: { canonical: '/platforms' },
};

const FAQ = FAQ_GROUPS.find((g) => g.id === 'platform')!.items;

export default function PlatformsPage() {
  return (
    <>
      <PageHero
        photo="platforms"
        eyebrow="Platforms"
        title={
          <>
            Your screen <span className="s-mute">for every market.</span>
          </>
        }
        lead="Kalks Trader in your browser and on Android, with the Client Area around it for accounts, money, copy trading, prop and learning."
        actions={
          <>
            <Btn href={TRADER_URL}>Open Kalks Trader</Btn>
            <Btn href="#mobile" variant="ghost" icon={false}>
              Get the app
            </Btn>
          </>
        }
        facts={[`${TRADER.indicators} indicators`, `${TRADER.timeframes.length} timeframes`, `${LANGUAGES.length} languages`, `Android ${ANDROID_APP.version}`]}
        aside={
          <HeroGlass>
            <div className="text-[13px] font-medium text-white/80">Nothing to install</div>
            <p className="mt-2 text-[15px] leading-snug">Kalks Trader and the Client Area run in any modern browser, on desktop and phone.</p>
          </HeroGlass>
        }
      />

      {/* 01 in numbers */}
      <section className="s-sec" aria-labelledby="n-title">
        <div className="s-wrap">
          <Rise className="s-card pad grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="s-index">01</span>
                <span className="s-eyebrow">The platform</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Browser', 'Android', 'API'].map((c) => (
                  <span key={c} className="s-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <h2 id="n-title" className="s-statement">
              Kalks Trader is where you trade. <span className="s-mute">The Client Area runs everything around it: accounts, the USDT wallet, copy trading, prop, partners and the Academy, behind one login.</span>
            </h2>
            <div className="lg:col-span-2">
              <StatStrip
                items={[
                  { v: TRADER.indicators, l: 'Indicators', sub: `Plus ${TRADER.drawingTools} drawing tools` },
                  { v: TRADER.timeframes.length, l: 'Timeframes', sub: `From ${TRADER.timeframes[0]} to ${TRADER.timeframes[TRADER.timeframes.length - 1]}` },
                  { v: TRADER.chartTypes, l: 'Chart types', sub: 'Candles, bars, line and area' },
                  { v: LANGUAGES.length, l: 'Languages', sub: 'Arabic, Urdu and Persian right to left' },
                ]}
              />
            </div>
          </Rise>
        </div>
      </section>

      {/* 02 four ways in */}
      <section className="s-sec !pt-4" aria-labelledby="w-title">
        <div className="s-wrap">
          <Head
            id="w-title"
            index="02"
            eyebrow="Four ways in"
            title={
              <>
                One login, <span className="s-hot">every screen.</span>
              </>
            }
            lead="Sign in once with your Kalks account. The same accounts and the same USDT wallet sit behind every one of them."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <BentoCard tone="orange" kicker="Trade" title="Kalks Trader" href="/platforms/trader" text="The terminal: charts, one-click trading, the order ticket and the option chain." className="min-h-[340px]">
              <div className="s-num text-[clamp(56px,5vw,76px)]">{TRADER.indicators}</div>
              <div className="mt-2 text-[13.5px] font-medium text-white/85">indicators · {TRADER.timeframes.length} timeframes</div>
            </BentoCard>
            <BentoCard tone="cream" kicker="Manage" title="Client Area" href="/platforms/client-area" text="Accounts, wallet, copy trading, prop, partner earnings, the Academy and support." delay={60} className="min-h-[340px]">
              <div className="s-num text-[clamp(56px,5vw,76px)]">{ACADEMY.lessons}</div>
              <div className="mt-2 text-[13.5px] text-[var(--s-cream-tx2)]">Academy lessons inside</div>
            </BentoCard>
            <BentoCard tone="glass" kicker="On the go" title="Android app" href="/platforms/android" text={`Kalks Trader, the Client Area and Kalks FX Options in one app, ${ANDROID_APP.minAndroid} or newer.`} delay={120} className="min-h-[340px]">
              <div className="s-num text-[clamp(56px,5vw,76px)]">{ANDROID_APP.sizeMb}</div>
              <div className="mt-2 text-[13.5px] text-[var(--s-tx2)]">MB download · version {ANDROID_APP.version}</div>
            </BentoCard>
            <BentoCard tone="cream" kicker="Automate" title="API & algo" href="/platforms/api" text="Webhooks, a REST API, a visual strategy builder and backtests, running on our servers." delay={180} className="min-h-[340px]">
              <div className="s-num text-[clamp(56px,5vw,76px)]">24/7</div>
              <div className="mt-2 text-[13.5px] text-[var(--s-cream-tx2)]">deployments · {ALGO.indicatorSeries} indicator series</div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* 03 Kalks Trader */}
      <section id="trader" className="s-sec s-band scroll-mt-20" aria-labelledby="trader-title">
        <div className="s-wrap">
          <Head
            id="trader-title"
            index="03"
            eyebrow="Kalks Trader"
            title={
              <>
                Built like the terminals <span className="s-mute">pros use.</span>
              </>
            }
            lead="Chart first, watchlist on the side, positions below. Compact and calm. Up is blue, down is red."
            action={<Btn href="/platforms/trader">Tour Kalks Trader</Btn>}
          />
          <Rise>
            <Shot shot="traderWorkspace" />
          </Rise>
          <div className="mt-12">
            <FeatureGrid items={TRADER_FEATURES} />
          </div>
        </div>
      </section>

      {/* 04 Client Area */}
      <section id="client-area" className="s-sec scroll-mt-20" aria-labelledby="ca-title">
        <div className="s-wrap">
          <Head
            id="ca-title"
            index="04"
            eyebrow="Client Area"
            title={
              <>
                Everything around <span className="s-mute">your trading.</span>
              </>
            }
            lead={`Accounts, money, copy trading, prop, partner earnings and learning in one place, in ${LANGUAGES.length} languages.`}
            action={<TextLink href="/platforms/client-area">Tour the Client Area</TextLink>}
          />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div className="grid gap-5">
              <Rise className="s-card overflow-hidden p-3">
                <Shot shot="caDashboard" flat />
                <div className="px-3 pb-2 pt-5">
                  <div className="text-[18px] font-semibold tracking-[-0.02em]">Home</div>
                  <p className="mt-1 text-[14px] text-[var(--s-tx2)]">Ask the AI assistant, see every balance, and hide the amounts with one tap.</p>
                </div>
              </Rise>
              <Rise delay={60} className="s-card overflow-hidden p-3">
                <Shot shot="caAccounts" flat />
                <div className="flex flex-wrap items-end justify-between gap-4 px-3 pb-2 pt-5">
                  <div>
                    <div className="text-[18px] font-semibold tracking-[-0.02em]">Accounts as cards</div>
                    <p className="mt-1 text-[14px] text-[var(--s-tx2)]">Shortcuts on the left, every account on its own card.</p>
                  </div>
                  <Btn href={CRM_URL} variant="ghost" size="sm">
                    Go to the Client Area
                  </Btn>
                </div>
              </Rise>
            </div>
            <Rise delay={100} className="s-card px-6 py-2 sm:px-8">
              <ul>
                {CLIENT_FEATURES.map(([t, d]) => (
                  <li key={t} className="border-b border-[var(--s-line)] py-4 last:border-0">
                    <h3 className="text-[15.5px] font-semibold text-white">{t}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--s-tx2)]">{d}</p>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>
      </section>

      {/* 05 Android */}
      <section id="mobile" className="s-sec s-band scroll-mt-20" aria-labelledby="mob-title">
        <div className="s-wrap">
          <FeatureSplit
            index="05"
            eyebrow={`Android · v${ANDROID_APP.version}`}
            title={
              <span id="mob-title">
                Kalks <span className="s-hot">on Android.</span>
              </span>
            }
            text={`The Client Area, Kalks Trader and Kalks FX Options in one app, in all ${LANGUAGES.length} languages, with biometric sign-in. Download the APK here; the Play Store listing follows.`}
            points={
              <p className="text-[12.5px] leading-relaxed text-[var(--s-tx3)]">
                APK · {ANDROID_APP.minAndroid} or newer · {ANDROID_APP.sizeMb} MB · build {ANDROID_APP.build}. Android asks once to allow installs from your browser. Older 32-bit phones:{' '}
                <a href={ANDROID_APP.hrefUniversal} download className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  universal APK
                </a>
                . SHA-256 <span className="break-all font-mono">{ANDROID_APP.sha256}</span>
              </p>
            }
            action={
              <div className="flex flex-wrap gap-3">
                <DownloadBtn href={ANDROID_APP.href}>Download for Android</DownloadBtn>
                <Btn href="/platforms/android" variant="ghost" icon={false}>
                  How to install
                </Btn>
              </div>
            }
            media={<Phone />}
            flip
          />
        </div>
      </section>

      {/* 06 API & algo */}
      <section className="s-sec" aria-labelledby="api-teaser">
        <div className="s-wrap">
          <FeatureSplit
            index="06"
            eyebrow="API & algo"
            title={
              <span id="api-teaser">
                Automate it. <span className="s-mute">Let it run.</span>
              </span>
            }
            text="Webhook alerts, a REST API with scoped keys, a visual strategy builder and backtests, running on our servers around the clock."
            points={<Checks items={[`Up to ${ALGO.webhookRoutes} accounts per webhook, each with its own size`, `${ALGO.rateLimit.charAt(0).toUpperCase()}${ALGO.rateLimit.slice(1)}`, 'Keys that read and trade, never withdraw', 'Demo or live, with kill switches']} />}
            action={
              <div className="flex flex-wrap gap-3">
                <Btn href="/platforms/api">API &amp; algo</Btn>
                <Btn href={DEMO_HREF} variant="ghost" icon={false}>
                  Try the demo
                </Btn>
              </div>
            }
            media={<Shot shot={PSHOTS.apiBuilder} />}
          />
        </div>
      </section>

      <FaqSection
        index="07"
        title={
          <>
            Platforms, <span className="s-mute">answered.</span>
          </>
        }
        items={FAQ}
      />

      <Cta
        title={
          <>
            Open Kalks Trader <span className="text-white/70">in your browser.</span>
          </>
        }
        sub={`Look around on live prices, or register and practise on ${DEMO.defaultBalance} of demo money.`}
        primary={{ href: TRADER_URL, label: 'Open Kalks Trader' }}
        secondary={{ href: REGISTER_HREF, label: 'Open account' }}
        facts={[`${TRADER.indicators} indicators`, `${LANGUAGES.length} languages`, `Android ${ANDROID_APP.version}`]}
        image={HEROES.platforms}
      />
    </>
  );
}
