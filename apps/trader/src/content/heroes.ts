/**
 * Hero photos (founder's own solid-colour set, 2026-10-10), served at their native size so they stay sharp; `bg` is
 * each photo's own backdrop colour, used as the hero's solid background so the figure blends into it. Academy,
 * white-label and contact are blue originals graded to an orange duotone (black → ember → orange → cream) to stay in
 * the black + orange palette. Image rights: to confirm before production (founder-supplied).
 */
export type HeroKey = 'home' | 'markets' | 'options' | 'accounts' | 'platforms' | 'copy' | 'prop' | 'partners' | 'about' | 'academy' | 'whitelabel' | 'contact';

export const HEROES: Record<HeroKey, { src: string; w: number; h: number; bg: string }> = {
  home: { src: '/site/heroes/home.webp', w: 816, h: 1456, bg: '#ff3201' },
  markets: { src: '/site/heroes/markets.webp', w: 736, h: 1313, bg: '#f10223' },
  options: { src: '/site/heroes/options.webp', w: 736, h: 1313, bg: '#ec0701' },
  accounts: { src: '/site/heroes/accounts.webp', w: 736, h: 977, bg: '#d10013' },
  platforms: { src: '/site/heroes/platforms.webp', w: 736, h: 1027, bg: '#f7472a' },
  copy: { src: '/site/heroes/copy.webp', w: 736, h: 1313, bg: '#b50219' },
  prop: { src: '/site/heroes/prop.webp', w: 1168, h: 1439, bg: '#c51f1e' },
  partners: { src: '/site/heroes/partners.webp', w: 1200, h: 2015, bg: '#fb1e29' },
  about: { src: '/site/heroes/about.webp', w: 1672, h: 941, bg: '#440503' },
  academy: { src: '/site/heroes/academy.webp', w: 928, h: 1222, bg: '#401103' },
  whitelabel: { src: '/site/heroes/whitelabel.webp', w: 1152, h: 2048, bg: '#4c1403' },
  contact: { src: '/site/heroes/contact.webp', w: 736, h: 1103, bg: '#641b05' },
};

/** Real product screenshots (local demo session, 2× retina), in public/site/shots. */
export const SHOTS = {
  traderWorkspace: { src: '/site/shots/trader-workspace.webp', w: 2880, h: 1800, alt: 'Kalks Trader: a BTCUSD chart with a buy position, its stop loss and take profit lines, the instruments list and the account bar' },
  traderToolbar: { src: '/site/shots/trader-toolbar.webp', w: 2152, h: 84, alt: 'The chart toolbar with timeframes and the one-click Sell, lot size and Buy bar' },
  traderChart: { src: '/site/shots/trader-chart.webp', w: 2152, h: 1580, alt: 'A Kalks Trader chart with position, stop loss and take profit lines you can drag' },
  traderPositions: { src: '/site/shots/trader-positions.webp', w: 2880, h: 540, alt: 'Open positions with live P&L, stop loss, take profit and one-click close' },
  traderTicket: { src: '/site/shots/trader-ticket.webp', w: 888, h: 1352, alt: 'The order ticket: sell and buy prices, volume presets, stop loss, take profit, margin needed and pip value' },
  traderOptions: { src: '/site/shots/trader-options.webp', w: 2880, h: 1800, alt: 'The Kalks FX Options chain for EURUSD: calls and puts by strike with chance and breakeven' },
  traderPhone: { src: '/site/shots/trader-phone.webp', w: 780, h: 1688, alt: 'Kalks Trader on a phone: the chart with Sell and Buy at the bottom' },
  caDashboard: { src: '/site/shots/ca-dashboard.webp', w: 2712, h: 1480, alt: 'The Client Area home: the AI assistant bar, total balance, equity, wallet and P&L' },
  caAccounts: { src: '/site/shots/ca-accounts.webp', w: 2712, h: 1134, alt: 'Shortcuts and your trading account as a card in the Client Area' },
  caTypes: { src: '/site/shots/ca-types.webp', w: 2632, h: 1700, alt: 'Account types as cards: Cent, ECN, Pro and Pro Netting' },
  caCopy: { src: '/site/shots/ca-copy.webp', w: 2632, h: 1604, alt: 'Copy trading masters as cards with return, drawdown, followers and risk' },
  caWallet: { src: '/site/shots/ca-wallet.webp', w: 2712, h: 1664, alt: 'The USDT wallet with deposit, withdraw and transfer' },
  caPamm: { src: '/site/shots/ca-pamm.webp', w: 2712, h: 1648, alt: 'PAMM funds with NAV, return, assets and drawdown' },
  caPartner: { src: '/site/shots/ca-partner.webp', w: 2712, h: 2282, alt: 'The partner dashboard with level, progress and the referral card' },
} as const;
export type ShotKey = keyof typeof SHOTS;
