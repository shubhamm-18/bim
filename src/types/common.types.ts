import { agencyConfig } from '@/config/agency.config';

export type RoleView = (typeof agencyConfig.roles)[number];

export type NavView =
  | 'overview'
  | 'finance'
  | 'analytics'
  | 'projects'
  | 'calendar'
  | 'approvals'
  | 'content'
  | 'advertising'
  | 'crm'
  | 'gruhnest'
  | 'team'
  | 'compare'
  | 'payments'
  | 'templates';

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
