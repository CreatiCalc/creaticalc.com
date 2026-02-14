'use client';

import { useMemo, useReducer } from 'react';
import { useIsEmbed } from '@/lib/embedContext';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import ShareButtons from '@/components/ui/ShareButtons';
import { useShareUrl } from '@/components/ui/useShareUrl';
import AdSlot from '@/components/layout/AdSlot';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import { FollowerPresets } from '@/features/calculators/engagement-shared';
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
import {
  encodeSponsorshipState,
  decodeSponsorshipState,
  type SponsorshipShareState,
} from '@/lib/sponsorshipShareCodec';
import type { SponsorshipPlatformConfig } from './sponsorshipConfigs';

// ─── State management ────────────────────────────────────────────────────────

interface SponsorshipState {
  followers: number;
  engagementRate: number;
  contentType: SponsorshipContentType;
  dealType: DealType;
  industryId: IndustryId;
  dealsPerMonth: number;
}

type Action =
  | { type: 'SET_FOLLOWERS'; payload: number }
  | { type: 'SET_ENGAGEMENT_RATE'; payload: number }
  | { type: 'SET_CONTENT_TYPE'; payload: SponsorshipContentType }
  | { type: 'SET_DEAL_TYPE'; payload: DealType }
  | { type: 'SET_INDUSTRY'; payload: IndustryId }
  | { type: 'SET_DEALS_PER_MONTH'; payload: number };

function reducer(state: SponsorshipState, action: Action): SponsorshipState {
  switch (action.type) {
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.payload };
    case 'SET_ENGAGEMENT_RATE':
      return { ...state, engagementRate: action.payload };
    case 'SET_CONTENT_TYPE':
      return { ...state, contentType: action.payload };
    case 'SET_DEAL_TYPE':
      return { ...state, dealType: action.payload };
    case 'SET_INDUSTRY':
      return { ...state, industryId: action.payload };
    case 'SET_DEALS_PER_MONTH':
      return { ...state, dealsPerMonth: action.payload };
    default:
      return state;
  }
}

function getInitialState(config: SponsorshipPlatformConfig): SponsorshipState {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('c');
    if (code) {
      const decoded = decodeSponsorshipState(code);
      if (decoded && decoded.platform === config.platform) {
        return {
          followers: decoded.followers,
          engagementRate: decoded.engagementRate,
          contentType: decoded.contentType as SponsorshipContentType,
          dealType: decoded.dealType as DealType,
          industryId: decoded.industryId,
          dealsPerMonth: decoded.dealsPerMonth,
        };
      }
    }
  }
  return {
    followers: config.defaultFollowers,
    engagementRate: config.defaultEngagementRate,
    contentType: config.defaultContentType,
    dealType: config.defaultDealType,
    industryId: config.defaultIndustryId,
    dealsPerMonth: config.defaultDealsPerMonth,
  };
}

// ─── Follower ticks ──────────────────────────────────────────────────────────

const FOLLOWER_TICKS = [
  { value: 1000, label: '1K' },
  { value: 10000, label: '10K' },
  { value: 100000, label: '100K' },
  { value: 1000000, label: '1M' },
];

// ─── Main Component ──────────────────────────────────────────────────────────

interface SponsorshipCalculatorProps {
  config: SponsorshipPlatformConfig;
}

export default function SponsorshipCalculator({ config }: SponsorshipCalculatorProps) {
  const isEmbed = useIsEmbed();
  const [state, dispatch] = useReducer(reducer, config, getInitialState);

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
              ticks={FOLLOWER_TICKS}
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
