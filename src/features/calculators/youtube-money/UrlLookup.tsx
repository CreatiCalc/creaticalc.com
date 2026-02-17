'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getNiche, type NicheId } from '@/lib/youtubeEarningsModel';
import { formatCompact, formatDate } from '@/lib/formatters';
import { formatDuration } from '@/lib/youtubeDuration';

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
  durationSeconds: number | null;
}

interface UrlLookupProps {
  onResult: (data: LookupResult) => void;
  currentDailyViews: number;
  isShorts?: boolean;
}

export default function UrlLookup({ onResult, currentDailyViews, isShorts }: UrlLookupProps) {
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
  const isNotShort =
    isShorts &&
    resultData?.type === 'video' &&
    resultData.durationSeconds != null &&
    resultData.durationSeconds > 180;

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
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          {/* Thumbnail + info header */}
          <div className="flex gap-3 p-3 sm:gap-4 sm:p-4">
            {resultData.thumbnail && (
              <a
                href={titleUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex-shrink-0"
              >
                <Image
                  src={resultData.thumbnail}
                  alt={resultData.title}
                  width={160}
                  height={96}
                  className="h-20 w-32 rounded-lg object-cover sm:h-24 sm:w-40"
                />
                {resultData.durationSeconds != null && (
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[11px] font-medium leading-none text-white">
                    {formatDuration(resultData.durationSeconds)}
                  </span>
                )}
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
                      className="block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
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
                        className="block truncate text-xs text-muted transition-colors hover:text-primary"
                      >
                        {resultData.channelTitle}
                      </a>
                    ) : (
                      <p className="truncate text-xs text-muted">{resultData.channelTitle}</p>
                    ))}
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 rounded-md p-1 text-muted transition-colors hover:bg-surface-alt hover:text-foreground"
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

              {/* Stat pills */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center rounded-md bg-surface-alt px-2 py-0.5 text-xs text-muted">
                  {formatCompact(resultData.totalViews)} views
                </span>
                {resultData.subscriberCount != null && (
                  <span className="inline-flex items-center rounded-md bg-surface-alt px-2 py-0.5 text-xs text-muted">
                    {formatCompact(resultData.subscriberCount)} subs
                  </span>
                )}
                <span className="inline-flex items-center rounded-md bg-surface-alt px-2 py-0.5 text-xs text-muted">
                  {formatDate(resultData.publishedAt)}
                </span>
                {resultData.suggestedNicheId && (
                  <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {getNiche(resultData.suggestedNicheId).name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Key stat bar */}
          <div className="border-t border-border/50 bg-surface px-3 py-2.5 sm:px-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">
                Estimated daily avg{resultData.type === 'video' ? ' (this video)' : ''}
              </span>
              <span className="font-mono text-sm font-semibold text-primary">
                ~{formatCompact(resultData.dailyViews)} views/day
              </span>
            </div>
          </div>

          {/* Contextual alerts */}
          {(resultData.type === 'video' ||
            isNotShort ||
            (resultData.subscriberCount != null && resultData.subscriberCount < 1000) ||
            isModified) && (
            <div className="space-y-0 border-t border-border/50">
              {resultData.type === 'video' && (
                <p className="px-3 py-2 text-xs text-muted sm:px-4">
                  Based on this video&apos;s lifetime views. Your channel average may differ.
                </p>
              )}

              {isNotShort && (
                <div className="flex items-start gap-2 border-t border-border/30 bg-amber-50/80 px-3 py-2.5 text-xs text-amber-800 sm:px-4">
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.75a.75.75 0 011.5 0v4a.75.75 0 01-1.5 0v-4zm.75 7a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                  </svg>
                  <span>
                    This video is {formatDuration(resultData!.durationSeconds!)} long — not a
                    YouTube Short (max 3 min). This page uses Shorts RPM
                    ($0.01&ndash;$0.07/1K&nbsp;views).{' '}
                    <Link
                      href="/youtube-money-calculator"
                      className="font-medium underline decoration-amber-400 underline-offset-2 hover:text-amber-900"
                    >
                      Use the standard calculator
                    </Link>
                  </span>
                </div>
              )}

              {resultData.subscriberCount != null && resultData.subscriberCount < 1000 && (
                <div className="flex items-start gap-2 border-t border-border/30 bg-blue-50/80 px-3 py-2.5 text-xs text-blue-800 sm:px-4">
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4.75a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0v-.5zm0 3a.75.75 0 011.5 0v2.5a.75.75 0 01-1.5 0v-2.5z" />
                  </svg>
                  <span>
                    This channel needs {(1000 - resultData.subscriberCount).toLocaleString()} more
                    subscribers to qualify for the YouTube Partner Program.
                  </span>
                </div>
              )}

              {isModified && (
                <div className="flex items-center gap-2 border-t border-border/30 bg-amber-50/80 px-3 py-2.5 text-xs text-amber-800 sm:px-4">
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
      )}
    </div>
  );
}
