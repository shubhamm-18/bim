import { agencyConfig } from '@/config/agency.config';

export type ContentFormat = (typeof agencyConfig.contentFormats)[number];
export type ContentStage = (typeof agencyConfig.contentStages)[number];

export interface ContentItem {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  format: ContentFormat;
  service: string;
  stage: ContentStage;
  date: string;
  owner?: string;
  link?: string;
}
