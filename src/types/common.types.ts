import { agencyConfig } from '@/config/agency.config';

export type RoleView = (typeof agencyConfig.roles)[number];

export type NavView =
  | 'overview'
  | 'analytics'
  | 'projects'
  | 'calendar'
  | 'approvals'
  | 'content'
  | 'advertising'
  | 'crm'
  | 'gruhnest'
  | 'compare'
  | 'payments'
  | 'templates';

export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}
