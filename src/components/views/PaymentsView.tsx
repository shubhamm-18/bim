'use client';

import React, { useState } from 'react';
import { Lock, Plus, RefreshCw, ShieldAlert, ShieldCheck, Wallet } from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { canViewFinance, isClientScopedRole } from '@/lib/permissions';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PaymentsIcon } from '@/components/ui';

export function PaymentsView() {
  const {
    currentRole,
    scopedDeveloperClient,
    payments,
    commissionBookings,
    metaAdFunds,
    financeAuditLogs,
    projects,
    syncCommissionBooking,
    recordCommissionReceipt,
    recordPaymentReceipt,
  } = useWorkspaceStore();

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [receiptTargetId, setReceiptTargetId] = useState<string | null>(null);
  const [receiptAmount, setReceiptAmount] = useState<string>('8000');

  // Booking sync form state
  const [selectedProjectName, setSelectedProjectName] = useState('Shakti Skyline');
  const [bookingId, setBookingId] = useState('BK-SKY-501');
  const [leadRef, setLeadRef] = useState('GN-LEAD-9201');
  const [unit, setUnit] = useState('Tower B - 902');
  const [dealValue, setDealValue] = useState('5000000');
  const [dueDate, setDueDate] = useState('21 Nov 2026');

  const isAuthorizedFinance = canViewFinance(currentRole);
  const isClientPortal = isClientScopedRole(currentRole);

  const handleBookingSync = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedProj = projects.find((p) => p.name === selectedProjectName);
    const clientName = isClientPortal
      ? scopedDeveloperClient
      : matchedProj?.clientName || 'Shakti Group';

    const result = syncCommissionBooking({
      client: clientName,
      project: selectedProjectName,
      bookingId,
      leadRef,
      unit,
      dealValue: Number(dealValue) || 0,
      dueDate,
    });

    if (result.deduplicated) {
      setSyncMessage(
        `Deduplicated: ${selectedProjectName} + ${bookingId} already exists — commission preserved at 1x without double counting.`
      );
    } else {
      setSyncMessage(
        `Synced: Eligible deal ${formatCurrency(Number(dealValue) || 0)} × 0.004 = ${formatCurrency(Math.round((Number(dealValue) || 0) * 0.004))} earned.`
      );
    }
    setShowBookingForm(false);
  };

  // Restricted Portal for Client / Developer (Page 2 Access Spec)
  if (isClientPortal) {
    const allowedProjects = projects.filter((p) => p.clientName === scopedDeveloperClient);
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
              <PaymentsIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-main">
                Developer Booking Update Portal ({scopedDeveloperClient})
              </h1>
              <p className="text-xs text-text-subtle">
                Restricted client sheet access: submit/update bookings only for your authorized projects. Agency invoices &amp; commissions remain private.
              </p>
            </div>
          </div>
          <Badge variant="outline">Scoped Client: {scopedDeveloperClient}</Badge>
        </div>

        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-text-main">Submit Authorized Project Booking</h3>
            <span className="text-[11px] text-text-subtle">
              Other developer accounts (e.g. Client B) cannot be accessed from this login
            </span>
          </div>

          {syncMessage && (
            <div className="p-3 rounded-btn bg-surface-subtle border border-border text-xs font-medium text-text-main">
              {syncMessage}
            </div>
          )}

          <form onSubmit={handleBookingSync} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Select
              value={allowedProjects[0]?.name || selectedProjectName}
              onChange={(e) => setSelectedProjectName(e.target.value)}
            >
              {allowedProjects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </Select>
            <Input
              required
              placeholder="Booking ID (e.g. BK-SKY-501)"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
            />
            <Input
              required
              placeholder="Lead Reference"
              value={leadRef}
              onChange={(e) => setLeadRef(e.target.value)}
            />
            <Input
              required
              placeholder="Unit (e.g. Tower B - 902)"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
            <Input
              required
              type="number"
              placeholder="Agreed Deal Value (INR)"
              value={dealValue}
              onChange={(e) => setDealValue(e.target.value)}
            />
            <Button type="submit" variant="brand" size="md">
              Submit Authorized Booking Update
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Strict Security Wall for PM / Team / Ads / Sales Roles (Page 2 Spec)
  if (!isAuthorizedFinance) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Payments &amp; Finance</h1>
            <p className="text-xs text-text-subtle">Role-based finance access enforcement</p>
          </div>
        </div>

        <Card className="p-8 text-center max-w-xl mx-auto space-y-3 border-2 border-border">
          <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border flex items-center justify-center mx-auto text-text-main">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-text-main">
            Access Restricted for {currentRole}
          </h2>
          <p className="text-xs text-text-muted leading-relaxed">
            Security policy: Client fees, property deal values, 0.4% commissions, invoices, and collections are private to <strong>Founder</strong> and <strong>Accountant</strong> roles only.
          </p>
          <p className="text-[11px] text-text-subtle">
            Switch to <strong>Founder view</strong> or <strong>Accountant view</strong> in the top bar to manage billing and 0.4% commission recovery.
          </p>
        </Card>
      </div>
    );
  }

  const totalBilledInvoices = payments.reduce((acc, p) => acc + p.amount, 0);
  const totalPaidInvoices = payments.reduce((acc, p) => acc + p.paidAmount, 0);
  const totalCommissionEarned = commissionBookings.reduce((acc, c) => acc + c.commissionAmount, 0);
  const totalCommissionCollected = commissionBookings.reduce((acc, c) => acc + c.receiptEntered, 0);

  const combinedEarnedRevenue = totalBilledInvoices + totalCommissionEarned;
  const combinedCollection = totalPaidInvoices + totalCommissionCollected;
  const combinedOutstanding = combinedEarnedRevenue - combinedCollection;
  const combinedOverdue =
    payments
      .filter((p) => p.status === 'Overdue')
      .reduce((acc, p) => acc + (p.amount - p.paidAmount), 0) +
    commissionBookings
      .filter((c) => c.stage === 'Overdue')
      .reduce((acc, c) => acc + c.pendingAmount, 0);
  const unbilledCommission = commissionBookings
    .filter((c) => c.stage === 'Verified / Earned' || c.stage === 'Reported')
    .reduce((acc, c) => acc + c.pendingAmount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
            <PaymentsIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-text-main">
                Finance, Billing &amp; 0.4% Commission
              </h1>
              <Badge variant="outline">
                <ShieldCheck className="w-3 h-3" /> {currentRole} Authorized
              </Badge>
            </div>
            <p className="text-xs text-text-subtle">
              BIM retainers, GruhNest onboarding &amp; 0.4% sale commission recovery, GruhNest Pro fees, and separate Client Meta Ad funds.
            </p>
          </div>
        </div>

        <Button
          variant="brand"
          size="md"
          onClick={() => setShowBookingForm(!showBookingForm)}
        >
          <Plus className="w-4 h-4" />
          <span>Sync / Log Booking (0.4%)</span>
        </Button>
      </div>

      {syncMessage && (
        <div className="p-3.5 rounded-card bg-surface-subtle border border-border text-xs font-semibold text-text-main flex items-center justify-between">
          <span>{syncMessage}</span>
          <button
            onClick={() => setSyncMessage(null)}
            className="text-text-subtle hover:text-text-main text-[11px] underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Owner / Accountant Finance Summary Strip (6 PDF KPIs) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-subtle">Earned Revenue</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {formatCurrency(combinedEarnedRevenue)}
          </div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-subtle">Billed (Invoices)</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {formatCurrency(totalBilledInvoices)}
          </div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-subtle">Collection Received</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {formatCurrency(combinedCollection)}
          </div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-subtle">Total Outstanding</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {formatCurrency(combinedOutstanding)}
          </div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-subtle">Overdue Balance</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {formatCurrency(combinedOverdue)}
          </div>
          {combinedOverdue > 0 && (
            <Badge variant="urgent" className="mt-1">Overdue</Badge>
          )}
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-subtle">Earned-Unbilled Comm.</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {formatCurrency(unbilledCommission)}
          </div>
        </Card>
      </div>

      {/* Sync / Log Booking Form (Tests Deduplication & 0.4% Rule) */}
      {showBookingForm && (
        <Card className="p-5 space-y-4 border-2 border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-main">
                Step 1–3: Booking Sync &amp; 0.4% Commission Calculator
              </h3>
              <p className="text-[11px] text-text-subtle">
                Duplicate safety: syncing the same Project + Booking ID twice counts 0.4% commission only once.
              </p>
            </div>
            <Badge variant="outline">Deal Value × 0.004</Badge>
          </div>

          <form onSubmit={handleBookingSync} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-text-subtle block mb-1">Project</label>
              <Select
                value={selectedProjectName}
                onChange={(e) => setSelectedProjectName(e.target.value)}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name} ({p.clientName})
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-text-subtle block mb-1">Booking ID (Dedup Key)</label>
              <Input
                required
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="e.g. BK-SKY-402"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-text-subtle block mb-1">Deal Value (INR)</label>
              <Input
                required
                type="number"
                value={dealValue}
                onChange={(e) => setDealValue(e.target.value)}
                placeholder="5000000"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-text-subtle block mb-1">GruhNest Lead Ref</label>
              <Input value={leadRef} onChange={(e) => setLeadRef(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-text-subtle block mb-1">Unit</label>
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-text-subtle block mb-1">Due Date</label>
              <Input value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            <div className="sm:col-span-3 flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-text-muted">
                Preview Commission: {formatCurrency(Math.round((Number(dealValue) || 0) * 0.004))}
              </span>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowBookingForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="brand" size="sm">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Verify &amp; Sync Booking</span>
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      {/* GruhNest 0.4% Commission Ledger */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-text-main">
              GruhNest 0.4% Sale Commission Ledger
            </h3>
            <p className="text-[11px] text-text-subtle">
              Stages: Reported → Verified/Earned → Invoiced → Part-Paid / Paid (or Overdue after due date)
            </p>
          </div>
          <span className="text-xs text-text-subtle font-medium">
            {commissionBookings.length} verified bookings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Project &amp; Booking ID</th>
                <th className="py-3 px-4">Deal Value</th>
                <th className="py-3 px-4">0.4% Comm.</th>
                <th className="py-3 px-4">Receipt Entered</th>
                <th className="py-3 px-4">Pending Balance</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Stage &amp; Sync</th>
                <th className="py-3 px-4 text-right">Recovery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {commissionBookings.map((com) => (
                <tr key={com.id} className="hover:bg-surface-subtle transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-text-main">
                      {com.project} · {com.bookingId}
                    </div>
                    <div className="text-[11px] text-text-subtle">
                      {com.client} • {com.unit} • Ref: {com.leadRef}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-text-main">
                    {formatCurrency(com.dealValue)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-text-main">
                    {formatCurrency(com.commissionAmount)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-text-main">
                    {formatCurrency(com.receiptEntered)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-text-main">
                    {formatCurrency(com.pendingAmount)}
                  </td>
                  <td className="py-3.5 px-4 text-text-subtle">{com.dueDate}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant={
                          com.stage === 'Paid'
                            ? 'completed'
                            : com.stage === 'Overdue'
                            ? 'urgent'
                            : 'pending'
                        }
                      >
                        {com.stage}
                      </Badge>
                      {com.syncCount > 1 && (
                        <span className="text-[10px] text-text-subtle border border-border px-1.5 py-0.5 rounded-full">
                          Synced {com.syncCount}x (1x counted)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {com.pendingAmount > 0 && (
                      receiptTargetId === com.id ? (
                        <div className="inline-flex items-center gap-1">
                          <input
                            type="number"
                            value={receiptAmount}
                            onChange={(e) => setReceiptAmount(e.target.value)}
                            className="w-20 px-2 py-1 text-xs border border-border rounded-btn bg-white"
                          />
                          <Button
                            size="sm"
                            variant="brand"
                            onClick={() => {
                              recordCommissionReceipt(com.id, Number(receiptAmount) || 0, currentRole);
                              setReceiptTargetId(null);
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setReceiptTargetId(com.id);
                            setReceiptAmount(String(Math.min(8000, com.pendingAmount)));
                          }}
                        >
                          + Receipt
                        </Button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Invoices Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-text-main">
              Agency Invoices &amp; Retainer Billing Register
            </h3>
            <p className="text-[11px] text-text-subtle">
              BIM retainers, GruhNest onboarding/content fees &amp; GruhNest Pro setup/monthly billing
            </p>
          </div>
          <span className="text-xs text-text-subtle font-medium">{payments.length} invoices recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Income Source / Description</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
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
                          ? 'completed'
                          : pay.status === 'Part paid' || pay.status === 'Pending'
                          ? 'pending'
                          : 'urgent'
                      }
                    >
                      {pay.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {pay.amount > pay.paidAmount && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => recordPaymentReceipt(pay.id, pay.amount - pay.paidAmount, currentRole)}
                      >
                        Mark Paid
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Separate Client Meta Ad Fund Tracker + Finance Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-6 p-0 overflow-hidden">
          <div className="p-4 border-b border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-text-main" />
              <h3 className="text-sm font-bold text-text-main">
                Client Meta Ad Fund (Tracked Separately)
              </h3>
            </div>
            <Badge variant="outline">Non-Revenue Pass-Through</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-text-subtle uppercase text-[10px] bg-surface-subtle">
                  <th className="py-2.5 px-4">Project</th>
                  <th className="py-2.5 px-4">Deposited</th>
                  <th className="py-2.5 px-4">Meta Utilized</th>
                  <th className="py-2.5 px-4">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {metaAdFunds.map((f) => (
                  <tr key={f.id}>
                    <td className="py-2.5 px-4">
                      <div className="font-bold text-text-main">{f.project}</div>
                      <div className="text-[10px] text-text-subtle">Top-up: {f.lastTopUpDate}</div>
                    </td>
                    <td className="py-2.5 px-4">{formatCurrency(f.fundDeposited)}</td>
                    <td className="py-2.5 px-4">{formatCurrency(f.metaSpendUtilized)}</td>
                    <td className="py-2.5 px-4 font-bold text-text-main">{formatCurrency(f.unspentBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6 p-0 overflow-hidden">
          <div className="p-4 border-b border-border-subtle flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-text-main" />
              <h3 className="text-sm font-bold text-text-main">Finance Edit &amp; Sync Audit Log</h3>
            </div>
            <span className="text-[11px] text-text-subtle">{financeAuditLogs.length} entries</span>
          </div>
          <div className="divide-y divide-border-subtle max-h-64 overflow-y-auto">
            {financeAuditLogs.map((log) => (
              <div key={log.id} className="p-3.5 text-xs space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-text-main">{log.action}</span>
                  <span className="text-[10px] text-text-subtle">{log.timestamp}</span>
                </div>
                <div className="text-[11px] font-semibold text-text-muted">
                  {log.target} • By {log.actor}
                </div>
                <div className="text-[11px] text-text-subtle">{log.details}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
