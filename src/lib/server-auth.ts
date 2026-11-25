import { NextRequest } from 'next/server';
import { RoleView } from '@/types';
import { agencyConfig } from '@/config/agency.config';
import { canViewFinance, isClientScopedRole } from './permissions';

export const ROLE_COOKIE = 'bim_role';
export const CLIENT_SCOPE_COOKIE = 'bim_client_scope';
export const TWO_FA_COOKIE = 'bim_2fa_verified';

export function parseRoleFromRequest(req: NextRequest): RoleView {
  const raw = req.cookies.get(ROLE_COOKIE)?.value;
  if (raw && (agencyConfig.roles as readonly string[]).includes(raw)) {
    return raw as RoleView;
  }
  return 'Founder';
}

export function parseClientScopeFromRequest(req: NextRequest): string {
  return req.cookies.get(CLIENT_SCOPE_COOKIE)?.value || 'Shakti Group';
}

export function isTwoFactorVerified(req: NextRequest): boolean {
  return req.cookies.get(TWO_FA_COOKIE)?.value === 'true';
}

export function authorizeFinanceRequest(
  req: NextRequest,
  options?: { ownerOnly?: boolean; require2FA?: boolean }
): { ok: true; role: RoleView } | { ok: false; status: number; error: string } {
  const role = parseRoleFromRequest(req);

  if (options?.ownerOnly && role !== 'Founder') {
    return {
      ok: false,
      status: 403,
      error: `Forbidden: Owner-only finance endpoint blocked for ${role}`,
    };
  }

  if (!canViewFinance(role)) {
    return {
      ok: false,
      status: 403,
      error: `Forbidden: Finance data & exports are private for ${role}`,
    };
  }

  if (options?.require2FA && !isTwoFactorVerified(req)) {
    return {
      ok: false,
      status: 403,
      error: '2FA verification required for owner/accountant export or backup',
    };
  }

  return { ok: true, role };
}

export function authorizeProjectScope(
  req: NextRequest,
  requestedClient?: string | null
): { ok: true; role: RoleView; scopedClient: string | null } | { ok: false; status: number; error: string } {
  const role = parseRoleFromRequest(req);
  if (!isClientScopedRole(role)) {
    return { ok: true, role, scopedClient: null };
  }

  const assignedClient = parseClientScopeFromRequest(req);
  if (
    requestedClient &&
    requestedClient.toLowerCase() !== 'all' &&
    requestedClient.toLowerCase() !== assignedClient.toLowerCase()
  ) {
    return {
      ok: false,
      status: 403,
      error: `Forbidden: Client ${assignedClient} login cannot access ${requestedClient} records`,
    };
  }

  return { ok: true, role, scopedClient: assignedClient };
}
