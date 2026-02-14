'use client';

import { useCallback } from 'react';
import ShareButtons from '@/components/ui/ShareButtons';
import { formatUSD } from '@/lib/engagementModel';
import { encodeSponsorshipState, type SponsorshipShareState } from '@/lib/sponsorshipShareCodec';
import { SITE_URL } from '@/lib/siteConfig';

interface TikTokSponsorshipShareButtonsProps {
  state: SponsorshipShareState;
  rateMid: number;
  tierLabel: string;
}

export default function TikTokSponsorshipShareButtons({
  state,
  rateMid,
  tierLabel,
}: TikTokSponsorshipShareButtonsProps) {
  const getShareUrl = useCallback(() => {
    const encoded = encodeSponsorshipState(state);
    return `${SITE_URL}/tiktok-sponsorship-rate-calculator?c=${encoded}`;
  }, [state]);

  const shareText = `As a ${tierLabel} TikTok creator, my estimated sponsorship rate is ${formatUSD(rateMid)}/post! Check yours:`;

  const embedSlug =
    typeof window !== 'undefined' ? window.location.pathname.replace(/^\//, '') : undefined;

  return <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={embedSlug} />;
}
