import type { GrowthNicheId, GrowthInputMode } from './subscriberGrowthModel';
import { GROWTH_NICHES } from './subscriberGrowthModel';
import { toBase64Url, fromBase64Url } from './codecUtils';

export interface GrowthShareState {
  currentSubs: number;
  inputMode: GrowthInputMode;
  monthlyGrowthRate: number;
  monthlyNewSubs: number;
  uploadsPerWeek: number;
  nicheId: GrowthNicheId;
  decelerationEnabled: boolean;
}

const VALID_NICHES: Set<string> = new Set(GROWTH_NICHES.map((n) => n.id));

// Format: g|currentSubs|inputMode|growthPct|monthlyNewSubs|uploadsPerWeek|nicheId|decel
export function encodeGrowthState(state: GrowthShareState): string {
  const mode = state.inputMode === 'flat' ? 1 : 0;
  const growthPct = Math.round(state.monthlyGrowthRate * 1000); // 3 decimal places
  const raw = [
    'g',
    state.currentSubs,
    mode,
    growthPct,
    state.monthlyNewSubs,
    state.uploadsPerWeek,
    state.nicheId,
    state.decelerationEnabled ? 1 : 0,
  ].join('|');
  return toBase64Url(raw);
}

export function decodeGrowthState(encoded: string): GrowthShareState | null {
  try {
    const raw = fromBase64Url(encoded);
    const parts = raw.split('|');
    if (parts[0] !== 'g' || parts.length !== 8) return null;

    const currentSubs = parseInt(parts[1], 10);
    const mode = parts[2];
    const growthPct = parseInt(parts[3], 10);
    const monthlyNewSubs = parseInt(parts[4], 10);
    const uploadsPerWeek = parseInt(parts[5], 10);
    const nicheId = parts[6];
    const decel = parts[7];

    if (isNaN(currentSubs) || currentSubs < 0 || currentSubs > 50000000) return null;
    if (mode !== '0' && mode !== '1') return null;
    if (isNaN(growthPct) || growthPct < 0 || growthPct > 500) return null;
    if (isNaN(monthlyNewSubs) || monthlyNewSubs < 0) return null;
    if (isNaN(uploadsPerWeek) || uploadsPerWeek < 0 || uploadsPerWeek > 30) return null;
    if (!VALID_NICHES.has(nicheId)) return null;
    if (decel !== '0' && decel !== '1') return null;

    return {
      currentSubs,
      inputMode: mode === '1' ? 'flat' : 'rate',
      monthlyGrowthRate: growthPct / 1000,
      monthlyNewSubs,
      uploadsPerWeek,
      nicheId: nicheId as GrowthNicheId,
      decelerationEnabled: decel === '1',
    };
  } catch {
    return null;
  }
}
