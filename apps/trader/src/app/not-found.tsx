import Link from 'next/link';
import { Hero } from '@/components/ui/Hero';
import { Btn } from '@/components/ui/Button';
import { NAV_PRIMARY } from '@/content/site';

export default function NotFound() {
  return (
    <>
      <Hero
        tone="yellow"
        compact
        kicker="404 · PAGE NOT FOUND"
        title="This page moved, or never existed."
        lede="The link may be old. Everything Kalks does is one click away below."
        style={{ ['--h1' as string]: 'clamp(40px, 5vw, 72px)', ['--h1-s' as string]: '38px' }}
        actions={
          <>
            <Btn href="/" v="ink" s={56} arrow>
              Go home
            </Btn>
            <Btn href="/options" v="ghost" s={56}>
              Explore options
            </Btn>
          </>
        }
      />
      <section className="sec sec-last">
        <div className="wrap">
          <ul className="flex flex-wrap gap-2">
            {[...NAV_PRIMARY, { label: 'FAQ', href: '/faq' }, { label: 'Help & contact', href: '/contact' }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="chip out">
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
