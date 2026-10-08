/** The small payoff sketch on the options product card (sample pcard). */
export function PayoffMini({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none" aria-hidden>
      <path d="M0 92h108L196 8" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 108h200" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeDasharray="4 6" />
      <circle cx="108" cy="92" r="7" fill="#FFD21F" stroke="#D4112A" strokeWidth="3" />
    </svg>
  );
}
