'use client';

import ShareButtons from '@/components/ui/ShareButtons';
import { useShareUrl } from '@/components/ui/useShareUrl';
import { formatUSD } from '@/lib/engagementModel';
import { encodeSponsorshipState, type SponsorshipShareState } from '@/lib/sponsorshipShareCodec';

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
  const { getShareUrl, embedSlug } = useShareUrl(
    state,
    encodeSponsorshipState,
    '/tiktok-sponsorship-rate-calculator'
  );

  const shareText = `As a ${tierLabel} TikTok creator, my estimated sponsorship rate is ${formatUSD(rateMid)}/post! Check yours:`;

  return <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={embedSlug} />;
}
