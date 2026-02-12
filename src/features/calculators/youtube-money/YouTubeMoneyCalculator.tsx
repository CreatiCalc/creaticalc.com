'use client';

import { useMemo } from 'react';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import ResultCard from '@/features/calculators/shared/ResultCard';
import AdSlot from '@/components/layout/AdSlot';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import {
  NICHES,
  SHORTS_RPM,
  VIDEO_LENGTH_MULTIPLIERS,
  getNiche,
  getGeographyMultiplier,
  projectEarnings,
  formatUSD,
  type NicheId,
  type VideoLength,
  type ProjectionInput,
} from '@/lib/youtubeEarningsModel';
import { useCalculatorState, computeDailyViewsFromPerVideo } from './useCalculatorState';
import UrlLookup from './UrlLookup';
import ContentFormatToggle from './ContentFormatToggle';
import InputModeToggle from './InputModeToggle';
import GrowthRateInput from './GrowthRateInput';
import SeasonalityToggle from './SeasonalityToggle';
import ProjectionChart from './ProjectionChart';
import Recommendations from './Recommendations';
import DriversBreakdown from './DriversBreakdown';
import MilestoneTimeline from './MilestoneTimeline';
import RpmTable from './RpmTable';
import ShareButtons from './ShareButtons';

const nicheOptions = NICHES.map((n) => ({ label: n.name, value: n.id }));

const videoLengthOptions = [
  { label: 'Short (< 8 min) — no mid-roll ads', value: 'short' },
  { label: 'Standard (8–20 min)', value: 'standard' },
  { label: 'Long (20+ min) — more mid-roll ads', value: 'long' },
];

function getCreatorTier(monthlyMid: number): string {
  if (monthlyMid >= 10_000) return 'Top Creator';
  if (monthlyMid >= 2_000) return 'Full-Time';
  if (monthlyMid >= 500) return 'Part-Time';
  if (monthlyMid >= 100) return 'Side Income';
  return 'Hobby';
}

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

  const isShorts = state.contentFormat === 'shorts';

  const projectionInput: ProjectionInput = useMemo(
    () => ({
      dailyViews: effectiveDailyViews,
      nicheId: state.nicheId,
      monthlyGrowthRate: state.monthlyGrowthRate,
      seasonalityEnabled: state.seasonalityEnabled,
      startMonth: state.startMonth,
      contentFormat: state.contentFormat,
      videoLength: state.videoLength,
      highCpmAudiencePct: state.highCpmAudiencePct,
    }),
    [
      effectiveDailyViews,
      state.nicheId,
      state.monthlyGrowthRate,
      state.seasonalityEnabled,
      state.startMonth,
      state.contentFormat,
      state.videoLength,
      state.highCpmAudiencePct,
    ]
  );

  const projection = useMemo(() => projectEarnings(projectionInput), [projectionInput]);
  const niche = getNiche(state.nicheId);
  const creatorTier = getCreatorTier(projection.summary.monthly.mid);

  return (
    <>
      <UrlLookup
        onResult={(data) => dispatch({ type: 'SET_FROM_LOOKUP', payload: data })}
        currentDailyViews={effectiveDailyViews}
      />

      <Card className="mt-4">
        <div className="space-y-6">
          <ContentFormatToggle
            value={state.contentFormat}
            onChange={(format) => dispatch({ type: 'SET_CONTENT_FORMAT', payload: format })}
          />

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

          <div className={isShorts ? 'opacity-50 pointer-events-none' : ''}>
            <Select
              label="Content Niche"
              value={state.nicheId}
              options={nicheOptions}
              onChange={(v) => dispatch({ type: 'SET_NICHE', payload: v as NicheId })}
            />
            {isShorts && (
              <p className="mt-1 text-xs text-muted">Niche has minimal impact on Shorts RPM</p>
            )}
          </div>

          {!isShorts && (
            <Select
              label="Video Length"
              value={state.videoLength}
              options={videoLengthOptions}
              onChange={(v) => dispatch({ type: 'SET_VIDEO_LENGTH', payload: v as VideoLength })}
            />
          )}

          <div>
            <Slider
              label="Audience from US/UK/CA/AU"
              value={state.highCpmAudiencePct}
              min={0}
              max={100}
              step={5}
              onChange={(v) => dispatch({ type: 'SET_HIGH_CPM_AUDIENCE_PCT', payload: v })}
              formatValue={(v) => `${v}%`}
            />
            <p className="mt-1 text-xs text-muted">
              High-CPM regions pay 3&ndash;5&times; more per view.{' '}
              {state.highCpmAudiencePct !== 50 && (
                <span>
                  Geography adjustment:{' '}
                  {getGeographyMultiplier(state.highCpmAudiencePct).toFixed(2)}
                  &times;
                </span>
              )}
            </p>
          </div>

          <GrowthRateInput
            value={state.monthlyGrowthRate}
            onChange={(rate) => dispatch({ type: 'SET_GROWTH_RATE', payload: rate })}
          />

          <SeasonalityToggle
            enabled={state.seasonalityEnabled}
            onToggle={() => dispatch({ type: 'TOGGLE_SEASONALITY' })}
          />

          {isShorts ? (
            <p className="text-sm text-muted">
              Shorts RPM: ${SHORTS_RPM.low.toFixed(2)} &ndash; ${SHORTS_RPM.high.toFixed(2)} per
              1,000 views
            </p>
          ) : (
            <p className="text-sm text-muted">
              RPM for {niche.name}: ${niche.rpm.low.toFixed(2)} &ndash; ${niche.rpm.high.toFixed(2)}{' '}
              <span className="text-xs">
                (CPM: ${niche.cpm.low} &ndash; ${niche.cpm.high})
              </span>
              {state.videoLength !== 'standard' && (
                <span className="text-xs">
                  {' '}
                  &times; {VIDEO_LENGTH_MULTIPLIERS[state.videoLength]}x {state.videoLength} video
                  adjustment
                </span>
              )}
              {state.highCpmAudiencePct !== 50 && (
                <span className="text-xs">
                  {' '}
                  &times; {getGeographyMultiplier(state.highCpmAudiencePct).toFixed(2)}x geography
                  adjustment
                </span>
              )}
            </p>
          )}
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Daily Earnings"
          value={
            <>
              <AnimatedNumber value={projection.summary.daily.low} format={formatUSD} /> &mdash;{' '}
              <AnimatedNumber value={projection.summary.daily.high} format={formatUSD} />
            </>
          }
          comparison={
            <>
              Mid estimate:{' '}
              <AnimatedNumber value={projection.summary.daily.mid} format={formatUSD} />
              /day
            </>
          }
        />
        <ResultCard
          label="Monthly Earnings"
          value={
            <>
              <AnimatedNumber value={projection.summary.monthly.low} format={formatUSD} /> &mdash;{' '}
              <AnimatedNumber value={projection.summary.monthly.high} format={formatUSD} />
            </>
          }
          comparison={
            <>
              Mid estimate:{' '}
              <AnimatedNumber value={projection.summary.monthly.mid} format={formatUSD} />
              /month
            </>
          }
          highlight
          badge={creatorTier}
        />
        <ResultCard
          label="Yearly Earnings"
          value={
            <>
              <AnimatedNumber value={projection.summary.yearly.low} format={formatUSD} /> &mdash;{' '}
              <AnimatedNumber value={projection.summary.yearly.high} format={formatUSD} />
            </>
          }
          comparison={
            <>
              Mid estimate:{' '}
              <AnimatedNumber value={projection.summary.yearly.mid} format={formatUSD} />
              /year
            </>
          }
        />
      </div>

      <ShareButtons state={state} yearlyMid={projection.summary.yearly.mid} tier={creatorTier} />

      <AdSlot slot="below-results" className="mt-6" />

      <ProjectionChart months={projection.months} />

      <MilestoneTimeline input={projectionInput} />

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

      <RpmTable activeNicheId={state.nicheId} contentFormat={state.contentFormat} />
    </>
  );
}
