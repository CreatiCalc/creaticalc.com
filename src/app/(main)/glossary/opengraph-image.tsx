import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const alt = 'Creator Economy Glossary — CreatiCalc';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return createOgImageResponse({
    title: 'Creator Economy Glossary',
    subtitle: 'CPM, RPM, engagement rate, sponsorship rates, influencer tiers & more',
    stats: [
      { label: 'Terms Defined', value: '18' },
      { label: 'Platforms Covered', value: '5' },
      { label: 'Price', value: 'Free' },
    ],
  });
}
