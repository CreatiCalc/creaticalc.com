import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/features/calculators/shared/FAQ';
import AdSlot from '@/components/layout/AdSlot';
import type { FAQItem } from '@/features/calculators/shared/types';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { SITE_URL } from '@/lib/siteConfig';
import { PLATFORM_AVERAGES } from '@/lib/engagementBenchmarks';
import { getSponsorshipBaseRate } from '@/lib/sponsorshipModel';

export const metadata: Metadata = {
  title: 'Instagram vs TikTok for Creators [2026 Data] — Which Is Better?',
  description:
    'Instagram and TikTok reward different content styles. See how sponsorship rates, engagement, and growth compare with real 2026 data. Find out which platform fits you.',
  openGraph: {
    title: 'Instagram vs TikTok for Creators [2026] — Which Is Better?',
    description:
      'Side-by-side comparison of Instagram and TikTok for creator earnings, sponsorship rates, and engagement. Real 2026 data.',
    url: '/instagram-vs-tiktok',
  },
  alternates: {
    canonical: '/instagram-vs-tiktok',
  },
};

const igSponsor = getSponsorshipBaseRate('instagram');
const ttSponsor = getSponsorshipBaseRate('tiktok');

const faq: FAQItem[] = [
  {
    question: 'Do Instagram or TikTok creators earn more from sponsorships?',
    answer: `Instagram sponsorship rates ($${igSponsor.low}–$${igSponsor.high} per 1K followers) are higher than TikTok ($${ttSponsor.low}–$${ttSponsor.high} per 1K followers). Instagram's more mature influencer marketing ecosystem and diverse content formats (posts, Reels, Stories, carousels) give brands more options and justify higher pricing.`,
  },
  {
    question: 'Which platform has better engagement rates?',
    answer: `TikTok's average engagement rate (${PLATFORM_AVERAGES.tiktok}%) is roughly 5x higher than Instagram's (${PLATFORM_AVERAGES.instagram}%). However, these are measured the same way (by followers), so the comparison is direct. TikTok's algorithm pushes content to interested non-followers, driving higher interaction rates.`,
  },
  {
    question: 'Is it easier to grow on TikTok or Instagram?',
    answer:
      'TikTok is significantly easier for initial growth. The algorithm surfaces content to non-followers more aggressively, meaning a single viral video can bring thousands of new followers overnight. Instagram growth is slower but more stable, with a higher percentage of followers actively engaging long-term.',
  },
  {
    question: 'Should I post on both Instagram and TikTok?',
    answer:
      'Yes. The two platforms complement each other well. TikTok drives fast growth and discovery, while Instagram offers higher sponsorship rates, more content formats, and a more mature brand partnership ecosystem. Many creators repurpose Reels as TikToks (and vice versa) to maximize reach.',
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
  { name: 'Instagram vs TikTok', path: '/instagram-vs-tiktok' },
];

export default function InstagramVsTikTokPage() {
  const faqSchemaItems = faq
    .filter((item): item is FAQItem & { answer: string } => typeof item.answer === 'string')
    .map(({ question, answer }) => ({ question, answer }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'Instagram vs TikTok for Creators: 2026 Comparison',
    'description':
      'Side-by-side comparison of Instagram and TikTok for creator earnings, sponsorship rates, and engagement.',
    'url': `${SITE_URL}/instagram-vs-tiktok`,
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
            Instagram vs TikTok for Creators (2026)
          </h1>
          <p className="mt-3 text-muted">
            A data-driven comparison of sponsorship rates, engagement benchmarks, and growth
            potential. See which platform pays more for your content style.
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
          <h2 className="mb-4 text-2xl font-bold">Head-to-Head Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-border bg-white p-6 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted">
                  <th className="pb-2 pr-4 font-medium">Metric</th>
                  <th className="pb-2 pr-4 font-medium">Instagram</th>
                  <th className="pb-2 font-medium">TikTok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Sponsorship Rate</td>
                  <td className="py-3 pr-4 text-muted">
                    ${igSponsor.low}–${igSponsor.high} / 1K followers
                  </td>
                  <td className="py-3 text-muted">
                    ${ttSponsor.low}–${ttSponsor.high} / 1K followers
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Avg Engagement Rate</td>
                  <td className="py-3 pr-4 text-muted">{PLATFORM_AVERAGES.instagram}%</td>
                  <td className="py-3 text-muted">{PLATFORM_AVERAGES.tiktok}%</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Content Formats</td>
                  <td className="py-3 pr-4 text-muted">Posts, Reels, Stories, Carousels</td>
                  <td className="py-3 text-muted">Videos, Stories, Lives</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Growth Speed</td>
                  <td className="py-3 pr-4 text-muted">Moderate, stable</td>
                  <td className="py-3 text-muted">Fast, algorithm-driven</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Audience Demographics</td>
                  <td className="py-3 pr-4 text-muted">18–44, balanced gender</td>
                  <td className="py-3 text-muted">16–34, skews younger</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Best For</td>
                  <td className="py-3 pr-4 text-muted">
                    Brand partnerships, visual storytelling, shopping
                  </td>
                  <td className="py-3 text-muted">
                    Viral growth, entertainment, trend-driven content
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sponsorships */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Sponsorship Rates: Instagram Pays More</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              Instagram sponsorship rates are consistently higher than TikTok. At ${igSponsor.low}
              &ndash;${igSponsor.high} per 1,000 followers compared to TikTok&rsquo;s $
              {ttSponsor.low}&ndash;${ttSponsor.high}, Instagram creators earn 40&ndash;70% more per
              follower for equivalent brand deals.
            </p>
            <p>
              The premium comes from Instagram&rsquo;s more established influencer marketing
              ecosystem, diverse content formats (a single deal can include a Reel, carousel, and
              Stories), and an older audience with higher purchasing power. Brands also value
              Instagram&rsquo;s shopping integration, which lets sponsored content drive direct
              purchases.
            </p>
            <p>
              Calculate your rate on each platform:{' '}
              <Link
                href="/instagram-sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                Instagram sponsorship calculator
              </Link>{' '}
              and{' '}
              <Link
                href="/tiktok-sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                TikTok sponsorship calculator
              </Link>
              .
            </p>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Engagement */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            Engagement: TikTok Dominates at {PLATFORM_AVERAGES.tiktok}% vs{' '}
            {PLATFORM_AVERAGES.instagram}%
          </h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              TikTok&rsquo;s {PLATFORM_AVERAGES.tiktok}% average engagement rate is roughly 5x
              higher than Instagram&rsquo;s {PLATFORM_AVERAGES.instagram}%. This is not because
              TikTok creators make better content. It is because the platform&rsquo;s mechanics
              fundamentally encourage more interaction: full-screen auto-play, the double-tap like
              gesture, and an algorithm that pushes content to interested non-followers.
            </p>
            <p>
              Instagram engagement has been declining year-over-year as the platform matures, while
              TikTok engagement continues to rise. Check how your account compares with our{' '}
              <Link
                href="/instagram-engagement-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                Instagram engagement calculator
              </Link>{' '}
              or{' '}
              <Link
                href="/tiktok-engagement-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                TikTok engagement calculator
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Growth */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            Growth: TikTok Is Faster, Instagram Is Stickier
          </h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              TikTok is the fastest platform for organic growth in 2026. A single viral video can
              bring tens of thousands of new followers overnight, and the algorithm does not
              penalize small accounts the way Instagram&rsquo;s tends to. New creators can build
              meaningful audiences in weeks rather than months.
            </p>
            <p>
              Instagram growth is slower but stickier. Instagram followers tend to be more engaged
              long-term, more likely to convert on brand recommendations, and more valuable for
              sponsorship deals. The platform also offers more tools for retaining and engaging your
              existing audience (Stories, DM conversations, broadcast channels).
            </p>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">The Verdict: Use Both, But Differently</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              <strong>Choose Instagram if</strong> your priority is sponsorship income, you create
              visual or lifestyle content, or your audience skews 25+. Instagram&rsquo;s higher
              per-follower rates and diverse format options make it the better monetization
              platform.
            </p>
            <p>
              <strong>Choose TikTok if</strong> you need fast growth, create entertainment or
              trend-driven content, or target a younger audience. TikTok&rsquo;s algorithm gives new
              creators the best shot at rapid discovery.
            </p>
            <p>
              <strong>Use both if</strong> you want to maximize income. Post Reels and TikToks from
              the same source content. Use TikTok for growth, Instagram for monetization, and our{' '}
              <Link
                href="/engagement-rate-benchmarks"
                className="font-medium text-primary hover:underline"
              >
                benchmarks
              </Link>{' '}
              to track how you compare on each.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/instagram-sponsorship-rate-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Calculate Instagram Sponsorship Rate
            </Link>
            <Link
              href="/tiktok-sponsorship-rate-calculator"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Calculate TikTok Sponsorship Rate
            </Link>
            <Link
              href="/engagement-rate-benchmarks"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              See All Benchmarks
            </Link>
          </div>
        </section>

        <AdSlot slot="below-results" className="mb-8" />

        <FAQSchema items={faqSchemaItems} />
        <FAQ items={faq} />
      </div>
    </>
  );
}
