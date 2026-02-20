---
name: lighthouse
description: Run a Lighthouse audit on a URL or the local dev server
argument-hint: "[URL or path, e.g. https://creaticalc.com or /youtube-money-calculator]"
disable-model-invocation: true
---

Run a Lighthouse performance audit and report the results.

Steps:

1. Determine the target URL:
   - If the user provided a full URL in `$ARGUMENTS`, use that directly.
   - If the user provided a path (e.g. `/youtube-money-calculator`), prepend `https://creaticalc.com`.
   - If no argument was provided, audit `https://creaticalc.com`.

2. Set up a temp directory that works on Windows (avoids EPERM errors):
   ```bash
   export TMPDIR=$(cygpath -u "$LOCALAPPDATA/Temp")
   ```

3. Run the Lighthouse audit:
   ```bash
   npx lighthouse "$URL" \
     --output=json \
     --output-path="$TMPDIR/lighthouse-report.json" \
     --chrome-flags="--headless --no-sandbox" \
     --only-categories=performance,accessibility,best-practices,seo \
     2>/dev/null
   ```

4. Parse and display the results:
   - Read the JSON report
   - Extract the scores for Performance, Accessibility, Best Practices, and SEO
   - List any failing audits with their descriptions
   - Highlight Core Web Vitals metrics: LCP, FID/INP, CLS

5. Summarize findings:
   - Overall scores (aim for 90+ on all categories)
   - Top 3-5 actionable improvements with estimated impact
   - Any critical issues (red scores, failing CWV)

6. If the user wants to compare multiple pages, they can run `/lighthouse /page1` then `/lighthouse /page2`.

Tips:
- If `npx lighthouse` fails with permission errors, try the TMPDIR fix above
- For local dev server audits, make sure `npm run dev` is running first
- The JSON output gives more detail than the default HTML report
