import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'The Kalks Client Area';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'CLIENT AREA', title: 'One place for everything around the trade.', sub: 'Accounts, wallet, copy trading, prop and more.' });
}
