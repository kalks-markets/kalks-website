import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks FAQ';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'plain', kicker: 'FAQ', title: 'Questions, answered.', sub: 'Accounts, funding, options, prop and more.' });
}
