import { YOUTUBE_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheSponsorshipPage,
  type SponsorshipNicheConfig,
} from '@/features/calculators/sponsorship-shared/sponsorshipNicheTemplate';

const CONFIG: SponsorshipNicheConfig = {
  platform: 'youtube',
  calculatorConfig: YOUTUBE_SPONSORSHIP_CONFIG,
  displayName: 'YouTube',
  hubPath: '/youtube',
  urlPrefix: 'youtube-sponsorship-rate-calculator',
  relatedLinks: [
    {
      href: '/youtube-sponsorship-rate-calculator',
      label: 'YouTube Sponsorship Rate Calculator',
      description: 'calculate rates across all niches',
    },
    {
      href: '/youtube-money-calculator',
      label: 'YouTube Money Calculator',
      description: 'estimate your YouTube ad revenue',
    },
    {
      href: '/instagram-sponsorship-rate-calculator',
      label: 'Instagram Sponsorship Rate Calculator',
      description: 'compare sponsorship rates across platforms',
    },
  ],
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheSponsorshipPage(CONFIG);
