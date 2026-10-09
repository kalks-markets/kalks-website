import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks Trader';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'KALKS TRADER', title: 'Every instrument on one screen.', sub: 'In your browser and on Android.' });
}
