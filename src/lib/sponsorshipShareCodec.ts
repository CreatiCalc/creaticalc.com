import type { IndustryId } from './engagementBenchmarks';
import { VALID_INDUSTRY_IDS } from './engagementBenchmarks';
import { toBase64Url, fromBase64Url } from './codecUtils';
import type { SponsorshipPlatform, SponsorshipContentType } from './sponsorshipModel';
import { getContentTypesForPlatform } from './sponsorshipModel';

const VALID_DEAL_TYPES = new Set<string>(['mention', 'dedicated', 'review', 'series']);

const PLATFORM_TO_CODE: Record<SponsorshipPlatform, string> = {
  instagram: 'i',
  tiktok: 't',
  youtube: 'y',
  facebook: 'f',
  twitter: 'x',
};

const CODE_TO_PLATFORM: Record<string, SponsorshipPlatform> = Object.fromEntries(
  Object.entries(PLATFORM_TO_CODE).map(([k, v]) => [v, k as SponsorshipPlatform])
) as Record<string, SponsorshipPlatform>;

// Build the full set of valid content type strings from all platforms
const VALID_SPONSORSHIP_CONTENT_TYPES = new Set<string>(
  (['instagram', 'tiktok', 'youtube', 'facebook', 'twitter'] as SponsorshipPlatform[]).flatMap(
    (p) => getContentTypesForPlatform(p).map((ct) => ct.value)
  )
);

export interface SponsorshipShareState {
  platform: SponsorshipPlatform;
  followers: number;
  engagementRate: number;
  contentType: string;
  dealType: string;
  industryId: IndustryId;
  dealsPerMonth: number;
}

// Format: sp|platform|followers|engagementRate(x100)|contentType|dealType|industryId|dealsPerMonth
export function encodeSponsorshipState(state: SponsorshipShareState): string {
  const p = PLATFORM_TO_CODE[state.platform];
  const engPct = Math.round(state.engagementRate * 100); // 2 decimal places
  const raw = [
    'sp',
    p,
    state.followers,
    engPct,
    state.contentType,
    state.dealType,
    state.industryId,
    state.dealsPerMonth,
  ].join('|');
  return toBase64Url(raw);
}

export function decodeSponsorshipState(encoded: string): SponsorshipShareState | null {
  try {
    const raw = fromBase64Url(encoded);
    const parts = raw.split('|');
    if (parts[0] !== 'sp' || parts.length !== 8) return null;

    const p = parts[1];
    const followers = parseInt(parts[2], 10);
    const engPct = parseInt(parts[3], 10);
    const contentType = parts[4];
    const dealType = parts[5];
    const industryId = parts[6];
    const dealsPerMonth = parseInt(parts[7], 10);

    if (!(p in CODE_TO_PLATFORM)) return null;
    if (isNaN(followers) || followers < 0 || followers > 50000000) return null;
    if (isNaN(engPct) || engPct < 0 || engPct > 10000) return null;
    if (isNaN(dealsPerMonth) || dealsPerMonth < 0 || dealsPerMonth > 100) return null;
    if (!VALID_INDUSTRY_IDS.has(industryId)) return null;
    if (!VALID_SPONSORSHIP_CONTENT_TYPES.has(contentType)) return null;
    if (!VALID_DEAL_TYPES.has(dealType)) return null;

    return {
      platform: CODE_TO_PLATFORM[p],
      followers,
      engagementRate: engPct / 100,
      contentType: contentType as SponsorshipContentType,
      dealType,
      industryId: industryId as IndustryId,
      dealsPerMonth,
    };
  } catch {
    return null;
  }
}
