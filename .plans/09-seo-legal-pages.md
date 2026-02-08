# Step 9: Sitemap, Robots.txt & SEO Finalization

## Goal
Add auto-generated sitemap and robots.txt, flesh out the about and privacy pages, and do a final SEO audit of all pages.

## Project context
- **Project:** `C:\Users\titom\Projects\creaticalc` — a Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 site
- **Repo:** https://github.com/titomb345/creaticalc
- **Domain:** https://creaticalc.com
- **Branching:** feature branch → PR to `staging` → merge to `main` (triggers Netlify deploy)
- **Formatting:** Prettier is configured (run `npm run format` after changes). ESLint via `npm run lint`.
- **Key conventions:** single quotes, 100 char line width

## Current state
- **Privacy page** (`src/app/privacy/page.tsx`) — already exists with basic content covering: what we collect, analytics, advertising, cookies, contact
- **About page** (`src/app/about/page.tsx`) — already exists with 2 paragraphs explaining CreatiCalc
- **Sitemap** — does not exist yet
- **Robots.txt** — does not exist yet

## Tasks

### 1. Create `src/app/sitemap.ts` (Next.js auto-generated sitemap)
```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://creaticalc.com';
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/youtube-money-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/instagram-engagement-rate-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/tiktok-engagement-rate-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/youtube-subscriber-projector`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
  ];
}
```

### 2. Create `src/app/robots.ts` (Next.js auto-generated robots.txt)
```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://creaticalc.com/sitemap.xml',
  };
}
```

### 3. Flesh out Privacy Policy page
The current privacy page is basic but functional. Enhance it with:
- A "Last updated" date that's accurate
- Slightly more detail on third-party ad cookies
- A mention of Google Analytics if/when added
- Keep it clean and readable — don't over-lawyer it

### 4. Flesh out About page
The current about page is very thin. Add:
- A "Who we are" section
- A "What we offer" section listing each calculator with a one-liner
- A "Why it's free" section (ad-supported, simple answer)
- Links to each calculator (internal linking helps SEO)
- Don't invent team members or fake a company story — keep it honest

### 5. SEO audit — verify all pages
Spot-check every page to ensure:
- Unique `<title>` tag (not duplicated across pages)
- Unique `<meta name="description">` (not duplicated)
- `<h1>` exists and is unique per page
- JSON-LD structured data present on calculator pages
- OpenGraph tags set (inherited from root layout, verify it works)
- All internal links use `<Link>` from next/link (not `<a>` tags)

## Files to create
- `src/app/sitemap.ts`
- `src/app/robots.ts`

## Files to modify
- `src/app/about/page.tsx` — enhance content
- `src/app/privacy/page.tsx` — minor enhancements

## Verification
1. `npm run lint` passes
2. `npm run format:check` passes (run `npm run format` first)
3. `npm run build` passes
4. Run `npm run dev` and verify:
   - http://localhost:3000/sitemap.xml returns valid XML with all pages
   - http://localhost:3000/robots.txt returns valid robots.txt pointing to sitemap
   - `/about` has richer content with internal links
   - `/privacy` looks complete
5. View source on a few pages — confirm unique titles and descriptions
6. Commit to a feature branch and open PR to `staging`
