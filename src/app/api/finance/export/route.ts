import { NextRequest, NextResponse } from 'next/server';
import { authorizeFinanceRequest } from '@/lib/server-auth';
import { encryptBackupPayload } from '@/lib/backup-crypto';
import { financeRecords, initialFinanceAuditLogs, clientMetaAdFunds } from '@/data';

export async function GET(req: NextRequest) {
  const format = req.nextUrl.searchParams.get('format') || 'csv';
  const auth = authorizeFinanceRequest(req, { require2FA: true });

  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  if (format === 'encrypted-backup') {
    const encrypted = encryptBackupPayload({
      exportedBy: auth.role,
      financeRecords,
      metaAdFunds: clientMetaAdFunds,
      auditLogs: initialFinanceAuditLogs,
    });

    return new NextResponse(JSON.stringify(encrypted, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="bim-finance-encrypted-backup.json"',
      },
    });
  }

  const header = 'Payer,Project,Service,BillNo,DueDate,Billed,Received,ReceivedDate,Status';
  const lines = financeRecords.map(
    (r) =>
      `"${r.payer}","${r.project}","${r.incomeSource}","${r.billNo}","${r.dueDate}",${r.billedAmount},${r.receivedAmount},"${r.receivedDate || '—'}","${r.status}"`
  );

  return new NextResponse([header, ...lines].join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bim-finance-export.csv"',
    },
  });
}
