import { NextResponse } from 'next/server';
import { parseYouTubeUrl } from '@/lib/youtubeUrlParser';
import { parseISO8601Duration } from '@/lib/youtubeDuration';
import type { NicheId } from '@/lib/youtubeEarningsModel';

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

// YouTube category ID → our niche ID (best-effort)
// Full list: https://developers.google.com/youtube/v3/docs/videoCategories/list
const CATEGORY_TO_NICHE: Record<string, NicheId> = {
  '1': 'entertainment', // Film & Animation
  '2': 'entertainment', // Autos & Vehicles
  '10': 'entertainment', // Music
  '15': 'entertainment', // Pets & Animals
  '17': 'entertainment', // Sports
  '19': 'travel', // Travel & Events
  '20': 'gaming', // Gaming
  '22': 'lifestyle', // People & Blogs
  '23': 'entertainment', // Comedy
  '24': 'entertainment', // Entertainment
  '25': 'education', // News & Politics
  '26': 'beauty', // Howto & Style
  '27': 'education', // Education
  '28': 'tech', // Science & Technology
  '29': 'entertainment', // Nonprofits & Activism
};

// ─── Rate Limiting ──────────────────────────────────────────────────────────

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const MAX_MAP_SIZE = 10_000;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length === 0) {
    rateLimitMap.delete(ip);
  } else {
    rateLimitMap.set(ip, recent);
  }

  // Prevent unbounded memory growth from diverse IPs
  if (rateLimitMap.size > MAX_MAP_SIZE) {
    for (const [key, ts] of rateLimitMap) {
      if (ts.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() ?? 'unknown';
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function errorResponse(code: string, message: string, status = 400) {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

function daysBetween(dateStr: string): number {
  const published = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - published.getTime();
  return Math.max(1, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

async function youtubeApiFetch(endpoint: string, params: Record<string, string>) {
  const apiKey = process.env.YOUTUBE_DATA_API_KEY;
  if (!apiKey) {
    throw new Error('YOUTUBE_DATA_API_KEY is not configured');
  }

  const searchParams = new URLSearchParams({ ...params, key: apiKey });
  const url = `${YOUTUBE_API_BASE}/${endpoint}?${searchParams}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });

  if (!res.ok) {
    if (res.status === 403) {
      throw new Error(
        "QUOTA_EXCEEDED: We've hit our daily lookup limit. Try again tomorrow, or enter your stats manually below."
      );
    }
    const body = await res.text();
    throw new Error(`YouTube API error ${res.status}: ${body}`);
  }

  return res.json();
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return errorResponse(
      'RATE_LIMITED',
      'Too many lookups. Please wait a minute and try again.',
      429
    );
  }

  let body: { url?: string };
  try {
    body = await request.json();
  } catch {
    return errorResponse('INVALID_URL', 'Request body must be JSON with a "url" field.');
  }

  if (!body.url || typeof body.url !== 'string') {
    return errorResponse('INVALID_URL', 'A "url" field is required.');
  }

  const parsed = parseYouTubeUrl(body.url);

  if (parsed.type === 'invalid') {
    return errorResponse('INVALID_URL', 'Could not parse a valid YouTube URL.');
  }

  try {
    if (parsed.type === 'video') {
      return await handleVideo(parsed.videoId);
    }
    if (parsed.type === 'channel') {
      return await handleChannel({ id: parsed.channelId });
    }
    // handle
    return await handleChannel({ forHandle: `@${parsed.handle}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    if (message.includes('not configured')) {
      return errorResponse('API_ERROR', 'YouTube API is not configured on this server.', 500);
    }
    if (message.includes('QUOTA_EXCEEDED')) {
      return errorResponse(
        'QUOTA_EXCEEDED',
        "We've hit our daily lookup limit. Try again tomorrow, or enter your stats manually below.",
        503
      );
    }
    return errorResponse('API_ERROR', message, 500);
  }
}

async function handleVideo(videoId: string) {
  const data = await youtubeApiFetch('videos', {
    part: 'statistics,snippet,contentDetails',
    id: videoId,
  });

  if (!data.items?.length) {
    return errorResponse('NOT_FOUND', 'Video not found.', 404);
  }

  const item = data.items[0];
  const viewCount = Number(item.statistics.viewCount) || 0;
  const days = daysBetween(item.snippet.publishedAt);
  const dailyViews = Math.round(viewCount / days);
  const categoryId = item.snippet.categoryId;
  const durationSeconds = item.contentDetails?.duration
    ? parseISO8601Duration(item.contentDetails.duration)
    : null;

  return NextResponse.json({
    success: true,
    data: {
      type: 'video' as const,
      videoId,
      channelId: item.snippet.channelId ?? null,
      dailyViews,
      suggestedNicheId: CATEGORY_TO_NICHE[categoryId] ?? null,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail:
        item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? null,
      publishedAt: item.snippet.publishedAt,
      subscriberCount: null,
      totalViews: viewCount,
      durationSeconds,
    },
  });
}

async function handleChannel(params: { id?: string; forHandle?: string }) {
  const queryParams: Record<string, string> = {
    part: 'statistics,snippet',
  };
  if (params.id) queryParams.id = params.id;
  if (params.forHandle) queryParams.forHandle = params.forHandle;

  const data = await youtubeApiFetch('channels', queryParams);

  if (!data.items?.length) {
    return errorResponse('NOT_FOUND', 'Channel not found.', 404);
  }

  const item = data.items[0];
  const viewCount = Number(item.statistics.viewCount) || 0;
  const subscriberCount = Number(item.statistics.subscriberCount) || 0;
  const days = daysBetween(item.snippet.publishedAt);
  const dailyViews = Math.round(viewCount / days);

  return NextResponse.json({
    success: true,
    data: {
      type: 'channel' as const,
      channelId: item.id,
      dailyViews,
      suggestedNicheId: null,
      title: item.snippet.title,
      channelTitle: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? null,
      publishedAt: item.snippet.publishedAt,
      subscriberCount,
      totalViews: viewCount,
      durationSeconds: null,
    },
  });
}
