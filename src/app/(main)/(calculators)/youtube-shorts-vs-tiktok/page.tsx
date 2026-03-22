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
import { SHORTS_RPM } from '@/lib/youtubeEarningsModel';

export const metadata: Metadata = {
  title: 'YouTube Shorts vs TikTok [2026 Data] — Which Pays More?',
  description:
    'YouTube Shorts and TikTok both pay creators for short-form video, but the economics are different. See how RPM, sponsorships, and growth compare side by side.',
  openGraph: {
    title: 'YouTube Shorts vs TikTok [2026] — Which Pays More?',
    description:
      'Side-by-side comparison of YouTube Shorts and TikTok earnings, RPM, and sponsorship rates. Real 2026 data.',
    url: '/youtube-shorts-vs-tiktok',
  },
  alternates: {
    canonical: '/youtube-shorts-vs-tiktok',
  },
};

const ttSponsor = getSponsorshipBaseRate('tiktok');
const ytSponsor = getSponsorshipBaseRate('youtube');

const faq: FAQItem[] = [
  {
    question: 'Do YouTube Shorts or TikTok pay more per view?',
    answer: `The per-view rates are similar. YouTube Shorts pay $${SHORTS_RPM.low}–$${SHORTS_RPM.high} per 1,000 views, while TikTok's Creativity Program pays roughly $0.02–$0.05 per 1,000 qualified views. The main difference is that YouTube Shorts monetize all eligible content, while TikTok requires videos over 1 minute for the Creativity Program.`,
  },
  {
    question: 'Which platform is better for short-form growth?',
    answer: `TikTok's algorithm is more aggressive at pushing content to non-followers, making it faster for initial growth. TikTok's average engagement rate of ${PLATFORM_AVERAGES.tiktok}% also means more interaction per video. However, YouTube Shorts subscribers carry over to your long-form channel, creating a much more valuable growth path.`,
  },
  {
    question: 'Should I post the same content on both platforms?',
    answer:
      'Many creators successfully cross-post between YouTube Shorts and TikTok. The formats are nearly identical (vertical, under 60 seconds). Remove platform-specific watermarks before reposting. Some creators find that content performs differently on each platform due to audience differences, so track analytics for both.',
  },
  {
    question: 'Which platform has better sponsorship rates for short-form?',
    answer: `YouTube Shorts sponsorships are priced at roughly 0.4x of a standard YouTube integration rate, based on the $${ytSponsor.low}–$${ytSponsor.high} per 1K subscriber base. TikTok sponsorships use a $${ttSponsor.low}–$${ttSponsor.high} per 1K follower base rate. YouTube's higher base rate often makes Shorts sponsorships more lucrative, especially for creators in premium niches.`,
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
  { name: 'YouTube Shorts vs TikTok', path: '/youtube-shorts-vs-tiktok' },
];

export default function YouTubeShortsVsTikTokPage() {
  const faqSchemaItems = faq
    .filter((item): item is FAQItem & { answer: string } => typeof item.answer === 'string')
    .map(({ question, answer }) => ({ question, answer }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'YouTube Shorts vs TikTok: 2026 Comparison',
    'description':
      'Side-by-side comparison of YouTube Shorts and TikTok earnings, RPM, and sponsorship rates for creators.',
    'url': `${SITE_URL}/youtube-shorts-vs-tiktok`,
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
            YouTube Shorts vs TikTok (2026)
          </h1>
          <p className="mt-3 text-muted">
            Both platforms pay for short-form video, but the economics, growth dynamics, and
            long-term value are different. Here is how they compare.
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
                  <th className="pb-2 pr-4 font-medium">YouTube Shorts</th>
                  <th className="pb-2 font-medium">TikTok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">RPM (per 1K views)</td>
                  <td className="py-3 pr-4 text-muted">
                    ${SHORTS_RPM.low}–${SHORTS_RPM.high}
                  </td>
                  <td className="py-3 text-muted">$0.02–$0.05 (Creativity Program)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Revenue Model</td>
                  <td className="py-3 pr-4 text-muted">Pooled ad revenue sharing (45%)</td>
                  <td className="py-3 text-muted">Creativity Program (qualified views)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Sponsorship Base Rate</td>
                  <td className="py-3 pr-4 text-muted">
                    ~0.4x of ${ytSponsor.low}–${ytSponsor.high}/1K subs
                  </td>
                  <td className="py-3 text-muted">
                    ${ttSponsor.low}–${ttSponsor.high}/1K followers
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Max Video Length</td>
                  <td className="py-3 pr-4 text-muted">3 minutes</td>
                  <td className="py-3 text-muted">10 minutes</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Long-Form Upsell</td>
                  <td className="py-3 pr-4 text-muted">
                    Direct (subscribers watch your long-form videos)
                  </td>
                  <td className="py-3 text-muted">Limited (separate content ecosystem)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-foreground">Best For</td>
                  <td className="py-3 pr-4 text-muted">
                    Funneling to long-form, subscriber growth
                  </td>
                  <td className="py-3 text-muted">Viral reach, brand building, fast growth</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ad Revenue */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Per-View Earnings: Roughly Even</h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              YouTube Shorts pay ${SHORTS_RPM.low}&ndash;${SHORTS_RPM.high} per 1,000 views through
              a pooled ad revenue model where ads play between Shorts in the feed. Creators get 45%
              of allocated revenue.
            </p>
            <p>
              TikTok&rsquo;s Creativity Program pays $0.02&ndash;$0.05 per 1,000 qualified views,
              but only for videos over 1 minute that meet quality thresholds. Shorter TikToks do not
              qualify, which is a significant limitation for creators who prefer the classic 15-30
              second format.
            </p>
            <p>
              Neither platform will make you rich on per-view ad revenue alone. The real value is in
              what the views lead to. Use our{' '}
              <Link
                href="/youtube-shorts-money-calculator"
                className="font-medium text-primary hover:underline"
              >
                YouTube Shorts Money Calculator
              </Link>{' '}
              to see what your specific view count translates to.
            </p>
          </div>
        </section>

        <AdSlot slot="after-chart" className="mb-8" />

        {/* The Real Difference */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            The Real Difference: What Happens After the Views
          </h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              This is where YouTube Shorts have a massive structural advantage. Every subscriber you
              gain from a Short is also a subscriber to your main YouTube channel. Those subscribers
              see your long-form content, which earns 20&ndash;100x more per view.
            </p>
            <p>
              A viral Short that brings in 5,000 new subscribers creates a compounding revenue
              stream as those subscribers watch your long-form videos for months or years. Project
              that growth with our{' '}
              <Link
                href="/youtube-subscriber-projector"
                className="font-medium text-primary hover:underline"
              >
                subscriber growth projector
              </Link>
              .
            </p>
            <p>
              TikTok followers, by contrast, exist in a separate ecosystem. A TikTok following does
              not directly translate to revenue on other platforms. You need to actively funnel
              TikTok audiences to YouTube, email lists, or other monetizable channels.
            </p>
          </div>
        </section>

        {/* Verdict */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">
            The Verdict: Different Tools for Different Jobs
          </h2>
          <div className="prose prose-sm max-w-none text-muted">
            <p>
              <strong>YouTube Shorts</strong> are the better choice if you already have (or are
              building) a long-form YouTube channel. Shorts are a subscriber acquisition machine,
              and those subscribers are worth dramatically more than TikTok followers because they
              directly feed your highest-RPM content.
            </p>
            <p>
              <strong>TikTok</strong> is the better choice if you are building a personal brand,
              want the fastest possible growth, or create content that does not naturally extend to
              long-form video. TikTok&rsquo;s algorithm gives new creators the best shot at reaching
              a large audience quickly.
            </p>
            <p>
              <strong>Both together</strong> is the ideal strategy. Cross-post your short-form
              content to maximize reach, then let YouTube&rsquo;s long-form ecosystem handle the
              heavy monetization.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/youtube-shorts-money-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Calculate Shorts Revenue
            </Link>
            <Link
              href="/tiktok-sponsorship-rate-calculator"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Calculate TikTok Sponsorship Rate
            </Link>
            <Link
              href="/youtube-money-calculator"
              className="rounded-lg border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              Calculate YouTube Long-Form Earnings
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
