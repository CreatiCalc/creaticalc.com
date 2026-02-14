'use client';

import { useMemo, useEffect } from 'react';
import { useIsEmbed } from '@/lib/embedContext';
import { useSearchParams } from 'next/navigation';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import AdSlot from '@/components/layout/AdSlot';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import {
  EngagementRateDisplay,
  BenchmarkGauge,
  IndustryBenchmarks,
  BrandDealEstimate,
  GrowthRecommendations,
  EngagementBreakdownChart,
  FollowerPresets,
  MultiFormulaDisplay,
  EngagementHealthScore,
  WhatIfScenarios,
  EngagementShareButtons,
  EstimatedReachDisplay,
  CrossPlatformComparison,
  YoYTrendContext,
} from '@/features/calculators/engagement-shared';
import {
  INDUSTRIES,
  computeEngagement,
  generateEngagementRecommendations,
  getTierRange,
  calculateMultiFormula,
  calculateHealthScore,
  type IndustryId,
  type InstagramCalcMethod,
  type EngagementInput,
} from '@/lib/engagementModel';
import {
  decodeState,
  instagramStateToShareable,
  shareableToInstagramState,
} from '@/lib/engagementShareCodec';
import { useInstagramEngagementState } from './useInstagramEngagementState';
import InstagramContentTypeToggle from './InstagramContentTypeToggle';
import InstagramCalcMethodToggle from './InstagramCalcMethodToggle';

const followerTicks = [
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

const likeTicks = [
  { value: 10, label: '10' },
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
];

export default function InstagramEngagementCalculator() {
  const isEmbed = useIsEmbed();
  const { state, dispatch } = useInstagramEngagementState();
  const searchParams = useSearchParams();

  // Restore state from URL on mount
  useEffect(() => {
    const encoded = searchParams.get('s');
    if (encoded) {
      const decoded = decodeState(encoded);
      if (decoded && decoded.p === 'instagram') {
        const restored = shareableToInstagramState(decoded);
        dispatch({
          type: 'RESTORE_STATE',
          payload: { ...restored, industryId: restored.industryId as IndustryId },
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const input: EngagementInput = useMemo(
    () => ({
      platform: 'instagram',
      followers: state.followers,
      avgLikes: state.avgLikes,
      avgComments: state.avgComments,
      avgSaves: state.avgSaves,
      contentType: state.contentType,
      industryId: state.industryId,
      postsAnalyzed: state.postsAnalyzed,
      avgReach: state.avgReach,
      avgImpressions: state.avgImpressions,
      instagramCalcMethod: state.instagramCalcMethod,
    }),
    [state]
  );

  const result = useMemo(() => computeEngagement(input), [input]);
  const recommendations = useMemo(
    () => generateEngagementRecommendations(input, result),
    [input, result]
  );
  const multiFormula = useMemo(() => calculateMultiFormula(input), [input]);
  const healthScore = useMemo(
    () => calculateHealthScore(input, result.engagementRate),
    [input, result.engagementRate]
  );
  const tierRange = getTierRange('instagram', state.followers);

  const shareableState = useMemo(() => instagramStateToShareable(state), [state]);

  const showReachInputs = state.instagramCalcMethod !== 'byFollowers';

  return (
    <>
      <Card>
        <div className="space-y-6">
          <InstagramContentTypeToggle
            value={state.contentType}
            onChange={(type) => dispatch({ type: 'SET_CONTENT_TYPE', payload: type })}
          />

          <InstagramCalcMethodToggle
            value={state.instagramCalcMethod}
            onChange={(method) =>
              dispatch({
                type: 'SET_INSTAGRAM_CALC_METHOD',
                payload: method as InstagramCalcMethod,
              })
            }
          />

          {/* Follower count */}
          <FollowerPresets
            current={state.followers}
            onSelect={(v) => dispatch({ type: 'SET_FOLLOWERS', payload: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider
              label="Followers"
              value={state.followers}
              min={100}
              max={5_000_000}
              step={100}
              logScale
              ticks={followerTicks}
              onChange={(v) => dispatch({ type: 'SET_FOLLOWERS', payload: v })}
              formatValue={(v) => v.toLocaleString()}
            />
            <NumberInput
              label="Or enter exact follower count"
              value={state.followers}
              min={0}
              max={5_000_000}
              step={100}
              onChange={(v) =>
                dispatch({ type: 'SET_FOLLOWERS', payload: Math.max(0, Math.min(v, 5_000_000)) })
              }
            />
          </div>

          {/* Optional reach/impressions inputs */}
          {showReachInputs && (
            <div className="grid gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4 sm:grid-cols-2">
              <NumberInput
                label="Avg. Reach per Post"
                value={state.avgReach}
                min={0}
                max={10_000_000}
                step={100}
                onChange={(v) =>
                  dispatch({ type: 'SET_AVG_REACH', payload: Math.max(0, Math.min(v, 10_000_000)) })
                }
              />
              <NumberInput
                label="Avg. Impressions per Post"
                value={state.avgImpressions}
                min={0}
                max={10_000_000}
                step={100}
                onChange={(v) =>
                  dispatch({
                    type: 'SET_AVG_IMPRESSIONS',
                    payload: Math.max(0, Math.min(v, 10_000_000)),
                  })
                }
              />
              <p className="text-xs text-muted sm:col-span-2">
                Find reach and impressions in Instagram Insights for each post.
              </p>
            </div>
          )}

          {/* Engagement metrics */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Slider
                label="Avg. Likes per Post"
                value={state.avgLikes}
                min={1}
                max={500_000}
                step={1}
                logScale
                ticks={likeTicks}
                onChange={(v) => dispatch({ type: 'SET_AVG_LIKES', payload: v })}
                formatValue={(v) => v.toLocaleString()}
              />
            </div>
            <div>
              <Slider
                label="Avg. Comments per Post"
                value={state.avgComments}
                min={0}
                max={50_000}
                step={1}
                logScale
                ticks={[
                  { value: 10, label: '10' },
                  { value: 100, label: '100' },
                  { value: 1000, label: '1K' },
                  { value: 10000, label: '10K' },
                ]}
                onChange={(v) => dispatch({ type: 'SET_AVG_COMMENTS', payload: v })}
                formatValue={(v) => v.toLocaleString()}
              />
            </div>
            <div>
              <Slider
                label="Avg. Saves per Post"
                value={state.avgSaves}
                min={0}
                max={50_000}
                step={1}
                logScale
                ticks={[
                  { value: 10, label: '10' },
                  { value: 100, label: '100' },
                  { value: 1000, label: '1K' },
                  { value: 10000, label: '10K' },
                ]}
                onChange={(v) => dispatch({ type: 'SET_AVG_SAVES', payload: v })}
                formatValue={(v) => v.toLocaleString()}
              />
            </div>
          </div>

          <Select
            label="Content Niche"
            value={state.industryId}
            options={INDUSTRIES}
            onChange={(v) => dispatch({ type: 'SET_INDUSTRY', payload: v as IndustryId })}
          />

          <NumberInput
            label="Number of Posts Analyzed"
            value={state.postsAnalyzed}
            min={1}
            max={100}
            step={1}
            onChange={(v) =>
              dispatch({ type: 'SET_POSTS_ANALYZED', payload: Math.max(1, Math.min(v, 100)) })
            }
          />

          <p className="text-sm text-muted">
            Formula: (Likes + Comments + Saves) &divide; Followers &times; 100 ={' '}
            <strong>{result.engagementRate.toFixed(2)}%</strong>{' '}
            <span className="text-xs">
              ({state.avgLikes.toLocaleString()} + {state.avgComments.toLocaleString()} +{' '}
              {state.avgSaves.toLocaleString()}) &divide; {state.followers.toLocaleString()}
            </span>
          </p>
        </div>
      </Card>

      {/* Results */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <EngagementRateDisplay
          rate={result.engagementRate}
          rating={result.rating}
          ratingLabel={result.ratingLabel}
          tierLabel={result.tierLabel}
          tierRange={tierRange}
          platform="instagram"
        />
        <EngagementHealthScore healthScore={healthScore} />
      </div>

      <div className="mt-4">
        <BenchmarkGauge
          rate={result.engagementRate}
          benchmarkLow={result.tierBenchmark.low}
          benchmarkHigh={result.tierBenchmark.high}
          industryAvg={result.industryAvg}
          platform="instagram"
        />
      </div>

      {!isEmbed && (
        <>
          {/* Share buttons */}
          <div className="mt-4">
            <EngagementShareButtons
              platform="instagram"
              rate={result.engagementRate}
              shareableState={shareableState}
              basePath="/instagram-engagement-rate-calculator"
            />
          </div>

          <AdSlot slot="below-results" className="mt-6" />

          <CollapsibleSection
            title="Engagement Rate by Different Formulas"
            defaultOpen={false}
            className="mt-6"
          >
            <MultiFormulaDisplay results={multiFormula} />
          </CollapsibleSection>

          <CollapsibleSection title="What If Scenarios" defaultOpen={false} className="mt-6">
            <WhatIfScenarios
              input={input}
              currentRate={result.engagementRate}
              onApply={(changes) => dispatch({ type: 'APPLY_SCENARIO', payload: changes })}
              platform="instagram"
            />
          </CollapsibleSection>

          <CollapsibleSection title="Industry Benchmarks" defaultOpen={false} className="mt-6">
            <IndustryBenchmarks
              platform="instagram"
              currentIndustryId={state.industryId}
              currentRate={result.engagementRate}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="Estimated Brand Deal Rates"
            defaultOpen={false}
            className="mt-6"
          >
            <BrandDealEstimate
              platform="instagram"
              followers={state.followers}
              engagementRate={result.engagementRate}
              industryId={state.industryId}
              estimate={result.brandDealEstimate}
            />
          </CollapsibleSection>

          <AdSlot slot="after-chart" className="mt-6" />

          <CollapsibleSection title="Estimated Reach" defaultOpen={false} className="mt-6">
            <EstimatedReachDisplay platform="instagram" followers={state.followers} />
          </CollapsibleSection>

          <CollapsibleSection
            title="Cross-Platform Comparison"
            defaultOpen={false}
            className="mt-6"
          >
            <CrossPlatformComparison
              platform="instagram"
              rate={result.engagementRate}
              followers={state.followers}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Year-Over-Year Trends" defaultOpen={false} className="mt-6">
            <YoYTrendContext platform="instagram" rate={result.engagementRate} />
          </CollapsibleSection>

          <CollapsibleSection title="Growth Recommendations" defaultOpen={false} className="mt-6">
            <GrowthRecommendations recommendations={recommendations} />
          </CollapsibleSection>

          <CollapsibleSection title="Engagement Breakdown" defaultOpen={false} className="mt-6">
            <EngagementBreakdownChart breakdown={result.breakdown} platform="instagram" />
          </CollapsibleSection>
        </>
      )}
    </>
  );
}
