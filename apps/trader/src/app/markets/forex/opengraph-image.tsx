import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks forex: 44 currency pairs';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'FOREX', title: '44 currency pairs, priced to the pip.', sub: 'Majors, minors and exotics, with leverage up to 1:1000.' });
}
