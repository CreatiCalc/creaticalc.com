import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/features/calculators/shared/FAQ';
import AdSlot from '@/components/layout/AdSlot';
import type { FAQItem } from '@/features/calculators/shared/types';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { SITE_URL } from '@/lib/siteConfig';
import { PLATFORM_AVERAGES, YOUTUBE_ENGAGEMENT_RANGE } from '@/lib/engagementBenchmarks';
import { getSponsorshipBaseRate } from '@/lib/sponsorshipModel';

export const metadata: Metadata = {
  title: 'Instagram vs YouTube Sponsorship Rates [2026 Data] — Full Comparison',
  description:
    'Instagram and YouTube sponsorship rates differ more than most creators think. See how rates, formats, and deal structures compare side by side with real 2026 data.',
  openGraph: {
    title: 'Instagram vs YouTube Sponsorship Rates [2026] — Full Comparison',
    description:
      'Side-by-side comparison of Instagram and YouTube sponsorship rates, deal structures, and earning potential. Real 2026 data.',
    url: '/instagram-vs-youtube-sponsorships',
  },
  alternates: {
    canonical: '/instagram-vs-youtube-sponsorships',
  },
};

const igSponsor = getSponsorshipBaseRate('instagram');
const ytSponsor = getSponsorshipBaseRate('youtube');

const faq: FAQItem[] = [
  {
    question: 'Do Instagram or YouTube sponsorships pay more?',
    answer: `YouTube sponsorships pay more per follower/subscriber. YouTube rates are $${ytSponsor.low}–$${ytSponsor.high} per 1K subscribers compared to Instagram's $${igSponsor.low}–$${igSponsor.high} per 1K followers. The YouTube premium reflects longer video formats, evergreen content, and deeper integration opportunities.`,
  },
  {
    question: 'Why are YouTube sponsorship rates higher than Instagram?',
    answer:
      'YouTube videos are longer (often 10-30 minutes), giving brands more screen time and deeper product integration. YouTube content is also evergreen, meaning a sponsored video can generate views and brand exposure for years. Instagram content has a shorter shelf life, especially Stories (24 hours) and Reels (days to weeks of peak reach).',
  },
  {
    question: 'Which platform is better for brand deals as a beginner?',
    answer:
      'Instagram is generally easier to land initial brand deals because the barrier to entry is lower. Brands frequently work with nano-influencers (1K-10K followers) on Instagram for posts and Stories. YouTube sponsorships tend to start at higher follower thresholds because brands expect polished video production and editing.',
  },
  {
    question: 'Can I bundle Instagram and YouTube sponsorships?',
    answer:
      'Yes, and this is one of the best ways to increase your total deal value. Many creators offer multi-platform packages: a YouTube integration plus Instagram Stories and a feed post. Brands love this because it gives them coverage across platforms. Bundled deals typically earn 30-50% more than single-platform deals.',
  },
  {
    question: 'How are your numbers calculated?',
    answer: (
      <>
        All estimates are based on publicly available industry data and creator-reported earnings.
        See our{' '}
        <Link href="/methodology" className="font-medium text-primary hover:underline">
          Methodology page
        </Link>{' '}
        for details.
      </>
    ),
  },
];

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Instagram vs YouTube Sponsorships', path: '/instagram-vs-youtube-sponsorships' },
];

export default function InstagramVsYouTubeSponsorshipsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Instagram vs YouTube Sponsorship Rates: 2026 Comparison',
    'description':
      'Side-by-side comparison of Instagram and YouTube sponsorship rates, deal structures, and earning potential for creators.',
    'url': `${SITE_URL}/instagram-vs-youtube-sponsorships`,
    'datePublished': '2026-03-15',
    'dateModified': '2026-03-15',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mb-8 text-center">
          <h1 className="text-gradient-brand text-3xl font-bold md:text-4xl">
            Instagram vs YouTube Sponsorship Rates (2026)
          </h1>
          <p className="mt-3 text-muted">
            A data-driven comparison of sponsorship rates, deal structures, and total earning
            potential on Instagram and YouTube. See which platform pays more for your audience.
          </p>
          <div
            className="mx-auto mt-5 h-1 w-36 rounded-full"
            style={{ background: 'var(--gradient-brand-vibrant)' }}
            aria-hidden="true"
          />
        </div>

        <AdSlot slot="header" className="mb-8" />

        {/* Comparison table */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Rate Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-border bg-white p-6 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="pb-2 pr-4 font-medium">Metric</th>
                  <th className="pb-2 pr-4 font-medium">YouTube</th>
                  <th className="pb-2 font-medium">Instagram</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Base Rate</td>
                  <td className="py-3 pr-4 text-muted">
                    ${ytSponsor.low}–${ytSponsor.high} / 1K subscribers
                  </td>
                  <td className="py-3 text-muted">
                    ${igSponsor.low}–${igSponsor.high} / 1K followers
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Premium Format</td>
                  <td className="py-3 pr-4 text-muted">Dedicated video (2.0x base)</td>
                  <td className="py-3 text-muted">Reel (1.5x base)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Content Shelf Life</td>
                  <td className="py-3 pr-4 text-muted">Years (evergreen search traffic)</td>
                  <td className="py-3 text-muted">Days to weeks (algorithm-driven)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Avg Engagement</td>
                  <td className="py-3 pr-4 text-muted">
                    {YOUTUBE_ENGAGEMENT_RANGE.low}–{YOUTUBE_ENGAGEMENT_RANGE.high}% (view-based)
                  </td>
                  <td className="py-3 text-muted">
                    {PLATFORM_AVERAGES.instagram}% (follower-based)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Typical Deliverables</td>
                  <td className="py-3 pr-4 text-muted">
                    Integration, dedicated video, Shorts, pre-roll
                  </td>
                  <td className="py-3 text-muted">Feed post, Reel, Story, carousel</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Highest-Paying Niches</td>
                  <td className="py-3 pr-4 text-muted">Finance, tech, business</td>
                  <td className="py-3 text-muted">Beauty, fashion, fitness, travel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Why YouTube Pays More */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Why YouTube Commands Higher Rates</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              YouTube sponsorships at ${ytSponsor.low}&ndash;${ytSponsor.high} per 1,000 subscribers
              are roughly 1.5&ndash;2x more expensive than Instagram&rsquo;s ${igSponsor.low}&ndash;
              ${igSponsor.high} per 1,000 followers. Three factors drive this premium:
            </p>
            <p>
              <strong>Longer integration time.</strong> A YouTube integration typically runs 60-90
              seconds within a 10-30 minute video. That gives brands far more time to communicate
              their message than an Instagram post or even a Reel.
            </p>
            <p>
              <strong>Evergreen value.</strong> YouTube videos continue generating views through
              search and recommendations for months or years. A sponsored video posted today might
              still be driving brand exposure in 2028. Instagram content has a much shorter peak
              window.
            </p>
            <p>
              <strong>Higher production value.</strong> YouTube creators typically invest more in
              production (scripting, filming, editing), which means more polished brand
              representation and higher perceived value.
            </p>
            <p>
              Calculate your rate on each:{' '}
              <Link
                href="/youtube-sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                YouTube sponsorship calculator
              </Link>{' '}
              and{' '}
              <Link
                href="/instagram-sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                Instagram sponsorship calculator
              </Link>
              .
            </p>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Where Instagram Wins */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Where Instagram Has the Edge</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              <strong>Lower barrier to entry.</strong> Brands work with Instagram nano-influencers
              (1K-10K followers) far more frequently than YouTube channels of the same size. If you
              are just starting out, Instagram sponsorships are more accessible.
            </p>
            <p>
              <strong>More formats per deal.</strong> A single Instagram sponsorship can include a
              feed post, a Reel, multiple Stories, and a carousel. This variety lets creators
              negotiate higher total deal values by bundling formats.
            </p>
            <p>
              <strong>Shopping integration.</strong> Instagram&rsquo;s native shopping features let
              sponsored content drive direct purchases, which is extremely valuable for e-commerce
              brands. This can justify premium rates for creators with high conversion audiences.
            </p>
            <p>
              <strong>Faster turnaround.</strong> Instagram content is quicker to produce than
              YouTube videos, which means higher effective hourly rates for some creators even at
              lower per-post pricing.
            </p>
          </div>
        </section>

        {/* Strategy */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">The Best Strategy: Bundle Both Platforms</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              The highest-earning creators do not choose between Instagram and YouTube sponsorships.
              They sell multi-platform packages. A typical bundle might include a YouTube
              integration (the anchor), an Instagram Reel (for additional reach), and Instagram
              Stories (for urgency and direct links).
            </p>
            <p>
              Bundled deals are worth 30&ndash;50% more than single-platform deals because brands
              get cross-platform coverage and multiple content formats from a single creator
              relationship. If you are active on both platforms, always pitch bundled packages.
            </p>
            <p>
              Check your engagement on both platforms with our{' '}
              <Link
                href="/engagement-rate-benchmarks"
                className="font-medium text-primary hover:underline"
              >
                2026 benchmarks
              </Link>{' '}
              to strengthen your pitch.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/youtube-sponsorship-rate-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Calculate YouTube Sponsorship Rate
            </Link>
            <Link
              href="/instagram-sponsorship-rate-calculator"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Calculate Instagram Sponsorship Rate
            </Link>
            <Link
              href="/sponsorship-rate-calculator"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Compare All Platforms
            </Link>
          </div>
        </section>

        <AdSlot slot="below-results" className="mb-8" />

        <FAQ items={faq} />
      </div>
    </>
  );
}
