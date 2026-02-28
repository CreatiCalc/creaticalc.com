import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorLayout from '@/features/calculators/shared/CalculatorLayout';
import CalculatorSchema from '@/components/seo/CalculatorSchema';

import dynamic from 'next/dynamic';
const YouTubeSponsorshipCalculator = dynamic(
  () => import('@/features/calculators/youtube-sponsorship/YouTubeSponsorshipCalculator')
);
import CalculatorSkeleton from '@/features/calculators/shared/CalculatorSkeleton';
import type { FAQItem } from '@/features/calculators/shared/types';
import { getSponsorshipNichePages } from '@/lib/sponsorship-niches';

export const metadata: Metadata = {
  title: 'YouTube Sponsorship Rate Calculator (2026)',
  description:
    'How much should you charge for a YouTube sponsorship? Get rates for integrations, dedicated videos, and Shorts by subscriber count, engagement, and niche.',
  openGraph: {
    title: 'YouTube Sponsorship Rate Calculator (2026)',
    description:
      'Calculate what to charge for YouTube sponsorships. Get rates for integrations, dedicated videos, Shorts, and pre-rolls.',
    url: '/youtube-sponsorship-rate-calculator',
  },
  alternates: {
    canonical: '/youtube-sponsorship-rate-calculator',
  },
};

const faq: FAQItem[] = [
  {
    question: 'How much should I charge for a YouTube sponsorship?',
    answer:
      'The standard formula starts at roughly $20\u2013$50 per 1,000 subscribers for a basic integration, adjusted for your engagement rate, niche, and deal type. A channel with 50K subscribers and average engagement typically charges $1,000\u2013$2,500 for a single integration. Higher engagement rates, premium niches like finance or tech, and dedicated video deals can multiply this base rate by 2\u20135x, meaning the same channel could earn $5,000 or more for a dedicated review.',
  },
  {
    question: 'How much do dedicated YouTube sponsorship videos pay?',
    answer:
      'Dedicated sponsorship videos typically pay about 2x the rate of a standard integration because the entire video is focused on the brand or product. This format gives the sponsor maximum exposure, often including a detailed walkthrough, demonstration, and honest creator opinion. For a channel with 100K subscribers, a dedicated video might range from $4,000 to $10,000 depending on engagement and niche. Brands value dedicated videos because they function as evergreen product content that continues generating views and conversions long after upload.',
  },
  {
    question: 'What are YouTube Shorts sponsorship rates?',
    answer:
      'YouTube Shorts sponsorships are typically priced at about 0.4x the rate of a standard integration, since Shorts are shorter in duration and require less production effort. However, Shorts sponsorship rates are rising as the format grows in popularity and brands recognize their potential for viral reach. A channel with 100K subscribers might charge $800\u2013$2,000 for a sponsored Short. Despite the lower per-video rate, many creators find Shorts sponsorships profitable because they take significantly less time to produce.',
  },
  {
    question: 'How much should I charge for a pre-roll sponsorship?',
    answer:
      'Pre-roll sponsorships\u2014brief brand mentions at the start of a video, usually 30\u201360 seconds\u2014are typically priced at about 0.6x the rate of a full integration. They require minimal production effort and don\u2019t disrupt the main content flow, which is why they cost less. A channel with 50K subscribers might charge $600\u2013$1,500 for a pre-roll spot. Pre-rolls are popular with brands that want consistent, low-friction exposure across multiple videos, and they\u2019re often sold as part of multi-video packages.',
  },
  {
    question: 'How does engagement rate affect YouTube sponsorship pricing?',
    answer:
      'Engagement rate is one of the most critical factors in YouTube sponsorship pricing. Channels with below 1% engagement typically earn 50% less than standard rates, while those above 5% can charge 2x the standard rate. Brands care deeply about engagement because it indicates an active, loyal audience that is more likely to trust the creator\u2019s recommendations and convert into customers. A 20K-subscriber channel with 7% engagement is often more valuable to a sponsor than a 200K-subscriber channel with 0.5% engagement.',
  },
  {
    question: 'What YouTube niches pay the most for sponsorships?',
    answer:
      'Finance and business content commands the highest sponsorship rates on YouTube, roughly 2x the base rate, because financial products have high customer lifetime values and large marketing budgets. Technology channels (1.5x), education (1.3x), and health and fitness (1.2x) also pay above average. Entertainment, gaming, and vlog niches typically pay closer to the base rate because they attract broader, less purchase-intent audiences. These multipliers reflect the return on investment that brands in each vertical expect from influencer partnerships.',
  },
  {
    question: 'What is the difference between an integration and a dedicated video?',
    answer:
      'An integration is a sponsored segment within your regular video\u2014typically 60\u201390 seconds where you introduce the sponsor, demonstrate the product, and include a call-to-action, while the rest of the video is your normal content. A dedicated video is entirely about the brand or product, often running 5\u201315 minutes with detailed demos, reviews, and comparisons. Dedicated videos command about 2x the rate of integrations because they provide the sponsor with full viewer attention and function as standalone branded content. Most creators start with integrations and move to dedicated deals as their audience grows.',
  },
  {
    question: 'How do I negotiate higher YouTube sponsorship rates?',
    answer:
      'Lead with your engagement rate and audience demographics rather than subscriber count\u2014brands pay more for engaged, targeted audiences. Provide a media kit with viewer retention data, audience age and location breakdowns, and case studies from past partnerships showing click-through rates or conversions. Charge separately for usage rights if the brand wants to run your content as a paid ad, and add fees for exclusivity clauses that prevent you from working with competitors. Offering multi-video packages at a slight per-video discount often increases total deal value while giving brands better campaign results.',
  },
  {
    question: 'How many sponsored videos should I post per month?',
    answer:
      'Most successful YouTube creators limit sponsored content to about 20\u201330% of their total uploads to maintain audience trust and engagement. For a channel uploading twice a week, that means roughly 2\u20133 sponsored videos per month. Over-sponsoring can lead to viewer fatigue, lower watch time, and declining subscriber growth\u2014which ultimately reduces your earning potential and makes your channel less attractive to future sponsors. Focus on quality partnerships with brands that genuinely align with your content and audience.',
  },
  {
    question: 'How do I calculate my YouTube sponsorship rate with this calculator?',
    answer:
      'Enter your subscriber count, engagement rate (you can input it directly or calculate it from your average likes, comments, and views), select your content type (Integration, Dedicated Video, Short, or Pre-Roll), deal type (Mention, Dedicated, Review, or Series), and content niche. The calculator instantly generates a per-video rate range (low, mid, high) based on industry-standard formulas. You can also view a full rate card for all content types, project monthly earnings from sponsorships, and see how your rate compares across different influencer tiers.',
  },
  {
    question: 'Are YouTube sponsorship rates going up or down in 2026?',
    answer:
      'YouTube sponsorship rates have been steadily increasing as more brands shift advertising budgets toward creator partnerships. In 2026, the global creator economy is valued at over $250 billion, and YouTube remains the highest-paying platform for long-form sponsorships due to its evergreen content model. However, pricing is becoming more performance-based\u2014brands increasingly want to see measurable conversions and ROI, not just views. Creators who can demonstrate strong audience trust, high retention, and trackable results can command premium rates, while those relying solely on subscriber count may see rate stagnation.',
  },
  {
    question: 'Should I charge for usage rights separately?',
    answer:
      'Yes, usage rights should almost always be a separate line item in your sponsorship agreement. When a brand wants to repurpose your video content as a paid advertisement on YouTube, social media, or other channels, that extends the value of your work far beyond your organic audience. Standard usage rights fees range from 50\u2013500% of the base sponsorship rate, depending on the scope (platforms, duration, geographic reach) and whether the brand will run the content as paid ads. Always specify the usage period\u2014typically 30, 60, or 90 days\u2014and charge more for perpetual or unlimited usage.',
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
      Our YouTube Sponsorship Rate Calculator helps creators determine how much to charge for
      branded content on YouTube.
    </p>
    <ol className="mt-3 list-decimal space-y-2 pl-5">
      <li>
        <strong>
          Enter your subscriber count and{' '}
          <Link href="/glossary" className="font-medium text-primary hover:underline">
            engagement rate
          </Link>
        </strong>{' '}
        — higher engagement commands premium rates.
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
        <strong>Choose content type and deal type</strong> — dedicated videos pay 2x more than
        integrations, while Shorts are priced at about 40% of an integration.
      </li>
      <li>
        <strong>Get your rate range</strong> — a per-video sponsorship rate based on a $20&ndash;$50
        per 1,000 subscriber base rate with your multipliers applied.
      </li>
    </ol>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Understanding the Rate Formula</h3>
    <p className="mt-2">
      The formula is: (Subscribers &divide; 1,000) &times; Base Rate &times; Engagement Multiplier
      &times; Niche Multiplier &times; Content Type Multiplier &times; Deal Type Multiplier. Each
      multiplier adjusts the base rate up or down based on the specific value. For example, a
      &ldquo;Review&rdquo; deal type carries a 3.5x multiplier because it requires the most creator
      effort and provides the most brand exposure.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">YouTube vs Other Platforms</h3>
    <p className="mt-2">
      YouTube sponsorship rates are generally higher than Instagram or TikTok because YouTube videos
      are evergreen &mdash; they continue generating views, engagement, and conversions for months
      or years after upload. YouTube content also requires significantly more production effort
      (scripting, filming, editing) compared to a Stories post or a TikTok clip. Additionally,
      YouTube&rsquo;s longer format allows for deeper product storytelling, which delivers higher
      conversion rates for sponsors and justifies premium pricing.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Content Types Explained</h3>
    <p className="mt-2">
      <strong>Integration (1.0x)</strong> &mdash; A sponsored segment within your regular video,
      typically 60&ndash;90 seconds with a product demo and call-to-action.{' '}
      <strong>Dedicated Video (2.0x)</strong> &mdash; An entire video focused on the brand or
      product, offering maximum sponsor exposure and detailed storytelling.{' '}
      <strong>Short (0.4x)</strong> &mdash; A YouTube Shorts sponsorship, lower per-video rate but
      faster to produce and growing in demand. <strong>Pre-Roll (0.6x)</strong> &mdash; A brief
      sponsor mention at the start of a video, typically 30&ndash;60 seconds, with minimal content
      disruption.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Deal Types Explained</h3>
    <p className="mt-2">
      <strong>Mention (1.0x)</strong> &mdash; Brief brand reference in your regular content.{' '}
      <strong>Dedicated (2.5x)</strong> &mdash; Entire video focused on the brand.{' '}
      <strong>Review (3.5x)</strong> &mdash; In-depth product review with honest assessment.{' '}
      <strong>Series (2.0x per video)</strong> &mdash; Multi-video campaign at a per-video rate,
      often with a bundled discount.
    </p>

    <h3 className="mt-6 text-lg font-semibold text-foreground">Related Tools</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5">
      <li>
        <Link href="/youtube-money-calculator" className="font-medium text-primary hover:underline">
          YouTube Money Calculator
        </Link>{' '}
        &mdash; estimate your YouTube ad revenue by views and CPM
      </li>
      <li>
        <Link
          href="/youtube-shorts-money-calculator"
          className="font-medium text-primary hover:underline"
        >
          YouTube Shorts Money Calculator
        </Link>{' '}
        &mdash; calculate earnings from YouTube Shorts views
      </li>
      <li>
        <Link
          href="/youtube-subscriber-projector"
          className="font-medium text-primary hover:underline"
        >
          YouTube Subscriber Growth Projector
        </Link>{' '}
        &mdash; forecast your subscriber growth over time
      </li>
      <li>
        <Link
          href="/instagram-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Instagram Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; compare cross-platform sponsorship rates
      </li>
      <li>
        <Link
          href="/tiktok-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          TikTok Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; calculate TikTok sponsorship pricing
      </li>
      <li>
        <Link
          href="/facebook-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          Facebook Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; calculate Facebook sponsorship pricing
      </li>
      <li>
        <Link
          href="/twitter-sponsorship-rate-calculator"
          className="font-medium text-primary hover:underline"
        >
          X (Twitter) Sponsorship Rate Calculator
        </Link>{' '}
        &mdash; calculate X sponsorship pricing for tweets and threads
      </li>
    </ul>
  </>
);

export default function YouTubeSponsorshipPage() {
  return (
    <>
      <CalculatorSchema
        name="YouTube Sponsorship Rate Calculator"
        description="Calculate how much to charge for sponsored YouTube videos, integrations, Shorts, and pre-rolls based on your subscribers, engagement rate, and niche."
        url="/youtube-sponsorship-rate-calculator"
        datePublished="2025-01-15"
        dateModified="2026-02-16"
      />
      <CalculatorLayout
        title="YouTube Sponsorship Rate Calculator"
        slug="youtube-sponsorship-rate-calculator"
        lastUpdated="February 2026"
        description="Find out how much to charge for sponsored videos on YouTube. Get a personalized rate card based on your subscribers, engagement rate, content type, and niche."
        faq={faq}
        howItWorks={howItWorks}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'YouTube', path: '/youtube' },
          {
            name: 'YouTube Sponsorship Rate Calculator',
            path: '/youtube-sponsorship-rate-calculator',
          },
        ]}
      >
        <Suspense fallback={<CalculatorSkeleton />}>
          <YouTubeSponsorshipCalculator />
        </Suspense>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Browse by Niche</h2>
          <p className="mb-6 text-muted">
            See sponsorship rate estimates tailored to your specific content niche. Each calculator
            uses niche-specific pricing data and benchmarks.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {getSponsorshipNichePages('youtube').map((niche) => (
              <Link
                key={niche.slug}
                href={`/youtube-sponsorship-rate-calculator/${niche.slug}`}
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
