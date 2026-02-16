import type { EngagementIndustryId } from '../niches';
import type { SponsorshipPlatform } from '../sponsorshipModel';
import type { FAQItem } from '@/features/calculators/shared/types';

export interface SponsorshipNichePageData {
  platform: SponsorshipPlatform;
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
