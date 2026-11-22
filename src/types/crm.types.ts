import { agencyConfig } from '@/config/agency.config';

export type LeadStage = (typeof agencyConfig.leadStages)[number];
export type AcquisitionSource = (typeof agencyConfig.acquisitionSources)[number];

export interface Lead {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  phone: string;
  email?: string;
  stage: LeadStage;
  source: AcquisitionSource | string;
  createdAt: string;
  siteVisitDate?: string;
  notes?: string;
  expectedValue?: number;
}
