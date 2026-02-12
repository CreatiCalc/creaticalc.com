import type { NicheId, VideoLength } from './youtubeEarningsModel';

interface ShareState {
  dailyViews: number;
  nicheId: NicheId;
  monthlyGrowthRate: number;
  seasonalityEnabled: boolean;
  inputMode: 'daily' | 'perVideo';
  viewsPerVideo: number;
  uploadsPerWeek: number;
  contentFormat: 'longform' | 'shorts';
  videoLength: VideoLength;
}

const VALID_NICHES: Set<string> = new Set([
  'finance',
  'tech',
  'education',
  'health',
  'beauty',
  'travel',
  'food',
  'lifestyle',
  'entertainment',
  'gaming',
]);

function toBase64Url(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str: string): string {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  return atob(padded);
}

export function encodeCalcState(state: ShareState): string {
  const growthPct = Math.round(state.monthlyGrowthRate * 100);
  const mode = state.inputMode === 'perVideo' ? 1 : 0;
  const format = state.contentFormat === 'shorts' ? 1 : 0;
  const lengthMap: Record<VideoLength, number> = { short: 0, standard: 1, long: 2 };
  const length = lengthMap[state.videoLength];
  const raw = `${state.dailyViews}|${state.nicheId}|${growthPct}|${state.seasonalityEnabled ? 1 : 0}|${mode}|${state.viewsPerVideo}|${state.uploadsPerWeek}|${format}|${length}`;
  return toBase64Url(raw);
}

export function decodeCalcState(hash: string): ShareState | null {
  try {
    const raw = fromBase64Url(hash);
    const parts = raw.split('|');
    if (parts.length !== 4 && parts.length !== 7 && parts.length !== 8 && parts.length !== 9)
      return null;

    const dailyViews = parseInt(parts[0], 10);
    const nicheId = parts[1];
    const growthPct = parseInt(parts[2], 10);
    const seasonality = parts[3];

    if (isNaN(dailyViews) || dailyViews < 0 || dailyViews > 10000000) return null;
    if (!VALID_NICHES.has(nicheId)) return null;
    if (isNaN(growthPct) || growthPct < 0 || growthPct > 100) return null;
    if (seasonality !== '0' && seasonality !== '1') return null;

    // Legacy 4-field format — default to daily mode, longform, standard length
    if (parts.length === 4) {
      return {
        dailyViews,
        nicheId: nicheId as NicheId,
        monthlyGrowthRate: growthPct / 100,
        seasonalityEnabled: seasonality === '1',
        inputMode: 'daily',
        viewsPerVideo: 2000,
        uploadsPerWeek: 3,
        contentFormat: 'longform',
        videoLength: 'standard',
      };
    }

    // 7-field or 8-field format
    const mode = parts[4];
    const viewsPerVideo = parseInt(parts[5], 10);
    const uploadsPerWeek = parseInt(parts[6], 10);

    if (mode !== '0' && mode !== '1') return null;
    if (isNaN(viewsPerVideo) || viewsPerVideo < 0 || viewsPerVideo > 100000000) return null;
    if (isNaN(uploadsPerWeek) || uploadsPerWeek < 0 || uploadsPerWeek > 100) return null;

    // Parse contentFormat (8th field), default to longform for 7-field URLs
    let contentFormat: 'longform' | 'shorts' = 'longform';
    if (parts.length >= 8) {
      const fmt = parts[7];
      if (fmt !== '0' && fmt !== '1') return null;
      contentFormat = fmt === '1' ? 'shorts' : 'longform';
    }

    // Parse videoLength (9th field), default to standard for older URLs
    let videoLength: VideoLength = 'standard';
    if (parts.length === 9) {
      const len = parts[8];
      if (len !== '0' && len !== '1' && len !== '2') return null;
      const lengthMap: Record<string, VideoLength> = { '0': 'short', '1': 'standard', '2': 'long' };
      videoLength = lengthMap[len];
    }

    return {
      dailyViews,
      nicheId: nicheId as NicheId,
      monthlyGrowthRate: growthPct / 100,
      seasonalityEnabled: seasonality === '1',
      inputMode: mode === '1' ? 'perVideo' : 'daily',
      viewsPerVideo,
      uploadsPerWeek,
      contentFormat,
      videoLength,
    };
  } catch {
    return null;
  }
}
