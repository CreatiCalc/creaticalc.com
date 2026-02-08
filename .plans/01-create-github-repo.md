# Step 1: Create GitHub Repo & Initial Push

## Goal
Create the GitHub repository, make the initial commit, and push the scaffolded project.

## Tasks

1. **Create `.gitignore`** — verify the existing one covers Next.js (node_modules, .next, out, etc.)
2. **Create `.nvmrc`** — match your other projects' pattern (Node >= 24)
3. **Create the GitHub repo** — `gh repo create creaticalc --public --source=. --remote=origin`
4. **Create `staging` branch** — to match your billbergquist.com / sportsshortcuts.com branching strategy (PRs target `staging`, Netlify deploys from `main`)
5. **Initial commit & push** — commit all scaffolded code and push to `main`

## Notes
- Repo name: `creaticalc` (matches project/domain name)
- Public repo (needed for free GitHub Actions minutes, and there's no sensitive code)
- Branching strategy: `main` (production) ← `staging` (PR target) ← feature branches
