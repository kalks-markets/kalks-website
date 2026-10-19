'use client';

import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { THEME_EVENT, applyTheme, readThemeMode, type ThemeMode } from '@/lib/theme';
import { cn } from '@/lib/cn';

const MODES: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { mode: 'auto', label: 'Auto', Icon: Monitor },
  { mode: 'light', label: 'Light', Icon: Sun },
  { mode: 'dark', label: 'Dark', Icon: Moon },
];
const NEXT: Record<ThemeMode, ThemeMode> = { auto: 'light', light: 'dark', dark: 'auto' };
const SAYS: Record<ThemeMode, string> = { auto: 'Auto, follows your device', light: 'Light', dark: 'Dark' };

/** The choice THEME_BOOT applied, kept in sync between the nav button and the phone menu's switch. */
function useThemeMode(): [ThemeMode | null, (m: ThemeMode) => void] {
  // null until mounted: the server can't know the choice, so nothing choice-specific renders before hydration
  const [mode, setMode] = useState<ThemeMode | null>(null);
  useEffect(() => {
    setMode(readThemeMode());
    const on = (e: Event) => setMode((e as CustomEvent<ThemeMode>).detail);
    window.addEventListener(THEME_EVENT, on);
    return () => window.removeEventListener(THEME_EVENT, on);
  }, []);
  return [mode, applyTheme];
}

/** Nav bar (wide screens): one round button that steps Auto → Light → Dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const [mode, set] = useThemeMode();
  const cur = MODES.find((m) => m.mode === (mode ?? 'auto'))!;
  return (
    <button
      type="button"
      className={cn('grid size-11 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/10 hover:text-white', className)}
      aria-label={`Theme: ${SAYS[mode ?? 'auto']}. Switch to ${MODES.find((m) => m.mode === NEXT[mode ?? 'auto'])!.label}`}
      title={`Theme: ${SAYS[mode ?? 'auto']}`}
      onClick={() => set(NEXT[mode ?? 'auto'])}
    >
      <cur.Icon size={18} aria-hidden className={cn('transition-opacity', mode === null && 'opacity-0')} />
    </button>
  );
}

/** Phone menu and footer: Auto / Light / Dark side by side. */
export function ThemeSelect({ className }: { className?: string }) {
  const [mode, set] = useThemeMode();
  return (
    <div className={cn('s-theme', className)} role="group" aria-label="Theme">
      {MODES.map(({ mode: m, label, Icon }) => (
        <button key={m} type="button" aria-pressed={mode === m} onClick={() => set(m)}>
          <Icon size={15} aria-hidden /> {label}
        </button>
      ))}
    </div>
  );
}
