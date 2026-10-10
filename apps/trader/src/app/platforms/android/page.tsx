import type { Metadata } from 'next';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { Btn, Checks, Cta, Head } from '@/components/site/ui';
import type { Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { DownloadBtn, FactRows, FaqSection, MiniHead, Related, StepCards } from '@/components/site/platforms/bits';
import { PhoneTour } from '@/components/site/platforms/ShotTours';
import { ANDROID_APP, DEMO, LANGUAGES, OPTIONS } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES, SHOTS } from '@/content/heroes';
import { REGISTER_HREF, TRADER_URL } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Kalks for Android',
  description: `Download the Kalks Android app (version ${ANDROID_APP.version}, ${ANDROID_APP.sizeMb} MB, ${ANDROID_APP.minAndroid} or newer): Kalks Trader, the Client Area and Kalks FX Options in one app, in 22 languages.`,
  alternates: { canonical: '/platforms/android' },
};

/** pins in % of the phone screenshot */
const PHONE_PINS: Pin[] = [
  { x: 33.5, y: 2.7, title: 'CFD or Options', text: 'Switch between your CFD and Options accounts at the top.' },
  { x: 66.5, y: 4.5, title: 'Your account', text: 'The account number, its type and balance, with the floating P&L under it.' },
  { x: 63, y: 7.7, title: 'Market and timeframe', text: 'The market on the chart and its timeframes, a tap away.' },
  { x: 45, y: 31, title: 'Your lines', text: 'Entry, stop loss and take profit on the chart with live P&L, the same as on the desktop.' },
  { x: 50, y: 85.6, title: 'Sell · lot · Buy', text: 'At the bottom of the screen, at the live price, with a confirmation if you want one.' },
  { x: 20, y: 97.5, title: 'Five tabs', text: 'Watchlist, chart, trade, history and account, one tap each.' },
];

const FAQ = FAQ_GROUPS.find((g) => g.id === 'platform')!.items;

export default function AndroidPage() {
  return (
    <>
      <PageHero
        compact
        photo="platforms"
        eyebrow="Android app"
        title={
          <>
            The whole platform, <span className="s-mute">in your pocket.</span>
          </>
        }
        lead={`Kalks Trader, the Client Area and Kalks FX Options in one app, in all ${LANGUAGES.length} languages, with biometric sign-in. Download the APK here; the Play Store listing follows.`}
        actions={
          <>
            <DownloadBtn href={ANDROID_APP.href}>Download for Android</DownloadBtn>
            <Btn href={TRADER_URL} variant="ghost" icon={false}>
              Open in the browser
            </Btn>
          </>
        }
        facts={[`Version ${ANDROID_APP.version}`, `${ANDROID_APP.sizeMb} MB`, `${ANDROID_APP.minAndroid} or newer`, `${LANGUAGES.length} languages`]}
        aside={
          <HeroGlass>
            <div className="text-[13px] font-medium text-white/80">Latest version</div>
            <div className="s-num mt-2 text-[56px] text-white">{ANDROID_APP.version}</div>
            <p className="mt-2 text-[14px] text-white/85">
              Build {ANDROID_APP.build} · {ANDROID_APP.sizeMb} MB · APK
            </p>
          </HeroGlass>
        }
      />

      {/* 01 the app */}
      <section className="s-sec" aria-labelledby="app-title">
        <div className="s-wrap">
          <PhoneTour
            shot={SHOTS.traderPhone}
            pins={PHONE_PINS}
            flip
            intro={
              <MiniHead
                index="01"
                eyebrow="The app"
                id="app-title"
                className="mb-10"
                title={
                  <>
                    One app, <span className="s-hot">three products.</span>
                  </>
                }
                lead={`Trade CFDs in Kalks Trader, buy and sell options on ${OPTIONS.underlyingsLive.length} markets, and run your accounts and wallet in the Client Area, all from one sign-in.`}
              />
            }
            outro={
              <div className="mt-8">
                <Checks items={['Biometric sign-in', `Translated in full, ${LANGUAGES.length} languages, right to left included`, 'Switch accounts in a tap']} />
              </div>
            }
          />
        </div>
      </section>

      {/* 02 install */}
      <section id="install" className="s-sec s-band scroll-mt-20" aria-labelledby="in-title">
        <div className="s-wrap">
          <Head
            id="in-title"
            index="02"
            eyebrow="Install"
            title={
              <>
                Installing it, <span className="s-mute">in three steps.</span>
              </>
            }
            lead="Android asks once to allow installs from your browser; after that the app updates like any other."
          />
          <StepCards
            cols="sm:grid-cols-3"
            steps={[
              { t: 'Download', d: 'Tap Download for Android on your phone. The APK comes straight from kalkstrade.com.' },
              { t: 'Allow the install', d: 'If Android asks, allow installs from your browser for this one file.' },
              { t: 'Open and sign in', d: 'Use your Kalks account, then turn on biometric sign-in.' },
            ]}
          />
          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <Rise>
              <FactRows
                title="The file"
                className="h-full"
                rows={[
                  ['Version', `${ANDROID_APP.version} (build ${ANDROID_APP.build})`],
                  ['Size', `${ANDROID_APP.sizeMb} MB`],
                  ['Needs', `${ANDROID_APP.minAndroid} or newer`],
                  [
                    'Universal APK',
                    <a key="u" href={ANDROID_APP.hrefUniversal} download className="text-[var(--s-orange2)] underline decoration-[rgba(255,122,46,0.4)] underline-offset-2 hover:decoration-[var(--s-orange2)]">
                      Download
                    </a>,
                  ],
                  ['SHA-256', <span key="h" className="break-all font-mono text-[12.5px] text-[var(--s-tx2)]">{ANDROID_APP.sha256}</span>],
                ]}
              />
            </Rise>
            <Rise delay={100} className="s-cream flex flex-col justify-between gap-8 p-7 lg:p-9">
              <div>
                <div className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--s-orange)]">Older 32-bit phones</div>
                <p className="mt-3 text-[clamp(22px,2vw,28px)] font-[450] leading-[1.15] tracking-[-0.03em]">Use the universal APK instead: the same app, packaged for older phones too.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <DownloadBtn href={ANDROID_APP.hrefUniversal} variant="dark">
                  Universal APK
                </DownloadBtn>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      <Related
        top
        links={[
          { href: '/platforms/trader', t: 'Kalks Trader', d: 'The same terminal, in your browser.' },
          { href: '/platforms/client-area', t: 'Client Area', d: 'Accounts, wallet and more.' },
          { href: '/accounts/demo', t: 'Demo', d: 'Practise free on live prices.' },
          { href: '/contact', t: 'Help', d: 'Trouble installing? Ask us.' },
        ]}
      />

      <FaqSection
        index="03"
        title={
          <>
            The app, <span className="s-mute">answered.</span>
          </>
        }
        items={FAQ}
      />

      <Cta
        title={
          <>
            No account yet? <span className="text-white/70">Start here.</span>
          </>
        }
        sub={`Register in a couple of minutes, practise on ${DEMO.defaultBalance} of demo money, then sign in to the app with the same account.`}
        primary={{ href: REGISTER_HREF, label: 'Open account' }}
        secondary={{ href: TRADER_URL, label: 'Open in the browser' }}
        facts={[`Version ${ANDROID_APP.version}`, `${ANDROID_APP.sizeMb} MB`, `${ANDROID_APP.minAndroid} or newer`]}
        image={HEROES.platforms}
      />
    </>
  );
}
