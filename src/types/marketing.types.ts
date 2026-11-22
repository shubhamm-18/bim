import { agencyConfig } from '@/config/agency.config';

export type AdPlatform = (typeof agencyConfig.adPlatforms)[number];
export type CampaignStatus = (typeof agencyConfig.campaignStatuses)[number];

export interface Campaign {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  platform: AdPlatform;
  budget: number;
  spend: number;
  impressions: number;
  leads: number;
  siteVisits: number;
  status: CampaignStatus;
  startDate?: string;
  endDate?: string;
}
