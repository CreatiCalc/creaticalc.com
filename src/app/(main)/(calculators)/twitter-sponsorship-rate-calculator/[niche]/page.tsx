import { TWITTER_SPONSORSHIP_CONFIG } from '@/features/calculators/sponsorship-shared/sponsorshipConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheSponsorshipPage,
  type SponsorshipNicheConfig,
} from '@/features/calculators/sponsorship-shared/sponsorshipNicheTemplate';

const CONFIG: SponsorshipNicheConfig = {
  platform: 'twitter',
  calculatorConfig: TWITTER_SPONSORSHIP_CONFIG,
  displayName: 'X (Twitter)',
  hubPath: '/x',
  urlPrefix: 'twitter-sponsorship-rate-calculator',
  relatedLinks: [
    { href: '/twitter-sponsorship-rate-calculator', label: 'X (Twitter) Sponsorship Rate Calculator', description: 'calculate rates across all niches' },
    { href: '/twitter-engagement-rate-calculator', label: 'X (Twitter) Engagement Rate Calculator', description: 'measure your engagement rate' },
    { href: '/youtube-sponsorship-rate-calculator', label: 'YouTube Sponsorship Rate Calculator', description: 'compare sponsorship rates across platforms' },
  ],
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheSponsorshipPage(CONFIG);
