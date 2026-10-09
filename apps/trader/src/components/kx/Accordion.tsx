'use client';

import { useState, type ReactNode } from 'react';

/** FAQ: one answer open at a time, unfolding smoothly; plus turns to minus. */
export function Accordion({ items, first = true }: { items: { q: string; a: ReactNode }[]; first?: boolean }) {
  const [open, setOpen] = useState<number | null>(first ? 0 : null);
  return (
    <div className="kx-faq">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.q} className="kx-faq-item" data-open={on ? '' : undefined}>
            <h3 className="m-0">
              <button type="button" className="kx-faq-q" aria-expanded={on} aria-controls={`kx-faq-${i}`} id={`kx-faq-q-${i}`} onClick={() => setOpen(on ? null : i)}>
                {it.q}
                <span className="kx-pm" aria-hidden />
              </button>
            </h3>
            <div className="kx-more" id={`kx-faq-${i}`} role="region" aria-labelledby={`kx-faq-q-${i}`}>
              <div>
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
