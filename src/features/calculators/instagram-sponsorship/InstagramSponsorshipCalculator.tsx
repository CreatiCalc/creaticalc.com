'use client';

import { useMemo } from 'react';
import { useIsEmbed } from '@/lib/embedContext';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import AdSlot from '@/components/layout/AdSlot';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import { FollowerPresets } from '@/features/calculators/engagement-shared';
import {
  ContentTypeSelector,
  DealTypeSelector,
  SponsorshipRateDisplay,
  RateCardTable,
  MonthlyEarningsProjection,
  TierContext,
  NegotiationTips,
  EngagementRateInput,
} from '@/features/calculators/sponsorship-shared';
import { INDUSTRIES, type IndustryId } from '@/lib/engagementModel';
import {
  computeSponsorship,
  getNegotiationTips,
  type InstagramContentType,
  type DealType,
  type SponsorshipContentType,
} from '@/lib/sponsorshipModel';
import { useInstagramSponsorshipState } from './useInstagramSponsorshipState';
import InstagramSponsorshipShareButtons from './ShareButtons';

const followerTicks = [
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

export default function InstagramSponsorshipCalculator() {
  const isEmbed = useIsEmbed();
  const { state, dispatch } = useInstagramSponsorshipState();

  const result = useMemo(
    () =>
      computeSponsorship({
        platform: 'instagram',
        followers: state.followers,
        engagementRate: state.engagementRate,
        contentType: state.contentType,
        dealType: state.dealType,
        industryId: state.industryId,
        dealsPerMonth: state.dealsPerMonth,
      }),
    [state]
  );

  const tips = useMemo(
    () => getNegotiationTips(result.tier, state.engagementRate, 'instagram'),
    [result.tier, state.engagementRate]
  );

  return (
    <>
      <Card>
        <div className="space-y-6">
          <ContentTypeSelector
            platform="instagram"
            value={state.contentType}
            onChange={(v) =>
              dispatch({ type: 'SET_CONTENT_TYPE', payload: v as InstagramContentType })
            }
          />

          <DealTypeSelector
            value={state.dealType}
            onChange={(v) => dispatch({ type: 'SET_DEAL_TYPE', payload: v as DealType })}
          />

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

          <EngagementRateInput
            engagementRate={state.engagementRate}
            followers={state.followers}
            onEngagementRateChange={(v) => dispatch({ type: 'SET_ENGAGEMENT_RATE', payload: v })}
          />

          <Select
            label="Content Niche"
            value={state.industryId}
            options={INDUSTRIES}
            onChange={(v) => dispatch({ type: 'SET_INDUSTRY', payload: v as IndustryId })}
          />
        </div>
      </Card>

      {/* Primary result */}
      <div className="mt-6">
        <SponsorshipRateDisplay
          rate={result.rate}
          platform="instagram"
          contentType={state.contentType}
          dealType={state.dealType}
          tierLabel={result.tierLabel}
          followers={state.followers}
          engagementRate={state.engagementRate}
        />
      </div>

      {!isEmbed && (
        <InstagramSponsorshipShareButtons
          state={{
            platform: 'instagram',
            followers: state.followers,
            engagementRate: state.engagementRate,
            contentType: state.contentType,
            dealType: state.dealType,
            industryId: state.industryId,
            dealsPerMonth: state.dealsPerMonth,
          }}
          rateMid={result.rate.mid}
          tierLabel={result.tierLabel}
        />
      )}

      {!isEmbed && (
        <>
          <AdSlot slot="below-results" className="mt-6" />

          <CollapsibleSection title="Full Rate Card" defaultOpen={false} className="mt-6">
            <RateCardTable
              rateCard={result.rateCard}
              activeContentType={state.contentType as SponsorshipContentType}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="Monthly Earnings Projection"
            defaultOpen={false}
            className="mt-6"
          >
            <MonthlyEarningsProjection
              rate={result.rate}
              dealsPerMonth={state.dealsPerMonth}
              onDealsChange={(v) => dispatch({ type: 'SET_DEALS_PER_MONTH', payload: v })}
            />
          </CollapsibleSection>

          <AdSlot slot="after-chart" className="mt-6" />

          <CollapsibleSection title="Influencer Tier Context" defaultOpen={false} className="mt-6">
            <TierContext
              currentTier={result.tier}
              tierLabel={result.tierLabel}
              tierRates={result.tierRates}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Negotiation Tips" defaultOpen={false} className="mt-6">
            <NegotiationTips tips={tips} />
          </CollapsibleSection>
        </>
      )}
    </>
  );
}
