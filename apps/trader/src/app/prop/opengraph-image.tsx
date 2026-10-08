import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks prop challenges: get funded, keep up to 90%';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'red', kicker: 'PROP CHALLENGES', title: 'Get funded. Keep up to 90%.', sub: 'Simulated accounts from $5k to $200k.' });
}
