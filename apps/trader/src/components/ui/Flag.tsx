/**
 * Round market badges for prices (sample flags): currency flags, metals, energies, indices and coins.
 * Flat drawings at 20 × 20, clipped to a circle. Pairs overlap (base in front).
 */
type Code = string;

const C: Record<Code, JSX.Element> = {
  EUR: (
    <>
      <rect width="20" height="20" fill="#1D3E9E" />
      <g fill="#FFD21F">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={+(10 + Math.cos(a) * 5.2).toFixed(3)} cy={+(10 + Math.sin(a) * 5.2).toFixed(3)} r=".95" />;
        })}
      </g>
    </>
  ),
  USD: (
    <>
      <rect width="20" height="20" fill="#fff" />
      <g fill="#C8102E">
        {[0, 3.1, 6.2, 9.3, 12.4, 15.5, 18.6].map((y) => (
          <rect key={y} y={y} width="20" height="1.55" />
        ))}
      </g>
      <rect width="10.5" height="10.8" fill="#24337A" />
    </>
  ),
  JPY: (
    <>
      <rect width="20" height="20" fill="#F7F4F2" />
      <circle cx="10" cy="10" r="4.6" fill="#C8102E" />
    </>
  ),
  GBP: (
    <>
      <rect width="20" height="20" fill="#1D3E9E" />
      <path d="M0 0 20 20M20 0 0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0 20 20M20 0 0 20" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M10 0v20M0 10h20" stroke="#fff" strokeWidth="5.5" />
      <path d="M10 0v20M0 10h20" stroke="#C8102E" strokeWidth="3" />
    </>
  ),
  AUD: (
    <>
      <rect width="20" height="20" fill="#1D3E9E" />
      <rect width="10" height="10" fill="#24337A" />
      <path d="M0 5h10M5 0v10" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 5h10M5 0v10" stroke="#C8102E" strokeWidth="1.2" />
      <g fill="#fff">
        <circle cx="14.5" cy="6" r="1" />
        <circle cx="16.5" cy="11" r="1" />
        <circle cx="13" cy="14.5" r="1" />
        <circle cx="5" cy="15" r="1.4" />
      </g>
    </>
  ),
  NZD: (
    <>
      <rect width="20" height="20" fill="#1D3E9E" />
      <rect width="10" height="10" fill="#24337A" />
      <path d="M0 5h10M5 0v10" stroke="#fff" strokeWidth="2.4" />
      <path d="M0 5h10M5 0v10" stroke="#C8102E" strokeWidth="1.2" />
      <g fill="#C8102E" stroke="#fff" strokeWidth=".4">
        <circle cx="14.5" cy="6" r="1.1" />
        <circle cx="16.5" cy="11" r="1.1" />
        <circle cx="13" cy="15" r="1.1" />
      </g>
    </>
  ),
  CAD: (
    <>
      <rect width="20" height="20" fill="#fff" />
      <rect width="5.5" height="20" fill="#C8102E" />
      <rect x="14.5" width="5.5" height="20" fill="#C8102E" />
      <path d="M10 5.2 11 8l1.8-.6-.7 2.6 1.6.2-2.6 2.4.3 1.6H9.6l.3-1.6L7.3 10.2l1.6-.2-.7-2.6L10 8z" fill="#C8102E" />
    </>
  ),
  CHF: (
    <>
      <rect width="20" height="20" fill="#C8102E" />
      <path d="M10 5.5v9M5.5 10h9" stroke="#fff" strokeWidth="2.8" />
    </>
  ),
  XAU: (
    <>
      <rect width="20" height="20" fill="#E8B523" />
      <circle cx="10" cy="10" r="7" fill="none" stroke="#B9850E" strokeWidth="1.2" />
      <text x="10" y="13.3" textAnchor="middle" style={{ fontFamily: 'var(--f-disp)' }} fontWeight="800" fontSize="8.6" fill="#6E4C00">
        Au
      </text>
    </>
  ),
  XAG: (
    <>
      <rect width="20" height="20" fill="#C9C4C2" />
      <circle cx="10" cy="10" r="7" fill="none" stroke="#8E8885" strokeWidth="1.2" />
      <text x="10" y="13.3" textAnchor="middle" style={{ fontFamily: 'var(--f-disp)' }} fontWeight="800" fontSize="8.6" fill="#4A4442">
        Ag
      </text>
    </>
  ),
  OIL: (
    <>
      <rect width="20" height="20" fill="#0B1640" />
      <path d="M10 4.2c2.4 3.2 3.8 5.3 3.8 7.4a3.8 3.8 0 0 1-7.6 0c0-2.1 1.4-4.2 3.8-7.4Z" fill="#F6EEE8" />
    </>
  ),
  BTC: (
    <>
      <rect width="20" height="20" fill="#F2A33A" />
      <text x="10.4" y="14.2" textAnchor="middle" style={{ fontFamily: 'var(--f-disp)' }} fontWeight="800" fontSize="11" fill="#fff">
        ₿
      </text>
    </>
  ),
  ETH: (
    <>
      <rect width="20" height="20" fill="#5B6378" />
      <path d="M10 3.6 6.3 10 10 12.2 13.7 10Z M10 13 6.3 10.8 10 16.4 13.7 10.8Z" fill="#fff" />
    </>
  ),
  IDX: (
    <>
      <rect width="20" height="20" fill="#0B1640" />
      <path d="M4.5 13.5 8 9.5l2.6 2.2 4.9-5.2" fill="none" stroke="#A9C3F3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  STK: (
    <>
      <rect width="20" height="20" fill="#1F3FD6" />
      <rect x="5" y="9" width="2.6" height="6" rx=".6" fill="#F6EEE8" />
      <rect x="8.7" y="6" width="2.6" height="9" rx=".6" fill="#F6EEE8" />
      <rect x="12.4" y="7.5" width="2.6" height="7.5" rx=".6" fill="#F6EEE8" />
    </>
  ),
};

function Disc({ code, size }: { code: Code; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden className="flex-none" style={{ clipPath: 'circle(50%)' }}>
      {C[code] ?? C.IDX}
    </svg>
  );
}

/** Which badges a symbol shows. */
export function badgesFor(symbol: string, cls?: string): Code[] {
  const s = symbol.toUpperCase();
  if (s.startsWith('XAU')) return ['XAU'];
  if (s.startsWith('XAG')) return ['XAG'];
  if (/OIL|WTI|BRENT|NGAS/.test(s)) return ['OIL'];
  if (s.startsWith('BTC')) return ['BTC'];
  if (s.startsWith('ETH')) return ['ETH'];
  if (cls === 'crypto') return ['BTC'];
  if (cls === 'indices' || /^(US30|NAS100|SPX500|GER40|UK100|JP225|HK50)$/.test(s)) return ['IDX'];
  if (cls === 'stocks' || /^(AAPL|TSLA|NVDA|META|NFLX)$/.test(s)) return ['STK'];
  if (/^[A-Z]{6}$/.test(s)) {
    const a = s.slice(0, 3);
    const b = s.slice(3);
    if (C[a] && C[b]) return [a, b];
  }
  return ['IDX'];
}

export function Badges({ symbol, cls, size = 22 }: { symbol: string; cls?: string; size?: number }) {
  const codes = badgesFor(symbol, cls);
  if (codes.length === 1) return <Disc code={codes[0]} size={size} />;
  return (
    <span className="relative flex flex-none" style={{ width: size * 1.55, height: size }} aria-hidden>
      <span className="absolute right-0 top-0">
        <Disc code={codes[1]} size={size} />
      </span>
      <span className="absolute left-0 top-0 rounded-full shadow-[0_0_0_2px_var(--ring,var(--s1))]">
        <Disc code={codes[0]} size={size} />
      </span>
    </span>
  );
}
