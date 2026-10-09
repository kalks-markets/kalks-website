'use client';

import Link from 'next/link';
import { Photo } from './Photo';
import type { PhotoKey } from '@/content/photos';

export type AccountCard = {
  id: string;
  name: string;
  big: string;
  bigLabel: string;
  line: string;
  bio: string;
  photo: PhotoKey;
  href: string;
  soon?: boolean;
};

/** Accounts as photo cards: the founder's photo, the key number over a dark scrim, details sliding up on hover. */
export function AccountCards({ cards }: { cards: AccountCard[] }) {
  return (
    <ul className="kx-cards">
      {cards.map((c) => (
        <li key={c.id}>
          <Link href={c.href} className="kx-hcard">
            <div className="kx-plate">
              <Photo k={c.photo} sizes="(max-width: 900px) 46vw, 252px" />
              <span className="kx-scrim" aria-hidden />
              <p className="kx-plate-big">
                {c.big}
                <small>{c.bigLabel}</small>
              </p>
              <p className="kx-bio">{c.bio}</p>
            </div>
            <h3>
              {c.name}
              {c.soon && <span className="kx-soon">Coming soon</span>}
            </h3>
            <p>{c.line}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
