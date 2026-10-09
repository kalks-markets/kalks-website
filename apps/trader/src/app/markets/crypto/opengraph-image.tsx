import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks crypto: 160 coins, 24/7';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'CRYPTO', title: 'Crypto that never closes.', sub: '160 coins as CFDs, every hour of every day.' });
}
