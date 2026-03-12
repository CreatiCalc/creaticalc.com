#!/usr/bin/env node

/**
 * Submit URLs to IndexNow (Bing, Yandex, etc.) for fast indexing.
 *
 * Usage:
 *   node scripts/indexnow.mjs                  # submit all sitemap URLs
 *   node scripts/indexnow.mjs --dry-run        # preview without submitting
 *   node scripts/indexnow.mjs /blog/my-post    # submit specific URL(s)
 */

const SITE_URL = 'https://creaticalc.com';
const API_KEY = '6a66a632586342649b2f088b474f949d';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function fetchSitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Failed to fetch sitemap: ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return urls;
}

async function submitToIndexNow(urls) {
  const body = {
    host: 'creaticalc.com',
    key: API_KEY,
    keyLocation: `${SITE_URL}/${API_KEY}.txt`,
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  return { status: res.status, statusText: res.statusText };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const specificPaths = args.filter((a) => a.startsWith('/'));

  let urls;
  if (specificPaths.length > 0) {
    urls = specificPaths.map((p) => `${SITE_URL}${p}`);
  } else {
    console.log('Fetching sitemap...');
    urls = await fetchSitemapUrls();
  }

  console.log(`Found ${urls.length} URLs to submit.\n`);

  if (dryRun) {
    for (const url of urls) console.log(`  ${url}`);
    console.log('\n(dry run — nothing submitted)');
    return;
  }

  // IndexNow accepts up to 10,000 URLs per request
  const BATCH_SIZE = 10_000;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`Submitting batch of ${batch.length} URLs...`);
    const { status, statusText } = await submitToIndexNow(batch);

    if (status === 200 || status === 202) {
      console.log(`  OK (${status} ${statusText})`);
    } else {
      console.error(`  Failed (${status} ${statusText})`);
      process.exitCode = 1;
    }
  }

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
