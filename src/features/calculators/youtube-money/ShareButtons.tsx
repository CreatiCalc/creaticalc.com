'use client';

import { useState, useCallback } from 'react';
import { encodeCalcState } from '@/lib/shareCodec';
import { formatUSD } from '@/lib/youtubeEarningsModel';
import type { CalculatorState } from './useCalculatorState';

interface ShareButtonsProps {
  state: CalculatorState;
  yearlyMid: number;
}

export default function ShareButtons({ state, yearlyMid }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = useCallback(() => {
    const code = encodeCalcState({
      dailyViews: state.dailyViews,
      nicheId: state.nicheId,
      monthlyGrowthRate: state.monthlyGrowthRate,
      seasonalityEnabled: state.seasonalityEnabled,
    });
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set('c', code);
    return url.toString();
  }, [state.dailyViews, state.nicheId, state.monthlyGrowthRate, state.seasonalityEnabled]);

  const handleCopy = async () => {
    const url = getShareUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const url = getShareUrl();
    const text = `I'm projected to make ${formatUSD(yearlyMid)}/year on YouTube! Check your earnings:`;
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5V3.5a1.5 1.5 0 0 0-1.5-1.5H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h2" />
        </svg>
        {copied ? 'Copied!' : 'Share Results'}
      </button>
      <button
        type="button"
        onClick={handleShareX}
        className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
      >
        <svg width="14" height="14" viewBox="0 0 1200 1227" fill="currentColor">
          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
        </svg>
        Share on X
      </button>
    </div>
  );
}
