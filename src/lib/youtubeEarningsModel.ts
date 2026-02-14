import { formatUSD } from './formatters';

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

// ─── Optimization Tips ───────────────────────────────────────────────────────

const GROWTH_TACTICS: Omit<OptimizationTip, 'category'>[] = [
  {
    id: 'thumbnails',
    title: 'Optimize thumbnails for CTR',
    detail:
      "A 1% CTR improvement can boost impressions 20–30%. Use bright colors, readable text (max 4 words), and expressive faces. A/B test with YouTube's built-in thumbnail testing feature.",
  },
  {
    id: 'retention',
    title: 'Improve audience retention',
    detail:
      "YouTube promotes videos with high average view duration. Hook viewers in the first 30 seconds, use pattern interrupts every 2–3 minutes, and preview what's coming later to keep them watching.",
  },
  {
    id: 'first-hour',
    title: 'Engage in the first hour after upload',
    detail:
      "Reply to every comment in the first hour after upload. Pin a question as the first comment to spark discussion. YouTube's algorithm weights early engagement signals heavily when deciding how widely to recommend a video.",
  },
  {
    id: 'video-seo',
    title: 'Optimize titles and descriptions for search',
    detail:
      "Put your target keyword in the first 60 characters of your title. Write descriptions of 200+ words with natural keyword usage. Search-optimized videos earn views for years — they're the compound interest of YouTube.",
  },
  {
    id: 'playlists',
    title: 'Use playlists to chain views',
    detail:
      'Group related videos into playlists. When one video ends, the next auto-plays, increasing your total session watch time and ad impressions per viewer. Channels using playlists see 10–20% higher overall watch time.',
  },
  {
    id: 'end-screens',
    title: 'Add end screens to every video',
    detail:
      'End screens drive 10–20% more views on linked content. Always link to your best-performing related video and a playlist. The last 20 seconds of your video should visually direct viewers to click.',
  },
  {
    id: 'consistency',
    title: 'Upload on a consistent schedule',
    detail:
      'Channels that upload on predictable days train their audience to return. Pick 1–3 upload days and stick to them. Consistent uploaders see 15–25% higher day-1 views because subscribers anticipate new content.',
  },
  {
    id: 'collabs',
    title: 'Collaborate with similar creators',
    detail:
      'A single collaboration with a similar-sized creator in an adjacent niche can bring 5–15% new subscribers. Reach out to creators with complementary content — their audience already likes your type of content.',
  },
];

function selectGrowthTactics(nicheId: NicheId, count: number): OptimizationTip[] {
  // Use nicheId to deterministically pick tactics so they're stable per niche
  const nicheIndex = NICHES.findIndex((n) => n.id === nicheId);
  const selected: OptimizationTip[] = [];
  for (let i = 0; i < count && i < GROWTH_TACTICS.length; i++) {
    const idx = (nicheIndex + i * 3) % GROWTH_TACTICS.length;
    const tactic = GROWTH_TACTICS[idx];
    if (!selected.some((s) => s.id === tactic.id)) {
      selected.push({ ...tactic, category: 'growth' });
    }
  }
  // Fill remaining if deduplication reduced count
  for (const tactic of GROWTH_TACTICS) {
    if (selected.length >= count) break;
    if (!selected.some((s) => s.id === tactic.id)) {
      selected.push({ ...tactic, category: 'growth' });
    }
  }
  return selected.slice(0, count);
}

export function generateOptimizationTips(
  input: ProjectionInput,
  projection: ProjectionResult
): OptimizationTip[] {
  const tips: OptimizationTip[] = [];
  const currentMonthlyMid = projection.summary.monthly.mid;
  const isShorts = input.contentFormat === 'shorts';
  const niche = getNiche(input.nicheId);

  // ── Revenue tips (with dollar impact) ──

  // Video length: short → standard (unlock mid-rolls)
  if (!isShorts && input.videoLength === 'short') {
    const upgraded = projectEarnings({ ...input, videoLength: 'standard' });
    const impact = upgraded.summary.monthly.mid - currentMonthlyMid;
    if (impact > 0) {
      tips.push({
        id: 'midroll-unlock',
        category: 'revenue',
        title: 'Enable mid-roll ads',
        detail: `Videos under 8 minutes can only show pre-roll and post-roll ads. Making your content 8+ minutes unlocks mid-roll ads, which typically increases RPM by ~43%. At your current view count, that's an extra ${formatUSD(impact)}/mo.`,
        impactValue: impact,
        impact: `+${formatUSD(impact)}/mo`,
        scenario: { videoLength: 'standard' },
      });
    }
  }

  // Video length: standard → long (more mid-rolls)
  if (!isShorts && input.videoLength === 'standard') {
    const upgraded = projectEarnings({ ...input, videoLength: 'long' });
    const impact = upgraded.summary.monthly.mid - currentMonthlyMid;
    if (impact > 0) {
      tips.push({
        id: 'midroll-more',
        category: 'revenue',
        title: 'Maximize mid-roll placements',
        detail: `Videos over 20 minutes allow multiple mid-roll ad breaks, boosting RPM by ~30% compared to standard-length videos. That adds ${formatUSD(impact)}/mo at your current views. Consider in-depth tutorials, deep dives, or compilation formats.`,
        impactValue: impact,
        impact: `+${formatUSD(impact)}/mo`,
        scenario: { videoLength: 'long' },
      });
    }
  }

  // Audience geography
  const highCpmPct = input.highCpmAudiencePct ?? 50;
  if (highCpmPct < 65) {
    const targetPct = Math.min(highCpmPct + 20, 80);
    const upgraded = projectEarnings({ ...input, highCpmAudiencePct: targetPct });
    const impact = upgraded.summary.monthly.mid - currentMonthlyMid;
    if (impact > 0) {
      tips.push({
        id: 'audience-geo',
        category: 'revenue',
        title: 'Grow your high-CPM audience',
        detail: `Viewers from US/UK/CA/AU pay 3–5x more per ad impression. Shifting your audience mix from ${highCpmPct}% to ${targetPct}% high-CPM regions would add ${formatUSD(impact)}/mo. Strategies: use English titles and trending US topics, post at 6–9pm EST, and create content around US cultural moments.`,
        impactValue: impact,
        impact: `+${formatUSD(impact)}/mo`,
        scenario: { highCpmAudiencePct: targetPct },
      });
    }
  }

  // Seasonality
  if (!input.seasonalityEnabled) {
    const seasonal = projectEarnings({ ...input, seasonalityEnabled: true });
    const avgImpact = seasonal.totals.mid / 12 - currentMonthlyMid;
    tips.push({
      id: 'seasonality',
      category: 'revenue',
      title: 'Plan for seasonal ad rate changes',
      detail: `YouTube ad rates swing up to 75% throughout the year. Q4 (Oct–Dec) sees CPMs surge 30–40% above average as holiday advertisers compete for placements, while January dips ~20%. Enable seasonality to see exactly when your highest-earning months will be.`,
      impactValue: Math.abs(avgImpact),
      impact: avgImpact > 0 ? `+${formatUSD(avgImpact)}/mo avg` : undefined,
      scenario: { seasonalityEnabled: true },
    });
  }

  // Growth compounding
  if (input.monthlyGrowthRate === 0) {
    const grown = projectEarnings({ ...input, monthlyGrowthRate: 0.05 });
    const month12Views = Math.round(input.dailyViews * Math.pow(1.05, 11));
    const month12Revenue = grown.months[11].revenue.mid;
    const impact = month12Revenue - currentMonthlyMid;
    if (impact > 0) {
      tips.push({
        id: 'growth-compound',
        category: 'revenue',
        title: 'Start compounding growth',
        detail: `Even 5% monthly growth compounds fast. Your ${input.dailyViews.toLocaleString()} daily views would become ${month12Views.toLocaleString()} in 12 months — earning ${formatUSD(month12Revenue)}/mo by year-end instead of ${formatUSD(currentMonthlyMid)}/mo today.`,
        impactValue: impact,
        impact: `${formatUSD(month12Revenue)}/mo by month 12`,
        scenario: { monthlyGrowthRate: 0.05 },
      });
    }
  }

  // ── Strategy tips (contextual, no scenario) ──

  if (!isShorts) {
    tips.push({
      id: 'shorts-funnel',
      category: 'strategy',
      title: 'Use Shorts to grow your audience',
      detail: `Shorts get 10–50x the reach of longform videos with minimal production effort. Top creators use them to funnel subscribers to their longform content where they earn $${niche.rpm.mid.toFixed(2)} RPM — that's ${Math.round(niche.rpm.mid / SHORTS_RPM.mid)}x more per view than Shorts. Even 1–2 Shorts per week can accelerate subscriber growth significantly.`,
    });
  }

  if (isShorts) {
    tips.push({
      id: 'longform-upsell',
      category: 'strategy',
      title: 'Add longform content for higher RPM',
      detail: `Longform ${niche.name} videos earn $${niche.rpm.low.toFixed(2)}–$${niche.rpm.high.toFixed(2)} RPM compared to $${SHORTS_RPM.low.toFixed(2)}–$${SHORTS_RPM.high.toFixed(2)} for Shorts — up to ${Math.round(niche.rpm.high / SHORTS_RPM.mid)}x more per view. Use Shorts to build your subscriber base, then convert those subscribers into longform viewers for dramatically higher ad revenue.`,
    });
  }

  if (input.dailyViews >= 1000) {
    const sponsorshipCpmMid = isShorts
      ? 6
      : niche.id === 'finance'
        ? 50
        : niche.id === 'tech'
          ? 35
          : 20;
    const estViewsPerVideo = input.dailyViews * 7;
    const sponsorPerVideo = (estViewsPerVideo / 1000) * sponsorshipCpmMid * (isShorts ? 0.3 : 1);
    tips.push({
      id: 'sponsorship',
      category: 'strategy',
      title: 'Explore sponsorship deals',
      detail: `At your view count in ${niche.name}, you could charge roughly ${formatUSD(sponsorPerVideo)} per sponsored ${isShorts ? 'Short' : 'video'}. Even 1 sponsored deal per month would add ${currentMonthlyMid > 0 ? Math.round((sponsorPerVideo / currentMonthlyMid) * 100) + '% to' : 'significantly to'} your total income. Check the Sponsorship Rates section above for a detailed estimate.`,
    });
  }

  if (!isShorts && input.dailyViews >= 500) {
    tips.push({
      id: 'diversify',
      category: 'strategy',
      title: 'Diversify your revenue streams',
      detail: `Top ${niche.name} creators earn only 30–40% of their income from YouTube ads. Consider adding channel memberships ($2–$25/mo per member), affiliate links (5–15% commission on recommended products), or digital products like courses and templates. Multiple revenue streams protect against algorithm changes and seasonal dips.`,
    });
  }

  // ── Growth tactics (rotate by niche) ──

  // Determine how many growth tactics to add to fill up to 6 total
  const revenueTips = tips.filter((t) => t.category === 'revenue');
  const strategyTips = tips.filter((t) => t.category === 'strategy');
  const tacticsNeeded = Math.max(1, 6 - revenueTips.length - strategyTips.length);
  const tactics = selectGrowthTactics(input.nicheId, tacticsNeeded);

  // ── Assemble final list ──

  // Sort revenue tips by impact (highest first)
  revenueTips.sort((a, b) => (b.impactValue ?? 0) - (a.impactValue ?? 0));

  return [...revenueTips, ...strategyTips, ...tactics].slice(0, 6);
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

// ─── Milestone Projection ────────────────────────────────────────────────────

export interface MilestoneResult {
  target: number;
  label: string;
  monthIndex: number | null; // null = not reached within projection window
}

const MILESTONE_TARGETS = [
  { target: 100, label: '$100/mo' },
  { target: 500, label: '$500/mo' },
  { target: 1_000, label: '$1K/mo' },
  { target: 5_000, label: '$5K/mo' },
  { target: 10_000, label: '$10K/mo' },
];

export function findMilestoneMonths(input: ProjectionInput, maxMonths = 36): MilestoneResult[] {
  const niche = getNiche(input.nicheId);
  const isShorts = input.contentFormat === 'shorts';
  const baseRpm = isShorts ? SHORTS_RPM : niche.rpm;
  const lengthMultiplier =
    !isShorts && input.videoLength ? VIDEO_LENGTH_MULTIPLIERS[input.videoLength] : 1.0;
  const geoMultiplier =
    input.highCpmAudiencePct != null ? getGeographyMultiplier(input.highCpmAudiencePct) : 1.0;

  const reached = new Map<number, number>();

  for (let i = 0; i < maxMonths; i++) {
    const calMonth = (input.startMonth + i) % 12;
    const growthFactor = Math.pow(1 + input.monthlyGrowthRate, i);
    const projectedDailyViews = Math.round(input.dailyViews * growthFactor);
    const projectedMonthViews = projectedDailyViews * DAYS_IN_MONTH[calMonth];
    const seasonMul = input.seasonalityEnabled ? SEASONALITY_MULTIPLIERS[calMonth] : 1.0;
    const effectiveMidRpm = baseRpm.mid * seasonMul * lengthMultiplier * geoMultiplier;
    const monthlyRevenue = (projectedMonthViews / 1000) * effectiveMidRpm;

    for (const { target } of MILESTONE_TARGETS) {
      if (!reached.has(target) && monthlyRevenue >= target) {
        reached.set(target, i);
      }
    }

    if (reached.size === MILESTONE_TARGETS.length) break;
  }

  return MILESTONE_TARGETS.map(({ target, label }) => ({
    target,
    label,
    monthIndex: reached.get(target) ?? null,
  }));
}

// ─── Utilities (canonical source: ./formatters) ─────────────────────────────

export { formatUSD } from './formatters';
