'use client';

import ShareButtons from '@/components/ui/ShareButtons';
import { useShareUrl } from '@/components/ui/useShareUrl';
import { formatUSD } from '@/lib/engagementModel';
import { encodeSponsorshipState, type SponsorshipShareState } from '@/lib/sponsorshipShareCodec';

interface InstagramSponsorshipShareButtonsProps {
  state: SponsorshipShareState;
  rateMid: number;
  tierLabel: string;
}

export default function InstagramSponsorshipShareButtons({
  state,
  rateMid,
  tierLabel,
}: InstagramSponsorshipShareButtonsProps) {
  const { getShareUrl, embedSlug } = useShareUrl(
    state,
    encodeSponsorshipState,
    '/instagram-sponsorship-rate-calculator'
  );

  const shareText = `As a ${tierLabel} Instagram creator, my estimated sponsorship rate is ${formatUSD(rateMid)}/post! Check yours:`;

  return <ShareButtons getShareUrl={getShareUrl} shareText={shareText} embedSlug={embedSlug} />;
}
