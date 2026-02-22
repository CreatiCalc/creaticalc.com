import { TIKTOK_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheEngagementPage,
  type EngagementNicheConfig,
} from '@/features/calculators/engagement-shared/engagementNicheTemplate';

const CONFIG: EngagementNicheConfig = {
  platform: 'tiktok',
  calculatorConfig: TIKTOK_CONFIG,
  displayName: 'TikTok',
  hubPath: '/tiktok',
  urlPrefix: 'tiktok-engagement-rate-calculator',
  sponsorshipUrlPrefix: 'tiktok-sponsorship-rate-calculator',
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheEngagementPage(CONFIG);
