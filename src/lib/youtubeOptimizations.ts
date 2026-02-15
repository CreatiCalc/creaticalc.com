import { formatUSD } from './formatters';
import {
  NICHES,
  getNiche,
  SHORTS_RPM,
  projectEarnings,
  type NicheId,
  type ProjectionInput,
  type ProjectionResult,
  type OptimizationTip,
} from './youtubeEarningsModel';

// ─── Growth Tactics ─────────────────────────────────────────────────────────

const GROWTH_TACTICS: Omit<OptimizationTip, 'category'>[] = [
  {
    id: 'thumbnails',
    title: 'Optimize thumbnails for CTR',
    detail:
      "A 1% CTR improvement can boost impressions 20–30%. Use bright colors, readable text (max 4 words), and expressive faces. A/B test with YouTube's built-in thumbnail testing feature.",
  },
  {
    id: 'retention',
    title: 'Improve audience retention',
    detail:
      "YouTube promotes videos with high average view duration. Hook viewers in the first 30 seconds, use pattern interrupts every 2–3 minutes, and preview what's coming later to keep them watching.",
  },
  {
    id: 'first-hour',
    title: 'Engage in the first hour after upload',
    detail:
      "Reply to every comment in the first hour after upload. Pin a question as the first comment to spark discussion. YouTube's algorithm weights early engagement signals heavily when deciding how widely to recommend a video.",
  },
  {
    id: 'video-seo',
    title: 'Optimize titles and descriptions for search',
    detail:
      "Put your target keyword in the first 60 characters of your title. Write descriptions of 200+ words with natural keyword usage. Search-optimized videos earn views for years — they're the compound interest of YouTube.",
  },
  {
    id: 'playlists',
    title: 'Use playlists to chain views',
    detail:
      'Group related videos into playlists. When one video ends, the next auto-plays, increasing your total session watch time and ad impressions per viewer. Channels using playlists see 10–20% higher overall watch time.',
  },
  {
    id: 'end-screens',
    title: 'Add end screens to every video',
    detail:
      'End screens drive 10–20% more views on linked content. Always link to your best-performing related video and a playlist. The last 20 seconds of your video should visually direct viewers to click.',
  },
  {
    id: 'consistency',
    title: 'Upload on a consistent schedule',
    detail:
      'Channels that upload on predictable days train their audience to return. Pick 1–3 upload days and stick to them. Consistent uploaders see 15–25% higher day-1 views because subscribers anticipate new content.',
  },
  {
    id: 'collabs',
    title: 'Collaborate with similar creators',
    detail:
      'A single collaboration with a similar-sized creator in an adjacent niche can bring 5–15% new subscribers. Reach out to creators with complementary content — their audience already likes your type of content.',
  },
];

function selectGrowthTactics(nicheId: NicheId, count: number): OptimizationTip[] {
  // Use nicheId to deterministically pick tactics so they're stable per niche
  const nicheIndex = NICHES.findIndex((n) => n.id === nicheId);
  const selected: OptimizationTip[] = [];
  for (let i = 0; i < count && i < GROWTH_TACTICS.length; i++) {
    const idx = (nicheIndex + i * 3) % GROWTH_TACTICS.length;
    const tactic = GROWTH_TACTICS[idx];
    if (!selected.some((s) => s.id === tactic.id)) {
      selected.push({ ...tactic, category: 'growth' });
    }
  }
  // Fill remaining if deduplication reduced count
  for (const tactic of GROWTH_TACTICS) {
    if (selected.length >= count) break;
    if (!selected.some((s) => s.id === tactic.id)) {
      selected.push({ ...tactic, category: 'growth' });
    }
  }
  return selected.slice(0, count);
}

// ─── Optimization Tips ───────────────────────────────────────────────────────

export function generateOptimizationTips(
  input: ProjectionInput,
  projection: ProjectionResult
): OptimizationTip[] {
  const tips: OptimizationTip[] = [];
  const currentMonthlyMid = projection.summary.monthly.mid;
  const isShorts = input.contentFormat === 'shorts';
  const niche = getNiche(input.nicheId);

  // ── Revenue tips (with dollar impact) ──

  // Video length: short → standard (unlock mid-rolls)
  if (!isShorts && input.videoLength === 'short') {
    const upgraded = projectEarnings({ ...input, videoLength: 'standard' });
    const impact = upgraded.summary.monthly.mid - currentMonthlyMid;
    if (impact > 0) {
      tips.push({
        id: 'midroll-unlock',
        category: 'revenue',
        title: 'Enable mid-roll ads',
        detail: `Videos under 8 minutes can only show pre-roll and post-roll ads. Making your content 8+ minutes unlocks mid-roll ads, which typically increases RPM by ~43%. At your current view count, that's an extra ${formatUSD(impact)}/mo.`,
        impactValue: impact,
        impact: `+${formatUSD(impact)}/mo`,
        scenario: { videoLength: 'standard' },
      });
    }
  }

  // Video length: standard → long (more mid-rolls)
  if (!isShorts && input.videoLength === 'standard') {
    const upgraded = projectEarnings({ ...input, videoLength: 'long' });
    const impact = upgraded.summary.monthly.mid - currentMonthlyMid;
    if (impact > 0) {
      tips.push({
        id: 'midroll-more',
        category: 'revenue',
        title: 'Maximize mid-roll placements',
        detail: `Videos over 20 minutes allow multiple mid-roll ad breaks, boosting RPM by ~30% compared to standard-length videos. That adds ${formatUSD(impact)}/mo at your current views. Consider in-depth tutorials, deep dives, or compilation formats.`,
        impactValue: impact,
        impact: `+${formatUSD(impact)}/mo`,
        scenario: { videoLength: 'long' },
      });
    }
  }

  // Audience geography
  const highCpmPct = input.highCpmAudiencePct ?? 50;
  if (highCpmPct < 65) {
    const targetPct = Math.min(highCpmPct + 20, 80);
    const upgraded = projectEarnings({ ...input, highCpmAudiencePct: targetPct });
    const impact = upgraded.summary.monthly.mid - currentMonthlyMid;
    if (impact > 0) {
      tips.push({
        id: 'audience-geo',
        category: 'revenue',
        title: 'Grow your high-CPM audience',
        detail: `Viewers from US/UK/CA/AU pay 3–5x more per ad impression. Shifting your audience mix from ${highCpmPct}% to ${targetPct}% high-CPM regions would add ${formatUSD(impact)}/mo. Strategies: use English titles and trending US topics, post at 6–9pm EST, and create content around US cultural moments.`,
        impactValue: impact,
        impact: `+${formatUSD(impact)}/mo`,
        scenario: { highCpmAudiencePct: targetPct },
      });
    }
  }

  // Seasonality
  if (!input.seasonalityEnabled) {
    const seasonal = projectEarnings({ ...input, seasonalityEnabled: true });
    const avgImpact = seasonal.totals.mid / 12 - currentMonthlyMid;
    tips.push({
      id: 'seasonality',
      category: 'revenue',
      title: 'Plan for seasonal ad rate changes',
      detail: `YouTube ad rates swing up to 75% throughout the year. Q4 (Oct–Dec) sees CPMs surge 30–40% above average as holiday advertisers compete for placements, while January dips ~20%. Enable seasonality to see exactly when your highest-earning months will be.`,
      impactValue: Math.abs(avgImpact),
      impact: avgImpact > 0 ? `+${formatUSD(avgImpact)}/mo avg` : undefined,
      scenario: { seasonalityEnabled: true },
    });
  }

  // Growth compounding
  if (input.monthlyGrowthRate === 0) {
    const grown = projectEarnings({ ...input, monthlyGrowthRate: 0.05 });
    const month12Views = Math.round(input.dailyViews * Math.pow(1.05, 11));
    const month12Revenue = grown.months[11].revenue.mid;
    const impact = month12Revenue - currentMonthlyMid;
    if (impact > 0) {
      tips.push({
        id: 'growth-compound',
        category: 'revenue',
        title: 'Start compounding growth',
        detail: `Even 5% monthly growth compounds fast. Your ${input.dailyViews.toLocaleString()} daily views would become ${month12Views.toLocaleString()} in 12 months — earning ${formatUSD(month12Revenue)}/mo by year-end instead of ${formatUSD(currentMonthlyMid)}/mo today.`,
        impactValue: impact,
        impact: `${formatUSD(month12Revenue)}/mo by month 12`,
        scenario: { monthlyGrowthRate: 0.05 },
      });
    }
  }

  // ── Strategy tips (contextual, no scenario) ──

  if (!isShorts) {
    tips.push({
      id: 'shorts-funnel',
      category: 'strategy',
      title: 'Use Shorts to grow your audience',
      detail: `Shorts get 10–50x the reach of longform videos with minimal production effort. Top creators use them to funnel subscribers to their longform content where they earn $${niche.rpm.mid.toFixed(2)} RPM — that's ${Math.round(niche.rpm.mid / SHORTS_RPM.mid)}x more per view than Shorts. Even 1–2 Shorts per week can accelerate subscriber growth significantly.`,
    });
  }

  if (isShorts) {
    tips.push({
      id: 'longform-upsell',
      category: 'strategy',
      title: 'Add longform content for higher RPM',
      detail: `Longform ${niche.name} videos earn $${niche.rpm.low.toFixed(2)}–$${niche.rpm.high.toFixed(2)} RPM compared to $${SHORTS_RPM.low.toFixed(2)}–$${SHORTS_RPM.high.toFixed(2)} for Shorts — up to ${Math.round(niche.rpm.high / SHORTS_RPM.mid)}x more per view. Use Shorts to build your subscriber base, then convert those subscribers into longform viewers for dramatically higher ad revenue.`,
    });
  }

  if (input.dailyViews >= 1000) {
    const SPONSORSHIP_CPM_SHORTS = 6;
    const SPONSORSHIP_CPM_BY_NICHE: Partial<Record<NicheId, number>> = {
      finance: 50,
      tech: 35,
    };
    const SPONSORSHIP_CPM_DEFAULT = 20;
    const sponsorshipCpmMid = isShorts
      ? SPONSORSHIP_CPM_SHORTS
      : (SPONSORSHIP_CPM_BY_NICHE[niche.id] ?? SPONSORSHIP_CPM_DEFAULT);
    const estViewsPerVideo = input.dailyViews * 7;
    const sponsorPerVideo = (estViewsPerVideo / 1000) * sponsorshipCpmMid * (isShorts ? 0.3 : 1);
    tips.push({
      id: 'sponsorship',
      category: 'strategy',
      title: 'Explore sponsorship deals',
      detail: `At your view count in ${niche.name}, you could charge roughly ${formatUSD(sponsorPerVideo)} per sponsored ${isShorts ? 'Short' : 'video'}. Even 1 sponsored deal per month would add ${currentMonthlyMid > 0 ? Math.round((sponsorPerVideo / currentMonthlyMid) * 100) + '% to' : 'significantly to'} your total income. Check the Sponsorship Rates section above for a detailed estimate.`,
    });
  }

  if (!isShorts && input.dailyViews >= 500) {
    tips.push({
      id: 'diversify',
      category: 'strategy',
      title: 'Diversify your revenue streams',
      detail: `Top ${niche.name} creators earn only 30–40% of their income from YouTube ads. Consider adding channel memberships ($2–$25/mo per member), affiliate links (5–15% commission on recommended products), or digital products like courses and templates. Multiple revenue streams protect against algorithm changes and seasonal dips.`,
    });
  }

  // ── Growth tactics (rotate by niche) ──

  // Determine how many growth tactics to add to fill up to 6 total
  const revenueTips = tips.filter((t) => t.category === 'revenue');
  const strategyTips = tips.filter((t) => t.category === 'strategy');
  const tacticsNeeded = Math.max(1, 6 - revenueTips.length - strategyTips.length);
  const tactics = selectGrowthTactics(input.nicheId, tacticsNeeded);

  // ── Assemble final list ──

  // Sort revenue tips by impact (highest first)
  revenueTips.sort((a, b) => (b.impactValue ?? 0) - (a.impactValue ?? 0));

  return [...revenueTips, ...strategyTips, ...tactics].slice(0, 6);
}
