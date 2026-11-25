import { NextRequest, NextResponse } from 'next/server';
import { agencyConfig } from '@/config/agency.config';
import { CLIENT_SCOPE_COOKIE, ROLE_COOKIE, TWO_FA_COOKIE } from '@/lib/server-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = NextResponse.json({ ok: true });

    if (body.role && (agencyConfig.roles as readonly string[]).includes(body.role)) {
      res.cookies.set(ROLE_COOKIE, body.role, {
        path: '/',
        sameSite: 'lax',
        httpOnly: false,
      });
    }

    if (typeof body.clientScope === 'string' && body.clientScope.trim()) {
      res.cookies.set(CLIENT_SCOPE_COOKIE, body.clientScope.trim(), {
        path: '/',
        sameSite: 'lax',
        httpOnly: false,
      });
    }

    if (typeof body.twoFactorVerified === 'boolean') {
      res.cookies.set(TWO_FA_COOKIE, body.twoFactorVerified ? 'true' : 'false', {
        path: '/',
        sameSite: 'lax',
        httpOnly: false,
      });
    }

    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid session payload' }, { status: 400 });
  }
}
