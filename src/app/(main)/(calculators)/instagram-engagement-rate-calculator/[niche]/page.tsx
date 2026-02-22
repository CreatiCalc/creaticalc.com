import { INSTAGRAM_CONFIG } from '@/features/calculators/engagement-shared/platformConfigs';
import {
  buildGenerateStaticParams,
  buildGenerateMetadata,
  buildNicheEngagementPage,
  type EngagementNicheConfig,
} from '@/features/calculators/engagement-shared/engagementNicheTemplate';

const CONFIG: EngagementNicheConfig = {
  platform: 'instagram',
  calculatorConfig: INSTAGRAM_CONFIG,
  displayName: 'Instagram',
  hubPath: '/instagram',
  urlPrefix: 'instagram-engagement-rate-calculator',
  sponsorshipUrlPrefix: 'instagram-sponsorship-rate-calculator',
};

export const generateStaticParams = buildGenerateStaticParams(CONFIG);
export const generateMetadata = buildGenerateMetadata(CONFIG);
export default buildNicheEngagementPage(CONFIG);
