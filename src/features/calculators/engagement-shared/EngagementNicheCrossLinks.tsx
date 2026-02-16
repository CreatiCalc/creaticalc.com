import Link from 'next/link';
import type { Platform } from '@/lib/engagementBenchmarks';

const PLATFORM_INFO: Record<Platform, { label: string; urlPrefix: string }> = {
  instagram: { label: 'Instagram', urlPrefix: 'instagram-engagement-rate-calculator' },
  tiktok: { label: 'TikTok', urlPrefix: 'tiktok-engagement-rate-calculator' },
  facebook: { label: 'Facebook', urlPrefix: 'facebook-engagement-rate-calculator' },
  twitter: { label: 'X (Twitter)', urlPrefix: 'twitter-engagement-rate-calculator' },
};

const SPONSORSHIP_PREFIX: Record<Platform, string> = {
  instagram: 'instagram-sponsorship-rate-calculator',
  tiktok: 'tiktok-sponsorship-rate-calculator',
  facebook: 'facebook-sponsorship-rate-calculator',
  twitter: 'twitter-sponsorship-rate-calculator',
};

interface EngagementNicheCrossLinksProps {
  currentPlatform: Platform;
  nicheSlug: string;
  nicheName: string;
}

export default function EngagementNicheCrossLinks({
  currentPlatform,
  nicheSlug,
  nicheName,
}: EngagementNicheCrossLinksProps) {
  const otherPlatforms = (Object.keys(PLATFORM_INFO) as Platform[]).filter(
    (p) => p !== currentPlatform
  );

  return (
    <section className="mt-10">
      <h3 className="mb-3 text-lg font-semibold text-foreground">
        {nicheName} Engagement Rates on Other Platforms
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
              {info.label} &mdash; {nicheName} Engagement
            </Link>
          );
        })}
        <Link
          href={`/${SPONSORSHIP_PREFIX[currentPlatform]}/${nicheSlug}`}
          className="rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          {PLATFORM_INFO[currentPlatform].label} &mdash; {nicheName} Sponsorship Rates
        </Link>
      </div>
    </section>
  );
}
