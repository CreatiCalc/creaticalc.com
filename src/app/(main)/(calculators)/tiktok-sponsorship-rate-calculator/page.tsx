import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { TikTokSponsorshipCalculator } from '@/features/calculators/tiktok-sponsorship';
import type { FAQItem } from '@/features/calculators/shared/types';

export const metadata: Metadata = {
  title: 'TikTok Sponsorship Rate Calculator — How Much to Charge in 2026',
  description:
    'Free TikTok sponsorship rate calculator. Find out how much to charge for sponsored videos, Stories, and Lives based on your followers, engagement rate, and niche.',
  openGraph: {
    title: 'TikTok Sponsorship Rate Calculator — How Much to Charge in 2026',
    description:
      'Calculate your TikTok sponsorship rates based on followers, engagement, content type, and niche. Free rate card generator for creators.',
    url: '/tiktok-sponsorship-rate-calculator',
  },
  alternates: {
    canonical: '/tiktok-sponsorship-rate-calculator',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How much should I charge for a sponsored TikTok video?',
    answer:
      'The standard formula is roughly $5–$15 per 1,000 followers for a basic video mention, adjusted for your engagement rate, niche, and deal type. A 10K-follower account with average engagement typically charges $50–$150 per sponsored video. Higher engagement rates, premium niches, and dedicated reviews can multiply this rate by 2–5x. TikTok rates are generally lower than Instagram per follower, but TikTok videos can reach far beyond your follower base.',
  },
  {
    question: 'Why are TikTok sponsorship rates lower than Instagram?',
    answer:
      'TikTok sponsorship rates are typically 50–70% of Instagram rates for comparable audience sizes. This is because TikTok is a newer platform with less mature brand deal infrastructure, and the ephemeral nature of TikTok content (algorithm-driven rather than follower-driven) makes reach less predictable. However, TikTok compensates with viral potential — a sponsored video can reach millions of viewers beyond your follower count, which makes cost-per-impression often comparable to or better than Instagram.',
  },
  {
    question: 'How does engagement rate affect TikTok sponsorship pricing?',
    answer:
      'Engagement rate significantly impacts your TikTok sponsorship rates. Creators with below 1% engagement earn about 50% less than standard rates, while those above 5% can charge 2x the standard rate. TikTok naturally has higher engagement rates than Instagram (platform average around 4.9% vs 0.98%), so the benchmarks are different. Brands on TikTok are especially interested in engagement quality — comments, shares, and saves matter more than passive likes.',
  },
  {
    question: 'How much do TikTok Story sponsorships pay?',
    answer:
      'TikTok Story sponsorships are priced at about 25% of a standard video rate, since Stories disappear after 24 hours and get significantly fewer views than feed videos. Most creators bundle Stories with video sponsorships rather than selling them separately. If you do sell Stories alone, they work best for flash promotions, discount codes, or behind-the-scenes brand content.',
  },
  {
    question: 'How much can I charge for a TikTok Live sponsorship?',
    answer:
      "TikTok Live sponsorships are typically priced at about 80% of a standard video rate. Lives require real-time presentation skills and have lower production costs but demand more of the creator's time. The advantage of Live sponsorships is the interactive element — viewers can ask questions about the product in real-time, creating more authentic engagement. Many brands pair Live sponsorships with a follow-up edited video for maximum impact.",
  },
  {
    question: 'What niches pay the most for TikTok sponsorships?',
    answer:
      'Finance and business content commands the highest TikTok sponsorship rates (roughly 2x the base rate) because financial products have high customer lifetime values. Technology (1.5x), education (1.3x), health and fitness (1.2x), and beauty (1.2x) also pay above average. Entertainment and sports niches typically pay below average because they have broader audiences that are harder to convert. These multipliers reflect brand willingness to spend on influencer marketing in each vertical.',
  },
  {
    question: 'How do I negotiate higher sponsorship rates on TikTok?',
    answer:
      'Highlight your average views relative to your follower count — if your videos consistently get views exceeding your follower count, that demonstrates strong algorithmic reach. Share specific metrics like average view-through rate, engagement rate, and any past campaign performance data. Charge separately for usage rights (if the brand wants to boost your content as a Spark Ad), exclusivity, and cross-posting. Multi-video packages at a slight discount often increase total deal value.',
  },
  {
    question: 'What is a TikTok Spark Ad and how does it affect pricing?',
    answer:
      "A Spark Ad is when a brand boosts your organic TikTok content as a paid advertisement. This extends your content's reach far beyond organic distribution. If a brand wants to use your video as a Spark Ad, you should charge 50–200% on top of your organic posting rate. Always include usage rights and Spark Ad permissions as separate line items in your rate card, with clear time limits (typically 30, 60, or 90 days).",
  },
  {
    question: 'How many sponsored TikToks should I post per month?',
    answer:
      'Most successful TikTok creators limit sponsored content to about 20–30% of their total posts to maintain audience trust and algorithmic favor. If you post daily, that means 6–9 sponsored posts per month. TikTok audiences are especially sensitive to over-commercialization — if your content starts feeling like an ad channel, the algorithm will reduce your reach and followers will disengage. Focus on quality brand partnerships that align with your content style.',
  },
  {
    question: 'How do I calculate my TikTok sponsorship rate with this calculator?',
    answer:
      'Enter your follower count, engagement rate (you can enter it directly or calculate it from your average likes and comments), select your content type (Video, Story, or Live), deal type (Mention, Dedicated, Review, or Series), and content niche. The calculator instantly generates a per-post rate range (low, mid, high) based on industry-standard formulas. You can also view a full rate card for all content types, project monthly earnings, and see how your rate compares to other influencer tiers.',
  },
  {
    question: 'Are TikTok sponsorship rates going up or down in 2026?',
    answer:
      'TikTok sponsorship rates have been increasing steadily as the platform matures and more brands allocate dedicated TikTok budgets. In 2026, TikTok influencer marketing spending continues to grow year-over-year. However, the gap between TikTok and Instagram rates is narrowing as brands see strong ROI from TikTok campaigns. Creators who can demonstrate measurable results (click-throughs, conversions, sales) are commanding the strongest rate increases.',
  },
  {
    question: 'Should I use a flat rate or CPM pricing for TikTok sponsorships?',
    answer:
      'Most TikTok creators use flat-rate pricing (a fixed fee per video) rather than CPM pricing. Flat rates are simpler to negotiate and give you predictable income. CPM pricing (charging per 1,000 views) can be advantageous if your content regularly goes viral, but it introduces uncertainty for both you and the brand. A hybrid approach — a guaranteed base rate plus a performance bonus if the video exceeds a view threshold — is becoming increasingly popular and benefits both parties.',
  },
];

const howItWorks = (
  <>
    <p>
      Our TikTok Sponsorship Rate Calculator helps creators determine how much to charge for branded
      content on TikTok. The calculator uses a formula based on your follower count, engagement
      rate, content type, deal type, and content niche to produce a per-post rate range that
      reflects current market rates.
    </p>
    <p className="mt-3">
      The base rate starts at $5–$15 per 1,000 followers for TikTok, then multiplies based on your
      specific profile. Higher engagement rates (above 5%) can double your rate, while premium
      niches like finance and tech command 1.5–2x multipliers. Deal type has the largest impact — an
      in-depth product review pays 3.5x more than a simple mention.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Understanding the Rate Formula</h3>
    <p className="mt-2">
      The formula is: (Followers &divide; 1,000) &times; Base Rate &times; Engagement Multiplier
      &times; Niche Multiplier &times; Content Type Multiplier &times; Deal Type Multiplier. Each
      multiplier adjusts the base rate up or down based on the specific value. For example, a
      &ldquo;Review&rdquo; deal type carries a 3.5x multiplier because it requires the most creator
      effort and provides the most brand exposure.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">TikTok vs Instagram Rates</h3>
    <p className="mt-2">
      TikTok sponsorship rates are typically 50–70% of equivalent Instagram rates. This difference
      reflects Instagram&rsquo;s more mature influencer marketplace and the predictability of
      follower-driven reach. However, TikTok offers unique value through its algorithm-driven
      distribution — a sponsored video can reach far beyond your followers if it resonates with a
      wider audience. Many brands are willing to pay premium TikTok rates for creators who
      consistently achieve high view-to-follower ratios.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Content Types Explained</h3>
    <p className="mt-2">
      <strong>Video (1.0x)</strong> — The standard TikTok sponsored content format. A short-form
      video appearing in the For You feed. <strong>Story (0.25x)</strong> — Ephemeral 24-hour
      content with limited reach, best for supplementary brand mentions.{' '}
      <strong>Live (0.8x)</strong> — Real-time interactive sessions where viewers can engage
      directly with the brand content.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Deal Types Explained</h3>
    <p className="mt-2">
      <strong>Mention (1.0x)</strong> — Brief brand reference in your regular content.{' '}
      <strong>Dedicated (2.5x)</strong> — Entire video focused on the brand.{' '}
      <strong>Review (3.5x)</strong> — In-depth product review with honest assessment.{' '}
      <strong>Series (2.0x per video)</strong> — Multi-video campaign at a per-video rate, often
      with a bundled discount.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5">
      <li>
        <Link
          href="/tiktok-engagement-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          TikTok Engagement Rate Calculator
        </Link>{' '}
        — measure your TikTok engagement to set better sponsorship rates
      </li>
      <li>
        <Link
          href="/instagram-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Instagram Sponsorship Rate Calculator
        </Link>{' '}
        — compare cross-platform sponsorship rates
      </li>
      <li>
        <Link
          href="/instagram-engagement-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Instagram Engagement Rate Calculator
        </Link>{' '}
        — calculate your Instagram engagement with likes, comments, and saves
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

export default function TikTokSponsorshipPage() {
  return (
    <>
      <CalculatorSchema
        name="TikTok Sponsorship Rate Calculator"
        description="Calculate how much to charge for sponsored TikTok videos, Stories, and Lives based on your followers, engagement rate, and niche."
        url="/tiktok-sponsorship-rate-calculator"
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'TikTok', path: '/tiktok-engagement-rate-calculator' },
          {
            name: 'TikTok Sponsorship Rate Calculator',
            path: '/tiktok-sponsorship-rate-calculator',
          },
        ]}
      />
      <CalculatorLayout
        title="TikTok Sponsorship Rate Calculator"
        description="Find out how much to charge for sponsored content on TikTok. Get a personalized rate card based on your followers, engagement rate, content type, and niche."
        faq={faq}
        howItWorks={howItWorks}
      >
        <TikTokSponsorshipCalculator />
      </CalculatorLayout>
    </>
  );
}
