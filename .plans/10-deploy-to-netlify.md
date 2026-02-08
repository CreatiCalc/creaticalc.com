# Step 10: Final QA, Production Deploy & SEO Launch

## Goal
Do a final quality check, deploy to production, and kick off the SEO/monetization pipeline.

## Project context
- **Project:** `C:\Users\titom\Projects\creaticalc` — a Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 site
- **Repo:** https://github.com/titomb345/creaticalc
- **Hosting:** Netlify (already connected to repo, deploys from `main` branch)
- **Domain:** creaticalc.com (already connected to Netlify, DNS configured via Squarespace)
- **DNS:** A record → 75.2.60.5, CNAME www → creaticalc.netlify.app
- **Branching:** feature branch → PR to `staging` → merge to `main` (triggers Netlify deploy)

## Pre-deploy checklist (run locally)

### 1. Full build verification
```bash
npm run lint && npm run format:check && npm run build
```
- All must pass with zero errors
- Build output should show all pages as `○ (Static)` — fully pre-rendered

### 2. Local QA in dev mode (`npm run dev`)
Test every page:
- [ ] **/** — landing page loads, all calculator links work, SEO copy present
- [ ] **/youtube-money-calculator** — slider works, niche selector updates results, chart renders, FAQ toggles
- [ ] **/instagram-engagement-rate-calculator** — inputs work, engagement rate calculates, rating shows, chart renders
- [ ] **/tiktok-engagement-rate-calculator** — all 5 inputs work, views-based formula correct, chart renders
- [ ] **/youtube-subscriber-projector** — both growth modes work, period toggles update chart, milestones display
- [ ] **/about** — content renders, internal links work
- [ ] **/privacy** — content renders
- [ ] **/sitemap.xml** — valid XML, lists all pages
- [ ] **/robots.txt** — valid, points to sitemap

### 3. Mobile responsiveness
- Open Chrome DevTools → toggle device toolbar
- Check each calculator page at 375px width (iPhone SE) and 768px (tablet)
- Ensure: no horizontal scroll, inputs are tappable, charts resize, text is readable

### 4. Lighthouse audit
Run Lighthouse in Chrome DevTools (Incognito mode) on:
- Landing page
- YouTube Money Calculator (the heaviest page with chart)
- Target: 90+ on Performance, SEO, Accessibility, Best Practices
- Common fixes if needed: add `alt` to images, ensure color contrast, lazy-load charts

## Deploy to production

### 5. Merge to main
- Ensure all feature branches have been merged to `staging`
- Create PR: `staging` → `main`
- Merge — this triggers Netlify production deploy
- Verify build succeeds in Netlify dashboard (Build log → should show "Published")

### 6. Verify production site
- Visit https://creaticalc.com — confirm it loads with HTTPS
- Visit https://www.creaticalc.com — confirm redirect works
- Spot-check 2-3 calculator pages on production
- View source on landing page — confirm meta tags and JSON-LD are in the HTML

## Post-deploy SEO setup (manual steps — these are instructions, not code)

### 7. Google Search Console
1. Go to https://search.google.com/search-console
2. Add property → Domain → `creaticalc.com`
3. Verify ownership via DNS TXT record (add in Squarespace DNS):
   - Type: TXT, Host: @, Value: (Google will provide this)
4. Once verified, submit sitemap: `https://creaticalc.com/sitemap.xml`
5. Request indexing for the landing page and all 4 calculator pages

### 8. Google AdSense application
1. Go to https://www.google.com/adsense
2. Sign up / add new site → `creaticalc.com`
3. Google requires: privacy policy (done), sufficient content (done — 8+ pages), original content (done)
4. Approval typically takes 1-2 weeks
5. Once approved: replace `<AdSlot>` placeholder components with real AdSense `<ins>` tags
   - The AdSlot component is at `src/components/layout/AdSlot.tsx`
   - It's used in `src/features/calculators/shared/CalculatorLayout.tsx` (header + below-results slots)

### 9. Analytics setup
- **Option A:** Enable Netlify Analytics in dashboard ($9/mo — server-side, no cookies)
- **Option B:** Add Google Analytics (free — add GA4 script to `src/app/layout.tsx`)
- **Option C:** Add Plausible or similar privacy-friendly analytics

## Post-launch monitoring
- Check Google Search Console daily for the first week (indexing status, coverage issues)
- Monitor Netlify build logs for any deployment issues
- Check site speed on https://pagespeed.web.google.com
- First organic traffic typically appears 2-4 weeks after indexing

## Success criteria
- All pages accessible and functional on production
- HTTPS working with valid certificate
- Sitemap submitted to Google Search Console
- Lighthouse scores 90+ across all categories
- No console errors in browser DevTools on production
