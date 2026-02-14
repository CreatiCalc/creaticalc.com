// Re-export all types, constants, and tier functions from benchmarks
// so existing consumers don't need to update their imports
export * from './engagementBenchmarks';

import {
  type Platform,
  type LetterGrade,
  type EngagementRating,
  type EngagementInput,
  type EngagementBreakdown,
  type EngagementResult,
  type EngagementRecommendation,
  type HealthScore,
  type MultiFormulaResult,
  type WhatIfScenario,
  type EstimatedReach,
  type CrossPlatformResult,
  type IndustryId,
  type TikTokCalcMethod,
  type FacebookCalcMethod,
  type TwitterCalcMethod,
  PLATFORM_NAMES,
  TIKTOK_VIEW_BENCHMARKS,
  FACEBOOK_REACH_BENCHMARKS,
  TWITTER_IMPRESSIONS_BENCHMARKS,
  BRAND_DEAL_BASE,
  ENGAGEMENT_MULTIPLIERS,
  NICHE_MULTIPLIERS,
  REACH_RATES,
  PLATFORM_REACH_MULTIPLIERS,
  PLATFORM_AVERAGES,
  YOY_TRENDS,
  getTiers,
  getFollowerTier,
  getTierLabel,
  getTierBenchmark,
  getIndustryBenchmark,
  formatPercent,
  formatUSD,
} from './engagementBenchmarks';

// ─── Core Functions ───────────────────────────────────────────────────────────

export function calculateEngagementRate(input: EngagementInput): number {
  const { platform, followers, avgLikes, avgComments } = input;

  if (platform === 'tiktok' && input.calcMethod === 'byViews') {
    const views = input.avgViews ?? 0;
    if (views <= 0) return 0;
    const totalInteractions = avgLikes + avgComments + (input.avgShares ?? 0);
    return (totalInteractions / views) * 100;
  }

  if (platform === 'instagram') {
    const saves = input.avgSaves ?? 0;
    const totalInteractions = avgLikes + avgComments + saves;

    if (input.instagramCalcMethod === 'byReach') {
      const reach = input.avgReach ?? 0;
      if (reach <= 0) return 0;
      return (totalInteractions / reach) * 100;
    }
    if (input.instagramCalcMethod === 'byImpressions') {
      const impressions = input.avgImpressions ?? 0;
      if (impressions <= 0) return 0;
      return (totalInteractions / impressions) * 100;
    }

    if (followers <= 0) return 0;
    return (totalInteractions / followers) * 100;
  }

  if (platform === 'facebook') {
    const shares = input.avgShares ?? 0;
    const totalInteractions = avgLikes + avgComments + shares;

    if (input.facebookCalcMethod === 'byReach') {
      const reach = input.avgReach ?? 0;
      if (reach <= 0) return 0;
      return (totalInteractions / reach) * 100;
    }

    if (followers <= 0) return 0;
    return (totalInteractions / followers) * 100;
  }

  if (platform === 'twitter') {
    const reposts = input.avgReposts ?? 0;
    const bookmarks = input.avgBookmarks ?? 0;
    const totalInteractions = avgLikes + avgComments + reposts + bookmarks;

    if (input.twitterCalcMethod === 'byImpressions') {
      const impressions = input.avgImpressions ?? 0;
      if (impressions <= 0) return 0;
      return (totalInteractions / impressions) * 100;
    }

    if (followers <= 0) return 0;
    return (totalInteractions / followers) * 100;
  }

  if (followers <= 0) return 0;

  // TikTok by followers
  const shares = input.avgShares ?? 0;
  return ((avgLikes + avgComments + shares) / followers) * 100;
}

export function rateEngagement(
  platform: Platform,
  followers: number,
  rate: number,
  calcMethod?: TikTokCalcMethod,
  facebookCalcMethod?: FacebookCalcMethod,
  twitterCalcMethod?: TwitterCalcMethod
): EngagementRating {
  // TikTok view-based uses its own scale
  if (platform === 'tiktok' && calcMethod === 'byViews') {
    if (rate >= TIKTOK_VIEW_BENCHMARKS.excellent) return 'excellent';
    if (rate >= TIKTOK_VIEW_BENCHMARKS.good) return 'good';
    if (rate >= TIKTOK_VIEW_BENCHMARKS.average) return 'average';
    if (rate >= TIKTOK_VIEW_BENCHMARKS.belowAverage) return 'below_average';
    return 'low';
  }

  // Facebook reach-based uses its own scale
  if (platform === 'facebook' && facebookCalcMethod === 'byReach') {
    if (rate >= FACEBOOK_REACH_BENCHMARKS.excellent) return 'excellent';
    if (rate >= FACEBOOK_REACH_BENCHMARKS.good) return 'good';
    if (rate >= FACEBOOK_REACH_BENCHMARKS.average) return 'average';
    if (rate >= FACEBOOK_REACH_BENCHMARKS.belowAverage) return 'below_average';
    return 'low';
  }

  // Twitter impressions-based uses its own scale
  if (platform === 'twitter' && twitterCalcMethod === 'byImpressions') {
    if (rate >= TWITTER_IMPRESSIONS_BENCHMARKS.excellent) return 'excellent';
    if (rate >= TWITTER_IMPRESSIONS_BENCHMARKS.good) return 'good';
    if (rate >= TWITTER_IMPRESSIONS_BENCHMARKS.average) return 'average';
    if (rate >= TWITTER_IMPRESSIONS_BENCHMARKS.belowAverage) return 'below_average';
    return 'low';
  }

  const benchmark = getTierBenchmark(platform, followers);
  const mid = (benchmark.low + benchmark.high) / 2;

  if (rate >= benchmark.high * 1.2) return 'excellent';
  if (rate >= mid) return 'good';
  if (rate >= benchmark.low) return 'average';
  if (rate >= benchmark.low * 0.5) return 'below_average';
  return 'low';
}

export function getRatingLabel(rating: EngagementRating): string {
  const labels: Record<EngagementRating, string> = {
    excellent: 'Excellent',
    good: 'Good',
    average: 'Average',
    below_average: 'Below Average',
    low: 'Low',
  };
  return labels[rating];
}

export function getRatingColor(rating: EngagementRating): string {
  const colors: Record<EngagementRating, string> = {
    excellent: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    good: 'text-green-600 bg-green-50 border-green-200',
    average: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    below_average: 'text-orange-600 bg-orange-50 border-orange-200',
    low: 'text-red-600 bg-red-50 border-red-200',
  };
  return colors[rating];
}

export function calculateBreakdown(input: EngagementInput): EngagementBreakdown {
  const { platform, avgLikes, avgComments } = input;

  let total: number;
  let saves: { count: number; pct: number } | undefined;
  let shares: { count: number; pct: number } | undefined;
  let reposts: { count: number; pct: number } | undefined;
  let bookmarks: { count: number; pct: number } | undefined;

  if (platform === 'instagram') {
    const savesCount = input.avgSaves ?? 0;
    total = avgLikes + avgComments + savesCount;
    saves = { count: savesCount, pct: total > 0 ? (savesCount / total) * 100 : 0 };
  } else if (platform === 'twitter') {
    const repostsCount = input.avgReposts ?? 0;
    const bookmarksCount = input.avgBookmarks ?? 0;
    total = avgLikes + avgComments + repostsCount + bookmarksCount;
    reposts = { count: repostsCount, pct: total > 0 ? (repostsCount / total) * 100 : 0 };
    bookmarks = { count: bookmarksCount, pct: total > 0 ? (bookmarksCount / total) * 100 : 0 };
  } else {
    // TikTok and Facebook both use shares
    const sharesCount = input.avgShares ?? 0;
    total = avgLikes + avgComments + sharesCount;
    shares = { count: sharesCount, pct: total > 0 ? (sharesCount / total) * 100 : 0 };
  }

  return {
    likes: { count: avgLikes, pct: total > 0 ? (avgLikes / total) * 100 : 0 },
    comments: { count: avgComments, pct: total > 0 ? (avgComments / total) * 100 : 0 },
    saves,
    shares,
    reposts,
    bookmarks,
    total,
    likeToCommentRatio: avgComments > 0 ? avgLikes / avgComments : 0,
  };
}

export function estimateBrandDealRate(
  platform: Platform,
  followers: number,
  engagementRate: number,
  industryId: IndustryId
): { low: number; high: number } {
  const base = BRAND_DEAL_BASE[platform];
  const followerK = followers / 1000;

  // Engagement multiplier
  const engMul = ENGAGEMENT_MULTIPLIERS.find((m) => engagementRate < m.maxRate)?.multiplier ?? 2.0;

  // Niche multiplier
  const nicheMul = NICHE_MULTIPLIERS[industryId] ?? 1.0;

  return {
    low: Math.round(followerK * base.low * engMul * nicheMul),
    high: Math.round(followerK * base.high * engMul * nicheMul),
  };
}

// ─── Master Compute ───────────────────────────────────────────────────────────

export function computeEngagement(input: EngagementInput): EngagementResult {
  const rate = calculateEngagementRate(input);
  const tier = getFollowerTier(input.platform, input.followers);
  const tierLabel = getTierLabel(input.platform, input.followers);
  const tierBenchmark = getTierBenchmark(input.platform, input.followers);
  const rating = rateEngagement(
    input.platform,
    input.followers,
    rate,
    input.calcMethod,
    input.facebookCalcMethod,
    input.twitterCalcMethod
  );
  const ratingLabel = getRatingLabel(rating);
  const breakdown = calculateBreakdown(input);
  const industryAvg = getIndustryBenchmark(input.platform, input.industryId);
  const brandDealEstimate = estimateBrandDealRate(
    input.platform,
    input.followers,
    rate,
    input.industryId
  );

  return {
    engagementRate: rate,
    rating,
    ratingLabel,
    followerTier: tier,
    tierLabel,
    tierBenchmark,
    vsIndustryAvg: rate - industryAvg,
    industryAvg,
    breakdown,
    brandDealEstimate,
  };
}

// ─── Recommendations ──────────────────────────────────────────────────────────

export function generateEngagementRecommendations(
  input: EngagementInput,
  result: EngagementResult
): EngagementRecommendation[] {
  const recs: EngagementRecommendation[] = [];
  const { rating, breakdown, engagementRate, tierBenchmark } = result;
  const { platform } = input;
  const platformName = PLATFORM_NAMES[platform];

  // Low/below average: content quality tips
  if (rating === 'low' || rating === 'below_average') {
    recs.push({
      id: 'improve-content',
      text: 'Improve content quality and consistency',
      detail: `Your engagement rate of ${formatPercent(engagementRate)} is below the ${formatPercent(tierBenchmark.low)}–${formatPercent(tierBenchmark.high)} benchmark for your follower tier. Focus on creating content that sparks conversation — ask questions in captions, share personal stories, and use strong hooks in the first 1–2 seconds.`,
    });

    const postingDetail: Record<Platform, string> = {
      instagram:
        'Post consistently 4–7 times per week. Use Instagram Insights to find when your audience is most active. Reels tend to get 2–3x more reach than static feed posts.',
      tiktok:
        "Post 1–3 times daily during peak hours (7–9 AM, 12–3 PM, 7–11 PM in your audience's timezone). Consistency signals the algorithm to push your content to more viewers.",
      facebook:
        'Post 3–5 times per week. Facebook prioritizes meaningful interactions — posts that generate comments and shares get significantly more reach than those with just reactions. Use Facebook Insights to find optimal posting times.',
      twitter:
        "Post 3–5 times daily on X. The timeline moves fast, so frequency matters more here than on other platforms. Use threads for longer content and post during your audience's peak hours for maximum visibility.",
    };

    recs.push({
      id: 'posting-frequency',
      text: 'Optimize your posting schedule',
      detail: postingDetail[platform],
    });
  }

  // Like-to-comment ratio analysis
  if (breakdown.likeToCommentRatio > 50) {
    recs.push({
      id: 'boost-comments',
      text: 'Encourage more comments to boost engagement quality',
      detail: `Your like-to-comment ratio is ${Math.round(breakdown.likeToCommentRatio)}:1, meaning your audience is passive. Brands value comments more than likes. Try ending posts with a question, running polls, or responding to every comment within the first hour to encourage conversation.`,
    });
  }

  // Platform-specific tips
  if (platform === 'instagram') {
    if (breakdown.saves && breakdown.saves.pct < 10) {
      recs.push({
        id: 'increase-saves',
        text: 'Create more saveable content',
        detail:
          'Saves are the most valuable engagement signal for the Instagram algorithm. Create educational carousels, tip lists, recipes, or reference guides that people want to revisit. Content that teaches something is saved 3x more often than entertainment content.',
      });
    }
    if (input.contentType === 'feed') {
      recs.push({
        id: 'try-reels',
        text: 'Incorporate Reels into your content mix',
        detail:
          'Instagram Reels reach 2–3x more non-followers than static feed posts. Even repurposing your best-performing feed content as short-form video can significantly boost your engagement rate and attract new followers.',
      });
    }
  } else if (platform === 'tiktok') {
    if (breakdown.shares && breakdown.shares.pct < 5) {
      recs.push({
        id: 'increase-shares',
        text: 'Create more shareable content',
        detail:
          'Shares are TikTok\'s strongest signal for viral distribution. Create relatable content, duet-worthy videos, or "send this to someone who..." formats. Videos that get shared reach entirely new audience circles beyond the For You Page.',
      });
    }
    if (input.calcMethod === 'byViews' && input.avgViews && input.followers > 0) {
      const viewToFollowerRatio = input.avgViews / input.followers;
      if (viewToFollowerRatio < 0.5) {
        recs.push({
          id: 'improve-reach',
          text: 'Improve your video reach',
          detail: `Your average views are only ${Math.round(viewToFollowerRatio * 100)}% of your follower count. Use trending sounds, relevant hashtags, and hook viewers in the first second. The algorithm prioritizes watch time — aim for videos where viewers watch at least 70% through.`,
        });
      }
    }
  } else if (platform === 'facebook') {
    if (breakdown.shares && breakdown.shares.pct < 5) {
      recs.push({
        id: 'increase-shares',
        text: 'Create more shareable content',
        detail:
          "Shares are the most powerful signal for Facebook's algorithm. Posts that get shared reach entirely new audiences organically. Focus on content that people want to tag friends in or share to their own timelines — relatable quotes, useful tips, and community-building content perform best.",
      });
    }
    recs.push({
      id: 'facebook-groups',
      text: 'Leverage Facebook Groups for higher engagement',
      detail:
        'Facebook Groups consistently see 3–5x higher engagement than Pages. Consider creating or actively participating in niche groups related to your content. Group posts get prioritized in the News Feed and foster the kind of meaningful interactions Facebook rewards.',
    });
  } else if (platform === 'twitter') {
    if (breakdown.reposts && breakdown.reposts.pct < 5) {
      recs.push({
        id: 'increase-reposts',
        text: 'Create more repostable content',
        detail:
          'Reposts amplify your reach on X more than any other interaction. Create thread starters with bold takes, share valuable data or insights, and use quote posts to add context to trending topics. Content that makes people look smart for sharing it gets reposted most.',
      });
    }
    if (breakdown.bookmarks && breakdown.bookmarks.pct < 3) {
      recs.push({
        id: 'increase-bookmarks',
        text: 'Create more bookmarkable content',
        detail:
          'Bookmarks are a strong signal that your content has lasting value. Create threads with actionable tips, curated resource lists, or detailed analysis. Bookmarks indicate deep engagement and help the algorithm surface your content to similar audiences.',
      });
    }
  }

  // Good/excellent: monetization tips
  if (rating === 'good' || rating === 'excellent') {
    recs.push({
      id: 'monetize',
      text: 'Your engagement is strong — start monetizing',
      detail: `With a ${formatPercent(engagementRate)} engagement rate on ${platformName}, you're well above the benchmark for your tier. Start reaching out to brands in your niche or join creator marketplaces like AspireIQ, Grin, or CreatorIQ to connect with sponsors.`,
    });

    if (result.brandDealEstimate.high > 0) {
      recs.push({
        id: 'brand-deal-value',
        text: `Your estimated brand deal value: ${formatUSD(result.brandDealEstimate.low)}–${formatUSD(result.brandDealEstimate.high)} per post`,
        detail:
          'This estimate is based on your follower count, engagement rate, and content niche. When negotiating with brands, lead with your engagement rate — it matters more than follower count. Brands pay a premium for engaged audiences because they convert better.',
      });
    }
  }

  // Average: growth tips
  if (rating === 'average') {
    recs.push({
      id: 'grow-engagement',
      text: "You're on track — focus on deepening engagement",
      detail: `Your engagement rate is within the expected range for your tier. To move into "good" territory (${formatPercent(tierBenchmark.high)}+), focus on: responding to comments quickly, creating series content that keeps viewers coming back, and collaborating with creators in your niche.`,
    });
  }

  return recs.slice(0, 5);
}

// ─── Multi-Formula ───────────────────────────────────────────────────────────

export function calculateMultiFormula(input: EngagementInput): MultiFormulaResult {
  const { followers, avgLikes, avgComments } = input;
  const saves = input.avgSaves ?? 0;
  const total = avgLikes + avgComments + saves;

  const byFollowers = followers > 0 ? (total / followers) * 100 : 0;

  const reach = input.avgReach ?? 0;
  const byReach = reach > 0 ? (total / reach) * 100 : null;

  const impressions = input.avgImpressions ?? 0;
  const byImpressions = impressions > 0 ? (total / impressions) * 100 : null;

  return { byFollowers, byReach, byImpressions };
}

// ─── Engagement Health Score ────────────────────────────────────────────────

export function calculateHealthScore(input: EngagementInput, rate: number): HealthScore {
  const { platform, followers, industryId, avgLikes, avgComments } = input;
  const benchmark = getTierBenchmark(platform, followers);
  const midBenchmark = (benchmark.low + benchmark.high) / 2;

  // 1. Rate vs benchmark (0-40)
  const rateRatio = midBenchmark > 0 ? rate / midBenchmark : 0;
  const rateBenchmark = Math.min(40, Math.round(rateRatio * 20));

  // 2. Like-to-comment ratio (0-20) — ideal is 10:1 to 20:1
  const lcr = avgComments > 0 ? avgLikes / avgComments : 100;
  let likeCommentRatio: number;
  if (lcr >= 10 && lcr <= 20) likeCommentRatio = 20;
  else if (lcr >= 5 && lcr <= 30) likeCommentRatio = 15;
  else if (lcr >= 3 && lcr <= 50) likeCommentRatio = 10;
  else likeCommentRatio = 5;

  // 3. Saves/shares/reposts/bookmarks as % of total interactions (0-20)
  const saves = input.avgSaves ?? 0;
  const shares = input.avgShares ?? 0;
  const reposts = input.avgReposts ?? 0;
  const bookmarkCount = input.avgBookmarks ?? 0;
  const total = avgLikes + avgComments + saves + shares + reposts + bookmarkCount;
  const specialPct = total > 0 ? ((saves + shares + reposts + bookmarkCount) / total) * 100 : 0;
  let saveSharePct: number;
  if (specialPct >= 15) saveSharePct = 20;
  else if (specialPct >= 10) saveSharePct = 16;
  else if (specialPct >= 5) saveSharePct = 12;
  else if (specialPct >= 2) saveSharePct = 8;
  else saveSharePct = 4;

  // 4. Industry comparison (0-20)
  const industryAvg = getIndustryBenchmark(platform, industryId);
  const industryRatio = industryAvg > 0 ? rate / industryAvg : 0;
  const industryComparison = Math.min(20, Math.round(industryRatio * 10));

  const score = Math.min(100, rateBenchmark + likeCommentRatio + saveSharePct + industryComparison);
  const grade = scoreToGrade(score);

  return {
    score,
    grade,
    components: { rateBenchmark, likeCommentRatio, saveSharePct, industryComparison },
  };
}

function scoreToGrade(score: number): LetterGrade {
  if (score >= 95) return 'A+';
  if (score >= 88) return 'A';
  if (score >= 80) return 'A-';
  if (score >= 73) return 'B+';
  if (score >= 65) return 'B';
  if (score >= 58) return 'B-';
  if (score >= 50) return 'C+';
  if (score >= 40) return 'C';
  if (score >= 25) return 'D';
  return 'F';
}

// ─── What-If Scenarios ──────────────────────────────────────────────────────

export function getWhatIfScenarios(input: EngagementInput): WhatIfScenario[] {
  const { platform, followers, avgLikes, avgComments } = input;

  const scenarios: WhatIfScenario[] = [
    {
      id: 'double-comments',
      label: 'Double your comments',
      description: `What if you got ${(avgComments * 2).toLocaleString()} comments per post?`,
      changes: { avgComments: avgComments * 2 },
    },
    {
      id: 'boost-likes-50',
      label: 'Boost likes by 50%',
      description: `What if you averaged ${Math.round(avgLikes * 1.5).toLocaleString()} likes?`,
      changes: { avgLikes: Math.round(avgLikes * 1.5) },
    },
    {
      id: 'grow-next-tier',
      label: 'Grow to next tier',
      description: `What if you had ${getNextTierFollowers(platform, followers).toLocaleString()} followers?`,
      changes: { followers: getNextTierFollowers(platform, followers) },
    },
  ];

  if (platform === 'instagram') {
    const saves = input.avgSaves ?? 0;
    scenarios.push({
      id: 'triple-saves',
      label: 'Triple your saves',
      description: `What if you got ${(saves * 3).toLocaleString()} saves per post?`,
      changes: { avgSaves: saves * 3 },
    });
  } else if (platform === 'twitter') {
    const reposts = input.avgReposts ?? 0;
    scenarios.push({
      id: 'triple-reposts',
      label: 'Triple your reposts',
      description: `What if you got ${(reposts * 3).toLocaleString()} reposts per post?`,
      changes: { avgReposts: reposts * 3 },
    });
  } else {
    // TikTok and Facebook both use shares
    const shares = input.avgShares ?? 0;
    scenarios.push({
      id: 'triple-shares',
      label: 'Triple your shares',
      description: `What if you got ${(shares * 3).toLocaleString()} shares per ${platform === 'tiktok' ? 'video' : 'post'}?`,
      changes: { avgShares: shares * 3 },
    });
  }

  return scenarios;
}

function getNextTierFollowers(platform: Platform, followers: number): number {
  const tiers = getTiers(platform);
  const currentIdx = tiers.findIndex((t) => followers >= t.min && followers <= t.max);
  if (currentIdx < 0 || currentIdx >= tiers.length - 1) return Math.round(followers * 2);
  return tiers[currentIdx + 1].min;
}

// ─── Estimated Reach ────────────────────────────────────────────────────────

export function estimateReach(platform: Platform, followers: number): EstimatedReach {
  const tier = getFollowerTier(platform, followers);
  const baseReachRate = REACH_RATES[tier];
  const reachRate = Math.max(1, Math.round(baseReachRate * PLATFORM_REACH_MULTIPLIERS[platform]));
  const estimatedReach = Math.round((followers * reachRate) / 100);
  const estimatedImpressions = Math.round(estimatedReach * 1.3);

  return { estimatedReach, estimatedImpressions, reachRate };
}

// ─── Cross-Platform Comparison ──────────────────────────────────────────────

export function crossPlatformComparison(
  platform: Platform,
  rate: number,
  followers: number,
  otherPlatform?: Platform
): CrossPlatformResult {
  // Default: compare to Instagram unless already on Instagram, then compare to TikTok
  const other: Platform = otherPlatform ?? (platform === 'instagram' ? 'tiktok' : 'instagram');

  // Calculate the ratio of the current rate to the platform's overall average
  const currentPlatformAvg = PLATFORM_AVERAGES[platform];
  const otherPlatformAvg = PLATFORM_AVERAGES[other];
  const ratio = currentPlatformAvg > 0 ? rate / currentPlatformAvg : 1;
  const equivalentRate = otherPlatformAvg * ratio;

  const currentRating = rateEngagement(platform, followers, rate);
  const otherRating = rateEngagement(other, followers, equivalentRate);

  return {
    currentPlatform: platform,
    currentRate: rate,
    currentRating,
    otherPlatform: other,
    equivalentRate,
    otherRating,
  };
}

// ─── Year-Over-Year Trend Context ───────────────────────────────────────────

export function getYoYContext(
  platform: Platform,
  rate: number
): { currentYearAvg: number; prevYearAvg: number; changePercent: number; ratingVsPrev: string } {
  const current = YOY_TRENDS[YOY_TRENDS.length - 1];
  const previous = YOY_TRENDS[YOY_TRENDS.length - 2];

  const currentAvg = current[platform];
  const prevAvg = previous[platform];
  const changePercent = prevAvg > 0 ? ((currentAvg - prevAvg) / prevAvg) * 100 : 0;

  let ratingVsPrev: string;
  if (rate > prevAvg && rate <= currentAvg) {
    ratingVsPrev = 'was above average last year, now average';
  } else if (rate > currentAvg) {
    ratingVsPrev = 'above average both years';
  } else if (rate <= currentAvg && rate > prevAvg * 0.8) {
    ratingVsPrev = 'close to average';
  } else {
    ratingVsPrev = 'below average both years';
  }

  return { currentYearAvg: currentAvg, prevYearAvg: prevAvg, changePercent, ratingVsPrev };
}
