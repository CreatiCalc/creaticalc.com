# Step 9: Privacy Policy, About Page, Sitemap, Robots.txt

## Goal
Add required legal/SEO pages for AdSense eligibility and search engine optimization.

## Tasks

1. **Privacy Policy page** (`/privacy`)
   - Required for Google AdSense approval
   - Cover: data collection (analytics), cookies (ads), third-party services
   - Can use a standard template adapted for our use case

2. **About page** (`/about`)
   - Brief description of CreatiCalc
   - Why we built it
   - Adds content depth for AdSense approval (Google wants 10-15 pages of content)

3. **Sitemap configuration**
   - Next.js can auto-generate sitemap.xml via `app/sitemap.ts`
   - Include all calculator pages, landing page, about, privacy
   - Set appropriate `changeFrequency` and `priority` values

4. **Robots.txt**
   - Next.js can auto-generate via `app/robots.ts`
   - Allow all crawlers, point to sitemap URL

5. **Verify meta tags** — spot-check that every page has unique title + description

## Notes
- These pages are mostly static content — quick to build
- Important for AdSense: Google requires a privacy policy and "sufficient content"
