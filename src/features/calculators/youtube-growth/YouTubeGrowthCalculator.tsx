'use client';

import { useMemo } from 'react';
import { useIsEmbed } from '@/lib/embedContext';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import ResultCard from '@/features/calculators/shared/ResultCard';
import AdSlot from '@/components/layout/AdSlot';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import ResultsHeading from '@/features/calculators/shared/ResultsHeading';
import {
  GROWTH_NICHES,
  projectGrowth,
  formatSubscribers,
  type GrowthNicheId,
  type GrowthInput,
} from '@/lib/subscriberGrowthModel';
import { useGrowthState } from './useGrowthState';
import ButtonToggle from '@/components/ui/ButtonToggle';
import type { GrowthInputMode } from '@/lib/subscriberGrowthModel';
import YouTubeGrowthShareButtons from './ShareButtons';
import { GrowthChart, GrowthMilestoneTimeline, GrowthRecommendations } from './dynamicImports';
import PresetPills from '@/components/ui/PresetPills';

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
  const isEmbed = useIsEmbed();
  const {
    state,
    setCurrentSubs,
    setInputMode,
    setMonthlyGrowthRate,
    setMonthlyNewSubs,
    setUploadsPerWeek,
    setNiche,
    toggleDeceleration,
  } = useGrowthState();

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
          <ButtonToggle<GrowthInputMode>
            value={state.inputMode}
            onChange={setInputMode}
            options={[
              { value: 'rate', label: 'Growth Rate (%)' },
              { value: 'flat', label: 'Monthly New Subs' },
            ]}
            ariaLabel="Growth input mode"
            variant="pill"
          />

          {/* Current Subscribers */}
          <div className="space-y-4">
            <PresetPills
              options={subsPresets}
              value={state.currentSubs}
              onChange={setCurrentSubs}
              ariaLabel="Subscriber count presets"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Slider
                label="Current Subscribers"
                value={state.currentSubs}
                min={10}
                max={5000000}
                step={10}
                logScale
                ticks={subsTicks}
                onChange={setCurrentSubs}
                formatValue={(v) => v.toLocaleString()}
              />
              <NumberInput
                label="Or enter exact count"
                value={state.currentSubs}
                min={0}
                max={5000000}
                step={100}
                onChange={(v) => setCurrentSubs(Math.max(0, Math.min(v, 5000000)))}
              />
            </div>
          </div>

          {/* Growth Rate or Flat Gain */}
          {state.inputMode === 'rate' ? (
            <div className="space-y-4">
              <PresetPills
                options={growthRatePresets}
                value={state.monthlyGrowthRate}
                onChange={setMonthlyGrowthRate}
                ariaLabel="Growth rate presets"
              />
              <Slider
                label="Monthly Growth Rate"
                value={state.monthlyGrowthRate}
                min={0.005}
                max={0.5}
                step={0.005}
                onChange={setMonthlyGrowthRate}
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
              onChange={(v) => setMonthlyNewSubs(Math.max(1, Math.min(v, 1000000)))}
            />
          )}

          {/* Uploads Per Week */}
          <NumberInput
            label="Uploads Per Week"
            value={state.uploadsPerWeek}
            min={0}
            max={30}
            step={1}
            onChange={(v) => setUploadsPerWeek(Math.max(0, Math.min(v, 30)))}
          />

          {/* Content Niche */}
          <Select
            label="Content Niche"
            value={state.nicheId}
            options={nicheOptions}
            onChange={(v) => setNiche(v as GrowthNicheId)}
          />

          {/* Deceleration Toggle */}
          <div className={state.inputMode === 'flat' ? 'pointer-events-none opacity-50' : ''}>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={state.decelerationEnabled}
                onChange={toggleDeceleration}
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

      <ResultsHeading
        title="Growth Projection"
        subtitle="Model uses niche-adjusted growth curves"
      />
      <div className="grid gap-4 sm:grid-cols-3">
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

      {!isEmbed && (
        <YouTubeGrowthShareButtons state={state} projectedSubs={result.summary.month12} />
      )}

      {!isEmbed && (
        <>
          <AdSlot slot="below-results" className="mt-6" />

          <GrowthChart months={result.months} />

          <CollapsibleSection
            title="Subscriber Milestones"
            defaultOpen={false}
            className="mt-6"
            preview="When you'll hit 1K, 10K, 100K"
          >
            <GrowthMilestoneTimeline milestones={result.milestones} />
          </CollapsibleSection>

          <AdSlot slot="after-chart" className="mt-6" />

          <CollapsibleSection
            title="Growth Tips"
            defaultOpen={false}
            className="mt-6"
            preview="Actionable tips to grow faster"
          >
            <GrowthRecommendations recommendations={result.recommendations} />
          </CollapsibleSection>
        </>
      )}
    </>
  );
}
