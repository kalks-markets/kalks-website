import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks partners: earn on every lot your network trades';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'red', kicker: 'PARTNERS', title: 'Earn on every lot your network trades.', sub: 'Three tiers. Paid every Monday in USDT.' });
}
