import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks accounts: five CFD accounts and an Options account';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'ink', kicker: 'ACCOUNTS', title: 'Five ways to trade CFDs. One for options.', sub: 'From $10. Free demo with $10,000.' });
}
