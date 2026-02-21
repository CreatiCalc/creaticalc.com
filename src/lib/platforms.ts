/**
 * Single source of truth for platform display names used across UI, registry,
 * navigation, and structured data. Import these constants instead of using
 * hardcoded platform strings.
 *
 * NOTE: Internal/slug-based platform IDs ('instagram', 'twitter', etc.) used
 * in engagement models, sponsorship models, and URL generation are a separate
 * system defined in their respective modules.
 */
export const Platform = {
  YouTube: 'YouTube',
  Instagram: 'Instagram',
  TikTok: 'TikTok',
  Facebook: 'Facebook',
  X: 'X (Twitter)',
  Multi: 'Multi-Platform',
} as const;

export type PlatformId = (typeof Platform)[keyof typeof Platform];
