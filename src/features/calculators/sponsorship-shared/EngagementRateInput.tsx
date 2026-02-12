'use client';

import { useState } from 'react';
import Slider from '@/components/ui/Slider';
import NumberInput from '@/components/ui/NumberInput';

interface EngagementRateInputProps {
  engagementRate: number;
  followers: number;
  onEngagementRateChange: (value: number) => void;
}

export default function EngagementRateInput({
  engagementRate,
  followers,
  onEngagementRateChange,
}: EngagementRateInputProps) {
  const [mode, setMode] = useState<'direct' | 'calculated'>('direct');
  const [avgLikes, setAvgLikes] = useState(0);
  const [avgComments, setAvgComments] = useState(0);

  function recalculate(likes: number, comments: number) {
    if (followers > 0) {
      const rate = ((likes + comments) / followers) * 100;
      onEngagementRateChange(Math.round(rate * 100) / 100);
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <p className="text-sm font-medium text-foreground">Engagement Rate</p>
        <div className="flex rounded-full border border-border bg-surface text-xs">
          <button
            type="button"
            onClick={() => setMode('direct')}
            className={`rounded-full px-3 py-1 transition-colors ${
              mode === 'direct' ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
            }`}
          >
            Enter directly
          </button>
          <button
            type="button"
            onClick={() => setMode('calculated')}
            className={`rounded-full px-3 py-1 transition-colors ${
              mode === 'calculated' ? 'bg-primary text-white' : 'text-muted hover:text-foreground'
            }`}
          >
            Calculate from metrics
          </button>
        </div>
      </div>

      {mode === 'direct' ? (
        <Slider
          label="Engagement Rate (%)"
          value={engagementRate}
          min={0.1}
          max={15}
          step={0.1}
          onChange={onEngagementRateChange}
          formatValue={(v) => `${v.toFixed(1)}%`}
        />
      ) : (
        <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <NumberInput
            label="Avg. Likes per Post"
            value={avgLikes}
            min={0}
            max={1_000_000}
            step={1}
            onChange={(v) => {
              setAvgLikes(v);
              recalculate(v, avgComments);
            }}
          />
          <NumberInput
            label="Avg. Comments per Post"
            value={avgComments}
            min={0}
            max={100_000}
            step={1}
            onChange={(v) => {
              setAvgComments(v);
              recalculate(avgLikes, v);
            }}
          />
          <p className="text-xs text-muted">
            Calculated rate: <strong>{engagementRate.toFixed(2)}%</strong> = (
            {avgLikes.toLocaleString()} + {avgComments.toLocaleString()}) &divide;{' '}
            {followers.toLocaleString()} &times; 100
          </p>
        </div>
      )}
    </div>
  );
}
