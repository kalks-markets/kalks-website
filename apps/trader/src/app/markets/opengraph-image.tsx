import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks markets: 261 live markets in six asset classes';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'yellow', kicker: 'MARKETS', title: '261 markets live. Six asset classes.', sub: 'Forex, metals, energies, indices, crypto and stocks.' });
}
