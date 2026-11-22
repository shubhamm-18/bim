import { agencyConfig } from '@/config/agency.config';
import { RoleView } from './common.types';

export type ProjectStatus = (typeof agencyConfig.projectStatuses)[number];
export type InfoStatus = (typeof agencyConfig.infoStatuses)[number];

export interface Client {
  id: string;
  name: string;
  tag: string;
  scope: string;
  deliverables: string;
  owner: RoleView;
  activeProjectsCount: number;
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  name: string;
  city: string;
  status: ProjectStatus;
  infoStatus: InfoStatus;
  template: string;
  budget?: number;
  spend?: number;
  leadsCount?: number;
  siteVisitsCount?: number;
  bookingsCount?: number;
  startDate?: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
}
