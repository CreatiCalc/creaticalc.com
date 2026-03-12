import type { Platform } from '@/lib/engagementBenchmarks';
import type { EngagementIndustryId } from '@/lib/niches';
import {
  INDUSTRY_BENCHMARKS,
  PLATFORM_AVERAGES,
  PLATFORM_NAMES,
  getTiers,
  formatPercent,
} from '@/lib/engagementBenchmarks';

interface NicheBenchmarkSectionProps {
  platform: Platform;
  industryId: EngagementIndustryId;
  nicheName: string;
}

export default function NicheBenchmarkSection({
  platform,
  industryId,
  nicheName,
}: NicheBenchmarkSectionProps) {
  const platformName = PLATFORM_NAMES[platform];
  const industry = INDUSTRY_BENCHMARKS.find((b) => b.id === industryId);
  if (!industry) return null;

  const nicheRate = industry[platform];
  const platformAvg = PLATFORM_AVERAGES[platform];
  const vsPlatformAvg = ((nicheRate / platformAvg - 1) * 100).toFixed(0);
  const isAboveAvg = nicheRate >= platformAvg;

  const sorted = [...INDUSTRY_BENCHMARKS].sort((a, b) => b[platform] - a[platform]);
  const rank = sorted.findIndex((b) => b.id === industryId) + 1;

  const tiers = getTiers(platform);

  const otherPlatforms = (Object.keys(PLATFORM_NAMES) as Platform[]).filter((p) => p !== platform);

  return (
    <section className="mt-12 space-y-10">
      <div>
        <h2 className="mb-4 text-2xl font-bold">
          {nicheName} Engagement Rate on {platformName}: Key Stats
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-white px-5 py-4 text-center">
            <p className="text-sm text-muted">Avg Engagement Rate</p>
            <p className="mt-1 text-2xl font-bold text-primary">{formatPercent(nicheRate)}</p>
          </div>
          <div className="rounded-lg border border-border bg-white px-5 py-4 text-center">
            <p className="text-sm text-muted">vs {platformName} Average</p>
            <p
              className={`mt-1 text-2xl font-bold ${isAboveAvg ? 'text-emerald-700' : 'text-red-700'}`}
            >
              {isAboveAvg ? '+' : ''}
              {vsPlatformAvg}%
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white px-5 py-4 text-center">
            <p className="text-sm text-muted">Niche Ranking</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              #{rank} <span className="text-base font-normal text-muted">of {sorted.length}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Follower tier benchmarks */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          {platformName} Engagement Rate by Follower Tier (2026)
        </h3>
        <p className="mb-4 text-sm text-muted">
          These are the general {platformName} engagement rate benchmarks by follower count.{' '}
          {nicheName} creators at {formatPercent(nicheRate)} can use these tiers to see where they
          fall relative to the broader {platformName} creator population.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="pb-2 pr-4 font-medium">Follower Tier</th>
                <th className="pb-2 pr-4 font-medium">Range</th>
                <th className="pb-2 pr-4 font-medium">Low</th>
                <th className="pb-2 pr-4 font-medium">High</th>
                <th className="pb-2 font-medium">Midpoint</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.tier} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 pr-4 font-medium text-foreground">{t.label}</td>
                  <td className="py-2.5 pr-4 text-muted">
                    {t.min.toLocaleString()}
                    {t.max === Infinity ? '+' : `–${t.max.toLocaleString()}`}
                  </td>
                  <td className="py-2.5 pr-4 text-muted">{formatPercent(t.benchmarkLow)}</td>
                  <td className="py-2.5 pr-4 text-muted">{formatPercent(t.benchmarkHigh)}</td>
                  <td className="py-2.5 text-primary">
                    {formatPercent((t.benchmarkLow + t.benchmarkHigh) / 2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Niche ranking */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          How {nicheName} Compares to Other {platformName} Niches (2026)
        </h3>
        <p className="mb-4 text-sm text-muted">
          {nicheName} ranks #{rank} out of {sorted.length} niches on {platformName}. The table below
          shows every tracked niche sorted by average engagement rate.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="pb-2 pr-4 font-medium">#</th>
                <th className="pb-2 pr-4 font-medium">Niche</th>
                <th className="pb-2 pr-4 font-medium">Avg Rate</th>
                <th className="pb-2 font-medium">vs Platform Avg</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => {
                const isCurrentNiche = row.id === industryId;
                const rate = row[platform];
                const rel = ((rate / platformAvg - 1) * 100).toFixed(0);
                const sign = Number(rel) >= 0 ? '+' : '';
                return (
                  <tr
                    key={row.id}
                    className={`border-b border-border/50 last:border-0 ${isCurrentNiche ? 'bg-primary/5' : ''}`}
                  >
                    <td className="py-2.5 pr-4 text-muted">{i + 1}</td>
                    <td
                      className={`py-2.5 pr-4 ${isCurrentNiche ? 'font-bold text-primary' : 'font-medium text-foreground'}`}
                    >
                      {row.name}
                      {isCurrentNiche && (
                        <span className="ml-2 text-xs font-normal text-primary">(this page)</span>
                      )}
                    </td>
                    <td className="py-2.5 pr-4 text-muted">{formatPercent(rate)}</td>
                    <td
                      className={`py-2.5 ${Number(rel) >= 0 ? 'text-emerald-700' : 'text-red-700'}`}
                    >
                      {sign}
                      {rel}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cross-platform comparison for this niche */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          {nicheName} Engagement Rate Across Platforms (2026)
        </h3>
        <p className="mb-4 text-sm text-muted">
          How does {nicheName.toLowerCase()} content perform on other social platforms compared to{' '}
          {platformName}? Engagement rates vary dramatically across platforms due to differences in
          algorithms, audience behavior, and content formats.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th className="pb-2 pr-4 font-medium">Platform</th>
                <th className="pb-2 pr-4 font-medium">{nicheName} Rate</th>
                <th className="pb-2 pr-4 font-medium">Platform Avg</th>
                <th className="pb-2 font-medium">Niche vs Avg</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50 bg-primary/5">
                <td className="py-2.5 pr-4 font-bold text-primary">{platformName}</td>
                <td className="py-2.5 pr-4 font-medium text-foreground">
                  {formatPercent(nicheRate)}
                </td>
                <td className="py-2.5 pr-4 text-muted">{formatPercent(platformAvg)}</td>
                <td className={`py-2.5 ${isAboveAvg ? 'text-emerald-700' : 'text-red-700'}`}>
                  {isAboveAvg ? '+' : ''}
                  {vsPlatformAvg}%
                </td>
              </tr>
              {otherPlatforms.map((p) => {
                const otherRate = industry[p];
                const otherAvg = PLATFORM_AVERAGES[p];
                const otherRel = ((otherRate / otherAvg - 1) * 100).toFixed(0);
                const otherAbove = otherRate >= otherAvg;
                return (
                  <tr key={p} className="border-b border-border/50 last:border-0">
                    <td className="py-2.5 pr-4 font-medium text-foreground">{PLATFORM_NAMES[p]}</td>
                    <td className="py-2.5 pr-4 text-muted">{formatPercent(otherRate)}</td>
                    <td className="py-2.5 pr-4 text-muted">{formatPercent(otherAvg)}</td>
                    <td className={`py-2.5 ${otherAbove ? 'text-emerald-700' : 'text-red-700'}`}>
                      {otherAbove ? '+' : ''}
                      {otherRel}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
