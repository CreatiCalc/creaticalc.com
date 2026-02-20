import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import FAQ from '@/features/calculators/shared/FAQ';
import AdSlot from '@/components/layout/AdSlot';
import type { FAQItem } from '@/features/calculators/shared/types';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { SITE_URL } from '@/lib/siteConfig';
import { getSponsorshipBaseRate } from '@/lib/sponsorshipModel';
import { PLATFORM_GRADIENTS } from '@/lib/calculatorRegistry';
import { getSourcesById, SPONSORSHIP_SOURCE_IDS } from '@/lib/sources';

export const metadata: Metadata = {
  title: 'Sponsorship Rate Calculator 2026',
  description:
    'Free sponsorship rate calculator for Instagram, TikTok, YouTube, Facebook, and X. Compare base rates, content type multipliers, and deal pricing across all platforms.',
  openGraph: {
    title: 'Sponsorship Rate Calculator 2026',
    description:
      'Calculate how much to charge for sponsored content on Instagram, TikTok, YouTube, Facebook, or X. Compare rates across all platforms.',
    url: '/sponsorship-rate-calculator',
  },
  alternates: {
    canonical: '/sponsorship-rate-calculator',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How much should I charge for a sponsored post?',
    answer:
      'The standard formula is: (Followers / 1,000) x Base Rate x Engagement Multiplier x Content Multiplier x Deal Multiplier. Base rates range from $5–$50 per 1,000 followers depending on the platform. YouTube commands the highest rates ($20–$50/1K) due to long-form video and evergreen reach, while TikTok and Facebook start lower ($5–$15/1K) because content is shorter-lived. Your engagement rate, niche, content format, and deal type all adjust the final price.',
  },
  {
    question: 'Which platform pays the most for sponsorships?',
    answer:
      "YouTube consistently pays the most per 1,000 followers ($20–$50 base rate) because videos generate views for months or years and require more production effort. Instagram is second ($10–$25/1K) thanks to high brand demand and multiple content formats. X (Twitter) falls in the middle ($8–$20/1K) due to strong B2B value. TikTok and Facebook share the lowest base rates ($5–$15/1K), though TikTok's viral potential can make individual deals extremely valuable.",
  },
  {
    question: 'How does engagement rate affect sponsorship pricing?',
    answer:
      'Engagement rate is one of the biggest multipliers in sponsorship pricing. Creators with below-average engagement (under 1%) typically earn about half the standard rate. Average engagement (1–3%) earns the baseline. Above-average engagement (3–5%) can command 1.5x, and high engagement (above 5%) can justify 2x or more. Brands pay for audiences that interact, not just follower counts.',
  },
  {
    question: 'What are deal type multipliers?',
    answer:
      'Deal type multipliers reflect how much effort and creative control a sponsorship requires. A brief mention (1x) is the baseline. A dedicated post entirely about the brand is 2.5x because it requires more planning and gives up your entire post to the sponsor. An in-depth product review is 3.5x due to the extensive testing and content creation involved. Series deals (multi-post campaigns) are 2x per post, with the volume making up the per-post discount.',
  },
  {
    question: 'How do I negotiate sponsorship rates?',
    answer:
      'Start with data: know your base rate from a calculator like this one, then adjust for your specific strengths. Lead with your engagement rate if it is above average. Charge separately for usage rights (brands reusing your content in ads), exclusivity clauses (not working with competitors), and cross-posting to multiple platforms. Always price by content format — a Reel or dedicated video is worth significantly more than a Story or brief mention.',
  },
  {
    question: 'How are your numbers calculated?',
    answer: (
      <>
        All our estimates are based on publicly available industry data, creator-reported earnings,
        and advertising benchmarks. We explain our data sources, formulas, update schedule, and
        assumptions in detail on our{' '}
        <Link href="/methodology" className="font-medium text-primary hover:underline">
          Methodology page
        </Link>
        .
      </>
    ),
  },
];

const platforms = [
  {
    name: 'Instagram',
    platform: 'instagram' as const,
    href: '/instagram-sponsorship-rate-calculator',
    color: PLATFORM_GRADIENTS['Instagram'],
    description:
      "Calculate rates for sponsored feed posts, Reels, Stories, and carousels. Instagram's visual-first format and high brand demand make it a top sponsorship platform.",
    contentTypes: 'Posts, Reels, Stories, Carousels',
  },
  {
    name: 'TikTok',
    platform: 'tiktok' as const,
    href: '/tiktok-sponsorship-rate-calculator',
    color: PLATFORM_GRADIENTS['TikTok'],
    description:
      "Calculate rates for sponsored videos, Stories, and Lives. TikTok's algorithm-driven reach means sponsored content can go far beyond your follower count.",
    contentTypes: 'Videos, Stories, Lives',
  },
  {
    name: 'YouTube',
    platform: 'youtube' as const,
    href: '/youtube-sponsorship-rate-calculator',
    color: PLATFORM_GRADIENTS['YouTube'],
    description:
      "Calculate rates for integrations, dedicated videos, Shorts, and pre-rolls. YouTube's evergreen content and high CPMs command premium sponsorship rates.",
    contentTypes: 'Integrations, Dedicated, Shorts, Pre-Rolls',
  },
  {
    name: 'Facebook',
    platform: 'facebook' as const,
    href: '/facebook-sponsorship-rate-calculator',
    color: PLATFORM_GRADIENTS['Facebook'],
    description:
      "Calculate rates for sponsored feed posts, Reels, Stories, and Lives. Facebook's older, higher-income audience makes it valuable for specific brand verticals.",
    contentTypes: 'Posts, Reels, Stories, Lives',
  },
  {
    name: 'X (Twitter)',
    platform: 'twitter' as const,
    href: '/twitter-sponsorship-rate-calculator',
    color: PLATFORM_GRADIENTS['X'],
    description:
      "Calculate rates for sponsored tweets, threads, and Spaces. X's thought-leadership positioning makes it valuable for B2B and tech brand sponsorships.",
    contentTypes: 'Tweets, Threads, Spaces',
  },
];

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Sponsorship Rate Calculator', path: '/sponsorship-rate-calculator' },
];

export default function SponsorshipRateCalculatorPage() {
  const sources = getSourcesById([...SPONSORSHIP_SOURCE_IDS]);

  const platformApps = platforms.map((p) => ({
    '@type': 'WebApplication' as const,
    'name': `${p.name} Sponsorship Rate Calculator`,
    'url': `${SITE_URL}${p.href}`,
    'applicationCategory': 'UtilitiesApplication',
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Sponsorship Rate Calculator',
    'description':
      'Free sponsorship rate calculator for Instagram, TikTok, YouTube, Facebook, and X. Compare base rates and pricing across all platforms.',
    'url': `${SITE_URL}/sponsorship-rate-calculator`,
    'datePublished': '2026-02-20',
    'dateModified': '2026-02-20',
    'hasPart': platformApps,
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': platformApps.map((app, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'item': app,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mb-8 text-center">
          <h1 className="text-gradient-brand text-3xl font-bold md:text-4xl">
            Sponsorship Rate Calculator
          </h1>
          <p className="mt-3 text-muted">
            Calculate how much to charge for sponsored content on Instagram, TikTok, YouTube,
            Facebook, or X (Twitter). Compare base rates, content type multipliers, and deal pricing
            across all five platforms.
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
            {platforms.map((p) => {
              const rate = getSponsorshipBaseRate(p.platform);
              return (
                <Link key={p.href} href={p.href} className="group">
                  <Card className="relative h-full overflow-hidden transition-all duration-200 group-hover:border-primary/50 group-hover:shadow-md">
                    <div
                      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${p.color} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
                    />
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-semibold group-hover:text-primary">{p.name}</h3>
                      <span className="text-xs text-muted">
                        ${rate.low}–${rate.high}/1K
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted">{p.description}</p>
                    <p className="mt-3 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Calculate now &rarr;
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Pricing formula reference */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">How Sponsorship Pricing Is Calculated</h2>
          <div className="space-y-3">
            <Card>
              <h3 className="font-semibold">Base Rate (per 1,000 Followers)</h3>
              <p className="mt-1 font-mono text-sm text-muted">
                (Followers &divide; 1,000) &times; Platform Base Rate
              </p>
              <p className="mt-2 text-sm text-muted">
                Every platform has a different base rate per 1,000 followers. YouTube commands
                $20–$50 due to long-form video value, while TikTok and Facebook start at $5–$15.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold">Engagement Multiplier</h3>
              <p className="mt-1 font-mono text-sm text-muted">
                Base &times; Engagement Rate Multiplier (0.5x – 2x+)
              </p>
              <p className="mt-2 text-sm text-muted">
                Your engagement rate directly scales your rate. Below-average engagement ({'<'}1%)
                halves your rate, while high engagement ({'>'}5%) can double it. Brands pay for
                audiences that interact.
              </p>
            </Card>
            <Card>
              <h3 className="font-semibold">Content &amp; Deal Multipliers</h3>
              <p className="mt-1 font-mono text-sm text-muted">
                Rate &times; Content Type Multiplier &times; Deal Type Multiplier
              </p>
              <p className="mt-2 text-sm text-muted">
                Different content formats and deal structures command different premiums. A
                dedicated video review (3.5x) is worth far more than a brief story mention
                (0.25–0.3x).
              </p>
            </Card>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Comparison table */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Sponsorship Rates by Platform (2026)</h2>
          <p className="mb-4 text-sm text-muted">
            Base rates per 1,000 followers, top content formats, and deal type multipliers compared
            across all five platforms.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 font-semibold">Platform</th>
                  <th className="px-3 py-2 font-semibold">Base Rate / 1K</th>
                  <th className="px-3 py-2 font-semibold">Top Format</th>
                  <th className="px-3 py-2 font-semibold">Top Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    name: 'Instagram',
                    platform: 'instagram' as const,
                    topFormat: 'Reel',
                    topMul: '1.5x',
                  },
                  {
                    name: 'TikTok',
                    platform: 'tiktok' as const,
                    topFormat: 'Video',
                    topMul: '1.0x',
                  },
                  {
                    name: 'YouTube',
                    platform: 'youtube' as const,
                    topFormat: 'Dedicated',
                    topMul: '2.0x',
                  },
                  {
                    name: 'Facebook',
                    platform: 'facebook' as const,
                    topFormat: 'Reel',
                    topMul: '1.4x',
                  },
                  {
                    name: 'X (Twitter)',
                    platform: 'twitter' as const,
                    topFormat: 'Thread',
                    topMul: '1.8x',
                  },
                ].map((row) => {
                  const rate = getSponsorshipBaseRate(row.platform);
                  return (
                    <tr key={row.name}>
                      <td className="px-3 py-2 font-medium">{row.name}</td>
                      <td className="px-3 py-2 text-muted">
                        ${rate.low}–${rate.high}
                      </td>
                      <td className="px-3 py-2 text-muted">{row.topFormat}</td>
                      <td className="px-3 py-2 text-muted">{row.topMul}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 font-semibold">Deal Type Multipliers (All Platforms)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-3 py-2 font-semibold">Deal Type</th>
                    <th className="px-3 py-2 font-semibold">Multiplier</th>
                    <th className="px-3 py-2 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-3 py-2 font-medium">Mention</td>
                    <td className="px-3 py-2 text-muted">1.0x</td>
                    <td className="px-3 py-2 text-muted">Brief brand mention in content</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Series</td>
                    <td className="px-3 py-2 text-muted">2.0x</td>
                    <td className="px-3 py-2 text-muted">Multi-post campaign (per-post rate)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Dedicated</td>
                    <td className="px-3 py-2 text-muted">2.5x</td>
                    <td className="px-3 py-2 text-muted">Entire post focused on brand</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-medium">Review</td>
                    <td className="px-3 py-2 text-muted">3.5x</td>
                    <td className="px-3 py-2 text-muted">In-depth product review</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How Sponsorship Pricing Works */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">How Sponsorship Pricing Works</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              Sponsorship pricing is based on a creator&apos;s ability to deliver engaged attention
              to a brand&apos;s message. Unlike ad revenue — which is set by the platform —
              sponsored content rates are negotiated directly between creators and brands, making it
              the most lucrative monetization channel for most influencers.
            </p>
            <p className="mt-3">
              The base rate per 1,000 followers varies dramatically by platform. YouTube commands
              the highest rates because videos are long-form, require significant production effort,
              and continue generating views for months or years after upload. Instagram ranks second
              due to its visual-first format and massive brand demand. TikTok and Facebook have
              lower base rates, but TikTok&apos;s viral algorithm means individual campaigns can
              dramatically outperform expectations.
            </p>
            <p className="mt-3">
              Engagement rate is the most important adjustment factor. A creator with 20,000
              followers and 6% engagement is typically more valuable to a brand than one with
              100,000 followers and 0.5% engagement, because the smaller audience is more likely to
              see, interact with, and act on sponsored content. Our calculators apply engagement
              multipliers that reflect this real-world pricing dynamic.
            </p>
            <p className="mt-3">
              Content format and deal structure further adjust the rate. A quick Story mention
              (0.25–0.3x) costs far less than a dedicated video review (3.5x) because the effort,
              creative control, and brand exposure differ enormously. Series deals offer a per-post
              discount (2.0x vs 2.5x for a single dedicated post) but generate more total revenue
              through volume.
            </p>
          </div>
        </section>

        {/* Measure Your Engagement CTA */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Measure Your Engagement First</h2>
          <p className="mb-4 text-sm text-muted">
            Your engagement rate is the biggest factor in sponsorship pricing. Calculate it before
            setting your rates.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/engagement-rate-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Engagement Rate Calculator
            </Link>
            <Link
              href="/engagement-rate-benchmarks"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Engagement Rate Benchmarks
            </Link>
          </div>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <h2 className="mb-3 text-lg font-semibold">Sources</h2>
          <ul className="space-y-1 text-sm text-muted">
            {sources.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {s.name}
                </a>{' '}
                — {s.description}
              </li>
            ))}
          </ul>
        </section>

        <AdSlot slot="below-results" className="mb-8" />

        <FAQ items={faq} />
      </div>
    </>
  );
}
