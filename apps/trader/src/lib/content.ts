/**
 * Website copy and images from the platform's content service (services/content in the Kalks repo), edited in the
 * Back Office under surface "website". The bundled copy in src/content/* is the default of every slot: when the
 * service is unreachable, a slot is empty or a value fails the sanitiser below, the page renders exactly as bundled.
 *
 *  - Public read, no token: GET {CONTENT_URL}/v1/public/content?surface=website&page=a,b&locale=en&tenant=…
 *    (published slots only; cached here for 60 s like the service's own Cache-Control).
 *  - Preview: /api/content-preview turns on Next draft mode and keeps the Back Office's preview token in an
 *    httpOnly cookie; only then does the fetch send ?preview= and skip the cache, so normal pages stay static / ISR.
 *  - Keys: page = the route (home, markets-forex; global for nav, footer and screenshots; faq), slot = a dotted
 *    path (hero.title, nav.options, shots.trader-workspace, faq.which-accounts.answer). src/content/manifest.ts
 *    lists every slot the site reads with its default; scripts/seed-website-content.mjs in the platform repo
 *    imports that list into the service.
 *
 * Everything but getContent() is pure (no runtime imports), so the seed script and the tests can load this file.
 */

/* ── Types ─────────────────────────────────────────────────────────────────── */

export type ImageFile = { src: string; w: number; h: number; srcSet?: string };
/** An image with an optional dark-theme file (ThemedImage shows it when the resolved theme is dark). */
export type SiteImage = ImageFile & { alt: string; dark?: ImageFile | null };
export type SiteLink = { label: string; href: string };

export type Slot =
  | { kind: 'text' | 'placeholder'; text: string }
  | { kind: 'rich_text'; markdown: string }
  | { kind: 'link'; label: string; href: string }
  | { kind: 'image'; image: SiteImage };
/** slot key → value, for one page */
export type PageContent = Record<string, Slot>;
export type SiteContent = {
  /** the service answered */
  ok: boolean;
  /** drafts are showing (draft mode with a valid token) */
  preview: boolean;
  /** draft mode is on but the service refused the token (expired): published content is showing */
  previewExpired: boolean;
  pages: Record<string, PageContent>;
};

export const SURFACE = 'website';
/** httpOnly cookie that holds the Back Office preview token while draft mode is on */
export const PREVIEW_COOKIE = 'kalks-content-preview';

const PAGE_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const SLOT_RE = /^[a-z0-9][a-z0-9_.-]{0,95}$/;
export const isPageKey = (s: string) => PAGE_RE.test(s);
export const isSlotKey = (s: string) => SLOT_RE.test(s);

/* ── Sanitiser (pure; unit-tested) ─────────────────────────────────────────── */

const MAX = { text: 2000, placeholder: 200, rich_text: 20_000, label: 200, href: 1000, alt: 300, srcset: 4000 };
const MAX_SLOTS = 600;
const MAX_SIDE = 20_000;

/** strip control characters (newlines kept where asked) and bidi overrides, collapse spaces, trim, cap the length */
function clean(v: unknown, max: number, multiline = false): string {
  if (typeof v !== 'string') return '';
  const s = v
    .replace(/\r\n?/g, '\n')
    .replace(multiline ? /[\u0000-\u0009\u000b-\u001f\u007f-\u009f]/g : /[\u0000-\u001f\u007f-\u009f]/g, multiline ? '' : ' ')
    .replace(/[‪-‮⁦-⁩]/g, '')
    .replace(multiline ? /[ \t]+/g : /\s+/g, ' ')
    .trim();
  return s.length > max ? s.slice(0, max).trimEnd() : s;
}

/** https, http, mailto, or a same-site /path, #anchor or ?query; anything else (javascript:, //host, data:) is null */
export function safeHref(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const h = v.trim();
  if (!h || h.length > MAX.href || /[\s\\<>"'`\u0000-\u001f\u007f]/.test(h)) return null;
  if ((h.startsWith('/') && !h.startsWith('//')) || h.startsWith('#') || h.startsWith('?')) return h;
  try {
    const u = new URL(h);
    if (u.protocol === 'https:' || u.protocol === 'http:') return u.toString();
    if (u.protocol === 'mailto:' && /^mailto:[^/]/i.test(h)) return h;
  } catch {
    /* not a URL */
  }
  return null;
}

/** an absolute http(s) URL for an image, else null */
export function imageUrl(v: unknown): string | null {
  if (typeof v !== 'string' || v.length > MAX.href) return null;
  try {
    const u = new URL(v.trim());
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
}

/** "url 480w, url 1024w": every candidate must be an http(s) URL with a width or density descriptor */
function srcSet(v: unknown): string | undefined {
  if (typeof v !== 'string' || !v.trim() || v.length > MAX.srcset) return undefined;
  const out: string[] = [];
  for (const part of v.split(',')) {
    const [url, desc, ...rest] = part.trim().split(/\s+/);
    const u = imageUrl(url);
    if (!u || rest.length || (desc !== undefined && !/^(\d{1,5}w|\d(\.\d{1,2})?x)$/.test(desc))) return undefined;
    out.push(desc ? `${u} ${desc}` : u);
  }
  return out.join(', ');
}

const side = (v: unknown) => (typeof v === 'number' && Number.isInteger(v) && v > 0 && v <= MAX_SIDE ? v : 0);

function imageFile(o: unknown): ImageFile | null {
  if (!o || typeof o !== 'object') return null;
  const r = o as Record<string, unknown>;
  const src = imageUrl(r.url);
  if (!src) return null;
  const f: ImageFile = { src, w: side(r.width), h: side(r.height) };
  const set = srcSet(r.srcset);
  if (set) f.srcSet = set;
  return f;
}

function slot(kind: unknown, value: unknown): Slot | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Record<string, unknown>;
  switch (kind) {
    case 'text':
    case 'placeholder': {
      const text = clean(v.text, MAX[kind], kind === 'text');
      return text ? { kind, text } : null;
    }
    case 'rich_text': {
      const markdown = clean(v.markdown, MAX.rich_text, true);
      return markdown ? { kind, markdown } : null;
    }
    case 'link': {
      const label = clean(v.label, MAX.label);
      const href = safeHref(v.href) ?? '';
      return label || href ? { kind, label, href } : null;
    }
    case 'image': {
      const f = imageFile(v);
      if (!f) return null;
      return { kind, image: { ...f, alt: clean(v.alt, MAX.alt), dark: imageFile(v.dark) } };
    }
    default:
      return null;
  }
}

/** Turn the body of GET /v1/public/content into typed slots; anything malformed is dropped. */
export function sanitiseContent(raw: unknown): Record<string, PageContent> {
  const out: Record<string, PageContent> = {};
  const pages = raw && typeof raw === 'object' ? (raw as { pages?: unknown }).pages : null;
  if (!pages || typeof pages !== 'object' || Array.isArray(pages)) return out;
  let n = 0;
  for (const [page, slots] of Object.entries(pages as Record<string, unknown>)) {
    if (!isPageKey(page) || !slots || typeof slots !== 'object' || Array.isArray(slots)) continue;
    const pc: PageContent = {};
    for (const [key, entry] of Object.entries(slots as Record<string, unknown>)) {
      if (n >= MAX_SLOTS) break;
      if (!isSlotKey(key) || !entry || typeof entry !== 'object') continue;
      const e = entry as { kind?: unknown; value?: unknown };
      const s = slot(e.kind, e.value);
      if (s) {
        pc[key] = s;
        n++;
      }
    }
    out[page] = pc;
  }
  return out;
}

/* ── Reading slots over the defaults (pure; unit-tested) ───────────────────── */

type C = PageContent | undefined;

export function getText(c: C, key: string, fallback: string): string {
  const s = c?.[key];
  return s && (s.kind === 'text' || s.kind === 'placeholder') && s.text ? s.text : fallback;
}

/** a link slot; a missing or refused label / href keeps the default's */
export function getLink(c: C, key: string, fallback: SiteLink): SiteLink {
  const s = c?.[key];
  return s?.kind === 'link' ? { label: s.label || fallback.label, href: s.href || fallback.href } : fallback;
}

/** an image slot replaces the whole default (with its own dark file, or none); missing sizes keep the default's */
export function getImage<T extends SiteImage>(c: C, key: string, fallback: T): T {
  const s = c?.[key];
  if (s?.kind !== 'image') return fallback;
  const i = s.image;
  return { ...fallback, src: i.src, w: i.w || fallback.w, h: i.h || fallback.h, srcSet: i.srcSet, alt: i.alt || fallback.alt, dark: i.dark ?? null };
}

/** a #rrggbb colour in a text slot (hero backdrops) */
export function getColour(c: C, key: string, fallback: string): string {
  const t = getText(c, key, '');
  return /^#[0-9a-f]{6}$/i.test(t) ? t : fallback;
}

/** a slot key segment from a link: "/markets/forex" → "markets-forex", "/accounts#cfd" → "accounts-cfd", "/" → "home" */
export function keyOf(href: string): string {
  const k = href
    .toLowerCase()
    .replace(/^[a-z]+:\/\/[^/]+/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return k || 'home';
}

/** camelCase → kebab-case ("traderWorkspace" → "trader-workspace") */
export const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()).replace(/^-/, '');

/* Page heroes: hero.eyebrow · hero.title · hero.title_accent (the lighter second half) · hero.subtitle · hero.cta ·
   hero.cta_secondary · hero.image · hero.background (#rrggbb behind the photo); cta.image: the closing band's figure */

export type HeroImage = SiteImage & { bg?: string };
export type HeroCopy = {
  eyebrow?: string;
  title: string;
  /** the second, lighter half of the headline */
  accent?: string;
  /** class of the accent span (default s-mute) */
  accentClass?: string;
  subtitle?: string;
  cta?: SiteLink;
  cta2?: SiteLink;
  /** null: the typographic hero */
  image?: HeroImage | null;
};

export const HERO_SLOTS = {
  eyebrow: 'hero.eyebrow',
  title: 'hero.title',
  accent: 'hero.title_accent',
  subtitle: 'hero.subtitle',
  cta: 'hero.cta',
  cta2: 'hero.cta_secondary',
  image: 'hero.image',
  bg: 'hero.background',
  ctaImage: 'cta.image',
} as const;

/** Only what the page has by default can be replaced, so an edit never adds or drops a part of the layout. */
export function mergeHero(c: C, d: HeroCopy): HeroCopy {
  const S = HERO_SLOTS;
  const h: HeroCopy = { ...d, title: getText(c, S.title, d.title) };
  if (d.eyebrow !== undefined) h.eyebrow = getText(c, S.eyebrow, d.eyebrow);
  if (d.accent !== undefined) h.accent = getText(c, S.accent, d.accent);
  if (d.subtitle !== undefined) h.subtitle = getText(c, S.subtitle, d.subtitle);
  if (d.cta) h.cta = getLink(c, S.cta, d.cta);
  if (d.cta2) h.cta2 = getLink(c, S.cta2, d.cta2);
  if (d.image) {
    const img = getImage(c, S.image, d.image);
    const bg = getColour(c, S.bg, d.image.bg ?? '');
    h.image = bg ? { ...img, bg } : img;
  }
  return h;
}

/* Navigation and footer (page "global"): nav.<path> (link) · nav.<path>.note · nav.<path>.tag · nav.home · nav.more ·
   nav.login · nav.register · nav.demo (links) · nav.android · footer.tagline · footer.cta (link) ·
   footer.col.<title>.title · footer.col.<title>.<path> (link) · footer.legal.<path> (link) · footer.risk.title /
   .text · footer.restricted.title / .text · footer.restricted.link (link) */

export type NavItem = { label: string; href: string; note?: string; tag?: string; icon?: string };
export type NavCopy = {
  home: string;
  more: string;
  primary: NavItem[];
  moreItems: NavItem[];
  login: SiteLink;
  register: SiteLink;
  demo: SiteLink;
  /** the Android card at the foot of the "More" panel */
  android: string;
};
export type FooterCopy = {
  tagline: string;
  cta: SiteLink;
  columns: { title: string; links: SiteLink[] }[];
  legal: SiteLink[];
  riskTitle: string;
  risk: string;
  restrictedTitle: string;
  restricted: string;
  restrictedLink: SiteLink;
};

export const navKey = (href: string) => `nav.${keyOf(href)}`;

function navItem<T extends NavItem>(c: C, l: T): T {
  const k = navKey(l.href);
  const out: T = { ...l, ...getLink(c, k, l) };
  if (l.note !== undefined) out.note = getText(c, `${k}.note`, l.note);
  if (l.tag !== undefined) out.tag = getText(c, `${k}.tag`, l.tag);
  return out;
}

export function mergeNav(c: C, d: NavCopy): NavCopy {
  return {
    home: getText(c, 'nav.home', d.home),
    more: getText(c, 'nav.more', d.more),
    primary: d.primary.map((l) => navItem(c, l)),
    moreItems: d.moreItems.map((l) => navItem(c, l)),
    login: getLink(c, 'nav.login', d.login),
    register: getLink(c, 'nav.register', d.register),
    demo: getLink(c, 'nav.demo', d.demo),
    android: getText(c, 'nav.android', d.android),
  };
}

export const footerColKey = (title: string) => `footer.col.${keyOf(title)}`;

export function mergeFooter(c: C, d: FooterCopy): FooterCopy {
  return {
    tagline: getText(c, 'footer.tagline', d.tagline),
    cta: getLink(c, 'footer.cta', d.cta),
    columns: d.columns.map((col) => {
      const k = footerColKey(col.title);
      return { title: getText(c, `${k}.title`, col.title), links: col.links.map((l) => getLink(c, `${k}.${keyOf(l.href)}`, l)) };
    }),
    legal: d.legal.map((l) => getLink(c, `footer.legal.${keyOf(l.href)}`, l)),
    riskTitle: getText(c, 'footer.risk.title', d.riskTitle),
    risk: getText(c, 'footer.risk.text', d.risk),
    restrictedTitle: getText(c, 'footer.restricted.title', d.restrictedTitle),
    restricted: getText(c, 'footer.restricted.text', d.restricted),
    restrictedLink: getLink(c, 'footer.restricted.link', d.restrictedLink),
  };
}

/* Screenshots (page "global"): shots.<key in kebab-case>, e.g. shots.trader-workspace, shots.copy-leaderboard */

export const shotSlot = (key: string) => `shots.${kebab(key)}`;

/** the screenshot slots that have a value: slot key → image (handed to the client Shot components) */
export function shotOverrides(c: C): Record<string, SiteImage> {
  const out: Record<string, SiteImage> = {};
  for (const [k, s] of Object.entries(c ?? {})) if (k.startsWith('shots.') && s.kind === 'image') out[k] = s.image;
  return out;
}

/** a screenshot default with its override, if any */
export function mergeShot<T extends SiteImage>(overrides: Record<string, SiteImage> | undefined, key: string | undefined, d: T): T {
  const o = key ? overrides?.[shotSlot(key)] : undefined;
  return o ? getImage({ x: { kind: 'image', image: o } }, 'x', d) : d;
}

/* FAQ (page "faq"): faq.<item id>.question · faq.<item id>.answer · group.<group id>.title. Item ids are stable
   slugs in src/content/faq.ts, so reordering or moving questions never shifts a key. */

export type FaqItem = { id: string; q: string; a: string };

/** a page's own questions (no id) pass through unchanged */
export function mergeFaqItems<T extends { id?: string; q: string; a: string }>(c: C, items: T[]): T[] {
  return items.map((i) => (i.id ? { ...i, q: getText(c, `faq.${i.id}.question`, i.q), a: getText(c, `faq.${i.id}.answer`, i.a) } : i));
}

export function mergeFaqGroups<G extends { id: string; title: string; items: FaqItem[] }>(c: C, groups: G[]): G[] {
  return groups.map((g) => ({ ...g, title: getText(c, `group.${g.id}.title`, g.title), items: mergeFaqItems(c, g.items) }));
}

/* ── Preview (pure; unit-tested) ───────────────────────────────────────────── */

/** where the preview route may send the visitor: a same-site "/path" (never "//host" or "/\host"), else "/" */
export function previewPath(p: string | null | undefined): string {
  if (typeof p !== 'string' || !p || p.length > 512) return '/';
  if (!p.startsWith('/') || p.startsWith('//') || /[\\\s\u0000-\u001f\u007f]/.test(p)) return '/';
  return p;
}

/** the shape of a content-service preview token: base64url(tenant|surface|expiry).base64url(HMAC) */
export const isPreviewToken = (t: unknown): t is string => typeof t === 'string' && /^[A-Za-z0-9_-]{8,400}\.[A-Za-z0-9_-]{20,200}$/.test(t);

/* ── Server fetch ──────────────────────────────────────────────────────────── */

/** the comma list the service takes (≤ 10, sorted so the same set of pages is always the same cached URL) */
export function pageList(pages: string[]): string {
  return [...new Set(pages)].filter(isPageKey).sort().slice(0, 10).join(',');
}

/**
 * Server only. Never throws: an unreachable or unconfigured service gives {ok: false, pages: {}}, i.e. the defaults.
 * Ask for every page a render needs in one call (e.g. getContent(['about', 'faq'])); identical calls in one render
 * are deduplicated by Next's request memoization, and published reads share the 60 s data cache across pages.
 */
export async function getContent(pages: string[]): Promise<SiteContent> {
  const empty: SiteContent = { ok: false, preview: false, previewExpired: false, pages: {} };
  const list = pageList(pages);
  if (!list) return empty;
  const base = (process.env.CONTENT_URL || 'http://127.0.0.1:8105').replace(/\/+$/, '');
  const tenant = (process.env.CONTENT_TENANT || 'kalks').toLowerCase();
  const url = `${base}/v1/public/content?surface=${SURFACE}&page=${encodeURIComponent(list)}&locale=en&tenant=${encodeURIComponent(tenant)}`;

  // Draft mode only: the preview token from the cookie. Reading draftMode() alone keeps static pages static.
  const { draftMode, cookies } = await import('next/headers');
  const token = (await draftMode()).isEnabled ? ((await cookies()).get(PREVIEW_COOKIE)?.value ?? '') : '';

  const get = async (preview: string): Promise<unknown> => {
    try {
      const res = await fetch(
        preview ? `${url}&preview=${encodeURIComponent(preview)}` : url,
        preview ? { cache: 'no-store', signal: AbortSignal.timeout(3000) } : { next: { revalidate: 60 }, signal: AbortSignal.timeout(3000) },
      );
      if (preview && res.status === 403) return 'expired';
      return res.ok ? ((await res.json()) as unknown) : null;
    } catch {
      return null;
    }
  };

  let body = await get(token);
  const previewExpired = body === 'expired';
  if (previewExpired) body = await get('');
  if (!body || typeof body !== 'object') return { ...empty, previewExpired };
  const preview = Boolean(token) && (body as { preview?: unknown }).preview === true;
  return { ok: true, preview, previewExpired, pages: sanitiseContent(body) };
}
