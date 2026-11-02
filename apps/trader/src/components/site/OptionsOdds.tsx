import { OPTIONS } from '@/content/facts';

// Kalks FX Options, both sides (founder 2026-10-28: "tell the risk and opportunity"): what a buyer can gain, what a
// buyer and a seller can lose. Never a promise of profit. Shown as cards with the worked example's photo band
// (options-bento/OptionsBento.tsx) on the home and options pages.

export const OPPORTUNITY = [
  { t: 'A fixed, known cost', d: 'Buy a call or a put and the premium you pay is the most you can lose. You see it before you confirm.' },
  { t: 'Bigger moves than the market', d: 'A small move in your direction can change an option’s value by a much larger percentage than the market itself moved.' },
  { t: 'Up or down, short or longer', d: `A call if you think the price rises, a put if it falls. Daily and weekly expiries on ${OPTIONS.fxPairsLive} FX pairs, gold, silver and oil.` },
];

export const RISK = [
  { t: 'You can lose the whole premium', d: 'If the market does not move your way by expiry, a bought option can expire worth nothing.' },
  { t: 'Time works against buyers', d: 'An option loses value every day, even when the market does not move. Short expiries lose it fastest.' },
  { t: 'Prices swing fast near expiry', d: 'In the last hours an option’s price can rise or fall sharply within minutes.' },
  { t: 'Selling carries more risk', d: 'Writing an option pays you the premium, but your loss is not limited to it and margin is held.' },
];
