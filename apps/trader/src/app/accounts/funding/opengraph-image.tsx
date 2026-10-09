import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks funding: USDT in, usually within a minute';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'FUNDING', title: 'USDT in. Trading in a minute.', sub: 'TRON and BNB Chain, from 10 USDT.' });
}
