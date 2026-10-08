'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BookOpen, Building2, ChevronDown, Copy, LifeBuoy, Menu, Network, Smartphone, Users, X, ArrowRight } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { NAV_MORE, NAV_PRIMARY } from '@/content/site';
import { ANDROID_APP, RISK_WARNING } from '@/content/facts';
import { LOGIN_HREF, REGISTER_HREF, DEMO_HREF } from '@/lib/crm';
import { LanguagePicker, LanguageSelect } from '@/components/chrome/LanguagePicker';
import { ThemeSwitch } from '@/components/chrome/ThemeSwitch';
import { cn } from '@/lib/cn';

const ICONS: Record<string, JSX.Element> = {
  copy: <Copy aria-hidden />,
  partners: <Network aria-hidden />,
  academy: <BookOpen aria-hidden />,
  whitelabel: <Building2 aria-hidden />,
  about: <Users aria-hidden />,
  help: <LifeBuoy aria-hidden />,
};

/**
 * Site navigation. Floats over the hero card in the hero's colours (globals.css reads the hero's data-tone with
 * :has()), and turns into a frosted bar in the theme colours once the page scrolls. Hides while scrolling down,
 * returns on the way up. "More" opens the mega menu; phones get a full-screen sheet.
 */
export default function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [more, setMore] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 24);
      if (y > 520 && y > lastY.current + 6) setHidden(true);
      else if (y < lastY.current - 6 || y < 520) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setSheet(false);
    setMore(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSheet(false);
        setMore(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [sheet]);

  useEffect(() => {
    if (!more) return;
    const onDoc = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMore(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [more]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const moreActive = NAV_MORE.some((l) => isActive(l.href));

  return (
    <>
      <header className={cn('nav', (solid || more) && 'is-solid', hidden && !more && 'is-hidden')}>
        <div className="nav-in">
          <Link href="/" aria-label="Kalks home" className="flex-none">
            <Wordmark className="h-[30px] w-auto max-md:h-[26px]" title="Kalks" />
          </Link>

          <nav aria-label="Main" className="nav-links">
            {NAV_PRIMARY.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? 'page' : undefined}>
                {l.label}
                {l.tag && <span className="tag new">{l.tag}</span>}
              </Link>
            ))}
            <div ref={moreRef} className="relative">
              <button
                type="button"
                aria-expanded={more}
                aria-haspopup="true"
                onClick={() => setMore((v) => !v)}
                className={cn(moreActive && 'bg-[var(--n-hover)]')}
              >
                More
                <ChevronDown size={16} aria-hidden className={cn('transition-transform duration-200', more && 'rotate-180')} />
              </button>
              {more && (
                <div className="mega">
                  <div className="grid grid-cols-2 gap-1">
                    {NAV_MORE.map((l) => (
                      <Link key={l.href} href={l.href} className="mi" aria-current={isActive(l.href) ? 'page' : undefined}>
                        <span className="ic">{ICONS[l.icon]}</span>
                        <span>
                          <b>{l.label}</b>
                          <small>{l.note}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href="/platforms#mobile"
                      className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[18px] bg-k-yel p-5 text-k-ink"
                    >
                      <span className="font-mono text-[12px] font-semibold tracking-[0.04em] opacity-80">ANDROID · v{ANDROID_APP.version}</span>
                      <span className="d mt-3 block text-[26px] leading-[0.95]">Kalks in your pocket.</span>
                      <span className="mt-4 flex items-center gap-2 text-[14px] font-semibold">
                        Get the app <ArrowRight size={16} aria-hidden />
                      </span>
                      <Smartphone aria-hidden className="absolute right-4 top-4 h-6 w-6 opacity-70" />
                    </Link>
                    <div className="flex items-center justify-between gap-3 rounded-[16px] bg-s2 px-4 py-3">
                      <span className="text-[13px] font-semibold text-tx2">Theme</span>
                      <ThemeSwitch />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="nav-r">
            <LanguagePicker className="lg-only" />
            <a href={LOGIN_HREF} className="nav-lnk lg-only">
              Log in
            </a>
            <a href={REGISTER_HREF} className="btn max-md:!h-9 max-md:!px-3 max-md:!text-[13px]">
              Open account
            </a>
            <button
              type="button"
              className="icb menu-btn"
              aria-label="Open menu"
              aria-expanded={sheet}
              aria-controls="site-menu"
              onClick={() => setSheet(true)}
            >
              <Menu size={22} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {sheet && (
        <div id="site-menu" className="sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-[var(--nav-h)] flex-none items-center justify-between px-[22px] pt-[var(--inset)]">
            <Link href="/" aria-label="Kalks home">
              <Wordmark className="h-[26px] w-auto" title="Kalks" />
            </Link>
            <button type="button" className="icb" aria-label="Close menu" onClick={() => setSheet(false)}>
              <X size={22} aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-8 px-[22px] pb-10 pt-4">
            <ul className="flex flex-col">
              {[...NAV_PRIMARY, ...NAV_MORE].map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={cn('d-wide flex items-center gap-3 py-3.5 text-[24px]', isActive(l.href) && 'text-red-tx')}
                  >
                    {l.label}
                    {l.tag && <span className="tag new">{l.tag}</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <a href={REGISTER_HREF} className="btn v-red s48 block">
                Open account
              </a>
              <a href={DEMO_HREF} className="btn v-ghost s48 block !w-full">
                Try the demo
              </a>
              <a href={LOGIN_HREF} className="py-2 text-center text-[15px] font-semibold text-tx2">
                Log in
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <LanguageSelect />
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-tx2">Theme</span>
                <ThemeSwitch />
              </div>
            </div>
            <p className="text-[12px] leading-relaxed text-tx3">
              <span className="font-semibold text-tx2">Risk warning:</span> {RISK_WARNING}
            </p>
          </nav>
        </div>
      )}
    </>
  );
}
