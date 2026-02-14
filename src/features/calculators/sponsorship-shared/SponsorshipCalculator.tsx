'use client';

import { useMemo } from 'react';
import { useIsEmbed } from '@/lib/embedContext';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import ShareButtons from '@/components/ui/ShareButtons';
import { useShareUrl } from '@/components/ui/useShareUrl';
import AdSlot from '@/components/layout/AdSlot';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import FollowerSliderInput from '@/features/calculators/shared/FollowerSliderInput';
import ContentTypeSelector from './ContentTypeSelector';
import DealTypeSelector from './DealTypeSelector';
import SponsorshipRateDisplay from './SponsorshipRateDisplay';
import RateCardTable from './RateCardTable';
import MonthlyEarningsProjection from './MonthlyEarningsProjection';
import TierContext from './TierContext';
import NegotiationTips from './NegotiationTips';
import EngagementRateInput from './EngagementRateInput';
import { INDUSTRIES, formatUSD, type IndustryId } from '@/lib/engagementModel';
import {
  computeSponsorship,
  getNegotiationTips,
  type DealType,
  type SponsorshipContentType,
} from '@/lib/sponsorshipModel';
import { encodeSponsorshipState, type SponsorshipShareState } from '@/lib/sponsorshipShareCodec';
import type { SponsorshipPlatformConfig } from './sponsorshipConfigs';
import { useSponsorshipState } from './useSponsorshipState';

// ─── Main Component ──────────────────────────────────────────────────────────

interface SponsorshipCalculatorProps {
  config: SponsorshipPlatformConfig;
}

export default function SponsorshipCalculator({ config }: SponsorshipCalculatorProps) {
  const isEmbed = useIsEmbed();
  const { state, dispatch } = useSponsorshipState(config);

  const result = useMemo(
    () =>
      computeSponsorship({
        platform: config.platform,
        followers: state.followers,
        engagementRate: state.engagementRate,
        contentType: state.contentType,
        dealType: state.dealType,
        industryId: state.industryId,
        dealsPerMonth: state.dealsPerMonth,
      }),
    [state, config.platform]
  );

  const tips = useMemo(
    () => getNegotiationTips(result.tier, state.engagementRate, config.platform),
    [result.tier, state.engagementRate, config.platform]
  );

  const shareState = useMemo<SponsorshipShareState>(
    () => ({
      platform: config.platform as 'instagram' | 'tiktok',
      followers: state.followers,
      engagementRate: state.engagementRate,
      contentType: state.contentType,
      dealType: state.dealType,
      industryId: state.industryId,
      dealsPerMonth: state.dealsPerMonth,
    }),
    [state, config.platform]
  );

  const { getShareUrl, embedSlug } = useShareUrl(
    shareState,
    encodeSponsorshipState,
    config.basePath
  );

  const shareText = `As a ${result.tierLabel} ${config.platformLabel} creator, my estimated sponsorship rate is ${formatUSD(result.rate.mid)}/post! Check yours:`;

  return (
    <>
      <Card>
        <div className="space-y-6">
          <ContentTypeSelector
            platform={config.platform}
            value={state.contentType}
            onChange={(v) =>
              dispatch({ type: 'SET_CONTENT_TYPE', payload: v as SponsorshipContentType })
            }
          />

          <DealTypeSelector
            value={state.dealType}
            onChange={(v) => dispatch({ type: 'SET_DEAL_TYPE', payload: v as DealType })}
          />

          <FollowerSliderInput
            value={state.followers}
            onChange={(v) => dispatch({ type: 'SET_FOLLOWERS', payload: v })}
          />

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
          platform={config.platform}
          contentType={state.contentType}
          dealType={state.dealType}
          tierLabel={result.tierLabel}
          followers={state.followers}
          engagementRate={state.engagementRate}
        />
      </div>

      {!isEmbed && (
        <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={embedSlug} />
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
