'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsEmbed } from '@/lib/embedContext';

interface AdSlotProps {
  slot: 'header' | 'sidebar' | 'below-results' | 'after-chart';
  className?: string;
}

const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

const SLOT_MIN_HEIGHTS: Record<AdSlotProps['slot'], string> = {
  'header': 'min-h-[90px]',
  'sidebar': 'min-h-[250px]',
  'below-results': 'min-h-[250px]',
  'after-chart': 'min-h-[250px]',
};

export default function AdSlot({ slot, className = '' }: AdSlotProps) {
  const isEmbed = useIsEmbed();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Defer ad initialization until the slot is near the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !publisherId || isEmbed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isEmbed]);

  // Push ad once visible
  useEffect(() => {
    if (isVisible && publisherId && !isEmbed) {
      try {
        (((window as unknown as Record<string, unknown>).adsbygoogle as unknown[]) || []).push({});
      } catch {
        // AdSense may throw if ad already loaded
      }
    }
  }, [isVisible, isEmbed]);

  if (isEmbed) return null;

  if (publisherId) {
    return (
      <div
        ref={containerRef}
        className={`${SLOT_MIN_HEIGHTS[slot]} ${className}`}
        data-ad-slot={slot}
      >
        {isVisible && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={publisherId}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-surface-alt text-sm text-muted ${SLOT_MIN_HEIGHTS[slot]} ${className}`}
        data-ad-slot={slot}
      >
        <span className="px-4 py-3">Ad Space</span>
      </div>
    );
  }

  return null;
}
