'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, Building2, ChevronDown, Copy, LifeBuoy, Menu, Network, Smartphone, Users, X } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { NAV_MORE, NAV_PRIMARY } from '@/content/site';
import { ANDROID_APP, RISK_WARNING } from '@/content/facts';
import { LOGIN_HREF, REGISTER_HREF, DEMO_HREF } from '@/lib/crm';
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
 * Site navigation: the white Kalks logo on the left, the page links in a frosted pill in the middle, language,
 * log in and a white "Open account" on the right. Transparent over the hero, frosted navy once the page scrolls.
 * "More" opens a panel; phones get a full-screen menu.
 */
export default function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [more, setMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
    const onDoc = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMore(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMore(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [more]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const moreActive = NAV_MORE.some((l) => isActive(l.href));

  return (
    <>
      <header className={cn('kx-nav', (solid || more) && 'solid')}>
        <Link href="/" aria-label="Kalks home" className="kx-nav-brand">
          <Wordmark className="h-[24px] w-auto" title="Kalks" />
        </Link>

        <nav aria-label="Main" className="kx-nav-pill">
          {NAV_PRIMARY.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}>
              {l.label}
            </Link>
          ))}
          <div ref={moreRef} className="relative">
            <button type="button" aria-expanded={more} aria-haspopup="true" onClick={() => setMore((v) => !v)} data-on={moreActive ? '' : undefined}>
              More
              <ChevronDown size={14} aria-hidden className={cn('transition-transform duration-200', more && 'rotate-180')} />
            </button>
            {more && (
              <div className="kx-mega">
                <div className="grid grid-cols-2 gap-1">
                  {NAV_MORE.map((l) => (
                    <Link key={l.href} href={l.href} className="kx-mega-i" aria-current={isActive(l.href) ? 'page' : undefined}>
                      <span className="ic">{ICONS[l.icon]}</span>
                      <span>
                        <b>{l.label}</b>
                        <small>{l.note}</small>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link href="/platforms/android" className="kx-mega-app">
                  <Smartphone size={20} aria-hidden />
                  <span>
                    <b>Kalks for Android</b>
                    <small>
                      Version {ANDROID_APP.version} · {ANDROID_APP.sizeMb} MB
                    </small>
                  </span>
                  <ArrowUpRight size={16} aria-hidden className="ml-auto" />
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="kx-nav-r">
          <LanguagePicker className="kx-lg-only" />
          <a href={LOGIN_HREF} className="kx-nav-lnk kx-lg-only">
            Log in
          </a>
          <a href={REGISTER_HREF} className="kx-btn prim sm">
            Open account
          </a>
          <button type="button" className="kx-nav-menu" aria-label="Open menu" aria-expanded={sheet} aria-controls="site-menu" onClick={() => setSheet(true)}>
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </header>

      {sheet && (
        <div id="site-menu" className="kx-sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-[64px] flex-none items-center justify-between px-5">
            <Link href="/" aria-label="Kalks home">
              <Wordmark className="h-[24px] w-auto" title="Kalks" />
            </Link>
            <button type="button" className="kx-nav-menu !flex" aria-label="Close menu" onClick={() => setSheet(false)}>
              <X size={20} aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-8 px-5 pb-10 pt-2">
            <ul className="flex flex-col">
              {[...NAV_PRIMARY, ...NAV_MORE].map((l) => (
                <li key={l.href} className="border-b border-white/10">
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={cn('flex items-center justify-between py-3.5 text-[22px] font-medium tracking-[-0.03em]', isActive(l.href) && 'text-[#a9c3f3]')}
                  >
                    {l.label}
                    <ArrowUpRight size={18} aria-hidden className="opacity-50" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <a href={REGISTER_HREF} className="kx-btn prim lg w-full">
                Open account
              </a>
              <a href={DEMO_HREF} className="kx-btn ghost lg w-full">
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
