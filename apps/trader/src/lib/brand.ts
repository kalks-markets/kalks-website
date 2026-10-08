/**
 * Brand constants. NEXT_PUBLIC_BRAND_* values are inlined at build time (apps/trader/.env.production).
 */

/** Display name. Written "Kalks" in running copy; the wordmark is the SVG logo. */
export const BRAND_NAME = (() => {
  const v = process.env.NEXT_PUBLIC_BRAND_NAME || 'Kalks';
  // The env file carries the wordmark spelling (KALKS); copy reads better in title case.
  return v.toUpperCase() === v ? v.charAt(0) + v.slice(1).toLowerCase() : v;
})();

/** Public web domain (no scheme). */
export const BRAND_DOMAIN = process.env.NEXT_PUBLIC_BRAND_DOMAIN || 'kalkstrade.com';

/** Canonical site URL, used for metadata, sitemap and Open Graph. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || `https://${BRAND_DOMAIN}`).replace(/\/$/, '');

/** Support inbox shown across the site. */
export const BRAND_SUPPORT_EMAIL = process.env.NEXT_PUBLIC_BRAND_SUPPORT_EMAIL || `support@${BRAND_DOMAIN}`;

export const BRAND_COPYRIGHT = `© ${new Date().getFullYear()} ${BRAND_NAME}. All rights reserved.`;
