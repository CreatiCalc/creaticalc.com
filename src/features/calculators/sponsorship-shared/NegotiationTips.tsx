'use client';

import type { NegotiationTip } from '@/lib/sponsorshipModel';

interface NegotiationTipsProps {
  tips: NegotiationTip[];
}

export default function NegotiationTips({ tips }: NegotiationTipsProps) {
  return (
    <div className="space-y-3">
      {tips.map((tip) => (
        <div key={tip.id} className="rounded-lg border border-border bg-white p-4">
          <p className="text-sm font-medium text-foreground">{tip.text}</p>
          <p className="mt-1 text-sm text-muted">{tip.detail}</p>
        </div>
      ))}
    </div>
  );
}
