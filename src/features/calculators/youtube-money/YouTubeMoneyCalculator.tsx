'use client';

import { useMemo } from 'react';
import { useIsEmbed } from '@/lib/embedContext';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import ResultCard from '@/features/calculators/shared/ResultCard';
import ResultCardGrid from '@/features/calculators/shared/ResultCardGrid';
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
import dynamic from 'next/dynamic';
import { useCalculatorState, computeDailyViewsFromPerVideo } from './useCalculatorState';
import ButtonToggle from '@/components/ui/ButtonToggle';

const UrlLookup = dynamic(() => import('./UrlLookup'), { ssr: false });
import type { ContentFormat } from '@/lib/youtubeEarningsModel';
import type { InputMode } from './useCalculatorState';
import GrowthRateInput from './GrowthRateInput';
import SeasonalityToggle from './SeasonalityToggle';
import {
  ProjectionChart,
  Recommendations,
  DriversBreakdown,
  MilestoneTimeline,
  SponsorshipEstimate,
  RpmTable,
} from './dynamicImports';
import YouTubeShareButtons from './ShareButtons';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import ResultsHeading from '@/features/calculators/shared/ResultsHeading';
import PresetPills from '@/components/ui/PresetPills';

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

const viewsPresets = [
  { label: 'Small (1K/day)', value: 1000 },
  { label: 'Growing (10K)', value: 10000 },
  { label: 'Established (100K)', value: 100000 },
  { label: 'Viral (1M)', value: 1000000 },
];

interface YouTubeMoneyCalculatorProps {
  defaultOverrides?: Partial<import('./useCalculatorState').CalculatorState>;
  hideFormatToggle?: boolean;
  hideNicheSelector?: boolean;
}

export default function YouTubeMoneyCalculator({
  defaultOverrides,
  hideFormatToggle,
  hideNicheSelector,
}: YouTubeMoneyCalculatorProps = {}) {
  const isEmbed = useIsEmbed();
  const {
    state,
    setDailyViews,
    setNiche,
    setGrowthRate,
    toggleSeasonality,
    applyScenario,
    setFromLookup,
    setInputMode,
    setViewsPerVideo,
    setUploadsPerWeek,
    setContentFormat,
    setVideoLength,
    setHighCpmAudiencePct,
  } = useCalculatorState(defaultOverrides);

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
      {!isEmbed && (
        <UrlLookup
          onResult={setFromLookup}
          currentDailyViews={effectiveDailyViews}
          isShorts={isShorts}
        />
      )}

      <Card className={isEmbed ? '' : 'mt-4'}>
        <div className="space-y-6">
          <div className={isEmbed ? 'flex flex-wrap gap-6' : 'space-y-6'}>
            {!hideFormatToggle && (
              <ButtonToggle<ContentFormat>
                value={state.contentFormat}
                onChange={setContentFormat}
                options={[
                  { value: 'longform', label: 'Long-form' },
                  { value: 'shorts', label: 'Shorts' },
                ]}
                label="Content Format"
                ariaLabel="Content format"
              />
            )}

            <ButtonToggle<InputMode>
              value={state.inputMode}
              onChange={setInputMode}
              options={[
                { value: 'daily', label: 'Daily Views' },
                { value: 'perVideo', label: 'Per Video' },
              ]}
              label="Input Mode"
              ariaLabel="View input mode"
            />
          </div>

          {state.inputMode === 'daily' ? (
            <div className="space-y-4">
              <PresetPills
                options={viewsPresets}
                value={state.dailyViews}
                onChange={setDailyViews}
                ariaLabel="Daily views presets"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Slider
                  label="Daily Views"
                  value={state.dailyViews}
                  min={100}
                  max={5000000}
                  step={100}
                  logScale
                  ticks={viewsTicks}
                  onChange={setDailyViews}
                  formatValue={(v) => v.toLocaleString()}
                />
                <NumberInput
                  label="Or enter exact views"
                  value={state.dailyViews}
                  min={0}
                  max={5000000}
                  step={1000}
                  onChange={(v) => setDailyViews(Math.max(0, Math.min(v, 5000000)))}
                />
              </div>
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
                  onChange={setViewsPerVideo}
                  formatValue={(v) => v.toLocaleString()}
                />
                <NumberInput
                  label="Uploads Per Week"
                  value={state.uploadsPerWeek}
                  min={1}
                  max={100}
                  step={1}
                  onChange={(v) => setUploadsPerWeek(Math.max(1, Math.min(v, 100)))}
                />
              </div>
              <p className="text-sm text-muted">
                ≈ {effectiveDailyViews.toLocaleString()} daily views
              </p>
            </div>
          )}

          {!hideNicheSelector && (
            <div>
              <Select
                label="Content Niche"
                value={state.nicheId}
                options={nicheOptions}
                onChange={(v) => setNiche(v as NicheId)}
                disabled={isShorts}
              />
              {isShorts && (
                <p className="mt-1 text-xs text-muted">Niche has minimal impact on Shorts RPM</p>
              )}
            </div>
          )}

          {!isShorts && (
            <Select
              label="Video Length"
              value={state.videoLength}
              options={videoLengthOptions}
              onChange={(v) => setVideoLength(v as VideoLength)}
            />
          )}

          <div>
            <Slider
              label="Audience from US/UK/CA/AU"
              value={state.highCpmAudiencePct}
              min={0}
              max={100}
              step={5}
              onChange={setHighCpmAudiencePct}
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

          <GrowthRateInput value={state.monthlyGrowthRate} onChange={setGrowthRate} />

          <SeasonalityToggle enabled={state.seasonalityEnabled} onToggle={toggleSeasonality} />

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

      <ResultsHeading title="Estimated Earnings" subtitle="Based on 2026 CPM/RPM data by niche" />
      <ResultCardGrid labels={['Daily', 'Monthly', 'Yearly']}>
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
      </ResultCardGrid>

      {!isEmbed && (
        <>
          <YouTubeShareButtons
            state={state}
            yearlyMid={projection.summary.yearly.mid}
            tier={creatorTier}
          />

          <AdSlot slot="below-results" className="mt-6" />

          <ProjectionChart months={projection.months} />

          {state.monthlyGrowthRate > 0 && (
            <CollapsibleSection
              title="Revenue Milestones"
              defaultOpen={false}
              className="mt-6"
              preview="When you'll hit $100, $1K, $10K/mo"
            >
              <MilestoneTimeline input={projectionInput} />
            </CollapsibleSection>
          )}

          <CollapsibleSection title="Sponsorship Rates" defaultOpen className="mt-6">
            <SponsorshipEstimate
              dailyViews={effectiveDailyViews}
              nicheId={state.nicheId}
              contentFormat={state.contentFormat}
              viewsPerVideo={state.inputMode === 'perVideo' ? state.viewsPerVideo : undefined}
            />
          </CollapsibleSection>

          <AdSlot slot="after-chart" className="mt-6" />

          <CollapsibleSection title="Optimization Tips" defaultOpen className="mt-6">
            <Recommendations
              state={projectionInput}
              projection={projection}
              onApplyScenario={applyScenario}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="Earnings Breakdown"
            defaultOpen={false}
            className="mt-6"
            preview="CPM, RPM, and niche comparison"
          >
            <DriversBreakdown state={projectionInput} projection={projection} />
            <div className="mt-6">
              <RpmTable activeNicheId={state.nicheId} contentFormat={state.contentFormat} />
            </div>
          </CollapsibleSection>
        </>
      )}
    </>
  );
}
