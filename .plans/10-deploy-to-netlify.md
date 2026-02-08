# Step 10: Deploy to Netlify & Go Live

## Goal
Deploy the site to production on Netlify, connect domain, and set up monitoring.

## Tasks

1. **Final build check** — `npm run build` passes locally with no errors
2. **Push to `main`** — trigger Netlify deploy
3. **Verify Netlify build** — check build logs in Netlify dashboard
4. **Connect custom domain** (manual — Netlify dashboard):
   - Add `creaticalc.com` as custom domain
   - Configure DNS in Squarespace:
     - Option A: Point nameservers to Netlify DNS
     - Option B: Add CNAME record pointing to Netlify site URL
   - Enable HTTPS (automatic via Let's Encrypt)
5. **Verify production site** — all pages load, calculators work, charts render
6. **Submit to Google Search Console**:
   - Verify domain ownership (DNS TXT record or HTML file)
   - Submit sitemap.xml
7. **Set up analytics** — add Netlify Analytics or a lightweight alternative (Plausible, etc.)
8. **Mobile responsiveness check** — test all pages on mobile viewport
9. **Lighthouse audit** — target 90+ on Performance, SEO, Accessibility, Best Practices

## Post-launch
- Monitor Google Search Console for indexing
- Apply for Google AdSense once pages are indexed (usually takes 1-2 weeks)
- Replace AdSlot placeholders with real AdSense code upon approval
