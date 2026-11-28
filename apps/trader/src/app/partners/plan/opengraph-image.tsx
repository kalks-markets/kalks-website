import { og, OG_SIZE, OG_TYPE } from '../../_og/og';

export const alt = 'Kalks partner plan: every rate, level and rule';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return og({ tone: 'red', kicker: 'PARTNER PLAN', title: 'Every rate, every level.', sub: 'Per lot on CFDs, per contract on options. Three tiers, paid daily.' });
}
