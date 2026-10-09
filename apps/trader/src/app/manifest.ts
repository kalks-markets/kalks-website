import type { MetadataRoute } from 'next';
import { BRAND_NAME } from '@/lib/brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME}: options on forex, CFDs and prop trading`,
    short_name: BRAND_NAME,
    description: 'Kalks FX Options, CFDs, prop challenges, copy trading and PAMM. One USDT wallet funds them all.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#2447e0',
    theme_color: '#2447e0',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
