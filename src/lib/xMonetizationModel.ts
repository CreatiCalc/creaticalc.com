// ---------------------------------------------------------------------------
// X (Twitter) Monetization Eligibility Model
// Pure functions — no React, no state.
// ---------------------------------------------------------------------------

export type MonetizationProgram = 'adsRevenue' | 'subscriptions' | 'ticketedSpaces' | 'tips';

export interface MonetizationInput {
  followers: number;
  hasXPremium: boolean;
  accountAgeMonths: number;
  organicImpressions3Months: number;
  hasHostedSpaces: boolean;
  hasPostedLast30Days: boolean;
}

export interface RequirementCheck {
  label: string;
  met: boolean;
  /** For numeric requirements: current value */
  current?: number;
  /** For numeric requirements: target value */
  target?: number;
  /** Helper text explaining where to check / what this means */
  helpText?: string;
}

export interface EarningsRange {
  low: number;
  high: number;
}

export interface ProgramEligibility {
  program: MonetizationProgram;
  programName: string;
  description: string;
  eligible: boolean;
  requirements: RequirementCheck[];
  estimatedMonthlyEarnings?: EarningsRange;
}

export interface MonetizationResult {
  programs: ProgramEligibility[];
  qualifiedCount: number;
  totalPrograms: number;
  tips: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ADS_REVENUE_FOLLOWER_MIN = 500;
const ADS_REVENUE_IMPRESSIONS_MIN = 5_000_000;
const ADS_REVENUE_ACCOUNT_AGE_MIN = 3;

const SUBSCRIPTIONS_FOLLOWER_MIN = 2_000;
const SUBSCRIPTIONS_IMPRESSIONS_MIN = 5_000_000;

const TICKETED_SPACES_FOLLOWER_MIN = 500;

// Earnings estimation constants
// X pays roughly $0.50–$3.00 per 1,000 impressions on eligible content.
// Only a fraction of total impressions are "eligible" (verified-user impressions
// in reply sections), so we apply a discount factor.
const ADS_CPM_LOW = 0.5;
const ADS_CPM_HIGH = 3.0;
const ADS_ELIGIBLE_FRACTION = 0.15; // ~15% of organic impressions are eligible

// Subscriptions: typical 0.5–2% of followers convert at $3–$10/month
const SUB_CONVERSION_LOW = 0.005;
const SUB_CONVERSION_HIGH = 0.02;
const SUB_PRICE_LOW = 2.99;
const SUB_PRICE_HIGH = 9.99;
const SUB_REVENUE_SHARE = 0.97; // 97% until $50K lifetime

// ---------------------------------------------------------------------------
// Per-program eligibility checkers
// ---------------------------------------------------------------------------

function checkAdsRevenue(input: MonetizationInput): ProgramEligibility {
  const requirements: RequirementCheck[] = [
    {
      label: 'X Premium subscription',
      met: input.hasXPremium,
      helpText:
        'X Premium ($8/month), Premium+ ($16/month), or Verified Organizations ($200/month)',
    },
    {
      label: `${ADS_REVENUE_FOLLOWER_MIN.toLocaleString()}+ followers`,
      met: input.followers >= ADS_REVENUE_FOLLOWER_MIN,
      current: input.followers,
      target: ADS_REVENUE_FOLLOWER_MIN,
      helpText: 'X requires verified (Premium) followers, which may be a subset of your total',
    },
    {
      label: `${(ADS_REVENUE_IMPRESSIONS_MIN / 1_000_000).toFixed(0)}M+ organic impressions (last 3 months)`,
      met: input.organicImpressions3Months >= ADS_REVENUE_IMPRESSIONS_MIN,
      current: input.organicImpressions3Months,
      target: ADS_REVENUE_IMPRESSIONS_MIN,
      helpText: 'Check X Analytics > Posts > Impressions for the last 90 days',
    },
    {
      label: `Account at least ${ADS_REVENUE_ACCOUNT_AGE_MIN} months old`,
      met: input.accountAgeMonths >= ADS_REVENUE_ACCOUNT_AGE_MIN,
      current: input.accountAgeMonths,
      target: ADS_REVENUE_ACCOUNT_AGE_MIN,
    },
    {
      label: 'Stripe account connected',
      met: true, // We can't check this — mark as info-only
      helpText: 'You will need to connect a Stripe account to receive payouts',
    },
  ];

  const eligible = requirements.every((r) => r.met);

  return {
    program: 'adsRevenue',
    programName: 'Ads Revenue Sharing',
    description:
      'Earn from ads shown in replies to your posts. X shares ad revenue with eligible creators, paying roughly $8–$12 per million verified-user impressions.',
    eligible,
    requirements,
    estimatedMonthlyEarnings: eligible
      ? estimateAdsRevenueEarnings(input.organicImpressions3Months)
      : undefined,
  };
}

function checkSubscriptions(input: MonetizationInput): ProgramEligibility {
  const requirements: RequirementCheck[] = [
    {
      label: 'X Premium subscription',
      met: input.hasXPremium,
      helpText: 'Required to offer paid subscriptions to your followers',
    },
    {
      label: `${SUBSCRIPTIONS_FOLLOWER_MIN.toLocaleString()}+ followers`,
      met: input.followers >= SUBSCRIPTIONS_FOLLOWER_MIN,
      current: input.followers,
      target: SUBSCRIPTIONS_FOLLOWER_MIN,
    },
    {
      label: `${(SUBSCRIPTIONS_IMPRESSIONS_MIN / 1_000_000).toFixed(0)}M+ organic impressions (last 3 months)`,
      met: input.organicImpressions3Months >= SUBSCRIPTIONS_IMPRESSIONS_MIN,
      current: input.organicImpressions3Months,
      target: SUBSCRIPTIONS_IMPRESSIONS_MIN,
      helpText: 'Check X Analytics > Posts > Impressions for the last 90 days',
    },
    {
      label: 'Posted within the last 30 days',
      met: input.hasPostedLast30Days,
      helpText: 'Your account must show recent activity',
    },
  ];

  const eligible = requirements.every((r) => r.met);

  return {
    program: 'subscriptions',
    programName: 'Subscriptions',
    description:
      'Offer exclusive content to paying subscribers at $2.99, $4.99, or $9.99/month. You keep up to 97% of revenue until $50K lifetime earnings, then 90%.',
    eligible,
    requirements,
    estimatedMonthlyEarnings: eligible ? estimateSubscriptionEarnings(input.followers) : undefined,
  };
}

function checkTicketedSpaces(input: MonetizationInput): ProgramEligibility {
  const requirements: RequirementCheck[] = [
    {
      label: 'X Premium subscription',
      met: input.hasXPremium,
    },
    {
      label: `${TICKETED_SPACES_FOLLOWER_MIN.toLocaleString()}+ followers`,
      met: input.followers >= TICKETED_SPACES_FOLLOWER_MIN,
      current: input.followers,
      target: TICKETED_SPACES_FOLLOWER_MIN,
    },
    {
      label: 'History of hosting Spaces',
      met: input.hasHostedSpaces,
      helpText: 'You need to have hosted at least a few Spaces before applying',
    },
  ];

  const eligible = requirements.every((r) => r.met);

  return {
    program: 'ticketedSpaces',
    programName: 'Ticketed Spaces',
    description:
      'Host live audio sessions with ticket prices from $1 to $999. Best for workshops, Q&As, and exclusive discussions.',
    eligible,
    requirements,
    // Ticketed Spaces earnings are too variable to estimate reliably
    estimatedMonthlyEarnings: undefined,
  };
}

function checkTips(_input: MonetizationInput): ProgramEligibility {
  // Tips has no real requirements — just enable it in profile settings
  const requirements: RequirementCheck[] = [
    {
      label: 'Enable Tips in your profile settings',
      met: true,
      helpText:
        'Go to Profile > Edit profile > Tips and connect PayPal, Cash App, Venmo, or a crypto wallet',
    },
  ];

  return {
    program: 'tips',
    programName: 'Tips',
    description:
      'Let followers send you direct payments as appreciation for your content. X takes no cut. Supports PayPal, Cash App, Venmo, and crypto.',
    eligible: true,
    requirements,
    // Tips earnings are completely unpredictable
    estimatedMonthlyEarnings: undefined,
  };
}

// ---------------------------------------------------------------------------
// Earnings estimators
// ---------------------------------------------------------------------------

function estimateAdsRevenueEarnings(impressions3Months: number): EarningsRange {
  // Monthly impressions from 3-month total
  const monthlyImpressions = impressions3Months / 3;
  // Only a fraction of impressions are eligible for revenue
  const eligibleImpressions = monthlyImpressions * ADS_ELIGIBLE_FRACTION;

  return {
    low: Math.round((eligibleImpressions / 1_000) * ADS_CPM_LOW),
    high: Math.round((eligibleImpressions / 1_000) * ADS_CPM_HIGH),
  };
}

function estimateSubscriptionEarnings(followers: number): EarningsRange {
  const lowSubs = Math.floor(followers * SUB_CONVERSION_LOW);
  const highSubs = Math.floor(followers * SUB_CONVERSION_HIGH);

  return {
    low: Math.round(lowSubs * SUB_PRICE_LOW * SUB_REVENUE_SHARE),
    high: Math.round(highSubs * SUB_PRICE_HIGH * SUB_REVENUE_SHARE),
  };
}

// ---------------------------------------------------------------------------
// Actionable tips generator
// ---------------------------------------------------------------------------

function generateActionableTips(
  programs: ProgramEligibility[],
  input: MonetizationInput
): string[] {
  const tips: string[] = [];

  // Premium is the gatekeeper for almost everything
  if (!input.hasXPremium) {
    tips.push(
      'Subscribe to X Premium ($8/month) to unlock Ads Revenue Sharing, Subscriptions, and Ticketed Spaces. This is the single biggest blocker for most creators.'
    );
  }

  // Impression threshold is the hardest requirement
  if (input.organicImpressions3Months < ADS_REVENUE_IMPRESSIONS_MIN) {
    const gap = ADS_REVENUE_IMPRESSIONS_MIN - input.organicImpressions3Months;
    const gapFormatted =
      gap >= 1_000_000 ? `${(gap / 1_000_000).toFixed(1)}M` : `${(gap / 1_000).toFixed(0)}K`;
    tips.push(
      `You need ${gapFormatted} more organic impressions in 3 months to qualify for Ads Revenue Sharing and Subscriptions. Focus on posting consistently, engaging in trending conversations, and creating thread content that gets shared.`
    );
  }

  // Follower growth
  if (input.followers < SUBSCRIPTIONS_FOLLOWER_MIN) {
    if (input.followers < ADS_REVENUE_FOLLOWER_MIN) {
      tips.push(
        `Grow to ${ADS_REVENUE_FOLLOWER_MIN} followers to unlock Ads Revenue Sharing and Ticketed Spaces, then to ${SUBSCRIPTIONS_FOLLOWER_MIN.toLocaleString()} for Subscriptions.`
      );
    } else {
      tips.push(
        `You qualify for the follower requirement on Ads Revenue Sharing and Ticketed Spaces. Grow to ${SUBSCRIPTIONS_FOLLOWER_MIN.toLocaleString()} followers to also unlock Subscriptions.`
      );
    }
  }

  // Spaces hosting
  if (!input.hasHostedSpaces && input.followers >= TICKETED_SPACES_FOLLOWER_MIN) {
    tips.push(
      'Start hosting free Spaces to build a track record. Once you have hosting history, you can apply for Ticketed Spaces.'
    );
  }

  // Account age
  if (input.accountAgeMonths < ADS_REVENUE_ACCOUNT_AGE_MIN) {
    const remaining = ADS_REVENUE_ACCOUNT_AGE_MIN - input.accountAgeMonths;
    tips.push(
      `Your account needs to be ${remaining} more month${remaining === 1 ? '' : 's'} old to qualify for Ads Revenue Sharing. Use this time to build your audience and engagement.`
    );
  }

  // Posting activity
  if (!input.hasPostedLast30Days) {
    tips.push(
      'Post regularly to maintain your eligibility for Subscriptions. Accounts that go inactive for 30+ days lose access.'
    );
  }

  // Tips is always available
  const tipsProgram = programs.find((p) => p.program === 'tips');
  if (tipsProgram?.eligible && programs.filter((p) => p.eligible).length === 1) {
    tips.push(
      'Tips is available right now with zero requirements. Enable it in your profile settings to start receiving direct payments while you work toward the other programs.'
    );
  }

  return tips;
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export function checkEligibility(input: MonetizationInput): MonetizationResult {
  const programs = [
    checkAdsRevenue(input),
    checkSubscriptions(input),
    checkTicketedSpaces(input),
    checkTips(input),
  ];

  const qualifiedCount = programs.filter((p) => p.eligible).length;
  const tips = generateActionableTips(programs, input);

  return {
    programs,
    qualifiedCount,
    totalPrograms: programs.length,
    tips,
  };
}
