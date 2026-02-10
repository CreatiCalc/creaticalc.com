'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  slot: 'header' | 'sidebar' | 'below-results' | 'after-chart';
  className?: string;
}

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

export default function AdSlot({ slot, className = '' }: AdSlotProps) {
  useEffect(() => {
    if (publisherId) {
      try {
        (((window as unknown as Record<string, unknown>).adsbygoogle as unknown[]) || []).push({});
      } catch {
        // AdSense may throw if ad already loaded
      }
    }
  }, []);

  if (publisherId) {
    return (
      <div className={className} data-ad-slot={slot}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-surface-alt text-sm text-muted ${className}`}
        data-ad-slot={slot}
      >
        <span className="px-4 py-3">Ad Space</span>
      </div>
    );
  }

  return null;
}
