import { NavView, RoleView } from '@/types';

export interface RoleRoutePolicy {
  defaultHref: string;
  defaultView: NavView;
  allowedViews: NavView[];
}

const ROLE_ROUTE_POLICIES: Record<RoleView, RoleRoutePolicy> = {
  Founder: {
    defaultHref: '/',
    defaultView: 'overview',
    allowedViews: [
      'overview',
      'analytics',
      'projects',
      'calendar',
      'approvals',
      'content',
      'advertising',
      'crm',
      'gruhnest',
      'compare',
      'payments',
      'templates',
    ],
  },
  Accountant: {
    defaultHref: '/payments',
    defaultView: 'payments',
    allowedViews: ['payments', 'projects', 'overview'],
  },
  'Project Management': {
    defaultHref: '/projects',
    defaultView: 'projects',
    allowedViews: [
      'overview',
      'projects',
      'calendar',
      'approvals',
      'content',
      'advertising',
      'crm',
      'gruhnest',
      'compare',
      'templates',
    ],
  },
  Content: {
    defaultHref: '/content',
    defaultView: 'content',
    allowedViews: ['overview', 'content', 'calendar', 'approvals', 'gruhnest'],
  },
  Video: {
    defaultHref: '/content',
    defaultView: 'content',
    allowedViews: ['overview', 'content', 'calendar', 'approvals', 'gruhnest'],
  },
  'Ads/Performance': {
    defaultHref: '/advertising',
    defaultView: 'advertising',
    allowedViews: ['overview', 'advertising', 'analytics', 'gruhnest', 'crm'],
  },
  Sales: {
    defaultHref: '/crm',
    defaultView: 'crm',
    allowedViews: ['overview', 'crm', 'calendar', 'gruhnest'],
  },
  Developer: {
    defaultHref: '/payments',
    defaultView: 'payments',
    allowedViews: ['payments', 'projects', 'approvals'],
  },
};

export function getRoleRoutePolicy(role: RoleView): RoleRoutePolicy {
  return ROLE_ROUTE_POLICIES[role] || ROLE_ROUTE_POLICIES.Founder;
}

export function isRouteAllowedForRole(role: RoleView, viewId: NavView): boolean {
  return getRoleRoutePolicy(role).allowedViews.includes(viewId);
}

/**
 * Checks whether the active workspace role is authorized to view or manage
 * agency fees, property deal values, 0.4% commissions, invoices, and collections.
 */
export function canViewFinance(role: RoleView): boolean {
  return role === 'Founder' || role === 'Accountant';
}

/**
 * Checks whether the active role can create invoices, record receipts,
 * verify 0.4% commissions, or reconcile dues.
 */
export function canEditFinance(role: RoleView): boolean {
  return role === 'Founder' || role === 'Accountant';
}

/**
 * Checks whether the active role can inspect campaign spend and CPL metrics.
 */
export function canViewCampaignSpend(role: RoleView): boolean {
  return (
    role === 'Founder' ||
    role === 'Accountant' ||
    role === 'Ads/Performance' ||
    role === 'Project Management' ||
    role === 'Content' ||
    role === 'Video'
  );
}

/**
 * Checks whether the user is operating under a scoped client/developer login.
 */
export function isClientScopedRole(role: RoleView): boolean {
  return role === 'Developer';
}

/**
 * Returns a concise human-readable description of what the selected role can access.
 */
export function getRoleAccessSummary(role: RoleView): string {
  if (role === 'Founder') {
    return 'Full access: all projects, owner finance dashboard, 0.4% commission, collections & permissions';
  }
  if (role === 'Accountant') {
    return 'Billing workspace: invoices, receipts/partial payments, commission verification & dues reconciliation';
  }
  if (role === 'Developer') {
    return 'Client portal: restricted to authorized booking updates for your assigned client account only';
  }
  if (role === 'Ads/Performance') {
    return 'Ads & Delivery: campaign spend/CPL visible; client fees, property deal values, commissions & invoices private';
  }
  return 'Team workspace: assigned work & delivery metrics visible; client fees, deal value & finance private';
}
