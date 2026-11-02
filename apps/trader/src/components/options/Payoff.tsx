/**
 * The strategy templates as product shots (founder 2026-11-01, references: a tablet held up against a flat red backdrop,
 * its black screen in big red type; a laptop on a black rock against a red gradient): a tablet resting on a black rock
 * against the site's black → ember → Kalks orange (the inner pages' one theme), rendered offline (three.js) with the
 * site's font and wordmark. Its screen shows the strategy, its
 * outlook, the number of legs, its payoff at expiry (white where it makes money, red where it loses, dashed breakeven;
 * schematic, not to scale) and the legs of Kalks Trader's template.
 */
export function Payoff({ name, className }: { name: string; className?: string }) {
  if (!STRATEGY_NOTES[name]) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/site/options/strategy-${name.toLowerCase().replace(/ /g, '-')}.webp`}
      alt={`A tablet showing the ${name.toLowerCase()} and its payoff at expiry: white where it makes money, red where it loses.`}
      width={1280}
      height={853}
      loading="lazy"
      decoding="async"
      className={className}
    />
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
