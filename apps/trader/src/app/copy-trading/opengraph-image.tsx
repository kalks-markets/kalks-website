import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks copy trading: follow a master, or become one';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'yellow', kicker: 'COPY TRADING · PAMM · MAM', title: 'Follow a master. Or become one.', sub: 'Fees only on new highs.' });
}
