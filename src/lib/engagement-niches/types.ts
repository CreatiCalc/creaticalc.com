import type { Platform } from '../engagementBenchmarks';
import type { EngagementIndustryId } from '../niches';
import type { FAQItem } from '@/features/calculators/shared/types';

export interface EngagementNichePageData {
  platform: Platform;
  industryId: EngagementIndustryId;
  slug: string;
  name: string;
  platformLabel: string;
  title: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  pageDescription: string;
  howItWorks: string;
  faq: FAQItem[];
}
