import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks Academy: 118 lessons in 9 phases';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'ink', kicker: 'KALKS ACADEMY', title: 'Learn it properly. Then trade it.', sub: '118 lessons in 9 phases.', img: 'glyph-og.jpg' });
}
