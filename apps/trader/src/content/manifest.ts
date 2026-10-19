/**
 * Every content-service slot the website reads (surface "website"), with its bundled default: the slot catalogue.
 * scripts/seed-website-content.mjs in the platform repo loads this module (Node strips the types; it resolves the
 * "@/" alias itself) to import the current copy and images into the service, so keep this module graph free of
 * JSX, React and Next imports, and of TypeScript that Node can't strip (enums, namespaces, parameter properties).
 * manifest.test.ts checks the keys.
 */
import { FAQ_GROUPS } from '@/content/faq';
import { SHOTS } from '@/content/heroes';
import { CTA_IMAGE, HERO_COPY, PAGE_LABELS, PAGE_PATHS, heroImage, type HeroPage } from '@/content/pages';
import { FOOTER_COPY, NAV_COPY } from '@/content/site';
import { PSHOTS } from '@/components/site/platforms/shots';
import { HERO_SLOTS, footerColKey, keyOf, navKey, shotSlot, type SiteLink } from '@/lib/content';

export type ManifestValue = { text: string } | { label: string; href: string } | { src: string; alt: string };
export type ManifestEntry = {
  page: string;
  slot: string;
  kind: 'text' | 'link' | 'image';
  /** what the Back Office shows for the slot */
  label: string;
  /** image: `src` is a path under public/ */
  value: ManifestValue;
};

export function buildManifest(): ManifestEntry[] {
  const out: ManifestEntry[] = [];
  const text = (page: string, slot: string, label: string, t: string) => out.push({ page, slot, kind: 'text', label, value: { text: t } });
  const link = (page: string, slot: string, label: string, l: SiteLink) => out.push({ page, slot, kind: 'link', label, value: { label: l.label, href: l.href } });
  const image = (page: string, slot: string, label: string, src: string, alt: string) => out.push({ page, slot, kind: 'image', label, value: { src, alt } });

  /* nav and footer */
  const g = 'global';
  text(g, 'nav.home', 'Nav: Home', NAV_COPY.home);
  text(g, 'nav.more', 'Nav: More', NAV_COPY.more);
  for (const l of [...NAV_COPY.primary, ...NAV_COPY.moreItems]) {
    const k = navKey(l.href);
    link(g, k, `Nav: ${l.label}`, l);
    if (l.note !== undefined) text(g, `${k}.note`, `Nav: ${l.label} (note)`, l.note);
    if (l.tag !== undefined) text(g, `${k}.tag`, `Nav: ${l.label} (tag)`, l.tag);
  }
  link(g, 'nav.login', 'Nav: Log in', NAV_COPY.login);
  link(g, 'nav.register', 'Nav: Open account', NAV_COPY.register);
  link(g, 'nav.demo', 'Nav: Try the demo (phone menu)', NAV_COPY.demo);
  text(g, 'nav.android', 'Nav: Android card title', NAV_COPY.android);

  const f = FOOTER_COPY;
  text(g, 'footer.tagline', 'Footer: tagline', f.tagline);
  link(g, 'footer.cta', 'Footer: button', f.cta);
  for (const col of f.columns) {
    const k = footerColKey(col.title);
    text(g, `${k}.title`, `Footer: ${col.title} (column title)`, col.title);
    for (const l of col.links) link(g, `${k}.${keyOf(l.href)}`, `Footer: ${col.title} · ${l.label}`, l);
  }
  for (const l of f.legal) link(g, `footer.legal.${keyOf(l.href)}`, `Footer legal: ${l.label}`, l);
  text(g, 'footer.risk.title', 'Footer: risk warning title', f.riskTitle);
  text(g, 'footer.risk.text', 'Footer: risk warning', f.risk);
  text(g, 'footer.restricted.title', 'Footer: restricted regions title', f.restrictedTitle);
  text(g, 'footer.restricted.text', 'Footer: restricted regions', f.restricted);
  link(g, 'footer.restricted.link', 'Footer: restricted regions link', f.restrictedLink);

  /* screenshots */
  for (const [k, s] of Object.entries(SHOTS)) image(g, shotSlot(k), `Screenshot: ${k}`, s.src, s.alt);
  for (const [k, s] of Object.entries(PSHOTS)) image(g, shotSlot(k), `Screenshot: ${k}`, s.src, s.alt);

  /* page heroes and the closing band's figure */
  const S = HERO_SLOTS;
  for (const [page, h] of Object.entries(HERO_COPY) as [HeroPage, (typeof HERO_COPY)[HeroPage]][]) {
    if (h.eyebrow !== undefined) text(page, S.eyebrow, 'Hero: eyebrow', h.eyebrow);
    text(page, S.title, page === 'home' ? 'Hero: line' : 'Hero: headline', h.title);
    if (h.accent !== undefined) text(page, S.accent, 'Hero: headline, lighter second half', h.accent);
    if (h.subtitle !== undefined) text(page, S.subtitle, page === 'home' ? 'Hero: small facts' : 'Hero: lead', h.subtitle);
    if (h.cta) link(page, S.cta, 'Hero: main button', h.cta);
    if (h.cta2) link(page, S.cta2, 'Hero: second button', h.cta2);
    if (h.image) {
      image(page, S.image, 'Hero: photo', h.image.src, `Hero photo: ${page}`);
      if (h.image.bg) text(page, S.bg, 'Hero: backdrop colour (#rrggbb)', h.image.bg);
    }
    const cta = CTA_IMAGE[page];
    if (cta) image(page, S.ctaImage, 'Closing band: figure', heroImage(cta).src, `Hero photo: ${cta}`);
  }

  /* FAQ */
  for (const grp of FAQ_GROUPS) {
    text('faq', `group.${grp.id}.title`, `FAQ group: ${grp.title}`, grp.title);
    for (const i of grp.items) {
      text('faq', `faq.${i.id}.question`, `FAQ: ${i.q}`, i.q);
      text('faq', `faq.${i.id}.answer`, `FAQ: ${i.q} (answer)`, i.a);
    }
  }
  return out;
}

/** page key → path (the Back Office preview button) and name */
export { PAGE_LABELS, PAGE_PATHS };
