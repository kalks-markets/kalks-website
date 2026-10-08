/**
 * Runs in <head> before first paint:
 *  - theme: Auto follows the OS (no attribute); Light / Dark are stored per visitor and set html[data-theme]
 *  - --dpr: device pixel ratio, so pictures are never shown larger than their native pixels (KALKS2 §8)
 *  - lang-*: the Google Translate language, for font fallbacks (Cyrillic, Vietnamese, wide scripts)
 */
export const THEME_KEY = 'kalks-theme';

export const THEME_BOOT = `(function(){try{var d=document.documentElement;var m=null;try{m=localStorage.getItem('${THEME_KEY}')}catch(e){}if(m==='light'||m==='dark')d.setAttribute('data-theme',m);var r=function(){d.style.setProperty('--dpr',String(Math.max(1,window.devicePixelRatio||1)))};r();window.addEventListener('resize',r);var g=/(?:^|; )googtrans=([^;]+)/.exec(document.cookie);if(g){var l=(decodeURIComponent(g[1]).split('/')[2]||'en').toLowerCase();if(l!=='en'){d.classList.add('gt-on','lang-'+l.split('-')[0]);if(/^(ar|ur|fa|hi|bn|ta|th|zh|ja|ko)/.test(l))d.classList.add('lang-wide')}}}catch(e){}})();`;

export type ThemeMode = 'auto' | 'light' | 'dark';
