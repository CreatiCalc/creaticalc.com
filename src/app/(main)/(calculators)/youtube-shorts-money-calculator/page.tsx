import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';

import { YouTubeMoneyCalculator } from '@/features/calculators/youtube-money';
import type { FAQItem } from '@/features/calculators/shared/types';

export const metadata: Metadata = {
  title: 'YouTube Shorts Money Calculator — How Much Do Shorts Pay?',
  description:
    'Free YouTube Shorts money calculator. Estimate how much Shorts pay per 1,000 views with RPM data ($0.01–$0.07). Calculate daily, monthly, and yearly Shorts revenue.',
  openGraph: {
    title: 'YouTube Shorts Money Calculator — How Much Do Shorts Pay?',
    description:
      'Estimate how much YouTube Shorts pay per 1,000 views. Free calculator with real RPM data for daily, monthly, and yearly Shorts revenue.',
    url: '/youtube-shorts-money-calculator',
  },
  alternates: {
    canonical: '/youtube-shorts-money-calculator',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How much do YouTube Shorts pay per 1,000 views?',
    answer:
      'YouTube Shorts pay between $0.01 and $0.07 per 1,000 views (RPM). This is significantly lower than long-form video RPM, which ranges from $1 to $25+ depending on niche. The lower Shorts RPM reflects the shorter ad format and different revenue pool. At $0.04 mid-range RPM, 1 million Shorts views would earn roughly $40.',
  },
  {
    question: 'How does YouTube Shorts monetization work?',
    answer:
      'YouTube Shorts monetization works through ads shown between Shorts in the Shorts feed. Revenue from these ads is pooled together, then allocated to creators based on their share of total Shorts views. Creators receive 45% of the allocated revenue. Unlike long-form videos where niche and CPM heavily influence earnings, Shorts RPM is relatively flat across content categories.',
  },
  {
    question: 'How many Shorts views do I need to make $100 per month?',
    answer:
      'At the mid-range Shorts RPM of $0.04 per 1,000 views, you need about 2.5 million Shorts views per month to earn $100. That works out to roughly 83,000 views per day. At the higher end ($0.07 RPM), you would need about 1.4 million monthly views. Many Shorts creators supplement their income with long-form content, sponsorships, and affiliate links.',
  },
  {
    question: 'Do YouTube Shorts pay less than long-form videos?',
    answer:
      'Yes, YouTube Shorts pay significantly less per view than long-form videos. Shorts RPM is typically $0.01–$0.07 per 1,000 views, compared to $1–$25+ for long-form content depending on niche. However, Shorts often get dramatically more views — a single Short can go viral and reach millions of viewers. Many creators use Shorts to build their audience, then monetize through long-form content and sponsorships.',
  },
  {
    question: 'What are the requirements to monetize YouTube Shorts?',
    answer:
      'To monetize YouTube Shorts through ad revenue sharing, you need to be in the YouTube Partner Program (YPP). The Shorts-specific threshold requires 1,000 subscribers and 10 million public Shorts views in the last 90 days. Alternatively, you can qualify through the standard path: 1,000 subscribers and 4,000 public watch hours on long-form videos in the past 12 months.',
  },
  {
    question: 'Does content niche affect YouTube Shorts earnings?',
    answer:
      'Unlike long-form videos where niche can change RPM by 10x or more, content niche has minimal impact on Shorts earnings. This is because Shorts ads are served between videos in a mixed feed, not targeted to specific content categories the same way long-form pre-roll and mid-roll ads are. Finance and tech Shorts may earn slightly toward the higher end of the $0.01–$0.07 range, but the difference is much smaller than with long-form content.',
  },
  {
    question: 'How do YouTube Shorts compare to TikTok for earnings?',
    answer:
      'YouTube Shorts and TikTok pay similarly low rates per view, but the structures differ. YouTube Shorts pays $0.01–$0.07 per 1,000 views through ad revenue sharing. TikTok Creator Fund pays roughly $0.02–$0.04 per 1,000 views. However, both platforms offer additional monetization through sponsorships, brand deals, and affiliate marketing, where rates are comparable and depend more on audience engagement than platform.',
  },
  {
    question: 'What is the YouTube Shorts Fund?',
    answer:
      'The YouTube Shorts Fund was a $100 million fund distributed from 2021 to 2023, paying top Shorts creators between $100 and $10,000 per month based on performance. It has since been replaced by the Shorts ad revenue sharing model, which launched in February 2023. Under the current system, creators earn 45% of ad revenue allocated to their Shorts, with payouts based on actual views rather than a fixed fund.',
  },
  {
    question: 'Can I make a living from YouTube Shorts alone?',
    answer:
      'Making a full-time living from Shorts ad revenue alone is very difficult. At $0.04 RPM, you would need about 50 million monthly views to earn $2,000/month. However, many successful Shorts creators earn well by combining ad revenue with sponsorships, merchandise, and using Shorts to drive subscribers to their higher-paying long-form content. Shorts are best viewed as a growth tool and one revenue stream among several.',
  },
  {
    question: 'How often does YouTube pay for Shorts?',
    answer:
      "YouTube pays Shorts creators monthly through Google AdSense, the same payment system used for long-form video earnings. Payments are issued between the 21st and 26th of each month for the previous month's earnings, provided you have reached the $100 minimum payment threshold. Revenue from Shorts and long-form videos is combined into a single monthly payment.",
  },
];

const howItWorks = (
  <>
    <p>
      Our YouTube Shorts Money Calculator estimates your potential Shorts earnings using real RPM
      (Revenue Per Mille) data. YouTube Shorts have a flat RPM of roughly $0.01 to $0.07 per 1,000
      views, regardless of content niche. This is because Shorts ads are served in a mixed feed
      rather than targeted by content category like long-form pre-roll ads.
    </p>
    <p className="mt-3">
      The formula: your projected monthly Shorts views (daily views &times; days in month &times;
      growth factor) are divided by 1,000 and multiplied by the Shorts RPM range. If seasonality is
      enabled, each month uses a different RPM multiplier based on real advertising cycles. The
      12-month chart shows the range between low and high estimates, with the mid estimate as a
      trend line.
    </p>
    <p className="mt-3">
      Keep in mind that Shorts ad revenue is just one income stream. Many successful Shorts creators
      earn significantly more through{' '}
      <Link
        href="/youtube-sponsorship-rate-calculator"
        className="font-medium text-primary hover:underline"
      >
        brand sponsorships
      </Link>
      , affiliate marketing, and by using Shorts as a funnel to drive subscribers to their{' '}
      <Link href="/youtube-money-calculator" className="font-medium text-primary hover:underline">
        long-form content
      </Link>
      , which pays 20&ndash;100x more per view.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">
      Why Shorts Pay Less Than Long-Form Videos
    </h3>
    <p className="mt-2">
      Long-form videos can run pre-roll, mid-roll, and post-roll ads, with CPM rates ranging from
      $1.50 to $45 depending on niche. Shorts, on the other hand, share a pooled ad revenue model
      where ads appear between Shorts in the feed. The shorter viewing duration and different ad
      format result in much lower per-view earnings. However, the tradeoff is reach: Shorts can
      generate millions of views with far less production effort. Use our{' '}
      <Link href="/youtube-money-calculator" className="font-medium text-primary hover:underline">
        YouTube Money Calculator
      </Link>{' '}
      to compare what the same views would earn on long-form content.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Shorts as a Growth Strategy</h3>
    <p className="mt-2">
      Many creators use Shorts as a subscriber acquisition tool rather than a primary revenue
      source. A viral Short can add thousands of subscribers in a single day &mdash;{' '}
      <Link
        href="/youtube-subscriber-projector"
        className="font-medium text-primary hover:underline"
      >
        project your subscriber growth
      </Link>{' '}
      to see when you&rsquo;ll hit key milestones. Those subscribers then watch your long-form
      content where you earn 20&ndash;100x more per view. This strategy combines the reach of Shorts
      with the monetization power of long-form videos, creating a more sustainable income than
      either format alone.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">
      Beyond Ad Revenue: Sponsorships for Shorts Creators
    </h3>
    <p className="mt-2">
      While Shorts ad revenue is modest, Shorts creators with engaged audiences can earn
      significantly more through sponsorships. Brands are increasingly interested in short-form
      sponsored content because of its viral potential and low cost-per-impression. A Shorts
      sponsorship typically pays 0.4x the rate of a standard YouTube integration &mdash; use our{' '}
      <Link
        href="/youtube-sponsorship-rate-calculator"
        className="font-medium text-primary hover:underline"
      >
        YouTube Sponsorship Rate Calculator
      </Link>{' '}
      to see what your channel could charge. If you also create content on other platforms, compare
      rates across{' '}
      <Link
        href="/instagram-sponsorship-rate-calculator"
        className="font-medium text-primary hover:underline"
      >
        Instagram
      </Link>
      ,{' '}
      <Link
        href="/tiktok-sponsorship-rate-calculator"
        className="font-medium text-primary hover:underline"
      >
        TikTok
      </Link>
      , and{' '}
      <Link
        href="/facebook-sponsorship-rate-calculator"
        className="font-medium text-primary hover:underline"
      >
        Facebook
      </Link>
      .
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5">
      <li>
        <Link href="/youtube-money-calculator" className="font-medium text-primary hover:underline">
          YouTube Money Calculator
        </Link>{' '}
        &mdash; estimate long-form video earnings by views, CPM, and niche
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
          href="/youtube-subscriber-projector"
          className="font-medium text-primary hover:underline"
        >
          YouTube Subscriber Growth Projector
        </Link>{' '}
        &mdash; forecast your subscriber growth and milestone dates
      </li>
      <li>
        <Link
          href="/tiktok-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          TikTok Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; compare Shorts earnings with TikTok sponsorship rates
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

export default function YouTubeShortsMoneyCalculatorPage() {
  return (
    <>
      <CalculatorSchema
        name="YouTube Shorts Money Calculator"
        description="Estimate how much YouTube Shorts pay per 1,000 views with real RPM data."
        url="/youtube-shorts-money-calculator"
      />
      <CalculatorLayout
        title="YouTube Shorts Money Calculator"
        description="Estimate your YouTube Shorts earnings based on daily views. See projected daily, monthly, and yearly Shorts revenue with growth modeling and seasonal adjustments."
        faq={faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'YouTube', path: '/youtube-money-calculator' },
          { name: 'YouTube Shorts Money Calculator', path: '/youtube-shorts-money-calculator' },
        ]}
      >
        <Suspense>
          <YouTubeMoneyCalculator
            defaultOverrides={{ contentFormat: 'shorts', dailyViews: 50000 }}
            hideFormatToggle
          />
        </Suspense>
      </CalculatorLayout>
    </>
  );
}
