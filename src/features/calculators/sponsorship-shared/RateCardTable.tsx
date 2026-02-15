'use client';

import { formatUSD } from '@/lib/engagementBenchmarks';
import type { RateCardEntry, SponsorshipContentType } from '@/lib/sponsorshipModel';

interface RateCardTableProps {
  rateCard: RateCardEntry[];
  activeContentType: SponsorshipContentType;
}

export default function RateCardTable({ rateCard, activeContentType }: RateCardTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 pr-4 text-left font-medium text-foreground">Content Type</th>
            <th className="px-4 py-2 text-right font-medium text-foreground">Low</th>
            <th className="px-4 py-2 text-right font-medium text-foreground">Mid</th>
            <th className="px-4 py-2 text-right font-medium text-foreground">High</th>
          </tr>
        </thead>
        <tbody>
          {rateCard.map((entry) => (
            <tr
              key={entry.contentType}
              className={`border-b border-border/50 ${
                entry.contentType === activeContentType ? 'bg-primary/5 font-semibold' : ''
              }`}
            >
              <td className="py-2.5 pr-4 text-foreground">
                {entry.label}
                {entry.contentType === activeContentType && (
                  <span className="ml-2 text-xs text-primary">(selected)</span>
                )}
              </td>
              <td className="px-4 py-2.5 text-right text-muted">{formatUSD(entry.rate.low)}</td>
              <td className="px-4 py-2.5 text-right text-foreground">
                {formatUSD(entry.rate.mid)}
              </td>
              <td className="px-4 py-2.5 text-right text-muted">{formatUSD(entry.rate.high)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-muted">
        Rates shown for your current deal type, followers, engagement rate, and niche. Change any
        input above to recalculate.
      </p>
    </div>
  );
}
