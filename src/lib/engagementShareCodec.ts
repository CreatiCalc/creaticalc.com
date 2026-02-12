import type { Platform } from './engagementModel';

export interface ShareableState {
  p: Platform;
  f: number; // followers
  l: number; // likes
  c: number; // comments
  i: string; // industryId
  n: number; // postsAnalyzed
  // Instagram-specific
  s?: number; // saves
  ct?: string; // contentType
  r?: number; // reach
  im?: number; // impressions
  icm?: string; // instagramCalcMethod
  // TikTok-specific
  sh?: number; // shares
  v?: number; // views
  cm?: string; // calcMethod (TikTok)
}

export function encodeState(state: ShareableState): string {
  const json = JSON.stringify(state);
  // Use btoa with URI-safe encoding
  const base64 = btoa(json);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeState(encoded: string): ShareableState | null {
  try {
    // Restore base64 padding
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const json = atob(base64);
    return JSON.parse(json) as ShareableState;
  } catch {
    return null;
  }
}

export function instagramStateToShareable(state: {
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgSaves: number;
  contentType: string;
  industryId: string;
  postsAnalyzed: number;
  avgReach?: number;
  avgImpressions?: number;
  instagramCalcMethod?: string;
}): ShareableState {
  const s: ShareableState = {
    p: 'instagram',
    f: state.followers,
    l: state.avgLikes,
    c: state.avgComments,
    i: state.industryId,
    n: state.postsAnalyzed,
    s: state.avgSaves,
    ct: state.contentType,
  };
  if (state.avgReach) s.r = state.avgReach;
  if (state.avgImpressions) s.im = state.avgImpressions;
  if (state.instagramCalcMethod && state.instagramCalcMethod !== 'byFollowers') {
    s.icm = state.instagramCalcMethod;
  }
  return s;
}

export function tiktokStateToShareable(state: {
  followers: number;
  avgLikes: number;
  avgComments: number;
  avgShares: number;
  avgViews: number;
  calcMethod: string;
  industryId: string;
  postsAnalyzed: number;
}): ShareableState {
  return {
    p: 'tiktok',
    f: state.followers,
    l: state.avgLikes,
    c: state.avgComments,
    i: state.industryId,
    n: state.postsAnalyzed,
    sh: state.avgShares,
    v: state.avgViews,
    cm: state.calcMethod,
  };
}

export function shareableToInstagramState(s: ShareableState) {
  return {
    followers: s.f,
    avgLikes: s.l,
    avgComments: s.c,
    avgSaves: s.s ?? 0,
    contentType: (s.ct ?? 'mixed') as 'feed' | 'reels' | 'stories' | 'mixed',
    industryId: s.i,
    postsAnalyzed: s.n,
    avgReach: s.r ?? 0,
    avgImpressions: s.im ?? 0,
    instagramCalcMethod: (s.icm ?? 'byFollowers') as 'byFollowers' | 'byReach' | 'byImpressions',
  };
}

export function shareableToTikTokState(s: ShareableState) {
  return {
    followers: s.f,
    avgLikes: s.l,
    avgComments: s.c,
    avgShares: s.sh ?? 0,
    avgViews: s.v ?? 0,
    calcMethod: (s.cm ?? 'byFollowers') as 'byFollowers' | 'byViews',
    industryId: s.i,
    postsAnalyzed: s.n,
  };
}

export function buildShareUrl(basePath: string, state: ShareableState): string {
  const encoded = encodeState(state);
  return `${basePath}?s=${encoded}`;
}

export function buildShareText(platform: Platform, rate: number): string {
  const platformName = platform === 'instagram' ? 'Instagram' : 'TikTok';
  return `My ${platformName} engagement rate is ${rate.toFixed(2)}%! Check yours for free:`;
}
