'use client';

import { formatUSD } from '@/lib/engagementModel';
import type { FollowerTier } from '@/lib/engagementModel';
import type { TierRateInfo } from '@/lib/sponsorshipModel';

interface TierContextProps {
  currentTier: FollowerTier;
  tierLabel: string;
  tierRates: TierRateInfo[];
}

export default function TierContext({ currentTier, tierLabel, tierRates }: TierContextProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p className="text-sm text-muted">Your Influencer Tier</p>
        <p className="mt-1 text-xl font-bold text-primary">{tierLabel}</p>
        <p className="mt-1 text-xs text-muted">
          Sponsorship rates vary significantly by tier. Larger accounts command higher absolute
          rates, while smaller accounts often deliver better ROI per dollar for brands.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 pr-4 text-left font-medium text-foreground">Tier</th>
              <th className="px-4 py-2 text-left font-medium text-foreground">Followers</th>
              <th className="px-4 py-2 text-right font-medium text-foreground">Typical Rate</th>
            </tr>
          </thead>
          <tbody>
            {tierRates.map((tr) => (
              <tr
                key={tr.tier}
                className={`border-b border-border/50 ${
                  tr.tier === currentTier ? 'bg-primary/5 font-semibold' : ''
                }`}
              >
                <td className="py-2.5 pr-4 text-foreground">
                  {tr.label}
                  {tr.tier === currentTier && (
                    <span className="ml-2 text-xs text-primary">(you)</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-muted">{tr.followerRange}</td>
                <td className="px-4 py-2.5 text-right text-foreground">
                  {formatUSD(tr.typicalRate.low)} – {formatUSD(tr.typicalRate.high)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted">
        Rates shown for your current content type, deal type, engagement rate, and niche. Actual
        rates vary based on audience demographics, content quality, and market conditions.
      </p>
    </div>
  );
}
