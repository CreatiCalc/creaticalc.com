'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getNiche, type NicheId } from '@/lib/youtubeEarningsModel';
import { formatCompact, formatDate } from '@/lib/formatters';

interface LookupResult {
  dailyViews: number;
  nicheId?: NicheId;
}

interface LookupData {
  type: 'video' | 'channel';
  videoId?: string;
  channelId?: string | null;
  title: string;
  channelTitle: string;
  thumbnail: string | null;
  publishedAt: string;
  dailyViews: number;
  totalViews: number;
  subscriberCount: number | null;
  suggestedNicheId: NicheId | null;
}

interface UrlLookupProps {
  onResult: (data: LookupResult) => void;
  currentDailyViews: number;
}

export default function UrlLookup({ onResult, currentDailyViews }: UrlLookupProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<LookupData | null>(null);

  function isValidYouTubeUrl(input: string): boolean {
    const lower = input.toLowerCase();
    return lower.includes('youtube.com') || lower.includes('youtu.be');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResultData(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a YouTube URL.');
      return;
    }

    if (!isValidYouTubeUrl(trimmed)) {
      setError('Please enter a valid YouTube URL (youtube.com or youtu.be).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/youtube/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await res.json();

      if (!data.success) {
        const msg =
          data.error?.code === 'NOT_FOUND'
            ? 'Channel or video not found. Check the URL and try again.'
            : (data.error?.message ?? 'Something went wrong. Please try again.');
        setError(msg);
        return;
      }

      setResultData(data.data);

      const result: LookupResult = { dailyViews: data.data.dailyViews };
      if (data.data.suggestedNicheId) {
        result.nicheId = data.data.suggestedNicheId;
      }
      onResult(result);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleDismiss() {
    setResultData(null);
  }

  function handleReset() {
    if (!resultData) return;
    const result: LookupResult = { dailyViews: resultData.dailyViews };
    if (resultData.suggestedNicheId) {
      result.nicheId = resultData.suggestedNicheId;
    }
    onResult(result);
  }

  const titleUrl =
    resultData?.type === 'video' && resultData.videoId
      ? `https://www.youtube.com/watch?v=${resultData.videoId}`
      : resultData?.type === 'channel' && resultData.channelId
        ? `https://www.youtube.com/channel/${resultData.channelId}`
        : null;

  const channelUrl = resultData?.channelId
    ? `https://www.youtube.com/channel/${resultData.channelId}`
    : null;

  const isModified = resultData != null && currentDailyViews !== resultData.dailyViews;

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="block text-sm font-medium text-foreground">Auto-fill from YouTube</label>
        <p className="text-xs text-muted">
          Paste a video or channel URL to pull in real view counts and auto-detect your niche.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            placeholder="https://youtube.com/watch?v=... or channel URL"
            disabled={loading}
            className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading && (
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            Lookup
          </button>
        </div>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {resultData && (
        <div className="rounded-xl border border-border bg-white p-4 shadow-sm">
          <div className="flex gap-4">
            {resultData.thumbnail && (
              <a
                href={titleUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <Image
                  src={resultData.thumbnail}
                  alt={resultData.title}
                  width={160}
                  height={96}
                  className="w-32 h-20 sm:w-40 sm:h-24 rounded-lg object-cover"
                />
              </a>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  {titleUrl ? (
                    <a
                      href={titleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate block text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {resultData.title}
                    </a>
                  ) : (
                    <p className="truncate text-sm font-semibold text-foreground">
                      {resultData.title}
                    </p>
                  )}
                  {resultData.type === 'video' &&
                    (channelUrl ? (
                      <a
                        href={channelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate block text-xs text-muted hover:text-primary transition-colors"
                      >
                        {resultData.channelTitle}
                      </a>
                    ) : (
                      <p className="truncate text-xs text-muted">{resultData.channelTitle}</p>
                    ))}
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 text-muted transition-colors hover:text-foreground"
                  aria-label="Dismiss"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                <span>{formatCompact(resultData.totalViews)} views</span>
                {resultData.subscriberCount != null && (
                  <span>{formatCompact(resultData.subscriberCount)} subscribers</span>
                )}
                <span>{formatDate(resultData.publishedAt)}</span>
                <span className="font-medium text-primary">
                  ~{formatCompact(resultData.dailyViews)} daily avg
                  {resultData.type === 'video' && ' for this video'}
                </span>
                {resultData.suggestedNicheId && (
                  <span className="font-medium text-primary">
                    Niche: {getNiche(resultData.suggestedNicheId).name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {resultData.type === 'video' && (
            <p className="mt-2 text-xs text-muted">
              Based on this video&apos;s lifetime views. Your channel average may differ.
            </p>
          )}

          {resultData.subscriberCount != null && resultData.subscriberCount < 1000 && (
            <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-800">
              This channel needs {(1000 - resultData.subscriberCount).toLocaleString()} more
              subscribers to qualify for the YouTube Partner Program.
            </div>
          )}

          {isModified && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
              <span>
                You&apos;ve adjusted daily views from{' '}
                <span className="font-medium">{formatCompact(resultData.dailyViews)}</span> to{' '}
                <span className="font-medium">{formatCompact(currentDailyViews)}</span>
              </span>
              <button
                onClick={handleReset}
                className="ml-auto flex-shrink-0 rounded-md bg-amber-200/60 px-2 py-0.5 font-medium transition-colors hover:bg-amber-200"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
