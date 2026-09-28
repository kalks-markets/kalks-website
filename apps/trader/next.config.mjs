import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
// API proxying is handled by the route handler at src/app/api/v1/[...path]/route.ts.
// Do NOT use rewrites() for /api/v1/* — in standalone mode, Next.js can leak the
// internal gateway URL (http://gateway:8000) to the browser, causing mixed-content
// blocks on HTTPS sites.

const isDev = process.env.NODE_ENV !== 'production';

/* Sign-in and registration live in the Kalks Client Area (see src/lib/crm.ts).
   The website's own /auth/* screens forward there; query strings such as
   ?ref=CODE are kept. */
const CRM_URL = (process.env.NEXT_PUBLIC_CRM_URL || 'http://localhost:3000').replace(/\/$/, '');

/* Vercel builds Next.js natively and does not consume a standalone bundle;
   emitting one there is wasted work and can confuse output detection. Keep
   it for Docker and any self-hosted target. */
const isVercel = Boolean(process.env.VERCEL);

const nextConfig = {
  ...(isVercel ? {} : { output: 'standalone' }),
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  ...(isDev && {
    experimental: {
      staleTimes: { dynamic: 0, static: 0 },
    },
  }),
  webpack: (config) => {
    config.resolve.alias['react-router-dom'] = path.resolve(__dirname, 'src/landing/router-shim.tsx');
    return config;
  },
  /* Turbopack ignores the webpack hook above — duplicate the alias here so
     `next dev --turbo` also resolves react-router-dom to our local shim. */
  turbopack: {
    root: __dirname,
    resolveAlias: {
      'react-router-dom': './src/landing/router-shim.tsx',
    },
  },
  /** Set NEXT_PUBLIC_APP_VERSION at Docker build so each deploy gets new `_next/static` hashes. */
  generateBuildId: async () => {
    const v = process.env.NEXT_PUBLIC_APP_VERSION?.trim();
    if (v) return v.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 48) || 'release';
    /* On Vercel the commit gives every deploy a fresh id. Without it each
       build would reuse the literal 'development' id and browsers would
       serve stale _next/static chunks after a deploy. */
    const sha = process.env.VERCEL_GIT_COMMIT_SHA?.trim();
    if (sha) return sha.slice(0, 12);
    return 'development';
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      { source: '/auth/login', destination: `${CRM_URL}/login`, permanent: false },
      { source: '/auth/register', destination: `${CRM_URL}/register`, permanent: false },
      { source: '/auth/reset-password', destination: `${CRM_URL}/forgot`, permanent: false },
      { source: '/auth/check-email', destination: `${CRM_URL}/login`, permanent: false },
      { source: '/auth/verify-email', destination: `${CRM_URL}/login`, permanent: false },
      { source: '/auth/impersonate', destination: `${CRM_URL}/login`, permanent: false },
    ];
  },
  async headers() {
    if (!isDev) return [];
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
    ];
  },
};

export default nextConfig;
