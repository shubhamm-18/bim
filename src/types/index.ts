export type RoleView =
  | 'Founder'
  | 'Project Management'
  | 'Content'
  | 'Video'
  | 'Ads/Performance'
  | 'Developer'
  | 'Sales';

export type NavView =
  | 'overview'
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

export type ProjectStatus = 'Active' | 'Planning' | 'Completed' | 'On hold';
export type InfoStatus = 'Verified' | 'Tentative' | 'Missing';
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Open' | 'In Progress' | 'Under Review' | 'Done';
export type TaskRecurrence = 'None' | 'Daily' | 'Weekly' | 'Monthly';

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

export interface Task {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  due: string; // YYYY-MM-DD
  status: TaskStatus;
  priority: PriorityLevel;
  role: RoleView;
  recurrence: TaskRecurrence;
}

export type ContentFormat = 'Walkthrough' | 'Explainer' | 'Shoot' | 'Edit' | 'Script' | 'Ready to post' | 'Reel' | 'Podcast';
export type ContentStage = 'Idea' | 'Script' | 'Shoot' | 'Edit' | 'Approval' | 'Ready to post' | 'Posted';

export interface ContentItem {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  format: ContentFormat;
  service: 'Content' | 'Gruhnest' | 'Advertising';
  stage: ContentStage;
  date: string;
  owner?: string;
  previewUrl?: string;
}

export type AdPlatform = 'Meta' | 'Google' | 'LinkedIn' | 'Other';
export type CampaignStatus = 'Draft' | 'Planning' | 'Active' | 'Optimizing' | 'Completed' | 'Paused';

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
}

export type LeadStage =
  | 'New lead'
  | 'Contacted'
  | 'Qualified'
  | 'Visit booked'
  | 'Visit completed'
  | 'Booked'
  | 'Closed lost';

export interface Lead {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  phone: string;
  email?: string;
  stage: LeadStage;
  source: string;
  createdAt: string;
  siteVisitDate?: string;
  notes?: string;
  expectedValue?: number;
}

export interface PropertyProfile {
  id: string;
  projectId: string;
  projectName: string;
  developer: string;
  city: string;
  towerPossession: string;
  sampleFlatStatus: 'Ready' | 'Under Construction' | 'Not Available';
  totalInventory: number;
  availableInventory: number;
  startingPrice: string;
  walkthroughAssetStatus: 'Delivered' | 'In Production' | 'Scheduled' | 'Pending';
  explainerAssetStatus: 'Delivered' | 'In Production' | 'Scheduled' | 'Pending';
  expectedDealValue: number;
  commissionRatePercent: number;
}

export interface ApprovalItem {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  kind: 'Script' | 'Video Cut' | 'Ad Creative' | 'Landing Page' | 'Brochure';
  submittedBy: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Changes Requested';
  commentsCount: number;
}

export interface PaymentRecord {
  id: string;
  projectId: string;
  projectName: string;
  invoiceNo: string;
  description: string;
  amount: number;
  paidAmount: number;
  status: 'Paid' | 'Part paid' | 'Pending' | 'Overdue';
  dueDate: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: 'Full Launch' | 'Performance' | 'Property Media' | 'Custom';
  features: string[];
}
