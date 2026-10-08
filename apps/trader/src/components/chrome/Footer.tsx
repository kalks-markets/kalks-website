import Link from 'next/link';
import { Wordmark } from '@/components/brand/Logo';
import { Btn } from '@/components/ui/Button';
import { Picture } from '@/components/ui/Picture';
import { ThemeSwitch } from '@/components/chrome/ThemeSwitch';
import { LanguagePicker } from '@/components/chrome/LanguagePicker';
import { FOOTER_COLUMNS, LEGAL_LINKS } from '@/content/site';
import { DEMO, OPTIONS_RISK, RISK_WARNING } from '@/content/facts';
import { BRAND_COPYRIGHT, BRAND_SUPPORT_EMAIL } from '@/lib/brand';
import { CRM_URL, DEMO_HREF, REGISTER_HREF, TRADER_URL } from '@/lib/crm';

/**
 * Footer: ink in both themes (like the Client Area rail). A closing band with the founder's red light beam
 * (image brief W-12), the site map, the risk warning in the platform's own words, legal links, theme and language.
 */
export default function Footer() {
  return (
    <footer className="foot theme-dark">
      <section className="relative isolate overflow-hidden bg-k-ink" aria-labelledby="closing-title">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-[8%] -z-10 flex items-end max-md:right-[-18%]">
          <Picture
            name="/images/brand/footer-beam"
            widths={[736, 490]}
            w={736}
            h={1308}
            alt=""
            sizes="(max-width: 760px) 300px, 420px"
            className="block h-full"
            imgClassName="h-full w-auto object-contain mix-blend-lighten"
          />
        </div>
        <div className="mx-auto flex min-h-[460px] max-w-[1440px] flex-col justify-center gap-7 px-[44px] py-16 max-md:min-h-[420px] max-md:px-[22px] max-md:py-12">
          <span className="kicker !text-k-yel">KALKS</span>
          <h2 id="closing-title" className="d max-w-[12ch] text-[clamp(40px,5vw,72px)] leading-[0.9] tracking-[-0.045em]">
            Start on demo. Trade when ready.
          </h2>
          <p className="max-w-[40ch] text-[17px] leading-[1.45] text-tx2">
            Practise free with {DEMO.defaultBalance} in virtual funds on live prices. Fund with USDT when you are ready.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Btn href={REGISTER_HREF} v="red" s={48} arrow>
              Open account
            </Btn>
            <Btn href={DEMO_HREF} v="ghost" s={48}>
              Try the demo
            </Btn>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] border-t border-line px-[44px] pb-8 pt-14 max-md:px-[22px]">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="flex flex-col gap-5">
            <Wordmark className="h-[34px] w-auto self-start" />
            <p className="max-w-sm text-[14.5px] leading-relaxed text-tx2">
              Kalks FX Options, CFDs on forex, metals, energies, indices and crypto, prop challenges, copy trading and PAMM.
              One wallet funds them all.
            </p>
            <a href={`mailto:${BRAND_SUPPORT_EMAIL}`} className="link self-start text-[14px]">
              {BRAND_SUPPORT_EMAIL}
            </a>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="mb-4 font-mono text-[11.5px] font-semibold uppercase tracking-[0.08em] text-tx3">{col.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[14px] text-tx2 transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 grid gap-6 rounded-[22px] bg-s1 p-6 shadow-[inset_0_0_0_1px_var(--line)] sm:p-7 lg:grid-cols-2 lg:gap-10">
          <div>
            <h2 className="mb-2 text-[13px] font-semibold">Risk warning</h2>
            <p className="text-[12.5px] leading-relaxed text-tx3">
              {RISK_WARNING} {OPTIONS_RISK} Past performance is not a reliable indicator of future results. Nothing on this
              website is investment advice.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-[13px] font-semibold">Restricted regions</h2>
            <p className="text-[12.5px] leading-relaxed text-tx3">
              Kalks does not provide services to citizens or residents of the USA, Cuba, Iraq, Myanmar, North Korea and Sudan.
              Our services are not intended for distribution to, or use by, any person in any country or jurisdiction where such
              distribution or use would be contrary to local law or regulation.{' '}
              <Link href="/restricted-countries" className="link !font-medium text-tx2">
                Full list
              </Link>
            </p>
          </div>
        </div>

        <nav aria-label="Legal" className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-[13px] text-tx2">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 text-[13px] text-tx3 lg:flex-row lg:items-center lg:justify-between">
          <p>{BRAND_COPYRIGHT}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href={CRM_URL}>Client Area</a>
            <a href={TRADER_URL}>Kalks Trader</a>
            <LanguagePicker className="[&_.pop]:bottom-[calc(100%+10px)] [&_.pop]:top-auto [&_.pop]:max-w-[calc(100vw-48px)]" />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
}
