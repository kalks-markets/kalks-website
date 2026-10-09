import { og, OG_SIZE, OG_TYPE } from './_og/og';

export const alt = 'Kalks: trade the world, not the noise';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'KALKS', title: 'Trade the world. Not the noise.', sub: 'Forex options, CFDs on 261 live markets, copy trading and prop. One USDT wallet.' });
}
