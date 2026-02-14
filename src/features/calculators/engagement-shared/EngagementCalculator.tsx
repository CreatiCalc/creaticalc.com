'use client';

import { useMemo, useEffect } from 'react';
import { useIsEmbed } from '@/lib/embedContext';
import { useSearchParams } from 'next/navigation';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import CalcMethodToggle from '@/features/calculators/shared/CalcMethodToggle';
import FollowerSliderInput from '@/features/calculators/shared/FollowerSliderInput';
import EngagementResultsSection from './EngagementResultsSection';
import { MultiFormulaDisplay } from './dynamicImports';
import {
  INDUSTRIES,
  computeEngagement,
  generateEngagementRecommendations,
  getTierRange,
  calculateMultiFormula,
  calculateHealthScore,
  type IndustryId,
  type InstagramContentType,
} from '@/lib/engagementModel';
import { decodeState, inputToShareable, shareableToInput } from '@/lib/engagementShareCodec';
import type { EngagementPlatformConfig, MetricDef, AltMetricDef } from './platformConfigs';
import { useEngagementState } from './useEngagementState';

// ─── Content Type Toggle (Instagram-only) ────────────────────────────────────

const CONTENT_TYPE_OPTIONS: { mode: InstagramContentType; label: string }[] = [
  { mode: 'mixed', label: 'Mixed' },
  { mode: 'feed', label: 'Feed Posts' },
  { mode: 'reels', label: 'Reels' },
  { mode: 'stories', label: 'Stories' },
];

function ContentTypeToggle({
  value,
  onChange,
}: {
  value: InstagramContentType;
  onChange: (v: InstagramContentType) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Content Type</label>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Content type">
        {CONTENT_TYPE_OPTIONS.map(({ mode, label }) => (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={value === mode}
            onClick={() => onChange(mode)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              value === mode
                ? 'bg-primary text-white'
                : 'border border-border bg-background text-foreground hover:border-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Formula display ─────────────────────────────────────────────────────────

function FormulaDisplay({
  config,
  state,
  rate,
}: {
  config: EngagementPlatformConfig;
  state: Record<string, unknown>;
  rate: number;
}) {
  const metricLabels = config.metrics.map((m) => m.formulaLabel);
  const metricValues = config.metrics.map((m) =>
    ((state[m.inputKey] as number) ?? 0).toLocaleString()
  );

  // Determine the denominator based on the active calc method
  const activeMethod = String(state[config.calcMethodInputKey] ?? 'byFollowers');
  const activeAlt = config.altMetrics.find((a) => a.activeForMethod === activeMethod);

  let denominatorLabel = 'Followers';
  let denominatorValue = ((state.followers as number) ?? 0).toLocaleString();

  if (activeAlt) {
    denominatorLabel = activeAlt.formulaLabel;
    denominatorValue = ((state[activeAlt.inputKey] as number) ?? 0).toLocaleString();
  }

  return (
    <p className="text-sm text-muted">
      Formula: ({metricLabels.join(' + ')}) &divide; {denominatorLabel} &times; 100 ={' '}
      <strong>{rate.toFixed(2)}%</strong>{' '}
      <span className="text-xs">
        ({metricValues.join(' + ')}) &divide; {denominatorValue}
      </span>
    </p>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface EngagementCalculatorProps {
  config: EngagementPlatformConfig;
}

export default function EngagementCalculator({ config }: EngagementCalculatorProps) {
  const isEmbed = useIsEmbed();
  const { state, setField, applyScenario, restoreState } = useEngagementState(config);
  const searchParams = useSearchParams();

  // Restore state from URL on mount
  useEffect(() => {
    const encoded = searchParams.get('s');
    if (encoded) {
      const decoded = decodeState(encoded);
      if (decoded && decoded.p === config.platform) {
        restoreState(shareableToInput(decoded));
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(() => computeEngagement(state), [state]);
  const recommendations = useMemo(
    () => generateEngagementRecommendations(state, result),
    [state, result]
  );
  const healthScore = useMemo(
    () => calculateHealthScore(state, result.engagementRate),
    [state, result.engagementRate]
  );
  const tierRange = getTierRange(config.platform, state.followers);
  const shareableState = useMemo(() => inputToShareable(state), [state]);

  const multiFormula = useMemo(
    () => (config.hasMultiFormula ? calculateMultiFormula(state) : null),
    [state, config.hasMultiFormula]
  );

  // Access state fields dynamically via a helper that avoids TS strict-cast issues
  const get = (key: string): unknown => (state as unknown as Record<string, unknown>)[key];

  const activeMethod = String(get(config.calcMethodInputKey) ?? 'byFollowers');

  // Map calc methods to the CalcMethodToggle format
  const calcMethodOptions = config.calcMethods.map((m) => ({
    mode: m.value,
    label: m.label,
    description: m.description ?? '',
  }));

  const stateRec = state as unknown as Record<string, unknown>;

  return (
    <>
      <Card>
        <div className="space-y-6">
          {/* Content type toggle (Instagram only) */}
          {config.hasContentType && (
            <ContentTypeToggle
              value={(state.contentType ?? 'mixed') as InstagramContentType}
              onChange={(v) => setField('contentType', v)}
            />
          )}

          {/* Calc method toggle */}
          {config.calcMethods.length > 1 && (
            <CalcMethodToggle
              value={activeMethod}
              onChange={(method) => setField(config.calcMethodInputKey, method)}
              options={calcMethodOptions}
              wrap={config.calcMethodWrap}
            />
          )}

          {/* Follower presets + slider */}
          <FollowerSliderInput
            value={state.followers}
            onChange={(v) => setField('followers', v)}
            max={config.followerSliderMax}
            label={config.followerLabel}
          />

          {/* Alt metrics — grouped mode (Instagram: reach + impressions in one box) */}
          {config.altMetricGrouped &&
            renderGroupedAltMetrics(config, stateRec, activeMethod, setField)}

          {/* Alt metrics — individual, prominent when active method */}
          {!config.altMetricGrouped &&
            config.altMetricAlwaysVisible &&
            config.altMetrics.map((alt) =>
              activeMethod === alt.activeForMethod
                ? renderProminentAltMetric(alt, stateRec, setField)
                : null
            )}

          {/* Main engagement metrics */}
          <div className={`grid gap-4 ${config.metricsGridCols}`}>
            {config.metrics.map((m) => renderMetricSlider(m, stateRec, setField))}
          </div>

          {/* Alt metrics — individual, secondary position when not active */}
          {!config.altMetricGrouped &&
            config.altMetricAlwaysVisible &&
            config.altMetrics.map((alt) =>
              activeMethod !== alt.activeForMethod
                ? renderSecondaryAltMetric(alt, stateRec, setField, config.altMetricSecondaryHint)
                : null
            )}

          {/* Industry selector */}
          <Select
            label="Content Niche"
            value={state.industryId}
            options={INDUSTRIES}
            onChange={(v) => setField('industryId', v as IndustryId)}
          />

          {/* Posts analyzed */}
          <NumberInput
            label={`Number of ${config.contentTerm} Analyzed`}
            value={state.postsAnalyzed}
            min={1}
            max={100}
            step={1}
            onChange={(v) => setField('postsAnalyzed', Math.max(1, Math.min(v, 100)))}
          />

          {/* Formula display */}
          <FormulaDisplay config={config} state={stateRec} rate={result.engagementRate} />
        </div>
      </Card>

      <EngagementResultsSection
        platform={config.platform}
        basePath={config.basePath}
        result={result}
        input={state}
        healthScore={healthScore}
        tierRange={tierRange}
        shareableState={shareableState}
        recommendations={recommendations}
        followers={state.followers}
        industryId={state.industryId}
        isEmbed={isEmbed}
        onApplyScenario={applyScenario}
        extraSections={
          multiFormula ? (
            <CollapsibleSection
              title="Engagement Rate by Different Formulas"
              defaultOpen={false}
              className="mt-6"
            >
              <MultiFormulaDisplay results={multiFormula} />
            </CollapsibleSection>
          ) : undefined
        }
      />
    </>
  );
}

// ─── Render helpers ──────────────────────────────────────────────────────────

function renderMetricSlider(
  m: MetricDef,
  state: Record<string, unknown>,
  setField: (field: keyof import('@/lib/engagementModel').EngagementInput, value: number) => void
) {
  return (
    <div key={m.inputKey}>
      <Slider
        label={m.label}
        value={(state[m.inputKey] as number) ?? m.defaultValue}
        min={m.sliderMin}
        max={m.sliderMax}
        step={m.step}
        logScale
        ticks={m.ticks}
        onChange={(v) => setField(m.inputKey, v)}
        formatValue={(v) => v.toLocaleString()}
      />
    </div>
  );
}

function renderProminentAltMetric(
  alt: AltMetricDef,
  state: Record<string, unknown>,
  setField: (field: keyof import('@/lib/engagementModel').EngagementInput, value: number) => void
) {
  return (
    <div
      key={`${alt.inputKey}-prominent`}
      className="rounded-lg border border-primary/20 bg-primary/5 p-4"
    >
      <Slider
        label={alt.label}
        value={(state[alt.inputKey] as number) ?? alt.defaultValue}
        min={alt.min}
        max={alt.max}
        step={alt.step}
        logScale
        ticks={alt.ticks}
        onChange={(v) => setField(alt.inputKey, v)}
        formatValue={(v) => v.toLocaleString()}
      />
    </div>
  );
}

function renderSecondaryAltMetric(
  alt: AltMetricDef,
  state: Record<string, unknown>,
  setField: (field: keyof import('@/lib/engagementModel').EngagementInput, value: number) => void,
  hint?: string
) {
  return (
    <div key={`${alt.inputKey}-secondary`}>
      <Slider
        label={alt.label}
        value={(state[alt.inputKey] as number) ?? alt.defaultValue}
        min={alt.min}
        max={alt.max}
        step={alt.step}
        logScale
        ticks={alt.ticks}
        onChange={(v) => setField(alt.inputKey, v)}
        formatValue={(v) => v.toLocaleString()}
      />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}

function renderGroupedAltMetrics(
  config: EngagementPlatformConfig,
  state: Record<string, unknown>,
  activeMethod: string,
  setField: (field: keyof import('@/lib/engagementModel').EngagementInput, value: number) => void
) {
  const showGroup = activeMethod !== 'byFollowers';
  if (!showGroup) return null;

  return (
    <div className="grid gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4 sm:grid-cols-2">
      {config.altMetrics.map((alt) => (
        <NumberInput
          key={alt.inputKey}
          label={alt.label}
          value={(state[alt.inputKey] as number) ?? alt.defaultValue}
          min={alt.min}
          max={alt.max}
          step={alt.step}
          onChange={(v) => setField(alt.inputKey, Math.max(alt.min, Math.min(v, alt.max)))}
        />
      ))}
      {config.altMetricGroupHint && (
        <p className="text-xs text-muted sm:col-span-2">{config.altMetricGroupHint}</p>
      )}
    </div>
  );
}
