import type {
  FacebookCalcMethod,
  InstagramCalcMethod,
  InstagramContentType,
  Platform,
  TikTokCalcMethod,
  TwitterCalcMethod,
} from './engagementModel';
import { PLATFORM_NAMES } from './engagementModel';

// ─── Validation sets for safe decoding ────────────────────────────────────────

const VALID_CONTENT_TYPES = new Set<string>(['feed', 'reels', 'stories', 'mixed']);
const VALID_IG_CALC_METHODS = new Set<string>(['byFollowers', 'byReach', 'byImpressions']);
const VALID_TT_CALC_METHODS = new Set<string>(['byFollowers', 'byViews']);
const VALID_FB_CALC_METHODS = new Set<string>(['byFollowers', 'byReach']);
const VALID_TW_CALC_METHODS = new Set<string>(['byFollowers', 'byImpressions']);
const VALID_INDUSTRY_IDS = new Set<string>([
  'animals',
  'arts',
  'beauty',
  'design',
  'education',
  'fashion',
  'finance',
  'food',
  'health',
  'tech',
  'travel',
  'entertainment',
  'sports',
  'general',
]);

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
  // Facebook-specific
  fsh?: number; // facebook shares
  fr?: number; // facebook reach
  fcm?: string; // facebookCalcMethod
  // Twitter-specific
  rp?: number; // reposts
  bm?: number; // bookmarks
  tim?: number; // twitter impressions
  tcm?: string; // twitterCalcMethod
}

// ─── Compact pipe-delimited encoding ──────────────────────────────────────────
//
// Instagram: i|followers|likes|comments|industryId|postsAnalyzed|saves|contentType[|reach|impressions|calcMethod]
// TikTok:    t|followers|likes|comments|industryId|postsAnalyzed|shares|views|calcMethod
// Facebook:  f|followers|likes|comments|industryId|postsAnalyzed|shares[|reach|calcMethod]
// Twitter:   x|followers|likes|comments|industryId|postsAnalyzed|reposts|bookmarks[|impressions|calcMethod]
//
// Calc method codes:
//   Instagram: 0=byFollowers (default), 1=byReach, 2=byImpressions
//   TikTok:    0=byFollowers (default), 1=byViews
//   Facebook:  0=byFollowers (default), 1=byReach
//   Twitter:   0=byFollowers (default), 1=byImpressions

const IG_CALC_METHOD_TO_CODE: Record<string, number> = {
  byFollowers: 0,
  byReach: 1,
  byImpressions: 2,
};
const IG_CODE_TO_CALC_METHOD: InstagramCalcMethod[] = ['byFollowers', 'byReach', 'byImpressions'];

const TT_CALC_METHOD_TO_CODE: Record<string, number> = { byFollowers: 0, byViews: 1 };
const TT_CODE_TO_CALC_METHOD: TikTokCalcMethod[] = ['byFollowers', 'byViews'];

const FB_CALC_METHOD_TO_CODE: Record<string, number> = { byFollowers: 0, byReach: 1 };
const FB_CODE_TO_CALC_METHOD: FacebookCalcMethod[] = ['byFollowers', 'byReach'];

const TW_CALC_METHOD_TO_CODE: Record<string, number> = { byFollowers: 0, byImpressions: 1 };
const TW_CODE_TO_CALC_METHOD: TwitterCalcMethod[] = ['byFollowers', 'byImpressions'];

function toBase64Url(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str: string): string {
  let padded = str.replace(/-/g, '+').replace(/_/g, '/');
  while (padded.length % 4) padded += '=';
  return atob(padded);
}

export function encodeState(state: ShareableState): string {
  let raw: string;
  if (state.p === 'instagram') {
    // Base fields (8): i|f|l|c|ind|n|saves|contentType
    const parts = [
      'i',
      state.f,
      state.l,
      state.c,
      state.i,
      state.n,
      state.s ?? 0,
      state.ct ?? 'mixed',
    ];
    // Optional reach/impressions/calcMethod — only include if non-default
    const icm = state.icm ?? 'byFollowers';
    if (icm !== 'byFollowers' || state.r || state.im) {
      parts.push(state.r ?? 0, state.im ?? 0, IG_CALC_METHOD_TO_CODE[icm] ?? 0);
    }
    raw = parts.join('|');
  } else if (state.p === 'tiktok') {
    // TikTok: t|f|l|c|ind|n|shares|views|calcMethod
    raw = [
      't',
      state.f,
      state.l,
      state.c,
      state.i,
      state.n,
      state.sh ?? 0,
      state.v ?? 0,
      TT_CALC_METHOD_TO_CODE[state.cm ?? 'byFollowers'] ?? 0,
    ].join('|');
  } else if (state.p === 'facebook') {
    // Facebook: f|followers|likes|comments|ind|n|shares[|reach|calcMethod]
    const parts = ['f', state.f, state.l, state.c, state.i, state.n, state.fsh ?? 0];
    const fcm = state.fcm ?? 'byFollowers';
    if (fcm !== 'byFollowers' || state.fr) {
      parts.push(state.fr ?? 0, FB_CALC_METHOD_TO_CODE[fcm] ?? 0);
    }
    raw = parts.join('|');
  } else {
    // Twitter: x|followers|likes|comments|ind|n|reposts|bookmarks[|impressions|calcMethod]
    const parts = ['x', state.f, state.l, state.c, state.i, state.n, state.rp ?? 0, state.bm ?? 0];
    const tcm = state.tcm ?? 'byFollowers';
    if (tcm !== 'byFollowers' || state.tim) {
      parts.push(state.tim ?? 0, TW_CALC_METHOD_TO_CODE[tcm] ?? 0);
    }
    raw = parts.join('|');
  }
  return toBase64Url(raw);
}

function decodePipe(raw: string): ShareableState | null {
  const parts = raw.split('|');
  const platform = parts[0];

  if (platform === 'i') {
    if (parts.length < 8) return null;
    if (!VALID_INDUSTRY_IDS.has(parts[4])) return null;
    if (!VALID_CONTENT_TYPES.has(parts[7])) return null;
    const s: ShareableState = {
      p: 'instagram',
      f: parseInt(parts[1], 10),
      l: parseInt(parts[2], 10),
      c: parseInt(parts[3], 10),
      i: parts[4],
      n: parseInt(parts[5], 10),
      s: parseInt(parts[6], 10),
      ct: parts[7],
    };
    if (parts.length >= 11) {
      s.r = parseInt(parts[8], 10);
      s.im = parseInt(parts[9], 10);
      const calcCode = parseInt(parts[10], 10);
      s.icm =
        calcCode >= 0 && calcCode < IG_CODE_TO_CALC_METHOD.length
          ? IG_CODE_TO_CALC_METHOD[calcCode]
          : 'byFollowers';
    }
    return s;
  }

  if (platform === 't') {
    if (parts.length < 9) return null;
    if (!VALID_INDUSTRY_IDS.has(parts[4])) return null;
    const calcCode = parseInt(parts[8], 10);
    return {
      p: 'tiktok',
      f: parseInt(parts[1], 10),
      l: parseInt(parts[2], 10),
      c: parseInt(parts[3], 10),
      i: parts[4],
      n: parseInt(parts[5], 10),
      sh: parseInt(parts[6], 10),
      v: parseInt(parts[7], 10),
      cm:
        calcCode >= 0 && calcCode < TT_CODE_TO_CALC_METHOD.length
          ? TT_CODE_TO_CALC_METHOD[calcCode]
          : 'byFollowers',
    };
  }

  if (platform === 'f') {
    if (parts.length < 7) return null;
    if (!VALID_INDUSTRY_IDS.has(parts[4])) return null;
    const s: ShareableState = {
      p: 'facebook',
      f: parseInt(parts[1], 10),
      l: parseInt(parts[2], 10),
      c: parseInt(parts[3], 10),
      i: parts[4],
      n: parseInt(parts[5], 10),
      fsh: parseInt(parts[6], 10),
    };
    if (parts.length >= 9) {
      s.fr = parseInt(parts[7], 10);
      const calcCode = parseInt(parts[8], 10);
      s.fcm =
        calcCode >= 0 && calcCode < FB_CODE_TO_CALC_METHOD.length
          ? FB_CODE_TO_CALC_METHOD[calcCode]
          : 'byFollowers';
    }
    return s;
  }

  if (platform === 'x') {
    if (parts.length < 8) return null;
    if (!VALID_INDUSTRY_IDS.has(parts[4])) return null;
    const s: ShareableState = {
      p: 'twitter',
      f: parseInt(parts[1], 10),
      l: parseInt(parts[2], 10),
      c: parseInt(parts[3], 10),
      i: parts[4],
      n: parseInt(parts[5], 10),
      rp: parseInt(parts[6], 10),
      bm: parseInt(parts[7], 10),
    };
    if (parts.length >= 10) {
      s.tim = parseInt(parts[8], 10);
      const calcCode = parseInt(parts[9], 10);
      s.tcm =
        calcCode >= 0 && calcCode < TW_CODE_TO_CALC_METHOD.length
          ? TW_CODE_TO_CALC_METHOD[calcCode]
          : 'byFollowers';
    }
    return s;
  }

  return null;
}

function decodeJson(raw: string): ShareableState | null {
  try {
    return JSON.parse(raw) as ShareableState;
  } catch {
    return null;
  }
}

export function decodeState(encoded: string): ShareableState | null {
  try {
    const raw = fromBase64Url(encoded);
    // New pipe-delimited format starts with 'i|', 't|', 'f|', or 'x|'; old JSON format starts with '{'
    if (raw.startsWith('{')) {
      return decodeJson(raw);
    }
    return decodePipe(raw);
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

export function facebookStateToShareable(state: {
  followers: number;
  avgReactions: number;
  avgComments: number;
  avgShares: number;
  avgReach: number;
  calcMethod: string;
  industryId: string;
  postsAnalyzed: number;
}): ShareableState {
  const s: ShareableState = {
    p: 'facebook',
    f: state.followers,
    l: state.avgReactions,
    c: state.avgComments,
    i: state.industryId,
    n: state.postsAnalyzed,
    fsh: state.avgShares,
  };
  if (state.avgReach) s.fr = state.avgReach;
  if (state.calcMethod !== 'byFollowers') s.fcm = state.calcMethod;
  return s;
}

export function twitterStateToShareable(state: {
  followers: number;
  avgLikes: number;
  avgReplies: number;
  avgReposts: number;
  avgBookmarks: number;
  avgImpressions: number;
  calcMethod: string;
  industryId: string;
  postsAnalyzed: number;
}): ShareableState {
  const s: ShareableState = {
    p: 'twitter',
    f: state.followers,
    l: state.avgLikes,
    c: state.avgReplies,
    i: state.industryId,
    n: state.postsAnalyzed,
    rp: state.avgReposts,
    bm: state.avgBookmarks,
  };
  if (state.avgImpressions) s.tim = state.avgImpressions;
  if (state.calcMethod !== 'byFollowers') s.tcm = state.calcMethod;
  return s;
}

export function shareableToInstagramState(s: ShareableState) {
  const ct = s.ct ?? 'mixed';
  const icm = s.icm ?? 'byFollowers';
  return {
    followers: s.f,
    avgLikes: s.l,
    avgComments: s.c,
    avgSaves: s.s ?? 0,
    contentType: (VALID_CONTENT_TYPES.has(ct) ? ct : 'mixed') as InstagramContentType,
    industryId: s.i,
    postsAnalyzed: s.n,
    avgReach: s.r ?? 0,
    avgImpressions: s.im ?? 0,
    instagramCalcMethod: (VALID_IG_CALC_METHODS.has(icm)
      ? icm
      : 'byFollowers') as InstagramCalcMethod,
  };
}

export function shareableToTikTokState(s: ShareableState) {
  const cm = s.cm ?? 'byFollowers';
  return {
    followers: s.f,
    avgLikes: s.l,
    avgComments: s.c,
    avgShares: s.sh ?? 0,
    avgViews: s.v ?? 0,
    calcMethod: (VALID_TT_CALC_METHODS.has(cm) ? cm : 'byFollowers') as TikTokCalcMethod,
    industryId: s.i,
    postsAnalyzed: s.n,
  };
}

export function shareableToFacebookState(s: ShareableState) {
  const fcm = s.fcm ?? 'byFollowers';
  return {
    followers: s.f,
    avgReactions: s.l,
    avgComments: s.c,
    avgShares: s.fsh ?? 0,
    avgReach: s.fr ?? 0,
    calcMethod: (VALID_FB_CALC_METHODS.has(fcm) ? fcm : 'byFollowers') as FacebookCalcMethod,
    industryId: s.i,
    postsAnalyzed: s.n,
  };
}

export function shareableToTwitterState(s: ShareableState) {
  const tcm = s.tcm ?? 'byFollowers';
  return {
    followers: s.f,
    avgLikes: s.l,
    avgReplies: s.c,
    avgReposts: s.rp ?? 0,
    avgBookmarks: s.bm ?? 0,
    avgImpressions: s.tim ?? 0,
    calcMethod: (VALID_TW_CALC_METHODS.has(tcm) ? tcm : 'byFollowers') as TwitterCalcMethod,
    industryId: s.i,
    postsAnalyzed: s.n,
  };
}

export function buildShareUrl(basePath: string, state: ShareableState): string {
  const encoded = encodeState(state);
  return `${basePath}?s=${encoded}`;
}

export function buildShareText(platform: Platform, rate: number): string {
  const platformName = PLATFORM_NAMES[platform];
  return `My ${platformName} engagement rate is ${rate.toFixed(2)}%! Check yours for free:`;
}
