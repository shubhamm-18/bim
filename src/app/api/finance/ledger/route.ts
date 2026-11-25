import { NextRequest, NextResponse } from 'next/server';
import { authorizeFinanceRequest } from '@/lib/server-auth';
import { financeRecords, initialFinanceAuditLogs, clientMetaAdFunds } from '@/data';

export async function GET(req: NextRequest) {
  const ownerOnly = req.nextUrl.searchParams.get('scope') === 'owner';
  const auth = authorizeFinanceRequest(req, { ownerOnly });

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  return NextResponse.json({
    role: auth.role,
    records: financeRecords,
    metaAdFunds: clientMetaAdFunds,
    auditLogs: initialFinanceAuditLogs,
  });
}
