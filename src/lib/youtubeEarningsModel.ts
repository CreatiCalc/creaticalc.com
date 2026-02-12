// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentFormat = 'longform' | 'shorts';

export type VideoLength = 'short' | 'standard' | 'long';

export type NicheId =
  | 'finance'
  | 'tech'
  | 'education'
  | 'health'
  | 'beauty'
  | 'travel'
  | 'food'
  | 'lifestyle'
  | 'entertainment'
  | 'gaming';

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
}

export interface Recommendation {
  id: string;
  text: string;
  detail: string;
  scenario: Partial<ProjectionInput>;
  projectedImpact: number;
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
  finance: { name: 'Finance & Business', cpm: { low: 18, mid: 30, high: 45 } },
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
    low: +(data.cpm.low * YOUTUBE_CREATOR_SHARE).toFixed(2),
    mid: +(data.cpm.mid * YOUTUBE_CREATOR_SHARE).toFixed(2),
    high: +(data.cpm.high * YOUTUBE_CREATOR_SHARE).toFixed(2),
  },
}));

export const SHORTS_RPM: RpmRange = { low: 0.02, mid: 0.05, high: 0.08 };

export const VIDEO_LENGTH_MULTIPLIERS: Record<VideoLength, number> = {
  short: 0.7,
  standard: 1.0,
  long: 1.3,
};

export function getNiche(nicheId: NicheId): Niche {
  return NICHES.find((n) => n.id === nicheId) ?? NICHES[0];
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

const DAYS_IN_MONTH: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// ─── Core Projection ─────────────────────────────────────────────────────────

export function projectEarnings(input: ProjectionInput): ProjectionResult {
  const niche = getNiche(input.nicheId);
  const isShorts = input.contentFormat === 'shorts';
  const baseRpm = isShorts ? SHORTS_RPM : niche.rpm;
  const lengthMultiplier =
    !isShorts && input.videoLength ? VIDEO_LENGTH_MULTIPLIERS[input.videoLength] : 1.0;
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
      low: baseRpm.low * seasonalityMultiplier * lengthMultiplier,
      mid: baseRpm.mid * seasonalityMultiplier * lengthMultiplier,
      high: baseRpm.high * seasonalityMultiplier * lengthMultiplier,
    };

    const revenue: RpmRange = {
      low: (projectedMonthViews / 1000) * effectiveRpm.low,
      mid: (projectedMonthViews / 1000) * effectiveRpm.mid,
      high: (projectedMonthViews / 1000) * effectiveRpm.high,
    };

    months.push({
      monthIndex: i,
      monthLabel: MONTH_LABELS[calMonth],
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

// ─── Recommendations ──────────────────────────────────────────────────────────

export function generateRecommendations(
  input: ProjectionInput,
  projection: ProjectionResult,
  revenueTarget: number
): Recommendation[] {
  const recs: Recommendation[] = [];
  const currentMonthlyMid = projection.summary.monthly.mid;

  const isShorts = input.contentFormat === 'shorts';

  // 1. Increase views
  if (currentMonthlyMid < revenueTarget) {
    const niche = getNiche(input.nicheId);
    const baseRpm = isShorts ? SHORTS_RPM : niche.rpm;
    const calMonth = input.startMonth % 12;
    const seasonMul = input.seasonalityEnabled ? SEASONALITY_MULTIPLIERS[calMonth] : 1.0;
    const effectiveMidRpm = baseRpm.mid * seasonMul;
    const daysInFirstMonth = DAYS_IN_MONTH[calMonth];
    const neededMonthViews = (revenueTarget / effectiveMidRpm) * 1000;
    const neededDailyViews = Math.ceil(neededMonthViews / daysInFirstMonth);

    if (neededDailyViews > input.dailyViews) {
      const impactProjection = projectEarnings({ ...input, dailyViews: neededDailyViews });
      recs.push({
        id: 'increase-views',
        text: `Increase daily views to ${neededDailyViews.toLocaleString()}`,
        detail: `At ${neededDailyViews.toLocaleString()} daily views with your current niche, you'd reach $${revenueTarget.toLocaleString()}/mo.`,
        scenario: { dailyViews: neededDailyViews },
        projectedImpact: impactProjection.summary.monthly.mid - currentMonthlyMid,
      });
    }
  }

  // 2. Increase growth rate
  if (currentMonthlyMid < revenueTarget && input.monthlyGrowthRate < 0.5) {
    let bestRate = input.monthlyGrowthRate;
    for (let rate = 0.01; rate <= 0.5; rate += 0.01) {
      const testProjection = projectEarnings({ ...input, monthlyGrowthRate: rate });
      const month12Rev = testProjection.months[11].revenue.mid;
      if (month12Rev >= revenueTarget) {
        bestRate = rate;
        break;
      }
    }
    if (bestRate > input.monthlyGrowthRate) {
      const impactProjection = projectEarnings({ ...input, monthlyGrowthRate: bestRate });
      const avgMonthly = impactProjection.totals.mid / 12;
      recs.push({
        id: 'increase-growth',
        text: `Grow at ${Math.round(bestRate * 100)}% per month`,
        detail: `With ${Math.round(bestRate * 100)}% monthly growth, you'd reach $${revenueTarget.toLocaleString()}/mo by month 12.`,
        scenario: { monthlyGrowthRate: bestRate },
        projectedImpact: avgMonthly - currentMonthlyMid,
      });
    }
  }

  // 3. Switch niche (up to 2 higher-RPM niches) — skip for Shorts
  if (currentMonthlyMid < revenueTarget && !isShorts) {
    const currentNiche = getNiche(input.nicheId);
    const higherNiches = NICHES.filter((n) => n.rpm.mid > currentNiche.rpm.mid).sort(
      (a, b) => b.rpm.mid - a.rpm.mid
    );

    for (const betterNiche of higherNiches.slice(0, 2)) {
      const nicheProjection = projectEarnings({ ...input, nicheId: betterNiche.id });
      const impact = nicheProjection.summary.monthly.mid - currentMonthlyMid;
      if (impact > 0) {
        recs.push({
          id: `switch-niche-${betterNiche.id}`,
          text: `Switch to ${betterNiche.name}`,
          detail: `${betterNiche.name} has a mid RPM of $${betterNiche.rpm.mid.toFixed(2)} vs your current $${currentNiche.rpm.mid.toFixed(2)}.`,
          scenario: { nicheId: betterNiche.id },
          projectedImpact: impact,
        });
      }
    }
  }

  // 4. Enable seasonality
  if (currentMonthlyMid < revenueTarget && !input.seasonalityEnabled) {
    const seasonalProjection = projectEarnings({ ...input, seasonalityEnabled: true });
    const impact = seasonalProjection.totals.mid / 12 - currentMonthlyMid;
    if (impact > 0) {
      recs.push({
        id: 'enable-seasonality',
        text: 'Enable seasonality modeling',
        detail:
          'Seasonal ad rates vary throughout the year. Q4 (Nov-Dec) pays 30-40% more while January dips ~20%.',
        scenario: { seasonalityEnabled: true },
        projectedImpact: impact,
      });
    }
  }

  return recs.sort((a, b) => b.projectedImpact - a.projectedImpact).slice(0, 5);
}

// ─── Driver Analysis ──────────────────────────────────────────────────────────

export function calculateDrivers(input: ProjectionInput, projection: ProjectionResult): Driver[] {
  const baseMonthlyMid = projection.summary.monthly.mid;
  const isShorts = input.contentFormat === 'shorts';
  const drivers: Driver[] = [];

  // Views: impact of +10K daily views
  const viewsBump = projectEarnings({ ...input, dailyViews: input.dailyViews + 10000 });
  const viewsImpact = viewsBump.summary.monthly.mid - baseMonthlyMid;
  drivers.push({
    factor: 'Daily Views',
    description: 'Impact of +10,000 daily views',
    currentValue: input.dailyViews.toLocaleString(),
    impactPerUnit: viewsImpact,
    relativeImpact: 0,
  });

  // Niche: difference vs best niche — skip for Shorts (niche doesn't affect RPM)
  if (!isShorts) {
    const bestNiche = NICHES.reduce((best, n) => (n.rpm.mid > best.rpm.mid ? n : best), NICHES[0]);
    const bestNicheProjection = projectEarnings({ ...input, nicheId: bestNiche.id });
    const nicheImpact = bestNicheProjection.summary.monthly.mid - baseMonthlyMid;
    drivers.push({
      factor: 'Content Niche',
      description: `Gap vs. best niche (${bestNiche.name})`,
      currentValue: getNiche(input.nicheId).name,
      impactPerUnit: nicheImpact,
      relativeImpact: 0,
    });
  }

  // Growth: impact of +5% monthly growth (measured at month 12)
  const growthBump = projectEarnings({
    ...input,
    monthlyGrowthRate: input.monthlyGrowthRate + 0.05,
  });
  const growthImpact = growthBump.months[11].revenue.mid - projection.months[11].revenue.mid;
  drivers.push({
    factor: 'Growth Rate',
    description: 'Impact of +5% monthly growth (by month 12)',
    currentValue: `${Math.round(input.monthlyGrowthRate * 100)}%`,
    impactPerUnit: growthImpact,
    relativeImpact: 0,
  });

  // Seasonality: avg monthly impact of toggling
  const toggledProjection = projectEarnings({
    ...input,
    seasonalityEnabled: !input.seasonalityEnabled,
  });
  const seasonalityImpact = Math.abs(
    toggledProjection.totals.mid / 12 - projection.totals.mid / 12
  );
  drivers.push({
    factor: 'Seasonality',
    description: input.seasonalityEnabled
      ? 'Avg monthly impact of seasonal ad rates'
      : 'Potential impact if seasonality enabled',
    currentValue: input.seasonalityEnabled ? 'On' : 'Off',
    impactPerUnit: seasonalityImpact,
    relativeImpact: 0,
  });

  // Calculate relative impact
  const totalImpact = drivers.reduce((sum, d) => sum + Math.abs(d.impactPerUnit), 0);
  if (totalImpact > 0) {
    for (const d of drivers) {
      d.relativeImpact = Math.round((Math.abs(d.impactPerUnit) / totalImpact) * 100);
    }
  }

  return drivers.sort((a, b) => b.relativeImpact - a.relativeImpact);
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function formatUSD(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}
