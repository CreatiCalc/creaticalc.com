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
  title: 'X (Twitter) vs Instagram Sponsorship Rates [2026 Data] — Full Comparison',
  description:
    'X and Instagram sponsorship rates serve very different brand goals. See how rates, formats, and audience value compare side by side with real 2026 data.',
  openGraph: {
    title: 'X (Twitter) vs Instagram Sponsorship Rates [2026] — Full Comparison',
    description:
      'Side-by-side comparison of X (Twitter) and Instagram sponsorship rates, deal structures, and earning potential. Real 2026 data.',
    url: '/x-vs-instagram-sponsorships',
  },
  alternates: {
    canonical: '/x-vs-instagram-sponsorships',
  },
};

const xSponsor = getSponsorshipBaseRate('twitter');
const igSponsor = getSponsorshipBaseRate('instagram');

const faq: FAQItem[] = [
  {
    question: 'Do X or Instagram sponsorships pay more?',
    answer: `Instagram sponsorship rates are higher per follower at $${igSponsor.low}–$${igSponsor.high} per 1K followers compared to X's $${xSponsor.low}–$${xSponsor.high} per 1K followers. However, X sponsorships can deliver outsized value for B2B brands, which sometimes justifies premium pricing for creators with the right audience.`,
  },
  {
    question: 'Why are Instagram sponsorship rates higher than X?',
    answer:
      'Instagram has a more established influencer marketing ecosystem, native shopping features, and content formats (Reels, Stories, carousels) that give brands more creative options. Instagram audiences also skew toward consumer purchasing behavior, which makes the platform more attractive for e-commerce and direct-to-consumer brands.',
  },
  {
    question: 'When should a brand choose X over Instagram for sponsorships?',
    answer:
      'X is the stronger choice for B2B marketing, SaaS products, financial services, crypto, and thought-leadership campaigns. A recommendation from a credible voice on X can drive demo requests, signups, and direct sales in ways that Instagram posts rarely achieve. If the target customer is a professional or decision-maker, X sponsorships often deliver better ROI per dollar spent.',
  },
  {
    question: 'Can I bundle X and Instagram sponsorships?',
    answer:
      'Yes, and it is a strong strategy for creators active on both platforms. A typical bundle might include a tweet or thread on X (for reach among professionals) plus an Instagram Reel or Stories set (for visual impact and shopping links). Multi-platform packages typically earn 30-50% more than single-platform deals.',
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
  { name: 'X vs Instagram Sponsorships', path: '/x-vs-instagram-sponsorships' },
];

export default function XVsInstagramSponsorshipsPage() {
  const faqSchemaItems = faq
    .filter((item): item is FAQItem & { answer: string } => typeof item.answer === 'string')
    .map(({ question, answer }) => ({ question, answer }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'X (Twitter) vs Instagram Sponsorship Rates: 2026 Comparison',
    'description':
      'Side-by-side comparison of X (Twitter) and Instagram sponsorship rates, deal structures, and earning potential for creators.',
    'url': `${SITE_URL}/x-vs-instagram-sponsorships`,
    'datePublished': '2026-03-17',
    'dateModified': '2026-03-17',
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
            X (Twitter) vs Instagram Sponsorship Rates (2026)
          </h1>
          <p className="mt-3 text-muted">
            A data-driven comparison of sponsorship rates, deal structures, and audience value on X
            and Instagram. See which platform makes more sense for your brand deals.
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
                  <th className="pb-2 pr-4 font-medium">X (Twitter)</th>
                  <th className="pb-2 font-medium">Instagram</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Base Rate</td>
                  <td className="py-3 pr-4 text-muted">
                    ${xSponsor.low}&ndash;${xSponsor.high} / 1K followers
                  </td>
                  <td className="py-3 text-muted">
                    ${igSponsor.low}&ndash;${igSponsor.high} / 1K followers
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Premium Format</td>
                  <td className="py-3 pr-4 text-muted">Thread (1.8x base)</td>
                  <td className="py-3 text-muted">Reel (1.5x base)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Content Shelf Life</td>
                  <td className="py-3 pr-4 text-muted">Hours to days (timeline-driven)</td>
                  <td className="py-3 text-muted">Days to weeks (algorithm-driven)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Avg Engagement</td>
                  <td className="py-3 pr-4 text-muted">
                    ~{PLATFORM_AVERAGES.twitter}% (reply-based)
                  </td>
                  <td className="py-3 text-muted">
                    {PLATFORM_AVERAGES.instagram}% (like/save-based)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Typical Deliverables</td>
                  <td className="py-3 pr-4 text-muted">Tweet, thread, Space</td>
                  <td className="py-3 text-muted">Feed post, Reel, Story, carousel</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Highest-Paying Niches</td>
                  <td className="py-3 pr-4 text-muted">Finance, crypto, B2B/SaaS, tech</td>
                  <td className="py-3 text-muted">Beauty, fashion, fitness, travel</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Best For</td>
                  <td className="py-3 pr-4 text-muted">Thought leadership, B2B, conversions</td>
                  <td className="py-3 text-muted">Visual brands, e-commerce, awareness</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Where X Wins */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Where X Has the Edge</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              X sponsorship rates are lower per follower, but the platform punches above its weight
              in specific verticals. Three factors give X a unique advantage:
            </p>
            <p>
              <strong>Thought leadership drives conversions.</strong> A recommendation from a
              credible voice on X can drive demo requests, signups, and direct sales in ways that
              Instagram posts rarely achieve. B2B brands and SaaS companies report some of their
              highest ROI from X creator partnerships.
            </p>
            <p>
              <strong>Public conversation amplifies reach.</strong> Quote tweets, replies, and
              threads extend a sponsored post&rsquo;s reach beyond the original audience. A single
              tweet from the right creator can spark a conversation that reaches millions of
              impressions organically.
            </p>
            <p>
              <strong>Professional audience composition.</strong> X skews toward professionals,
              decision-makers, and early adopters. For brands selling to businesses or high-income
              individuals, each X follower can be worth more than an Instagram follower despite the
              lower per-follower rate.
            </p>
            <p>
              Check your X sponsorship rate with our{' '}
              <Link
                href="/twitter-sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                X (Twitter) sponsorship calculator
              </Link>{' '}
              and compare your{' '}
              <Link
                href="/twitter-engagement-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                X engagement rate
              </Link>{' '}
              against platform benchmarks.
            </p>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Where Instagram Wins */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Where Instagram Has the Edge</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              <strong>Higher base rates.</strong> At ${igSponsor.low}&ndash;${igSponsor.high} per
              1,000 followers, Instagram commands a clear premium over X&rsquo;s ${xSponsor.low}
              &ndash;${xSponsor.high}. The established influencer marketing ecosystem and
              brand-friendly content formats justify this gap.
            </p>
            <p>
              <strong>More format variety per deal.</strong> A single Instagram sponsorship can
              include a feed post, a Reel, multiple Stories, and a carousel. This variety lets
              creators negotiate higher total deal values by bundling formats. X offers tweets,
              threads, and Spaces, but with fewer bundling options.
            </p>
            <p>
              <strong>Native shopping integration.</strong> Instagram&rsquo;s product tags, shop
              features, and swipe-up links create a direct path from sponsored content to purchase.
              For e-commerce brands, this measurable conversion path justifies premium rates.
            </p>
            <p>
              <strong>Visual storytelling.</strong> Instagram&rsquo;s image and video-first format
              works better for brands that need to show their product in use. Beauty, fashion,
              travel, and food brands consistently invest more in Instagram sponsorships for this
              reason.
            </p>
            <p>
              Calculate your Instagram rate:{' '}
              <Link
                href="/instagram-sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                Instagram sponsorship calculator
              </Link>{' '}
              and check your{' '}
              <Link
                href="/instagram-engagement-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                Instagram engagement rate
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Strategy */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">The Best Strategy: Use Both Platforms</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              The highest-earning creators do not pick one platform over the other. They sell
              multi-platform packages. A typical bundle might include a tweet or thread on X (for
              reach among professionals and decision-makers) plus an Instagram Reel or Stories set
              (for visual impact and shopping links).
            </p>
            <p>
              This works because X and Instagram reach different audiences with different intent. X
              audiences are reading, evaluating, and making decisions. Instagram audiences are
              browsing, discovering, and shopping. Covering both gives brands a complete funnel from
              awareness to action.
            </p>
            <p>
              Bundled deals typically earn 30&ndash;50% more than single-platform deals because
              brands get cross-platform coverage from a single creator relationship. If you are
              active on both, always pitch the combined package first.
            </p>
            <p>
              Compare your rates across all platforms with our{' '}
              <Link
                href="/sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                multi-platform sponsorship calculator
              </Link>{' '}
              and check your engagement against{' '}
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
              href="/twitter-sponsorship-rate-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Calculate X Sponsorship Rate
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

        <FAQSchema items={faqSchemaItems} />
        <FAQ items={faq} />
      </div>
    </>
  );
}
