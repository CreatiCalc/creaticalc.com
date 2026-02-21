import { TWITTER_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheEngagementPage,
  type EngagementNicheConfig,
} from '@/features/calculators/engagement-shared/engagementNicheTemplate';

const CONFIG: EngagementNicheConfig = {
  platform: 'twitter',
  calculatorConfig: TWITTER_CONFIG,
  displayName: 'X (Twitter)',
  hubPath: '/x',
  urlPrefix: 'twitter-engagement-rate-calculator',
  sponsorshipUrlPrefix: 'twitter-sponsorship-rate-calculator',
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheEngagementPage(CONFIG);
