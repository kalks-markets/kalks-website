import { K_EDGE_STEPS, K_PATH, REST_PATH } from './paths';

/**
 * Brand marks (KALKS2 §9). The paths live once in <BrandSprite/> (rendered in the root layout) and every logo
 * references them with <use>, so the page carries the long path data only once.
 * Colours come from CSS variables, so a logo follows the surface it sits on:
 *   --kface (K face, default Kalks red) · --kedge (K edge, default Kalks yellow) · --kword ("alks", default currentColor)
 */
export function BrandSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <path id="k-path" d={K_PATH} />
        <path id="k-rest" fillRule="evenodd" d={REST_PATH} />
      </defs>
    </svg>
  );
}

function Edge() {
  return (
    <g style={{ fill: 'var(--kedge, #FFD21F)' }}>
      {K_EDGE_STEPS.map((o) => (
        <use key={o} href="#k-path" x={o} y={o} />
      ))}
    </g>
  );
}

export function Wordmark({ className, title = 'Kalks' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 1990 580" className={className} role="img" aria-label={title}>
      <Edge />
      <use href="#k-path" style={{ fill: 'var(--kface, #D4112A)' }} />
      <use href="#k-rest" style={{ fill: 'var(--kword, currentColor)' }} />
    </svg>
  );
}

export function KMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 690 580"
      className={className}
      {...(title ? { role: 'img', 'aria-label': title } : { 'aria-hidden': true })}
    >
      <Edge />
      <use href="#k-path" style={{ fill: 'var(--kface, #D4112A)' }} />
    </svg>
  );
}
