'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

const calculatorComponents: Record<string, ComponentType> = {
  'youtube-money-calculator': dynamic(
    () => import('@/features/calculators/youtube-money').then((m) => m.YouTubeMoneyCalculator),
    { ssr: false }
  ),
  'youtube-shorts-money-calculator': dynamic(
    () => import('@/features/calculators/youtube-money/YouTubeShortsEmbed').then((m) => m.default),
    { ssr: false }
  ),
  'youtube-subscriber-projector': dynamic(
    () => import('@/features/calculators/youtube-growth').then((m) => m.YouTubeGrowthCalculator),
    { ssr: false }
  ),
  'instagram-engagement-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/instagram-engagement').then(
        (m) => m.InstagramEngagementCalculator
      ),
    { ssr: false }
  ),
  'instagram-sponsorship-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/instagram-sponsorship').then(
        (m) => m.InstagramSponsorshipCalculator
      ),
    { ssr: false }
  ),
  'tiktok-engagement-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/tiktok-engagement').then((m) => m.TikTokEngagementCalculator),
    { ssr: false }
  ),
  'tiktok-sponsorship-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/tiktok-sponsorship').then(
        (m) => m.TikTokSponsorshipCalculator
      ),
    { ssr: false }
  ),
  'facebook-engagement-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/facebook-engagement').then(
        (m) => m.FacebookEngagementCalculator
      ),
    { ssr: false }
  ),
  'twitter-engagement-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/twitter-engagement').then(
        (m) => m.TwitterEngagementCalculator
      ),
    { ssr: false }
  ),
  'youtube-sponsorship-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/youtube-sponsorship').then(
        (m) => m.YouTubeSponsorshipCalculator
      ),
    { ssr: false }
  ),
  'facebook-sponsorship-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/facebook-sponsorship').then(
        (m) => m.FacebookSponsorshipCalculator
      ),
    { ssr: false }
  ),
  'twitter-sponsorship-rate-calculator': dynamic(
    () =>
      import('@/features/calculators/twitter-sponsorship').then(
        (m) => m.TwitterSponsorshipCalculator
      ),
    { ssr: false }
  ),
};

interface EmbedCalculatorLoaderProps {
  slug: string;
}

export default function EmbedCalculatorLoader({ slug }: EmbedCalculatorLoaderProps) {
  const Component = calculatorComponents[slug];
  if (!Component) return null;
  return <Component />;
}
