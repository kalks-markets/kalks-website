import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks indices: 32 stock indices';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ kicker: 'INDICES', title: 'Whole markets, in one trade.', sub: '32 stock indices from the US, Europe and Asia.' });
}
