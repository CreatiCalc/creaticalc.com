import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';

import dynamic from 'next/dynamic';
const XMonetizationChecker = dynamic(
  () => import('@/features/calculators/x-monetization/XMonetizationChecker')
);
import CalculatorSkeleton from '@/features/calculators/shared/CalculatorSkeleton';
import type { FAQItem } from '@/features/calculators/shared/types';

export const metadata: Metadata = {
  title: 'X (Twitter) Monetization Eligibility Checker: Do You Qualify? [2026]',
  description:
    'Check if you qualify for X Ads Revenue Sharing, Subscriptions, Ticketed Spaces, and Tips. Enter your stats to see instant eligibility results. Free, no sign-up required.',
  openGraph: {
    title: 'X (Twitter) Monetization Eligibility Checker: Do You Qualify? [2026]',
    description:
      'Check if you qualify for X Ads Revenue Sharing, Subscriptions, Ticketed Spaces, and Tips. Enter your stats to see instant eligibility results. Free, no sign-up required.',
    url: '/x-monetization-checker',
  },
  alternates: {
    canonical: '/x-monetization-checker',
  },
};

const faq: FAQItem[] = [
  {
    question: 'What are the requirements for X Ads Revenue Sharing?',
    answer:
      "To qualify for X Ads Revenue Sharing, you need an active X Premium subscription ($8/month or higher), at least 500 verified followers, 5 million organic impressions in the last 3 months, an account that is at least 3 months old, and a connected Stripe account. Your content must also comply with X's Creator Monetization Standards.",
  },
  {
    question: 'How many followers do you need for X monetization?',
    answer:
      'It depends on the program. Tips has no follower requirement at all. Ads Revenue Sharing and Ticketed Spaces require at least 500 followers. Subscriptions has the highest bar at 2,000 followers. Note that for Ads Revenue Sharing, X technically requires "verified" (Premium) followers, which may be a subset of your total follower count.',
  },
  {
    question: 'How much does X Ads Revenue Sharing pay?',
    answer:
      'X pays creators from ad revenue generated in the replies section of their posts. The typical rate is roughly $8 to $12 per million verified-user impressions, though this varies based on advertiser demand, your content niche, and the geographic location of your audience. Finance and tech content tends to earn higher CPMs than general entertainment.',
  },
  {
    question: 'How do X Subscriptions work for creators?',
    answer:
      'X Subscriptions let you charge followers $2.99, $4.99, or $9.99 per month for exclusive content, subscriber-only posts, and a badge next to their name in your replies. You keep up to 97% of the revenue until you reach $50,000 in lifetime earnings, after which the share drops to 90%. You need X Premium, 2,000+ followers, 5 million impressions in 3 months, and recent posting activity to qualify.',
  },
  {
    question: 'What are Ticketed Spaces on X?',
    answer:
      'Ticketed Spaces are live audio sessions where you set a ticket price between $1 and $999. Listeners pay to join the conversation. They work well for workshops, expert Q&As, exclusive interviews, and community discussions. To qualify, you need X Premium, 500+ followers, and a history of hosting regular (free) Spaces.',
  },
  {
    question: 'Do you need X Premium to monetize on X?',
    answer:
      'For most monetization programs, yes. Ads Revenue Sharing, Subscriptions, and Ticketed Spaces all require an active X Premium subscription ($8/month for Premium, $16/month for Premium+). The only exception is Tips, which is available to all accounts with no subscription needed. At $8/month, Premium typically pays for itself quickly once you qualify for revenue sharing.',
  },
  {
    question: 'How do I find my organic impressions on X?',
    answer:
      'Go to X Analytics (analytics.x.com or tap the analytics icon on any of your posts). Look at the Posts section and check your impression counts over the last 90 days. Add up the monthly totals to get your 3-month figure. Note that only organic impressions count; paid/promoted impressions are excluded from the monetization threshold.',
  },
  {
    question: 'How much can I earn from X monetization?',
    answer:
      "Earnings vary widely. For Ads Revenue Sharing, creators with 5 to 10 million monthly impressions typically earn $10 to $100 per month. Subscriptions can be more lucrative if you have an engaged audience; even a 1% conversion rate on 10,000 followers at $4.99/month generates roughly $480/month after X's cut. Ticketed Spaces revenue depends on your topic, pricing, and audience size. Tips are entirely unpredictable.",
  },
  {
    question: 'What counts as a verified follower on X?',
    answer:
      'A verified follower is someone who has an active X Premium or Premium+ subscription (the blue checkmark). This is different from the old verification system where only public figures were verified. Since X Premium costs $8/month, your verified follower count will always be lower than your total follower count. X uses this metric because it indicates higher-quality, paying audience members.',
  },
  {
    question: 'Can I monetize on X without 5 million impressions?',
    answer:
      'Yes, through Tips and potentially Ticketed Spaces. Tips has no impression requirement and is available to everyone. Ticketed Spaces also does not require 5 million impressions, only 500+ followers and a track record of hosting Spaces. However, Ads Revenue Sharing and Subscriptions both require the 5 million impression threshold, which is the hardest requirement for most creators to meet.',
  },
  {
    question: 'How are your eligibility checks calculated?',
    answer: (
      <>
        Our eligibility checker uses the official requirements published by X for each monetization
        program, cross-referenced with third-party reporting. We update these requirements whenever
        X announces changes. Earnings estimates are rough ranges based on publicly reported creator
        earnings data. For full details on our data sources and methodology, see our{' '}
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
      Our X (Twitter) Monetization Eligibility Checker helps you figure out which X monetization
      programs you qualify for and what you need to do to unlock the rest.
    </p>
    <ol className="mt-3 list-decimal space-y-2 pl-5">
      <li>
        <strong>Enter your X stats</strong> &mdash; follower count, whether you have X Premium, your
        account age, and your organic impressions from the last 3 months.
      </li>
      <li>
        <strong>See instant results</strong> &mdash; the checker evaluates your stats against the
        official requirements for all 4 X monetization programs: Ads Revenue Sharing, Subscriptions,
        Ticketed Spaces, and Tips.
      </li>
      <li>
        <strong>Track your progress</strong> &mdash; for requirements you haven&rsquo;t met yet,
        progress bars show exactly how close you are (e.g., &ldquo;3.2M of 5M impressions&rdquo;).
      </li>
      <li>
        <strong>Get a personalized action plan</strong> &mdash; specific tips for closing the gap on
        your missing requirements, prioritized by impact.
      </li>
    </ol>

    <h3 className="mt-6 text-lg font-semibold text-foreground">
      The 4 X Monetization Programs Explained
    </h3>

    <p className="mt-2">
      <strong>Ads Revenue Sharing</strong> is X&rsquo;s main creator monetization program. You earn
      a share of ad revenue from ads displayed in the replies to your posts. X pays roughly $8 to
      $12 per million verified-user impressions, with 97% going to creators until $50K lifetime
      earnings.
    </p>
    <p className="mt-2">
      <strong>Subscriptions</strong> let you offer exclusive content to paying followers at $2.99,
      $4.99, or $9.99/month. Subscribers get a badge, exclusive posts, and direct access. This is
      the best option for creators who can offer consistent premium content.
    </p>
    <p className="mt-2">
      <strong>Ticketed Spaces</strong> are paid live audio sessions. Set a ticket price between $1
      and $999 per listener. Ideal for workshops, Q&amp;A sessions, expert panels, and community
      events.
    </p>
    <p className="mt-2">
      <strong>Tips</strong> is the simplest option with zero requirements. Followers can send you
      direct payments via PayPal, Cash App, Venmo, or crypto. X takes no cut.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Where to Find Your Stats</h3>
    <p className="mt-2">
      <strong>Follower count:</strong> Visible on your X profile page.{' '}
      <strong>Organic impressions:</strong> Go to X Analytics (analytics.x.com) and check your Posts
      section for the last 90 days. <strong>Account age:</strong> Check the &ldquo;Joined&rdquo;
      date on your profile.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">
      Beyond Platform Monetization: Sponsorships
    </h3>
    <p className="mt-2">
      X&rsquo;s built-in monetization is just one piece of the puzzle. Many creators earn
      significantly more from brand sponsorships than from platform programs. Use our{' '}
      <Link
        href="/twitter-sponsorship-rate-calculator"
        className="font-medium text-primary hover:underline"
      >
        X Sponsorship Rate Calculator
      </Link>{' '}
      to find out what you should charge brands for sponsored tweets, threads, and Spaces.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5">
      <li>
        <Link
          href="/twitter-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          X (Twitter) Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; calculate how much to charge brands for sponsored X content
      </li>
      <li>
        <Link
          href="/twitter-engagement-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          X (Twitter) Engagement Rate Calculator
        </Link>{' '}
        &mdash; measure your X engagement rate to benchmark your account
      </li>
      <li>
        <Link
          href="/engagement-rate-benchmarks"
          className="font-medium text-primary hover:underline"
        >
          Engagement Rate Benchmarks 2026
        </Link>{' '}
        &mdash; compare your engagement across all platforms
      </li>
    </ul>
  </>
);

export default function XMonetizationCheckerPage() {
  return (
    <>
      <CalculatorSchema
        name="X (Twitter) Monetization Eligibility Checker"
        description="Check if you qualify for X Ads Revenue Sharing, Subscriptions, Ticketed Spaces, and Tips based on your follower count, impressions, and account status."
        url="/x-monetization-checker"
        datePublished="2026-03-23"
        dateModified="2026-03-23"
      />
      <CalculatorLayout
        title="X (Twitter) Monetization Eligibility Checker"
        slug="x-monetization-checker"
        lastUpdated="March 2026"
        description="Enter your X stats to check which monetization programs you qualify for. See your progress toward Ads Revenue Sharing, Subscriptions, Ticketed Spaces, and Tips."
        faq={faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'X (Twitter)', path: '/x' },
          {
            name: 'Monetization Eligibility Checker',
            path: '/x-monetization-checker',
          },
        ]}
      >
        <Suspense fallback={<CalculatorSkeleton />}>
          <XMonetizationChecker />
        </Suspense>
      </CalculatorLayout>
    </>
  );
}
