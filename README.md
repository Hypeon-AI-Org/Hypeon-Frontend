# Hypeon Frontend

The public marketing website for Hypeon AI, served at [hypeon.ai](https://hypeon.ai).

It is a Next.js application using the App Router. It is a marketing site only: it renders the
product, solutions, services, pricing and blog pages, plus two small API routes for the
competitor report email and the email unsubscribe flow. The signed-in product lives on a
separate domain and in a separate repository, and this site links out to it.

## Requirements

- Node.js 20.9 or higher. The locked Next.js 16 release requires it. The `engines` field in
  `package.json` still says 18 and understates the real minimum.
- npm. The committed lockfile is `package-lock.json`. The `packageManager` field in
  `package.json` names yarn 1.22.22, but there is no `yarn.lock`, and that inconsistency is
  not yet resolved.

## Install and run

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

To build and serve a production bundle locally:

```bash
npm run build
npm start
```

The site renders without any environment variables. Only the two API routes need
configuration, and they fail with a clear error rather than breaking the pages. See
[Environment variables](#environment-variables).

### Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server on port 3000, using webpack, with the Node heap raised to 8 GB |
| `npm run build` | Production build, with the Node heap raised to 8 GB |
| `npm start` | Serves the production build |
| `npm run lint` | Declared but not functional: `next lint` was removed in Next.js 16 and the repository has no ESLint configuration |

Both the `dev` and `build` scripts set the heap size through `NODE_OPTIONS`, using `cross-env`.

## Deployment

Vercel builds this repository. The default branch is `hypeon-2`. A `main` branch also exists,
but it is a stale ancestor of `hypeon-2` and is not the default, so do not branch from it or
target it.

Releasing is two steps, and merging is only the first:

1. Every push, including a push to `hypeon-2`, produces a Preview deployment. Preview URLs are
   behind Vercel sign-in, so a request from outside returns the Vercel login page with HTTP
   200, not the site. Do not treat a 200 from a preview URL as proof that a page works.
2. Production at hypeon.ai changes only when a maintainer promotes the `hypeon-2` deployment to
   Production in Vercel. Until then the live site keeps serving the previous build.

Changes go through a pull request rather than a direct push:

1. Branch off `hypeon-2`.
2. Open a pull request against `hypeon-2`.
3. Check the Vercel preview while signed in. Open the pages your change touches and confirm the
   browser network panel shows no new failed image or media requests compared with production.
4. Merge once the preview looks right, then promote that deployment in Vercel.
5. After promoting, load the live site and confirm the change is there. Rolling back is
   promoting the previous Production deployment again, which takes effect at once.

Never push straight to `hypeon-2` and never force push it.

## Environment variables

Names only. Values belong in the Vercel project settings, or in a local `.env.local`, which is
git ignored. Nothing here has a committed value.

### Unsubscribe route (`src/app/api/unsubscribe`)

| Variable | Read in | Purpose |
|---|---|---|
| `DATABASE_URL` | `src/lib/unsubscribeDb.ts` | Postgres connection string. The module creates the `unsubscribes` table and its index on first use. The matching DDL is kept for reference in `sql/unsubscribes.sql`. |

### Competitor report route (`src/app/api/competitor-report`)

All of the following are read in `src/app/api/competitor-report/route.ts`.

| Variable | Purpose |
|---|---|
| `SMTP_HOST` | Outbound mail host |
| `SMTP_PORT` | Outbound mail port. Defaults to 587 when unset |
| `SMTP_USER` | Outbound mail username |
| `SMTP_PASS` | Outbound mail password |
| `MAIL_FROM` | From address on the report email |
| `MAIL_TO` | Optional BCC address that receives a copy of each report |
| `SITE_URL` | Absolute base URL used to build the preview image URL in the email. A localhost or private network address is ignored, and the route falls back to the request origin and then to the public site origin |
| `NEXT_PUBLIC_SITE_URL` | Same purpose as `SITE_URL`, and takes precedence over it |
| `APP_SIGNUP_URL` | Sign-up link in the email. Falls back to the public app login URL |
| `NEXT_PUBLIC_APP_SIGNUP_URL` | Fallback for `APP_SIGNUP_URL` |
| `COMPETITOR_REPORT_PREVIEW_IMAGE_PATH` | Site relative path of the preview image in the email |
| `COMPETITOR_REPORT_PREVIEW_IMAGE_URL` | Fully qualified preview image URL. Overrides the path above |
| `COMPETITOR_REPORT_FACEBOOK_PAGE_URL` | Optional link included in the email |

`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` and `MAIL_FROM` are required for this route. Without
them it returns HTTP 503 and sends nothing. The preview image is loaded by the recipient's mail
client, so it only displays when the resolved image URL is publicly reachable.

## Tech stack

Versions are the ones declared in `package.json`. The exact resolved versions are in
`package-lock.json`.

- Next.js 16 with the App Router, React 18, TypeScript 5
- Tailwind CSS 3, PostCSS, Autoprefixer, `tailwindcss-animate`
- Framer Motion for animation, Lenis for smooth scrolling, a hand rolled
  IntersectionObserver in `src/components/ScrollRevealSetup.tsx` for scroll reveals
- Lucide React for icons, Inter through `next/font/google`, Material Symbols Outlined from
  Google Fonts
- Nodemailer for the report email, `postgres` for the unsubscribe list
- Deployed on Vercel

## Project layout

```
assets/                  Brand and partner logos imported as ES modules, no stable public URL
public/                  Static files served at the site root
  about/ ads/ cards/ carousel/ hero/ images/ logos/ sig/ team/ ugc video/ wallism/
sql/
  unsubscribes.sql       Reference DDL for the unsubscribes table
src/
  app/                   App Router
    layout.tsx           Root layout, metadata, consent gated tags
    globals.css
    page.tsx             Home
    about/ analytics/ blog/ blog/[slug]/ pricing/ privacy-policy/
    products/ services/ solutions/ studio/ unsubscribe/
    api/competitor-report/route.ts
    api/unsubscribe/route.ts
  components/            Page sections and shared UI, including blog/, services/ and ui/
  context/               React context (page scale)
  lib/                   Data and helpers, including blog.ts and blog-content/ article JSON
next.config.js           Image settings, cache headers, security headers
tailwind.config.js
```

Anything under `public/` is served at the matching URL path. Anything under `assets/` is only
reachable through an ES module import. The build emits it under a hashed file name, so it has
no stable public URL.

`public/sig/` holds email signature images. No page references them: a signature loads its
images by URL from the recipient's mail client, not from the site. Unless it is confirmed that
no signature uses them, treat those URLs as permanent, because removing or renaming a file
would break the images in mail that has already been sent.

`next-env.d.ts` is listed in `.gitignore` but is tracked, and `tsconfig.json` names it in
`include`.

## Analytics and consent

The root layout sets Google Consent Mode defaults to denied for every storage category except
security storage. Google Tag Manager and the Meta Pixel are only injected after the visitor
accepts through the cookie banner, handled by `src/components/CookieBanner.tsx`,
`GtmOnConsent.tsx` and `MetaPixelOnConsent.tsx`. The container and pixel identifiers are
public values that ship in the page HTML by design.

## Notice

Copyright Hypeon Technologies FZ-LLC. All rights reserved.

The source is visible for transparency. It is not licensed for reuse, redistribution or
derivative works. `package.json` therefore declares `UNLICENSED`.
