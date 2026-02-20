---
name: pr
description: Create a PR for the current changes following the project's branch-based workflow
argument-hint: "[optional branch name or description]"
disable-model-invocation: true
---

Create a PR for the current changes. NEVER commit or push directly to main.

Steps:

1. Run `git status` and `git diff` to understand all current changes (staged and unstaged).
2. Determine a descriptive branch name from the changes. If the user provided an argument, use it as a hint: $ARGUMENTS
3. Create a new branch from the current HEAD.
4. Stage all relevant changes and commit with a detailed conventional-commit message covering all modified files. End the commit message with `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`.
5. Before pushing, run the pre-PR checklist:
   - `npm run format` — auto-fix formatting
   - `npm run lint` — ensure no ESLint errors
   - `npm run build` — verify production build succeeds
   Fix any issues that come up and amend the commit.
6. Load the GitHub token: `export GH_TOKEN=$(tr -d '\r\n' < .envrc-token)`
7. Push the branch with `-u`.
8. Create the PR using `gh pr create` with a thorough title and description. Use the format:

```
gh pr create --title "short title" --body "$(cat <<'EOF'
## Summary
<bullet points describing the changes>

## Test plan
<checklist of testing steps>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

9. Report the PR URL to the user.

Rules:
- NEVER commit directly to `main` or `staging` — always create a feature branch
- Do not push to remote unless the pre-PR checklist passes
- Do not merge the PR — just create it and give the URL
