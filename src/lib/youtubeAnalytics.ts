import {
  NICHES,
  getNiche,
  SHORTS_RPM,
  VIDEO_LENGTH_MULTIPLIERS,
  SEASONALITY_MULTIPLIERS,
  DAYS_IN_MONTH,
  getGeographyMultiplier,
  projectEarnings,
  type ProjectionInput,
  type ProjectionResult,
  type Driver,
} from './youtubeEarningsModel';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface MilestoneResult {
  target: number;
  label: string;
  monthIndex: number | null; // null = not reached within projection window
}

// ─── Driver Analysis ────────────────────────────────────────────────────────

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

// ─── Milestone Projection ───────────────────────────────────────────────────

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
