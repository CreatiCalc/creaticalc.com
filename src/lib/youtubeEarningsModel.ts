import { MONTH_ABBREVIATIONS } from './formatters';
import type { YouTubeNicheId } from './niches';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentFormat = 'longform' | 'shorts';

export type VideoLength = 'short' | 'standard' | 'long';

export type NicheId = YouTubeNicheId;

export interface RpmRange {
  low: number;
  mid: number;
  high: number;
}

export interface Niche {
  id: NicheId;
  name: string;
  rpm: RpmRange;
  cpm: RpmRange;
}

export interface MonthProjection {
  monthIndex: number;
  monthLabel: string;
  monthNumber: number;
  projectedDailyViews: number;
  projectedMonthViews: number;
  seasonalityMultiplier: number;
  rpm: RpmRange;
  revenue: RpmRange;
}

export interface ProjectionResult {
  months: MonthProjection[];
  totals: RpmRange;
  summary: {
    daily: RpmRange;
    monthly: RpmRange;
    yearly: RpmRange;
  };
}

export interface ProjectionInput {
  dailyViews: number;
  nicheId: NicheId;
  monthlyGrowthRate: number;
  seasonalityEnabled: boolean;
  startMonth: number;
  contentFormat?: ContentFormat;
  videoLength?: VideoLength;
  highCpmAudiencePct?: number;
}

export interface OptimizationTip {
  id: string;
  category: 'revenue' | 'growth' | 'strategy';
  title: string;
  detail: string;
  impactValue?: number;
  impact?: string;
  scenario?: Partial<ProjectionInput>;
}

export interface Driver {
  factor: string;
  description: string;
  currentValue: string;
  impactPerUnit: number;
  relativeImpact: number;
}

// ─── Data Tables ──────────────────────────────────────────────────────────────

const YOUTUBE_CREATOR_SHARE = 0.55;

const CPM_DATA: Record<NicheId, { name: string; cpm: RpmRange }> = {
  finance: { name: 'Finance & Business', cpm: { low: 20, mid: 32, high: 50 } },
  tech: { name: 'Technology', cpm: { low: 8, mid: 12, high: 18 } },
  education: { name: 'Education', cpm: { low: 5, mid: 8, high: 12 } },
  health: { name: 'Health & Fitness', cpm: { low: 5, mid: 8, high: 12 } },
  beauty: { name: 'Beauty & Fashion', cpm: { low: 3, mid: 6, high: 10 } },
  travel: { name: 'Travel', cpm: { low: 4, mid: 7, high: 10 } },
  food: { name: 'Food & Cooking', cpm: { low: 3, mid: 5, high: 8 } },
  lifestyle: { name: 'Lifestyle', cpm: { low: 2, mid: 4, high: 6 } },
  entertainment: { name: 'Entertainment', cpm: { low: 1.5, mid: 2.5, high: 4 } },
  gaming: { name: 'Gaming', cpm: { low: 1.5, mid: 3, high: 5 } },
};

export const NICHES: Niche[] = Object.entries(CPM_DATA).map(([id, data]) => ({
  id: id as NicheId,
  name: data.name,
  cpm: data.cpm,
  rpm: {
    low: Math.round(data.cpm.low * YOUTUBE_CREATOR_SHARE * 100) / 100,
    mid: Math.round(data.cpm.mid * YOUTUBE_CREATOR_SHARE * 100) / 100,
    high: Math.round(data.cpm.high * YOUTUBE_CREATOR_SHARE * 100) / 100,
  },
}));

/** Canonical set of valid NicheId values — use for codec validation instead of hardcoding. */
export const VALID_NICHE_IDS: ReadonlySet<string> = new Set<string>(NICHES.map((n) => n.id));

export const SHORTS_RPM: RpmRange = { low: 0.01, mid: 0.04, high: 0.07 };

export const VIDEO_LENGTH_MULTIPLIERS: Record<VideoLength, number> = {
  short: 0.7,
  standard: 1.0,
  long: 1.3,
};

export function getNiche(nicheId: NicheId): Niche {
  return NICHES.find((n) => n.id === nicheId) ?? NICHES[0];
}

// Geography RPM multiplier constants
const GEO_MIN_MULTIPLIER = 0.4; // 0% high-CPM audience (all low-CPM regions)
const GEO_BASELINE_MULTIPLIER = 1.0; // 50% high-CPM audience (default)
const GEO_MAX_MULTIPLIER = 1.4; // 100% high-CPM audience (all US/UK/CA/AU)
const GEO_BASELINE_PCT = 50; // Percentage threshold for baseline multiplier

/**
 * Geographic RPM multiplier based on % of audience from high-CPM regions (US/UK/CA/AU).
 * - 0% high-CPM → 0.4x (all low-CPM regions like India/SE Asia)
 * - 50% (default) → 1.0x (baseline)
 * - 100% high-CPM → 1.4x (all US/UK/CA/AU)
 */
export function getGeographyMultiplier(highCpmPct: number): number {
  const pct = Math.max(0, Math.min(100, highCpmPct));
  if (pct <= GEO_BASELINE_PCT) {
    return (
      GEO_MIN_MULTIPLIER + (pct / GEO_BASELINE_PCT) * (GEO_BASELINE_MULTIPLIER - GEO_MIN_MULTIPLIER)
    );
  }
  return (
    GEO_BASELINE_MULTIPLIER +
    ((pct - GEO_BASELINE_PCT) / (100 - GEO_BASELINE_PCT)) *
      (GEO_MAX_MULTIPLIER - GEO_BASELINE_MULTIPLIER)
  );
}

// Index 0 = January, 11 = December
export const SEASONALITY_MULTIPLIERS: number[] = [
  0.8, // Jan
  0.85, // Feb
  0.9, // Mar
  0.95, // Apr
  1.0, // May
  1.0, // Jun
  0.95, // Jul
  1.0, // Aug
  1.05, // Sep
  1.1, // Oct
  1.3, // Nov
  1.4, // Dec
];

export const DAYS_IN_MONTH: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// ─── Core Projection ─────────────────────────────────────────────────────────

export function projectEarnings(input: ProjectionInput): ProjectionResult {
  const niche = getNiche(input.nicheId);
  const isShorts = input.contentFormat === 'shorts';
  const baseRpm = isShorts ? SHORTS_RPM : niche.rpm;
  const lengthMultiplier =
    !isShorts && input.videoLength ? VIDEO_LENGTH_MULTIPLIERS[input.videoLength] : 1.0;
  const geoMultiplier =
    input.highCpmAudiencePct != null ? getGeographyMultiplier(input.highCpmAudiencePct) : 1.0;
  const months: MonthProjection[] = [];

  for (let i = 0; i < 12; i++) {
    const calMonth = (input.startMonth + i) % 12;
    const growthFactor = Math.pow(1 + input.monthlyGrowthRate, i);
    const projectedDailyViews = Math.round(input.dailyViews * growthFactor);
    const projectedMonthViews = projectedDailyViews * DAYS_IN_MONTH[calMonth];
    const seasonalityMultiplier = input.seasonalityEnabled
      ? SEASONALITY_MULTIPLIERS[calMonth]
      : 1.0;

    const effectiveRpm: RpmRange = {
      low: baseRpm.low * seasonalityMultiplier * lengthMultiplier * geoMultiplier,
      mid: baseRpm.mid * seasonalityMultiplier * lengthMultiplier * geoMultiplier,
      high: baseRpm.high * seasonalityMultiplier * lengthMultiplier * geoMultiplier,
    };

    const revenue: RpmRange = {
      low: (projectedMonthViews / 1000) * effectiveRpm.low,
      mid: (projectedMonthViews / 1000) * effectiveRpm.mid,
      high: (projectedMonthViews / 1000) * effectiveRpm.high,
    };

    months.push({
      monthIndex: i,
      monthLabel: MONTH_ABBREVIATIONS[calMonth],
      monthNumber: calMonth,
      projectedDailyViews,
      projectedMonthViews,
      seasonalityMultiplier,
      rpm: effectiveRpm,
      revenue,
    });
  }

  const totals: RpmRange = {
    low: months.reduce((sum, m) => sum + m.revenue.low, 0),
    mid: months.reduce((sum, m) => sum + m.revenue.mid, 0),
    high: months.reduce((sum, m) => sum + m.revenue.high, 0),
  };

  const firstMonth = months[0];
  const dailyRevenue: RpmRange = {
    low: firstMonth.revenue.low / DAYS_IN_MONTH[input.startMonth % 12],
    mid: firstMonth.revenue.mid / DAYS_IN_MONTH[input.startMonth % 12],
    high: firstMonth.revenue.high / DAYS_IN_MONTH[input.startMonth % 12],
  };

  return {
    months,
    totals,
    summary: {
      daily: dailyRevenue,
      monthly: firstMonth.revenue,
      yearly: totals,
    },
  };
}

// ─── Re-exports for backward compatibility ─────────────────────────────────

export { generateOptimizationTips } from './youtubeOptimizations';
export { calculateDrivers, findMilestoneMonths, type MilestoneResult } from './youtubeAnalytics';

// ─── Utilities (canonical source: ./formatters) ─────────────────────────────

export { formatUSD } from './formatters';
