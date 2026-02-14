import { getMonthLabel } from './formatters';
import type { YouTubeNicheId } from './niches';

// ─── Types ────────────────────────────────────────────────────────────────────

export type GrowthNicheId = YouTubeNicheId;

export type GrowthInputMode = 'rate' | 'flat';

export interface GrowthNiche {
  id: GrowthNicheId;
  name: string;
  avgMonthlyGrowthPct: number;
}

export interface GrowthInput {
  currentSubs: number;
  inputMode: GrowthInputMode;
  monthlyGrowthRate: number; // decimal, e.g. 0.05 = 5%
  monthlyNewSubs: number; // flat gain per month
  uploadsPerWeek: number;
  nicheId: GrowthNicheId;
  decelerationEnabled: boolean;
}

export interface MonthGrowthProjection {
  monthIndex: number;
  monthLabel: string;
  subscribers: number;
  subscribersLow: number;
  subscribersHigh: number;
}

export interface GrowthMilestone {
  target: number;
  label: string;
  description: string;
  monthIndex: number | null;
}

export interface GrowthRecommendation {
  id: string;
  title: string;
  detail: string;
}

export interface GrowthProjectionResult {
  months: MonthGrowthProjection[];
  summary: {
    current: number;
    month12: number;
    month24: number;
  };
  milestones: GrowthMilestone[];
  recommendations: GrowthRecommendation[];
}

// ─── Data Tables ──────────────────────────────────────────────────────────────

const NICHE_DATA: Record<GrowthNicheId, { name: string; avgMonthlyGrowthPct: number }> = {
  finance: { name: 'Finance & Business', avgMonthlyGrowthPct: 3.5 },
  tech: { name: 'Technology', avgMonthlyGrowthPct: 4.0 },
  education: { name: 'Education', avgMonthlyGrowthPct: 5.0 },
  health: { name: 'Health & Fitness', avgMonthlyGrowthPct: 4.5 },
  beauty: { name: 'Beauty & Fashion', avgMonthlyGrowthPct: 3.0 },
  travel: { name: 'Travel', avgMonthlyGrowthPct: 3.5 },
  food: { name: 'Food & Cooking', avgMonthlyGrowthPct: 4.0 },
  lifestyle: { name: 'Lifestyle', avgMonthlyGrowthPct: 3.0 },
  entertainment: { name: 'Entertainment', avgMonthlyGrowthPct: 6.0 },
  gaming: { name: 'Gaming', avgMonthlyGrowthPct: 5.5 },
};

export const GROWTH_NICHES: GrowthNiche[] = Object.entries(NICHE_DATA).map(([id, data]) => ({
  id: id as GrowthNicheId,
  name: data.name,
  avgMonthlyGrowthPct: data.avgMonthlyGrowthPct,
}));

export function getGrowthNiche(id: GrowthNicheId): GrowthNiche {
  return GROWTH_NICHES.find((n) => n.id === id) ?? GROWTH_NICHES[0];
}

/**
 * Upload frequency multiplier:
 *   0 uploads/week → 0.5x (dead channel)
 *   1 upload/week  → 0.8x
 *   2 uploads/week → 1.0x (baseline)
 *   3 uploads/week → 1.1x
 *   5+ uploads/week → 1.2x (cap)
 */
function getUploadMultiplier(uploadsPerWeek: number): number {
  if (uploadsPerWeek <= 0) return 0.5;
  if (uploadsPerWeek <= 1) return 0.8;
  if (uploadsPerWeek <= 2) return 1.0;
  if (uploadsPerWeek <= 3) return 1.1;
  if (uploadsPerWeek <= 5) return 1.15;
  return 1.2;
}

/**
 * Deceleration factor — larger channels grow slower in percentage terms.
 * Uses linear interpolation between breakpoints for smooth transitions.
 */
const DECELERATION_BREAKPOINTS: [number, number][] = [
  [10_000, 1.0],
  [100_000, 0.85],
  [500_000, 0.7],
  [1_000_000, 0.6],
];
const DECELERATION_FLOOR = 0.5;

function getDecelerationFactor(subs: number): number {
  if (subs < DECELERATION_BREAKPOINTS[0][0]) return DECELERATION_BREAKPOINTS[0][1];

  for (let i = 0; i < DECELERATION_BREAKPOINTS.length - 1; i++) {
    const [lowSubs, lowFactor] = DECELERATION_BREAKPOINTS[i];
    const [highSubs, highFactor] = DECELERATION_BREAKPOINTS[i + 1];
    if (subs < highSubs) {
      const t = (subs - lowSubs) / (highSubs - lowSubs);
      return lowFactor + t * (highFactor - lowFactor);
    }
  }

  const [lastSubs, lastFactor] = DECELERATION_BREAKPOINTS[DECELERATION_BREAKPOINTS.length - 1];
  if (subs < lastSubs) return lastFactor;

  // Interpolate from last breakpoint to floor over the next 1M subs
  const t = Math.min(1, (subs - lastSubs) / 1_000_000);
  return lastFactor + t * (DECELERATION_FLOOR - lastFactor);
}

// ─── Milestone Targets ────────────────────────────────────────────────────────

const MILESTONE_TARGETS = [
  { target: 1_000, label: '1K', description: 'YouTube Partner Program eligibility' },
  { target: 10_000, label: '10K', description: 'Community posts unlocked' },
  { target: 50_000, label: '50K', description: 'Major community milestone' },
  { target: 100_000, label: '100K', description: 'Silver Play Button' },
  { target: 500_000, label: '500K', description: 'Half a million subscribers' },
  { target: 1_000_000, label: '1M', description: 'Gold Play Button' },
];

// ─── Core Projection ─────────────────────────────────────────────────────────

export function projectGrowth(input: GrowthInput): GrowthProjectionResult {
  const now = new Date();
  const startMonth = now.getMonth();
  const startYear = now.getFullYear();
  const uploadMultiplier = getUploadMultiplier(input.uploadsPerWeek);
  const months: MonthGrowthProjection[] = [];

  let subs = input.currentSubs;

  // Month 0 = current (Now)
  months.push({
    monthIndex: 0,
    monthLabel: 'Now',
    subscribers: Math.round(subs),
    subscribersLow: Math.round(subs),
    subscribersHigh: Math.round(subs),
  });

  for (let i = 1; i <= 24; i++) {
    const CONFIDENCE_SPREAD_PER_MONTH = 0.01;
    const CONFIDENCE_SPREAD_CAP = 0.3;
    const confidenceSpread = Math.min(i * CONFIDENCE_SPREAD_PER_MONTH, CONFIDENCE_SPREAD_CAP);

    if (input.inputMode === 'rate') {
      const decel = input.decelerationEnabled ? getDecelerationFactor(subs) : 1.0;
      const effectiveRate = input.monthlyGrowthRate * decel * uploadMultiplier;
      subs = subs * (1 + effectiveRate);
    } else {
      subs = subs + input.monthlyNewSubs * uploadMultiplier;
    }

    const rounded = Math.round(subs);
    months.push({
      monthIndex: i,
      monthLabel: getMonthLabel(startMonth, startYear, i),
      subscribers: rounded,
      subscribersLow: Math.round(rounded * (1 - confidenceSpread)),
      subscribersHigh: Math.round(rounded * (1 + confidenceSpread)),
    });
  }

  // Milestones
  const milestones: GrowthMilestone[] = MILESTONE_TARGETS.map(({ target, label, description }) => {
    if (input.currentSubs >= target) {
      return { target, label, description, monthIndex: 0 };
    }
    const reachedMonth = months.find((m) => m.subscribers >= target);
    return {
      target,
      label,
      description,
      monthIndex: reachedMonth ? reachedMonth.monthIndex : null,
    };
  });

  // Recommendations
  const recommendations = generateGrowthRecommendations(input, months);

  return {
    months,
    summary: {
      current: input.currentSubs,
      month12: months[12]?.subscribers ?? input.currentSubs,
      month24: months[24]?.subscribers ?? input.currentSubs,
    },
    milestones,
    recommendations,
  };
}

// ─── Recommendations ──────────────────────────────────────────────────────────

function generateGrowthRecommendations(
  input: GrowthInput,
  months: MonthGrowthProjection[]
): GrowthRecommendation[] {
  const recs: GrowthRecommendation[] = [];
  const niche = getGrowthNiche(input.nicheId);
  const month12 = months[12]?.subscribers ?? input.currentSubs;
  const effectiveRate =
    input.inputMode === 'rate'
      ? input.monthlyGrowthRate
      : input.currentSubs > 0
        ? input.monthlyNewSubs / input.currentSubs
        : 0;

  // 1. Upload frequency
  if (input.uploadsPerWeek < 2) {
    recs.push({
      id: 'increase-uploads',
      title: 'Upload more consistently',
      detail:
        'Channels uploading 2+ times per week grow significantly faster. The YouTube algorithm favors consistent publishing schedules.',
    });
  }

  // 2. Growth rate vs niche benchmark
  const nicheBenchmark = niche.avgMonthlyGrowthPct / 100;
  if (effectiveRate < nicheBenchmark) {
    recs.push({
      id: 'below-benchmark',
      title: `Your growth is below the ${niche.name} average`,
      detail: `${niche.name} channels average ${niche.avgMonthlyGrowthPct}% monthly growth. Focus on SEO-optimized titles, thumbnails, and trending topics to close the gap.`,
    });
  }

  // 3. Enable deceleration for realistic projections
  if (!input.decelerationEnabled && input.inputMode === 'rate' && input.currentSubs > 10_000) {
    recs.push({
      id: 'enable-deceleration',
      title: 'Enable deceleration for realistic projections',
      detail:
        'Larger channels naturally see slower percentage growth. Enable deceleration to account for the diminishing growth rate as your channel scales.',
    });
  }

  // 4. Niche-specific tips
  if (input.currentSubs < 1_000) {
    recs.push({
      id: 'ypp-focus',
      title: 'Focus on reaching 1,000 subscribers for YPP',
      detail:
        'The YouTube Partner Program requires 1,000 subscribers and 4,000 watch hours. Create a consistent upload schedule and engage with your community to get there faster.',
    });
  }

  // 5. Projected growth encouragement
  if (month12 > input.currentSubs * 2) {
    recs.push({
      id: 'strong-trajectory',
      title: 'You have a strong growth trajectory',
      detail: `At your current rate, you're projected to more than double your subscribers in 12 months. Maintain consistency and consider diversifying your content to sustain this momentum.`,
    });
  } else if (month12 < input.currentSubs * 1.1) {
    recs.push({
      id: 'slow-growth',
      title: 'Consider strategies to accelerate growth',
      detail:
        'Your current pace projects less than 10% growth over 12 months. Try optimizing thumbnails and titles, collaborating with other creators, or experimenting with YouTube Shorts to boost discoverability.',
    });
  }

  return recs.slice(0, 5);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export { formatCompact as formatSubscribers } from './formatters';
