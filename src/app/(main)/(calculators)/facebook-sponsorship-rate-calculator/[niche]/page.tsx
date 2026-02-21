import { FACEBOOK_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheSponsorshipPage,
  type SponsorshipNicheConfig,
} from '@/features/calculators/sponsorship-shared/sponsorshipNicheTemplate';

const CONFIG: SponsorshipNicheConfig = {
  platform: 'facebook',
  calculatorConfig: FACEBOOK_SPONSORSHIP_CONFIG,
  displayName: 'Facebook',
  hubPath: '/facebook',
  urlPrefix: 'facebook-sponsorship-rate-calculator',
  relatedLinks: [
    { href: '/facebook-sponsorship-rate-calculator', label: 'Facebook Sponsorship Rate Calculator', description: 'calculate rates across all niches' },
    { href: '/facebook-engagement-rate-calculator', label: 'Facebook Engagement Rate Calculator', description: 'measure your engagement rate' },
    { href: '/instagram-sponsorship-rate-calculator', label: 'Instagram Sponsorship Rate Calculator', description: 'compare sponsorship rates across platforms' },
  ],
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheSponsorshipPage(CONFIG);
