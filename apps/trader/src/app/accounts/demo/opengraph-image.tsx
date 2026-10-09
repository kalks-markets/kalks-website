import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks demo account';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'DEMO ACCOUNT', title: 'Rehearse on live prices. Risk nothing.', sub: '$10,000 of virtual money, every market, free.' });
}
