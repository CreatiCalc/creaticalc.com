'use client';

import ShareButtons from '@/components/ui/ShareButtons';
import { useShareUrl } from '@/components/ui/useShareUrl';
import { encodeCalcState } from '@/lib/shareCodec';
import { formatUSD } from '@/lib/youtubeEarningsModel';
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

  const { getShareUrl, embedSlug } = useShareUrl(state, encodeCalcState, basePath);

  const shareText = `I'm a "${tier}" creator projected to make ${formatUSD(yearlyMid)}/year on YouTube! Check your earnings:`;

  return <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={embedSlug} />;
}
