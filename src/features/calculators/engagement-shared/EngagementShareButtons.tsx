'use client';

import { useCallback } from 'react';
import ShareButtons from '@/components/ui/ShareButtons';
import type { Platform } from '@/lib/engagementModel';
import { encodeState, buildShareText, type ShareableState } from '@/lib/engagementShareCodec';
import { SITE_URL } from '@/lib/siteConfig';

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
  const getShareUrl = useCallback(() => {
    const encoded = encodeState(shareableState);
    return `${SITE_URL}${basePath}?s=${encoded}`;
  }, [shareableState, basePath]);

  const shareText = buildShareText(platform, rate);

  const embedSlug = basePath.replace(/^\//, '');

  return <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={embedSlug} />;
}
