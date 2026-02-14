'use client';

import ShareButtons from '@/components/ui/ShareButtons';
import { useShareUrl } from '@/components/ui/useShareUrl';
import { formatSubscribers } from '@/lib/subscriberGrowthModel';
import { encodeGrowthState, type GrowthShareState } from '@/lib/growthShareCodec';

interface YouTubeGrowthShareButtonsProps {
  state: GrowthShareState;
  projectedSubs: number;
}

export default function YouTubeGrowthShareButtons({
  state,
  projectedSubs,
}: YouTubeGrowthShareButtonsProps) {
  const { getShareUrl, embedSlug } = useShareUrl(
    state,
    encodeGrowthState,
    '/youtube-subscriber-projector'
  );

  const shareText = `Starting at ${formatSubscribers(state.currentSubs)} subs, I'm projected to hit ${formatSubscribers(projectedSubs)} in 12 months! Check your YouTube growth:`;

  return <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={embedSlug} />;
}
