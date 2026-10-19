import { existsSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { buildManifest, PAGE_PATHS } from './manifest';
import { isPageKey, isSlotKey, safeHref } from '@/lib/content';

describe('slot catalogue', () => {
  const m = buildManifest();

  it('has valid, unique keys on known pages', () => {
    const seen = new Set<string>();
    for (const e of m) {
      expect(isPageKey(e.page), e.page).toBe(true);
      expect(isSlotKey(e.slot), `${e.page} ${e.slot}`).toBe(true);
      expect(e.page in PAGE_PATHS, e.page).toBe(true);
      const k = `${e.page}/${e.slot}`;
      expect(seen.has(k), k).toBe(false);
      seen.add(k);
    }
    expect(m.length).toBeGreaterThan(150);
  });

  it('has values the content service accepts', () => {
    for (const e of m) {
      const v = e.value as Record<string, string>;
      if (e.kind === 'text') expect(v.text.length, e.slot).toBeGreaterThan(0);
      if (e.kind === 'text') expect(v.text.length, e.slot).toBeLessThanOrEqual(2000);
      if (e.kind === 'link') expect(safeHref(v.href), `${e.slot} ${v.href}`).not.toBeNull();
      if (e.kind === 'image') expect(existsSync(path.join(__dirname, '../../public', v.src)), v.src).toBe(true);
    }
  });

  it('covers the hero, nav, footer, screenshots and FAQ', () => {
    const keys = new Set(m.map((e) => `${e.page}/${e.slot}`));
    for (const k of ['home/hero.title', 'about/hero.image', 'markets-forex/hero.subtitle', 'global/nav.options', 'global/footer.tagline', 'global/shots.trader-workspace', 'global/shots.copy-leaderboard', 'faq/faq.deposit.answer', 'faq/group.funding.title'])
      expect(keys.has(k), k).toBe(true);
  });
});
