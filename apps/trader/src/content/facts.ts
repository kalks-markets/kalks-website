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
 *  (spread markup per group: Standard 10 points, Pro 3, ECN 0, Cent 10; a point is 10^-digits, so 10 points = 1.0 pip
 *  on a 5-digit FX pair). Pricing labels from apps/crm/components/trading/group-card.tsx:22-34. */
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
    spread: 'Raw + 1.0 pip',
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
    spread: 'Raw + 0.3 pip',
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
    minDeposit: '$500',
    leverage: '1:500',
    leverageOptions: '1:50 · 1:100 · 1:200 · 1:500',
    pricing: 'Raw spread + commission',
    spread: 'Raw, no markup',
    commission: '$7 per lot round turn',
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
    spread: 'Raw + 1.0 pip',
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

/** services/ib/src/model.rs:106-127, 254-262 — USD per lot: FX major / FX minor / metals / indices / energies / crypto / stocks */
export const IB_LEVELS = [
  { name: 'Bronze', fxMajor: 5, metals: 8, crypto: 6, cpa: 200, needs: 'From sign-up' },
  { name: 'Silver', fxMajor: 7, metals: 10, crypto: 8, cpa: 200, needs: '10 active clients · 200 lots a month' },
  { name: 'Gold', fxMajor: 9, metals: 12, crypto: 10, cpa: 300, needs: '50 active clients · 1,000 lots a month' },
  { name: 'Platinum', fxMajor: 11, metals: 13.5, crypto: 12, cpa: 300, needs: '150 active clients · 3,000 lots a month' },
  { name: 'Diamond', fxMajor: 13, metals: 15, crypto: 14, cpa: 300, needs: '400 active clients · 8,000 lots a month' },
] as const;

export const IB = {
  tiers: 3, // default network depth paying 100% / 20% / 10% of the per-lot rate
  tierShares: '100% · 20% · 10%',
  payout: 'Weekly, every Monday, to your USDT wallet',
  minPayout: '$10',
} as const;

/** services/trading/migrations/0002_social.sql:16-29, services/trading/README.md:431-470, 595-604 */
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
  version: '1.0.0',
  build: 3,
  href: '/download/kalks-android.apk',
  hrefUniversal: '/download/kalks-android-universal.apk',
  sizeMb: 44,
  sha256: 'e34b5847d53932529b7f59d16739eb5bbb2317f27832039cbcf060a6baaa25bf',
  minAndroid: 'Android 7.0',
};
