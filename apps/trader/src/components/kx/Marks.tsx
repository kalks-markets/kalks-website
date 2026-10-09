import { useId } from 'react';

/** The three section marks (arrow, ring, plus) drawn white → light blue so they read on the blue field. Hover animates them via CSS. */
export function Mark({ k }: { k: 'arrow' | 'ring' | 'plus' }) {
  const id = useId().replace(/:/g, '');
  const grad = `kxm-${id}`;
  return (
    <svg className="kx-mark" data-k={k} viewBox="0 0 76 76" aria-hidden>
      <defs>
        <linearGradient id={grad} x1="8" y1="68" x2="68" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c9d8ff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <g>
        {k === 'arrow' && (
          <path d="M14 62 L60 16 M28 15 H61 V48" fill="none" stroke={`url(#${grad})`} strokeWidth="9" strokeLinecap="butt" strokeLinejoin="miter" />
        )}
        {k === 'ring' && <circle cx="38" cy="38" r="22" fill="none" stroke={`url(#${grad})`} strokeWidth="11" />}
        {k === 'plus' && <path d="M38 12 V64 M12 38 H64" fill="none" stroke={`url(#${grad})`} strokeWidth="10" />}
      </g>
    </svg>
  );
}
