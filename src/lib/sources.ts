export interface Source {
  /** Short identifier used as a key (e.g. 'youtubePartnerProgram') */
  id: string;
  /** Display name shown in citations */
  name: string;
  /** Full URL to the source */
  url: string;
  /** Brief description of what this source provides */
  description: string;
}

/**
 * Centralized list of all external sources cited across CreatiCalc.
 * Import and filter by ID to populate citation lists on any page.
 */
export const SOURCES: Source[] = [
  {
    id: 'youtubePartnerProgram',
    name: 'YouTube Partner Program',
    url: 'https://support.google.com/youtube/answer/72857',
    description: 'Confirms the 55/45 creator/YouTube revenue split and monetization requirements.',
  },
  {
    id: 'statista',
    name: 'Statista',
    url: 'https://www.statista.com/topics/2019/youtube/',
    description: 'CPM ranges by vertical and digital advertising market data.',
  },
  {
    id: 'emarketer',
    name: 'eMarketer',
    url: 'https://www.emarketer.com/',
    description: 'Seasonal ad-spend patterns and digital advertising forecasts.',
  },
  {
    id: 'socialBlade',
    name: 'Social Blade',
    url: 'https://socialblade.com/',
    description: 'Creator statistics and estimated earnings cross-reference.',
  },
  {
    id: 'influencerMarketingHub',
    name: 'Influencer Marketing Hub',
    url: 'https://influencermarketinghub.com/',
    description: 'Creator survey data, rate cards, and sponsorship pricing benchmarks.',
  },
  {
    id: 'hypeauditor',
    name: 'HypeAuditor',
    url: 'https://www.hypeauditor.com/',
    description: 'Annual engagement rate reports by platform, follower tier, and industry.',
  },
  {
    id: 'hootsuite',
    name: 'Hootsuite',
    url: 'https://blog.hootsuite.com/calculate-engagement-rate/',
    description: 'Engagement rate calculation methodology and platform benchmarks.',
  },
  {
    id: 'socialInsider',
    name: 'Social Insider',
    url: 'https://www.socialinsider.io/',
    description: 'Cross-platform engagement benchmarks and year-over-year trend data.',
  },
  {
    id: 'iab',
    name: 'IAB (Interactive Advertising Bureau)',
    url: 'https://www.iab.com/',
    description: 'Annual digital ad-spend reports and seasonal advertising data.',
  },
];

/** Look up sources by their IDs. */
export function getSourcesById(ids: string[]): Source[] {
  return ids.map((id) => {
    const source = SOURCES.find((s) => s.id === id);
    if (!source) throw new Error(`Unknown source ID: ${id}`);
    return source;
  });
}

// ── Grouped source IDs by topic ─────────────────────────────────────────────

/** Sources used for YouTube earnings estimates. */
export const YOUTUBE_EARNINGS_SOURCE_IDS = [
  'youtubePartnerProgram',
  'statista',
  'emarketer',
  'socialBlade',
  'influencerMarketingHub',
] as const;

/** Sources used for engagement rate benchmarks. */
export const ENGAGEMENT_SOURCE_IDS = ['hypeauditor', 'hootsuite', 'socialInsider'] as const;

/** Sources used for sponsorship rate estimates. */
export const SPONSORSHIP_SOURCE_IDS = ['influencerMarketingHub'] as const;

/** Sources used for seasonality model. */
export const SEASONALITY_SOURCE_IDS = ['emarketer', 'iab'] as const;
