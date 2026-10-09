import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Wordmark } from '@/components/brand/Logo';
import { FooterOcean } from '@/components/kx/FooterOcean';
import { LanguagePicker } from '@/components/chrome/LanguagePicker';
import { FOOTER_COLUMNS, LEGAL_LINKS } from '@/content/site';
import { OPTIONS_RISK, RISK_WARNING } from '@/content/facts';
import { BRAND_COPYRIGHT, BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { CRM_URL, REGISTER_HREF, TRADER_URL } from '@/lib/crm';

/**
 * Footer: black (it covers the arrow field), the white Kalks logo, the site map, the risk warning in the platform's
 * own words, restricted regions, legal links and the language picker, and a calm ocean band at the very bottom of the page.
 */
export default function Footer() {
  return (
    <footer className="kx-foot" data-cover>
      <div className="kx-wrap">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
          <div className="flex flex-col items-start gap-5">
            <Wordmark className="h-[26px] w-auto text-white" />
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-white/70">
              Forex options, CFDs, copy trading and prop challenges, on technology we build ourselves. One USDT wallet funds every account.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={REGISTER_HREF} className="kx-btn blue">
                Open account <ArrowUpRight size={15} aria-hidden />
              </a>
              <a href={`mailto:${BRAND_SUPPORT_EMAIL}`} className="kx-link">
                {BRAND_SUPPORT_EMAIL}
              </a>
            </div>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 text-[12px] font-semibold uppercase tracking-[0.09em] text-[#7f9ff0]">{col.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[14px] text-white/72 transition-colors hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="mb-2 text-[13px] font-semibold text-white/90">Risk warning</h2>
            <p className="text-[12.5px] leading-relaxed text-white/55">
              {RISK_WARNING} {OPTIONS_RISK} Past performance is not a reliable indicator of future results. Nothing on this website is
              investment advice.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-[13px] font-semibold text-white/90">Restricted regions</h2>
            <p className="text-[12.5px] leading-relaxed text-white/55">
              Kalks does not provide services to citizens or residents of the USA, Cuba, Iraq, Myanmar, North Korea and Sudan. Our services
              are not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use
              would be contrary to local law or regulation.{' '}
              <Link href="/restricted-countries" className="text-white/80 underline decoration-white/30 underline-offset-2 hover:text-white">
                Full list
              </Link>
            </p>
          </div>
        </div>

        <nav aria-label="Legal" className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] text-white/60 transition-colors hover:text-white">
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
            <LanguagePicker className="kx-foot-lang [&_.pop]:bottom-[calc(100%+10px)] [&_.pop]:top-auto [&_.pop]:max-w-[calc(100vw-48px)]" />
          </div>
        </div>
      </div>
      <FooterOcean />
    </footer>
  );
}
