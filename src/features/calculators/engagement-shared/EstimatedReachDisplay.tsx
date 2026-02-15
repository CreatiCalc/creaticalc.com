'use client';

import Card from '@/components/ui/Card';
import { type Platform, formatFollowerCount } from '@/lib/engagementBenchmarks';
import { estimateReach } from '@/lib/engagementModel';

interface EstimatedReachDisplayProps {
  platform: Platform;
  followers: number;
}

export default function EstimatedReachDisplay({ platform, followers }: EstimatedReachDisplayProps) {
  const { estimatedReach, estimatedImpressions, reachRate } = estimateReach(platform, followers);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Based on your follower count and tier, here&rsquo;s your estimated organic reach per post.
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="text-center">
          <p className="text-xs font-medium text-muted">Estimated Reach</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {formatFollowerCount(estimatedReach)}
          </p>
          <p className="mt-0.5 text-xs text-muted">unique accounts</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs font-medium text-muted">Estimated Impressions</p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {formatFollowerCount(estimatedImpressions)}
          </p>
          <p className="mt-0.5 text-xs text-muted">total views</p>
        </Card>
        <Card className="text-center">
          <p className="text-xs font-medium text-muted">Reach Rate</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{reachRate}%</p>
          <p className="mt-0.5 text-xs text-muted">of followers</p>
        </Card>
      </div>
      <p className="text-xs text-muted">
        Smaller accounts typically reach a higher percentage of their followers. Nano creators
        average ~70% reach rate while mega creators average ~10%.
      </p>
    </div>
  );
}
