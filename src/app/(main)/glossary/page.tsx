import type { Metadata } from 'next';
import Link from 'next/link';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import AdSlot from '@/components/layout/AdSlot';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Creator Economy Glossary 2026',
  description:
    'Learn key creator economy terms like CPM, RPM, engagement rate, sponsorship rate, and influencer tiers. A plain-language glossary for YouTubers, Instagrammers, and TikTokers.',
  openGraph: {
    title: 'Creator Economy Glossary 2026',
    description:
      'Plain-language definitions of CPM, RPM, engagement rate, influencer tiers, brand deals, and more. Built for content creators on YouTube, Instagram, and TikTok.',
    url: '/glossary',
  },
  alternates: {
    canonical: '/glossary',
  },
};

interface GlossaryTerm {
  name: string;
  shortDefinition: string;
  explanation: string;
  /** Bullet points rendered between the explanation and the calculator link */
  bullets?: string[];
  calculatorLabel?: string;
  calculatorHref?: string;
}

interface GlossaryCategory {
  heading: string;
  description: string;
  terms: GlossaryTerm[];
}

const glossaryCategories: GlossaryCategory[] = [
  {
    heading: 'Metrics & Analytics',
    description:
      'The numbers that measure your content performance and determine your earning potential.',
    terms: [
      {
        name: 'CPM (Cost Per Mille)',
        shortDefinition:
          'The amount an advertiser pays per 1,000 ad impressions on a video or webpage.',
        explanation:
          'CPM stands for "cost per mille," where mille is Latin for one thousand. It is the standard metric advertisers use to price display and video ads. On YouTube, CPM varies widely by niche, audience geography, and time of year — finance and technology channels can see CPMs above $20, while entertainment niches may average $2–$5. Creators do not receive the full CPM; the platform takes a revenue share (YouTube keeps 45%) before paying the creator.',
        calculatorLabel: 'YouTube Money Calculator',
        calculatorHref: '/youtube-money-calculator',
      },
      {
        name: 'RPM (Revenue Per Mille)',
        shortDefinition:
          'The actual revenue a creator earns per 1,000 video views, after the platform takes its cut.',
        explanation:
          "While CPM reflects what advertisers pay, RPM reflects what creators actually receive. RPM accounts for the platform's revenue share, ad fill rate, and the fact that not every view generates an ad impression. For example, if a video has a $10 CPM but only 60% of views are monetized, the effective RPM is much lower. RPM is the more useful metric for creators estimating their own earnings because it represents real take-home revenue per thousand views.",
        calculatorLabel: 'YouTube Money Calculator',
        calculatorHref: '/youtube-money-calculator',
      },
      {
        name: 'Engagement Rate',
        shortDefinition:
          'The percentage of an audience that interacts with content through likes, comments, shares, or saves.',
        explanation:
          'Engagement rate is calculated by dividing total engagements (likes, comments, shares, saves) by the total number of followers or impressions, then multiplying by 100. It is the most widely used metric for measuring how actively an audience responds to content. Brands rely on engagement rate to evaluate potential sponsorship partners because a high rate indicates a loyal, attentive audience. Average rates vary significantly by platform — TikTok averages around 4–5%, Instagram around 1%, and X (Twitter) below 0.05%.',
        calculatorLabel: 'Engagement Rate Calculator',
        calculatorHref: '/engagement-rate-calculator',
      },
      {
        name: 'Impressions',
        shortDefinition:
          'The total number of times content is displayed on a screen, regardless of interaction.',
        explanation:
          'Every time your post, video thumbnail, or ad appears in a feed, search result, or recommendation panel, it counts as one impression. A single user can generate multiple impressions if they see the same content more than once. Impressions tell you how much visibility your content is getting but say nothing about whether viewers engaged with it. High impressions with low engagement may indicate that your thumbnail or headline is not compelling enough to drive clicks.',
      },
      {
        name: 'Reach',
        shortDefinition: 'The number of unique users who see your content at least once.',
        explanation:
          'Unlike impressions, which count every instance of your content appearing on screen, reach counts each person only once. If 5,000 people each see your post twice, your reach is 5,000 but your impressions are 10,000. Reach is a better indicator of how many individuals your content is actually touching. Platforms like Instagram and Facebook report reach in their native analytics, and brands often use it alongside engagement rate to evaluate the true audience size a creator can deliver.',
        calculatorLabel: 'Engagement Rate Calculator',
        calculatorHref: '/engagement-rate-calculator',
      },
      {
        name: 'CTR (Click-Through Rate)',
        shortDefinition:
          'The percentage of people who click on a link, thumbnail, or call-to-action after seeing it.',
        explanation:
          "Click-through rate is calculated by dividing the number of clicks by the number of impressions, then multiplying by 100. On YouTube, CTR measures how often viewers click on your video after seeing the thumbnail in search results or recommendations — a good CTR is generally 4–10%. For affiliate links and sponsored posts, CTR tells you how effectively your content drives traffic to external destinations. A low CTR usually signals a mismatch between the promise of your headline or thumbnail and the audience's interest.",
      },
    ],
  },
  {
    heading: 'Revenue & Monetization',
    description: 'How creators make money from their content and audience.',
    terms: [
      {
        name: 'Sponsorship Rate',
        shortDefinition:
          'The fee a creator charges a brand for a sponsored post, video, or campaign.',
        explanation:
          'Sponsorship rates depend on several factors: follower count, engagement rate, platform, content format, niche, and usage rights. A common starting formula is to charge a base rate per follower (e.g., $0.01–$0.05 per follower on Instagram) and then adjust based on deliverables. Rates also vary by content type — a dedicated YouTube video commands significantly more than an Instagram Story mention. Creators with high engagement rates and niche audiences can often charge more than those with large but passive followings.',
        calculatorLabel: 'YouTube Sponsorship Rate Calculator',
        calculatorHref: '/youtube-sponsorship-rate-calculator',
      },
      {
        name: 'Affiliate Marketing',
        shortDefinition:
          'A revenue model where creators earn a commission for each sale generated through their unique tracking link.',
        explanation:
          'In affiliate marketing, a creator promotes a product using a special link that tracks clicks and purchases. When a follower buys through that link, the creator earns a percentage of the sale — typically 5–30% depending on the program and product category. Popular affiliate networks include Amazon Associates, ShareASale, and Impact. Affiliate income is performance-based, meaning creators only earn when they drive actual sales, which makes it a lower-risk option for brands and a scalable income stream for creators with engaged audiences.',
      },
      {
        name: 'Monetization',
        shortDefinition:
          'The process of generating revenue from content through ad revenue, sponsorships, affiliate sales, memberships, or merchandise.',
        explanation:
          'Most creators monetize through a combination of revenue streams. Platform ad revenue (like the YouTube Partner Program) provides passive income based on views. Sponsorships and brand deals offer higher per-project payouts. Affiliate marketing generates commissions on sales. Other streams include channel memberships, Super Chats, merchandise, and digital products. Diversifying monetization sources is important because platform ad rates fluctuate seasonally, and relying on a single income stream creates financial vulnerability.',
        calculatorLabel: 'YouTube Shorts Money Calculator',
        calculatorHref: '/youtube-shorts-money-calculator',
      },
      {
        name: 'Creator Fund',
        shortDefinition:
          'A pool of money set aside by a social media platform to pay creators directly based on content performance.',
        explanation:
          "TikTok's Creator Fund and its successor, the Creativity Program, are the best-known examples. These programs pay creators based on metrics like views, engagement, and content originality. However, creator fund payouts are generally low — TikTok's original fund paid roughly $0.02–$0.04 per 1,000 views — because the fixed pool is divided among an ever-growing number of eligible creators. YouTube's Partner Program, while technically different in structure, is the most lucrative platform payment program, sharing 55% of ad revenue directly with creators. Most full-time creators treat platform funds as supplementary income rather than a primary revenue source.",
      },
      {
        name: 'Brand Deal',
        shortDefinition:
          'A paid partnership between a creator and a company to promote a product or service through sponsored content.',
        explanation:
          'Brand deals are the primary way most mid-size and larger creators monetize their audiences beyond platform ad revenue. A typical deal includes deliverables (e.g., one YouTube video and two Instagram Stories), a timeline, approval processes, and a fixed fee or fee-plus-performance structure. Negotiations cover usage rights, exclusivity periods, and content format. Creators usually formalize brand deals with a contract that outlines payment terms, revision limits, and FTC disclosure requirements.',
        calculatorLabel: 'Instagram Sponsorship Rate Calculator',
        calculatorHref: '/instagram-sponsorship-rate-calculator',
      },
      {
        name: 'Media Kit',
        shortDefinition:
          "A document showcasing a creator's audience demographics, engagement metrics, and sponsorship rates for potential brand partners.",
        explanation:
          "A media kit typically includes follower counts by platform, engagement rates, audience demographics (age, gender, location), past brand partnerships, content examples, and pricing tiers. It serves as a creator's professional resume for landing sponsorships. Well-designed media kits help creators command higher rates by presenting data clearly and professionally. Most brands expect to see a media kit before entering negotiations, and having one ready signals that a creator is serious and experienced.",
        calculatorLabel: 'Engagement Rate Benchmarks',
        calculatorHref: '/engagement-rate-benchmarks',
      },
    ],
  },
  {
    heading: 'Industry Terms',
    description: 'Key concepts for navigating the creator economy and working with brands.',
    terms: [
      {
        name: 'Influencer Tiers',
        shortDefinition:
          'Categories that classify creators by follower count, from nano (1K–10K) to mega (1M+).',
        explanation:
          'These tiers are used across the industry by brands and agencies to segment influencer marketing budgets and expectations. Smaller tiers (nano and micro) typically have higher engagement rates and more trust with their audiences, while larger tiers offer broader reach. Sponsorship rates scale with tier, but the relationship is not linear — micro-influencers often deliver better return on investment per dollar spent.',
        bullets: [
          'Nano — 1K–10K followers, highest engagement rates, strong community trust',
          'Micro — 10K–100K followers, niche authority, best ROI per dollar for brands',
          'Mid-Tier — 100K–500K followers, balanced reach and engagement',
          'Macro — 500K–1M followers, broad reach, lower engagement rates',
          'Mega — 1M+ followers, massive reach, often celebrity-level creators',
        ],
        calculatorLabel: 'Engagement Rate Benchmarks',
        calculatorHref: '/engagement-rate-benchmarks',
      },
      {
        name: 'UGC (User-Generated Content)',
        shortDefinition:
          "Content created by regular users or hired creators that features a brand's product, rather than content produced by the brand itself.",
        explanation:
          "User-generated content can be organic (customers voluntarily posting about a product) or paid (brands hiring UGC creators to produce authentic-looking content). Paid UGC has become a major revenue stream for creators who may not have large followings but are skilled at producing relatable, conversion-focused videos. Unlike traditional influencer marketing, paid UGC is typically used in the brand's own ads rather than posted on the creator's channels, which means follower count matters less than production quality and authenticity.",
        calculatorLabel: 'TikTok Sponsorship Rate Calculator',
        calculatorHref: '/tiktok-sponsorship-rate-calculator',
      },
      {
        name: 'Whitelisting / Spark Ads',
        shortDefinition:
          "When a brand runs paid ads using a creator's account or post, so the ad appears to come from the creator rather than the brand.",
        explanation:
          "When a creator whitelists their content, they grant a brand permission to boost or promote a post as a paid ad through the creator's handle. On TikTok, this is done through Spark Ads; on Instagram and Facebook, it uses branded content ads via the creator's account. This format combines the authenticity of creator content with the targeting power of paid advertising. Creators typically charge an additional fee for whitelisting because it gives the brand control over how the content is distributed and increases the audience exposure beyond the creator's organic following.",
        calculatorLabel: 'TikTok Sponsorship Rate Calculator',
        calculatorHref: '/tiktok-sponsorship-rate-calculator',
      },
      {
        name: 'Usage Rights',
        shortDefinition:
          "How, where, and for how long a brand can repurpose a creator's sponsored content beyond the original post.",
        explanation:
          'When a creator produces sponsored content, the brand may want to use that content in their own advertising — on their website, in email campaigns, on digital ads, or even in television commercials. Usage rights specify the scope (platforms), duration (30 days, 6 months, perpetual), and exclusivity of this repurposing. Creators should always negotiate usage rights separately from the base sponsorship fee, as extended or broad usage rights significantly increase the value of the content to the brand. A common structure is to add 25–100% of the base fee for usage rights depending on scope.',
        calculatorLabel: 'Facebook Sponsorship Rate Calculator',
        calculatorHref: '/facebook-sponsorship-rate-calculator',
      },
      {
        name: 'Content Niche',
        shortDefinition:
          'The specific topic or subject area a creator focuses on, such as personal finance, beauty, gaming, or cooking.',
        explanation:
          'Your niche defines your target audience and directly impacts your earning potential. High-value niches like finance, technology, and business tend to attract advertisers willing to pay higher CPMs because the audience has greater purchasing power. Niche creators often achieve higher engagement rates and stronger sponsorship rates than general lifestyle creators because their audience is more targeted and passionate. Choosing a niche also affects algorithm performance — platforms tend to recommend content more effectively when a channel has a clear topical focus. Niches we track:',
        bullets: [
          'Finance — highest CPMs and sponsorship rates',
          'Tech — strong advertiser demand, engaged audiences',
          'Beauty — high brand deal volume, repeat purchases',
          'Fashion — seasonal demand, strong visual content',
          'Fitness — loyal audiences, supplement and equipment brands',
          'Food — broad appeal, high engagement rates',
          'Travel — premium brands, aspirational content',
          'Entertainment — largest audiences, lower per-follower rates',
        ],
        calculatorLabel: 'YouTube Money Calculator — Finance Niche',
        calculatorHref: '/youtube-money-calculator/finance',
      },
      {
        name: 'Algorithm',
        shortDefinition:
          'The automated system a platform uses to decide which content to show to each user in their feed, search results, and recommendations.',
        explanation:
          "Every major social platform — YouTube, Instagram, TikTok, Facebook, and X — uses algorithms to rank and distribute content. These systems analyze signals like watch time, engagement rate, click-through rate, user history, and content freshness to determine what appears in each user's feed. Understanding how algorithms work is critical for creators because the algorithm, not your follower count, largely determines how many people actually see your content. While the exact formulas are proprietary, platforms generally reward content that keeps users on the platform longer.",
        calculatorLabel: 'Engagement Rate Calculator',
        calculatorHref: '/engagement-rate-calculator',
      },
    ],
  },
];

const allTerms = glossaryCategories.flatMap((cat) => cat.terms);

const faqItems = [
  {
    question: 'What is the difference between CPM and RPM?',
    answer:
      'CPM (Cost Per Mille) is what advertisers pay per 1,000 ad impressions. RPM (Revenue Per Mille) is what creators actually earn per 1,000 views after the platform takes its revenue share and accounting for ad fill rates. RPM is always lower than CPM because not every view generates an ad, and the platform keeps a percentage. For example, YouTube takes 45% of ad revenue, so a $10 CPM might translate to an RPM of around $3–$4 after the revenue share and ad fill rate are factored in.',
  },
  {
    question: 'What is a good engagement rate on social media?',
    answer:
      'A good engagement rate depends on the platform and your follower count. On Instagram, the average is around 1%, so anything above 2% is considered strong. On TikTok, average rates hover around 4–5%, so 6%+ is excellent. Nano and micro-influencers (under 100K followers) typically see higher engagement rates than large accounts because their audiences are more tightly connected. Use our Engagement Rate Calculator to benchmark your own rate against current industry averages.',
  },
  {
    question: 'How do sponsorship rates work?',
    answer:
      'Sponsorship rates are the fees creators charge brands for sponsored content. Rates depend on follower count, engagement rate, platform, content format (video vs. Story vs. static post), niche, and usage rights. Most creators start with a base rate derived from a per-follower formula and adjust up or down based on the scope of the deliverables. Factors like exclusivity, whitelisting permissions, and the number of revisions also influence the final price. Our sponsorship rate calculators provide data-driven starting points for YouTube, Instagram, TikTok, Facebook, and X.',
  },
  {
    question: 'What are influencer tiers?',
    answer:
      'Influencer tiers classify creators by follower count: Nano (1K–10K), Micro (10K–100K), Mid-Tier (100K–500K), Macro (500K–1M), and Mega (1M+). These tiers help brands set budgets and expectations for campaigns. Nano and micro-influencers often deliver higher engagement rates and more authentic recommendations, while macro and mega-influencers offer broader reach. Sponsorship rates increase with tier, but the cost per engagement is often lower with smaller creators, making them attractive for performance-focused campaigns.',
  },
  {
    question: 'How can I use this glossary to improve my creator career?',
    answer:
      'Understanding these terms helps you speak the same language as brands, agencies, and other creators. When you negotiate sponsorship deals, knowing concepts like CPM, usage rights, and whitelisting allows you to price your work accurately and avoid leaving money on the table. Use this glossary alongside our free calculators to get data-backed estimates for your earnings, engagement rates, and sponsorship pricing across all major platforms.',
  },
];

const definedTermSetSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  'name': 'Creator Economy Glossary',
  'description':
    'Plain-language definitions of key creator economy terms including CPM, RPM, engagement rate, sponsorship rate, influencer tiers, and more.',
  'url': `${SITE_URL}/glossary`,
  'hasDefinedTerm': allTerms.map((term) => ({
    '@type': 'DefinedTerm',
    'name': term.name,
    'description': term.shortDefinition,
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10">
        <BreadcrumbSchema
          items={[
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary' },
          ]}
        />
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary' },
          ]}
        />

        {/* Hero */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Creator Economy <span className="text-gradient-brand">Glossary</span>
          </h1>
          <p className="mt-3 leading-relaxed text-muted">
            Whether you&apos;re negotiating your first{' '}
            <Link
              href="/instagram-sponsorship-rate-calculator"
              className="text-primary hover:underline"
            >
              sponsorship deal
            </Link>
            , trying to understand your{' '}
            <Link href="/youtube-money-calculator" className="text-primary hover:underline">
              YouTube ad revenue
            </Link>
            , or benchmarking your{' '}
            <Link href="/engagement-rate-calculator" className="text-primary hover:underline">
              engagement rate
            </Link>
            , this glossary covers the essential terms every content creator should know.
          </p>
          <div
            className="mx-auto mt-5 h-1 w-36 rounded-full"
            style={{ background: 'var(--gradient-brand-vibrant)' }}
            aria-hidden="true"
          />
        </header>

        <AdSlot slot="header" className="mb-8" />

        {/* Glossary Terms by Category */}
        {glossaryCategories.map((category, catIdx) => (
          <section key={category.heading} className={catIdx > 0 ? 'mt-12' : ''}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{category.heading}</h2>
              <p className="mt-1 text-sm text-muted">{category.description}</p>
            </div>
            <div className="space-y-3">
              {category.terms.map((term) => (
                <CollapsibleSection key={term.name} title={term.name} variant="compact">
                  <div className="space-y-3">
                    <p className="font-medium text-foreground">{term.shortDefinition}</p>
                    <p className="leading-relaxed text-muted">{term.explanation}</p>
                    {term.bullets && (
                      <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                        {term.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {term.calculatorHref && term.calculatorLabel && (
                      <p>
                        <Link
                          href={term.calculatorHref}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Try our {term.calculatorLabel} &rarr;
                        </Link>
                      </p>
                    )}
                  </div>
                </CollapsibleSection>
              ))}
            </div>
          </section>
        ))}

        <AdSlot slot="below-results" className="mt-12 mb-12" />

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold">{item.question}</h3>
                <p className="mt-2 leading-relaxed text-muted">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold">Put These Terms to Work</h2>
          <p className="mt-4 text-muted">
            Now that you know the language, run the numbers. All of our calculators are free,
            instant, and require no sign-up.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/youtube-money-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              YouTube Money Calculator
            </Link>
            <Link
              href="/engagement-rate-calculator"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Engagement Rate Calculator
            </Link>
            <Link
              href="/engagement-rate-benchmarks"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              Engagement Rate Benchmarks
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              Browse All Calculators
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
