import { NICHES, SHORTS_RPM } from '@/lib/youtubeEarningsModel';
import type { NicheId, ContentFormat } from '@/lib/youtubeEarningsModel';

interface RpmTableProps {
  activeNicheId: NicheId;
  contentFormat: ContentFormat;
}

export default function RpmTable({ activeNicheId, contentFormat }: RpmTableProps) {
  if (contentFormat === 'shorts') {
    return (
      <div className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">YouTube Shorts RPM</h2>
        <div className="rounded-lg border border-border bg-white p-4">
          <p className="text-sm font-medium">
            ${SHORTS_RPM.low.toFixed(2)} &ndash; ${SHORTS_RPM.high.toFixed(2)} per 1,000 views
          </p>
          <p className="mt-2 text-sm text-muted">
            Shorts RPM is roughly the same across all niches because Shorts ads use a different
            revenue pool. Unlike long-form content where niche heavily influences earnings, Shorts
            creators earn from a shared ad fund distributed based on total Shorts views.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="mb-2 text-lg font-semibold">RPM &amp; CPM by Niche</h2>
      <p className="mb-3 text-sm text-muted">
        RPM = what you earn per 1K views. CPM = what advertisers pay before YouTube&apos;s 45% cut.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 font-medium text-muted">Niche</th>
              <th className="pb-2 font-medium text-muted">RPM Low</th>
              <th className="pb-2 font-medium text-muted">RPM Mid</th>
              <th className="pb-2 font-medium text-muted">RPM High</th>
              <th className="pb-2 font-medium text-muted text-xs">CPM Low</th>
              <th className="pb-2 font-medium text-muted text-xs">CPM Mid</th>
              <th className="pb-2 font-medium text-muted text-xs">CPM High</th>
            </tr>
          </thead>
          <tbody>
            {NICHES.map((n) => (
              <tr
                key={n.id}
                className={`border-b border-border ${
                  n.id === activeNicheId ? 'bg-primary/5 font-medium' : ''
                }`}
              >
                <td className="py-2">{n.name}</td>
                <td className="py-2">${n.rpm.low.toFixed(2)}</td>
                <td className="py-2">${n.rpm.mid.toFixed(2)}</td>
                <td className="py-2">${n.rpm.high.toFixed(2)}</td>
                <td className="py-2 text-xs text-muted">${n.cpm.low.toFixed(2)}</td>
                <td className="py-2 text-xs text-muted">${n.cpm.mid.toFixed(2)}</td>
                <td className="py-2 text-xs text-muted">${n.cpm.high.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
