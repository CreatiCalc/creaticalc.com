# CreatiCalc

[CreatiCalc](https://creaticalc.com) is a free suite of online calculators for content creators on YouTube, Instagram, TikTok, Facebook, and X (Twitter). Estimate your earnings, calculate engagement rates, find sponsorship pricing, and project subscriber growth -- all free, instant, and with no sign-up required.

## Calculators

### YouTube

- **YouTube Money Calculator** -- Estimate how much YouTubers earn based on views, CPM, and content niche. Includes growth modeling, seasonality adjustments, and sponsorship rate estimates.
- **YouTube Shorts Money Calculator** -- Find out how much YouTube Shorts pay. Estimate Shorts revenue based on views, RPM, and the Shorts monetization model.
- **YouTube Subscriber Growth Projector** -- Project your YouTube subscriber growth over time and see when you will hit key milestones like 1K, 10K, and 100K subscribers.

### Instagram

- **Instagram Engagement Rate Calculator** -- Calculate your Instagram engagement rate and benchmark it against industry averages.
- **Instagram Sponsorship Rate Calculator** -- Find out how much to charge for sponsored posts, Reels, Stories, and carousels based on your followers, engagement rate, and niche.

### TikTok

- **TikTok Engagement Rate Calculator** -- Measure your TikTok engagement rate using views, likes, comments, and shares.
- **TikTok Sponsorship Rate Calculator** -- Calculate how much to charge for sponsored TikTok videos, Stories, and Lives based on your followers, engagement, and niche.

### Facebook

- **Facebook Engagement Rate Calculator** -- Calculate your Facebook Page engagement rate using reactions, comments, and shares. Compare against page benchmarks by follower tier and industry.

### X (Twitter)

- **X (Twitter) Engagement Rate Calculator** -- Measure your X engagement rate using likes, replies, reposts, and bookmarks. Compare against benchmarks by follower tier and industry.

### Multi-Platform

- **Engagement Rate Calculator** -- All-in-one engagement rate calculator for Instagram and TikTok. Compare against industry benchmarks and get personalized recommendations.
- **Engagement Rate Benchmarks** -- Complete engagement rate benchmark data. See average rates by follower tier, industry, and platform for Instagram and TikTok.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router)
- **UI Library:** [React](https://react.dev) 19
- **Language:** [TypeScript](https://www.typescriptlang.org) (strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) 4
- **Charts:** [Recharts](https://recharts.org) 3
- **Linting:** [ESLint](https://eslint.org) 9 with `eslint-config-next` and `eslint-config-prettier`
- **Formatting:** [Prettier](https://prettier.io)
- **Deployment:** [Netlify](https://www.netlify.com) (via `@netlify/plugin-nextjs`)
- **Fonts:** [Geist](https://vercel.com/font) (Sans and Mono, loaded via `next/font`)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 24 (version specified in `.nvmrc`)
- npm (comes with Node.js)

### Installation

```bash
git clone <repository-url>
cd creaticalc.com
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Pages auto-update as you edit files.

## Scripts

| Command                | Description                                    |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | Start the development server on localhost:3000 |
| `npm run build`        | Create a production build                      |
| `npm start`            | Serve the production build locally             |
| `npm run lint`         | Run ESLint on `src/`                           |
| `npm run format`       | Auto-format `src/` files with Prettier         |
| `npm run format:check` | Check formatting without writing changes       |

## Project Architecture

### Directory Structure

```
src/
  app/                          # Next.js App Router pages
    (calculators)/              # Route group for calculator pages (shared layout)
      youtube-money-calculator/
      youtube-shorts-money-calculator/
      youtube-subscriber-projector/
      instagram-engagement-rate-calculator/
      instagram-sponsorship-rate-calculator/
      tiktok-engagement-rate-calculator/
      tiktok-sponsorship-rate-calculator/
      facebook-engagement-rate-calculator/
      twitter-engagement-rate-calculator/
      engagement-rate-calculator/
      engagement-rate-benchmarks/
    about/
    privacy/
    api/
  features/calculators/         # Feature-based calculator modules
    youtube-money/              # Reference implementation
    youtube-growth/
    instagram-engagement/
    instagram-sponsorship/
    tiktok-engagement/
    tiktok-sponsorship/
    facebook-engagement/
    twitter-engagement/
    engagement-shared/
    sponsorship-shared/
    shared/                     # Shared calculator UI (CalculatorLayout, etc.)
  lib/                          # Pure business logic and calculation functions
    youtubeEarningsModel.ts
    subscriberGrowthModel.ts
    engagementModel.ts
    sponsorshipModel.ts
    shareCodec.ts
    engagementShareCodec.ts
    nichePageData.ts
    siteConfig.ts               # Shared constants (SITE_NAME, SITE_URL, etc.)
  components/
    ui/                         # Reusable UI primitives (Card, Slider, NumberInput, Select, etc.)
    layout/                     # Header, Footer, MobileNav, AdSlot
    seo/                        # JSON-LD structured data (CalculatorSchema, BreadcrumbSchema)
    brand/                      # Logo
```

### Key Patterns

- **Server and Client Components:** Pages and layouts are server components by default. Only interactive components (calculators, inputs) use the `'use client'` directive.
- **State Management:** Complex calculator state uses `useReducer` with discriminated union actions. No global state library.
- **Business Logic Separation:** Calculation functions are pure and live in `src/lib/`, not in components. Components import and call these functions.
- **SEO:** Each page exports a `metadata` object via the Next.js Metadata API. The root layout uses a title template (`%s | CreatiCalc`). Calculator pages include JSON-LD structured data (`CalculatorSchema`) and FAQ sections.
- **Styling:** Tailwind CSS 4 with inline `@theme` in `globals.css` (no `tailwind.config` file). Custom CSS variables define design tokens. Semantic color classes like `text-primary`, `bg-surface`, and `border-border` are used throughout.
- **Path Alias:** `@/*` maps to `src/*`.

## Code Style

- Prettier: single quotes, semicolons, 100-character line width, 2-space indent, trailing commas (ES5)
- File naming: PascalCase for components, camelCase for utilities, kebab-case for routes
- TypeScript strict mode; `interface` for object shapes; unused variables prefixed with `_` are allowed

## CI

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on pull requests to the `staging` branch. It executes:

1. `npm run lint`
2. `npm run format:check`
3. `npm run build`

## Deployment

The site is deployed on Netlify. Configuration is in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `.next`
- Uses `@netlify/plugin-nextjs` for Next.js support
- HSTS headers are enabled
- `www.creaticalc.com` redirects to `creaticalc.com` (301)
