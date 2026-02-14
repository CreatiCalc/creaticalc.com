'use client';

import type { ReactNode } from 'react';
import AdSlot from '@/components/layout/AdSlot';
import CollapsibleSection from '@/features/calculators/shared/CollapsibleSection';
import EngagementRateDisplay from './EngagementRateDisplay';
import BenchmarkGauge from './BenchmarkGauge';
import EngagementHealthScore from './EngagementHealthScore';
import EngagementShareButtons from './EngagementShareButtons';
import {
  IndustryBenchmarks,
  BrandDealEstimate,
  GrowthRecommendations,
  EngagementBreakdownChart,
  WhatIfScenarios,
  EstimatedReachDisplay,
  CrossPlatformComparison,
  YoYTrendContext,
} from './dynamicImports';
import type {
  Platform,
  IndustryId,
  EngagementInput,
  EngagementResult,
  EngagementRecommendation,
  HealthScore,
} from '@/lib/engagementBenchmarks';
import type { ShareableState } from '@/lib/engagementShareCodec';

interface EngagementResultsSectionProps {
  platform: Platform;
  basePath: string;
  result: EngagementResult;
  input: EngagementInput;
  healthScore: HealthScore;
  tierRange: string;
  shareableState: ShareableState;
  recommendations: EngagementRecommendation[];
  followers: number;
  industryId: IndustryId;
  isEmbed: boolean;
  onApplyScenario: (changes: Partial<EngagementInput>) => void;
  extraSections?: ReactNode;
}

export default function EngagementResultsSection({
  platform,
  basePath,
  result,
  input,
  healthScore,
  tierRange,
  shareableState,
  recommendations,
  followers,
  industryId,
  isEmbed,
  onApplyScenario,
  extraSections,
}: EngagementResultsSectionProps) {
  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <EngagementRateDisplay
          rate={result.engagementRate}
          rating={result.rating}
          ratingLabel={result.ratingLabel}
          tierLabel={result.tierLabel}
          tierRange={tierRange}
          platform={platform}
        />
        <EngagementHealthScore healthScore={healthScore} />
      </div>

      <div className="mt-4">
        <BenchmarkGauge
          rate={result.engagementRate}
          benchmarkLow={result.tierBenchmark.low}
          benchmarkHigh={result.tierBenchmark.high}
          industryAvg={result.industryAvg}
          platform={platform}
        />
      </div>

      {!isEmbed && (
        <>
          <div className="mt-4">
            <EngagementShareButtons
              platform={platform}
              rate={result.engagementRate}
              shareableState={shareableState}
              basePath={basePath}
            />
          </div>

          <AdSlot slot="below-results" className="mt-6" />

          {extraSections}

          <CollapsibleSection title="What If Scenarios" defaultOpen={false} className="mt-6">
            <WhatIfScenarios
              input={input}
              currentRate={result.engagementRate}
              onApply={onApplyScenario}
              platform={platform}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Industry Benchmarks" defaultOpen={false} className="mt-6">
            <IndustryBenchmarks
              platform={platform}
              currentIndustryId={industryId}
              currentRate={result.engagementRate}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="Estimated Brand Deal Rates"
            defaultOpen={false}
            className="mt-6"
          >
            <BrandDealEstimate
              platform={platform}
              followers={followers}
              engagementRate={result.engagementRate}
              industryId={industryId}
              estimate={result.brandDealEstimate}
            />
          </CollapsibleSection>

          <AdSlot slot="after-chart" className="mt-6" />

          <CollapsibleSection title="Estimated Reach" defaultOpen={false} className="mt-6">
            <EstimatedReachDisplay platform={platform} followers={followers} />
          </CollapsibleSection>

          <CollapsibleSection
            title="Cross-Platform Comparison"
            defaultOpen={false}
            className="mt-6"
          >
            <CrossPlatformComparison
              platform={platform}
              rate={result.engagementRate}
              followers={followers}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Year-Over-Year Trends" defaultOpen={false} className="mt-6">
            <YoYTrendContext platform={platform} rate={result.engagementRate} />
          </CollapsibleSection>

          <CollapsibleSection title="Growth Recommendations" defaultOpen={false} className="mt-6">
            <GrowthRecommendations recommendations={recommendations} />
          </CollapsibleSection>

          <CollapsibleSection title="Engagement Breakdown" defaultOpen={false} className="mt-6">
            <EngagementBreakdownChart breakdown={result.breakdown} platform={platform} />
          </CollapsibleSection>
        </>
      )}
    </>
  );
}
