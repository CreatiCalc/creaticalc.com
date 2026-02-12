'use client';

import { useMemo } from 'react';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import ResultCard from '@/features/calculators/shared/ResultCard';
import AdSlot from '@/components/layout/AdSlot';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import {
  GROWTH_NICHES,
  projectGrowth,
  formatSubscribers,
  type GrowthNicheId,
  type GrowthInput,
} from '@/lib/subscriberGrowthModel';
import { useGrowthState } from './useGrowthState';
import GrowthInputModeToggle from './GrowthInputModeToggle';
import GrowthChart from './GrowthChart';
import GrowthMilestoneTimeline from './GrowthMilestoneTimeline';
import GrowthRecommendations from './GrowthRecommendations';

const nicheOptions = GROWTH_NICHES.map((n) => ({
  label: `${n.name} (~${n.avgMonthlyGrowthPct}%/mo)`,
  value: n.id,
}));

const subsTicks = [
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

const subsPresets = [
  { label: 'Just Starting (100)', value: 100 },
  { label: 'Growing (1K)', value: 1000 },
  { label: 'Established (10K)', value: 10000 },
  { label: 'Large (100K)', value: 100000 },
];

const growthRatePresets = [
  { label: 'Slow (2%)', value: 0.02 },
  { label: 'Average (5%)', value: 0.05 },
  { label: 'Fast (10%)', value: 0.1 },
  { label: 'Viral (20%)', value: 0.2 },
];

export default function YouTubeGrowthCalculator() {
  const { state, dispatch } = useGrowthState();

  const growthInput: GrowthInput = useMemo(
    () => ({
      currentSubs: state.currentSubs,
      inputMode: state.inputMode,
      monthlyGrowthRate: state.monthlyGrowthRate,
      monthlyNewSubs: state.monthlyNewSubs,
      uploadsPerWeek: state.uploadsPerWeek,
      nicheId: state.nicheId,
      decelerationEnabled: state.decelerationEnabled,
    }),
    [state]
  );

  const result = useMemo(() => projectGrowth(growthInput), [growthInput]);

  return (
    <>
      <Card className="mt-4">
        <div className="space-y-6">
          <GrowthInputModeToggle
            value={state.inputMode}
            onChange={(mode) => dispatch({ type: 'SET_INPUT_MODE', payload: mode })}
          />

          {/* Current Subscribers */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {subsPresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => dispatch({ type: 'SET_CURRENT_SUBS', payload: preset.value })}
                  className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                    state.currentSubs === preset.value
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-surface text-muted hover:border-primary hover:text-foreground'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Slider
                label="Current Subscribers"
                value={state.currentSubs}
                min={10}
                max={5000000}
                step={10}
                logScale
                ticks={subsTicks}
                onChange={(v) => dispatch({ type: 'SET_CURRENT_SUBS', payload: v })}
                formatValue={(v) => v.toLocaleString()}
              />
              <NumberInput
                label="Or enter exact count"
                value={state.currentSubs}
                min={0}
                max={5000000}
                step={100}
                onChange={(v) =>
                  dispatch({
                    type: 'SET_CURRENT_SUBS',
                    payload: Math.max(0, Math.min(v, 5000000)),
                  })
                }
              />
            </div>
          </div>

          {/* Growth Rate or Flat Gain */}
          {state.inputMode === 'rate' ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {growthRatePresets.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() =>
                      dispatch({ type: 'SET_MONTHLY_GROWTH_RATE', payload: preset.value })
                    }
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      state.monthlyGrowthRate === preset.value
                        ? 'border-primary bg-primary text-white'
                        : 'border-border bg-surface text-muted hover:border-primary hover:text-foreground'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <Slider
                label="Monthly Growth Rate"
                value={state.monthlyGrowthRate}
                min={0.005}
                max={0.5}
                step={0.005}
                onChange={(v) => dispatch({ type: 'SET_MONTHLY_GROWTH_RATE', payload: v })}
                formatValue={(v) => `${(v * 100).toFixed(1)}%`}
              />
            </div>
          ) : (
            <NumberInput
              label="New Subscribers Per Month"
              value={state.monthlyNewSubs}
              min={1}
              max={1000000}
              step={10}
              onChange={(v) =>
                dispatch({
                  type: 'SET_MONTHLY_NEW_SUBS',
                  payload: Math.max(1, Math.min(v, 1000000)),
                })
              }
            />
          )}

          {/* Uploads Per Week */}
          <NumberInput
            label="Uploads Per Week"
            value={state.uploadsPerWeek}
            min={0}
            max={30}
            step={1}
            onChange={(v) =>
              dispatch({
                type: 'SET_UPLOADS_PER_WEEK',
                payload: Math.max(0, Math.min(v, 30)),
              })
            }
          />

          {/* Content Niche */}
          <Select
            label="Content Niche"
            value={state.nicheId}
            options={nicheOptions}
            onChange={(v) => dispatch({ type: 'SET_NICHE', payload: v as GrowthNicheId })}
          />

          {/* Deceleration Toggle */}
          <div className={state.inputMode === 'flat' ? 'pointer-events-none opacity-50' : ''}>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={state.decelerationEnabled}
                onChange={() => dispatch({ type: 'TOGGLE_DECELERATION' })}
                className="h-4 w-4 accent-primary"
              />
              <div>
                <span className="text-sm font-medium text-foreground">Growth deceleration</span>
                <p className="text-xs text-muted">
                  Larger channels grow slower in percentage terms. Applies diminishing multipliers
                  above 10K subs.
                </p>
              </div>
            </label>
            {state.inputMode === 'flat' && (
              <p className="mt-1 text-xs text-muted">
                Deceleration only applies in growth rate mode
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Result Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Current"
          value={<AnimatedNumber value={result.summary.current} format={formatSubscribers} />}
          comparison="Starting point"
        />
        <ResultCard
          label="12-Month Projection"
          value={<AnimatedNumber value={result.summary.month12} format={formatSubscribers} />}
          comparison={
            <>
              +{formatSubscribers(Math.max(0, result.summary.month12 - result.summary.current))} new
              subs
            </>
          }
          highlight
        />
        <ResultCard
          label="24-Month Projection"
          value={<AnimatedNumber value={result.summary.month24} format={formatSubscribers} />}
          comparison={
            <>
              +{formatSubscribers(Math.max(0, result.summary.month24 - result.summary.current))} new
              subs
            </>
          }
        />
      </div>

      <AdSlot slot="below-results" className="mt-6" />

      <GrowthChart months={result.months} />

      <CollapsibleSection title="Subscriber Milestones" defaultOpen={false} className="mt-6">
        <GrowthMilestoneTimeline milestones={result.milestones} />
      </CollapsibleSection>

      <AdSlot slot="after-chart" className="mt-6" />

      <CollapsibleSection title="Growth Tips" defaultOpen={false} className="mt-6">
        <GrowthRecommendations recommendations={result.recommendations} />
      </CollapsibleSection>
    </>
  );
}
