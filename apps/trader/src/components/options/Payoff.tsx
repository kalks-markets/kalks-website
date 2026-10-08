/** Schematic payoff at expiry for the strategy templates (not to scale). y = 30 is break-even. */
const SHAPES: Record<string, string> = {
  'Long call': '0,40 62,40 120,4',
  'Long put': '0,4 58,40 120,40',
  Straddle: '0,4 60,46 120,4',
  Strangle: '0,8 44,40 76,40 120,8',
  'Bull call spread': '0,42 44,42 76,16 120,16',
  'Bear put spread': '0,16 44,16 76,42 120,42',
  'Iron condor': '0,46 22,46 44,20 76,20 98,46 120,46',
  Butterfly: '0,38 40,38 60,10 80,38 120,38',
};

export function Payoff({ name, className }: { name: string; className?: string }) {
  const pts = SHAPES[name];
  if (!pts) return null;
  return (
    <svg viewBox="0 0 120 50" className={className} role="img" aria-label={`${name} payoff at expiry`}>
      <rect x="0" y="0" width="120" height="30" fill="var(--up-soft)" opacity=".55" />
      <rect x="0" y="30" width="120" height="20" fill="var(--dn-soft)" opacity=".55" />
      <line x1="0" y1="30" x2="120" y2="30" stroke="var(--tx3)" strokeDasharray="2 3" strokeWidth="0.8" />
      <polyline points={pts} fill="none" stroke="var(--tx)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export const STRATEGY_NOTES: Record<string, { view: string; d: string }> = {
  'Long call': { view: 'Bullish', d: 'Pays if the price rises past the strike plus what you paid. Risk: the premium.' },
  'Long put': { view: 'Bearish', d: 'Pays if the price falls below the strike minus what you paid. Risk: the premium.' },
  Straddle: { view: 'Big move', d: 'A call and a put at one strike. Pays when the market moves far either way.' },
  Strangle: { view: 'Big move, cheaper', d: 'A call and a put at two strikes. Costs less than a straddle; needs a bigger move.' },
  'Bull call spread': { view: 'Mildly bullish', d: 'Buy a call, sell a higher one. Cheaper than a call alone; the upside is capped.' },
  'Bear put spread': { view: 'Mildly bearish', d: 'Buy a put, sell a lower one. Cheaper than a put alone; the payout is capped.' },
  'Iron condor': { view: 'Range-bound', d: 'Sell a call spread and a put spread. Earns while the price stays in a range.' },
  Butterfly: { view: 'Pinned price', d: 'Pays most if the market settles near the middle strike at expiry.' },
};
