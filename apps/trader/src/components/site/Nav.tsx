'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, BookOpen, Building2, ChevronDown, Copy, LifeBuoy, Menu, Network, Smartphone, Users, X } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { NAV_COPY } from '@/content/site';
import { ANDROID_APP, RISK_WARNING } from '@/content/facts';
import { LanguagePicker, LanguageSelect } from '@/components/chrome/LanguagePicker';
import { ThemeSelect, ThemeToggle } from '@/components/chrome/ThemeToggle';
import type { NavCopy } from '@/lib/content';
import { cn } from '@/lib/cn';

const ICONS: Record<string, JSX.Element> = {
  copy: <Copy size={18} aria-hidden />,
  partners: <Network size={18} aria-hidden />,
  academy: <BookOpen size={18} aria-hidden />,
  whitelabel: <Building2 size={18} aria-hidden />,
  about: <Users size={18} aria-hidden />,
  help: <LifeBuoy size={18} aria-hidden />,
};

type NavState = 'top' | 'hero' | 'page';
/** where the header sits: over the top of the hero, further down the hero, or past it (no hero: past it once moved) */
function readState(): NavState {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const y = window.scrollY;
  if (hero ? hero.getBoundingClientRect().bottom <= 96 : y > 24) return 'page';
  return y > 24 ? 'hero' : 'top';
}

/**
 * Site navigation, two bars that cross-fade (site.css). Over a hero (founder 2026-11-01, Formix reference): the
 * wordmark left, the page links in a hairline pill with the current page as a white pill, language, theme, Log in and
 * the white "Open account" pill with its round arrow right; transparent at the top, dark glass once the page moves.
 * Past the hero, the floating pill: the links left, the wordmark in the middle, Log in and the orange pill right.
 * Below 1280 px both bars are the wordmark and a MENU pill opening a full-screen menu. `copy` is NAV_COPY merged with
 * the content service by the root layout.
 */
export default function Nav({ copy = NAV_COPY }: { copy?: NavCopy }) {
  const pathname = usePathname();
  const [state, setState] = useState<NavState>('top');
  const [sheet, setSheet] = useState(false);
  const [more, setMore] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setState(readState());
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);
  useEffect(() => {
    setSheet(false);
    setMore(false);
  }, [pathname]);
  // the panel belongs to one bar: close it when the bars swap
  const past = state === 'page';
  useEffect(() => setMore(false), [past]);
  useEffect(() => {
    if (!sheet) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [sheet]);
  useEffect(() => {
    if (!more) return;
    const onDoc = (e: MouseEvent) => !(e.target as Element | null)?.closest?.('[data-more]') && setMore(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMore(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [more]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  /** the page links and the More panel; `bar` says which bar renders them (the panel opens in the visible one) */
  const links = (bar: 'hero' | 'page') => (
    <nav aria-label="Main" className={cn('s-nav-links', bar === 'page' && 'justify-self-start')}>
      <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
        {copy.home}
      </Link>
      {copy.primary.map((l) => (
        <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}>
          {l.label}
          {l.tag && <span className="s-nav-tag">{l.tag}</span>}
        </Link>
      ))}
      <div data-more className="relative">
        <button type="button" aria-expanded={more} aria-haspopup="true" onClick={() => setMore((v) => !v)}>
          {copy.more} <ChevronDown size={14} aria-hidden className={cn('transition-transform duration-200', more && 'rotate-180')} />
        </button>
        {more && (past ? bar === 'page' : bar === 'hero') && (
          <div className="s-mega" data-lenis-prevent>
            {copy.moreItems.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}>
                <span className="s-ic-tile !size-10 !rounded-xl">{ICONS[l.icon ?? '']}</span>
                <span className="flex flex-col">
                  <b className="text-[14.5px] font-semibold text-white">{l.label}</b>
                  <small className="text-[12.5px] text-white/55">{l.note}</small>
                </span>
              </Link>
            ))}
            <Link href="/platforms/android" className="s-isl col-span-2 mt-1 !items-center !bg-[var(--s-orange)] !text-white hover:!bg-[var(--s-orange2)]">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[var(--s-orange)]">
                <Smartphone size={18} aria-hidden />
              </span>
              <span className="flex flex-col">
                <b className="text-[14.5px] font-semibold">{copy.android}</b>
                <small className="text-[12.5px] text-white/80">
                  Version {ANDROID_APP.version} · {ANDROID_APP.sizeMb} MB
                </small>
              </span>
              <ArrowUpRight size={16} aria-hidden className="ms-auto" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );

  const logo = (cls?: string) => (
    <Link href="/" aria-label="Kalks home" className={cn('flex h-12 items-center rounded-full px-1', cls)}>
      <Wordmark className="h-[22px] w-auto text-white" title="Kalks" />
    </Link>
  );

  const menuBtn = (
    <button type="button" className="s-menu-btn min-[1280px]:!hidden" aria-label="Open menu" aria-expanded={sheet} aria-controls="site-menu" onClick={() => setSheet(true)}>
      Menu
      <Menu size={16} strokeWidth={2} aria-hidden />
    </button>
  );

  const login = (
    <a href={copy.login.href} className="hidden h-11 items-center rounded-full px-3 text-[14.5px] font-medium text-white/80 transition-colors hover:text-white min-[1280px]:inline-flex">
      {copy.login.label}
    </a>
  );

  return (
    <>
      <header className="s-nav" data-state={state} data-scrolled={state !== 'top' || more}>
        {/* over the hero */}
        <div className="s-nav-hero" aria-hidden={past}>
          <div className="s-wrap s-nav-row">
            {logo('me-auto')}
            {links('hero')}
            <div className="flex items-center gap-1.5">
              <LanguagePicker className="hidden min-[1280px]:block" />
              <ThemeToggle className="hidden min-[1280px]:grid" />
              {login}
              <a href={copy.register.href} className="s-btn light sm !hidden sm:!inline-flex">
                {copy.register.label}
                <span className="s-btn-ic" aria-hidden>
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </span>
              </a>
              {menuBtn}
            </div>
          </div>
        </div>

        {/* the floating pill, past the hero */}
        <div className="s-nav-page" aria-hidden={!past}>
          <div className="s-nav-pillwrap">
            <div className="s-nav-pillbar">
              {links('page')}
              {logo('min-[1280px]:justify-self-center')}
              <div className="flex items-center gap-1.5 min-[1280px]:justify-self-end">
                <LanguagePicker className="hidden min-[1280px]:block" />
                <ThemeToggle className="hidden min-[1280px]:grid" />
                {login}
                <a href={copy.register.href} className="s-btn sm !hidden sm:!inline-flex">
                  {copy.register.label}
                  <span className="s-btn-ic" aria-hidden>
                    <ArrowUpRight size={16} strokeWidth={2.2} />
                  </span>
                </a>
                {menuBtn}
              </div>
            </div>
          </div>
        </div>
      </header>

      {sheet && (
        <div id="site-menu" className="s-sheet s-isl fixed inset-0 z-[80] flex flex-col overflow-y-auto" role="dialog" aria-modal="true" aria-label="Menu" data-lenis-prevent>
          <div className="s-wrap flex h-[88px] flex-none items-center justify-between">
            <Link href="/" aria-label="Kalks home">
              <Wordmark className="h-[22px] w-auto text-white" title="Kalks" />
            </Link>
            <button type="button" className="s-menu-btn" aria-label="Close menu" onClick={() => setSheet(false)}>
              Close
              <X size={16} aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="s-wrap flex flex-1 flex-col gap-8 pb-10 pt-2">
            <ul className="flex flex-col">
              {[{ label: copy.home, href: '/' }, ...copy.primary, ...copy.moreItems].map((l, i) => {
                const on = l.href === '/' ? pathname === '/' : isActive(l.href);
                return (
                  <li key={l.href} className="border-b border-white/10" style={{ ['--i' as string]: i }}>
                    <Link href={l.href} aria-current={on ? 'page' : undefined} className={cn('flex items-center justify-between py-3.5 text-[24px] font-[450] tracking-[-0.035em]', on && 'text-[var(--s-orange2)]')}>
                      {l.label}
                      <ArrowUpRight size={18} aria-hidden className="opacity-50" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-3">
              <a href={copy.register.href} className="s-btn w-full !justify-between">
                {copy.register.label}
                <span className="s-btn-ic" aria-hidden>
                  <ArrowUpRight size={18} strokeWidth={2.2} />
                </span>
              </a>
              <a href={copy.demo.href} className="s-btn ghost no-ic w-full justify-center">
                {copy.demo.label}
              </a>
              <a href={copy.login.href} className="py-2 text-center text-[15px] font-medium text-white/70">
                {copy.login.label}
              </a>
            </div>
            <LanguageSelect />
            <ThemeSelect className="self-start" />
            <p className="text-[12px] leading-relaxed text-white/55">
              <span className="font-semibold text-white/75">Risk warning:</span> {RISK_WARNING}
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
