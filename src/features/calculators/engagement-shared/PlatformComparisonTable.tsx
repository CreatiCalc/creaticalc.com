import { INDUSTRY_BENCHMARKS, formatPercent } from '@/lib/engagementModel';

export default function PlatformComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted">
            <th className="pb-2 pr-4 font-medium">Industry</th>
            <th className="pb-2 pr-4 font-medium">Instagram</th>
            <th className="pb-2 pr-4 font-medium">TikTok</th>
            <th className="pb-2 pr-4 font-medium">Facebook</th>
            <th className="pb-2 font-medium">X (Twitter)</th>
          </tr>
        </thead>
        <tbody>
          {INDUSTRY_BENCHMARKS.map((b) => (
            <tr key={b.id} className="border-b border-border/50 last:border-0">
              <td className="py-2.5 pr-4 font-medium text-foreground">{b.name}</td>
              <td className="py-2.5 pr-4 text-muted">{formatPercent(b.instagram)}</td>
              <td className="py-2.5 pr-4 text-muted">{formatPercent(b.tiktok)}</td>
              <td className="py-2.5 pr-4 text-muted">{formatPercent(b.facebook)}</td>
              <td className="py-2.5 text-muted">{formatPercent(b.twitter)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
