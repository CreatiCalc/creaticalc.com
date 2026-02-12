'use client';

import { useMemo } from 'react';
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
} from '@/features/calculators/engagement-shared';
import {
  INDUSTRIES,
  computeEngagement,
  generateEngagementRecommendations,
  getTierRange,
  type IndustryId,
  type EngagementInput,
} from '@/lib/engagementModel';
import { useInstagramEngagementState } from './useInstagramEngagementState';
import InstagramContentTypeToggle from './InstagramContentTypeToggle';

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
  const { state, dispatch } = useInstagramEngagementState();

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
    }),
    [state]
  );

  const result = useMemo(() => computeEngagement(input), [input]);
  const recommendations = useMemo(
    () => generateEngagementRecommendations(input, result),
    [input, result]
  );
  const tierRange = getTierRange('instagram', state.followers);

  return (
    <>
      <Card>
        <div className="space-y-6">
          <InstagramContentTypeToggle
            value={state.contentType}
            onChange={(type) => dispatch({ type: 'SET_CONTENT_TYPE', payload: type })}
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
        <BenchmarkGauge
          rate={result.engagementRate}
          benchmarkLow={result.tierBenchmark.low}
          benchmarkHigh={result.tierBenchmark.high}
          industryAvg={result.industryAvg}
          platform="instagram"
        />
      </div>

      <AdSlot slot="below-results" className="mt-6" />

      <CollapsibleSection title="Industry Benchmarks" defaultOpen={false} className="mt-6">
        <IndustryBenchmarks
          platform="instagram"
          currentIndustryId={state.industryId}
          currentRate={result.engagementRate}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Estimated Brand Deal Rates" defaultOpen={false} className="mt-6">
        <BrandDealEstimate
          platform="instagram"
          followers={state.followers}
          engagementRate={result.engagementRate}
          industryId={state.industryId}
          estimate={result.brandDealEstimate}
        />
      </CollapsibleSection>

      <AdSlot slot="after-chart" className="mt-6" />

      <CollapsibleSection title="Growth Recommendations" defaultOpen={false} className="mt-6">
        <GrowthRecommendations recommendations={recommendations} />
      </CollapsibleSection>

      <CollapsibleSection title="Engagement Breakdown" defaultOpen={false} className="mt-6">
        <EngagementBreakdownChart breakdown={result.breakdown} platform="instagram" />
      </CollapsibleSection>
    </>
  );
}
