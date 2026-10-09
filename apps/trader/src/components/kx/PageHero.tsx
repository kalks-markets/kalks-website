import type { ReactNode } from 'react';
import { HeroBg } from './HeroBg';
import { PHOTOS, type PhotoKey } from '@/content/photos';
import type { RemoteKey } from '@/content/remote';

/**
 * The hero of every content page: a full-bleed photo (80–90vh) with the kicker, title, a short line and the calls
 * to action on it over a soft scrim; its bottom fades into the page's blue arrow field, so there is no hard edge.
 * Without a photo yet, the hero is a neutral frosted band.
 */
export function PageHero({
  kicker,
  title,
  lede,
  actions,
  photo,
  children,
  short = false,
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  /** a founder photo (public/images/photos) or a free-licence CDN photo (content/remote.ts) */
  photo?: PhotoKey | RemoteKey | null;
  /** under the copy (e.g. a row of facts) */
  children?: ReactNode;
  /** a lower hero for pages without a photo (legal, FAQ) */
  short?: boolean;
}) {
  return (
    <section className={`kx-ph${short ? ' short' : ''}${photo ? '' : ' empty'}`} aria-labelledby="page-title">
      {photo ? <HeroBg image={photo in PHOTOS ? { local: photo as PhotoKey } : { remote: photo as RemoteKey }} /> : <div className="kx-ph-blank" aria-hidden />}
      <div className="kx-wrap kx-ph-copy">
        {kicker && <span className="kx-kicker">{kicker}</span>}
        <h1 id="page-title" className="kx-ph-title">
          {title}
        </h1>
        {lede && <p className="kx-ph-lede">{lede}</p>}
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        {children}
      </div>
    </section>
  );
}
