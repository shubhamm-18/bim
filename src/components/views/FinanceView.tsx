'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Download,
  KeyRound,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { financeRecords } from '@/data';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FinanceIcon } from '@/components/ui';
import { OwnerFinanceSection } from '@/components/features/overview';
import { getRoleRoutePolicy } from '@/lib/permissions';

export function FinanceView() {
  const { currentRole, setCurrentView, financeAuditLogs } = useWorkspaceStore();
  const rolePolicy = getRoleRoutePolicy(currentRole);

  const [twoFactorCode, setTwoFactorCode] = useState('246810');
  const [twoFactorVerified, setTwoFactorVerified] = useState(false);
  const [securityMessage, setSecurityMessage] = useState<string | null>(null);

  if (currentRole !== 'Founder') {
    return (
      <div className="max-w-lg mx-auto mt-12 p-8 bg-white border border-border rounded-card text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border flex items-center justify-center mx-auto text-text-main">
          <Lock className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-text-main">
          Owner-Only Finance Restricted
        </h2>
        <p className="text-xs text-text-muted leading-relaxed">
          This dedicated Finance section is strictly restricted to the <strong>Founder (Owner)</strong> view.
        </p>
        <div className="pt-2">
          <Link
            href={rolePolicy.defaultHref}
            onClick={() => setCurrentView(rolePolicy.defaultView)}
            className="inline-flex items-center px-4 py-2 rounded-btn bg-surface-subtle hover:bg-surface-hover border border-border text-xs font-bold text-text-main transition-colors"
          >
            Return to {currentRole} Workspace →
          </Link>
        </div>
      </div>
    );
  }

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/2fa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: twoFactorCode }),
    });
    const data = await res.json();
    if (res.ok && data.verified) {
      setTwoFactorVerified(true);
      setSecurityMessage('2FA verified for Owner session — CSV exports & AES-256 encrypted backups unlocked.');
    } else {
      setSecurityMessage(data.error || '2FA verification failed.');
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
            <FinanceIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-text-main">Finance</h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E3EDE6] text-[#1D563B] border border-[#CFE0D4]">
                <ShieldCheck className="w-3 h-3" /> Owner Only
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Earned revenue, billed, collection, total outstanding, overdue &amp; earned-but-unbilled 0.4% commissions.
            </p>
          </div>
        </div>
      </div>

      {/* 2FA & Encrypted Backup Security Strip */}
      <Card className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center shrink-0">
            <KeyRound className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs font-bold text-text-main">
              2FA Security, Encrypted Backups &amp; Server-Guarded Exports
            </div>
            <div className="text-[11px] text-text-muted">
              {securityMessage ||
                'Verify 6-digit 2FA to unlock server-guarded finance CSV exports and AES-256-GCM encrypted backups.'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!twoFactorVerified ? (
            <form onSubmit={handleVerify2FA} className="flex items-center gap-2">
              <input
                type="text"
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                placeholder="6-digit 2FA"
                className="w-24 px-2.5 py-1.5 text-xs font-mono border border-border rounded-btn bg-white text-text-main"
              />
              <Button type="submit" size="sm" variant="brand">
                Verify 2FA
              </Button>
            </form>
          ) : (
            <>
              <Badge variant="completed">
                <ShieldCheck className="w-3 h-3" /> 2FA Verified
              </Badge>
              <a
                href="/api/finance/export?format=csv"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn border border-border bg-white hover:bg-surface-subtle text-xs font-semibold text-text-main"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </a>
              <a
                href="/api/finance/export?format=encrypted-backup"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-btn bg-[#1D563B] hover:bg-[#2D6A4F] text-white text-xs font-semibold"
              >
                <Lock className="w-3.5 h-3.5" /> Encrypted Backup (AES-256)
              </a>
            </>
          )}
        </div>
      </Card>

      {/* 6 Clickable Amount Cards + Breakdown Modal */}
      <OwnerFinanceSection />

      {/* Full Payer / Project / Service / Bill / Due Date / Received Amount & Date Register */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-text-main">
              Complete Amount &amp; Receipt Breakdown
            </h3>
            <p className="text-[11px] text-text-muted">
              Payer, project, service, bill number, due date, billed amount &amp; received amount with receipt date
            </p>
          </div>
          <Link
            href="/payments"
            onClick={() => setCurrentView('payments')}
            className="text-xs font-semibold text-brand hover:underline"
          >
            Manage Receipts &amp; 0.4% Sync →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Payer</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Bill #</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Billed / Earned</th>
                <th className="py-3 px-4">Received Amount &amp; Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {financeRecords.map((row) => (
                <tr key={row.id} className="hover:bg-surface-subtle transition-colors">
                  <td className="py-3.5 px-4 font-bold text-text-main">{row.payer}</td>
                  <td className="py-3.5 px-4 font-semibold text-text-main">{row.project}</td>
                  <td className="py-3.5 px-4 text-text-muted">
                    <div>{row.incomeSource}</div>
                    <div className="text-[10px] text-text-subtle">{row.businessLine}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-text-main">{row.billNo}</td>
                  <td className="py-3.5 px-4 text-text-muted whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-text-subtle" />
                      {row.dueDate}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-text-main tabular-nums">
                    {formatCurrency(row.billedAmount)}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-text-main tabular-nums">
                      {formatCurrency(row.receivedAmount)}
                    </div>
                    <div className="text-[10px] text-text-subtle">
                      Date: {row.receivedDate || '—'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        row.status === 'Overdue'
                          ? 'urgent'
                          : row.status === 'Paid'
                          ? 'completed'
                          : 'pending'
                      }
                    >
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Finance Edits Audit Log */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-border-subtle flex items-center justify-between">
          <h3 className="text-sm font-bold text-text-main">Finance Edits &amp; Security Audit Log</h3>
          <span className="text-[11px] text-text-subtle">{financeAuditLogs.length} audit entries</span>
        </div>
        <div className="divide-y divide-border-subtle">
          {financeAuditLogs.map((log) => (
            <div key={log.id} className="p-3.5 text-xs flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-bold text-text-main">{log.action}</span>
                <span className="text-text-subtle mx-1.5">•</span>
                <span className="font-semibold text-text-muted">{log.target}</span>
                <div className="text-[11px] text-text-subtle mt-0.5">{log.details}</div>
              </div>
              <div className="text-right text-[10px] text-text-subtle">
                <div>{log.actor}</div>
                <div>{log.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
