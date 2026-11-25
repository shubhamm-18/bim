import { NextRequest, NextResponse } from 'next/server';
import { parseRoleFromRequest, TWO_FA_COOKIE } from '@/lib/server-auth';
import { canViewFinance } from '@/lib/permissions';

export async function POST(req: NextRequest) {
  const role = parseRoleFromRequest(req);
  if (!canViewFinance(role)) {
    return NextResponse.json(
      { error: `2FA is only applicable to Founder and Accountant roles (not ${role})` },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const code = String(body.code || '').trim();
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: 'Please enter a valid 6-digit 2FA verification code.' },
        { status: 400 }
      );
    }

    const res = NextResponse.json({
      verified: true,
      role,
      verifiedAt: new Date().toISOString(),
    });
    res.cookies.set(TWO_FA_COOKIE, 'true', {
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid 2FA payload' }, { status: 400 });
  }
}
