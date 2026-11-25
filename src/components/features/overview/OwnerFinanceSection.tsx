'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  FileText,
  IndianRupee,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { financeRecords, FinanceRecord } from '@/data';
import { formatCurrency } from '@/lib/utils';
import { useWorkspaceStore } from '@/store/workspace-store';

type FinanceMetricKey =
  | 'earned'
  | 'billed'
  | 'collection'
  | 'outstanding'
  | 'overdue'
  | 'unbilled';

const metricLabels: Record<FinanceMetricKey, { title: string; subtitle: string }> = {
  earned: {
    title: 'Earned Revenue Breakdown',
    subtitle: 'All agency fees & earned 0.4% commissions across clients and projects',
  },
  billed: {
    title: 'Billed Invoices Breakdown',
    subtitle: 'Issued invoices with payer, project, service, bill number & due date',
  },
  collection: {
    title: 'Collection Received Breakdown',
    subtitle: 'Actual receipts collected with received amount and receipt date',
  },
  outstanding: {
    title: 'Total Outstanding Breakdown',
    subtitle: 'Unpaid billed balances awaiting recovery as of today',
  },
  overdue: {
    title: 'Overdue Invoices & Commission',
    subtitle: 'Balances past due date requiring immediate recovery follow-up',
  },
  unbilled: {
    title: 'Earned-but-Unbilled Commission',
    subtitle: 'Verified 0.4% sale commissions earned but not yet invoiced',
  },
};

export function OwnerFinanceSection() {
  const { currentRole, setCurrentView } = useWorkspaceStore();
  const [activeMetric, setActiveMetric] = useState<FinanceMetricKey | null>(null);

  const totals = useMemo(() => {
    const billed = financeRecords
      .filter((r) => r.status !== 'Unbilled')
      .reduce((acc, r) => acc + r.billedAmount, 0);
    const collection = financeRecords.reduce((acc, r) => acc + r.receivedAmount, 0);
    const outstanding = financeRecords
      .filter((r) => r.status !== 'Unbilled')
      .reduce((acc, r) => acc + (r.billedAmount - r.receivedAmount), 0);
    const overdue = financeRecords
      .filter((r) => r.status === 'Overdue')
      .reduce((acc, r) => acc + (r.billedAmount - r.receivedAmount), 0);
    const unbilled = financeRecords
      .filter((r) => r.status === 'Unbilled')
      .reduce((acc, r) => acc + r.billedAmount, 0);
    const earned = billed + unbilled;

    return { earned, billed, collection, outstanding, overdue, unbilled };
  }, []);

  const modalRows: FinanceRecord[] = useMemo(() => {
    if (!activeMetric) return [];
    if (activeMetric === 'earned') return financeRecords;
    if (activeMetric === 'billed') return financeRecords.filter((r) => r.status !== 'Unbilled');
    if (activeMetric === 'collection') return financeRecords.filter((r) => r.receivedAmount > 0);
    if (activeMetric === 'outstanding') {
      return financeRecords.filter(
        (r) => r.status !== 'Unbilled' && r.billedAmount - r.receivedAmount > 0
      );
    }
    if (activeMetric === 'overdue') return financeRecords.filter((r) => r.status === 'Overdue');
    return financeRecords.filter((r) => r.status === 'Unbilled');
  }, [activeMetric]);

  // Strict Owner-only visibility
  if (currentRole !== 'Founder') {
    return null;
  }

  const cards: Array<{
    key: FinanceMetricKey;
    label: string;
    value: number;
    hint: string;
    badge?: 'urgent' | 'pending' | 'completed';
    badgeText?: string;
  }> = [
    {
      key: 'earned',
      label: 'Earned Revenue',
      value: totals.earned,
      hint: 'Fees + 0.4% Comm.',
    },
    {
      key: 'billed',
      label: 'Billed',
      value: totals.billed,
      hint: 'Invoices issued',
    },
    {
      key: 'collection',
      label: 'Collection',
      value: totals.collection,
      hint: 'Actual receipts',
      badge: 'completed',
      badgeText: 'Received',
    },
    {
      key: 'outstanding',
      label: 'Total Outstanding',
      value: totals.outstanding,
      hint: 'Unpaid balance',
      badge: 'pending',
      badgeText: 'Receivable',
    },
    {
      key: 'overdue',
      label: 'Overdue',
      value: totals.overdue,
      hint: 'Past due date',
      badge: 'urgent',
      badgeText: 'Action Needed',
    },
    {
      key: 'unbilled',
      label: 'Earned-but-Unbilled Comm.',
      value: totals.unbilled,
      hint: '0.4% to invoice',
      badge: 'pending',
      badgeText: 'Unbilled',
    },
  ];

  return (
    <>
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
              <IndianRupee className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-text-main">Finance · Owner View</h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E3EDE6] text-[#1D563B] border border-[#CFE0D4]">
                  <ShieldCheck className="w-3 h-3" /> Owner Only
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-0.5">
                Click any amount card to inspect Payer, Project, Service, Bill #, Due Date &amp; Received Amount / Date
              </p>
            </div>
          </div>

          <Link
            href="/payments"
            onClick={() => setCurrentView('payments')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            <span>Open Full Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {cards.map((c) => (
            <button
              key={c.key}
              onClick={() => setActiveMetric(c.key)}
              className="text-left p-3.5 rounded-xl bg-surface-subtle hover:bg-surface-hover border border-border hover:border-border-hover transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-1 text-[11px] font-semibold text-text-muted">
                  <span className="truncate">{c.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-45 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-text-main mt-1.5 tabular-nums">
                  {formatCurrency(c.value)}
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-1">
                <span className="text-[10px] text-text-subtle truncate">{c.hint}</span>
                {c.badge && c.badgeText && c.value > 0 && (
                  <Badge variant={c.badge} className="text-[9px] px-1.5 py-0">
                    {c.badgeText}
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Owner Finance Amount Details Modal */}
      {activeMetric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-border rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[86vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-4">
              <div className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-text-main">
                    {metricLabels[activeMetric].title}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    {metricLabels[activeMetric].subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveMetric(null)}
                className="p-1.5 rounded-btn border border-border text-text-muted hover:text-text-main hover:bg-surface-subtle transition-colors"
                aria-label="Close finance breakdown"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-text-subtle uppercase tracking-wider text-[10px] bg-surface-subtle">
                    <th className="py-2.5 px-3">Payer</th>
                    <th className="py-2.5 px-3">Project</th>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">Bill #</th>
                    <th className="py-2.5 px-3">Due Date</th>
                    <th className="py-2.5 px-3">Billed</th>
                    <th className="py-2.5 px-3">Received Amount &amp; Date</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {modalRows.map((row) => (
                    <tr key={row.id} className="hover:bg-surface-subtle/70 transition-colors">
                      <td className="py-3 px-3 font-bold text-text-main">{row.payer}</td>
                      <td className="py-3 px-3 font-semibold text-text-main">{row.project}</td>
                      <td className="py-3 px-3 text-text-muted">
                        <div>{row.incomeSource}</div>
                        <div className="text-[10px] text-text-subtle">{row.businessLine}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-text-main">
                        {row.billNo}
                      </td>
                      <td className="py-3 px-3 text-text-muted whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-text-subtle" />
                          {row.dueDate}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-text-main tabular-nums">
                        {formatCurrency(row.billedAmount)}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-text-main tabular-nums">
                          {formatCurrency(row.receivedAmount)}
                        </div>
                        <div className="text-[10px] text-text-subtle">
                          Date: {row.receivedDate || '—'}
                        </div>
                      </td>
                      <td className="py-3 px-3">
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

            <div className="pt-3 border-t border-border-subtle flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-text-muted">
                Showing <strong>{modalRows.length}</strong> record(s) — balances adjust automatically with partial receipts.
              </span>
              <Link
                href="/payments"
                onClick={() => {
                  setActiveMetric(null);
                  setCurrentView('payments');
                }}
                className="inline-flex items-center gap-1 font-bold text-brand hover:underline"
              >
                <span>Manage Receipts &amp; 0.4% Commissions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
