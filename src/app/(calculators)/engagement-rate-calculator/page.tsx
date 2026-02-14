import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import FAQ from '@/features/calculators/shared/FAQ';
import AdSlot from '@/components/layout/AdSlot';
import { PlatformComparisonTable } from '@/features/calculators/engagement-shared';
import type { FAQItem } from '@/features/calculators/shared/types';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Engagement Rate Calculator — Free for All Platforms',
  description:
    'Free engagement rate calculator for Instagram, TikTok, Facebook, and X. Compare against benchmarks by follower tier and industry.',
  openGraph: {
    title: 'Engagement Rate Calculator — Free for All Platforms',
    description:
      'Calculate your engagement rate on Instagram, TikTok, Facebook, or X. Compare against benchmarks by follower tier and industry.',
    url: '/engagement-rate-calculator',
  },
  alternates: {
    canonical: '/engagement-rate-calculator',
  },
};

const faq: FAQItem[] = [
  {
    question: 'What is engagement rate?',
    answer:
      'Engagement rate measures how actively your audience interacts with your content, expressed as a percentage. It is calculated by dividing the total interactions (likes, comments, saves, shares) by a baseline metric (followers, reach, or impressions) and multiplying by 100. A higher engagement rate indicates a more active and responsive audience.',
  },
  {
    question: 'How do you calculate engagement rate?',
    answer:
      'The most common formula is: (Total Interactions / Followers) x 100. For Instagram, total interactions include likes, comments, and saves. For TikTok, they include likes, comments, and shares. For Facebook, they include reactions, comments, and shares. For X (Twitter), they include likes, replies, reposts, and bookmarks. Alternative formulas use reach or impressions as the denominator instead of followers for a more precise measure of content performance.',
  },
  {
    question: 'What is a good engagement rate?',
    answer:
      'A good engagement rate depends on the platform and follower count. On Instagram, 1-3% is average, 3-6% is good, and above 6% is excellent. On TikTok, rates are naturally higher: 4-6% is average, 6-10% is good, and above 10% is excellent. Facebook has much lower rates: 0.5-1% is average and above 1.5% is strong. X (Twitter) is the lowest: 0.2-0.5% is average and above 1% is excellent. Smaller accounts typically have higher engagement rates across all platforms.',
  },
  {
    question: 'Why does engagement rate matter?',
    answer:
      'Engagement rate is the primary metric brands use to evaluate creators for partnerships. A high engagement rate indicates an active, loyal audience that is more likely to take action on sponsored content. It is often more important than raw follower count because it measures audience quality rather than quantity.',
  },
  {
    question: 'How do engagement rates compare across platforms?',
    answer:
      "Engagement rates vary dramatically by platform. TikTok leads at ~4.9% average, followed by Instagram at ~0.98%, Facebook at ~0.065%, and X (Twitter) at ~0.03%. These differences are driven by each platform's algorithm, content format, and audience behavior. TikTok's algorithm-driven content distribution and auto-playing video format produce the highest engagement. You should not compare rates directly across platforms without adjusting for these structural differences — use our cross-platform comparison tools for that.",
  },
  {
    question: 'Should I calculate engagement rate by followers, reach, or impressions?',
    answer:
      'Use followers for comparing yourself to other creators and when brands request your engagement rate — it is the industry standard. Use reach to measure how well your content performs among people who actually saw it. Use impressions when you want to understand engagement per total view, including repeat views. Each method has its place depending on your analysis goals.',
  },
];

const platforms = [
  {
    name: 'Instagram',
    href: '/instagram-engagement-rate-calculator',
    description:
      'Calculate your Instagram engagement rate from likes, comments, and saves. Supports follower, reach, and impressions formulas.',
    color: 'from-pink-500 via-purple-500 to-orange-400',
    avgRate: '0.98%',
  },
  {
    name: 'TikTok',
    href: '/tiktok-engagement-rate-calculator',
    description:
      'Calculate your TikTok engagement rate by followers or by views. Compare against TikTok-specific benchmarks.',
    color: 'from-cyan-400 via-pink-500 to-red-500',
    avgRate: '4.9%',
  },
  {
    name: 'Facebook',
    href: '/facebook-engagement-rate-calculator',
    description:
      'Calculate your Facebook page engagement rate from reactions, comments, and shares. Supports follower and reach formulas.',
    color: 'from-blue-500 via-blue-600 to-indigo-500',
    avgRate: '0.065%',
  },
  {
    name: 'X (Twitter)',
    href: '/twitter-engagement-rate-calculator',
    description:
      'Calculate your X engagement rate from likes, replies, reposts, and bookmarks. Supports follower and impressions formulas.',
    color: 'from-sky-400 via-blue-500 to-indigo-400',
    avgRate: '0.03%',
  },
];

export default function EngagementRateCalculatorPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Engagement Rate Calculator',
    'description':
      'Free engagement rate calculator for Instagram, TikTok, Facebook, and X (Twitter). Compare against industry benchmarks.',
    'url': `${SITE_URL}/engagement-rate-calculator`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-gradient-brand text-3xl font-bold md:text-4xl">
            Engagement Rate Calculator
          </h1>
          <p className="mt-3 text-muted">
            Calculate your engagement rate on Instagram, TikTok, Facebook, or X (Twitter). Compare
            against industry benchmarks and get actionable recommendations to grow your account.
          </p>
          <div
            className="mx-auto mt-5 h-1 w-36 rounded-full"
            style={{ background: 'var(--gradient-brand-vibrant)' }}
            aria-hidden="true"
          />
        </div>

        <AdSlot slot="header" className="mb-8" />

        {/* Platform selector cards */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Choose Your Platform</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {platforms.map((p) => (
              <Link key={p.href} href={p.href} className="group">
                <Card className="relative h-full overflow-hidden transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${p.color} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                  />
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold group-hover:text-primary">{p.name}</h3>
                    <span className="text-xs text-muted">Avg: {p.avgRate}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{p.description}</p>
                  <p className="mt-3 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Calculate now &rarr;
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Formula reference */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Engagement Rate Formulas</h2>
          <div className="space-y-3">
            <Card>
              <h3 className="font-semibold">By Followers (Industry Standard)</h3>
              <p className="mt-1 font-mono text-sm text-muted">
                (Likes + Comments + Saves/Shares) &divide; Followers &times; 100
              </p>
              <p className="mt-2 text-sm text-muted">
                The most common formula, used for comparing accounts and required by most brand
                partnerships.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold">By Reach</h3>
              <p className="mt-1 font-mono text-sm text-muted">
                (Likes + Comments + Saves/Shares) &divide; Reach &times; 100
              </p>
              <p className="mt-2 text-sm text-muted">
                Measures content performance among people who actually saw the post. Typically 2-5x
                higher than the follower-based rate.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold">By Impressions</h3>
              <p className="mt-1 font-mono text-sm text-muted">
                (Likes + Comments + Saves/Shares) &divide; Impressions &times; 100
              </p>
              <p className="mt-2 text-sm text-muted">
                The most conservative measure. Accounts for repeat views, giving a lower number but
                a truer picture of engagement-per-view.
              </p>
            </Card>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Benchmark summary */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Engagement Rate Benchmarks by Industry (2026)</h2>
          <p className="mb-4 text-sm text-muted">
            Average engagement rates vary significantly by industry and platform. See the full
            breakdown on our{' '}
            <Link
              href="/engagement-rate-benchmarks"
              className="font-medium text-primary hover:underline"
            >
              benchmarks page
            </Link>
            .
          </p>
          <Card>
            <PlatformComparisonTable />
          </Card>
        </section>

        {/* How engagement rate is calculated */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">How Engagement Rate Works</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              Engagement rate is the single most important metric for measuring the quality of a
              social media audience. While follower count shows reach potential, engagement rate
              reveals how many of those followers are genuinely interested in your content.
            </p>
            <p className="mt-3">
              The metric is calculated by dividing total interactions (likes, comments, and
              platform-specific signals like saves on Instagram or shares on TikTok) by a baseline
              metric, then multiplying by 100 to get a percentage.
            </p>
            <p className="mt-3">
              Engagement rates naturally decrease as follower count grows. A nano creator (under
              10,000 followers) will typically see 4-6% on Instagram, while a mega creator (1M+) may
              only see 0.5-1.5%. This is expected and accounted for by our tier-based benchmarking
              system — we compare your rate against the expected range for your follower tier, not a
              flat average.
            </p>
            <p className="mt-3">
              Brands use engagement rate as the primary screening metric when evaluating creators
              for partnerships. In many cases, a micro-creator with a 5% engagement rate is more
              valuable to a brand than a mega-creator with 0.5%, because the smaller audience is
              more targeted and responsive.
            </p>
          </div>
        </section>

        <AdSlot slot="below-results" className="mb-8" />

        <FAQ items={faq} />
      </div>
    </>
  );
}
