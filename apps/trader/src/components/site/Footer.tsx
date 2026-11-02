import Link from 'next/link';
import { ArrowUpRight, Smartphone } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { LanguagePicker } from '@/components/chrome/LanguagePicker';
import { ThemeSelect } from '@/components/chrome/ThemeToggle';
import { ANDROID_APP } from '@/content/facts';
import { FOOTER_COPY, NAV_COPY } from '@/content/site';
import { BRAND_COPYRIGHT, BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import type { FooterCopy } from '@/lib/content';
import { CRM_URL, TRADER_URL } from '@/lib/crm';

/** site links go through Link; hand-offs (/auth/*), files and other sites are plain anchors */
const plain = (href: string) => href.startsWith('/auth/') || href.startsWith('/download/') || /^(https?:|mailto:)/.test(href);

/**
 * Footer (founder 2026-11-02, after his reference): the wordmark, one line, the Android app as a badge beside the main
 * button and the support address on the left; the site map in columns on the right; then the risk warning and the
 * restricted regions as full-width small print, the legal links, and the bottom bar with language and theme.
 * `copy` is FOOTER_COPY merged with the content service by the root layout.
 */
export default function Footer({ copy = FOOTER_COPY }: { copy?: FooterCopy }) {
  return (
    <footer className="s-foot">
      <div className="s-wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <Wordmark className="h-[24px] w-auto text-white" />
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-white/65">{copy.tagline}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/platforms/android" className="s-foot-badge">
                <Smartphone size={22} strokeWidth={1.8} aria-hidden />
                <span>
                  <small>
                    APK · {ANDROID_APP.sizeMb} MB
                  </small>
                  {NAV_COPY.android}
                </span>
              </Link>
              <a href={copy.cta.href} className="s-btn sm">
                {copy.cta.label}
                <span className="s-btn-ic" aria-hidden>
                  <ArrowUpRight size={15} strokeWidth={2.2} />
                </span>
              </a>
            </div>
            <a href={`mailto:${BRAND_SUPPORT_EMAIL}`} className="text-[14px] font-medium text-white/70 hover:text-white">
              {BRAND_SUPPORT_EMAIL}
            </a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {copy.columns.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 text-[13px] font-semibold text-white">{col.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {plain(l.href) ? (
                        <a href={l.href} className="text-[14px] text-white/62 transition-colors hover:text-white">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="text-[14px] text-white/62 transition-colors hover:text-white">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* the small print, full width, as the reference sets it */}
        <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 text-[12.5px] leading-relaxed text-white/52">
          <p>
            <b className="font-semibold text-white/85">{copy.riskTitle}.</b> {copy.risk}
          </p>
          <p>
            <b className="font-semibold text-white/85">{copy.restrictedTitle}.</b> {copy.restricted}{' '}
            <Link href={copy.restrictedLink.href} className="text-white/80 underline decoration-white/30 underline-offset-2 hover:text-white">
              {copy.restrictedLink.label}
            </Link>
          </p>
        </div>

        <nav aria-label="Legal" className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
          {copy.legal.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] text-white/58 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/50 lg:flex-row lg:items-center lg:justify-between">
          <p>{BRAND_COPYRIGHT}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={CRM_URL} className="hover:text-white">
              Client Area
            </a>
            <a href={TRADER_URL} className="hover:text-white">
              Kalks Trader
            </a>
            <LanguagePicker className="[&_.pop]:bottom-[calc(100%+10px)] [&_.pop]:top-auto [&_.pop]:max-w-[calc(100vw-48px)]" />
            <ThemeSelect />
          </div>
        </div>
      </div>
    </footer>
  );
}
