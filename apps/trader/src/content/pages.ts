/**
 * Page keys of the content service (surface "website"), their paths (the Back Office opens a preview there) and the
 * bundled hero copy of each page: the defaults the content service can override (see lib/content.ts). Numbers
 * still come from ./facts.
 */
import { ACADEMY, ACCOUNTS, ANDROID_APP, DEMO, FUNDING, IB, INSTRUMENTS, LANGUAGES, LEVERAGE, OPTIONS, PROP } from '@/content/facts';
import { FAQ_GROUPS } from '@/content/faq';
import { HEROES, type HeroKey } from '@/content/heroes';
import { BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { DEMO_HREF, LOGIN_HREF, REGISTER_HREF, TRADER_URL } from '@/lib/crm';
import { HERO_SLOTS, getContent, getImage, mergeFaqGroups, mergeFaqItems, mergeHero, type FaqItem, type HeroCopy, type HeroImage } from '@/lib/content';

/** page key → path. `global` (nav, footer, screenshots) previews on the home page. */
export const PAGE_PATHS = {
  global: '/',
  home: '/',
  options: '/options',
  markets: '/markets',
  'markets-forex': '/markets/forex',
  'markets-metals-energies': '/markets/metals-energies',
  'markets-indices': '/markets/indices',
  'markets-crypto': '/markets/crypto',
  accounts: '/accounts',
  'accounts-demo': '/accounts/demo',
  'accounts-funding': '/accounts/funding',
  platforms: '/platforms',
  'platforms-trader': '/platforms/trader',
  'platforms-client-area': '/platforms/client-area',
  'platforms-android': '/platforms/android',
  'platforms-api': '/platforms/api',
  'copy-trading': '/copy-trading',
  prop: '/prop',
  partners: '/partners',
  'white-label': '/white-label',
  about: '/about',
  academy: '/academy',
  contact: '/contact',
  faq: '/faq',
} as const;

export type PageKey = keyof typeof PAGE_PATHS;

/** page key → the name the Back Office shows */
export const PAGE_LABELS: Record<PageKey, string> = {
  global: 'Navigation, footer and screenshots',
  home: 'Home',
  options: 'Kalks FX Options',
  markets: 'Markets',
  'markets-forex': 'Markets: Forex',
  'markets-metals-energies': 'Markets: Metals & energies',
  'markets-indices': 'Markets: Indices',
  'markets-crypto': 'Markets: Crypto',
  accounts: 'Accounts',
  'accounts-demo': 'Accounts: Demo',
  'accounts-funding': 'Accounts: Funding',
  platforms: 'Platforms',
  'platforms-trader': 'Platforms: Kalks Trader',
  'platforms-client-area': 'Platforms: Client Area',
  'platforms-android': 'Platforms: Android app',
  'platforms-api': 'Platforms: API & algo',
  'copy-trading': 'Copy trading & PAMM',
  prop: 'Prop challenges',
  partners: 'Partners',
  'white-label': 'White-label',
  about: 'About',
  academy: 'Academy',
  contact: 'Help & contact',
  faq: 'FAQ',
};
export type HeroPage = Exclude<PageKey, 'global'>;

/** a bundled hero photo as an image value (decorative: the hero's own text says it all) */
export const heroImage = (k: HeroKey): HeroImage => ({ src: HEROES[k].src, w: HEROES[k].w, h: HEROES[k].h, alt: '', bg: HEROES[k].bg });

const open = { label: 'Open an account', href: REGISTER_HREF };
const [OPT_FEE, OPT_FEE_CAP] = OPTIONS.commission.split(', ');
const PROP_SIZES = [...new Set(PROP.flatMap((p) => p.sizes.map(([s]) => s)))];
const PROP_TOP_SPLIT = PROP[0].split.match(/(\d+%)$/)?.[1] ?? '';

/** Hero copy per page. Home: title = the line top-left, subtitle = the small facts under it, cta = the round button. */
export const HERO_COPY: Record<HeroPage, HeroCopy> = {
  home: {
    title: 'Options, CFDs and copy trading, funded from one USDT wallet.',
    subtitle: `${LANGUAGES.length} languages · Android app · USDT on TRON and BNB Chain`,
    cta: { label: 'Open account', href: REGISTER_HREF },
    image: heroImage('home'),
  },
  options: {
    eyebrow: 'Kalks FX Options',
    title: 'Options on forex,',
    accent: 'with the risk printed first.',
    subtitle: `Calls and puts on forex, gold, silver and oil, with daily and weekly expiries. Buy one and the premium is the most you can lose. ${OPT_FEE.replace('per contract', 'a contract')}, ${OPT_FEE_CAP}, in an Options account of its own.`,
    cta: { label: 'Open account', href: REGISTER_HREF },
    cta2: { label: 'How it works', href: '#how' },
    image: heroImage('options'),
  },
  markets: {
    eyebrow: 'Markets',
    title: `${INSTRUMENTS.liveMarkets} markets,`,
    accent: 'live on real money.',
    subtitle: `Forex, metals, energies, indices and crypto, long or short, from ${ACCOUNTS[0].minDeposit}. The full catalogue of ${INSTRUMENTS.total.toLocaleString('en-US')} markets, stocks included, is open on a free demo.`,
    cta: open,
    cta2: { label: 'Search the markets', href: '#list' },
    image: heroImage('markets'),
  },
  'markets-forex': {
    eyebrow: 'Forex',
    title: `${INSTRUMENTS.byClass.forex.live} currency pairs,`,
    accent: 'priced to the pip.',
    subtitle: `Majors, minors and exotics on real money, long or short, with leverage up to 1:${LEVERAGE.coreCaps.forex} on Standard and Cent. Calls and puts on ${OPTIONS.fxPairsLive} of the majors as well.`,
    cta: open,
    cta2: { label: 'Live prices', href: '#prices' },
    image: heroImage('markets'),
  },
  'markets-metals-energies': {
    eyebrow: 'Metals & energies',
    title: 'Gold, silver, oil.',
    accent: 'Long or short.',
    subtitle: `${INSTRUMENTS.byClass.metals.live} metals and ${INSTRUMENTS.byClass.energies.live} energies on real money, from gold and silver to copper, crude and natural gas. Options on gold, silver and both oils.`,
    cta: open,
    cta2: { label: 'Live prices', href: '#prices' },
    image: heroImage('markets'),
  },
  'markets-indices': {
    eyebrow: 'Indices',
    title: 'Whole markets,',
    accent: 'in one trade.',
    subtitle: `${INSTRUMENTS.byClass.indices.live} stock indices from the US, Europe and Asia on real money, with leverage up to 1:${LEVERAGE.coreCaps.indices}. Take a view on an economy rather than a single company.`,
    cta: open,
    cta2: { label: 'Live prices', href: '#prices' },
    image: heroImage('markets'),
  },
  'markets-crypto': {
    eyebrow: 'Crypto',
    title: 'Crypto that',
    accent: 'never closes.',
    subtitle: `${INSTRUMENTS.byClass.crypto.live} coins as CFDs on real money, from Bitcoin and Ether to newer names, long or short, every hour of every day. No wallet or exchange account needed.`,
    cta: open,
    cta2: { label: 'Live prices', href: '#prices' },
    image: heroImage('markets'),
  },
  accounts: {
    eyebrow: 'Accounts',
    title: 'Two kinds of account.',
    accent: 'One wallet.',
    subtitle: `Five CFD accounts, priced all-in or raw plus commission, and an Options account of its own. Fund every one of them from the same USDT wallet, from ${ACCOUNTS[0].minDeposit}.`,
    cta: open,
    cta2: { label: 'Compare accounts', href: '#compare' },
    image: heroImage('accounts'),
  },
  'accounts-demo': {
    eyebrow: 'Demo account',
    title: 'Rehearse on live prices.',
    accent: 'Risk nothing.',
    subtitle: `A free demo account with ${DEMO.defaultBalance} of virtual money, every market on real-time prices, and the same Kalks Trader you will use live.`,
    cta: { label: 'Start a free demo', href: DEMO_HREF },
    cta2: { label: 'Open a live account', href: REGISTER_HREF },
    image: heroImage('accounts'),
  },
  'accounts-funding': {
    eyebrow: 'Funding',
    title: 'USDT in.',
    accent: 'Trading in a minute.',
    subtitle: `One wallet funds every account. Deposit ${FUNDING.methods}, ${FUNDING.creditTime}, and move money between accounts for free.`,
    cta: open,
    cta2: { label: 'How to deposit', href: '#deposit' },
    image: heroImage('accounts'),
  },
  platforms: {
    eyebrow: 'Platforms',
    title: 'Your screen',
    accent: 'for every market.',
    subtitle: 'Kalks Trader in your browser and on Android, with the Client Area around it for accounts, money, copy trading, prop and learning.',
    cta: { label: 'Open Kalks Trader', href: TRADER_URL },
    cta2: { label: 'Get the app', href: '#mobile' },
    image: heroImage('platforms'),
  },
  'platforms-trader': {
    eyebrow: 'Kalks Trader',
    title: 'Every instrument',
    accent: 'on one screen.',
    subtitle: 'A big, quiet chart with the market list beside it and your positions below, for CFDs and options alike. In your browser and on Android, with nothing to install on a computer.',
    cta: { label: 'Open Kalks Trader', href: TRADER_URL },
    cta2: { label: 'Try the demo', href: DEMO_HREF },
    image: heroImage('platforms'),
  },
  'platforms-client-area': {
    eyebrow: 'Client Area',
    title: 'Everything',
    accent: 'around the trade.',
    subtitle: `Accounts, money, copy trading, prop challenges, partner earnings and learning, side by side, in ${LANGUAGES.length} languages.`,
    cta: open,
    cta2: { label: 'Log in', href: LOGIN_HREF },
    image: heroImage('platforms'),
  },
  'platforms-android': {
    eyebrow: 'Android app',
    title: 'The whole platform,',
    accent: 'in your pocket.',
    subtitle: `Kalks Trader, the Client Area and Kalks FX Options in one app, in all ${LANGUAGES.length} languages, with biometric sign-in. Download the APK here; the Play Store listing follows.`,
    cta: { label: 'Download for Android', href: ANDROID_APP.href },
    cta2: { label: 'Open in the browser', href: TRADER_URL },
    image: heroImage('platforms'),
  },
  'platforms-api': {
    eyebrow: 'API & algo',
    title: 'Write the rules once.',
    accent: 'Let them run.',
    subtitle: 'Webhook alerts, a REST API with scoped keys, a visual strategy builder and backtests, all running on Kalks servers around the clock, on demo or live accounts. Algo trading covers CFDs; options stay manual for now.',
    cta: { label: 'Create an account', href: REGISTER_HREF },
    cta2: { label: 'Ask a question', href: `mailto:${BRAND_SUPPORT_EMAIL}?subject=${encodeURIComponent('API question')}` },
    image: heroImage('platforms'),
  },
  'copy-trading': {
    eyebrow: 'Copy trading · PAMM · MAM',
    title: 'Trade alongside',
    accent: 'someone who has done it.',
    subtitle: 'Mirror approved traders with limits you set, invest in a managed fund, or let a manager trade your account. Fees only on new highs.',
    cta: { label: 'Start copying', href: REGISTER_HREF },
    cta2: { label: 'Become a master', href: '#master' },
    image: heroImage('copy'),
  },
  prop: {
    eyebrow: 'Prop challenges',
    title: 'Earn your wings.',
    accent: `Keep up to ${PROP_TOP_SPLIT}.`,
    subtitle: `Pass a one-step or two-step evaluation, or start funded today. Simulated accounts from ${PROP_SIZES[0]} to ${PROP_SIZES[PROP_SIZES.length - 1]}, every rule checked live on the server, payouts in USDT.`,
    cta: { label: 'Start a challenge', href: REGISTER_HREF },
    cta2: { label: 'Compare the plans', href: '#plans' },
    image: heroImage('prop'),
  },
  partners: {
    eyebrow: 'Partners',
    title: 'Get paid for the lots',
    accent: 'your clients trade.',
    subtitle: `Every Kalks client is a partner from day one. Share your link, earn per lot on ${IB.tiers} tiers of referrals, and get paid every Monday in USDT.`,
    cta: { label: 'Become a partner', href: REGISTER_HREF },
    cta2: { label: 'See the rates', href: '#levels' },
    image: heroImage('partners'),
  },
  'white-label': {
    eyebrow: 'For business',
    title: 'Your brokerage.',
    accent: 'Our platform.',
    subtitle: 'Launch a broker under your own brand and domains, with forex options, CFDs, prop, copy trading and partners built in. Or connect your systems through the API.',
    cta: { label: 'Talk to us', href: `mailto:${BRAND_SUPPORT_EMAIL}?subject=${encodeURIComponent('White-label enquiry')}` },
    cta2: { label: 'API & algo', href: '#api' },
    image: heroImage('whitelabel'),
  },
  about: {
    eyebrow: 'About Kalks',
    title: 'Built in-house,',
    accent: 'for traders everywhere.',
    accentClass: 'text-white/60',
    subtitle: 'Forex options, CFDs, prop challenges, copy trading and a partner programme in one place, on technology we write ourselves, in 22 languages.',
    cta: open,
    cta2: { label: 'Talk to us', href: '/contact' },
    image: heroImage('about'),
  },
  academy: {
    eyebrow: 'Kalks Academy',
    title: 'Learn it properly.',
    accent: 'Then trade it.',
    accentClass: 'text-white/60',
    subtitle: `${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases, from how markets work to macro regimes and FX options. A quiz after every lesson and certificates anyone can verify.`,
    cta: { label: 'Start learning', href: REGISTER_HREF },
    cta2: { label: 'See the phases', href: '#phases' },
    image: heroImage('academy'),
  },
  contact: {
    eyebrow: 'Help & contact',
    title: 'We are here',
    accent: 'to help.',
    accentClass: 'text-white/60',
    subtitle: 'Clients get the fastest answers in the support chat inside the Client Area. Anyone can write to us by email.',
    image: heroImage('contact'),
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions,',
    accent: 'answered.',
    accentClass: 'text-white/55',
    subtitle: 'Accounts, funding, trading conditions, options, prop, copy trading, partners and the platform.',
    image: null,
  },
};

/** The figure in each page's closing call-to-action band (slot cta.image). */
export const CTA_IMAGE: Partial<Record<HeroPage, HeroKey>> = {
  home: 'options',
  options: 'options',
  markets: 'markets',
  'markets-forex': 'markets',
  'markets-metals-energies': 'markets',
  'markets-indices': 'markets',
  'markets-crypto': 'markets',
  accounts: 'accounts',
  'accounts-demo': 'accounts',
  'accounts-funding': 'accounts',
  platforms: 'platforms',
  'platforms-trader': 'platforms',
  'platforms-client-area': 'platforms',
  'platforms-android': 'platforms',
  'platforms-api': 'platforms',
  'copy-trading': 'copy',
  prop: 'prop',
  partners: 'partners',
  'white-label': 'whitelabel',
  about: 'markets',
  academy: 'academy',
};

export const ctaImage = (p: HeroPage): HeroImage | undefined => (CTA_IMAGE[p] ? heroImage(CTA_IMAGE[p]!) : undefined);

/**
 * Server only: a page's content in one request (the page and the FAQ), merged over the defaults above. Never
 * throws; without the content service everything is exactly as bundled.
 */
export async function getPage(page: HeroPage) {
  const c = await getContent([page, 'faq']);
  const p = c.pages[page];
  const cta = ctaImage(page);
  return {
    hero: mergeHero(p, HERO_COPY[page]),
    /** the closing band's figure */
    ctaImage: cta && getImage(p, HERO_SLOTS.ctaImage, cta),
    /** questions picked from FAQ_GROUPS, with their edited wording */
    faq: <T extends { id?: string; q: string; a: string }>(items: T[]) => mergeFaqItems(c.pages.faq, items),
    faqGroups: mergeFaqGroups(c.pages.faq, FAQ_GROUPS),
  };
}

/** questions by id, in the order given (for pages that pick a few) */
export const faqById = (ids: string[]) => ids.map((id) => FAQ_GROUPS.flatMap((g) => g.items).find((i) => i.id === id)).filter((i): i is FaqItem => Boolean(i));
/** a whole FAQ group's questions */
export const faqGroup = (id: string) => FAQ_GROUPS.find((g) => g.id === id)?.items ?? [];

