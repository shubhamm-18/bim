'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { CreditCard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export function PaymentsView() {
  const { payments } = useWorkspaceStore();

  const totalInvoiced = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalReceived = payments.reduce((acc, p) => acc + p.paidAmount, 0);
  const totalPending = totalInvoiced - totalReceived;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#20222c]">Payments & Billing</h1>
        <p className="text-xs text-[#8e91a0]">
          Manage agency retainers, video production invoices, and developer disbursements.
        </p>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm">
          <span className="text-xs font-semibold text-[#8e91a0]">Total Invoiced</span>
          <div className="text-2xl font-extrabold text-[#20222c] mt-1">
            {formatCurrency(totalInvoiced)}
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm">
          <span className="text-xs font-semibold text-[#8e91a0]">Disbursed / Received</span>
          <div className="text-2xl font-extrabold text-[#059669] mt-1">
            {formatCurrency(totalReceived)}
          </div>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm">
          <span className="text-xs font-semibold text-[#8e91a0]">Outstanding Pending</span>
          <div className="text-2xl font-extrabold text-[#ea580c] mt-1">
            {formatCurrency(totalPending)}
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-[#e4e5ec] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#f0f1f5] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#20222c]">Invoicing Register</h3>
          <span className="text-xs text-[#8e91a0] font-medium">{payments.length} invoices recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#f0f1f5] text-[#8e91a0] font-semibold uppercase tracking-wider text-[10px] bg-[#f7f8fa]">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f1f5]">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#7040cd]">{pay.invoiceNo}</td>
                  <td className="py-3.5 px-4 font-bold text-[#20222c]">{pay.projectName}</td>
                  <td className="py-3.5 px-4 text-[#535767]">{pay.description}</td>
                  <td className="py-3.5 px-4 font-bold text-[#20222c]">{formatCurrency(pay.amount)}</td>
                  <td className="py-3.5 px-4 font-bold text-[#059669]">{formatCurrency(pay.paidAmount)}</td>
                  <td className="py-3.5 px-4 text-[#727583]">{formatDate(pay.dueDate)}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        pay.status === 'Paid'
                          ? 'bg-[#d1fae5] text-[#059669]'
                          : pay.status === 'Part paid'
                          ? 'bg-[#fef3c7] text-[#d97706]'
                          : 'bg-[#fee2e2] text-[#dc2626]'
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
