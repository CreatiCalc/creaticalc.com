import Link from 'next/link';
import type { SponsorshipPlatform } from '@/lib/sponsorshipModel';

const PLATFORM_INFO: Record<SponsorshipPlatform, { label: string; urlPrefix: string }> = {
  youtube: { label: 'YouTube', urlPrefix: 'youtube-sponsorship-rate-calculator' },
  instagram: { label: 'Instagram', urlPrefix: 'instagram-sponsorship-rate-calculator' },
  tiktok: { label: 'TikTok', urlPrefix: 'tiktok-sponsorship-rate-calculator' },
  facebook: { label: 'Facebook', urlPrefix: 'facebook-sponsorship-rate-calculator' },
  twitter: { label: 'X (Twitter)', urlPrefix: 'twitter-sponsorship-rate-calculator' },
};

interface NicheCrossLinksProps {
  currentPlatform: SponsorshipPlatform;
  nicheSlug: string;
  nicheName: string;
}

export default function NicheCrossLinks({
  currentPlatform,
  nicheSlug,
  nicheName,
}: NicheCrossLinksProps) {
  const otherPlatforms = (Object.keys(PLATFORM_INFO) as SponsorshipPlatform[]).filter(
    (p) => p !== currentPlatform
  );

  return (
    <section className="mt-10">
      <h3 className="mb-3 text-lg font-semibold text-foreground">
        {nicheName} Sponsorship Rates on Other Platforms
      </h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {otherPlatforms.map((platform) => {
          const info = PLATFORM_INFO[platform];
          return (
            <Link
              key={platform}
              href={`/${info.urlPrefix}/${nicheSlug}`}
              className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
            >
              {info.label} &mdash; {nicheName}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
