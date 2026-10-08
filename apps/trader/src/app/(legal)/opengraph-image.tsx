import { og, OG_SIZE, OG_TYPE } from '../_og/og';

export const alt = 'Kalks legal documents';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'plain', kicker: 'LEGAL', title: 'Terms, policies and risk disclosures.' });
}
