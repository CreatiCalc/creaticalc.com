# Step 3: Set Up Netlify Deployment

## Goal
Configure Netlify to build and deploy the Next.js site, connected to the GitHub repo.

## Tasks

1. **Create `netlify.toml`** adapted for Next.js (different from your Vite projects):
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [build.environment]
     NODE_VERSION = "24"
   ```
   - No SPA redirect needed — Next.js handles routing via the Netlify Next.js runtime
   - Publish directory is `.next` (not `dist` like Vite projects)

2. **Install `@netlify/plugin-nextjs`** — Netlify's official Next.js adapter
   - `npm install -D @netlify/plugin-nextjs`
   - Add to `netlify.toml`:
     ```toml
     [[plugins]]
       package = "@netlify/plugin-nextjs"
     ```

3. **Connect repo to Netlify** (manual step — done in Netlify dashboard):
   - Log into Netlify → "Add new site" → "Import an existing project"
   - Connect the `creaticalc` GitHub repo
   - Production branch: `main`
   - Deploy previews: enabled for PRs
   - Build command and publish dir will be auto-detected from `netlify.toml`

4. **Connect custom domain** (manual step):
   - In Netlify dashboard → Domain settings → Add custom domain → `creaticalc.com`
   - Update DNS in Squarespace to point to Netlify (either Netlify DNS or CNAME)
   - Enable HTTPS (auto via Let's Encrypt)

## Differences from your Vite projects
- Uses `@netlify/plugin-nextjs` instead of SPA redirects
- Publish dir is `.next` instead of `dist`
- Next.js handles SSG/routing natively — no `[[redirects]]` needed
