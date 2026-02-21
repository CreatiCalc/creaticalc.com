/**
 * Single source of truth for platform identity across the entire codebase.
 *
 * Three identity systems, all defined here:
 *
 * 1. `Platform` / `PlatformId` — Display names for UI, registry, nav, structured data.
 *    e.g. 'YouTube', 'X (Twitter)', 'Multi-Platform'
 *
 * 2. `PlatformSlug` — Lowercase internal slugs for engagement models, sponsorship
 *    models, data tables, and share-link codecs.
 *    e.g. 'youtube', 'instagram', 'twitter'
 *
 * 3. `PlatformHubSlug` — URL-facing slugs for platform hub pages.
 *    e.g. 'youtube', 'instagram', 'x' (note: 'x' not 'twitter')
 */

// ─── Display Names ──────────────────────────────────────────────────────────

export const Platform = {
  YouTube: 'YouTube',
  Instagram: 'Instagram',
  TikTok: 'TikTok',
  Facebook: 'Facebook',
  X: 'X (Twitter)',
  Multi: 'Multi-Platform',
} as const;

export type PlatformId = (typeof Platform)[keyof typeof Platform];

// ─── Internal Model Slugs ───────────────────────────────────────────────────

export const PlatformSlug = {
  YouTube: 'youtube',
  Instagram: 'instagram',
  TikTok: 'tiktok',
  Facebook: 'facebook',
  Twitter: 'twitter',
} as const;

export type PlatformSlug = (typeof PlatformSlug)[keyof typeof PlatformSlug];

/** Engagement platforms — all platforms except YouTube (which uses a view-based model). */
export type EngagementPlatformSlug = Exclude<PlatformSlug, 'youtube'>;

// ─── URL Hub Slugs ──────────────────────────────────────────────────────────

export type PlatformHubSlug = 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'x';

// ─── Slug ↔ Display Mappings ────────────────────────────────────────────────

/** Map internal model slugs to display names. */
export const PLATFORM_SLUG_TO_DISPLAY = {
  [PlatformSlug.YouTube]: Platform.YouTube,
  [PlatformSlug.Instagram]: Platform.Instagram,
  [PlatformSlug.TikTok]: Platform.TikTok,
  [PlatformSlug.Facebook]: Platform.Facebook,
  [PlatformSlug.Twitter]: Platform.X,
} as const satisfies Record<PlatformSlug, PlatformId>;
