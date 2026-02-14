import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/features/calculators/shared/FAQ';
import AdSlot from '@/components/layout/AdSlot';
import { BenchmarkTable, PlatformComparisonTable } from '@/features/calculators/engagement-shared';
import { YOY_TRENDS, formatPercent } from '@/lib/engagementModel';
import type { FAQItem } from '@/features/calculators/shared/types';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Engagement Rate Benchmarks 2026 — All Platforms',
  description:
    'Engagement rate benchmarks for 2026 across Instagram, TikTok, Facebook, and X. Compare average rates by follower tier and industry.',
  openGraph: {
    title: 'Engagement Rate Benchmarks 2026 — All Platforms',
    description:
      'Full engagement rate benchmark data for 2026 by follower tier, industry, and platform.',
    url: '/engagement-rate-benchmarks',
  },
  alternates: {
    canonical: '/engagement-rate-benchmarks',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How are these engagement rate benchmarks calculated?',
    answer:
      'Our benchmarks are compiled from publicly available industry research, platform data, and analysis of engagement patterns across thousands of creator accounts. We update the data annually to reflect current trends. The averages account for all follower sizes within each tier and industry.',
  },
  {
    question: 'Why are TikTok engagement rates so much higher than Instagram?',
    answer:
      "TikTok's algorithm aggressively surfaces content to interested users regardless of follower count, the auto-play video format creates a more immersive experience, and the double-tap-to-like mechanic reduces friction. Combined, these factors result in engagement rates roughly 5x higher than Instagram's. This is a platform-level difference, not a content quality difference.",
  },
  {
    question: 'What is a good engagement rate for my niche?',
    answer:
      'A good engagement rate depends on your platform, follower count, and industry. In general, if your rate is above the average for your follower tier on your platform, you are performing well. Use our Instagram, TikTok, Facebook, or X (Twitter) calculators to get a personalized assessment that accounts for your specific situation.',
  },
  {
    question: 'Are engagement rates going up or down?',
    answer:
      'Instagram engagement rates have been slowly declining year-over-year as the platform matures — from 1.16% in 2023 to 0.98% in 2026. TikTok rates have been increasing, rising from 4.07% in 2023 to 4.9% in 2026. Facebook engagement is recovering slightly to 0.065% in 2026 after years of decline. X (Twitter) continues to decline, dropping to approximately 0.03% in 2026 — down roughly 80% since 2021.',
  },
  {
    question: 'How often do you update these benchmarks?',
    answer:
      'We update our benchmark data annually at the beginning of each year. The current data reflects 2026 averages. Previous years are included in our year-over-year trend tables so you can track how the landscape is evolving.',
  },
  {
    question: 'Why do smaller accounts have higher engagement rates?',
    answer:
      'Smaller accounts have higher engagement rates because they tend to have a more concentrated, personally connected audience. When you have 5,000 followers, a larger percentage of them are genuinely interested in your content and will interact with each post. As accounts grow, they attract more casual followers who are less likely to engage, naturally diluting the engagement rate. This is a well-documented pattern across all social media platforms.',
  },
];

export default function EngagementRateBenchmarksPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Engagement Rate Benchmarks 2026',
    'description':
      'Complete engagement rate benchmarks for Instagram, TikTok, Facebook, and X (Twitter) in 2026 by follower tier and industry.',
    'url': `${SITE_URL}/engagement-rate-benchmarks`,
  };

  const latestTrend = YOY_TRENDS[YOY_TRENDS.length - 1];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Engagement Rate Benchmarks', path: '/engagement-rate-benchmarks' },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-gradient-brand text-3xl font-bold md:text-4xl">
            Engagement Rate Benchmarks 2026
          </h1>
          <p className="mt-3 text-muted">
            Comprehensive engagement rate benchmarks for Instagram, TikTok, Facebook, and X
            (Twitter). See how your account compares by follower tier, industry, and platform.
          </p>
          <div
            className="mx-auto mt-5 h-1 w-36 rounded-full"
            style={{ background: 'var(--gradient-brand-vibrant)' }}
            aria-hidden="true"
          />
        </div>

        <AdSlot slot="header" className="mb-8" />

        {/* Key stats */}
        <section className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-foreground">
              {formatPercent(latestTrend.instagram)}
            </p>
            <p className="mt-1 text-sm text-muted">Instagram Average (2026)</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-foreground">
              {formatPercent(latestTrend.tiktok)}
            </p>
            <p className="mt-1 text-sm text-muted">TikTok Average (2026)</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-foreground">
              {formatPercent(latestTrend.facebook)}
            </p>
            <p className="mt-1 text-sm text-muted">Facebook Average (2026)</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6 text-center shadow-sm">
            <p className="text-3xl font-bold text-foreground">
              {formatPercent(latestTrend.twitter)}
            </p>
            <p className="mt-1 text-sm text-muted">X (Twitter) Average (2026)</p>
          </div>
        </section>

        {/* Instagram benchmarks */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Instagram Benchmarks</h2>
          <p className="mb-4 text-sm text-muted">
            Use the{' '}
            <Link
              href="/instagram-engagement-rate-calculator"
              className="font-medium text-primary hover:underline"
            >
              Instagram Engagement Rate Calculator
            </Link>{' '}
            for a personalized analysis of your account.
          </p>
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <BenchmarkTable platform="instagram" />
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* TikTok benchmarks */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">TikTok Benchmarks</h2>
          <p className="mb-4 text-sm text-muted">
            Use the{' '}
            <Link
              href="/tiktok-engagement-rate-calculator"
              className="font-medium text-primary hover:underline"
            >
              TikTok Engagement Rate Calculator
            </Link>{' '}
            for a personalized analysis of your account.
          </p>
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <BenchmarkTable platform="tiktok" />
          </div>
        </section>

        {/* Facebook benchmarks */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Facebook Benchmarks</h2>
          <p className="mb-4 text-sm text-muted">
            Use the{' '}
            <Link
              href="/facebook-engagement-rate-calculator"
              className="font-medium text-primary hover:underline"
            >
              Facebook Engagement Rate Calculator
            </Link>{' '}
            for a personalized analysis of your page.
          </p>
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <BenchmarkTable platform="facebook" />
          </div>
        </section>

        {/* Twitter benchmarks */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">X (Twitter) Benchmarks</h2>
          <p className="mb-4 text-sm text-muted">
            Use the{' '}
            <Link
              href="/twitter-engagement-rate-calculator"
              className="font-medium text-primary hover:underline"
            >
              X (Twitter) Engagement Rate Calculator
            </Link>{' '}
            for a personalized analysis of your account.
          </p>
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <BenchmarkTable platform="twitter" />
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Platform comparison */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Engagement Rates by Industry Across Platforms</h2>
          <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <PlatformComparisonTable />
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Year-over-year trends */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Year-Over-Year Trends</h2>
          <p className="mb-4 text-sm text-muted">
            How average engagement rates have changed over the past four years.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border bg-white p-6 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="pb-2 pr-4 font-medium">Year</th>
                  <th className="pb-2 pr-4 font-medium">Instagram</th>
                  <th className="pb-2 pr-4 font-medium">TikTok</th>
                  <th className="pb-2 pr-4 font-medium">Facebook</th>
                  <th className="pb-2 font-medium">X (Twitter)</th>
                </tr>
              </thead>
              <tbody>
                {YOY_TRENDS.map((trend) => (
                  <tr key={trend.year} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-foreground">{trend.year}</td>
                    <td className="py-2.5 pr-4 text-muted">{formatPercent(trend.instagram)}</td>
                    <td className="py-2.5 pr-4 text-muted">{formatPercent(trend.tiktok)}</td>
                    <td className="py-2.5 pr-4 text-muted">{formatPercent(trend.facebook)}</td>
                    <td className="py-2.5 text-muted">{formatPercent(trend.twitter)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Improvement tips */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">How to Improve Your Engagement Rate</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              If your engagement rate is below the benchmark for your tier, here are proven
              strategies to improve it:
            </p>

            <h3 className="mt-6 text-lg font-semibold text-foreground">For Instagram</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Post consistently 4-7 times per week at peak audience activity times</li>
              <li>
                Use carousels and Reels — they generate 2-3x more engagement than single images
              </li>
              <li>Ask questions in captions and include clear calls-to-action</li>
              <li>Respond to every comment within the first hour</li>
              <li>Create saveable content (tips, tutorials, reference guides)</li>
              <li>Collaborate with creators in your niche through collabs and features</li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-foreground">For TikTok</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Hook viewers in the first 1 second with a surprising visual or bold statement</li>
              <li>Keep videos concise — 7-15 seconds for maximum completion rate</li>
              <li>Use trending sounds while they are still rising</li>
              <li>Post 1-3 times daily during peak hours</li>
              <li>Create shareable content (&ldquo;send this to someone who...&rdquo; formats)</li>
              <li>Respond to comments with video replies to boost the algorithm signal</li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-foreground">For Facebook</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Focus on photo and album posts — they earn 35% more engagement than text posts
              </li>
              <li>Go live regularly — Facebook Live videos generate 6x more interactions</li>
              <li>Build and engage with Facebook Groups to foster community discussions</li>
              <li>Ask questions and run polls to prompt meaningful comments</li>
              <li>Share native video instead of external links to get better algorithmic reach</li>
              <li>Post 3-5 times per week at peak hours for your audience</li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-foreground">For X (Twitter)</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Post frequently — 3-5 tweets daily, including threads for deeper engagement</li>
              <li>Use images and videos to increase visibility in the algorithmic feed</li>
              <li>Engage in trending conversations and use relevant hashtags sparingly</li>
              <li>Quote-tweet and reply to others in your niche to build community presence</li>
              <li>Create bookmark-worthy content like tips, data, and reference threads</li>
              <li>Post during high-activity windows (8-10 AM, 12-1 PM, 5-6 PM)</li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/instagram-engagement-rate-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Check your Instagram rate
            </Link>
            <Link
              href="/tiktok-engagement-rate-calculator"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Check your TikTok rate
            </Link>
            <Link
              href="/facebook-engagement-rate-calculator"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Check your Facebook rate
            </Link>
            <Link
              href="/twitter-engagement-rate-calculator"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Check your X (Twitter) rate
            </Link>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-surface p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Turn Your Engagement Into Sponsorship Revenue
            </h3>
            <p className="mt-2 text-sm text-muted">
              Know your engagement rate? Use our sponsorship calculators to find out how much you
              should charge for brand deals.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/instagram-sponsorship-rate-calculator"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                Instagram Sponsorship Rates
              </Link>
              <Link
                href="/tiktok-sponsorship-rate-calculator"
                className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                TikTok Sponsorship Rates
              </Link>
            </div>
          </div>
        </section>

        <AdSlot slot="below-results" className="mb-8" />

        <FAQ items={faq} />
      </div>
    </>
  );
}
