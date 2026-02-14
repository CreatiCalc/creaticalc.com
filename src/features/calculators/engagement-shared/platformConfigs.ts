import type {
  Platform,
  EngagementInput,
  InstagramContentType,
  IndustryId,
} from '@/lib/engagementModel';
import { setInputField } from '@/lib/engagementModel';

// ─── Config Types ────────────────────────────────────────────────────────────

interface Tick {
  value: number;
  label: string;
}

export interface MetricDef {
  inputKey: keyof EngagementInput;
  label: string;
  formulaLabel: string;
  defaultValue: number;
  sliderMin: number;
  sliderMax: number;
  step: number;
  ticks: Tick[];
  inputMax: number;
}

export interface AltMetricDef {
  inputKey: keyof EngagementInput;
  label: string;
  formulaLabel: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  ticks: Tick[];
  useSlider: boolean;
  activeForMethod: string;
}

export interface CalcMethodDef {
  value: string;
  label: string;
  description?: string;
}

export interface EngagementPlatformConfig {
  platform: Platform;
  basePath: string;
  defaultFollowers: number;
  followerSliderMax: number;
  followerLabel: string;
  metrics: MetricDef[];
  metricsGridCols: string;
  calcMethods: CalcMethodDef[];
  calcMethodInputKey: keyof EngagementInput;
  calcMethodWrap?: boolean;
  altMetrics: AltMetricDef[];
  altMetricGrouped: boolean;
  altMetricAlwaysVisible: boolean;
  altMetricSecondaryHint?: string;
  altMetricGroupHint?: string;
  contentTerm: string;
  hasContentType?: boolean;
  defaultContentType?: InstagramContentType;
  hasMultiFormula?: boolean;
}

// ─── Shared tick sets ────────────────────────────────────────────────────────

const STANDARD_TICKS: Tick[] = [
  { value: 10, label: '10' },
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
];

const LIKE_TICKS: Tick[] = [
  { value: 10, label: '10' },
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
];

const LARGE_TICKS: Tick[] = [
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

// ─── Platform Configs ────────────────────────────────────────────────────────

export const INSTAGRAM_CONFIG: EngagementPlatformConfig = {
  platform: 'instagram',
  basePath: '/instagram-engagement-rate-calculator',
  defaultFollowers: 10_000,
  followerSliderMax: 5_000_000,
  followerLabel: 'Followers',
  metricsGridCols: 'sm:grid-cols-3',
  calcMethods: [
    { value: 'byFollowers', label: 'By Followers', description: 'Standard formula' },
    { value: 'byReach', label: 'By Reach', description: 'Post reach' },
    { value: 'byImpressions', label: 'By Impressions', description: 'Post impressions' },
  ],
  calcMethodInputKey: 'instagramCalcMethod',
  calcMethodWrap: true,
  metrics: [
    {
      inputKey: 'avgLikes',
      label: 'Avg. Likes per Post',
      formulaLabel: 'Likes',
      defaultValue: 200,
      sliderMin: 1,
      sliderMax: 500_000,
      step: 1,
      ticks: LIKE_TICKS,
      inputMax: 10_000_000,
    },
    {
      inputKey: 'avgComments',
      label: 'Avg. Comments per Post',
      formulaLabel: 'Comments',
      defaultValue: 10,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 500_000,
    },
    {
      inputKey: 'avgSaves',
      label: 'Avg. Saves per Post',
      formulaLabel: 'Saves',
      defaultValue: 15,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 500_000,
    },
  ],
  altMetrics: [
    {
      inputKey: 'avgReach',
      label: 'Avg. Reach per Post',
      formulaLabel: 'Reach',
      defaultValue: 0,
      min: 0,
      max: 10_000_000,
      step: 100,
      ticks: LARGE_TICKS,
      useSlider: false,
      activeForMethod: 'byReach',
    },
    {
      inputKey: 'avgImpressions',
      label: 'Avg. Impressions per Post',
      formulaLabel: 'Impressions',
      defaultValue: 0,
      min: 0,
      max: 10_000_000,
      step: 100,
      ticks: LARGE_TICKS,
      useSlider: false,
      activeForMethod: 'byImpressions',
    },
  ],
  altMetricGrouped: true,
  altMetricAlwaysVisible: false,
  altMetricGroupHint: 'Find reach and impressions in Instagram Insights for each post.',
  contentTerm: 'Posts',
  hasContentType: true,
  defaultContentType: 'mixed',
  hasMultiFormula: true,
};

export const TIKTOK_CONFIG: EngagementPlatformConfig = {
  platform: 'tiktok',
  basePath: '/tiktok-engagement-rate-calculator',
  defaultFollowers: 10_000,
  followerSliderMax: 5_000_000,
  followerLabel: 'Followers',
  metricsGridCols: 'sm:grid-cols-3',
  calcMethods: [
    { value: 'byFollowers', label: 'By Followers', description: 'Standard formula' },
    { value: 'byViews', label: 'By Views', description: 'Video views' },
  ],
  calcMethodInputKey: 'calcMethod',
  metrics: [
    {
      inputKey: 'avgLikes',
      label: 'Avg. Likes per Video',
      formulaLabel: 'Likes',
      defaultValue: 600,
      sliderMin: 1,
      sliderMax: 500_000,
      step: 1,
      ticks: LIKE_TICKS,
      inputMax: 50_000_000,
    },
    {
      inputKey: 'avgComments',
      label: 'Avg. Comments per Video',
      formulaLabel: 'Comments',
      defaultValue: 30,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 1_000_000,
    },
    {
      inputKey: 'avgShares',
      label: 'Avg. Shares per Video',
      formulaLabel: 'Shares',
      defaultValue: 20,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 500_000,
    },
  ],
  altMetrics: [
    {
      inputKey: 'avgViews',
      label: 'Avg. Views per Video',
      formulaLabel: 'Views',
      defaultValue: 8_000,
      min: 100,
      max: 10_000_000,
      step: 100,
      ticks: LARGE_TICKS,
      useSlider: true,
      activeForMethod: 'byViews',
    },
  ],
  altMetricGrouped: false,
  altMetricAlwaysVisible: true,
  altMetricSecondaryHint:
    'Used for context \u2014 switch to \u201cBy Views\u201d to use this as the denominator',
  contentTerm: 'Videos',
};

export const FACEBOOK_CONFIG: EngagementPlatformConfig = {
  platform: 'facebook',
  basePath: '/facebook-engagement-rate-calculator',
  defaultFollowers: 5_000,
  followerSliderMax: 5_000_000,
  followerLabel: 'Page Followers',
  metricsGridCols: 'sm:grid-cols-3',
  calcMethods: [
    { value: 'byFollowers', label: 'By Page Followers', description: 'Standard formula' },
    { value: 'byReach', label: 'By Post Reach', description: 'Post reach' },
  ],
  calcMethodInputKey: 'facebookCalcMethod',
  metrics: [
    {
      inputKey: 'avgLikes',
      label: 'Avg. Reactions per Post',
      formulaLabel: 'Reactions',
      defaultValue: 50,
      sliderMin: 1,
      sliderMax: 500_000,
      step: 1,
      ticks: LIKE_TICKS,
      inputMax: 500_000,
    },
    {
      inputKey: 'avgComments',
      label: 'Avg. Comments per Post',
      formulaLabel: 'Comments',
      defaultValue: 10,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 500_000,
    },
    {
      inputKey: 'avgShares',
      label: 'Avg. Shares per Post',
      formulaLabel: 'Shares',
      defaultValue: 5,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 100_000,
    },
  ],
  altMetrics: [
    {
      inputKey: 'avgReach',
      label: 'Avg. Post Reach',
      formulaLabel: 'Reach',
      defaultValue: 500,
      min: 10,
      max: 5_000_000,
      step: 10,
      ticks: LARGE_TICKS,
      useSlider: true,
      activeForMethod: 'byReach',
    },
  ],
  altMetricGrouped: false,
  altMetricAlwaysVisible: true,
  altMetricSecondaryHint:
    'Used for context \u2014 switch to \u201cBy Post Reach\u201d to use this as the denominator',
  contentTerm: 'Posts',
};

export const TWITTER_CONFIG: EngagementPlatformConfig = {
  platform: 'twitter',
  basePath: '/twitter-engagement-rate-calculator',
  defaultFollowers: 5_000,
  followerSliderMax: 5_000_000,
  followerLabel: 'Followers',
  metricsGridCols: 'sm:grid-cols-2 lg:grid-cols-4',
  calcMethods: [
    { value: 'byFollowers', label: 'By Followers', description: 'Standard formula' },
    { value: 'byImpressions', label: 'By Impressions', description: 'Post impressions' },
  ],
  calcMethodInputKey: 'twitterCalcMethod',
  metrics: [
    {
      inputKey: 'avgLikes',
      label: 'Avg. Likes per Post',
      formulaLabel: 'Likes',
      defaultValue: 50,
      sliderMin: 1,
      sliderMax: 500_000,
      step: 1,
      ticks: LIKE_TICKS,
      inputMax: 500_000,
    },
    {
      inputKey: 'avgComments',
      label: 'Avg. Replies per Post',
      formulaLabel: 'Replies',
      defaultValue: 5,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 100_000,
    },
    {
      inputKey: 'avgReposts',
      label: 'Avg. Reposts per Post',
      formulaLabel: 'Reposts',
      defaultValue: 10,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 100_000,
    },
    {
      inputKey: 'avgBookmarks',
      label: 'Avg. Bookmarks per Post',
      formulaLabel: 'Bookmarks',
      defaultValue: 3,
      sliderMin: 0,
      sliderMax: 50_000,
      step: 1,
      ticks: STANDARD_TICKS,
      inputMax: 50_000,
    },
  ],
  altMetrics: [
    {
      inputKey: 'avgImpressions',
      label: 'Avg. Impressions per Post',
      formulaLabel: 'Impressions',
      defaultValue: 5_000,
      min: 100,
      max: 10_000_000,
      step: 100,
      ticks: LARGE_TICKS,
      useSlider: true,
      activeForMethod: 'byImpressions',
    },
  ],
  altMetricGrouped: false,
  altMetricAlwaysVisible: true,
  altMetricSecondaryHint:
    'Used for context \u2014 switch to \u201cBy Impressions\u201d to use this as the denominator',
  contentTerm: 'Posts',
};

// ─── State Builders ──────────────────────────────────────────────────────────

export function buildDefaultState(config: EngagementPlatformConfig): EngagementInput {
  let state: EngagementInput = {
    platform: config.platform,
    followers: config.defaultFollowers,
    avgLikes: 0,
    avgComments: 0,
    industryId: 'general' as IndustryId,
    postsAnalyzed: 10,
  };

  for (const m of config.metrics) {
    state = setInputField(state, m.inputKey, m.defaultValue);
  }
  for (const alt of config.altMetrics) {
    state = setInputField(state, alt.inputKey, alt.defaultValue);
  }
  if (config.calcMethods.length > 0) {
    state = setInputField(state, config.calcMethodInputKey, config.calcMethods[0].value);
  }
  if (config.hasContentType && config.defaultContentType) {
    state.contentType = config.defaultContentType;
  }

  return state;
}
