'use client';

import ShareButtons from '@/components/ui/ShareButtons';
import { useShareUrl } from '@/components/ui/useShareUrl';
import type { Platform } from '@/lib/engagementBenchmarks';
import { encodeState, buildShareText, type ShareableState } from '@/lib/engagementShareCodec';

export type { ShareableState } from '@/lib/engagementShareCodec';

interface EngagementShareButtonsProps {
  platform: Platform;
  rate: number;
  shareableState: ShareableState;
  basePath: string;
}

export default function EngagementShareButtons({
  platform,
  rate,
  shareableState,
  basePath,
}: EngagementShareButtonsProps) {
  const { getShareUrl, embedSlug } = useShareUrl(shareableState, encodeState, basePath, 's');

  const shareText = buildShareText(platform, rate);

  return <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={embedSlug} />;
}
