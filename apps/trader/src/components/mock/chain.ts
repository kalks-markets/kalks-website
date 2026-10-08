/**
 * Illustrative EURUSD option chain used by the website mocks (not live prices). Premiums in USD per contract
 * (10,000 EUR). Breakevens are consistent: call = strike + premium / 10,000, put = strike − premium / 10,000.
 */
export const SPOT = 1.1214;
export const CHAIN = [
  { k: '1.1150', c: 71.4, cp: 88, cb: '1.12214', p: 6.1, pp: 12, pb: '1.11439' },
  { k: '1.1175', c: 51.2, cp: 79, cb: '1.12262', p: 10.9, pp: 21, pb: '1.11641' },
  { k: '1.1200', c: 33.8, cp: 64, cb: '1.12338', p: 18.6, pp: 36, pb: '1.11814' },
  { k: '1.1225', c: 20.4, cp: 45, cb: '1.12454', p: 30.2, pp: 55, pb: '1.11948' },
  { k: '1.1250', c: 11.3, cp: 28, cb: '1.12613', p: 46.1, pp: 72, pb: '1.12039' },
  { k: '1.1275', c: 5.6, cp: 15, cb: '1.12806', p: 65.4, pp: 85, pb: '1.12096' },
  { k: '1.1300', c: 2.5, cp: 7, cb: '1.13025', p: 87.3, pp: 93, pb: '1.12127' },
] as const;
/** index of the first strike above spot (the live price line sits before it) */
export const ATM_AFTER = 3;
export const usd = (v: number) => `$${v.toFixed(2)}`;
