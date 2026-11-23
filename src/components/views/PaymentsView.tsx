'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PaymentsIcon } from '@/components/ui';

export function PaymentsView() {
  const { payments } = useWorkspaceStore();

  const totalInvoiced = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalReceived = payments.reduce((acc, p) => acc + p.paidAmount, 0);
  const totalPending = totalInvoiced - totalReceived;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
          <PaymentsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Payments & Billing</h1>
          <p className="text-xs text-text-subtle">
            Manage agency retainers, video production invoices, and developer disbursements.
          </p>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <span className="text-xs font-semibold text-text-subtle">Total Invoiced</span>
          <div className="text-2xl font-extrabold text-text-main mt-1">
            {formatCurrency(totalInvoiced)}
          </div>
        </Card>
        <Card className="p-5">
          <span className="text-xs font-semibold text-text-subtle">Disbursed / Received</span>
          <div className="text-2xl font-extrabold text-text-main mt-1">
            {formatCurrency(totalReceived)}
          </div>
        </Card>
        <Card className="p-5">
          <span className="text-xs font-semibold text-text-subtle">Outstanding Pending</span>
          <div className="text-2xl font-extrabold text-text-main mt-1">
            {formatCurrency(totalPending)}
          </div>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex items-center justify-between">
          <h3 className="text-base font-bold text-text-main">Invoicing Register</h3>
          <span className="text-xs text-text-subtle font-medium">{payments.length} invoices recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-surface-subtle transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-text-main">{pay.invoiceNo}</td>
                  <td className="py-3.5 px-4 font-bold text-text-main">{pay.projectName}</td>
                  <td className="py-3.5 px-4 text-text-muted">{pay.description}</td>
                  <td className="py-3.5 px-4 font-bold text-text-main">{formatCurrency(pay.amount)}</td>
                  <td className="py-3.5 px-4 font-bold text-text-main">{formatCurrency(pay.paidAmount)}</td>
                  <td className="py-3.5 px-4 text-text-subtle">{formatDate(pay.dueDate)}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        pay.status === 'Paid'
                          ? 'success'
                          : pay.status === 'Part paid'
                          ? 'warning'
                          : 'danger'
                      }
                    >
                      {pay.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
