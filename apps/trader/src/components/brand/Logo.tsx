import { KalksLogo, KalksMark } from './KalksLogo';

/**
 * Brand marks: the original Kalks wordmark and K mark, one colour (currentColor — white on the dark site).
 * `Wordmark` / `KMark` are kept as the names the pages already use.
 */
export function BrandSprite() {
  return null;
}

export function Wordmark({ className, title = 'Kalks' }: { className?: string; title?: string }) {
  return <KalksLogo className={className} title={title} />;
}

export function KMark({ className, title }: { className?: string; title?: string }) {
  return <KalksMark className={className} title={title} />;
}
