import { FACEBOOK_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheEngagementPage,
  type EngagementNicheConfig,
} from '@/features/calculators/engagement-shared/engagementNicheTemplate';

const CONFIG: EngagementNicheConfig = {
  platform: 'facebook',
  calculatorConfig: FACEBOOK_CONFIG,
  displayName: 'Facebook',
  hubPath: '/facebook',
  urlPrefix: 'facebook-engagement-rate-calculator',
  sponsorshipUrlPrefix: 'facebook-sponsorship-rate-calculator',
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheEngagementPage(CONFIG);
