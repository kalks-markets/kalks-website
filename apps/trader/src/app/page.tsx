import type { Metadata } from 'next';
import Link from 'next/link';
import { ACADEMY, ACCOUNTS, DEMO, FUNDING, HOURS, INSTRUMENTS, LANGUAGES, LEVERAGE, OPTIONS, SOCIAL } from '@/content/facts';
import { getPage } from '@/content/pages';
import { CRM_URL, DEMO_HREF, LOGIN_HREF, REGISTER_HREF } from '@/lib/crm';
import { PriceStrip, type StripRow } from '@/components/market/PriceStrip';
import { getQuotes } from '@/lib/quotes';
import { HomeHero } from '@/components/site/Heroes';
import { Btn, Head } from '@/components/site/ui';
import { ShotTour, type Pin, type ShotVideo } from '@/components/site/Shot';
import { PocketTerminal, type PocketNote } from '@/components/site/pocket-terminal/PocketTerminal';
import { CtaBand, FeeCards, LangStrip, LogoStrip, PhoneBand, PhoneShot, PhotoFeature, RfHead, TrustCards } from '@/components/site/home/HomeBlocks';
import { MarketTabs, type MarketTab } from '@/components/site/home/MarketTabs';
import { IMAGES } from '@/components/site/ImageSlot';

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const STRIP: StripRow[] = [
  { s: 'EURUSD', label: 'EUR/USD', digits: 5 },
  { s: 'XAUUSD', label: 'Gold', digits: 2 },
  { s: 'GBPUSD', label: 'GBP/USD', digits: 5 },
  { s: 'USDJPY', label: 'USD/JPY', digits: 3 },
  { s: 'USOIL', label: 'US Oil', digits: 2 },
];

/** the Kalks Trader workspace, part by part (pins in % of the screenshot) */
const TRADER_PINS: Pin[] = [
  { x: 5.5, y: 8.4, title: 'Charts as tabs', text: 'Open several markets side by side, switch timeframes from M1 to MN, and split the screen into 1, 2 or 4 charts.' },
  { x: 47.5, y: 8.4, title: 'One-click Sell · lot · Buy', text: 'A slim bar in the chart toolbar: set the lot size and trade at the live price, or open the full ticket first. It never covers the candles.' },
  { x: 62, y: 65.5, title: 'Position, stop and target lines', text: 'Every position, stop loss and take profit is a line on the chart with its live P&L. Drag a line to move the level.' },
  { x: 2, y: 30, title: 'Drawing tools', text: 'Trend lines, horizontal levels, channels, rectangles and the crosshair, on a rail beside the chart.' },
  { x: 82.5, y: 8.4, title: 'Instruments, order book and ticks', text: `${INSTRUMENTS.liveMarkets} live markets with bid, ask and the day's change, favourites, search by symbol, and the depth of the market.` },
  { x: 25, y: 96.8, title: 'Account at a glance', text: 'Balance, equity, floating P&L, margin, free margin and margin level, updated with every tick.' },
];

/** the workspace in motion on the laptop, looping (founder 2026-11-02; his video, poster = its first frame) */
const TRADER_VIDEO: ShotVideo = {
  src: '/site/home/terminal-tour.mp4',
  poster: '/site/home/terminal-tour.webp',
  w: 1920,
  h: 1080,
  alt: 'Kalks Trader in use: the chart with its trading lines and drawing tools, the instruments list and the account bar',
};

/* the phone section's notification cards, in the platform's own words: the in-app templates (Back Office ›
   Notifications: "Deposit received" with its sample values, "Price alert") and Kalks Trader's fill toast, with the
   numbers shown on the phone's screens (the gold bid in the watchlist, the buy line on the chart); times are the
   terminal's "{n}m ago" / "Just now" */
const POCKET_NOTES: PocketNote[] = [
  { title: 'Deposit received', time: '5m ago', body: '2,500.00 USDT via USDT · TRC20 is now in your wallet.' },
  { title: 'XAUUSD reached 3,994.24', time: '2m ago', body: 'Your alert was triggered. Tap to open the chart.' },
  { title: 'Buy 1.00 XAUUSD filled', time: 'Just now', body: '1.00 at 3,984.13' },
];

/* the markets block: Kalks Trader's own watchlist (the guest watchlist on trade.kalkstrade.com, 2026-11-02), class by
   class in the platform's order and words */
const fx = (s: string, name: string): MarketTab['rows'][number] => ({ s, name, digits: s.endsWith('JPY') ? 3 : 5 });
const MARKET_TABS: MarketTab[] = [
  {
    id: 'forex',
    label: 'Forex',
    rows: [
      fx('EURUSD', 'Euro vs US Dollar'),
      fx('GBPUSD', 'Pound vs US Dollar'),
      fx('USDJPY', 'US Dollar vs Yen'),
      fx('AUDUSD', 'Aussie vs US Dollar'),
      fx('USDCAD', 'US Dollar vs Loonie'),
      fx('USDCHF', 'US Dollar vs Franc'),
      fx('GBPJPY', 'Pound vs Yen'),
      fx('EURJPY', 'Euro vs Yen'),
    ],
  },
  {
    id: 'metals',
    label: 'Metals',
    rows: [
      { s: 'XAUUSD', name: 'Gold vs US Dollar', digits: 2 },
      { s: 'XAGUSD', name: 'Silver vs US Dollar', digits: 3 },
    ],
  },
  {
    id: 'indices',
    label: 'Indices',
    rows: [
      { s: 'US30', name: 'Dow Jones 30', digits: 1, badge: ['USD'] },
      { s: 'NAS100', name: 'Nasdaq 100', digits: 1, badge: ['USD'] },
      { s: 'SPX500', name: 'S&P 500', digits: 1, badge: ['USD'] },
      { s: 'GER40', name: 'Germany 40', digits: 1, badge: ['DE'] },
      { s: 'UK100', name: 'FTSE 100', digits: 1, badge: ['GBP'] },
      { s: 'JP225', name: 'Nikkei 225', digits: 0, badge: ['JPY'] },
    ],
  },
  {
    id: 'energies',
    label: 'Energies',
    rows: [
      { s: 'USOIL', name: 'WTI Crude Oil', digits: 2 },
      { s: 'UKOIL', name: 'Brent Crude Oil', digits: 2 },
    ],
  },
  {
    id: 'crypto',
    label: 'Crypto',
    rows: [
      { s: 'BTCUSD', name: 'Bitcoin', digits: 2 },
      { s: 'ETHUSD', name: 'Ethereum', digits: 2 },
      { s: 'SOLUSD', name: 'Solana', digits: 3 },
      { s: 'XRPUSD', name: 'Ripple', digits: 4 },
    ],
  },
  {
    id: 'stocks',
    label: 'Stocks',
    rows: [
      { s: 'AAPL', name: 'Apple Inc.', digits: 2 },
      { s: 'TSLA', name: 'Tesla Inc.', digits: 2 },
      { s: 'NVDA', name: 'NVIDIA Corp.', digits: 2 },
      { s: 'META', name: 'Meta Platforms', digits: 2 },
      { s: 'NFLX', name: 'Netflix Inc.', digits: 2 },
    ],
  },
];

/** "$0.25 per contract, capped at 10% of the premium" as its figure and the rest */
const OPT_FEE = OPTIONS.commission.split(' per contract, ');

export default async function HomePage() {
  const [quotes, page] = await Promise.all([getQuotes([...new Set([...STRIP.map((r) => r.s), ...MARKET_TABS.flatMap((t) => t.rows.map((r) => r.s))])]), getPage('home')]);
  const { hero } = page;
  return (
    <>
      <HomeHero
        line={hero.title}
        sub={<>Start trading from {ACCOUNTS[0].minDeposit}</>}
        actions={
          <>
            <Btn href={LOGIN_HREF} variant="dark">
              Log in
            </Btn>
            <Btn href={DEMO_HREF} variant="ghost" icon={false}>
              Try the demo
            </Btn>
          </>
        }
        ring={hero.cta ?? { href: REGISTER_HREF, label: 'Open account' }}
        image={hero.image ?? undefined}
        band={
          // live prices: a full-bleed band, edge to edge, right under the hero (founder 2026-10-31)
          <section className="relative z-[2]" aria-label="Live prices">
            <PriceStrip rows={STRIP} initial={quotes} />
          </section>
        }
        stats={[
          { v: INSTRUMENTS.liveMarkets, l: 'Live markets', sub: 'Forex, metals, energies, indices, crypto' },
          { v: OPTIONS.underlyingsLive.length, l: 'Underlyings for options', sub: 'Daily and weekly expiries, cash-settled in USD' },
          { v: ACADEMY.lessons, l: 'Academy lessons', sub: `In ${ACADEMY.phases} phases` },
        ]}
        intro={[
          <h2 key="a" className="s-h2">
            Who we <span className="s-hot">are?</span>
          </h2>,
          <p key="b" className="max-w-[46ch] text-[clamp(20px,2vw,28px)] leading-[1.45] tracking-[-0.015em] text-[rgb(var(--fg)/0.66)] lg:pt-3">
            <span className="text-[1.5em] font-[500] leading-none text-[var(--k-deep)]">K</span>alks is a broker built on its own technology:{' '}
            <b className="font-semibold text-[var(--k-deep)]">Kalks FX Options</b>, CFDs on {INSTRUMENTS.liveMarkets} live markets, copy trading and prop
            challenges, all in one Client Area.
          </p>,
        ]}
      />


      {/* Under the hero, block for block after the founder's reference (2026-11-02, "exactly like this"); the hero, the
          price strip, the terminal's laptop tour and the phone story stay as they were (his choice). */}
      {/* 03 Kalks Trader, part by part */}
      <section className="s-sec !pt-8" aria-labelledby="t-title">
        <div className="s-wrap">
          <Head
            id="t-title"
            index="03"
            eyebrow="Kalks Trader"
            title={
              <>
                The terminal, <span className="s-mute">part by part.</span>
              </>
            }
            lead="Our own trading terminal in the browser and on Android. Point at a number to see what each part does."
            action={<Btn href="/platforms/trader">Explore Kalks Trader</Btn>}
          />
          <ShotTour shot="traderWorkspace" pins={TRADER_PINS} video={TRADER_VIDEO} />
        </div>
      </section>

      {/* 06 phone: "The same terminal in your pocket.", a pinned scroll story (founder 2026-10-30) */}
      <PocketTerminal
        index="06"
        eyebrow="On your phone"
        sub="Kalks Trader on Android and in any phone browser: the chart with your lines, Sell and Buy at the bottom, watchlist, positions and history one tap away."
        cta={{ href: '/platforms/android', label: 'Get the Android app' }}
        notes={POCKET_NOTES}
      />

      {/* costs: two large cards with outlined figures, the small print under them */}
      <section className="rf-sec" aria-labelledby="fee-title">
        <div className="s-wrap">
          <RfHead id="fee-title" title="Clear costs," accent="shown before you trade." />
          <FeeCards
            items={[
              { v: ACCOUNTS[0].minDeposit, t: 'To open a live account', d: `Standard and Cent accounts. Fund with ${FUNDING.minDeposit}.` },
              { v: OPT_FEE[0], t: 'A contract on options', d: `${OPT_FEE[1].replace(/^c/, 'C')}, in an Options account of its own.` },
            ]}
            fine={
              <>
                Withdrawals cost {FUNDING.withdrawalFee}. {FUNDING.transfers}. <Link href="/accounts">Compare every account</Link>
              </>
            }
          />
        </div>
      </section>

      {/* markets: pill tabs, the phone's watchlist at live prices, four tiles */}
      <section className={IMAGES.marketsBackdrop ? 'rf-sec rf-mk-sec s-isl' : 'rf-sec !pt-0'} aria-labelledby="mk-title">
        {IMAGES.marketsBackdrop && (
          <div className="rf-mk-bg" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.marketsBackdrop} alt="" loading="lazy" decoding="async" />
          </div>
        )}
        <div className="s-wrap">
          <RfHead id="mk-title" title={`${INSTRUMENTS.liveMarkets} markets,`} accent="live on real money." />
          <MarketTabs
            tabs={MARKET_TABS}
            initial={quotes}
            tiles={[
              { v: String(INSTRUMENTS.liveMarkets), t: 'Live markets on real money' },
              { v: ACCOUNTS[0].minDeposit, t: 'To start, on a Standard or Cent account' },
              { v: '24/5', t: `Forex, metals, energies and indices, ${HOURS.fxWeek}` },
              { v: `1:${LEVERAGE.accountMax}`, t: 'Leverage on Standard and Cent accounts' },
            ]}
          />
          <p className="rf-fine">
            The full catalogue of {INSTRUMENTS.total.toLocaleString('en-US')} markets, stocks included, is open on a free demo. <Link href="/markets">See every market</Link>
          </p>
        </div>
      </section>

      {/* copy trading: the photo with a card of facts over it, the copy beside it */}
      <section className="rf-sec !pt-0" aria-labelledby="cp-title">
        <div className="s-wrap">
          <PhotoFeature
            id="cp-title"
            image={{ src: '/site/heroes/copy.webp', w: 736, h: 1313, alt: 'Copy trading at Kalks' }}
            factsTitle="Copy masters"
            facts={[
              { k: 'Track record', v: `${SOCIAL.trackRecordDays} days or more` },
              { k: 'Performance fee', v: `${SOCIAL.perfFee}, on new highs only` },
              { k: 'Copy from', v: SOCIAL.minAllocation },
            ]}
            note="Past performance is not a reliable indicator of future results."
            title="Trade alongside"
            accent="someone who has done it."
            text="Mirror approved traders with limits you set, invest in a managed fund, or let a manager trade your account. Fees only on new highs."
            action={<Btn href="/copy-trading">Explore copy trading</Btn>}
          />
        </div>
      </section>

      {/* options: the tinted band, the worked example on the phone */}
      <PhoneBand
        id="op-title"
        label="Kalks FX Options"
        title="Options on forex,"
        accent="with the risk printed first."
        action={
          <Btn href="/options" icon={false}>
            How options work
          </Btn>
        }
        points={['Buy one and the premium is the most you can lose.', `Daily and weekly expiries, cash-settled in US dollars at ${OPTIONS.cut}.`, `${OPTIONS.commission}.`]}
        phone={
          // Kalks Trader's own options quick trade (the demo build, phone width), the brand colour set to the site's orange
          <PhoneShot
            src="/site/home/options-quick-trade.webp"
            w={1050}
            h={1723}
            bg="#070505"
            alt="Kalks Trader on a phone: an options quick trade on EURUSD showing what you pay, the breakeven, the most you can lose and that the profit is unlimited"
          />
        }
      />

      {/* safety: three cards with an icon, a line and tags */}
      <section className="rf-sec" aria-labelledby="tr-title">
        <div className="s-wrap">
          <RfHead id="tr-title" title="Your account," accent="kept in your hands." sub="Signing in, proving who you are and moving money each follow a clear rule." />
          <TrustCards
            items={[
              { art: 'code', t: 'A code for new devices', d: 'Sign in from a new device and we email you a code first. Withdrawals ask for one too.', tags: ['Email code', 'New devices', 'Withdrawals'] },
              { art: 'wallet', t: 'One USDT wallet', d: `Deposits in ${FUNDING.methods}, credited ${FUNDING.creditTime}. ${FUNDING.transfers}.`, tags: ['BEP20', 'TRC20', `${FUNDING.withdrawalFee} withdrawal fee`] },
              { art: 'id', t: 'Verified withdrawals', d: 'Withdrawals need a verified identity (KYC), which you complete in the Client Area with your phone camera.', tags: ['KYC', 'Client Area', 'Phone camera'] },
            ]}
          />
        </div>
      </section>

      {/* the funding networks as a logo strip */}
      <section className="rf-sec !pt-0" aria-labelledby="lg-title">
        <div className="s-wrap">
          <RfHead id="lg-title" title="Fund in USDT," accent="on two networks." />
          <LogoStrip
            logos={[
              { src: '/site/brands/usdt.svg', name: 'Tether USDT' },
              { src: '/site/brands/trx.svg', name: 'TRON' },
              { src: '/site/brands/bnb.svg', name: 'BNB Chain' },
            ]}
          />
        </div>
      </section>

      {/* the closing band: squares of orange at its edges, one card in the middle */}
      <CtaBand
        title="Open your account"
        accent="today."
        sub={`Register in a couple of minutes, practise on ${DEMO.defaultBalance} of demo money, and go live from ${ACCOUNTS[0].minDeposit} when you are ready.`}
        primary={{ href: `${CRM_URL}/register`, label: 'Open account' }}
      />

      {/* the languages as a strip */}
      <section className="rf-sec" aria-labelledby="ln-title">
        <RfHead id="ln-title" title={`Kalks speaks ${LANGUAGES.length} languages.`} sub="Arabic, Urdu and Persian read right to left." className="s-wrap" />
        <LangStrip names={LANGUAGES} />
      </section>
    </>
  );
}
