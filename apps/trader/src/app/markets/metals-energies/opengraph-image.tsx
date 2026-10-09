import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks metals and energies';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'METALS & ENERGIES', title: 'Gold, silver, oil. Long or short.', sub: '16 metals and 4 energies, with options on gold, silver and oil.' });
}
