import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';

export type FaqItem = { q: string; a: ReactNode };

/** Accordion on native <details> (no JavaScript). Emits FAQPage structured data when `schema` is set. */
export function Faq({ items, schema = false }: { items: FaqItem[]; schema?: boolean }) {
  const ld = schema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items
          .filter((i) => typeof i.a === 'string')
          .map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
      }
    : null;
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            {item.q}
            <span className="pm" aria-hidden>
              <Plus size={16} strokeWidth={2} />
            </span>
          </summary>
          <div className="a">{item.a}</div>
        </details>
      ))}
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
    </div>
  );
}
