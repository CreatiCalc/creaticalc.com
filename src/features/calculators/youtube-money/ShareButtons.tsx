'use client';

import { useCallback } from 'react';
import ShareButtons from '@/components/ui/ShareButtons';
import { encodeCalcState } from '@/lib/shareCodec';
import { formatUSD } from '@/lib/youtubeEarningsModel';
import { SITE_URL } from '@/lib/siteConfig';
import type { CalculatorState } from './useCalculatorState';

interface YouTubeShareButtonsProps {
  state: CalculatorState;
  yearlyMid: number;
  tier: string;
}

export default function YouTubeShareButtons({ state, yearlyMid, tier }: YouTubeShareButtonsProps) {
  const basePath =
    state.contentFormat === 'shorts'
      ? '/youtube-shorts-money-calculator'
      : '/youtube-money-calculator';

  const getShareUrl = useCallback(() => {
    const code = encodeCalcState({
      dailyViews: state.dailyViews,
      nicheId: state.nicheId,
      monthlyGrowthRate: state.monthlyGrowthRate,
      seasonalityEnabled: state.seasonalityEnabled,
      inputMode: state.inputMode,
      viewsPerVideo: state.viewsPerVideo,
      uploadsPerWeek: state.uploadsPerWeek,
      contentFormat: state.contentFormat,
      videoLength: state.videoLength,
      highCpmAudiencePct: state.highCpmAudiencePct,
    });
    return `${SITE_URL}${basePath}?c=${code}`;
  }, [
    basePath,
    state.dailyViews,
    state.nicheId,
    state.monthlyGrowthRate,
    state.seasonalityEnabled,
    state.inputMode,
    state.viewsPerVideo,
    state.uploadsPerWeek,
    state.contentFormat,
    state.videoLength,
    state.highCpmAudiencePct,
  ]);

  const shareText = `I'm a "${tier}" creator projected to make ${formatUSD(yearlyMid)}/year on YouTube! Check your earnings:`;

  return (
    <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={basePath.slice(1)} />
  );
}
