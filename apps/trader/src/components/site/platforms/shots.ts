import type { ShotDef } from '@/components/site/Shot';

/**
 * Extra read-only screenshots for the platforms, copy trading, prop, partners and white-label pages (local demo
 * session, 2× retina, captured 2026-10-10; Client Area crops leave out its top bar). Files in public/site/shots.
 */
export const PSHOTS = {
  indicators: { src: '/site/shots/platforms-indicators.webp', w: 1530, h: 1258, alt: 'The indicators list in Kalks Trader: groups on the left, search, favourites and the indicators already on the chart' },
  layout: { src: '/site/shots/platforms-layout.webp', w: 580, h: 1210, alt: 'The layout menu in Kalks Trader: charts on screen, saved layouts, panels and where positions show' },
  closeMenu: { src: '/site/shots/platforms-close-menu.webp', w: 2840, h: 578, alt: 'Open positions in Kalks Trader with the Close positions menu: close all, profitable, losing, buys, sells or by symbol' },
  apiBuilder: { src: '/site/shots/platforms-api-builder.webp', w: 2648, h: 2620, alt: 'The strategy builder in the Client Area: templates, buy and sell rules, risk settings, the AI assistant and 24/7 deployment' },
  apiSafety: { src: '/site/shots/platforms-api-safety.webp', w: 1324, h: 642, alt: 'The safety rules applied to every API request: scopes, IP whitelist, rate limit, HMAC signing and order source' },
  copyLeaderboard: { src: '/site/shots/copy-leaderboard.webp', w: 2632, h: 1436, alt: 'The copy trading leaderboard in the Client Area: filters and master cards with return, drawdown, followers and risk' },
  copyRules: { src: '/site/shots/copy-rules.webp', w: 888, h: 922, alt: 'How copying works: everything is mirrored, no single-trade closing, your limits win, fees above the high-water mark' },
  copyMaster: { src: '/site/shots/copy-master.webp', w: 1760, h: 1194, alt: 'Becoming a master: choose copy trading, a PAMM fund or both, set the performance fee, settlement and minimum allocation' },
  propChallenge: { src: '/site/shots/prop-challenge.webp', w: 2632, h: 1154, alt: 'Choosing a prop challenge in the Client Area: model, account size, the path to funded, the limits and the summary before you buy' },
  propRules: { src: '/site/shots/prop-rules.webp', w: 2632, h: 464, alt: 'How prop rules are enforced: live monitoring, early warnings, breach and pass' },
  partnerTiers: { src: '/site/shots/partners-tiers.webp', w: 2632, h: 424, alt: 'The partner network in three tiers: direct clients at 100% of the rate, sub-IB clients at 20%, second level at 10%' },
} satisfies Record<string, ShotDef>;
