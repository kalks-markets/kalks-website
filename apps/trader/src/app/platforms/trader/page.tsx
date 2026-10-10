import type { Metadata } from 'next';
import { HeroGlass, PageHero } from '@/components/site/Heroes';
import { Btn, Checks, Cta, Head } from '@/components/site/ui';
import { FeatureSplit, Phone, Shot, type Pin } from '@/components/site/Shot';
import { Rise } from '@/components/site/Rise';
import { FaqSection, MiniHead, NumberedRows, Related } from '@/components/site/platforms/bits';
import { PinTour } from '@/components/site/platforms/ShotTours';
import { PSHOTS } from '@/components/site/platforms/shots';
import { DEMO, INSTRUMENTS, LANGUAGES, OPTIONS, TRADER } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES } from '@/content/heroes';
import { TRADER_FEATURES } from '@/content/platforms';
import { DEMO_HREF, TRADER_URL } from '@/lib/crm';

export const metadata: Metadata = {
  title: 'Kalks Trader: the trading terminal',
  description: `Kalks Trader runs in your browser and on Android: ${TRADER.chartTypes} chart types, ${TRADER.timeframes.length} timeframes, ${TRADER.indicators} indicators, one-click trading, a depth ladder and the option chain.`,
  alternates: { canonical: '/platforms/trader' },
};

const TF = `${TRADER.timeframes[0]} to ${TRADER.timeframes[TRADER.timeframes.length - 1]}`;

/** pins in % of each screenshot */
const WORKSPACE_PINS: Pin[] = [
  { x: 17.9, y: 2.6, title: 'CFD or Options', text: 'Each account trades one product. Switch between your CFD and Options accounts at the top; the workspace follows.' },
  { x: 43.4, y: 2.6, title: 'Search markets and actions', text: 'Find any market or command from the keyboard, without leaving the chart.' },
  { x: 83, y: 2.6, title: 'Your account', text: 'The account you are trading and its balance. Switch accounts from here.' },
  { x: 5.5, y: 8.4, title: 'Charts as tabs', text: `Open several markets, switch timeframes from ${TF}, and split the screen into 1, 2 or 4 charts.` },
  { x: 47.5, y: 8.4, title: 'One-click Sell · lot · Buy', text: 'A slim bar in the chart toolbar: set the lot size and trade at the live price, or open the full ticket first.' },
  { x: 2, y: 30, title: 'Drawing tools', text: 'Trend lines, horizontal levels, channels, rectangles and the crosshair, on a rail beside the chart.' },
  { x: 62, y: 65.5, title: 'Position, stop and target lines', text: 'Every position, stop loss and take profit is a line on the chart with its live P&L. Drag a line to move the level.' },
  { x: 82.5, y: 8.4, title: 'Instruments, order book and ticks', text: `${INSTRUMENTS.liveMarkets} live markets with bid, ask and the day's change, favourites, search, and the depth of the market one tab over.` },
  { x: 25, y: 96.8, title: 'Account at a glance', text: 'Balance, equity, floating P&L, margin, free margin and margin level, updated with every tick.' },
];

const TOOLBAR_PINS: Pin[] = [
  { x: 6.5, y: -48, title: 'Market and open charts', text: 'The market on this chart and how many charts you have open.' },
  { x: 16.5, y: -48, title: 'Chart type', text: `${TRADER.chartTypes} types: candles, bars, line and area.` },
  { x: 31, y: -48, title: 'Timeframes', text: `${TRADER.timeframes.length} of them, ${TF}, one click each.` },
  { x: 46.5, y: -48, title: 'Order ticket', text: 'The full ticket for limit, stop and stop-limit orders, with every number shown.' },
  { x: 54.5, y: -48, title: 'Sell', text: 'Sell at the live bid. With one-click trading on it goes straight in; otherwise you confirm.' },
  { x: 64, y: -48, title: 'Lot size', text: 'Step the volume with − and +, or type it.' },
  { x: 73.5, y: -48, title: 'Buy', text: 'Buy at the live ask, the same way.' },
  { x: 81.3, y: -48, title: 'Indicators', text: `${TRADER.indicators} indicators; the badge counts the ones on this chart.` },
  { x: 86.3, y: -48, title: 'Layout', text: '1, 2 or 4 charts, ready layouts, and which panels show.' },
  { x: 95, y: -48, title: 'Full chart', text: 'Hide everything but the chart when you want to focus.' },
];

const CHART_PINS: Pin[] = [
  { x: 47.5, y: 7.1, title: 'Prices and indicator values', text: 'The market and timeframe, open, high, low, close and change, and the value of each indicator on the chart.' },
  { x: 1.9, y: 21.5, title: 'Drawing tools', text: `${TRADER.drawingTools} tools on a rail beside the chart, and a bin to clear them.` },
  { x: 79.5, y: 33.4, title: 'Take profit', text: 'The target as a dashed line with the profit it would lock in. Drag it along the price axis to move it.' },
  { x: 78.5, y: 67.3, title: 'Your position', text: 'Side, volume and live P&L on the line at your entry price.' },
  { x: 80.5, y: 86.4, title: 'Stop loss', text: 'The stop as a line with the loss, in money, if it is hit. Drag to move it.' },
  { x: 95.3, y: 62.5, title: 'Prices on the axis', text: 'Your entry, the live ask and the live bid, marked on the price axis.' },
];

const INDICATOR_PINS: Pin[] = [
  { x: 23.5, y: 12.2, title: 'Grouped', text: 'Trend, oscillators, volatility, volume and Bill Williams, plus your favourites.' },
  { x: 62.5, y: 12.2, title: 'Search', text: `All ${TRADER.indicators} indicators by name or short code.` },
  { x: 3.1, y: 16.9, title: 'Favourites', text: 'Star the ones you use and they gather in one list.' },
  { x: 71.8, y: 18.6, title: 'On this chart', text: 'See at a glance which indicators are already on the chart.' },
  { x: 93.6, y: 18.6, title: 'Add and set up', text: 'Add one with +, or open its settings first.' },
];

const LAYOUT_PINS: Pin[] = [
  { x: 88, y: 3.8, title: 'Charts on screen', text: '1 chart, 2 side by side, 2 stacked or a grid of 4.' },
  { x: 88, y: 28.3, title: 'Ready layouts', text: 'Trading, Chart focus, Analysis with 4 charts, and Scalper with the order book and 2 charts.' },
  { x: 88, y: 52.9, title: 'Panels', text: 'Show or hide the instruments, the order book and the navigator, or go full chart.' },
  { x: 88, y: 75.4, title: 'Positions', text: 'On a full page below the chart, or split under it.' },
];

const TICKET_PINS: Pin[] = [
  { x: 50, y: 16.7, title: 'Sell and Buy, live', text: 'Both prices with every tick, and what each side means for you.' },
  { x: 23.5, y: 27.8, title: 'Order type', text: 'Market, limit, stop and stop-limit.' },
  { x: 4.3, y: 39.6, title: 'Volume', text: 'Presets from 0.01 lot, or type your own.' },
  { x: 4.3, y: 48.8, title: 'Stop loss and take profit', text: 'Switch each on and set it by price, pips or money.' },
  { x: 6.8, y: 57.9, title: 'More options', text: 'Trailing stop, a comment and the maximum price change you accept.' },
  { x: 32, y: 64.3, title: 'The numbers first', text: 'Margin needed, pip value, position size and your free margin after the trade.' },
  { x: 22.5, y: 80.8, title: 'Overnight swap', text: 'What holding overnight costs for a long and a short, before you trade.' },
  { x: 7.3, y: 95.6, title: 'One-click trading', text: 'Switch it on to trade straight from the chart without a confirmation.' },
];

const POSITION_PINS: Pin[] = [
  { x: 38.5, y: 6.4, title: 'One panel', text: 'Positions, orders and history, with alerts, news and the calendar a tab away.' },
  { x: 33.5, y: 19, title: 'Open to current', text: 'The open price and the current price of every position.' },
  { x: 51.5, y: 43, title: 'Stops inline', text: 'Add a stop loss or a take profit right in the row.' },
  { x: 91.5, y: 30.9, title: 'Close in one click', text: 'Close a position from its row, or open its menu for partial close and close by.' },
  { x: 75.5, y: 6.4, title: 'Close positions', text: 'Close all, profitable, losing, buys, sells or by symbol, move every stop to breakeven, or cancel pending orders.' },
];

const OPTIONS_PINS: Pin[] = [
  { x: 17.3, y: 2.6, title: 'Options mode', text: 'The same terminal on your Options account, with the chain in place of the chart.' },
  { x: 34, y: 8.9, title: 'Expiry, cut and volatility', text: `The expiry on screen, the time left to the ${OPTIONS.cut} cut, and at-the-money volatility.` },
  { x: 60.7, y: 8.9, title: 'Quick trade and strategy builder', text: `One call or put in a tap, or ${OPTIONS.strategies.length} ready-made strategies of up to ${OPTIONS.maxLegs} legs.` },
  { x: 35.5, y: 13.9, title: 'Chain, charts and analytics', text: 'Switch between the chain, the underlying chart, the option chart, both, and analytics.' },
  { x: 5.4, y: 18.6, title: 'Expiries', text: `Daily, weekly and monthly: ${OPTIONS.expiries.daily}, ${OPTIONS.expiries.weekly} and ${OPTIONS.expiries.monthly}.` },
  { x: 31.2, y: 28, title: 'Calls and puts', text: 'Calls profit if the price rises, puts if it falls. Buy and sell prices for every strike.' },
  { x: 18.5, y: 30.9, title: 'Chance and breakeven', text: 'The chance of finishing in the money and the price you need at expiry, on every row.' },
  { x: 44, y: 52.8, title: 'Where the price is now', text: 'The current price is marked between the strikes; the at-the-money strike is flagged.' },
  { x: 82.5, y: 8.4, title: 'Underlyings', text: `${OPTIONS.underlyingsLive.length} markets: ${OPTIONS.fxPairsLive} FX pairs, gold, silver and oil.` },
];

const FAQ = FAQ_GROUPS.find((g) => g.id === 'platform')!.items;

export default function TraderPage() {
  return (
    <>
      <PageHero
        compact
        photo="platforms"
        eyebrow="Kalks Trader"
        title={
          <>
            Every instrument <span className="s-mute">on one screen.</span>
          </>
        }
        lead="A big, quiet chart with the market list beside it and your positions below, for CFDs and options alike. In your browser and on Android, with nothing to install on a computer."
        actions={
          <>
            <Btn href={TRADER_URL}>Open Kalks Trader</Btn>
            <Btn href={DEMO_HREF} variant="ghost" icon={false}>
              Try the demo
            </Btn>
          </>
        }
        facts={[`${TRADER.chartTypes} chart types`, `${TRADER.timeframes.length} timeframes`, `${TRADER.indicators} indicators`, `${TRADER.drawingTools} drawing tools`]}
        aside={
          <HeroGlass>
            <div className="s-num text-[56px] text-white">{INSTRUMENTS.liveMarkets}</div>
            <p className="mt-2 text-[14px] leading-snug text-white/85">live markets on one list, plus Kalks FX Options on {OPTIONS.underlyingsLive.length} underlyings</p>
          </HeroGlass>
        }
      />

      {/* 01 the workspace */}
      <section id="screen" className="s-sec scroll-mt-20" aria-labelledby="ws-title">
        <div className="s-wrap">
          <Head
            id="ws-title"
            index="01"
            eyebrow="The workspace"
            title={
              <>
                Chart first, <span className="s-mute">part by part.</span>
              </>
            }
            lead="Point at a number to see what each part does. Up candles are blue, down candles red."
          />
          <PinTour shot="traderWorkspace" pins={WORKSPACE_PINS} layout="under" scrollMin="min-w-[680px]" />
        </div>
      </section>

      {/* 02 the toolbar */}
      <section id="toolbar" className="s-sec s-band scroll-mt-20" aria-labelledby="tb-title">
        <div className="s-wrap">
          <Head
            id="tb-title"
            index="02"
            eyebrow="The chart toolbar"
            title={
              <>
                Sell · lot · Buy, <span className="s-hot">one click.</span>
              </>
            }
            lead="Everything for the chart in one slim row above it, with the trade bar in the middle. It never covers the candles."
          />
          <PinTour shot="traderToolbar" pins={TOOLBAR_PINS} layout="under" legendCols="sm:grid-cols-2 lg:grid-cols-5" scrollMin="min-w-[980px]" />
        </div>
      </section>

      {/* 03 on the chart */}
      <section id="chart" className="s-sec scroll-mt-20" aria-labelledby="ch-title">
        <div className="s-wrap">
          <Head
            id="ch-title"
            index="03"
            eyebrow="Trade on the chart"
            title={
              <>
                Your levels are lines <span className="s-mute">you can drag.</span>
              </>
            }
            lead="Stop loss, take profit, pending orders and alerts sit on the chart. Move one along the price axis and the order follows."
          />
          <PinTour shot="traderChart" pins={CHART_PINS} scrollMin="min-w-[560px]" />
        </div>
      </section>

      {/* 04 make it yours */}
      <section id="tools" className="s-sec s-band scroll-mt-20" aria-labelledby="tl-title">
        <div className="s-wrap">
          <Head
            id="tl-title"
            index="04"
            eyebrow="Indicators and layouts"
            title={
              <>
                Set it up <span className="s-mute">your way.</span>
              </>
            }
            lead={`${TRADER.indicators} indicators one search away, and layouts from a single chart to a scalper's screen with the order book.`}
          />
          <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
            <PinTour shot={PSHOTS.indicators} pins={INDICATOR_PINS} layout="card" scrollMin="min-w-[540px]" intro={<h3 className="s-h3">Indicators</h3>} />
            <PinTour shot={PSHOTS.layout} pins={LAYOUT_PINS} layout="card" maxW="max-w-[290px]" intro={<h3 className="s-h3">Layout</h3>} />
          </div>
        </div>
      </section>

      {/* 05 order ticket */}
      <section id="ticket" className="s-sec scroll-mt-20" aria-labelledby="ot-title">
        <div className="s-wrap">
          <PinTour
            shot="traderTicket"
            pins={TICKET_PINS}
            maxW="max-w-[440px]"
            cols="lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            intro={
              <MiniHead
                index="05"
                eyebrow="Order ticket"
                id="ot-title"
                className="mb-10"
                title={
                  <>
                    Every number <span className="s-mute">before you click.</span>
                  </>
                }
                lead="Server-side trailing stops, OCO and expiry by date too, for when a market order is not enough."
              />
            }
          />
        </div>
      </section>

      {/* 06 positions */}
      <section id="positions" className="s-sec s-band scroll-mt-20" aria-labelledby="pp-title">
        <div className="s-wrap">
          <Head
            id="pp-title"
            index="06"
            eyebrow="Positions"
            title={
              <>
                Live P&amp;L, <span className="s-mute">bulk actions.</span>
              </>
            }
            lead="Open price to current price, stops and targets you add inline, swap and commission, and one menu to close many at once."
          />
          <PinTour shot={PSHOTS.closeMenu} pins={POSITION_PINS} layout="under" legendCols="sm:grid-cols-2 lg:grid-cols-5" scrollMin="min-w-[900px]" />
          <Rise className="mt-12">
            <Shot shot="traderPositions" flat />
          </Rise>
        </div>
      </section>

      {/* 07 options mode */}
      <section id="options" className="s-sec scroll-mt-20" aria-labelledby="op-title">
        <div className="s-wrap">
          <Head
            id="op-title"
            index="07"
            eyebrow="Options mode"
            title={
              <>
                The option chain, <span className="s-hot">built in.</span>
              </>
            }
            lead={`Kalks FX Options in the same terminal: calls and puts by strike, cash-settled in US dollars at ${OPTIONS.cut}.`}
            action={<Btn href="/options">How options work</Btn>}
          />
          <PinTour shot="traderOptions" pins={OPTIONS_PINS} layout="under" scrollMin="min-w-[720px]" />
        </div>
      </section>

      {/* 08 phone */}
      <section id="phone" className="s-sec s-band scroll-mt-20" aria-label="On your phone">
        <div className="s-wrap">
          <FeatureSplit
            index="08"
            eyebrow="On your phone"
            title={
              <>
                The same terminal <span className="s-mute">in your pocket.</span>
              </>
            }
            text="Kalks Trader on Android and in any phone browser: the chart with your lines, Sell and Buy at the bottom, watchlist, positions and history one tap away."
            points={<Checks items={['Android app for Kalks Trader and the Client Area', `Translated in full, ${LANGUAGES.length} languages`, 'Sign in once, switch accounts in a tap']} />}
            action={<Btn href="/platforms/android">Get the Android app</Btn>}
            media={<Phone />}
            flip
          />
        </div>
      </section>

      {/* 09 feature list */}
      <section id="features" className="s-sec scroll-mt-20" aria-labelledby="ft-title">
        <div className="s-wrap">
          <Head
            id="ft-title"
            index="09"
            eyebrow="What is on it"
            title={
              <>
                The full list, <span className="s-mute">in short.</span>
              </>
            }
          />
          <NumberedRows items={TRADER_FEATURES.map(([t, d]) => ({ t, d }))} />
        </div>
      </section>

      <Related
        links={[
          { href: '/platforms/client-area', t: 'Client Area', d: 'Accounts, wallet, copy, prop and more.' },
          { href: '/platforms/android', t: 'Android app', d: 'Kalks Trader in your pocket.' },
          { href: '/platforms/api', t: 'API & algo', d: 'Automate your trading.' },
          { href: '/options', t: 'FX Options', d: 'The chain, quick trade and the strategy builder.' },
        ]}
      />

      <FaqSection
        index="10"
        title={
          <>
            Kalks Trader, <span className="s-mute">answered.</span>
          </>
        }
        items={FAQ}
      />

      <Cta
        title={
          <>
            Open it <span className="text-white/70">in your browser.</span>
          </>
        }
        sub={`Sign in with your Kalks account, or look around with live prices first. A demo account starts with ${DEMO.defaultBalance} of virtual money.`}
        primary={{ href: TRADER_URL, label: 'Open Kalks Trader' }}
        secondary={{ href: DEMO_HREF, label: 'Try the demo' }}
        facts={[`${TRADER.indicators} indicators`, `${TRADER.timeframes.length} timeframes`, `${LANGUAGES.length} languages`]}
        image={HEROES.platforms}
      />
    </>
  );
}
