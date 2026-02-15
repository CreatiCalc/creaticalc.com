import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';

import { FacebookSponsorshipCalculator } from '@/features/calculators/facebook-sponsorship';
import type { FAQItem } from '@/features/calculators/shared/types';

export const metadata: Metadata = {
  title: 'Facebook Sponsorship Rate Calculator — How Much to Charge in 2026',
  description:
    'Free Facebook sponsorship rate calculator. Find out how much to charge for sponsored feed posts, Reels, Stories, and Lives based on your followers, engagement rate, and niche.',
  openGraph: {
    title: 'Facebook Sponsorship Rate Calculator — How Much to Charge in 2026',
    description:
      'Calculate your Facebook sponsorship rates based on followers, engagement, content type, and niche. Free rate card generator for creators.',
    url: '/facebook-sponsorship-rate-calculator',
  },
  alternates: {
    canonical: '/facebook-sponsorship-rate-calculator',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How much should I charge for a sponsored Facebook post?',
    answer:
      "The standard formula is roughly $5–$15 per 1,000 followers for a basic feed post mention, adjusted for your engagement rate, niche, and deal type. A 10K-follower Facebook Page with average engagement typically charges $50–$150 per sponsored feed post. Higher engagement rates, premium niches like finance or tech, and dedicated reviews can multiply this rate by 2–5x. Facebook rates tend to be slightly lower than Instagram per follower, but Facebook audiences often have higher purchasing power due to the platform's older demographic.",
  },
  {
    question: 'How much do Facebook Reels sponsorships pay?',
    answer:
      'Facebook Reels sponsorships typically command 1.4x the rate of a standard feed post because Reels benefit from algorithmic boost and reach audiences beyond your existing followers. A creator with 50K followers might charge $250–$750 for a sponsored feed post but $350–$1,050 for a Reel. Facebook Reels are a rapidly growing format, and brands are increasingly allocating budget to short-form video content on the platform. The exact rate depends on your engagement rate, content niche, and the type of brand deal.',
  },
  {
    question: 'What is the going rate for Facebook Story sponsorships?',
    answer:
      'Facebook Story sponsorships are typically priced at about 30% of a feed post rate, since Stories are ephemeral with a 24-hour lifespan and generally get fewer views than feed posts. However, Stories with direct links or strong call-to-actions can command higher rates because they drive immediate conversions. Stories work particularly well for time-sensitive promotions, flash sales, and direct-response campaigns. Many creators sell Story packages (3–5 frames) rather than individual frames to increase deal value.',
  },
  {
    question: 'How much can I charge for a Facebook Live sponsorship?',
    answer:
      "Facebook Live sponsorships are typically priced at about 0.7x of a standard feed post rate. While Lives require significant creator time and cannot be pre-produced or edited, they offer brands real-time audience engagement, live product demonstrations, and authentic interaction through comments. Live sponsorships work exceptionally well for product launches, Q&A sessions, and tutorials. The interactive nature of Lives often drives higher conversion rates, which can justify premium pricing for brands that understand the format's value.",
  },
  {
    question: 'How does engagement rate affect Facebook sponsorship pricing?',
    answer:
      'Engagement rate is one of the most important factors in Facebook sponsorship pricing. Creators with below 1% engagement typically earn significantly less than standard rates, while those above 5% can charge a substantial premium. Brands pay for engaged audiences that will actually interact with sponsored content and convert into customers. On Facebook, engagement rates tend to be lower on average than Instagram, so a 3–5% rate is considered excellent. A 20K-follower Page with 4% engagement is often more valuable to brands than a 100K Page with 0.3%.',
  },
  {
    question: 'What niches pay the most for Facebook sponsorships?',
    answer:
      "Finance and business content commands the highest sponsorship rates on Facebook (roughly 2x the base rate) because financial products have high customer lifetime values and Facebook's audience skews toward decision-makers with disposable income. Technology (1.5x), education (1.3x), health and fitness (1.2x), and parenting (1.2x) also pay above average. Entertainment and sports niches typically pay below average because they attract broader, less targeted audiences. These multipliers reflect how much brands in each industry are willing to spend on Facebook influencer marketing.",
  },
  {
    question: 'Why are Facebook sponsorship rates lower than Instagram?',
    answer:
      'Facebook sponsorship rates are generally lower per follower than Instagram because of the perception that Instagram is more "influencer-friendly" and visually driven. However, this perception undervalues Facebook\'s strengths: its audience skews 25–55 years old with higher average household incomes and purchasing power. Facebook also offers unique formats like Groups and Events that Instagram lacks. Savvy creators leverage these demographic advantages to negotiate higher rates by presenting audience purchasing power data and conversion metrics to brands.',
  },
  {
    question: 'How do I negotiate higher Facebook sponsorship rates?',
    answer:
      'Lead with your audience demographics rather than follower count — emphasize that Facebook audiences tend to be older, more affluent, and more likely to make purchasing decisions. Provide a media kit with audience age and income data, past campaign performance, and your rate card. Highlight community engagement metrics like Group activity, comment quality, and share rates, which demonstrate deeper audience connection. Charge separately for usage rights, exclusivity clauses, and cross-posting to Stories or Reels. Offering multi-post packages at a slight discount often increases total deal value while giving brands better results.',
  },
  {
    question: 'How many sponsored Facebook posts per month should I do?',
    answer:
      "Most successful creators limit sponsored content to 20–30% of their total posts to maintain audience trust and engagement. For Pages posting daily, that means 6–9 sponsored posts per month. Over-sponsoring can lead to audience fatigue, decreased organic reach, and declining engagement rates — which ultimately reduces your earning potential. Facebook's algorithm also deprioritizes overly promotional content. Quality partnerships with brands that align with your audience and content style are more valuable than a high volume of sponsorships.",
  },
  {
    question: 'How do I calculate my Facebook sponsorship rate with this calculator?',
    answer:
      'Enter your follower count, engagement rate (you can enter it directly or calculate it from your average reactions, comments, and shares), select your content type (Feed Post, Reel, Story, or Live), deal type (Mention, Dedicated, Review, or Series), and content niche. The calculator instantly generates a per-post rate range (low, mid, high) based on industry-standard formulas. You can also view a full rate card for all content types, project monthly earnings, and see how your rate compares to other creator tiers.',
  },
  {
    question: 'Are Facebook sponsorship rates going up or down in 2026?',
    answer:
      "Facebook sponsorship rates have remained stable and are showing signs of growth in 2026, driven primarily by the expansion of Facebook Reels and the continued strength of Facebook Groups as community hubs. While some predicted a decline in Facebook influencer marketing, the platform's 3+ billion monthly active users and strong purchasing demographics continue to attract brand spending. Creators who diversify across feed posts, Reels, Stories, and Lives — and who can demonstrate measurable ROI — are seeing rate increases of 10–15% year-over-year.",
  },
  {
    question: 'What is the difference between Facebook Page and Facebook Group sponsorships?',
    answer:
      "Facebook Page sponsorships involve branded content published on your public Page, similar to a standard influencer post on any platform. Facebook Group sponsorships involve promoting a brand within a community you manage, which carries a different kind of value — community endorsement. Group sponsorships can command a premium because members trust the group admin's recommendations and engagement rates within Groups tend to be significantly higher than on Pages. However, Group sponsorships require careful handling to maintain community trust, and over-promotion can lead to member pushback or departures.",
  },
];

const howItWorks = (
  <>
    <p>
      Our Facebook Sponsorship Rate Calculator helps creators determine how much to charge for
      branded content on Facebook. The calculator uses a formula based on your follower count,
      engagement rate, content type, deal type, and content niche to produce a per-post rate range
      that reflects current market rates.
    </p>
    <p className="mt-3">
      The base rate starts at $5–$15 per 1,000 followers for Facebook, then multiplies based on your
      specific profile. Higher engagement rates (above 5%) can significantly increase your rate,
      while premium niches like finance and tech command 1.5–2x multipliers. Content type matters
      too — Reels pay 1.4x more than feed posts, while Stories are priced at about 30% of a feed
      post.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Understanding the Rate Formula</h3>
    <p className="mt-2">
      The formula is: (Followers &divide; 1,000) &times; Base Rate &times; Engagement Multiplier
      &times; Niche Multiplier &times; Content Type Multiplier &times; Deal Type Multiplier. Each
      multiplier adjusts the base rate up or down based on the specific value. For example, a
      &ldquo;Review&rdquo; deal type carries a 3.5x multiplier because it requires the most creator
      effort and provides the most brand exposure.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Facebook&apos;s Unique Value</h3>
    <p className="mt-2">
      Facebook&apos;s audience skews older than Instagram or TikTok, with the core demographic being
      25–55 years old. This audience tends to have higher household incomes and greater purchasing
      power, making them particularly valuable for brands selling mid-to-high-ticket products and
      services. Facebook Groups add another layer of value — creators who manage active Groups can
      offer brands access to highly engaged communities with strong trust dynamics. These factors
      mean that while per-follower rates may be lower than Instagram, the return on investment for
      brands can be comparable or even superior.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Content Types Explained</h3>
    <p className="mt-2">
      <strong>Feed Post (1.0x)</strong> — The standard sponsored post format. A single image, video,
      or link post in your feed with a branded caption. <strong>Reel (1.4x)</strong> — Short-form
      vertical video with algorithmic reach boost and higher production value.{' '}
      <strong>Story (0.3x)</strong> — Ephemeral 24-hour content, lower production but useful for
      direct links and time-sensitive promotions. <strong>Live (0.7x)</strong> — Real-time broadcast
      with audience interaction, ideal for product demonstrations and Q&amp;A sessions.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Deal Types Explained</h3>
    <p className="mt-2">
      <strong>Mention (1.0x)</strong> — Brief brand reference in your regular content.{' '}
      <strong>Dedicated (2.5x)</strong> — Entire post focused on the brand.{' '}
      <strong>Review (3.5x)</strong> — In-depth product review with honest assessment.{' '}
      <strong>Series (2.0x per post)</strong> — Multi-post campaign at a per-post rate, often with a
      bundled discount.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5">
      <li>
        <Link
          href="/facebook-engagement-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Facebook Engagement Rate Calculator
        </Link>{' '}
        — measure your Facebook engagement to set better sponsorship rates
      </li>
      <li>
        <Link
          href="/instagram-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Instagram Sponsorship Rate Calculator
        </Link>{' '}
        — compare cross-platform sponsorship rates with Instagram
      </li>
      <li>
        <Link
          href="/tiktok-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          TikTok Sponsorship Rate Calculator
        </Link>{' '}
        — compare cross-platform sponsorship rates with TikTok
      </li>
      <li>
        <Link
          href="/youtube-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          YouTube Sponsorship Rate Calculator
        </Link>{' '}
        — calculate YouTube integration and dedicated video rates
      </li>
      <li>
        <Link
          href="/twitter-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          X (Twitter) Sponsorship Rate Calculator
        </Link>{' '}
        — calculate X sponsorship pricing for tweets and threads
      </li>
      <li>
        <Link
          href="/engagement-rate-benchmarks"
          className="font-medium text-primary hover:underline"
        >
          Engagement Rate Benchmarks 2026
        </Link>{' '}
        — full benchmark data across all platforms
      </li>
    </ul>
  </>
);

export default function FacebookSponsorshipPage() {
  return (
    <>
      <CalculatorSchema
        name="Facebook Sponsorship Rate Calculator"
        description="Calculate how much to charge for sponsored Facebook feed posts, Reels, Stories, and Lives based on your followers, engagement rate, and niche."
        url="/facebook-sponsorship-rate-calculator"
      />
      <CalculatorLayout
        title="Facebook Sponsorship Rate Calculator"
        description="Find out how much to charge for sponsored posts on Facebook. Get a personalized rate card based on your followers, engagement rate, content type, and niche."
        faq={faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Facebook', path: '/facebook-engagement-rate-calculator' },
          {
            name: 'Facebook Sponsorship Rate Calculator',
            path: '/facebook-sponsorship-rate-calculator',
          },
        ]}
      >
        <Suspense>
          <FacebookSponsorshipCalculator />
        </Suspense>
      </CalculatorLayout>
    </>
  );
}
