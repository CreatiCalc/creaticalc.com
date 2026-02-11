'use client';

import { useMemo } from 'react';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import ResultCard from '@/features/calculators/shared/ResultCard';
import AdSlot from '@/components/layout/AdSlot';
import {
  NICHES,
  getNiche,
  projectEarnings,
  formatUSD,
  type NicheId,
  type ProjectionInput,
} from '@/lib/youtubeEarningsModel';
import { useCalculatorState, computeDailyViewsFromPerVideo } from './useCalculatorState';
import UrlLookup from './UrlLookup';
import InputModeToggle from './InputModeToggle';
import GrowthRateInput from './GrowthRateInput';
import SeasonalityToggle from './SeasonalityToggle';
import ProjectionChart from './ProjectionChart';
import Recommendations from './Recommendations';
import DriversBreakdown from './DriversBreakdown';
import RpmTable from './RpmTable';
import ShareButtons from './ShareButtons';

const nicheOptions = NICHES.map((n) => ({ label: n.name, value: n.id }));

const viewsTicks = [
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

const viewsPerVideoTicks = [
  { value: 500, label: '500' },
  { value: 5000, label: '5K' },
  { value: 50000, label: '50K' },
  { value: 500000, label: '500K' },
];

export default function YouTubeMoneyCalculator() {
  const { state, dispatch } = useCalculatorState();

  const effectiveDailyViews = useMemo(
    () =>
      state.inputMode === 'perVideo'
        ? computeDailyViewsFromPerVideo(state.viewsPerVideo, state.uploadsPerWeek)
        : state.dailyViews,
    [state.inputMode, state.viewsPerVideo, state.uploadsPerWeek, state.dailyViews]
  );

  const projectionInput: ProjectionInput = useMemo(
    () => ({
      dailyViews: effectiveDailyViews,
      nicheId: state.nicheId,
      monthlyGrowthRate: state.monthlyGrowthRate,
      seasonalityEnabled: state.seasonalityEnabled,
      startMonth: state.startMonth,
    }),
    [
      effectiveDailyViews,
      state.nicheId,
      state.monthlyGrowthRate,
      state.seasonalityEnabled,
      state.startMonth,
    ]
  );

  const projection = useMemo(() => projectEarnings(projectionInput), [projectionInput]);
  const niche = getNiche(state.nicheId);

  return (
    <>
      <UrlLookup
        onResult={(data) => dispatch({ type: 'SET_FROM_LOOKUP', payload: data })}
        currentDailyViews={effectiveDailyViews}
      />

      <Card className="mt-4">
        <div className="space-y-6">
          <InputModeToggle
            value={state.inputMode}
            onChange={(mode) => dispatch({ type: 'SET_INPUT_MODE', payload: mode })}
          />

          {state.inputMode === 'daily' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Slider
                label="Daily Views"
                value={state.dailyViews}
                min={100}
                max={5000000}
                step={100}
                logScale
                ticks={viewsTicks}
                onChange={(v) => dispatch({ type: 'SET_DAILY_VIEWS', payload: v })}
                formatValue={(v) => v.toLocaleString()}
              />
              <NumberInput
                label="Or enter exact views"
                value={state.dailyViews}
                min={0}
                max={5000000}
                step={1000}
                onChange={(v) =>
                  dispatch({
                    type: 'SET_DAILY_VIEWS',
                    payload: Math.max(0, Math.min(v, 5000000)),
                  })
                }
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Slider
                  label="Views Per Video"
                  value={state.viewsPerVideo}
                  min={100}
                  max={5000000}
                  step={100}
                  logScale
                  ticks={viewsPerVideoTicks}
                  onChange={(v) => dispatch({ type: 'SET_VIEWS_PER_VIDEO', payload: v })}
                  formatValue={(v) => v.toLocaleString()}
                />
                <NumberInput
                  label="Uploads Per Week"
                  value={state.uploadsPerWeek}
                  min={1}
                  max={100}
                  step={1}
                  onChange={(v) =>
                    dispatch({
                      type: 'SET_UPLOADS_PER_WEEK',
                      payload: Math.max(1, Math.min(v, 100)),
                    })
                  }
                />
              </div>
              <p className="text-sm text-muted">
                ≈ {effectiveDailyViews.toLocaleString()} daily views
              </p>
            </div>
          )}

          <Select
            label="Content Niche"
            value={state.nicheId}
            options={nicheOptions}
            onChange={(v) => dispatch({ type: 'SET_NICHE', payload: v as NicheId })}
          />

          <GrowthRateInput
            value={state.monthlyGrowthRate}
            onChange={(rate) => dispatch({ type: 'SET_GROWTH_RATE', payload: rate })}
          />

          <SeasonalityToggle
            enabled={state.seasonalityEnabled}
            onToggle={() => dispatch({ type: 'TOGGLE_SEASONALITY' })}
          />

          <p className="text-sm text-muted">
            RPM for {niche.name}: ${niche.rpm.low.toFixed(2)} &ndash; ${niche.rpm.high.toFixed(2)}{' '}
            <span className="text-xs">
              (CPM: ${niche.cpm.low} &ndash; ${niche.cpm.high})
            </span>
          </p>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Daily Earnings"
          value={`${formatUSD(projection.summary.daily.low)} — ${formatUSD(projection.summary.daily.high)}`}
          comparison={`Mid estimate: ${formatUSD(projection.summary.daily.mid)}/day`}
        />
        <ResultCard
          label="Monthly Earnings"
          value={`${formatUSD(projection.summary.monthly.low)} — ${formatUSD(projection.summary.monthly.high)}`}
          comparison={`Mid estimate: ${formatUSD(projection.summary.monthly.mid)}/month`}
          highlight
        />
        <ResultCard
          label="Yearly Earnings"
          value={`${formatUSD(projection.summary.yearly.low)} — ${formatUSD(projection.summary.yearly.high)}`}
          comparison={`Mid estimate: ${formatUSD(projection.summary.yearly.mid)}/year`}
        />
      </div>

      <ShareButtons state={state} yearlyMid={projection.summary.yearly.mid} />

      <AdSlot slot="below-results" className="mt-6" />

      <ProjectionChart months={projection.months} />

      <AdSlot slot="after-chart" className="mt-6" />

      <Recommendations
        state={{ ...projectionInput, revenueTarget: state.revenueTarget }}
        projection={projection}
        onApplyScenario={(scenario) => dispatch({ type: 'APPLY_SCENARIO', payload: scenario })}
        onRevenueTargetChange={(target) =>
          dispatch({ type: 'SET_REVENUE_TARGET', payload: target })
        }
      />

      <DriversBreakdown state={projectionInput} projection={projection} />

      <RpmTable activeNicheId={state.nicheId} />
    </>
  );
}
