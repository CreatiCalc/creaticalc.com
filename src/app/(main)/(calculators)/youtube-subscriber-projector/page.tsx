import { Suspense } from 'react';
import type { Metadata } from 'next';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { YouTubeGrowthCalculator } from '@/features/calculators/youtube-growth';
import type { FAQItem } from '@/features/calculators/shared/types';

export const metadata: Metadata = {
  title: 'YouTube Subscriber Growth Projector — Free Tool',
  description:
    "Free YouTube subscriber growth projector. See when you'll hit 1K, 10K, 100K, and 1M subscribers based on your current growth rate, upload frequency, and content niche.",
  openGraph: {
    title: 'YouTube Subscriber Growth Projector — Free Tool',
    description:
      "Project your YouTube subscriber growth and see when you'll hit key milestones. Free 24-month projection tool.",
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
];

const howItWorks = (
  <>
    <p>
      Our YouTube Subscriber Growth Projector models your channel&apos;s growth trajectory over 24
      months. Enter your current subscriber count, choose a growth mode (percentage rate or flat
      monthly gain), and adjust parameters like upload frequency and content niche to see a
      personalized projection.
    </p>

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
  </>
);

export default function YouTubeSubscriberProjectorPage() {
  return (
    <>
      <CalculatorSchema
        name="YouTube Subscriber Growth Projector"
        description="Project your YouTube subscriber growth over 24 months and see when you'll hit key milestones like 1K, 100K, and 1M subscribers."
        url="/youtube-subscriber-projector"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'YouTube', path: '/youtube-money-calculator' },
          {
            name: 'YouTube Subscriber Growth Projector',
            path: '/youtube-subscriber-projector',
          },
        ]}
      />
      <CalculatorLayout
        title="YouTube Subscriber Growth Projector"
        description="Project your YouTube subscriber growth over 24 months. See when you'll hit key milestones based on your growth rate, upload frequency, and content niche."
        faq={faq}
        howItWorks={howItWorks}
      >
        <Suspense>
          <YouTubeGrowthCalculator />
        </Suspense>
      </CalculatorLayout>
    </>
  );
}
