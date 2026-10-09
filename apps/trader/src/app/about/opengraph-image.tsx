import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'About Kalks';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'ink', kicker: 'ABOUT KALKS', title: 'Built for traders everywhere.' });
}
