import type {
  EngagementInput,
  FacebookCalcMethod,
  IndustryId,
  InstagramCalcMethod,
  InstagramContentType,
  Platform,
  TikTokCalcMethod,
  TwitterCalcMethod,
} from './engagementBenchmarks';
import {
  PLATFORM_NAMES,
  VALID_INDUSTRY_IDS,
  VALID_CONTENT_TYPES,
  VALID_IG_CALC_METHODS,
  VALID_TT_CALC_METHODS,
  VALID_FB_CALC_METHODS,
  VALID_TW_CALC_METHODS,
} from './engagementBenchmarks';
import { toBase64Url, fromBase64Url } from './codecUtils';

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
  icm?: InstagramCalcMethod; // instagramCalcMethod
  // TikTok-specific
  sh?: number; // shares
  v?: number; // views
  cm?: TikTokCalcMethod; // calcMethod (TikTok)
  // Facebook-specific
  fsh?: number; // facebook shares
  fr?: number; // facebook reach
  fcm?: FacebookCalcMethod; // facebookCalcMethod
  // Twitter-specific
  rp?: number; // reposts
  bm?: number; // bookmarks
  tim?: number; // twitter impressions
  tcm?: TwitterCalcMethod; // twitterCalcMethod
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

const IG_CALC_METHOD_TO_CODE: Record<InstagramCalcMethod, number> = {
  byFollowers: 0,
  byReach: 1,
  byImpressions: 2,
};
const IG_CODE_TO_CALC_METHOD: InstagramCalcMethod[] = ['byFollowers', 'byReach', 'byImpressions'];

const TT_CALC_METHOD_TO_CODE: Record<TikTokCalcMethod, number> = { byFollowers: 0, byViews: 1 };
const TT_CODE_TO_CALC_METHOD: TikTokCalcMethod[] = ['byFollowers', 'byViews'];

const FB_CALC_METHOD_TO_CODE: Record<FacebookCalcMethod, number> = {
  byFollowers: 0,
  byReach: 1,
};
const FB_CODE_TO_CALC_METHOD: FacebookCalcMethod[] = ['byFollowers', 'byReach'];

const TW_CALC_METHOD_TO_CODE: Record<TwitterCalcMethod, number> = {
  byFollowers: 0,
  byImpressions: 1,
};
const TW_CODE_TO_CALC_METHOD: TwitterCalcMethod[] = ['byFollowers', 'byImpressions'];

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

const MAX_COUNT = 1_000_000_000; // 1 billion — reasonable upper bound for social metrics

function safeInt(value: string, max = MAX_COUNT): number | null {
  const n = parseInt(value, 10);
  if (isNaN(n) || n < 0 || n > max) return null;
  return n;
}

function decodePipe(raw: string): ShareableState | null {
  const parts = raw.split('|');
  const platform = parts[0];

  if (platform === 'i') {
    if (parts.length < 8) return null;
    if (!VALID_INDUSTRY_IDS.has(parts[4])) return null;
    if (!VALID_CONTENT_TYPES.has(parts[7])) return null;
    const f = safeInt(parts[1]);
    const l = safeInt(parts[2]);
    const c = safeInt(parts[3]);
    const n = safeInt(parts[5], 10000);
    const saves = safeInt(parts[6]);
    if (f === null || l === null || c === null || n === null || saves === null) return null;
    const s: ShareableState = {
      p: 'instagram',
      f,
      l,
      c,
      i: parts[4],
      n,
      s: saves,
      ct: parts[7],
    };
    if (parts.length >= 11) {
      const r = safeInt(parts[8]);
      const im = safeInt(parts[9]);
      if (r === null || im === null) return null;
      s.r = r;
      s.im = im;
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
    const f = safeInt(parts[1]);
    const l = safeInt(parts[2]);
    const c = safeInt(parts[3]);
    const n = safeInt(parts[5], 10000);
    const sh = safeInt(parts[6]);
    const v = safeInt(parts[7]);
    if (f === null || l === null || c === null || n === null || sh === null || v === null)
      return null;
    const calcCode = parseInt(parts[8], 10);
    return {
      p: 'tiktok',
      f,
      l,
      c,
      i: parts[4],
      n,
      sh,
      v,
      cm:
        calcCode >= 0 && calcCode < TT_CODE_TO_CALC_METHOD.length
          ? TT_CODE_TO_CALC_METHOD[calcCode]
          : 'byFollowers',
    };
  }

  if (platform === 'f') {
    if (parts.length < 7) return null;
    if (!VALID_INDUSTRY_IDS.has(parts[4])) return null;
    const f = safeInt(parts[1]);
    const l = safeInt(parts[2]);
    const c = safeInt(parts[3]);
    const n = safeInt(parts[5], 10000);
    const fsh = safeInt(parts[6]);
    if (f === null || l === null || c === null || n === null || fsh === null) return null;
    const s: ShareableState = {
      p: 'facebook',
      f,
      l,
      c,
      i: parts[4],
      n,
      fsh,
    };
    if (parts.length >= 9) {
      const fr = safeInt(parts[7]);
      if (fr === null) return null;
      s.fr = fr;
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
    const f = safeInt(parts[1]);
    const l = safeInt(parts[2]);
    const c = safeInt(parts[3]);
    const n = safeInt(parts[5], 10000);
    const rp = safeInt(parts[6]);
    const bm = safeInt(parts[7]);
    if (f === null || l === null || c === null || n === null || rp === null || bm === null)
      return null;
    const s: ShareableState = {
      p: 'twitter',
      f,
      l,
      c,
      i: parts[4],
      n,
      rp,
      bm,
    };
    if (parts.length >= 10) {
      const tim = safeInt(parts[8]);
      if (tim === null) return null;
      s.tim = tim;
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

// ─── Generic converters ──────────────────────────────────────────────────────

export function inputToShareable(input: EngagementInput): ShareableState {
  const p = input.platform;
  const base: ShareableState = {
    p,
    f: input.followers,
    l: input.avgLikes,
    c: input.avgComments,
    i: input.industryId,
    n: input.postsAnalyzed,
  };

  if (p === 'instagram') {
    base.s = input.avgSaves ?? 0;
    base.ct = input.contentType ?? 'mixed';
    if (input.avgReach) base.r = input.avgReach;
    if (input.avgImpressions) base.im = input.avgImpressions;
    if (input.instagramCalcMethod && input.instagramCalcMethod !== 'byFollowers') {
      base.icm = input.instagramCalcMethod;
    }
  } else if (p === 'tiktok') {
    base.sh = input.avgShares ?? 0;
    base.v = input.avgViews ?? 0;
    base.cm = input.calcMethod ?? 'byFollowers';
  } else if (p === 'facebook') {
    base.fsh = input.avgShares ?? 0;
    if (input.avgReach) base.fr = input.avgReach;
    if (input.facebookCalcMethod && input.facebookCalcMethod !== 'byFollowers') {
      base.fcm = input.facebookCalcMethod;
    }
  } else {
    // twitter
    base.rp = input.avgReposts ?? 0;
    base.bm = input.avgBookmarks ?? 0;
    if (input.avgImpressions) base.tim = input.avgImpressions;
    if (input.twitterCalcMethod && input.twitterCalcMethod !== 'byFollowers') {
      base.tcm = input.twitterCalcMethod;
    }
  }
  return base;
}

export function shareableToInput(s: ShareableState): EngagementInput {
  const base: EngagementInput = {
    platform: s.p,
    followers: s.f,
    avgLikes: s.l,
    avgComments: s.c,
    industryId: s.i as IndustryId,
    postsAnalyzed: s.n,
  };

  if (s.p === 'instagram') {
    base.avgSaves = s.s ?? 0;
    const ct = s.ct ?? 'mixed';
    base.contentType = (VALID_CONTENT_TYPES.has(ct) ? ct : 'mixed') as InstagramContentType;
    base.avgReach = s.r ?? 0;
    base.avgImpressions = s.im ?? 0;
    const icm = s.icm ?? 'byFollowers';
    base.instagramCalcMethod = (
      VALID_IG_CALC_METHODS.has(icm) ? icm : 'byFollowers'
    ) as InstagramCalcMethod;
  } else if (s.p === 'tiktok') {
    base.avgShares = s.sh ?? 0;
    base.avgViews = s.v ?? 0;
    const cm = s.cm ?? 'byFollowers';
    base.calcMethod = (VALID_TT_CALC_METHODS.has(cm) ? cm : 'byFollowers') as TikTokCalcMethod;
  } else if (s.p === 'facebook') {
    base.avgShares = s.fsh ?? 0;
    base.avgReach = s.fr ?? 0;
    const fcm = s.fcm ?? 'byFollowers';
    base.facebookCalcMethod = (
      VALID_FB_CALC_METHODS.has(fcm) ? fcm : 'byFollowers'
    ) as FacebookCalcMethod;
  } else {
    // twitter
    base.avgReposts = s.rp ?? 0;
    base.avgBookmarks = s.bm ?? 0;
    base.avgImpressions = s.tim ?? 0;
    const tcm = s.tcm ?? 'byFollowers';
    base.twitterCalcMethod = (
      VALID_TW_CALC_METHODS.has(tcm) ? tcm : 'byFollowers'
    ) as TwitterCalcMethod;
  }
  return base;
}

export function buildShareUrl(basePath: string, state: ShareableState): string {
  const encoded = encodeState(state);
  return `${basePath}?s=${encoded}`;
}

export function buildShareText(platform: Platform, rate: number): string {
  const platformName = PLATFORM_NAMES[platform];
  return `My ${platformName} engagement rate is ${rate.toFixed(2)}%! Check yours for free:`;
}
