import Link from 'next/link';
import { NAV_PRIMARY } from '@/content/site';
import { PageHero } from '@/components/site/Heroes';
import { Btn } from '@/components/site/ui';

export default function NotFound() {
  return (
    <>
      <PageHero
        photo={null}
        compact
        eyebrow="404 · Page not found"
        title={
          <>
            This page moved, <span className="text-white/55">or never existed.</span>
          </>
        }
        lead="The link may be old. Everything Kalks does is one click away below."
        actions={
          <>
            <Btn href="/">Go home</Btn>
            <Btn href="/options" variant="ghost" icon={false}>
              Explore options
            </Btn>
          </>
        }
      />
      <section className="s-sec !pt-6">
        <div className="s-wrap">
          <ul className="flex flex-wrap gap-2">
            {[...NAV_PRIMARY, { label: 'FAQ', href: '/faq' }, { label: 'Help & contact', href: '/contact' }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="s-chip !h-10 !px-5 !text-[14px] hover:!border-[var(--s-orange2)] hover:!text-white">
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
