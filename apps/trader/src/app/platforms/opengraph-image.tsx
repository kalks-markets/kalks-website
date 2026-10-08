import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks Trader: nothing to install';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'ink', kicker: 'PLATFORMS', title: 'Kalks Trader. Nothing to install.', sub: 'In your browser and on Android.', img: 'robot-og.jpg', imgFit: 'cover' });
}
