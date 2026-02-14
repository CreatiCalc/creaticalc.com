'use client';

import { useMemo, useEffect } from 'react';
import { useIsEmbed } from '@/lib/embedContext';
import { useSearchParams } from 'next/navigation';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import FollowerPresets from '@/features/calculators/engagement-shared/FollowerPresets';
import EngagementResultsSection from '@/features/calculators/engagement-shared/EngagementResultsSection';
import {
  INDUSTRIES,
  computeEngagement,
  generateEngagementRecommendations,
  getTierRange,
  calculateHealthScore,
  type IndustryId,
  type EngagementInput,
} from '@/lib/engagementModel';
import {
  decodeState,
  facebookStateToShareable,
  shareableToFacebookState,
} from '@/lib/engagementShareCodec';
import { useFacebookEngagementState } from './useFacebookEngagementState';
import CalcMethodToggle from './CalcMethodToggle';

const followerTicks = [
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

const reactionTicks = [
  { value: 10, label: '10' },
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
];

const reachTicks = [
  { value: 100, label: '100' },
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

export default function FacebookEngagementCalculator() {
  const isEmbed = useIsEmbed();
  const { state, dispatch } = useFacebookEngagementState();
  const searchParams = useSearchParams();

  // Restore state from URL on mount
  useEffect(() => {
    const encoded = searchParams.get('s');
    if (encoded) {
      const decoded = decodeState(encoded);
      if (decoded && decoded.p === 'facebook') {
        const restored = shareableToFacebookState(decoded);
        dispatch({
          type: 'RESTORE_STATE',
          payload: { ...restored, industryId: restored.industryId as IndustryId },
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const input: EngagementInput = useMemo(
    () => ({
      platform: 'facebook',
      followers: state.followers,
      avgLikes: state.avgReactions,
      avgComments: state.avgComments,
      avgShares: state.avgShares,
      avgReach: state.avgReach,
      facebookCalcMethod: state.calcMethod,
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
  const healthScore = useMemo(
    () => calculateHealthScore(input, result.engagementRate),
    [input, result.engagementRate]
  );
  const tierRange = getTierRange('facebook', state.followers);

  const shareableState = useMemo(() => facebookStateToShareable(state), [state]);

  const isByReach = state.calcMethod === 'byReach';

  return (
    <>
      <Card>
        <div className="space-y-6">
          <CalcMethodToggle
            value={state.calcMethod}
            onChange={(method) => dispatch({ type: 'SET_CALC_METHOD', payload: method })}
          />

          {/* Follower count */}
          <FollowerPresets
            current={state.followers}
            onSelect={(v) => dispatch({ type: 'SET_FOLLOWERS', payload: v })}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider
              label="Page Followers"
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

          {/* Reach (prominent when byReach mode) */}
          {isByReach && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <Slider
                label="Avg. Post Reach"
                value={state.avgReach}
                min={10}
                max={5_000_000}
                step={10}
                logScale
                ticks={reachTicks}
                onChange={(v) => dispatch({ type: 'SET_AVG_REACH', payload: v })}
                formatValue={(v) => v.toLocaleString()}
              />
            </div>
          )}

          {/* Engagement metrics */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Slider
                label="Avg. Reactions per Post"
                value={state.avgReactions}
                min={1}
                max={500_000}
                step={1}
                logScale
                ticks={reactionTicks}
                onChange={(v) => dispatch({ type: 'SET_AVG_REACTIONS', payload: v })}
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
                label="Avg. Shares per Post"
                value={state.avgShares}
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
                onChange={(v) => dispatch({ type: 'SET_AVG_SHARES', payload: v })}
                formatValue={(v) => v.toLocaleString()}
              />
            </div>
          </div>

          {!isByReach && (
            <div>
              <Slider
                label="Avg. Post Reach"
                value={state.avgReach}
                min={10}
                max={5_000_000}
                step={10}
                logScale
                ticks={reachTicks}
                onChange={(v) => dispatch({ type: 'SET_AVG_REACH', payload: v })}
                formatValue={(v) => v.toLocaleString()}
              />
              <p className="mt-1 text-xs text-muted">
                Used for context — switch to &ldquo;By Post Reach&rdquo; to use this as the
                denominator
              </p>
            </div>
          )}

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
            {isByReach ? (
              <>
                Formula: (Reactions + Comments + Shares) &divide; Reach &times; 100 ={' '}
                <strong>{result.engagementRate.toFixed(2)}%</strong>{' '}
                <span className="text-xs">
                  ({state.avgReactions.toLocaleString()} + {state.avgComments.toLocaleString()} +{' '}
                  {state.avgShares.toLocaleString()}) &divide; {state.avgReach.toLocaleString()}
                </span>
              </>
            ) : (
              <>
                Formula: (Reactions + Comments + Shares) &divide; Followers &times; 100 ={' '}
                <strong>{result.engagementRate.toFixed(2)}%</strong>{' '}
                <span className="text-xs">
                  ({state.avgReactions.toLocaleString()} + {state.avgComments.toLocaleString()} +{' '}
                  {state.avgShares.toLocaleString()}) &divide; {state.followers.toLocaleString()}
                </span>
              </>
            )}
          </p>
        </div>
      </Card>

      <EngagementResultsSection
        platform="facebook"
        basePath="/facebook-engagement-rate-calculator"
        result={result}
        input={input}
        healthScore={healthScore}
        tierRange={tierRange}
        shareableState={shareableState}
        recommendations={recommendations}
        followers={state.followers}
        industryId={state.industryId}
        isEmbed={isEmbed}
        onApplyScenario={(changes) => dispatch({ type: 'APPLY_SCENARIO', payload: changes })}
      />
    </>
  );
}
