import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks API and algo trading';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'API & ALGO', title: 'Write the rules once. Let them run.', sub: 'Webhooks, a REST API, backtests and 24/7 deployments.' });
}
