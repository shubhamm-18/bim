import { NextRequest, NextResponse } from 'next/server';
import { getRoleRoutePolicy, isRouteAllowedForRole } from '@/lib/permissions';
import { parseRoleFromRequest } from '@/lib/server-auth';
import { NavView } from '@/types';

const PATH_TO_VIEW: Record<string, NavView> = {
  '/': 'overview',
  '/finance': 'finance',
  '/projects': 'projects',
  '/calendar': 'calendar',
  '/approvals': 'approvals',
  '/content': 'content',
  '/advertising': 'advertising',
  '/crm': 'crm',
  '/gruhnest': 'gruhnest',
  '/team': 'team',
  '/compare': 'compare',
  '/payments': 'payments',
  '/templates': 'templates',
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static assets, Next internals, and API routes (API routes enforce auth directly)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const viewId = PATH_TO_VIEW[pathname];
  if (!viewId) {
    return NextResponse.next();
  }

  const role = parseRoleFromRequest(req);
  if (!isRouteAllowedForRole(role, viewId)) {
    const policy = getRoleRoutePolicy(role);
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = policy.defaultHref;
    redirectUrl.searchParams.set('blocked', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
