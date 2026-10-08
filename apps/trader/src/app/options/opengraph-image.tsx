import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks FX Options: calls and puts on forex, settled in dollars';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'red', kicker: 'KALKS FX OPTIONS', title: 'Calls and puts on forex. Settled in dollars.', sub: 'Daily, weekly and monthly expiries. $0.25 a contract.' });
}
