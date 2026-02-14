'use client';

import { useCallback } from 'react';
import ShareButtons from '@/components/ui/ShareButtons';
import { formatSubscribers } from '@/lib/subscriberGrowthModel';
import { encodeGrowthState, type GrowthShareState } from '@/lib/growthShareCodec';
import { SITE_URL } from '@/lib/siteConfig';

const BASE_PATH = '/youtube-subscriber-projector';

interface YouTubeGrowthShareButtonsProps {
  state: GrowthShareState;
  projectedSubs: number;
}

export default function YouTubeGrowthShareButtons({
  state,
  projectedSubs,
}: YouTubeGrowthShareButtonsProps) {
  const getShareUrl = useCallback(() => {
    const encoded = encodeGrowthState(state);
    return `${SITE_URL}${BASE_PATH}?c=${encoded}`;
  }, [state]);

  const shareText = `Starting at ${formatSubscribers(state.currentSubs)} subs, I'm projected to hit ${formatSubscribers(projectedSubs)} in 12 months! Check your YouTube growth:`;

  return (
    <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={BASE_PATH.slice(1)} />
  );
}
