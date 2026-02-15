import type { IndustryId } from './engagementBenchmarks';
import { VALID_INDUSTRY_IDS } from './engagementBenchmarks';
import { toBase64Url, fromBase64Url } from './codecUtils';

// Sponsorship-specific validation sets (content types and deal types differ from engagement)
const VALID_SPONSORSHIP_CONTENT_TYPES = new Set<string>([
  'feedPost',
  'reel',
  'story',
  'carousel',
  'video',
  'live',
]);
const VALID_DEAL_TYPES = new Set<string>(['mention', 'dedicated', 'review', 'series']);

export interface SponsorshipShareState {
  platform: 'instagram' | 'tiktok';
  followers: number;
  engagementRate: number;
  contentType: string;
  dealType: string;
  industryId: IndustryId;
  dealsPerMonth: number;
}

// Format: sp|platform|followers|engagementRate(x100)|contentType|dealType|industryId|dealsPerMonth
export function encodeSponsorshipState(state: SponsorshipShareState): string {
  const p = state.platform === 'instagram' ? 'i' : 't';
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

    if (p !== 'i' && p !== 't') return null;
    if (isNaN(followers) || followers < 0 || followers > 50000000) return null;
    if (isNaN(engPct) || engPct < 0 || engPct > 10000) return null;
    if (isNaN(dealsPerMonth) || dealsPerMonth < 0 || dealsPerMonth > 100) return null;
    if (!VALID_INDUSTRY_IDS.has(industryId)) return null;
    if (!VALID_SPONSORSHIP_CONTENT_TYPES.has(contentType)) return null;
    if (!VALID_DEAL_TYPES.has(dealType)) return null;

    return {
      platform: p === 'i' ? 'instagram' : 'tiktok',
      followers,
      engagementRate: engPct / 100,
      contentType,
      dealType,
      industryId: industryId as IndustryId,
      dealsPerMonth,
    };
  } catch {
    return null;
  }
}
