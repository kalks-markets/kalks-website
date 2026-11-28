/**
 * Every number on the website comes from here, and every value here comes from the Kalks platform repo
 * (paths relative to that repo). Most values are seeded defaults that Back Office staff can change, so
 * re-check them against production before a campaign. Never add a number without a source.
 */

/**
 * config/instruments.json (1,389 rows); live rule in services/trading/src/specs.rs:15-18.
 * Re-synced 2026-10-09 against the live engine (GET https://trade.kalkstrade.com/api/engine/symbols): 233 catalogue
 * markets live + the 28 core instruments (always live) = 261 live on real-money accounts; 1,128 catalogue markets are
 * demo-only (1,100 stocks, 19 forex, 7 crypto, 2 indices). Every instrument trades on demo. Lead with the live number;
 * never present 1,389 as "markets you can trade" without saying most stocks are demo-only.
 */
export const INSTRUMENTS = {
  checked: '2026-10-09',
  total: 1389,
  liveMarkets: 261, // 28 core + 233 catalogue rows with liveTrading = true
  demoOnly: 1128,
  byClass: {
    forex: { total: 63, live: 44 },
    metals: { total: 16, live: 16 },
    energies: { total: 4, live: 4 },
    indices: { total: 34, live: 32 },
    crypto: { total: 167, live: 160 },
    stocks: { total: 1105, live: 5, comingSoon: 1100 }, // 800 US, 150 Hong Kong, 150 Tokyo
  },
  assetClasses: 6,
} as const;

/** config/trading-specs.json — maximum leverage per instrument class (min of account and symbol cap applies) */
export const LEVERAGE = {
  accountMax: 1000, // Standard and Cent groups, services/trading/migrations/0001_trading.sql:57-64
  coreCaps: { forex: 1000, metals: 500, indices: 200, energies: 200, crypto: 20, stocks: 10 },
} as const;

export type AccountType = {
  id: string;
  /** An account trades one product, set by its group (Kalks 2 Track 1, services/trading/migrations/20261022120000_account_products.sql). */
  product: 'cfd';
  name: string;
  tagline: string;
  currency: string;
  minDeposit: string;
  leverage: string;
  leverageOptions: string;
  pricing: string;
  spread: string;
  commission: string;
  marginCall: string;
  stopOut: string;
  mode: string;
  bestFor: string;
  highlight?: boolean;
};

/** services/trading/migrations/0001_trading.sql:57-64 (groups) and services/market-data/migrations/0001_market_data.sql:64-69
 *  and 0004_pricing_guide_spreads.sql (KalksTrade Pricing Guide, 22 Nov 2026: EURUSD typically 0.9 / 0.8 / 0.5 pips on
 *  Cent / Standard / Pro, raw on ECN and VIP; ECN $200 and $5 a lot). Pricing labels from apps/crm/components/trading/group-card.tsx:22-34. */
export const ACCOUNTS: AccountType[] = [
  {
    id: 'standard',
    product: 'cfd',
    name: 'Standard',
    tagline: 'The everyday account. All-in spread, no commission.',
    currency: 'USD',
    minDeposit: '$10',
    leverage: '1:1000',
    leverageOptions: '1:50 · 1:100 · 1:200 · 1:500 · 1:1000',
    pricing: 'All-in spread, no commission',
    spread: 'Typical 0.8 pips on EURUSD',
    commission: 'None',
    marginCall: '100%',
    stopOut: '50%',
    mode: 'Hedging',
    bestFor: 'Most traders, from the first trade on',
    highlight: true,
  },
  {
    id: 'pro',
    product: 'cfd',
    name: 'Pro',
    tagline: 'Tighter all-in pricing for active traders.',
    currency: 'USD',
    minDeposit: '$200',
    leverage: '1:500',
    leverageOptions: '1:50 · 1:100 · 1:200 · 1:500',
    pricing: 'All-in spread, no commission',
    spread: 'Typical 0.5 pips on EURUSD',
    commission: 'None',
    marginCall: '100%',
    stopOut: '50%',
    mode: 'Hedging or Netting',
    bestFor: 'Active traders who want tighter spreads and no commission',
  },
  {
    id: 'ecn',
    product: 'cfd',
    name: 'ECN',
    tagline: 'Raw spread with a fixed commission.',
    currency: 'USD',
    minDeposit: '$200',
    leverage: '1:500',
    leverageOptions: '1:50 · 1:100 · 1:200 · 1:500',
    pricing: 'Raw spread + commission',
    spread: 'Raw, no markup',
    commission: '$5 per lot round turn',
    marginCall: '100%',
    stopOut: '50%',
    mode: 'Hedging',
    bestFor: 'Scalpers and high-volume traders',
  },
  {
    id: 'cent',
    product: 'cfd',
    name: 'Cent',
    tagline: 'Balances in US cents. Real markets, small stakes.',
    currency: 'USC (US cents)',
    minDeposit: '$10',
    leverage: '1:1000',
    leverageOptions: '1:100 · 1:200 · 1:500 · 1:1000',
    pricing: 'All-in spread, no commission',
    spread: 'Typical 0.9 pips on EURUSD',
    commission: 'None',
    marginCall: '60%',
    stopOut: '20%',
    mode: 'Hedging',
    bestFor: 'Testing a strategy with real money at a small size',
  },
  {
    id: 'vip',
    product: 'cfd',
    name: 'VIP',
    tagline: 'Raw pricing with the lowest commission.',
    currency: 'USD',
    minDeposit: '$25,000',
    leverage: '1:500',
    leverageOptions: '1:50 · 1:100 · 1:200 · 1:500',
    pricing: 'Raw spread + commission',
    spread: 'Raw, no markup',
    commission: '$3 per lot round turn',
    marginCall: '100%',
    stopOut: '50%',
    mode: 'Hedging',
    bestFor: 'Large accounts and professional volume',
  },
];

/**
 * Options accounts (services/trading/migrations/20261022120000_account_products.sql and
 * services/options/migrations/20261022120000_options_pro_group.sql): an Options account trades options only; a client
 * can hold CFD and Options accounts side by side, all funded from the one USDT wallet. Options Standard is enabled with
 * no account minimum and the platform default fee. Options Pro is seeded DISABLED (its fee and minimum are placeholders
 * until the founder sets them), so the website names it as coming, with no numbers.
 */
export const OPTIONS_ACCOUNTS = [
  {
    id: 'options-standard',
    name: 'Options Standard',
    status: 'live' as const,
    tagline: 'Calls and puts on forex, gold, silver and oil.',
    minDeposit: 'No account minimum',
    commission: '$0.25 per contract, capped at 10% of the premium',
    leverage: 'None: you pay the premium in cash',
    selling: 'Allowed; uses margin',
  },
  {
    id: 'options-pro',
    name: 'Options Pro',
    status: 'soon' as const,
    tagline: 'Lower per-contract fees for larger accounts.',
  },
] as const;

/** services/trading/migrations/0001_trading.sql:47-49 and services/trading/README.md:149 */
export const DEMO = {
  defaultBalance: '$10,000',
  balanceRange: '$100 to $1,000,000',
  refillsPerDay: 3,
} as const;

/** services/options (seed.rs:46-58, README.md:11-17, migrations/20261002120000_options.sql) */
export const OPTIONS = {
  underlyingsLive: ['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'EURJPY', 'GBPJPY', 'XAUUSD', 'XAGUSD', 'USOIL', 'UKOIL'],
  underlyingsSoon: ['NZDUSD'],
  fxPairsLive: 8,
  expiries: { daily: 'the next 5 business days', weekly: 'the next 4 Fridays', monthly: 'the next 3 month-end Fridays' },
  dailyPerWeek: 5,
  cut: '10:00 New York',
  settlement: 'Cash in USD, at the average of 1-second mid prices over the 30 minutes before the cut',
  contract: { fx: '10,000 units of the base currency', xau: '1 oz', xag: '50 oz', oil: '10 barrels' },
  commission: '$0.25 per contract, capped at 10% of the premium',
  contractsPerOrder: '1 to 100',
  strategies: ['Long call', 'Long put', 'Straddle', 'Strangle', 'Bull call spread', 'Bear put spread', 'Iron condor', 'Butterfly'],
  maxLegs: 8,
  models: 'Garman-Kohlhagen (FX), Black-Scholes with a lease rate (gold, silver), Black-76 (oil)',
} as const;

/** services/prop/migrations/0001_prop.sql:317-341 */
export const PROP = [
  {
    id: 'classic',
    name: 'Classic 2-Step',
    summary: 'The classic evaluation. Two phases, relaxed rules, the fee comes back.',
    phases: 'Phase 1: 8% target · Phase 2: 5% target',
    minDays: '4 trading days per phase',
    dailyLoss: '5% of balance',
    maxDrawdown: '10% static',
    split: '80%, scaling to 90%',
    payouts: 'Every 2 weeks, first after 14 days',
    leverage: '1:100',
    refund: 'Fee refunded',
    news: 'News trading and weekend holding allowed',
    sizes: [
      ['$5k', '$49'], ['$10k', '$89'], ['$25k', '$189'], ['$50k', '$299'], ['$100k', '$499'], ['$200k', '$979'],
    ],
  },
  {
    id: 'rapid',
    name: 'Rapid 1-Step',
    summary: 'One phase, one target. Faster to funded, tighter limits.',
    phases: 'One phase: 10% target',
    minDays: '3 trading days',
    dailyLoss: '3% of equity',
    maxDrawdown: '6% trailing',
    split: '80%, scaling to 90%',
    payouts: 'Every 2 weeks, first after 14 days',
    leverage: '1:50',
    refund: 'Fee refunded',
    news: 'No news trading or weekend holding',
    sizes: [
      ['$5k', '$59'], ['$10k', '$99'], ['$25k', '$199'], ['$50k', '$319'], ['$100k', '$549'], ['$200k', '$1,049'],
    ],
  },
  {
    id: 'instant',
    name: 'Instant Funding',
    summary: 'No evaluation. Start on a funded account the same day.',
    phases: 'No evaluation',
    minDays: 'None',
    dailyLoss: '3% of equity',
    maxDrawdown: '6% trailing',
    split: '70%, scaling to 90%',
    payouts: 'Monthly, first after 30 days',
    leverage: '1:30',
    refund: 'No refund',
    news: 'No news trading or weekend holding',
    sizes: [['$5k', '$129'], ['$10k', '$229'], ['$25k', '$449'], ['$50k', '$749'], ['$100k', '$1,349']],
  },
] as const;

/**
 * The partner (IB) programme as it runs in production, a snapshot of the IB service (services/ib) for tenant `kalks`
 * on 28 Nov 2026: table `levels` (settings version 5, "migration 0011: options per contract") and table `settings`.
 * The service has no public read of the plan (every route needs the internal token), so the site carries this copy;
 * re-take it when the Back Office changes a rate (`psql -d kalks_ib`, read-only) and move `IB_AS_OF`.
 *
 * - Rate card: USD per standard lot, round turn (paid once, on the closing deal), per symbol group. No account-type
 *   rules (`accountRates` empty), so every CFD account type pays the full card; cent lots count at `centLotFactor`.
 * - Options: `optionsBasis` `contracts`, USD per contract round turn (was a share of the premium until 28 Nov 2026).
 *   Contracts are not lots: they never add to the level target.
 * - Levels: both targets over the last `levelWindowDays` (90) up to the end of yesterday, checked daily (`upgrade`
 *   daily); on the 1st, one level down when the targets are missed (`allowDemotion`). No CPA (`cpa.enabled` false).
 * - Tiers 100 / 10 / 5 with `tierBasis` `tier1`: tiers 2 and 3 earn a share of what tier 1 earns on the deal.
 */
export const IB_AS_OF = '28 Nov 2026';

/** Symbol groups in the order of the live settings, with what falls into each (config/instruments.json asset classes). */
export const IB_GROUPS = [
  { key: 'fx-major', name: 'Forex majors', covers: 'EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD, USDCHF, NZDUSD' },
  { key: 'fx-minor', name: 'Forex minors & crosses', covers: 'Every other forex pair' },
  { key: 'metals', name: 'Metals', covers: 'Gold, silver, platinum, palladium, copper and the other metals' },
  { key: 'indices', name: 'Indices', covers: 'Every index' },
  { key: 'energies', name: 'Oil & energies', covers: 'WTI crude, Brent and natural gas' },
  { key: 'crypto', name: 'Crypto', covers: 'Every crypto pair' },
  { key: 'stocks', name: 'Stocks', covers: 'US and Hong Kong stocks' },
] as const;

export type IbGroupKey = (typeof IB_GROUPS)[number]['key'];

type IbLevel = {
  key: string;
  name: string;
  /** USD per standard lot round turn, by symbol group */
  rates: Record<IbGroupKey, number>;
  /** USD per option contract round turn */
  optionsUsd: number;
  /** level targets over the last 90 days: lots traded by the whole network and direct clients with a qualifying trade */
  minLots: number;
  minClients: number;
  /** the level's perks as the partner dashboard lists them */
  perks: readonly string[];
};

export const IB_LEVELS: readonly IbLevel[] = [
  {
    key: 'bronze',
    name: 'Bronze',
    rates: { 'fx-major': 8, 'fx-minor': 8, metals: 12, indices: 2, energies: 4, crypto: 5, stocks: 1 },
    optionsUsd: 0.1,
    minLots: 0,
    minClients: 0,
    perks: ['Start here: no target', '$8 per lot on forex', '$0.10 per options contract'],
  },
  {
    key: 'silver',
    name: 'Silver',
    rates: { 'fx-major': 12.5, 'fx-minor': 12.5, metals: 15.5, indices: 3, energies: 5, crypto: 6, stocks: 1.5 },
    optionsUsd: 0.15,
    minLots: 150,
    minClients: 3,
    perks: ['150 lots and 3 active clients in 3 months', '$12.50 per lot on forex', '$0.15 per options contract'],
  },
  {
    key: 'gold',
    name: 'Gold',
    rates: { 'fx-major': 17, 'fx-minor': 17, metals: 19, indices: 4, energies: 6, crypto: 7, stocks: 2 },
    optionsUsd: 0.2,
    minLots: 750,
    minClients: 5,
    perks: ['750 lots and 5 active clients in 3 months', '$17 per lot on forex', '$0.20 per options contract'],
  },
  {
    key: 'platinum',
    name: 'Platinum',
    rates: { 'fx-major': 21.5, 'fx-minor': 21.5, metals: 25.5, indices: 5, energies: 7, crypto: 8, stocks: 2.5 },
    optionsUsd: 0.25,
    minLots: 2250,
    minClients: 8,
    perks: ['2,250 lots and 8 active clients in 3 months', '$21.50 per lot on forex', '$0.25 per options contract'],
  },
  {
    key: 'diamond',
    name: 'Diamond',
    rates: { 'fx-major': 26, 'fx-minor': 26, metals: 35, indices: 6, energies: 8, crypto: 9, stocks: 3 },
    optionsUsd: 0.3,
    minLots: 4500,
    minClients: 10,
    perks: ['4,500 lots and 10 active clients in 3 months', '$26 per lot on forex', '$0.30 per options contract'],
  },
];

/** "150 lots · 3 active clients in 3 months", or "From sign-up" for the entry level */
export const ibNeeds = (l: IbLevel) =>
  l.minLots === 0 && l.minClients === 0 ? 'From sign-up' : `${l.minLots.toLocaleString('en-US')} lots · ${l.minClients} active clients in 3 months`;

/** "$8", "$12.50", "$0.10": whole dollars without cents, anything else to the cent */
export const usd = (n: number) => `$${Number.isInteger(n) ? n.toLocaleString('en-US') : n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
/** always to the cent: "$2.00" */
export const usd2 = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const IB = {
  tiers: 3, // your rate on direct clients, then 10% and 5% of what your direct client's partner earns
  tierPcts: [100, 10, 5],
  tierShares: '100% · 10% · 5%',
  payout: 'Daily, to your USDT wallet',
  minPayout: '$10',
  minPayoutUsd: 10,
  /** a trade earns once it was open this long (settings minTradeSeconds 180) */
  minHoldMinutes: 3,
  /** 1 cent lot = 0.01 standard lot (settings centLotFactor) */
  centLotFactor: 0.01,
  /** a partner may pass up to this share of its own tier amount to the sub-partner directly below (maxSplitPct) */
  maxSplitPct: 70,
  /** level window (levelWindowDays) */
  windowDays: 90,
  rebates: false,
  cpa: false,
  noticeDays: 30,
} as const;

export const SOCIAL = {
  perfFee: 'up to 50%',
  trackRecordDays: 30,
  minMasterEquity: '$100',
  minAllocation: '$50',
  historyDelay: '30 minutes',
  sizingModes: ['Equity ratio', 'Fixed allocation', 'Multiplier', 'Fixed lot'],
  followerControls: ['Maximum lot size', 'Equity stop', 'Maximum drawdown', 'Excluded symbols'],
  mamMethods: ['Equity', 'Balance', 'Multiplier', 'Percent'],
} as const;

/** content/academy/en (9 phases, 118 lessons, 473 quiz questions, 274 glossary terms) */
export const ACADEMY = {
  phases: 9,
  lessons: 118,
  quizQuestions: 473,
  glossary: 274,
  passMark: '70%',
  list: [
    { n: 1, title: 'Markets and instruments', level: 'Beginner', lessons: 13 },
    { n: 2, title: 'How trading works', level: 'Beginner', lessons: 14 },
    { n: 3, title: 'Economics and price action', level: 'Intermediate', lessons: 14 },
    { n: 4, title: 'News and indicators', level: 'Intermediate', lessons: 14 },
    { n: 5, title: 'Intermarket analysis and risk control', level: 'Intermediate', lessons: 14 },
    { n: 6, title: 'Sentiment, positioning and systems', level: 'Advanced', lessons: 14 },
    { n: 7, title: "Asset classes and the trader's mind", level: 'Advanced', lessons: 13 },
    { n: 8, title: 'Macro regimes and professional trading', level: 'Professional', lessons: 14 },
    { n: 9, title: 'Kalks FX Options', level: 'Intermediate', lessons: 8 },
  ],
} as const;

/** services/wallet (README.md, migrations/0001_wallet.sql:17-23) */
export const FUNDING = {
  methods: 'USDT on BNB Chain (BEP20) and TRON (TRC20)',
  minDeposit: '10 USDT',
  withdrawalRange: '10 to 50,000 USDT',
  withdrawalFee: '1 USDT flat',
  creditTime: 'usually within a minute',
  transfers: 'Wallet to account transfers are instant and free',
} as const;

/** packages/i18n/src/locales.ts:4-27 */
export const LANGUAGES = [
  'English', 'हिन्दी', 'العربية', 'اردو', 'فارسی', 'Español', 'Português', 'Français', 'Deutsch', 'Italiano', 'Русский',
  'Türkçe', 'Bahasa Indonesia', 'Bahasa Melayu', 'Tiếng Việt', 'ไทย', '简体中文', '日本語', '한국어', 'বাংলা', 'தமிழ்', 'Kiswahili',
] as const;

/** Kalks Trader (apps/terminal): chart types, timeframes, indicators, order types */
export const TRADER = {
  chartTypes: 4,
  timeframes: ['M1', 'M5', 'M15', 'M30', 'H1', 'H4', 'D1', 'W1', 'MN'],
  indicators: 35,
  drawingTools: 6,
} as const;

/** API & algo (services/algo/README.md) */
export const ALGO = {
  rateLimit: '60 requests a minute per key',
  webhookRoutes: 10,
  indicatorSeries: 32,
} as const;

/** packages/i18n/src/catalog/en/common.ts:98 — the platform's official wording. */
export const RISK_WARNING =
  'CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. Consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.';

export const OPTIONS_RISK =
  'Buying an option can lose 100% of the premium paid. Selling an option can lose more than the premium received and uses margin.';

/** The Android app on the website (served by Caddy from /srv/kalks/downloads on the server). Update on each release. */
export const ANDROID_APP = {
  version: '1.1.7',
  build: 23,
  // both are hard links to the latest release on the server (platform repo deploy/publish-app.sh switches them)
  href: '/download/kalks-android.apk',
  hrefUniversal: '/download/kalks-android-universal.apk',
  sizeMb: 104, // 109,358,695 bytes (one universal APK)
  sha256: '8cb970465b2237fe23387c8a61c5883f96ee033e1d46c53759566ec620e2805a',
  minAndroid: 'Android 7.0',
};

/**
 * Trading hours (crates/markethours/src/lib.rs, config/trading-specs.json in the platform repo): server time is
 * GMT+3 during US daylight saving and GMT+2 otherwise, so 00:00 server time is 17:00 in New York. The `fx` session
 * (forex, metals, energies, index CFDs) runs Monday 00:00 to Friday 24:00 server time; crypto is 24x7; US stocks
 * 09:30–16:00 New York. Overnight financing is charged at the server-day rollover; Wednesday is charged ×3 for forex
 * and metals, Friday for indices and energies.
 */
export const HOURS = {
  rolloverNy: '17:00',
  fxWeek: 'Sunday 17:00 to Friday 17:00 New York',
  usStocks: '09:30–16:00 New York',
  tripleSwap: { forexMetals: 'Wednesday', indicesEnergies: 'Friday' },
} as const;
