import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks white-label: your brokerage, our platform';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'yellow', kicker: 'FOR BUSINESS', title: 'Your brokerage. Our platform.', sub: 'White-label, API and algo trading.' });
}
