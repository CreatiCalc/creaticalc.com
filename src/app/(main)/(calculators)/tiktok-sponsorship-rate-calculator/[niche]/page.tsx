import { TIKTOK_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheSponsorshipPage,
  type SponsorshipNicheConfig,
} from '@/features/calculators/sponsorship-shared/sponsorshipNicheTemplate';

const CONFIG: SponsorshipNicheConfig = {
  platform: 'tiktok',
  calculatorConfig: TIKTOK_SPONSORSHIP_CONFIG,
  displayName: 'TikTok',
  hubPath: '/tiktok',
  urlPrefix: 'tiktok-sponsorship-rate-calculator',
  relatedLinks: [
    { href: '/tiktok-sponsorship-rate-calculator', label: 'TikTok Sponsorship Rate Calculator', description: 'calculate rates across all niches' },
    { href: '/tiktok-engagement-rate-calculator', label: 'TikTok Engagement Rate Calculator', description: 'measure your engagement rate' },
    { href: '/instagram-sponsorship-rate-calculator', label: 'Instagram Sponsorship Rate Calculator', description: 'compare sponsorship rates across platforms' },
  ],
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheSponsorshipPage(CONFIG);
