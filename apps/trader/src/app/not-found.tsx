import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/kx/PageHero';
import { NAV_PRIMARY } from '@/content/site';

export default function NotFound() {
  return (
    <>
      <PageHero
        short
        kicker="404 · Page not found"
        title="This page moved, or never existed."
        lede="The link may be old. Everything Kalks does is one click away below."
        actions={
          <>
            <Link href="/" className="kx-btn prim lg">
              Go home <ArrowUpRight size={16} aria-hidden />
            </Link>
            <Link href="/options" className="kx-btn ghost lg">
              Explore options
            </Link>
          </>
        }
      />
      <section className="kx-sec last">
        <div className="kx-wrap">
          <ul className="kx-chips">
            {[...NAV_PRIMARY, { label: 'FAQ', href: '/faq' }, { label: 'Help & contact', href: '/contact' }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="kx-chip !h-9 !px-4 !text-[14px]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
