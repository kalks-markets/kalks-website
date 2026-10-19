'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteImage } from '@/lib/content';

/**
 * Screenshots replaced in the content service (page "global", slots shots.<key>), already merged over their
 * defaults by the root layout: key in SHOTS / PSHOTS → image. The client Shot components look their key up here.
 */
const Shots = createContext<Record<string, SiteImage>>({});

export function ContentProvider({ shots, children }: { shots: Record<string, SiteImage>; children: ReactNode }) {
  return <Shots.Provider value={shots}>{children}</Shots.Provider>;
}

export const useShotOverrides = () => useContext(Shots);
