import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';

import dynamic from 'next/dynamic';
const YouTubeGrowthCalculator = dynamic(
  () => import('@/features/calculators/youtube-growth/YouTubeGrowthCalculator')
);
import CalculatorSkeleton from '@/features/calculators/shared/CalculatorSkeleton';
import type { FAQItem } from '@/features/calculators/shared/types';

export const metadata: Metadata = {
  title: 'YouTube Subscriber Projector 2026',
  description:
    "Free YouTube subscriber growth projector. See when you'll hit 1K, 10K, 100K, and 1M subs — milestones for YouTube Partner Program eligibility and monetization.",
  openGraph: {
    title: 'YouTube Subscriber Projector 2026',
    description:
      'Project your YouTube subscriber growth to key monetization milestones. Free 24-month tool with YouTube Partner Program tracking.',
    url: '/youtube-subscriber-projector',
  },
  alternates: {
    canonical: '/youtube-subscriber-projector',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How many subscribers do you need for the YouTube Partner Program?',
    answer:
      "You need at least 1,000 subscribers and either 4,000 watch hours in the past 12 months or 10 million Shorts views in the past 90 days to join the YouTube Partner Program (YPP). Once accepted, you can monetize through ads, channel memberships, Super Chat, and the merch shelf. Our projector shows when you'll reach this milestone based on your current growth rate.",
  },
  {
    question: 'What is a good monthly subscriber growth rate on YouTube?',
    answer:
      'A healthy monthly subscriber growth rate depends on your channel size and niche. For small channels (under 10K), 5-10% monthly growth is solid. For mid-size channels (10K-100K), 3-5% is strong. Large channels (100K+) typically grow at 1-3% monthly because percentage growth naturally slows as channels get bigger. Entertainment and gaming channels tend to grow fastest, while finance and lifestyle channels grow more steadily.',
  },
  {
    question: 'How long does it take to get 1,000 subscribers on YouTube?',
    answer:
      'The time to reach 1,000 subscribers varies widely. With consistent uploads (2+ per week) and good content, many creators reach 1K in 6-12 months. However, some channels in highly competitive niches may take 1-2 years, while channels that go viral can reach it in weeks. Our projector lets you model your specific scenario based on your current subscriber count and growth rate.',
  },
  {
    question: 'What is the Silver Play Button?',
    answer:
      "The Silver Play Button (officially the Creator Award) is given to YouTube channels that reach 100,000 subscribers. It's a physical plaque sent by YouTube to celebrate the milestone. After that, the Gold Play Button comes at 1 million subscribers, the Diamond Play Button at 10 million, and the Red Diamond at 100 million.",
  },
  {
    question: 'Does upload frequency affect subscriber growth?',
    answer:
      'Yes, upload frequency has a significant impact on subscriber growth. Channels that upload 2-3 times per week tend to grow faster than those posting once a week or less. The YouTube algorithm favors channels with consistent upload schedules because they generate more watch time and keep viewers engaged. However, quality matters more than quantity — one great video per week beats five low-effort uploads.',
  },
  {
    question: 'What is growth deceleration?',
    answer:
      'Growth deceleration is the natural phenomenon where larger YouTube channels grow slower in percentage terms. A channel with 1,000 subscribers growing at 10% gains 100 new subs/month, but maintaining 10% at 100,000 subscribers means gaining 10,000/month — which is much harder. Our deceleration model applies realistic dampening: full speed below 10K, 85% at 10K-100K, 70% at 100K-500K, 60% at 500K-1M, and 50% above 1M subscribers.',
  },
  {
    question: 'Which YouTube niche grows fastest?',
    answer:
      'Entertainment and gaming channels typically see the highest monthly growth rates (5-6% average) because of their broad appeal and viral potential. Education (5%) and health/fitness (4.5%) also grow well. Finance and beauty channels tend to grow more slowly (3-3.5%) but often have higher engagement and monetization potential per subscriber.',
  },
  {
    question: 'How accurate is this subscriber projector?',
    answer:
      'This tool provides estimates based on compound growth modeling. Real subscriber growth is influenced by many unpredictable factors: algorithm changes, viral videos, seasonal trends, and content quality. The confidence band in our chart widens over time to reflect this increasing uncertainty. Use the projections as a planning guide rather than exact predictions, and revisit regularly with updated numbers.',
  },
  {
    question: 'What does the confidence band show?',
    answer:
      'The shaded area around the projection line represents the confidence band — a range of likely outcomes. It starts narrow (close to the projected line) in the first few months and widens over time, reflecting the increasing uncertainty of long-term projections. The band expands by approximately 1 percentage point per month, capping at ±30%. Your actual growth will likely fall somewhere within this range.',
  },
  {
    question: 'How do YouTube community posts work at 10K subscribers?',
    answer:
      "At 10,000 subscribers, YouTube unlocks the Community tab, allowing you to post text updates, polls, images, and GIFs directly to your subscribers' feeds. Community posts are a powerful engagement tool — they appear in the Subscriptions feed and can even show up on the Home page, helping you stay connected with your audience between video uploads.",
  },
  {
    question: 'Can YouTube Shorts help grow subscribers faster?',
    answer:
      'Yes, YouTube Shorts can significantly accelerate subscriber growth. Shorts reach a different audience through the Shorts shelf and can expose your channel to millions of viewers who might not find your long-form content. Many creators report that Shorts contribute 30-50% of their new subscriber growth. The key is using Shorts to attract viewers and then converting them to long-form viewers through your content strategy.',
  },
  {
    question: 'What is the difference between rate mode and flat gain mode?',
    answer:
      'Rate mode uses percentage-based compound growth — your subscriber count grows by a fixed percentage each month, meaning the absolute number of new subscribers increases over time. This models organic channel growth well. Flat gain mode adds a fixed number of subscribers each month regardless of channel size. This is useful if you have a predictable external traffic source (like a blog or social media following) that drives a steady stream of new subscribers.',
  },
  {
    question: 'Can I embed this calculator on my website?',
    answer:
      'Yes! Click the "Embed" button below the calculator results to get a free embed code for your website or blog. You can customize the theme (light or dark), accent color, and height to match your site\'s design. The embed is fully responsive and works on any website that supports iframes.',
  },
  {
    question: 'How are your numbers calculated?',
    answer: (
      <>
        All our estimates are based on publicly available industry data, creator-reported earnings,
        and official platform documentation. We explain our data sources, formulas, update schedule,
        and assumptions in detail on our{' '}
        <Link href="/methodology" className="font-medium text-primary hover:underline">
          Methodology page
        </Link>
        .
      </>
    ),
  },
];

const howItWorks = (
  <>
    <p>
      Our YouTube Subscriber Growth Projector models your channel&apos;s growth trajectory over 24
      months.
    </p>
    <ol className="mt-3 list-decimal space-y-2 pl-5">
      <li>
        <strong>Enter your current subscriber count</strong> — the projector starts from your actual
        channel size.
      </li>
      <li>
        <strong>Choose a growth mode</strong> — percentage rate (compounding) or flat monthly
        subscriber gain.
      </li>
      <li>
        <strong>Adjust upload frequency and content niche</strong> — the algorithm rewards
        consistent publishing with a 0.5&times; to 1.2&times; upload multiplier.
      </li>
      <li>
        <strong>View your 24-month projection</strong> — see a growth chart with milestone tracking
        for 1K, 10K, 100K, 500K, and 1M subscribers.
      </li>
    </ol>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Growth Model</h3>
    <p className="mt-2">
      In rate mode, each month&apos;s subscriber count is calculated as: previous month &times; (1 +
      growth rate &times; deceleration factor &times; upload multiplier). In flat gain mode, a fixed
      number of new subscribers is added each month, adjusted by the upload multiplier. The upload
      multiplier ranges from 0.5&times; (no uploads) to 1.2&times; (5+ uploads per week), reflecting
      the algorithm&apos;s preference for consistent publishers.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Deceleration</h3>
    <p className="mt-2">
      Real YouTube channels experience slower percentage growth as they scale. Our deceleration
      model applies realistic dampening based on channel size: full growth rate below 10K
      subscribers, 85% at 10K&ndash;100K, 70% at 100K&ndash;500K, 60% at 500K&ndash;1M, and 50%
      above 1M. This prevents unrealistically exponential projections for larger channels.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Milestones</h3>
    <p className="mt-2">
      The milestone timeline tracks when you&apos;ll reach key subscriber thresholds: 1K (YouTube
      Partner Program eligibility), 10K (Community tab), 50K, 100K (Silver Play Button), 500K, and
      1M (Gold Play Button). Milestones you&apos;ve already passed are marked with a green check,
      and those beyond the 24-month window are shown as unreachable.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">What Your Subscribers Are Worth</h3>
    <p className="mt-2">
      As your subscriber count grows, so does your earning potential. Use our{' '}
      <Link href="/youtube-money-calculator" className="font-medium text-primary hover:underline">
        YouTube Money Calculator
      </Link>{' '}
      to estimate how much you&apos;ll earn from ad revenue at each milestone, or check the{' '}
      <Link
        href="/youtube-sponsorship-rate-calculator"
        className="font-medium text-primary hover:underline"
      >
        YouTube Sponsorship Rate Calculator
      </Link>{' '}
      to see how much brands will pay to sponsor your videos at different subscriber levels. Many
      creators also use{' '}
      <Link
        href="/youtube-shorts-money-calculator"
        className="font-medium text-primary hover:underline"
      >
        YouTube Shorts
      </Link>{' '}
      to accelerate subscriber growth while monetizing through short-form content.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5">
      <li>
        <Link href="/youtube-money-calculator" className="font-medium text-primary hover:underline">
          YouTube Money Calculator
        </Link>{' '}
        &mdash; estimate your YouTube ad revenue by views, CPM, and niche
      </li>
      <li>
        <Link
          href="/youtube-shorts-money-calculator"
          className="font-medium text-primary hover:underline"
        >
          YouTube Shorts Money Calculator
        </Link>{' '}
        &mdash; estimate how much Shorts pay per 1,000 views
      </li>
      <li>
        <Link
          href="/youtube-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          YouTube Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; find out how much to charge for integrations, dedicated videos, and Shorts
        sponsorships
      </li>
      <li>
        <Link
          href="/instagram-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Instagram Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; calculate cross-platform sponsorship rates for Instagram
      </li>
      <li>
        <Link
          href="/tiktok-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          TikTok Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; compare sponsorship rates across platforms
      </li>
      <li>
        <Link
          href="/engagement-rate-benchmarks"
          className="font-medium text-primary hover:underline"
        >
          Engagement Rate Benchmarks 2026
        </Link>{' '}
        &mdash; see how your engagement compares across all platforms
      </li>
    </ul>
  </>
);

export default function YouTubeSubscriberProjectorPage() {
  return (
    <>
      <CalculatorSchema
        name="YouTube Subscriber Growth Projector"
        description="Project your YouTube subscriber growth over 24 months and see when you'll hit key milestones like 1K, 100K, and 1M subscribers."
        url="/youtube-subscriber-projector"
        datePublished="2025-01-15"
        dateModified="2026-02-16"
      />
      <CalculatorLayout
        title="YouTube Subscriber Growth Projector"
        slug="youtube-subscriber-projector"
        lastUpdated="February 2026"
        description="Project your YouTube subscriber growth over 24 months. See when you'll hit key milestones based on your growth rate, upload frequency, and content niche."
        faq={faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'YouTube', path: '/youtube' },
          {
            name: 'YouTube Subscriber Growth Projector',
            path: '/youtube-subscriber-projector',
          },
        ]}
      >
        <Suspense fallback={<CalculatorSkeleton />}>
          <YouTubeGrowthCalculator />
        </Suspense>
      </CalculatorLayout>
    </>
  );
}
