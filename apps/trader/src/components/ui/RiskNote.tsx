import Link from 'next/link';
import { RISK_WARNING, OPTIONS_RISK } from '@/content/facts';
import { cn } from '@/lib/cn';

/** The platform's risk wording, verbatim (KALKS2 §10 rule 5), next to every product that is sold. */
export function RiskNote({ className, options = false, cfd = true }: { className?: string; options?: boolean; cfd?: boolean }) {
  return (
    <p className={cn('max-w-[110ch] text-[12.5px] leading-relaxed text-tx3', className)}>
      <span className="font-semibold text-tx2">Risk warning:</span> {cfd && RISK_WARNING}
      {options && <> {OPTIONS_RISK}</>}{' '}
      <Link href="/risk-warning" className="link whitespace-nowrap !font-medium">
        Read the risk warning
      </Link>
    </p>
  );
}
