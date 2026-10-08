'use client';

import { useEffect, useRef, useState } from 'react';
import { mid, type QuoteMap } from '@/lib/quotes';

/** Price tick flash (KALKS2 §7): 300 ms of up-soft / dn-soft behind a price that moved. */
export function useFlash(quotes: QuoteMap) {
  const prev = useRef<Record<string, number | undefined>>({});
  const [flash, setFlash] = useState<Record<string, 'up' | 'dn'>>({});
  useEffect(() => {
    const next: Record<string, 'up' | 'dn'> = {};
    for (const [s, q] of Object.entries(quotes)) {
      const m = mid(q);
      const p = prev.current[s];
      if (m !== undefined && p !== undefined && m !== p) next[s] = m > p ? 'up' : 'dn';
      prev.current[s] = m;
    }
    if (!Object.keys(next).length) return;
    setFlash(next);
    const t = window.setTimeout(() => setFlash({}), 320);
    return () => window.clearTimeout(t);
  }, [quotes]);
  return flash;
}
