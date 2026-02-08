# Step 2: Add GitHub CI Workflow

## Goal
Add a CI workflow matching the pattern used in billbergquist.com and sportsshortcuts.com, adapted for Next.js.

## Tasks

1. **Create `.github/workflows/ci.yml`** with the following pipeline:
   - Trigger: pull requests to `staging`
   - Steps: checkout → setup Node (from `.nvmrc`) → `npm ci` → `npm run lint` → `npm run build`
   - Note: skipping `npm run test` for now since no tests exist yet (add later)

2. **Verify ESLint works** — run `npm run lint` locally to confirm it passes before committing

## Workflow (adapted from your other projects)

```yaml
name: CI

on:
  pull_request:
    branches: [staging]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## Differences from your other projects
- No `npm run test` step (yet) — will add when tests are written
- `npm run build` runs `next build` instead of `tsc && vite build`
