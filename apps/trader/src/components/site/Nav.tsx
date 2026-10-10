'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, Building2, ChevronDown, Copy, LifeBuoy, Menu, Network, Smartphone, Users, X } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { NAV_MORE, NAV_PRIMARY } from '@/content/site';
import { ANDROID_APP, RISK_WARNING } from '@/content/facts';
import { DEMO_HREF, LOGIN_HREF, REGISTER_HREF } from '@/lib/crm';
import { LanguagePicker, LanguageSelect } from '@/components/chrome/LanguagePicker';
import { cn } from '@/lib/cn';

const ICONS: Record<string, JSX.Element> = {
  copy: <Copy size={18} aria-hidden />,
  partners: <Network size={18} aria-hidden />,
  academy: <BookOpen size={18} aria-hidden />,
  whitelabel: <Building2 size={18} aria-hidden />,
  about: <Users size={18} aria-hidden />,
  help: <LifeBuoy size={18} aria-hidden />,
};

/**
 * Site navigation (Formix / RAZE references): the white wordmark, the page links in one frosted pill (the current
 * page filled cream), "More" opens a panel, then language, Log in and the orange "Open account" pill. Phones get a
 * full-screen menu.
 */
export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [more, setMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    setSheet(false);
    setMore(false);
  }, [pathname]);
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
    const onDoc = (e: MouseEvent) => !moreRef.current?.contains(e.target as Node) && setMore(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMore(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [more]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <header className="s-nav" data-scrolled={scrolled || more}>
        <div className="s-wrap s-nav-bar">
          <Link href="/" aria-label="Kalks home" className="me-auto flex h-12 items-center rounded-full px-1 lg:me-0">
            <Wordmark className="h-[22px] w-auto text-white" title="Kalks" />
          </Link>

          <nav aria-label="Main" className="s-pill mx-auto hidden lg:flex">
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
              Home
            </Link>
            {NAV_PRIMARY.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}>
                {l.label}
                {l.tag && <span className="rounded-full bg-[var(--s-orange)] px-1.5 py-px text-[10px] font-bold uppercase text-white">{l.tag}</span>}
              </Link>
            ))}
            <div ref={moreRef} className="relative">
              <button type="button" aria-expanded={more} aria-haspopup="true" onClick={() => setMore((v) => !v)}>
                More <ChevronDown size={14} aria-hidden className={cn('transition-transform duration-200', more && 'rotate-180')} />
              </button>
              {more && (
                <div className="s-mega">
                  {NAV_MORE.map((l) => (
                    <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[rgba(242,96,12,0.14)] text-[var(--s-orange2)]">{ICONS[l.icon]}</span>
                      <span className="flex flex-col">
                        <b className="text-[14.5px] font-semibold text-white">{l.label}</b>
                        <small className="text-[12.5px] text-white/55">{l.note}</small>
                      </span>
                    </Link>
                  ))}
                  <Link href="/platforms/android" className="col-span-2 mt-1 !items-center !bg-[var(--s-orange)] !text-white hover:!bg-[var(--s-orange2)]">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[var(--s-orange)]">
                      <Smartphone size={18} aria-hidden />
                    </span>
                    <span className="flex flex-col">
                      <b className="text-[14.5px] font-semibold">Kalks for Android</b>
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

          <div className="flex items-center gap-2 lg:ms-0">
            <LanguagePicker className="hidden lg:block" />
            <a href={LOGIN_HREF} className="hidden h-11 items-center rounded-full px-4 text-[14px] font-semibold text-white/90 hover:text-white lg:inline-flex">
              Log in
            </a>
            <a href={REGISTER_HREF} className="s-btn sm">
              Open account
              <span className="s-btn-ic" aria-hidden>
                <ArrowUpRight size={15} strokeWidth={2.2} />
              </span>
            </a>
            <button type="button" className="grid size-11 place-items-center rounded-full border border-white/25 bg-black/20 backdrop-blur-md lg:hidden" aria-label="Open menu" aria-expanded={sheet} aria-controls="site-menu" onClick={() => setSheet(true)}>
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {sheet && (
        <div id="site-menu" className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-[var(--s-black)]" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-[76px] flex-none items-center justify-between px-5">
            <Link href="/" aria-label="Kalks home">
              <Wordmark className="h-[22px] w-auto text-white" title="Kalks" />
            </Link>
            <button type="button" className="grid size-11 place-items-center rounded-full border border-white/25" aria-label="Close menu" onClick={() => setSheet(false)}>
              <X size={20} aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-8 px-5 pb-10 pt-2">
            <ul className="flex flex-col">
              {[{ label: 'Home', href: '/' }, ...NAV_PRIMARY, ...NAV_MORE].map((l) => {
                const on = l.href === '/' ? pathname === '/' : isActive(l.href);
                return (
                  <li key={l.href} className="border-b border-white/10">
                    <Link href={l.href} aria-current={on ? 'page' : undefined} className={cn('flex items-center justify-between py-3.5 text-[24px] font-[450] tracking-[-0.035em]', on && 'text-[var(--s-orange2)]')}>
                      {l.label}
                      <ArrowUpRight size={18} aria-hidden className="opacity-50" />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-3">
              <a href={REGISTER_HREF} className="s-btn no-ic justify-center">
                Open account
              </a>
              <a href={DEMO_HREF} className="s-btn ghost no-ic justify-center">
                Try the demo
              </a>
              <a href={LOGIN_HREF} className="py-2 text-center text-[15px] font-medium text-white/70">
                Log in
              </a>
            </div>
            <LanguageSelect />
            <p className="text-[12px] leading-relaxed text-white/55">
              <span className="font-semibold text-white/75">Risk warning:</span> {RISK_WARNING}
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
