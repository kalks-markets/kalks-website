import { describe, expect, it } from 'vitest';
import {
  getImage,
  getLink,
  getText,
  isPreviewToken,
  keyOf,
  mergeFaqGroups,
  mergeFooter,
  mergeHero,
  mergeNav,
  mergeShot,
  pageList,
  previewPath,
  safeHref,
  sanitiseContent,
  shotOverrides,
  type HeroCopy,
} from './content';
import { FOOTER_COPY, NAV_COPY } from '@/content/site';

const img = (over: Record<string, unknown> = {}) => ({
  media: 'm0123456789abcdef01',
  alt: 'A chart',
  url: 'https://api.kalkstrade.com/v1/public/media/abc/orig',
  srcset: 'https://api.kalkstrade.com/v1/public/media/abc/sm 480w, https://api.kalkstrade.com/v1/public/media/abc/orig 1200w',
  width: 1200,
  height: 800,
  mime: 'image/webp',
  variants: {},
  dark: null,
  ...over,
});

const body = (pages: Record<string, Record<string, unknown>>) => ({ tenant: 'kalks', surface: 'website', locale: 'en', preview: false, pages });

describe('sanitiseContent', () => {
  it('maps every kind', () => {
    const out = sanitiseContent(
      body({
        home: {
          'hero.title': { kind: 'text', locale: 'en', value: { text: '  Trade\u0007 options‮  ' } },
          'hero.cta': { kind: 'link', locale: 'en', value: { label: 'Open', href: '/auth/register' } },
          'hero.image': { kind: 'image', locale: 'en', value: img({ dark: { url: 'https://cdn.example/d.webp', width: 1200, height: 800, srcset: '' } }) },
          'faq.x.answer': { kind: 'rich_text', locale: 'en', value: { markdown: '# Hi\n\nthere' } },
          'form.hint': { kind: 'placeholder', locale: 'en', value: { text: 'you@example.com' } },
        },
      }),
    );
    expect(out.home['hero.title']).toEqual({ kind: 'text', text: 'Trade options' });
    expect(out.home['hero.cta']).toEqual({ kind: 'link', label: 'Open', href: '/auth/register' });
    const i = out.home['hero.image'];
    expect(i.kind === 'image' && i.image).toMatchObject({ src: 'https://api.kalkstrade.com/v1/public/media/abc/orig', w: 1200, h: 800, alt: 'A chart', dark: { src: 'https://cdn.example/d.webp' } });
    expect(i.kind === 'image' && i.image.srcSet).toContain('480w');
    expect(out.home['faq.x.answer']).toEqual({ kind: 'rich_text', markdown: '# Hi\n\nthere' });
    expect(out.home['form.hint']).toEqual({ kind: 'placeholder', text: 'you@example.com' });
  });

  it('drops unsafe links and images, bad keys, unknown kinds and empty values', () => {
    const out = sanitiseContent(
      body({
        home: {
          a: { kind: 'link', value: { label: 'x', href: 'javascript:alert(1)' } },
          b: { kind: 'link', value: { label: '', href: '//evil.example' } },
          c: { kind: 'image', value: img({ url: 'javascript:alert(1)' }) },
          d: { kind: 'image', value: img({ url: 'data:image/png;base64,AAAA' }) },
          e: { kind: 'video', value: { text: 'x' } },
          f: { kind: 'text', value: { text: '   ' } },
          'Bad Key': { kind: 'text', value: { text: 'x' } },
          g: { kind: 'image', value: img({ srcset: 'javascript:x 480w' }) },
        },
        'Bad/Page': { x: { kind: 'text', value: { text: 'x' } } },
      }),
    );
    expect(out.home.a).toEqual({ kind: 'link', label: 'x', href: '' });
    expect(out.home.b).toBeUndefined();
    expect(out.home.c).toBeUndefined();
    expect(out.home.d).toBeUndefined();
    expect(out.home.e).toBeUndefined();
    expect(out.home.f).toBeUndefined();
    expect(out.home['Bad Key']).toBeUndefined();
    const g = out.home.g;
    expect(g.kind === 'image' && g.image.srcSet).toBeUndefined();
    expect(out['Bad/Page']).toBeUndefined();
  });

  it('caps lengths and survives junk', () => {
    const out = sanitiseContent(body({ home: { t: { kind: 'text', value: { text: 'x'.repeat(5000) } }, l: { kind: 'link', value: { label: 'y'.repeat(500), href: '/a' } } } }));
    const t = out.home.t;
    expect(t.kind === 'text' && t.text.length).toBe(2000);
    const l = out.home.l;
    expect(l.kind === 'link' && l.label.length).toBe(200);
    expect(sanitiseContent(null)).toEqual({});
    expect(sanitiseContent('x')).toEqual({});
    expect(sanitiseContent({ pages: [] })).toEqual({});
    expect(sanitiseContent({ pages: { home: 'x', about: { a: null, b: 1, c: { kind: 'text' } } } })).toEqual({ about: {} });
  });
});

describe('links and paths', () => {
  it('accepts only http(s), mailto and same-site links', () => {
    for (const ok of ['/a', '/a?b=1#c', '#how', '?ref=1', 'https://kalkstrade.com/x', 'http://localhost:3000/', 'mailto:support@kalkstrade.com?subject=Hi']) expect(safeHref(ok)).not.toBeNull();
    for (const bad of ['javascript:alert(1)', '//evil.example', '/\\evil.example', 'data:text/html,x', 'ftp://x', '/a b', 'mailto://x', '', 42]) expect(safeHref(bad)).toBeNull();
  });

  it('keeps the preview redirect on this site', () => {
    expect(previewPath('/markets/forex?x=1')).toBe('/markets/forex?x=1');
    for (const bad of ['//evil.example', '/\\evil.example', 'https://evil.example', 'evil', '', null, '/a\nb']) expect(previewPath(bad as string)).toBe('/');
    expect(isPreviewToken('a2Fsa3N8d2Vic2l0ZXwxNzYw.abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG')).toBe(true);
    expect(isPreviewToken('nope')).toBe(false);
    expect(isPreviewToken('a b.c')).toBe(false);
  });

  it('builds slot keys and page lists', () => {
    expect(keyOf('/markets/forex')).toBe('markets-forex');
    expect(keyOf('/accounts#cfd')).toBe('accounts-cfd');
    expect(keyOf('/')).toBe('home');
    expect(pageList(['faq', 'about', 'faq', 'Bad'])).toBe('about,faq');
  });
});

describe('merging over the defaults', () => {
  const HERO: HeroCopy = {
    eyebrow: 'About',
    title: 'Built in-house,',
    accent: 'for traders.',
    subtitle: 'Lead',
    cta: { label: 'Open', href: '/auth/register' },
    image: { src: '/site/heroes/about.webp', w: 100, h: 200, alt: '', bg: '#440503' },
  };

  it('leaves everything as bundled without content', () => {
    expect(mergeHero(undefined, HERO)).toEqual(HERO);
    expect(mergeNav(undefined, NAV_COPY)).toEqual(NAV_COPY);
    expect(mergeFooter(undefined, FOOTER_COPY)).toEqual(FOOTER_COPY);
    expect(getText({}, 'x', 'fallback')).toBe('fallback');
  });

  it('overlays published slots, never adds parts the page lacks', () => {
    const c = sanitiseContent(
      body({
        about: {
          'hero.title': { kind: 'text', value: { text: 'New title' } },
          'hero.cta': { kind: 'link', value: { label: 'Join', href: 'javascript:x' } },
          'hero.cta_secondary': { kind: 'link', value: { label: 'Extra', href: '/x' } },
          'hero.image': { kind: 'image', value: img({ width: null, height: null, alt: '' }) },
          'hero.background': { kind: 'text', value: { text: 'red' } },
        },
      }),
    ).about;
    const h = mergeHero(c, HERO);
    expect(h.title).toBe('New title');
    expect(h.accent).toBe('for traders.');
    expect(h.cta).toEqual({ label: 'Join', href: '/auth/register' });
    expect(h.cta2).toBeUndefined();
    expect(h.image).toMatchObject({ src: 'https://api.kalkstrade.com/v1/public/media/abc/orig', w: 100, h: 200, bg: '#440503', dark: null });
  });

  it('merges nav, footer, screenshots and the FAQ by stable keys', () => {
    const g = sanitiseContent(
      body({
        global: {
          'nav.options': { kind: 'link', value: { label: 'FX Options', href: '/options' } },
          'nav.options.tag': { kind: 'text', value: { text: 'Hot' } },
          'footer.col.trade.markets-forex': { kind: 'link', value: { label: 'Currencies', href: '/markets/forex' } },
          'shots.trader-workspace': { kind: 'image', value: img() },
        },
        faq: { 'faq.deposit.question': { kind: 'text', value: { text: 'How do I fund my wallet?' } }, 'group.funding.title': { kind: 'text', value: { text: 'Money' } } },
      }),
    );
    const nav = mergeNav(g.global, NAV_COPY);
    expect(nav.primary[0]).toMatchObject({ label: 'FX Options', href: '/options', tag: 'Hot' });
    const foot = mergeFooter(g.global, FOOTER_COPY);
    expect(foot.columns[0].links.find((l) => l.href === '/markets/forex')?.label).toBe('Currencies');
    const d = { src: '/site/shots/trader-workspace.webp', w: 2880, h: 1800, alt: 'Workspace' };
    expect(mergeShot(shotOverrides(g.global), 'traderWorkspace', d).src).toMatch(/^https:/);
    expect(mergeShot(shotOverrides(g.global), 'traderChart', d)).toBe(d);
    const groups = mergeFaqGroups(g.faq, [{ id: 'funding', title: 'Deposits', items: [{ id: 'deposit', q: 'How do I deposit?', a: 'A' }] }]);
    expect(groups[0]).toEqual({ id: 'funding', title: 'Money', items: [{ id: 'deposit', q: 'How do I fund my wallet?', a: 'A' }] });
  });

  it('reads links and images with partial values', () => {
    expect(getLink({ k: { kind: 'link', label: '', href: '/new' } }, 'k', { label: 'Old', href: '/old' })).toEqual({ label: 'Old', href: '/new' });
    expect(getImage({ k: { kind: 'text', text: 'x' } }, 'k', { src: '/a.webp', w: 1, h: 1, alt: 'a' }).src).toBe('/a.webp');
  });
});
