import { INSTAGRAM_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheSponsorshipPage,
  type SponsorshipNicheConfig,
} from '@/features/calculators/sponsorship-shared/sponsorshipNicheTemplate';

const CONFIG: SponsorshipNicheConfig = {
  platform: 'instagram',
  calculatorConfig: INSTAGRAM_SPONSORSHIP_CONFIG,
  displayName: 'Instagram',
  hubPath: '/instagram',
  urlPrefix: 'instagram-sponsorship-rate-calculator',
  relatedLinks: [
    {
      href: '/instagram-sponsorship-rate-calculator',
      label: 'Instagram Sponsorship Rate Calculator',
      description: 'calculate rates across all niches',
    },
    {
      href: '/instagram-engagement-rate-calculator',
      label: 'Instagram Engagement Rate Calculator',
      description: 'measure your engagement rate',
    },
    {
      href: '/tiktok-sponsorship-rate-calculator',
      label: 'TikTok Sponsorship Rate Calculator',
      description: 'compare sponsorship rates across platforms',
    },
  ],
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheSponsorshipPage(CONFIG);
