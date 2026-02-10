export type ParseResult =
  | { type: 'video'; videoId: string }
  | { type: 'channel'; channelId: string }
  | { type: 'handle'; handle: string }
  | { type: 'invalid' };

export function parseYouTubeUrl(input: string): ParseResult {
  let url: URL;
  try {
    // Allow bare domains without protocol
    const normalized = input.trim();
    url = new URL(normalized.startsWith('http') ? normalized : `https://${normalized}`);
  } catch {
    return { type: 'invalid' };
  }

  const hostname = url.hostname.replace('www.', '').replace('m.', '');

  // Short link: youtu.be/VIDEO_ID
  if (hostname === 'youtu.be') {
    const videoId = url.pathname.slice(1).split('/')[0];
    if (videoId) return { type: 'video', videoId };
    return { type: 'invalid' };
  }

  if (hostname !== 'youtube.com') return { type: 'invalid' };

  const path = url.pathname;

  // Watch page: /watch?v=VIDEO_ID
  if (path === '/watch') {
    const videoId = url.searchParams.get('v');
    if (videoId) return { type: 'video', videoId };
    return { type: 'invalid' };
  }

  // Shorts: /shorts/VIDEO_ID
  const shortsMatch = path.match(/^\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return { type: 'video', videoId: shortsMatch[1] };

  // Handle: /@handle
  const handleMatch = path.match(/^\/@([a-zA-Z0-9._-]+)/);
  if (handleMatch) return { type: 'handle', handle: handleMatch[1] };

  // Channel ID: /channel/UCxxx
  const channelMatch = path.match(/^\/channel\/(UC[a-zA-Z0-9_-]+)/);
  if (channelMatch) return { type: 'channel', channelId: channelMatch[1] };

  // Legacy /c/name and /user/name — treat as handle lookups
  const legacyMatch = path.match(/^\/(c|user)\/([a-zA-Z0-9._-]+)/);
  if (legacyMatch) return { type: 'handle', handle: legacyMatch[2] };

  return { type: 'invalid' };
}
