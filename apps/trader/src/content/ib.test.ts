import { describe, expect, it } from 'vitest';
import { IB, IB_GROUPS, IB_LEVELS, ibNeeds, usd, usd2 } from './facts';

describe('partner plan snapshot', () => {
  it('has a rate for every symbol group at every level, rising with the level', () => {
    expect(IB_LEVELS.map((l) => l.name)).toEqual(['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']);
    for (const g of IB_GROUPS) {
      const r = IB_LEVELS.map((l) => l.rates[g.key]);
      expect(r.every((x) => typeof x === 'number' && x > 0), g.key).toBe(true);
      expect([...r].sort((a, b) => a - b), g.key).toEqual(r);
    }
    expect(IB_LEVELS.map((l) => l.optionsUsd)).toEqual([0.1, 0.15, 0.2, 0.25, 0.3]);
  });

  it('formats the targets and the money the way the pages print them', () => {
    expect(ibNeeds(IB_LEVELS[0])).toBe('From sign-up');
    expect(ibNeeds(IB_LEVELS[3])).toBe('2,250 lots · 8 active clients in 3 months');
    expect([usd(8), usd(12.5), usd(0.1), usd2(2)]).toEqual(['$8', '$12.50', '$0.10', '$2.00']);
  });

  it('keeps the worked examples right', () => {
    const gold = IB_LEVELS.find((l) => l.key === 'gold')!;
    expect(usd2(10 * gold.optionsUsd)).toBe('$2.00');
    const tier1 = 10 * gold.rates['fx-major'];
    expect([tier1, (tier1 * IB.tierPcts[1]) / 100, (tier1 * IB.tierPcts[2]) / 100]).toEqual([170, 17, 8.5]);
    expect(usd2(300 * IB.centLotFactor * IB_LEVELS[0].rates['fx-minor'])).toBe('$24.00');
  });
});
