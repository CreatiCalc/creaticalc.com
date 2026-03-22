import type { Metadata } from 'next';
import Link from 'next/link';
import FAQ from '@/features/calculators/shared/FAQ';
import AdSlot from '@/components/layout/AdSlot';
import type { FAQItem } from '@/features/calculators/shared/types';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { SITE_URL } from '@/lib/siteConfig';
import { PLATFORM_AVERAGES, YOUTUBE_ENGAGEMENT_RANGE } from '@/lib/engagementBenchmarks';
import { getSponsorshipBaseRate } from '@/lib/sponsorshipModel';
import { NICHES, SHORTS_RPM } from '@/lib/youtubeEarningsModel';

export const metadata: Metadata = {
  title: 'TikTok vs YouTube for Creators [2026 Data] — Which Pays More?',
  description:
    'The real earnings gap between TikTok and YouTube depends on your niche and content style. See how ad revenue, sponsorships, and engagement compare side by side.',
  openGraph: {
    title: 'TikTok vs YouTube for Creators [2026] — Which Pays More?',
    description:
      'Side-by-side comparison of TikTok and YouTube creator earnings, sponsorship rates, and engagement benchmarks. Real 2026 data.',
    url: '/tiktok-vs-youtube',
  },
  alternates: {
    canonical: '/tiktok-vs-youtube',
  },
};

const ytSponsor = getSponsorshipBaseRate('youtube');
const ttSponsor = getSponsorshipBaseRate('tiktok');
const minRpm = Math.min(...NICHES.map((n) => n.rpm.low));
const maxRpm = Math.max(...NICHES.map((n) => n.rpm.high));

const faq: FAQItem[] = [
  {
    question: 'Does TikTok or YouTube pay more per view?',
    answer:
      'YouTube pays significantly more per view for long-form content. YouTube RPM ranges from $2 to $18+ depending on niche, while TikTok Creativity Program pays roughly $0.02–$0.05 per 1,000 qualified views. However, YouTube Shorts pay similarly to TikTok at $0.01–$0.07 per 1,000 views. The gap is primarily in long-form content.',
  },
  {
    question: 'Which platform is better for sponsorships?',
    answer: `YouTube sponsorship rates ($${ytSponsor.low}–$${ytSponsor.high} per 1K subscribers) are higher than TikTok ($${ttSponsor.low}–$${ttSponsor.high} per 1K followers) because YouTube videos are longer, evergreen, and offer more brand integration opportunities. However, TikTok's higher engagement rates mean brands get more interactions per dollar spent.`,
  },
  {
    question: 'Is it easier to grow on TikTok or YouTube?',
    answer: `TikTok's algorithm surfaces content to non-followers more aggressively, making initial growth faster. TikTok's average engagement rate of ${PLATFORM_AVERAGES.tiktok}% dwarfs YouTube's ${YOUTUBE_ENGAGEMENT_RANGE.low}–${YOUTUBE_ENGAGEMENT_RANGE.high}%. However, YouTube subscribers are more loyal and valuable long-term. Many creators use TikTok for discovery and YouTube for monetization.`,
  },
  {
    question: 'Should I post on both TikTok and YouTube?',
    answer:
      'Yes. The top-earning creators in 2026 are multi-platform. TikTok drives fast audience growth and brand awareness, while YouTube provides the strongest ad revenue and sponsorship income. Many creators repurpose content across both platforms, posting TikToks as YouTube Shorts to maximize reach.',
  },
  {
    question: 'How are your numbers calculated?',
    answer: (
      <>
        All estimates are based on publicly available industry data, creator-reported earnings, and
        platform documentation. We detail our data sources and methodology on our{' '}
        <Link href="/methodology" className="font-medium text-primary hover:underline">
          Methodology page
        </Link>
        .
      </>
    ),
  },
];

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'TikTok vs YouTube', path: '/tiktok-vs-youtube' },
];

export default function TikTokVsYouTubePage() {
  const faqSchemaItems = faq
    .filter((item): item is FAQItem & { answer: string } => typeof item.answer === 'string')
    .map(({ question, answer }) => ({ question, answer }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'TikTok vs YouTube for Creators: 2026 Comparison',
    'description':
      'Side-by-side comparison of TikTok and YouTube for creator earnings, sponsorship rates, and engagement.',
    'url': `${SITE_URL}/tiktok-vs-youtube`,
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
            TikTok vs YouTube for Creators (2026)
          </h1>
          <p className="mt-3 text-muted">
            A data-driven comparison of earnings, sponsorship rates, and engagement across both
            platforms. See which one fits your content and goals.
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
                  <th className="pb-2 pr-4 font-medium">YouTube</th>
                  <th className="pb-2 font-medium">TikTok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Long-Form RPM</td>
                  <td className="py-3 pr-4 text-muted">
                    ${minRpm}–${maxRpm}
                  </td>
                  <td className="py-3 text-muted">$0.02–$0.05 (Creativity Program)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Short-Form RPM</td>
                  <td className="py-3 pr-4 text-muted">
                    ${SHORTS_RPM.low}–${SHORTS_RPM.high} (Shorts)
                  </td>
                  <td className="py-3 text-muted">$0.02–$0.05 (qualified views)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Sponsorship Rate</td>
                  <td className="py-3 pr-4 text-muted">
                    ${ytSponsor.low}–${ytSponsor.high} / 1K subs
                  </td>
                  <td className="py-3 text-muted">
                    ${ttSponsor.low}–${ttSponsor.high} / 1K followers
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Avg Engagement Rate</td>
                  <td className="py-3 pr-4 text-muted">
                    {YOUTUBE_ENGAGEMENT_RANGE.low}–{YOUTUBE_ENGAGEMENT_RANGE.high}% (view-based)
                  </td>
                  <td className="py-3 text-muted">{PLATFORM_AVERAGES.tiktok}% (follower-based)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Revenue Share</td>
                  <td className="py-3 pr-4 text-muted">55% (long-form), 45% (Shorts)</td>
                  <td className="py-3 text-muted">Varies (Creativity Program)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Best For</td>
                  <td className="py-3 pr-4 text-muted">
                    Monetization, evergreen content, tutorials
                  </td>
                  <td className="py-3 text-muted">Rapid growth, virality, trend-driven content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ad Revenue */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Ad Revenue: YouTube Wins by a Mile</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              YouTube&rsquo;s ad revenue model is the gold standard for creators. Long-form content
              earns ${minRpm}&ndash;${maxRpm} RPM depending on niche, with finance and tech channels
              earning the most. Creators keep 55% of ad revenue on long-form and 45% on Shorts.
            </p>
            <p>
              TikTok&rsquo;s Creativity Program pays $0.02&ndash;$0.05 per 1,000 qualified views,
              but only for videos over 1 minute that meet quality thresholds. The legacy Creator
              Fund, now being phased out, pays even less.
            </p>
            <p>
              For creators who make long-form content, YouTube is the clear winner for ad revenue.
              For short-form creators, the per-view earnings are similar across both platforms.
            </p>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Sponsorships */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Sponsorship Rates: YouTube Commands a Premium</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              YouTube sponsorship rates are the highest of any major platform at ${ytSponsor.low}
              &ndash;${ytSponsor.high} per 1,000 subscribers. This premium reflects the longer video
              format, evergreen content shelf life, and deeper brand integration opportunities.
            </p>
            <p>
              TikTok sponsorship rates sit at ${ttSponsor.low}&ndash;${ttSponsor.high} per 1,000
              followers. While lower per-follower, TikTok&rsquo;s higher engagement rates and viral
              potential mean brands often get more total impressions per dollar.
            </p>
            <p>
              The best strategy is to leverage both:{' '}
              <Link
                href="/youtube-sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                check your YouTube rate
              </Link>{' '}
              and{' '}
              <Link
                href="/tiktok-sponsorship-rate-calculator"
                className="font-medium text-primary hover:underline"
              >
                check your TikTok rate
              </Link>{' '}
              to see your earning potential on each platform.
            </p>
          </div>
        </section>

        {/* Engagement */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            Engagement: TikTok Leads, but the Numbers Are Not Directly Comparable
          </h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              TikTok&rsquo;s average engagement rate of {PLATFORM_AVERAGES.tiktok}% is dramatically
              higher than any other platform. This is driven by the algorithm surfacing content to
              interested users regardless of follow status, the full-screen auto-play format, and
              the low-friction double-tap like mechanic.
            </p>
            <p>
              YouTube engagement rates ({YOUTUBE_ENGAGEMENT_RANGE.low}&ndash;
              {YOUTUBE_ENGAGEMENT_RANGE.high}%) are measured differently: view-based rather than
              follower-based. This makes direct comparison misleading. A 5% engagement rate on
              YouTube and a 5% rate on TikTok represent very different things.
            </p>
            <p>
              Check where your engagement stands with our{' '}
              <Link
                href="/engagement-rate-benchmarks"
                className="font-medium text-primary hover:underline"
              >
                2026 engagement rate benchmarks
              </Link>{' '}
              for platform-specific context.
            </p>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">The Verdict: It Depends on Your Goals</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              <strong>Choose YouTube if</strong> you create long-form content, want the highest ad
              revenue per view, and prioritize building an evergreen content library. YouTube is the
              best platform for creators in education, tutorials, finance, and tech.
            </p>
            <p>
              <strong>Choose TikTok if</strong> you want fast audience growth, create trend-driven
              or entertainment content, and value viral reach over per-view income. TikTok is the
              best discovery platform for new creators.
            </p>
            <p>
              <strong>Choose both if</strong> you want maximum income. The top-earning creators in
              2026 use TikTok for growth and YouTube for monetization. Repurpose content across
              platforms to maximize reach with minimal extra effort.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/youtube-money-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Calculate YouTube Earnings
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
