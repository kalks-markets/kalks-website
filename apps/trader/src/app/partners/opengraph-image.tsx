import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks partners: get paid for the lots your clients trade';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'red', kicker: 'PARTNERS', title: 'Get paid for the lots your clients trade.', sub: 'Three tiers. Paid every Monday in USDT.' });
}
