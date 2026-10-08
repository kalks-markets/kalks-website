# KALKS website

The public KALKS website: landing pages, platforms, markets, education and company pages. It is a Next.js app in `apps/trader` and runs on **port 3010**.

The website has no accounts of its own. Every **Log in**, **Sign up** and **Open account** button takes the visitor to the Kalks Client Area:

| Website link | Goes to |
|---|---|
| Log in (`/auth/login`) | `http://localhost:3000/login` |
| Sign up / Open account (`/auth/register`, keeps `?ref=CODE`) | `http://localhost:3000/register` |
| Reset password (`/auth/reset-password`) | `http://localhost:3000/forgot` |
| Signed-in pages (`/dashboard`, `/wallet`, …) | `http://localhost:3000/login` |

The Client Area address comes from `NEXT_PUBLIC_CRM_URL` (default `http://localhost:3000`); set it to the live Client Area domain in production. The links are defined in `apps/trader/src/lib/crm.ts`, and the forwarding is in `apps/trader/next.config.mjs` (redirects) and `apps/trader/src/middleware.ts`.

## Getting started

```bash
npm run install:all      # first time only
npm run dev              # website on http://localhost:3010
```

Other scripts: `build`, `start`, `lint`.

## Environment

Copy the block in [.env.example](.env.example) to `apps/trader/.env.local`. This file is git-ignored, so a fresh clone has none. Without it, `next dev` falls back to the white-label defaults in `src/lib/brand.ts` and shows the name "Bullza".

## Design and content

The site follows the **Kalks 2** style sheet (`docs/design/KALKS2.md` in the platform repo): tokens for light and dark
in `apps/trader/src/app/globals.css` (theme follows the device, with an Auto / Light / Dark switch in the menu and
footer), Tailwind colour names mapped to the same tokens, NeoPOP buttons (`components/ui/Button.tsx`), the solid-colour
page hero (`components/ui/Hero.tsx`) and the composed hero subjects (`components/art/HeroArt.tsx`).

- **Numbers** come only from `apps/trader/src/content/facts.ts`; re-check it against the live platform before a
  campaign (instrument counts: `https://trade.kalkstrade.com/api/engine/symbols`).
- **Copy deck**: `docs/design/WEBSITE-COPY.md` in the platform repo.
- **Imagery**: `node scripts/k2-images.mjs` builds `public/images/k2/*` (AVIF + WebP + OG JPEG) from the founder's
  sources; images are never drawn larger than their native pixels (`--dpr`, `.px-cap`).
- **Icons**: `node scripts/k2-icons.mjs` (favicon, apple-touch icon, PWA icons).
- **Fonts**: Archivo and JetBrains Mono are self-hosted, instanced to the axis ranges the site uses
  (`src/app/fonts/LICENSE.md`); Instrument Sans and the locale fallbacks come from `next/font/google`.
