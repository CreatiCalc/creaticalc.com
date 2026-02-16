import type { Platform } from '../engagementBenchmarks';
import type { EngagementNichePageData } from './types';
import instagram from './instagram';
import tiktok from './tiktok';
import facebook from './facebook';
import twitter from './twitter';

export type { EngagementNichePageData } from './types';

export const ENGAGEMENT_NICHE_PAGES: EngagementNichePageData[] = [
  ...instagram,
  ...tiktok,
  ...facebook,
  ...twitter,
];

export function getEngagementNichePages(platform: Platform): EngagementNichePageData[] {
  return ENGAGEMENT_NICHE_PAGES.filter((p) => p.platform === platform);
}

export function getEngagementNichePageData(
  platform: Platform,
  slug: string
): EngagementNichePageData | undefined {
  return ENGAGEMENT_NICHE_PAGES.find((p) => p.platform === platform && p.slug === slug);
}
