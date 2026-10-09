/** Feature lists shared by /platforms, its sub-pages and /white-label. */
import { ACADEMY, ALGO, TRADER } from '@/content/facts';

export const TRADER_FEATURES: [string, string][] = [
  ['Charts', `${TRADER.chartTypes} chart types, ${TRADER.timeframes.length} timeframes from M1 to MN, ${TRADER.indicators} indicators and ${TRADER.drawingTools} drawing tools.`],
  ['Orders', 'Market, limit, stop and stop-limit. Stop loss, take profit, a server-side trailing stop, OCO and expiry by date.'],
  ['One-click trading', 'Sell and buy straight from the chart, or switch it off and confirm every trade.'],
  ['Trade on the chart', 'Drag stop loss, take profit, pending orders and alerts along the price axis.'],
  ['Depth ladder', 'The order book beside the chart, with limit orders in one click.'],
  ['Position tools', 'Partial close, close by, and bulk close: all, winners, losers, buys or sells.'],
  ['Full chart mode', 'Hide everything but the chart when you want to focus.'],
  ['Options', 'Option chains, quick trade and the strategy builder for your Options account.'],
];

export const CLIENT_FEATURES: [string, string][] = [
  ['Accounts', 'Open CFD and Options accounts, live and demo; change leverage; set read-only investor passwords.'],
  ['Wallet', 'Deposit and withdraw USDT; move money between wallet and accounts, instantly and free.'],
  ['Copy trading, PAMM, MAM', 'Follow masters, invest in funds, or apply to become a master.'],
  ['Prop challenges', 'Buy a challenge, track every rule live, request payouts, download certificates.'],
  ['Partner dashboard', 'Referral links, clients, your network, commission and weekly payouts.'],
  ['Academy', `${ACADEMY.lessons} lessons in ${ACADEMY.phases} phases, quizzes, exams and certificates.`],
  ['Developer', 'API keys, webhooks, a visual strategy builder, backtests and 24/7 deployments.'],
  ['Support', 'Chat from any page: an instant help assistant, with our team behind it.'],
];


export const API_FEATURES: [string, string][] = [
  ['Webhook alerts', `Send alerts from your charting tool to a Kalks webhook URL. Each webhook can route to up to ${ALGO.webhookRoutes} accounts, each with its own size.`],
  ['REST API', 'API keys with read and trade scopes, never withdrawals. Bearer or HMAC signing, and an IP allow-list for live trading keys.'],
  ['Visual strategy builder', 'Build rules with blocks, switch to code, or describe a strategy in plain words and let the assistant draft it.'],
  ['Backtests', `Test a strategy on history on our servers, with ${ALGO.indicatorSeries} indicator series that match Kalks Trader.`],
  ['24/7 deployments', 'Run strategies on our servers on demo or live accounts, with kill switches when you need to stop at once.'],
  ['Marketplace', 'Publish a strategy for others to run, or start from one someone else built.'],
];
