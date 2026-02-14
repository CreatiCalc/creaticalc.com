'use client';

import { useCallback } from 'react';
import ShareButtons from '@/components/ui/ShareButtons';
import { encodeCalcState } from '@/lib/shareCodec';
import { formatUSD } from '@/lib/youtubeEarningsModel';
import type { CalculatorState } from './useCalculatorState';

interface YouTubeShareButtonsProps {
  state: CalculatorState;
  yearlyMid: number;
  tier: string;
}

export default function YouTubeShareButtons({ state, yearlyMid, tier }: YouTubeShareButtonsProps) {
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
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set('c', code);
    return url.toString();
  }, [
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

  return <ShareButtons getShareUrl={getShareUrl} shareText={shareText} />;
}
