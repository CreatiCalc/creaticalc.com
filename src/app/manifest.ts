import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CreatiCalc — Free Calculators for Content Creators',
    short_name: 'CreatiCalc',
    description:
      'Free calculators for YouTubers, TikTokers, and Instagram creators. Estimate earnings, calculate engagement rates, find sponsorship pricing, and project subscriber growth.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#0d9488',
    background_color: '#ffffff',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
