import { OPTIONS_RISK, RISK_WARNING } from '@/content/facts';
import type { FooterCopy, NavCopy } from '@/lib/content';
import { DEMO_HREF, LOGIN_HREF, REGISTER_HREF } from '@/lib/crm';

export type NavLink = { label: string; href: string; note?: string; tag?: string };

/** Primary navigation (desktop bar). */
export const NAV_PRIMARY: NavLink[] = [
  { label: 'Options', href: '/options', tag: 'New' },
  { label: 'Markets', href: '/markets' },
  { label: 'Accounts', href: '/accounts' },
  { label: 'Platforms', href: '/platforms' },
  { label: 'Prop', href: '/prop' },
];

/** The "More" mega menu; listed in full in the mobile menu. `icon` keys map to lucide icons in Nav.tsx. */
export const NAV_MORE: (NavLink & { icon: string })[] = [
  { label: 'Copy trading & PAMM', href: '/copy-trading', note: 'Follow a master, or become one', icon: 'copy' },
  { label: 'Partners', href: '/partners', note: 'Get paid for the lots your clients trade', icon: 'partners' },
  { label: 'Academy', href: '/academy', note: '118 lessons in 9 phases', icon: 'academy' },
  { label: 'White-label & API', href: '/white-label', note: 'Your brokerage on our platform', icon: 'whitelabel' },
  { label: 'About Kalks', href: '/about', note: 'What we build and why', icon: 'about' },
  { label: 'Help & contact', href: '/contact', note: 'Support chat and email', icon: 'help' },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: 'Trade',
    links: [
      { label: 'Kalks FX Options', href: '/options' },
      { label: 'Markets', href: '/markets' },
      { label: 'Forex', href: '/markets/forex' },
      { label: 'Metals & energies', href: '/markets/metals-energies' },
      { label: 'Indices', href: '/markets/indices' },
      { label: 'Crypto', href: '/markets/crypto' },
    ],
  },
  {
    title: 'Accounts',
    links: [
      { label: 'CFD accounts', href: '/accounts#cfd' },
      { label: 'Options account', href: '/accounts#options' },
      { label: 'Demo account', href: '/accounts/demo' },
      { label: 'Funding', href: '/accounts/funding' },
      { label: 'Prop challenges', href: '/prop' },
      { label: 'Copy trading & PAMM', href: '/copy-trading' },
    ],
  },
  {
    title: 'Platforms',
    links: [
      { label: 'Kalks Trader', href: '/platforms/trader' },
      { label: 'Client Area', href: '/platforms/client-area' },
      { label: 'Android app', href: '/platforms/android' },
      { label: 'API & algo trading', href: '/platforms/api' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Partners', href: '/partners' },
      { label: 'White-label', href: '/white-label' },
      { label: 'Academy', href: '/academy' },
      { label: 'Help & contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: 'Risk warning', href: '/risk-warning' },
  { label: 'Risk disclosure', href: '/risk' },
  { label: 'Terms & conditions', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Deposit & withdrawal policy', href: '/deposit-withdrawal' },
  { label: 'Restricted countries', href: '/restricted-countries' },
  { label: 'Delete your account', href: '/delete-account' },
];

/** Homepage hero (KALKS2 §10 "after", approved 2026-10-09). */
export const HERO = {
  eyebrow: 'Kalks FX Options',
  headline: ['Options on forex,', 'made simple.'] as const,
  subline: 'Calls and puts on forex, gold, silver and oil. Buy an option and the premium is the most you can lose.',
  facts: '$10 to start · Fund with USDT · 22 languages',
};

/**
 * Navigation and footer copy as the content service sees it (page "global"; mergeNav / mergeFooter in
 * lib/content.ts lay published slots over these defaults).
 */
export const NAV_COPY: NavCopy = {
  home: 'Home',
  more: 'More',
  primary: NAV_PRIMARY,
  moreItems: NAV_MORE,
  login: { label: 'Log in', href: LOGIN_HREF },
  register: { label: 'Open account', href: REGISTER_HREF },
  demo: { label: 'Try the demo', href: DEMO_HREF },
  android: 'Kalks for Android',
};

export const FOOTER_COPY: FooterCopy = {
  tagline: 'Forex options, CFDs, copy trading and prop challenges, on technology we build ourselves. One USDT wallet funds every account.',
  cta: { label: 'Open account', href: REGISTER_HREF },
  columns: FOOTER_COLUMNS,
  legal: LEGAL_LINKS,
  riskTitle: 'Risk warning',
  risk: `${RISK_WARNING} ${OPTIONS_RISK} Past performance is not a reliable indicator of future results. Nothing on this website is investment advice.`,
  restrictedTitle: 'Restricted regions',
  restricted:
    'Kalks does not provide services to citizens or residents of the USA, Cuba, Iraq, Myanmar, North Korea and Sudan. Our services are not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.',
  restrictedLink: { label: 'Full list', href: '/restricted-countries' },
};
