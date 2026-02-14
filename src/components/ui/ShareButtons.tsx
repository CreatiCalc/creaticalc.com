'use client';

import { useState, useCallback } from 'react';
import { EmbedCodeButton } from '@/features/embed/EmbedCodeButton';

interface ShareButtonsProps {
  getShareUrl: () => string;
  shareText: string;
  embedSlug?: string;
}

export default function ShareButtons({ getShareUrl, shareText, embedSlug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [getShareUrl]);

  const handleShareX = useCallback(() => {
    const url = getShareUrl();
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }, [getShareUrl, shareText]);

  const handleShareLinkedIn = useCallback(() => {
    const url = getShareUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  }, [getShareUrl]);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5V3.5a1.5 1.5 0 0 0-1.5-1.5H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h2" />
        </svg>
        {copied ? 'Copied!' : 'Copy Link'}
      </button>

      <button
        type="button"
        onClick={handleShareX}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 1200 1227" fill="currentColor" aria-hidden="true">
          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
        </svg>
        Share on X
      </button>

      <button
        type="button"
        onClick={handleShareLinkedIn}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-blue-700 hover:text-blue-700"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        Share on LinkedIn
      </button>

      {embedSlug && <EmbedCodeButton slug={embedSlug} />}
    </div>
  );
}
