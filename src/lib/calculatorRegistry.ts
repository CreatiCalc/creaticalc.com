export interface CalculatorEntry {
  /** URL slug, e.g. 'youtube-money-calculator' */
  slug: string;
  /** Full formal title (used in about page, registry lookups, sidebar) */
  title: string;
  /** Shorter display title for homepage cards */
  cardTitle: string;
  /** Route path, e.g. '/youtube-money-calculator' */
  href: string;
  /** Platform label for badge display */
  platform: string;
  /** Short description for homepage cards */
  description: string;
  /** Detailed description for about page */
  aboutDescription: string;
  /** Whether this calculator supports embed mode */
  embeddable: boolean;
}

const CALCULATORS: CalculatorEntry[] = [
  {
    slug: 'youtube-money-calculator',
    title: 'YouTube Money Calculator',
    cardTitle: 'YouTube Money Calculator',
    href: '/youtube-money-calculator',
    platform: 'YouTube',
    description: 'Estimate how much YouTubers earn based on views, CPM, and niche.',
    aboutDescription:
      'Estimate how much YouTubers earn based on views, CPM, and content niche. Includes growth modeling, seasonality adjustments, and sponsorship rate estimates.',
    embeddable: true,
  },
  {
    slug: 'youtube-shorts-money-calculator',
    title: 'YouTube Shorts Money Calculator',
    cardTitle: 'YouTube Shorts Calculator',
    href: '/youtube-shorts-money-calculator',
    platform: 'YouTube',
    description:
      'Estimate how much YouTube Shorts pay per 1,000 views. See projected Shorts revenue with real RPM data.',
    aboutDescription:
      'Find out how much YouTube Shorts pay. Estimate Shorts revenue based on views, RPM, and the Shorts monetization model.',
    embeddable: true,
  },
  {
    slug: 'youtube-subscriber-projector',
    title: 'YouTube Subscriber Growth Projector',
    cardTitle: 'YouTube Subscriber Projector',
    href: '/youtube-subscriber-projector',
    platform: 'YouTube',
    description: "Project your YouTube subscriber growth and see when you'll hit milestones.",
    aboutDescription:
      "Project your YouTube subscriber growth over time and see when you'll hit key milestones like 1K, 10K, and 100K subscribers.",
    embeddable: true,
  },
  {
    slug: 'youtube-sponsorship-rate-calculator',
    title: 'YouTube Sponsorship Rate Calculator',
    cardTitle: 'YouTube Sponsorship Rate',
    href: '/youtube-sponsorship-rate-calculator',
    platform: 'YouTube',
    description:
      'Calculate how much to charge for YouTube integrations, dedicated videos, Shorts, and pre-rolls.',
    aboutDescription:
      'Find out how much to charge for sponsored YouTube content based on your subscribers, engagement rate, content type, and niche.',
    embeddable: true,
  },
  {
    slug: 'instagram-engagement-rate-calculator',
    title: 'Instagram Engagement Rate Calculator',
    cardTitle: 'Instagram Engagement Rate',
    href: '/instagram-engagement-rate-calculator',
    platform: 'Instagram',
    description: 'Calculate your Instagram engagement rate and see how you compare.',
    aboutDescription:
      'Calculate your Instagram engagement rate and benchmark it against industry averages. Track likes, comments, and shares.',
    embeddable: true,
  },
  {
    slug: 'instagram-sponsorship-rate-calculator',
    title: 'Instagram Sponsorship Rate Calculator',
    cardTitle: 'Instagram Sponsorship Rate',
    href: '/instagram-sponsorship-rate-calculator',
    platform: 'Instagram',
    description:
      'Calculate how much to charge for sponsored Instagram posts, Reels, Stories, and carousels.',
    aboutDescription:
      'Find out how much to charge for sponsored posts, Reels, Stories, and carousels based on your followers, engagement rate, and niche.',
    embeddable: true,
  },
  {
    slug: 'tiktok-engagement-rate-calculator',
    title: 'TikTok Engagement Rate Calculator',
    cardTitle: 'TikTok Engagement Rate',
    href: '/tiktok-engagement-rate-calculator',
    platform: 'TikTok',
    description: 'Measure your TikTok engagement rate with views, likes, and shares.',
    aboutDescription:
      'Measure your TikTok engagement rate using views, likes, comments, and shares. Compare your performance to other creators.',
    embeddable: true,
  },
  {
    slug: 'tiktok-sponsorship-rate-calculator',
    title: 'TikTok Sponsorship Rate Calculator',
    cardTitle: 'TikTok Sponsorship Rate',
    href: '/tiktok-sponsorship-rate-calculator',
    platform: 'TikTok',
    description: 'Find out how much to charge for sponsored TikTok videos, Stories, and Lives.',
    aboutDescription:
      'Calculate how much to charge for sponsored TikTok videos, Stories, and Lives based on your followers, engagement, and niche.',
    embeddable: true,
  },
  {
    slug: 'facebook-engagement-rate-calculator',
    title: 'Facebook Engagement Rate Calculator',
    cardTitle: 'Facebook Engagement Rate',
    href: '/facebook-engagement-rate-calculator',
    platform: 'Facebook',
    description:
      'Calculate your Facebook Page engagement rate using reactions, comments, and shares. Compare against page benchmarks.',
    aboutDescription:
      'Calculate your Facebook Page engagement rate using reactions, comments, and shares. Compare against page benchmarks by follower tier and industry.',
    embeddable: true,
  },
  {
    slug: 'facebook-sponsorship-rate-calculator',
    title: 'Facebook Sponsorship Rate Calculator',
    cardTitle: 'Facebook Sponsorship Rate',
    href: '/facebook-sponsorship-rate-calculator',
    platform: 'Facebook',
    description:
      'Calculate how much to charge for sponsored Facebook posts, Reels, Stories, and Lives.',
    aboutDescription:
      'Find out how much to charge for sponsored Facebook content based on your followers, engagement rate, content type, and niche.',
    embeddable: true,
  },
  {
    slug: 'twitter-engagement-rate-calculator',
    title: 'X (Twitter) Engagement Rate Calculator',
    cardTitle: 'X (Twitter) Engagement Rate',
    href: '/twitter-engagement-rate-calculator',
    platform: 'X',
    description:
      'Measure your X engagement rate with likes, replies, reposts, and bookmarks. Compare against benchmarks.',
    aboutDescription:
      'Measure your X engagement rate using likes, replies, reposts, and bookmarks. Compare against benchmarks by follower tier and industry.',
    embeddable: true,
  },
  {
    slug: 'twitter-sponsorship-rate-calculator',
    title: 'X (Twitter) Sponsorship Rate Calculator',
    cardTitle: 'X (Twitter) Sponsorship Rate',
    href: '/twitter-sponsorship-rate-calculator',
    platform: 'X',
    description: 'Calculate how much to charge for sponsored tweets, threads, and X Spaces.',
    aboutDescription:
      'Find out how much to charge for sponsored X content based on your followers, engagement rate, content type, and niche.',
    embeddable: true,
  },
  {
    slug: 'engagement-rate-calculator',
    title: 'Engagement Rate Calculator',
    cardTitle: 'Engagement Rate Calculator',
    href: '/engagement-rate-calculator',
    platform: 'Multi-Platform',
    description:
      'Calculate your engagement rate on Instagram or TikTok. Compare against 2026 industry benchmarks.',
    aboutDescription:
      'All-in-one engagement rate calculator for Instagram and TikTok. Compare against industry benchmarks and get personalized recommendations.',
    embeddable: false,
  },
  {
    slug: 'engagement-rate-benchmarks',
    title: 'Engagement Rate Benchmarks',
    cardTitle: 'Engagement Rate Benchmarks',
    href: '/engagement-rate-benchmarks',
    platform: 'Multi-Platform',
    description:
      'See average engagement rates by follower tier, industry, and platform for Instagram and TikTok.',
    aboutDescription:
      'Complete engagement rate benchmark data for 2026. See average rates by follower tier, industry, and platform for Instagram and TikTok.',
    embeddable: false,
  },
];

/** All calculators in display order. */
export function getAllCalculators(): CalculatorEntry[] {
  return CALCULATORS;
}

/** Only calculators that support the embed widget. */
export function getAllEmbeddableSlugs(): string[] {
  return CALCULATORS.filter((c) => c.embeddable).map((c) => c.slug);
}

/** Lookup a single calculator by its URL slug. */
export function getCalculatorBySlug(slug: string): CalculatorEntry | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}
