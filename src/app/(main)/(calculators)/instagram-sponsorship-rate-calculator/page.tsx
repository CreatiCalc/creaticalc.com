import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';

import dynamic from 'next/dynamic';
const InstagramSponsorshipCalculator = dynamic(
  () => import('@/features/calculators/instagram-sponsorship/InstagramSponsorshipCalculator')
);
import CalculatorSkeleton from '@/features/calculators/shared/CalculatorSkeleton';
import type { FAQItem } from '@/features/calculators/shared/types';
import { getSponsorshipNichePages } from '@/lib/sponsorship-niches';

export const metadata: Metadata = {
  title: 'Instagram Sponsorship Rate Calculator (2026)',
  description:
    'How much should you charge for an Instagram sponsorship? Get rates for posts, Reels, Stories, and carousels by followers, engagement rate, and niche.',
  openGraph: {
    title: 'Instagram Sponsorship Rate Calculator (2026)',
    description:
      'Calculate what to charge for Instagram sponsorships. Get rates for posts, Reels, Stories, and carousels by followers and engagement.',
    url: '/instagram-sponsorship-rate-calculator',
  },
  alternates: {
    canonical: '/instagram-sponsorship-rate-calculator',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How much should I charge for a sponsored Instagram post?',
    answer:
      'The standard formula is roughly $10–$25 per 1,000 followers for a basic feed post mention, adjusted for your engagement rate, niche, and deal type. A 10K-follower account with average engagement typically charges $100–$250 per sponsored feed post. Higher engagement rates, premium niches like finance or tech, and dedicated reviews can multiply this rate by 2–5x.',
  },
  {
    question: 'How much do Instagram Reels sponsorships pay?',
    answer:
      'Instagram Reels sponsorships typically command 1.5x the rate of a standard feed post because Reels reach a wider audience and require more production effort. A creator with 50K followers might charge $500–$1,250 for a sponsored feed post but $750–$1,875 for a Reel. The exact rate depends on your engagement rate, content niche, and the type of brand deal.',
  },
  {
    question: 'What is the going rate for Instagram Story sponsorships?',
    answer:
      'Instagram Story sponsorships are typically priced at about 30% of a feed post rate, since Stories are ephemeral (24-hour lifespan) and get fewer views. However, Stories with swipe-up links or strong call-to-actions can command higher rates because they drive direct conversions. Many creators sell Story packages (3–5 frames) rather than individual frames.',
  },
  {
    question: 'How does engagement rate affect sponsorship pricing?',
    answer:
      'Engagement rate is one of the most important factors in sponsorship pricing. Creators with below 1% engagement typically earn 50% less than standard rates, while those above 5% can charge 2x the standard rate. Brands pay for engaged audiences that will actually interact with sponsored content and convert into customers. A 20K-follower account with 6% engagement is often more valuable to brands than a 100K account with 0.5%.',
  },
  {
    question: 'What niches pay the most for Instagram sponsorships?',
    answer:
      'Finance and business content commands the highest sponsorship rates (roughly 2x the base rate) because financial products have high customer lifetime values. Technology (1.5x), education (1.3x), health and fitness (1.2x), and beauty (1.2x) also pay above average. Entertainment and sports niches typically pay below average because they have broader, less targeted audiences. These multipliers reflect how much brands in each industry are willing to spend on influencer marketing.',
  },
  {
    question: 'What is the difference between a mention and a dedicated sponsorship?',
    answer:
      'A mention is a brief brand reference within your regular content — for example, thanking a brand sponsor at the beginning of a video or including a product in a broader lifestyle post. A dedicated post is entirely focused on the brand or product, requiring more production effort and providing more exposure. Dedicated sponsorships typically pay 2.5x more than mentions. Reviews, which involve in-depth product testing and honest evaluation, command the highest rates at 3.5x.',
  },
  {
    question: 'How do I negotiate higher sponsorship rates on Instagram?',
    answer:
      'Lead with your engagement rate rather than follower count — brands pay more for engaged audiences. Provide a media kit with audience demographics, case studies from past partnerships, and your rate card. Charge separately for usage rights (if the brand wants to run your content as an ad), exclusivity clauses, and cross-posting to Stories or Reels. Offering multi-post packages at a slight discount often increases total deal value while giving brands better results.',
  },
  {
    question: 'How many sponsored posts per month should I do?',
    answer:
      'Most successful creators limit sponsored content to 20–30% of their total posts to maintain audience trust and engagement. For accounts posting 4–5 times per week, that means 3–6 sponsored posts per month. Over-sponsoring can lead to follower fatigue, unfollows, and declining engagement rates — which ultimately reduces your earning potential. Quality partnerships with brands that align with your audience are more valuable than a high volume of sponsorships.',
  },
  {
    question: 'Should I charge the same rate for Instagram carousels as feed posts?',
    answer:
      'Instagram carousels are typically worth about 1.2x the rate of a single-image feed post. Carousels get higher engagement rates and longer view times because users swipe through multiple slides. They also allow for more detailed product storytelling. However, they require more design work and content planning, which justifies the higher rate. Many creators include carousel pricing as a separate line item in their rate card.',
  },
  {
    question: 'How do I calculate my Instagram sponsorship rate with this calculator?',
    answer:
      'Enter your follower count, engagement rate (you can enter it directly or calculate it from your average likes and comments), select your content type (Feed Post, Reel, Story, or Carousel), deal type (Mention, Dedicated, Review, or Series), and content niche. The calculator instantly generates a per-post rate range (low, mid, high) based on industry-standard formulas. You can also view a full rate card for all content types, project monthly earnings, and see how your rate compares to other influencer tiers.',
  },
  {
    question: 'Are Instagram sponsorship rates going up or down in 2026?',
    answer:
      'Instagram sponsorship rates have been steadily increasing year-over-year as more brands shift ad budgets to influencer marketing. In 2026, the creator economy is valued at over $250 billion globally. However, rates are becoming more performance-based — brands increasingly want to see conversion data, not just reach. Creators who can demonstrate strong engagement, audience trust, and measurable results can command premium rates, while those relying solely on follower count may see stagnation.',
  },
  {
    question: 'What should I include in my Instagram media kit?',
    answer:
      'A strong media kit should include: your follower count and engagement rate, audience demographics (age, gender, location), content examples and past brand partnerships, your rate card broken down by content type, reach and impression statistics, and any notable results from previous campaigns (click-through rates, conversions). Use this calculator to generate your rate card and include specific numbers for Feed Posts, Reels, Stories, and Carousels.',
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
      Our Instagram Sponsorship Rate Calculator helps creators determine how much to charge for
      branded content on Instagram.
    </p>
    <ol className="mt-3 list-decimal space-y-2 pl-5">
      <li>
        <strong>
          Enter your follower count and{' '}
          <Link href="/glossary" className="font-medium text-primary hover:underline">
            engagement rate
          </Link>
        </strong>{' '}
        — higher engagement commands premium rates (above 5% can double your rate).
      </li>
      <li>
        <strong>
          Select your{' '}
          <Link href="/glossary" className="font-medium text-primary hover:underline">
            content niche
          </Link>
        </strong>{' '}
        — premium niches like finance and tech earn 1.5&ndash;2x multipliers.
      </li>
      <li>
        <strong>Choose content type and deal type</strong> — Reels pay 1.5x more than feed posts,
        while Stories are priced at about 30% of a feed post.
      </li>
      <li>
        <strong>Get your rate range</strong> — a per-post sponsorship rate based on a $10&ndash;$25
        per 1,000 follower base rate with your multipliers applied.
      </li>
    </ol>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Understanding the Rate Formula</h3>
    <p className="mt-2">
      The formula is: (Followers &divide; 1,000) &times; Base Rate &times; Engagement Multiplier
      &times; Niche Multiplier &times; Content Type Multiplier &times; Deal Type Multiplier. Each
      multiplier adjusts the base rate up or down based on the specific value. For example, a
      &ldquo;Review&rdquo; deal type carries a 3.5x multiplier because it requires the most creator
      effort and provides the most brand exposure.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Content Types Explained</h3>
    <p className="mt-2">
      <strong>Feed Post (1.0x)</strong> — The standard sponsored post format. A single image or
      video in your feed with a branded caption. <strong>Reel (1.5x)</strong> — Short-form vertical
      video with wider reach potential and higher production value. <strong>Story (0.3x)</strong> —
      Ephemeral 24-hour content, lower production but useful for swipe-up links and direct response.{' '}
      <strong>Carousel (1.2x)</strong> — Multi-slide posts that generate higher engagement and allow
      for detailed product storytelling.
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
          href="/instagram-engagement-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Instagram Engagement Rate Calculator
        </Link>{' '}
        — measure your IG engagement to set better sponsorship rates
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
          href="/tiktok-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          TikTok Sponsorship Rate Calculator
        </Link>{' '}
        — compare cross-platform sponsorship rates
      </li>
      <li>
        <Link
          href="/facebook-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Facebook Sponsorship Rate Calculator
        </Link>{' '}
        — calculate Facebook sponsorship pricing
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

export default function InstagramSponsorshipPage() {
  return (
    <>
      <CalculatorSchema
        name="Instagram Sponsorship Rate Calculator"
        description="Calculate how much to charge for sponsored Instagram posts, Reels, Stories, and carousels based on your followers, engagement rate, and niche."
        url="/instagram-sponsorship-rate-calculator"
        datePublished="2025-01-15"
        dateModified="2026-02-16"
      />
      <CalculatorLayout
        title="Instagram Sponsorship Rate Calculator"
        slug="instagram-sponsorship-rate-calculator"
        lastUpdated="February 2026"
        description="Find out how much to charge for sponsored posts on Instagram. Get a personalized rate card based on your followers, engagement rate, content type, and niche."
        faq={faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Instagram', path: '/instagram' },
          {
            name: 'Instagram Sponsorship Rate Calculator',
            path: '/instagram-sponsorship-rate-calculator',
          },
        ]}
      >
        <Suspense fallback={<CalculatorSkeleton />}>
          <InstagramSponsorshipCalculator />
        </Suspense>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Browse by Niche</h2>
          <p className="mb-6 text-muted">
            See sponsorship rate estimates tailored to your specific content niche. Each calculator
            uses niche-specific pricing data and benchmarks.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {getSponsorshipNichePages('instagram').map((niche) => (
              <Link
                key={niche.slug}
                href={`/instagram-sponsorship-rate-calculator/${niche.slug}`}
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {niche.name} Sponsorship Rates
              </Link>
            ))}
          </div>
        </section>
      </CalculatorLayout>
    </>
  );
}
