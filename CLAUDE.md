# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CreatiCalc (creaticalc.com) is a free suite of calculators for content creators on YouTube, Instagram, and TikTok. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. Charts use Recharts. Deployed on Netlify.

## Business Goals

The primary goal of CreatiCalc is to generate passive income through ad revenue, with a potential freemium model in the future. All design and development decisions should be made with this in mind:

- **SEO is a top priority.** Organic search traffic is the main growth lever. Every page should be optimized for discoverability: meaningful metadata, structured data (JSON-LD), keyword-rich headings, FAQ sections, and fast load times.
- **Ad placement.** Pages should be structured to support ad slots in high-visibility positions without degrading user experience. Keep content-to-ad ratio reasonable to maintain search ranking.
- **User engagement and retention.** Calculators should be genuinely useful and encourage return visits, social sharing, and backlinks. More time on site and more pages per session increase ad impressions.
- **Freemium readiness.** Architect features so that premium tiers (e.g., advanced analytics, export, saved calculations) can be gated later without major refactoring.
- **Page speed and Core Web Vitals.** Google ranks fast sites higher, and ad networks pay more for performant pages. Minimize bundle size, lazy-load non-critical components, and optimize images.

## Commands

```bash
npm run dev            # Start dev server (localhost:3000)
npm run build          # Production build
npm run lint           # ESLint on src/
npm run format         # Prettier format src/
npm run format:check   # Check formatting without writing
```

CI runs lint, format:check, and build on PRs to `staging`.

## Architecture

### Directory Structure

- `src/app/` — Next.js App Router pages. Calculator routes are grouped under `(calculators)/` route group with a shared layout.
- `src/features/calculators/` — Feature-based calculator modules. Each calculator has its own directory with components, hooks, and a barrel export (`index.ts`). Shared calculator UI lives in `shared/`.
- `src/lib/` — Pure business logic and calculation functions (e.g., `youtubeEarningsModel.ts`).
- `src/components/ui/` — Reusable UI primitives (Card, Slider, NumberInput, Select).
- `src/components/layout/` — Header, Footer, AdSlot.
- `src/components/seo/` — JSON-LD structured data components.

### Key Patterns

**State management:** Complex calculator state uses `useReducer` with discriminated union actions (see `useCalculatorState.ts`). No global state library.

**Business logic separation:** Calculation functions are pure and live in `src/lib/`, not in components. Components import and call these functions.

**Client vs Server components:** Pages and layouts are server components by default. Only interactive components (calculators, inputs) use `'use client'`.

**SEO:** Each page exports a `metadata` object (Next.js Metadata API). Root layout sets title template `'%s | CreatiCalc'`. Calculator pages include `CalculatorSchema` (WebApplication JSON-LD) and FAQ structured data.

**Styling:** Tailwind CSS 4 with inline `@theme` in `globals.css` — no tailwind.config file. Custom CSS variables define the design tokens (primary purple `#6d28d9`, Geist fonts). Use semantic color classes like `text-primary`, `bg-surface`, `border-border`.

### Adding a New Calculator

1. Create route at `src/app/(calculators)/[slug]/page.tsx` — export metadata, define FAQ items, use `CalculatorLayout` wrapper
2. Create feature directory at `src/features/calculators/[name]/` with components and barrel export
3. Add business logic in `src/lib/[name]Model.ts` as pure functions
4. Add navigation links in `Header.tsx` and `Footer.tsx`
5. Add card to homepage calculators array in `src/app/page.tsx`

Use the YouTube Money Calculator (`src/features/calculators/youtube-money/`) as the reference implementation.

## Pre-PR Checklist

Before creating or updating a pull request, always run these commands and fix any issues:

1. `npm run format` — auto-fix Prettier formatting
2. `npm run lint` — ensure no ESLint errors
3. `npm run build` — verify the production build succeeds

## Code Style

- Prettier: single quotes, semicolons, 100-char line width, 2-space indent, trailing commas (ES5)
- File naming: PascalCase for components, camelCase for utilities, kebab-case for routes
- TypeScript strict mode. Use `interface` for object shapes. Unused vars prefixed with `_` are allowed.
- Path alias: `@/*` maps to `src/*`
- Node version: 24 (specified in `.nvmrc`)
