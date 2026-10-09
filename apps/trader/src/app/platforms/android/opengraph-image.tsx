import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks for Android';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'ANDROID APP', title: 'The whole platform, in your pocket.', sub: 'Kalks Trader, the Client Area and FX Options in one app.' });
}
