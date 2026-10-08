'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { THEME_KEY, type ThemeMode } from '@/lib/theme';

/** Auto (follows the OS) · Light · Dark. The choice is remembered on this device. */
export function ThemeSwitch({ className }: { className?: string }) {
  const [mode, setMode] = useState<ThemeMode>('auto');

  useEffect(() => {
    const a = document.documentElement.getAttribute('data-theme');
    setMode(a === 'light' || a === 'dark' ? a : 'auto');
  }, []);

  const pick = (m: ThemeMode) => {
    setMode(m);
    const root = document.documentElement;
    if (m === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', m);
    try {
      if (m === 'auto') localStorage.removeItem(THEME_KEY);
      else localStorage.setItem(THEME_KEY, m);
    } catch {
      /* storage blocked: the choice lasts for this page view */
    }
  };

  return (
    <div className={`seg sm ${className ?? ''}`} role="group" aria-label="Theme">
      <button type="button" aria-pressed={mode === 'auto'} onClick={() => pick('auto')}>
        Auto
      </button>
      <button type="button" aria-pressed={mode === 'light'} onClick={() => pick('light')} aria-label="Light">
        <Sun aria-hidden />
      </button>
      <button type="button" aria-pressed={mode === 'dark'} onClick={() => pick('dark')} aria-label="Dark">
        <Moon aria-hidden />
      </button>
    </div>
  );
}
