interface CalculatorMeta {
  title: string;
  canonicalPath: string;
}

const registry: Record<string, CalculatorMeta> = {
  'youtube-money-calculator': {
    title: 'YouTube Money Calculator',
    canonicalPath: '/youtube-money-calculator',
  },
  'youtube-shorts-money-calculator': {
    title: 'YouTube Shorts Money Calculator',
    canonicalPath: '/youtube-shorts-money-calculator',
  },
  'youtube-subscriber-projector': {
    title: 'YouTube Subscriber Growth Projector',
    canonicalPath: '/youtube-subscriber-projector',
  },
  'instagram-engagement-rate-calculator': {
    title: 'Instagram Engagement Rate Calculator',
    canonicalPath: '/instagram-engagement-rate-calculator',
  },
  'instagram-sponsorship-rate-calculator': {
    title: 'Instagram Sponsorship Rate Calculator',
    canonicalPath: '/instagram-sponsorship-rate-calculator',
  },
  'tiktok-engagement-rate-calculator': {
    title: 'TikTok Engagement Rate Calculator',
    canonicalPath: '/tiktok-engagement-rate-calculator',
  },
  'tiktok-sponsorship-rate-calculator': {
    title: 'TikTok Sponsorship Rate Calculator',
    canonicalPath: '/tiktok-sponsorship-rate-calculator',
  },
  'facebook-engagement-rate-calculator': {
    title: 'Facebook Engagement Rate Calculator',
    canonicalPath: '/facebook-engagement-rate-calculator',
  },
  'twitter-engagement-rate-calculator': {
    title: 'X (Twitter) Engagement Rate Calculator',
    canonicalPath: '/twitter-engagement-rate-calculator',
  },
};

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return registry[slug];
}

export function getAllEmbeddableSlugs(): string[] {
  return Object.keys(registry);
}
