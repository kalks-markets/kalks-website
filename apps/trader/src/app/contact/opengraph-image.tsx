import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks help and contact';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'plain', kicker: 'HELP & CONTACT', title: 'We are here to help.', sub: 'Support chat in the Client Area, or email.' });
}
