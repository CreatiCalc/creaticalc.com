'use client';

import type { Platform } from '@/lib/engagementModel';
import type { SponsorshipContentType } from '@/lib/sponsorshipModel';
import { IG_CONTENT_TYPES, TIKTOK_CONTENT_TYPES } from '@/lib/sponsorshipModel';

interface ContentTypeSelectorProps {
  platform: Platform;
  value: SponsorshipContentType;
  onChange: (value: SponsorshipContentType) => void;
}

export default function ContentTypeSelector({
  platform,
  value,
  onChange,
}: ContentTypeSelectorProps) {
  const options = platform === 'instagram' ? IG_CONTENT_TYPES : TIKTOK_CONTENT_TYPES;

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-foreground">Content Type</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value as SponsorshipContentType)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              value === opt.value
                ? 'border-primary bg-primary text-white'
                : 'border-border bg-surface text-muted hover:border-primary hover:text-foreground'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
