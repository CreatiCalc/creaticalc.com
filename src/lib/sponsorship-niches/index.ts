import type { SponsorshipPlatform } from '../sponsorshipModel';
import type { SponsorshipNichePageData } from './types';
import youtube from './youtube';
import instagram from './instagram';
import tiktok from './tiktok';
import facebook from './facebook';
import twitter from './twitter';

export type { SponsorshipNichePageData } from './types';

export const SPONSORSHIP_NICHE_PAGES: SponsorshipNichePageData[] = [
  ...youtube,
  ...instagram,
  ...tiktok,
  ...facebook,
  ...twitter,
];

export function getSponsorshipNichePages(
  platform: SponsorshipPlatform
): SponsorshipNichePageData[] {
  return SPONSORSHIP_NICHE_PAGES.filter((p) => p.platform === platform);
}

export function getSponsorshipNichePageData(
  platform: SponsorshipPlatform,
  slug: string
): SponsorshipNichePageData | undefined {
  return SPONSORSHIP_NICHE_PAGES.find((p) => p.platform === platform && p.slug === slug);
}
