import type { FAQItem } from '@/features/calculators/shared/types';

export type PlatformId = 'YouTube' | 'Instagram' | 'TikTok' | 'Facebook' | 'X';

export interface PlatformHubData {
  /** Internal platform ID — must match calculatorRegistry.platform */
  platform: PlatformId;
  /** URL slug for the hub page */
  slug: string;
  /** Display name (may differ from platform, e.g. "X (Twitter)") */
  displayName: string;
  /** Short name for breadcrumbs */
  breadcrumbName: string;
  /** Full page title for <title> */
  title: string;
  /** Meta description */
  metaDescription: string;
  /** OG title */
  ogTitle: string;
  /** OG description */
  ogDescription: string;
  /** Hero H1 text */
  h1: string;
  /** Hero subtitle paragraph */
  heroDescription: string;
  /** Tailwind gradient classes for accent elements */
  accentGradient: string;
  /** 3 key stats for the platform */
  keyStats: [KeyStat, KeyStat, KeyStat];
  /** Educational content sections (2-3 per platform) */
  educationalSections: EducationalSection[];
  /** FAQ items (6-8 per platform) */
  faq: FAQItem[];
  /** OG image configuration */
  ogImage: {
    title: string;
    subtitle: string;
    stats: [OgStat, OgStat, OgStat];
  };
}

interface KeyStat {
  label: string;
  value: string;
}

interface OgStat {
  label: string;
  value: string;
}

interface EducationalSection {
  title: string;
  paragraphs: string[];
}

// ─── YouTube ────────────────────────────────────────────────────────────────────

const youtubeHub: PlatformHubData = {
  platform: 'YouTube',
  slug: 'youtube',
  displayName: 'YouTube',
  breadcrumbName: 'YouTube',
  title: 'Free YouTube Calculators — Earnings, Growth & Sponsorship Tools',
  metaDescription:
    'Free YouTube calculators for creators. Estimate ad revenue, project subscriber growth, calculate sponsorship rates, and analyze Shorts earnings. Updated for 2026.',
  ogTitle: 'Free YouTube Calculators for Creators',
  ogDescription:
    'Estimate YouTube earnings, project subscriber growth, and calculate sponsorship rates — all free.',
  h1: 'YouTube Calculators for Creators',
  heroDescription:
    'Estimate your YouTube ad revenue, project subscriber growth, calculate sponsorship rates, and analyze Shorts earnings — all free, no sign-up required.',
  accentGradient: 'from-red-500 via-red-600 to-red-700',
  keyStats: [
    { label: 'Avg CPM Range', value: '$5 – $18' },
    { label: 'Creator Revenue Share', value: '55%' },
    { label: 'Free Tools', value: '4' },
  ],
  educationalSections: [
    {
      title: 'How YouTube Monetization Works',
      paragraphs: [
        'YouTube pays creators through the YouTube Partner Program (YPP), which requires at least 1,000 subscribers and 4,000 watch hours (or 10 million Shorts views) in the past 12 months. Once accepted, creators earn a share of the ad revenue generated on their videos.',
        'YouTube keeps 45% of ad revenue and pays creators 55%. The amount you earn depends on your CPM (cost per thousand impressions) and RPM (revenue per thousand views). CPM varies dramatically by niche — finance and technology channels often see $15–$30 CPM, while entertainment or gaming channels may see $3–$8.',
        'Beyond ad revenue, YouTube creators can monetize through channel memberships, Super Chats during live streams, merchandise shelves, and brand sponsorships. Our calculators help you estimate earnings across all these revenue streams.',
      ],
    },
    {
      title: 'YouTube Shorts vs Long-Form Earnings',
      paragraphs: [
        'YouTube Shorts earn significantly less per view than long-form content. Shorts RPM typically ranges from $0.03 to $0.08 per 1,000 views, compared to $2–$8 RPM for standard videos. However, Shorts can generate millions of views quickly, making them a viable growth and discovery tool.',
        'The most effective YouTube strategy combines both formats: Shorts for audience growth and discovery, and long-form videos for monetization. Use our Shorts Money Calculator to estimate your short-form revenue and our Money Calculator for long-form projections.',
      ],
    },
    {
      title: 'Growing Your YouTube Channel',
      paragraphs: [
        'Subscriber growth on YouTube follows a compounding curve — each new subscriber increases your reach, which brings more subscribers. Growth rates vary by niche: tech channels average 3–5% monthly growth, while entertainment channels may see 5–10%. Our Growth Projector models these curves to show when you will hit key milestones like 1K, 10K, and 100K subscribers.',
        'Consistency matters more than virality. Channels that upload 2–3 times per week grow 3.5x faster than those uploading once a month. Pair regular uploads with SEO-optimized titles, engaging thumbnails, and strong audience retention to maximize algorithmic reach.',
      ],
    },
  ],
  faq: [
    {
      question: 'How much do YouTubers make per 1,000 views?',
      answer:
        'Most YouTubers earn $2–$8 per 1,000 views (RPM) for long-form content, though this varies significantly by niche and audience geography. Finance and tech channels can earn $10–$25 per 1,000 views, while gaming and entertainment channels typically earn $2–$5. YouTube Shorts earn much less — typically $0.03–$0.08 per 1,000 views.',
    },
    {
      question: 'How many subscribers do you need to make money on YouTube?',
      answer:
        'You need at least 1,000 subscribers and 4,000 watch hours in the past 12 months to join the YouTube Partner Program and earn ad revenue. Alternatively, you can qualify with 1,000 subscribers and 10 million Shorts views. Sponsorship income can start earlier — many brands work with creators who have as few as 5,000 engaged subscribers.',
    },
    {
      question: 'How much do YouTube Shorts pay?',
      answer:
        'YouTube Shorts pay between $0.03 and $0.08 per 1,000 views through the Shorts revenue sharing model introduced in 2023. This is significantly lower than long-form content, but Shorts can accumulate millions of views quickly. A Short with 1 million views might earn $30–$80.',
    },
    {
      question: 'What is CPM vs RPM on YouTube?',
      answer:
        'CPM (Cost Per Mille) is what advertisers pay per 1,000 ad impressions. RPM (Revenue Per Mille) is what you actually earn per 1,000 views after YouTube takes its 45% cut and accounting for videos where no ad was shown. RPM is always lower than CPM and is the more useful metric for estimating creator earnings.',
    },
    {
      question: 'Which YouTube niches pay the most?',
      answer:
        'The highest-paying YouTube niches in 2026 are finance ($15–$30 CPM), technology ($12–$25 CPM), business/entrepreneurship ($10–$22 CPM), and health/medical ($8–$18 CPM). These niches attract high-value advertisers willing to pay premium rates. Entertainment and gaming typically pay $3–$8 CPM.',
    },
    {
      question: 'How much do YouTube sponsorships pay?',
      answer:
        'YouTube sponsorship rates typically range from $20–$50 per 1,000 subscribers for a dedicated video, though rates vary widely based on niche, engagement rate, and deal type. A channel with 100,000 subscribers might charge $2,000–$5,000 for an integrated sponsorship or $5,000–$15,000 for a dedicated video.',
    },
    {
      question: 'Are these YouTube calculators free?',
      answer:
        'Yes, all four YouTube calculators on CreatiCalc are completely free with no sign-up required. You can estimate ad revenue, project subscriber growth, calculate sponsorship rates, and analyze Shorts earnings as many times as you want.',
    },
  ],
  ogImage: {
    title: 'YouTube Creator Calculators',
    subtitle: 'Earnings, growth, sponsorships & Shorts — all free',
    stats: [
      { label: 'Avg CPM', value: '$5–$18' },
      { label: 'Calculators', value: '4' },
      { label: 'Revenue Split', value: '55%' },
    ],
  },
};

// ─── Instagram ──────────────────────────────────────────────────────────────────

const instagramHub: PlatformHubData = {
  platform: 'Instagram',
  slug: 'instagram',
  displayName: 'Instagram',
  breadcrumbName: 'Instagram',
  title: 'Free Instagram Calculators — Engagement Rate & Sponsorship Tools',
  metaDescription:
    'Free Instagram calculators for creators. Calculate your engagement rate, benchmark against industry averages, and find out how much to charge for sponsored posts. Updated for 2026.',
  ogTitle: 'Free Instagram Calculators for Creators',
  ogDescription: 'Calculate your Instagram engagement rate and sponsorship pricing — all free.',
  h1: 'Instagram Calculators for Creators',
  heroDescription:
    'Calculate your Instagram engagement rate, benchmark against industry averages, and find out how much to charge for sponsored posts, Reels, Stories, and carousels — all free.',
  accentGradient: 'from-pink-500 via-purple-500 to-orange-400',
  keyStats: [
    { label: 'Avg Engagement Rate', value: '0.98%' },
    { label: 'Avg Sponsorship CPM', value: '$10 – $25' },
    { label: 'Free Tools', value: '2' },
  ],
  educationalSections: [
    {
      title: 'How Instagram Engagement Rate Is Calculated',
      paragraphs: [
        'Instagram engagement rate measures how actively your audience interacts with your content. The standard formula divides total interactions (likes, comments, and saves) by your follower count and multiplies by 100. This is the metric brands use when evaluating creators for partnerships.',
        'Average Instagram engagement rates have declined steadily as the platform has grown, dropping from 3.5% in 2020 to around 0.98% in 2026. However, rates vary significantly by follower tier: nano creators (under 10K followers) typically see 2–4%, while mega creators (1M+) may only see 0.3–0.8%. Our calculator benchmarks your rate against your specific tier and niche.',
      ],
    },
    {
      title: 'Instagram Sponsorship Pricing in 2026',
      paragraphs: [
        'Instagram sponsorship rates depend on follower count, engagement rate, content type, and niche. A micro-influencer (10K–50K followers) typically charges $100–$500 per post, while a macro-influencer (500K–1M) may charge $5,000–$20,000. Reels command a premium of 1.5–2x over static posts due to higher reach and engagement.',
        'Engagement rate is the single most important factor in determining sponsorship value. A creator with 50,000 followers and 5% engagement is often more valuable to brands than one with 500,000 followers and 0.5% engagement. Use our Sponsorship Rate Calculator to get a personalized rate card based on your specific metrics.',
      ],
    },
    {
      title: 'Reels vs Feed Posts vs Stories',
      paragraphs: [
        'Instagram Reels consistently outperform feed posts for reach and engagement, with the algorithm favoring short-form video content. Reels reach 2–3x more non-followers than carousel posts, making them essential for growth. Stories have the lowest reach (typically 5–10% of followers) but the highest engagement-per-view ratio.',
        'For maximum impact, combine all three formats: Reels for discovery and growth, carousels for in-depth content and saves, and Stories for daily connection and direct engagement with your existing audience.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is a good Instagram engagement rate?',
      answer:
        'A good Instagram engagement rate depends on your follower count. For nano creators (under 10K followers), 2–4% is average and above 4% is excellent. For mid-tier creators (50K–500K), 1–2% is average and above 2.5% is excellent. For mega creators (1M+), 0.3–0.8% is typical. Our calculator benchmarks your rate against your specific follower tier.',
    },
    {
      question: 'How much should I charge for an Instagram sponsored post?',
      answer:
        'A common baseline is $100 per 10,000 followers, but rates vary significantly based on engagement rate, niche, and content type. Creators in high-value niches like finance or beauty can charge 2–3x the baseline. Reels typically command 1.5–2x more than static posts. Use our Sponsorship Rate Calculator for a personalized rate card.',
    },
    {
      question: 'How is Instagram engagement rate calculated?',
      answer:
        'The standard formula is: (Likes + Comments + Saves) / Followers x 100. Some creators also track engagement by reach (dividing by the number of unique viewers) or by impressions (dividing by total views including repeats). The follower-based formula is the industry standard used by brands and agencies.',
    },
    {
      question: 'Why is my Instagram engagement rate low?',
      answer:
        'Common reasons include: posting at suboptimal times, using irrelevant hashtags, having a high percentage of inactive or bot followers, posting inconsistently, or sharing content that does not resonate with your specific audience. Engagement rates also naturally decrease as follower count grows — this is expected and not necessarily a problem.',
    },
    {
      question: 'Do Instagram Reels get more engagement than posts?',
      answer:
        'Yes, Instagram Reels typically generate 2–3x more reach than feed posts and significantly higher engagement from non-followers. However, carousel posts tend to generate more saves and shares, which are weighted heavily by the algorithm. The best strategy combines both formats.',
    },
    {
      question: 'Are these Instagram calculators free?',
      answer:
        'Yes, both Instagram calculators on CreatiCalc are completely free with no sign-up required. Calculate your engagement rate and sponsorship pricing as many times as you want.',
    },
  ],
  ogImage: {
    title: 'Instagram Creator Calculators',
    subtitle: 'Engagement rate & sponsorship pricing — all free',
    stats: [
      { label: 'Avg ER', value: '0.98%' },
      { label: 'Calculators', value: '2' },
      { label: 'Sponsor CPM', value: '$10–$25' },
    ],
  },
};

// ─── TikTok ─────────────────────────────────────────────────────────────────────

const tiktokHub: PlatformHubData = {
  platform: 'TikTok',
  slug: 'tiktok',
  displayName: 'TikTok',
  breadcrumbName: 'TikTok',
  title: 'Free TikTok Calculators — Engagement Rate & Sponsorship Tools',
  metaDescription:
    'Free TikTok calculators for creators. Calculate your engagement rate, benchmark against TikTok averages, and find out how much to charge for sponsored content. Updated for 2026.',
  ogTitle: 'Free TikTok Calculators for Creators',
  ogDescription: 'Calculate your TikTok engagement rate and sponsorship pricing — all free.',
  h1: 'TikTok Calculators for Creators',
  heroDescription:
    'Calculate your TikTok engagement rate, benchmark against TikTok-specific averages, and find out how much to charge for sponsored videos, Stories, and Lives — all free.',
  accentGradient: 'from-cyan-400 via-pink-500 to-red-500',
  keyStats: [
    { label: 'Avg Engagement Rate', value: '4.9%' },
    { label: 'Avg Sponsorship CPM', value: '$5 – $15' },
    { label: 'Free Tools', value: '2' },
  ],
  educationalSections: [
    {
      title: 'Why TikTok Has the Highest Engagement Rates',
      paragraphs: [
        "TikTok consistently leads all social platforms in engagement rate, averaging 4.9% compared to Instagram's 0.98% and Facebook's 0.065%. This is driven by TikTok's algorithm, which surfaces content based on interest rather than follower relationships, giving every video a chance to reach a wide audience.",
        "TikTok's auto-playing, full-screen video format also encourages higher interaction rates. Users are more likely to like, comment, and share when content fills their entire screen and plays automatically. For creators, this means even accounts with smaller followings can achieve high engagement and rapid growth.",
      ],
    },
    {
      title: 'TikTok Sponsorship Rates in 2026',
      paragraphs: [
        "TikTok sponsorship rates are generally lower per-follower than Instagram due to the platform's younger audience demographics and the ephemeral nature of content. However, TikTok's higher engagement rates mean that sponsored content often reaches more people organically, delivering strong ROI for brands.",
        'Typical rates range from $50–$200 for nano creators (under 10K), $200–$2,000 for micro-influencers (10K–100K), and $2,000–$20,000 for macro and mega creators. TikTok Lives and multi-video packages typically command premium rates. Use our Sponsorship Rate Calculator for personalized pricing.',
      ],
    },
    {
      title: 'TikTok vs Instagram for Creators',
      paragraphs: [
        'TikTok offers faster organic growth and higher engagement rates, making it ideal for discovery and building an audience quickly. Instagram offers higher sponsorship CPMs and more diverse monetization options (Stories, carousels, shopping). Many successful creators use both platforms, repurposing content across TikTok and Instagram Reels.',
        "When evaluating your performance, avoid comparing TikTok and Instagram engagement rates directly — TikTok's are naturally 3–5x higher due to platform mechanics. Our calculators benchmark each platform separately using platform-specific data.",
      ],
    },
  ],
  faq: [
    {
      question: 'What is a good TikTok engagement rate?',
      answer:
        'The average TikTok engagement rate is around 4.9%. Rates above 6% are considered good, and above 10% is excellent. Nano creators (under 10K followers) typically see 7–12%, while mega creators (1M+) average 3–5%. TikTok engagement rates are naturally much higher than Instagram or Facebook.',
    },
    {
      question: 'How is TikTok engagement rate calculated?',
      answer:
        'TikTok engagement rate by followers is: (Likes + Comments + Shares) / Followers x 100. You can also calculate engagement by views: (Likes + Comments + Shares) / Video Views x 100. The by-followers formula is the industry standard for brand partnerships, while by-views gives a more accurate picture of individual video performance.',
    },
    {
      question: 'How much do TikTok sponsorships pay?',
      answer:
        "TikTok sponsorship rates vary widely. Nano creators (under 10K) typically earn $50–$200 per sponsored video, micro-influencers (10K–100K) earn $200–$2,000, mid-tier (100K–500K) earn $2,000–$8,000, and mega creators (1M+) can earn $10,000–$50,000+. Rates depend heavily on niche, engagement rate, and the brand's budget.",
    },
    {
      question: 'Does TikTok pay creators directly?',
      answer:
        'TikTok offers the Creativity Program (replacing the older Creator Fund), which pays creators based on video performance. Earnings are modest — typically $0.50–$1.00 per 1,000 qualified views. Most TikTok creator income comes from brand sponsorships, affiliate marketing, and driving traffic to other platforms or products.',
    },
    {
      question: 'Why is my TikTok engagement rate dropping?',
      answer:
        'TikTok engagement rates naturally decrease as your follower count grows. Other common causes include changes in content style, posting frequency, or the TikTok algorithm. Engagement also drops when a viral video brings in followers who are not your core audience. Focus on consistency and audience retention over raw follower count.',
    },
    {
      question: 'Are these TikTok calculators free?',
      answer:
        'Yes, both TikTok calculators on CreatiCalc are completely free with no sign-up required. Calculate your engagement rate and sponsorship pricing as many times as you want.',
    },
  ],
  ogImage: {
    title: 'TikTok Creator Calculators',
    subtitle: 'Engagement rate & sponsorship pricing — all free',
    stats: [
      { label: 'Avg ER', value: '4.9%' },
      { label: 'Calculators', value: '2' },
      { label: 'Sponsor CPM', value: '$5–$15' },
    ],
  },
};

// ─── Facebook ───────────────────────────────────────────────────────────────────

const facebookHub: PlatformHubData = {
  platform: 'Facebook',
  slug: 'facebook',
  displayName: 'Facebook',
  breadcrumbName: 'Facebook',
  title: 'Free Facebook Calculators — Engagement Rate & Sponsorship Tools',
  metaDescription:
    'Free Facebook calculators for creators and page managers. Calculate your engagement rate, compare against benchmarks, and find out how much to charge for sponsored content. Updated for 2026.',
  ogTitle: 'Free Facebook Calculators for Creators',
  ogDescription: 'Calculate your Facebook engagement rate and sponsorship pricing — all free.',
  h1: 'Facebook Calculators for Creators',
  heroDescription:
    'Calculate your Facebook Page engagement rate, benchmark against industry averages, and find out how much to charge for sponsored posts, Reels, Stories, and Lives — all free.',
  accentGradient: 'from-blue-500 via-blue-600 to-indigo-500',
  keyStats: [
    { label: 'Avg Engagement Rate', value: '0.065%' },
    { label: 'Monthly Active Users', value: '3.07B' },
    { label: 'Free Tools', value: '2' },
  ],
  educationalSections: [
    {
      title: 'Understanding Facebook Engagement Rates',
      paragraphs: [
        "Facebook has the lowest organic engagement rates of any major social platform, averaging just 0.065% in 2026. This is primarily due to Facebook's algorithm heavily prioritizing paid content and personal connections over organic page posts. Despite this, Facebook remains the world's largest social network with over 3 billion monthly active users.",
        'Facebook engagement is measured by reactions (like, love, haha, wow, sad, angry), comments, and shares. Unlike Instagram, Facebook does not have a native "save" feature, so shares carry more weight as a signal of content quality. Our calculator uses the standard formula: (Reactions + Comments + Shares) / Followers x 100.',
      ],
    },
    {
      title: 'Facebook Sponsorship Opportunities',
      paragraphs: [
        "While Facebook's organic reach has declined, the platform still offers valuable sponsorship opportunities, particularly for creators with engaged niche audiences. Facebook Groups, Reels, and Live videos tend to generate higher engagement than standard page posts, making them attractive formats for brand partnerships.",
        "Facebook sponsorship rates are generally lower than Instagram on a per-follower basis, but the platform's massive user base and detailed targeting capabilities make it appealing to brands focused on specific demographics. Creators with strong Facebook communities often command premium rates for their ability to drive authentic engagement.",
      ],
    },
    {
      title: 'Facebook Reels and Video Content',
      paragraphs: [
        'Facebook Reels, launched to compete with TikTok and Instagram Reels, have become the highest-reach format on the platform. Facebook is actively promoting Reels in the feed, giving creators who adopt the format a significant reach advantage over those posting only static content.',
        'Video content on Facebook generates 1.5–2x more engagement than text or image posts. Live videos perform even better, generating 6x more interactions than regular video posts on average. If you are a Facebook creator, prioritizing video and Reels can significantly improve your engagement rate.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is a good Facebook engagement rate?',
      answer:
        'The average Facebook Page engagement rate is around 0.065%. Rates above 0.1% are considered good, and above 0.2% is excellent. Facebook has the lowest organic engagement of any major platform due to the algorithm prioritizing paid content. Smaller pages (under 10K followers) tend to see higher rates of 0.15–0.5%.',
    },
    {
      question: 'Why are Facebook engagement rates so low?',
      answer:
        "Facebook's algorithm has progressively reduced organic reach for business pages to drive ad revenue. In 2026, the average Facebook Page post reaches only 2–5% of followers organically. This low reach directly translates to lower engagement rates. Facebook Groups and Reels tend to perform better than standard page posts.",
    },
    {
      question: 'How much do Facebook sponsorships pay?',
      answer:
        'Facebook sponsorship rates vary based on follower count, engagement, and niche. Typical rates range from $50–$250 for nano creators, $250–$1,500 for micro-influencers, and $2,000–$15,000 for macro and mega creators. Video and Reels content typically commands higher rates than static posts.',
    },
    {
      question: 'How is Facebook engagement rate calculated?',
      answer:
        'Facebook engagement rate is: (Reactions + Comments + Shares) / Page Followers x 100. You can also calculate by reach: (Reactions + Comments + Shares) / Post Reach x 100. The follower-based formula is the industry standard, while the reach-based formula gives a more accurate view of how engaging your content is to people who actually see it.',
    },
    {
      question: 'Is Facebook still relevant for creators in 2026?',
      answer:
        'Yes, despite lower organic engagement, Facebook remains the largest social network globally. It is particularly valuable for creators targeting older demographics (35+), building communities through Facebook Groups, and leveraging Facebook Reels for discovery. The platform also integrates with Instagram, allowing cross-platform content distribution.',
    },
    {
      question: 'Are these Facebook calculators free?',
      answer:
        'Yes, both Facebook calculators on CreatiCalc are completely free with no sign-up required. Calculate your engagement rate and sponsorship pricing as many times as you want.',
    },
  ],
  ogImage: {
    title: 'Facebook Creator Calculators',
    subtitle: 'Engagement rate & sponsorship pricing — all free',
    stats: [
      { label: 'Avg ER', value: '0.065%' },
      { label: 'Calculators', value: '2' },
      { label: 'MAU', value: '3.07B' },
    ],
  },
};

// ─── X (Twitter) ────────────────────────────────────────────────────────────────

const xHub: PlatformHubData = {
  platform: 'X',
  slug: 'x',
  displayName: 'X (Twitter)',
  breadcrumbName: 'X (Twitter)',
  title: 'Free X (Twitter) Calculators — Engagement Rate & Sponsorship Tools',
  metaDescription:
    'Free X (Twitter) calculators for creators. Calculate your engagement rate, benchmark against X averages, and find out how much to charge for sponsored tweets and threads. Updated for 2026.',
  ogTitle: 'Free X (Twitter) Calculators for Creators',
  ogDescription: 'Calculate your X engagement rate and sponsorship pricing — all free.',
  h1: 'X (Twitter) Calculators for Creators',
  heroDescription:
    'Calculate your X engagement rate, benchmark against platform averages, and find out how much to charge for sponsored tweets, threads, and Spaces — all free.',
  accentGradient: 'from-sky-400 via-blue-500 to-indigo-400',
  keyStats: [
    { label: 'Avg Engagement Rate', value: '0.03%' },
    { label: 'Avg Sponsorship CPM', value: '$5 – $12' },
    { label: 'Free Tools', value: '2' },
  ],
  educationalSections: [
    {
      title: 'How X Engagement Is Measured',
      paragraphs: [
        'X (formerly Twitter) measures engagement through likes, replies, reposts (retweets), bookmarks, and link clicks. The standard engagement rate formula divides total interactions by follower count and multiplies by 100. X also provides impression-based metrics, allowing creators to calculate engagement per view.',
        "X has the second-lowest engagement rates of major platforms, averaging around 0.03%. This is partly because X's real-time, text-based format encourages browsing and consumption rather than active interaction. However, highly engaged niches like tech, politics, and creator economy can see significantly higher rates.",
      ],
    },
    {
      title: 'X Sponsorship and Monetization',
      paragraphs: [
        'X offers several monetization paths for creators: the X Premium creator revenue sharing program (based on ad revenue from verified replies), tip jars, subscriptions, and brand sponsorships. Sponsored tweets and threads are the primary income source for most X creators.',
        "Sponsorship rates on X are generally lower per-follower than Instagram or YouTube, but the platform's real-time nature and highly engaged niche communities make it valuable for B2B, tech, and thought leadership content. Threads tend to generate 2–3x the engagement of single tweets, making them a popular format for sponsored content.",
      ],
    },
    {
      title: 'Growing Your X Audience',
      paragraphs: [
        'Growth on X is driven by consistent posting, engaging in conversations, and creating shareable threads. The X algorithm rewards content that generates replies and bookmarks, not just likes. Posting 3–5 times per day with a mix of original thoughts, threads, and replies to larger accounts is the most effective growth strategy.',
        'X Spaces (live audio conversations) can accelerate growth by connecting you with other creators and new audiences. Creators who host or co-host regular Spaces often see faster follower growth than those who only post text content.',
      ],
    },
  ],
  faq: [
    {
      question: 'What is a good engagement rate on X (Twitter)?',
      answer:
        'The average X engagement rate is around 0.03%. Rates above 0.05% are considered good, and above 0.1% is excellent. Engagement rates on X are much lower than on visual platforms like Instagram or TikTok because the text-based format encourages passive consumption. Niche accounts with highly engaged audiences often see 0.1–0.5%.',
    },
    {
      question: 'How is X engagement rate calculated?',
      answer:
        'X engagement rate by followers is: (Likes + Replies + Reposts + Bookmarks) / Followers x 100. You can also calculate by impressions: (Likes + Replies + Reposts + Bookmarks) / Impressions x 100. The follower-based formula is the industry standard for brand partnerships.',
    },
    {
      question: 'How much do X sponsorships pay?',
      answer:
        'X sponsorship rates depend on follower count, engagement, and niche. Typical rates range from $50–$200 for nano creators, $200–$1,500 for micro-influencers, and $2,000–$15,000 for macro and mega creators. Sponsored threads typically command higher rates than single tweets. X Spaces sponsorships are an emerging category with premium pricing.',
    },
    {
      question: 'Does X pay creators directly?',
      answer:
        'Yes, X Premium (formerly Twitter Blue) includes a creator revenue sharing program that pays creators a portion of ad revenue generated from verified replies to their posts. Earnings depend on the volume and quality of engagement on your content. Most X creator income still comes from sponsorships, consulting, and driving traffic to external products.',
    },
    {
      question: 'Should I call it X or Twitter?',
      answer:
        'The platform is officially "X" since the 2023 rebrand, but many users and brands still refer to it as Twitter. For maximum search visibility, we use "X (Twitter)" throughout our calculators. When pitching to brands, use whichever term your audience is most familiar with.',
    },
    {
      question: 'Are these X calculators free?',
      answer:
        'Yes, both X (Twitter) calculators on CreatiCalc are completely free with no sign-up required. Calculate your engagement rate and sponsorship pricing as many times as you want.',
    },
  ],
  ogImage: {
    title: 'X (Twitter) Creator Calculators',
    subtitle: 'Engagement rate & sponsorship pricing — all free',
    stats: [
      { label: 'Avg ER', value: '0.03%' },
      { label: 'Calculators', value: '2' },
      { label: 'Sponsor CPM', value: '$5–$12' },
    ],
  },
};

// ─── Exports ────────────────────────────────────────────────────────────────────

export const PLATFORM_HUBS: PlatformHubData[] = [
  youtubeHub,
  instagramHub,
  tiktokHub,
  facebookHub,
  xHub,
];

/** Lookup a single platform hub by its URL slug. */
export function getPlatformHub(slug: string): PlatformHubData | undefined {
  return PLATFORM_HUBS.find((h) => h.slug === slug);
}

/** Lookup a platform hub by the platform ID (matches calculatorRegistry.platform). */
export function getPlatformHubByPlatform(platform: PlatformId): PlatformHubData | undefined {
  return PLATFORM_HUBS.find((h) => h.platform === platform);
}

/** Get all platform hub slugs (for sitemap, static generation, etc.). */
export function getAllPlatformHubSlugs(): string[] {
  return PLATFORM_HUBS.map((h) => h.slug);
}
