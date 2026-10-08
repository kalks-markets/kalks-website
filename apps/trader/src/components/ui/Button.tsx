import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export type BtnVariant = 'red' | 'yel' | 'ink' | 'wht' | 'ghost' | 'buy';
export type BtnSize = 32 | 40 | 48 | 56;

/**
 * NeoPOP button (KALKS2 §5) rendered as a link. One saturated action per panel: `red` for the main action,
 * `ink` for strong secondary, `ghost` for the rest, `yel` for highlights, `wht` on photos and red surfaces.
 * Same-site pages use next/link; sign-in / sign-up (/auth/* redirects), downloads, mail and other sites are plain
 * anchors so the browser follows the redirect or the file.
 */
export function Btn({
  href,
  children,
  v = 'ink',
  s = 40,
  arrow = false,
  round = false,
  block = false,
  className,
  label,
  download,
}: {
  href: string;
  children?: ReactNode;
  v?: BtnVariant;
  s?: BtnSize;
  arrow?: boolean;
  round?: boolean;
  block?: boolean;
  className?: string;
  /** aria-label, required for icon-only (round) buttons */
  label?: string;
  download?: boolean;
}) {
  const cls = cn('btn', s !== 40 && `s${s}`, v !== 'ink' && `v-${v}`, round && 'round', block && 'block', className);
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden strokeWidth={2} />}
    </>
  );
  const plain = /^(https?:|mailto:|tel:)/.test(href) || href.startsWith('/auth/') || href.startsWith('/download/') || download;
  if (plain) {
    return (
      <a href={href} className={cls} aria-label={label} download={download || undefined}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={label}>
      {inner}
    </Link>
  );
}

/** A decorative round NeoPOP arrow for whole-card links (the card is the link). */
export function RoundArrow({ s = 48, className }: { s?: 40 | 48; className?: string }) {
  return (
    <span className={cn('btn round', s === 48 && 's48', className)} aria-hidden>
      <ArrowRight strokeWidth={2} />
    </span>
  );
}
