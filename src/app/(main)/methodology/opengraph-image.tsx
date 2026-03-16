import { createOgImageResponse, OG_SIZE } from '@/lib/ogImageFactory';

export const alt = 'Our Methodology — How We Build Industry-Trusted Creator Data';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return createOgImageResponse({
    title: 'Our Methodology',
    subtitle: 'Data sources, formulas, and update schedule behind our creator calculators',
    stats: [
      { label: 'Data Sources', value: '9' },
      { label: 'Platforms Covered', value: '5' },
      { label: 'Updated', value: 'Weekly' },
    ],
  });
}
