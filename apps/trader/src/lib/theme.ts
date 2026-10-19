/**
 * Runs in <head> before first paint:
 *  - theme: Auto (the default) follows the device's prefers-color-scheme and keeps following it; Light / Dark are a
 *    visitor's explicit choice, stored in localStorage (THEME_KEY). html[data-theme] always holds the resolved theme
 *    ("light" | "dark", what the CSS reads) and html[data-theme-mode] the choice ("auto" | "light" | "dark").
 *    Without JS there is no attribute and the CSS default, dark, applies.
 *  - --dpr: device pixel ratio, so pictures are never shown larger than their native pixels (KALKS2 §8)
 *  - lang-*: the Google Translate language, for font fallbacks (Cyrillic, Vietnamese, wide scripts); Arabic, Urdu and
 *    Persian also get dir="rtl" so the layout mirrors
 */
export const THEME_KEY = 'kalks-theme';

export type ThemeMode = 'auto' | 'light' | 'dark';

/** the browser bar colour per resolved theme (also the page colour of each theme in site.css) */
export const THEME_COLOR = { light: '#fbf8f4', dark: '#050404' } as const;

export const THEME_BOOT = `(function(){try{var d=document.documentElement;var m=null;try{m=localStorage.getItem('${THEME_KEY}')}catch(e){}if(m!=='light'&&m!=='dark')m='auto';var q=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;var t=function(){return m==='auto'?(q&&q.matches?'dark':'light'):m};d.setAttribute('data-theme',t());d.setAttribute('data-theme-mode',m);if(q){var f=function(){if(d.getAttribute('data-theme-mode')==='auto')d.setAttribute('data-theme',q.matches?'dark':'light')};if(q.addEventListener)q.addEventListener('change',f);else if(q.addListener)q.addListener(f)}var r=function(){d.style.setProperty('--dpr',String(Math.max(1,window.devicePixelRatio||1)))};r();window.addEventListener('resize',r);var g=/(?:^|; )googtrans=([^;]+)/.exec(document.cookie);if(g){var l=(decodeURIComponent(g[1]).split('/')[2]||'en').toLowerCase();if(l!=='en'){d.classList.add('gt-on','lang-'+l.split('-')[0]);if(/^(ar|ur|fa)/.test(l))d.setAttribute('dir','rtl');if(/^(ar|ur|fa|hi|bn|ta|th|zh|ja|ko)/.test(l))d.classList.add('lang-wide')}}}catch(e){}})();`;

/* ── Client helpers (ThemeToggle) ─────────────────────────────────────────── */

/** the visitor's choice, as THEME_BOOT left it on <html> */
export function readThemeMode(): ThemeMode {
  const m = typeof document === 'undefined' ? null : document.documentElement.getAttribute('data-theme-mode');
  return m === 'light' || m === 'dark' ? m : 'auto';
}

export const THEME_EVENT = 'kalks-theme';

/** Store the choice (Auto clears it), resolve it, and repaint at once without transitions. */
export function applyTheme(mode: ThemeMode): void {
  const d = document.documentElement;
  try {
    if (mode === 'auto') localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, mode);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  const dark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  d.classList.add('theme-switching');
  d.setAttribute('data-theme', dark ? 'dark' : 'light');
  d.setAttribute('data-theme-mode', mode);
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', dark ? THEME_COLOR.dark : THEME_COLOR.light));
  requestAnimationFrame(() => requestAnimationFrame(() => d.classList.remove('theme-switching')));
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: mode }));
}
