/**
 * ============================================================================
 * 🧭 NAVIGATION CONFIGURATION
 * Single source of truth for the Sidebar menu, routes, and Topbar breadcrumbs.
 * To add, remove, or re-order any tab or page in the application, edit this file!
 * ============================================================================
 */

export type NavGroupId = 'workspace' | 'services' | 'management';

export interface NavRouteItem {
  id: string;
  href: string;
  label: string;
  iconName: string;
  group: NavGroupId;
  description: string;
  badgeKey?: 'pendingApprovals';
}

export interface NavGroup {
  id: NavGroupId;
  title: string;
  items: NavRouteItem[];
}

export const navigationConfig: {
  groups: NavGroup[];
  allRoutes: NavRouteItem[];
} = {
  groups: [
    {
      id: 'workspace',
      title: 'Workspace',
      items: [
        {
          id: 'overview',
          href: '/',
          label: 'Dashboard',
          iconName: 'OverviewIcon',
          group: 'workspace',
          description: 'Agency key performance indicators, active projects, and urgent action items.',
        },
        {
          id: 'finance',
          href: '/finance',
          label: 'Finance',
          iconName: 'FinanceIcon',
          group: 'workspace',
          description: 'Owner-only revenue, billed, collection, outstanding, overdue & earned-but-unbilled commissions.',
        },
        {
          id: 'projects',
          href: '/projects',
          label: 'Client projects',
          iconName: 'ProjectsIcon',
          group: 'workspace',
          description: 'Developer accounts, active mandates, and property marketing roadmaps.',
        },
        {
          id: 'calendar',
          href: '/calendar',
          label: 'Tasks & calendar',
          iconName: 'CalendarIcon',
          group: 'workspace',
          description: 'Cross-functional deliverables, shoot schedules, and review milestones.',
        },
        {
          id: 'approvals',
          href: '/approvals',
          label: 'Approval board',
          iconName: 'ApprovalsIcon',
          group: 'workspace',
          badgeKey: 'pendingApprovals',
          description: 'Creative cuts, ad copies, and developer sign-offs awaiting review.',
        },
      ],
    },
    {
      id: 'services',
      title: 'Service Modules',
      items: [
        {
          id: 'content',
          href: '/content',
          label: 'Content studio',
          iconName: 'ContentIcon',
          group: 'services',
          description: 'Production pipeline for walkthrough reels, developer interviews, and explainers.',
        },
        {
          id: 'advertising',
          href: '/advertising',
          label: 'Advertising',
          iconName: 'AdvertisingIcon',
          group: 'services',
          description: 'Meta, Google and LinkedIn ad campaigns driving site visits and leads.',
        },
        {
          id: 'crm',
          href: '/crm',
          label: 'GuruNest',
          iconName: 'GruhnestIcon',
          group: 'services',
          description: 'Map every live video to its Meta Ad ID(s), video-wise spend, leads, CPL, qualified leads, CPQL, visits & bookings.',
        },
        {
          id: 'gruhnest',
          href: '/gruhnest',
          label: 'GuruNest Pro',
          iconName: 'GruhnestIcon',
          group: 'services',
          description: 'Project status, active sales users, last login, last human CRM update, AI calls, visits booked & pending handoffs.',
        },
      ],
    },
    {
      id: 'management',
      title: 'Management',
      items: [
        {
          id: 'team',
          href: '/team',
          label: 'Team members',
          iconName: 'Users',
          group: 'management',
          description: 'Add team members, define rules, assign tasks, and track completion status.',
        },
        {
          id: 'compare',
          href: '/compare',
          label: 'Project comparison',
          iconName: 'CompareIcon',
          group: 'management',
          description: 'Side-by-side comparison of developer mandates, metrics, and deliverables.',
        },
        {
          id: 'payments',
          href: '/payments',
          label: 'Payments',
          iconName: 'PaymentsIcon',
          group: 'management',
          description: 'Retainers, milestone billings, invoices, and payment statuses.',
        },
        {
          id: 'templates',
          href: '/templates',
          label: 'Templates',
          iconName: 'TemplatesIcon',
          group: 'management',
          description: 'Standardized launch templates and campaign blueprint packages.',
        },
      ],
    },
  ],
  get allRoutes() {
    return this.groups.flatMap((g) => g.items);
  },
};
