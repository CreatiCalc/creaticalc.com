/**
 * Parse an ISO 8601 duration string (as returned by YouTube API contentDetails.duration)
 * into total seconds. Returns null if the input cannot be parsed.
 *
 * Examples: PT5M30S → 330, PT1H2M3S → 3723, PT45S → 45
 */
export function parseISO8601Duration(iso: string): number | null {
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return null;

  const hours = parseInt(match[1] ?? '0', 10);
  const minutes = parseInt(match[2] ?? '0', 10);
  const seconds = parseInt(match[3] ?? '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Format a duration in seconds as M:SS (under 1 hour) or H:MM:SS (1 hour or more).
 */
export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
