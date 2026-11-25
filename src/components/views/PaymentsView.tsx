'use client';

import React, { useMemo, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Lock,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatCurrency } from '@/lib/utils';
import { canViewFinance, isClientScopedRole } from '@/lib/permissions';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { PaymentsIcon } from '@/components/ui';

export type IncomeSourceType =
  | 'BIM Retainer / Campaign Fee'
  | 'GruhNest Onboarding / Content Fee'
  | 'Sales Commission'
  | 'GruhNest Pro Setup & Monthly Fee';

const INCOME_SOURCES: IncomeSourceType[] = [
  'BIM Retainer / Campaign Fee',
  'GruhNest Onboarding / Content Fee',
  'Sales Commission',
  'GruhNest Pro Setup & Monthly Fee',
];

interface AccountingLedgerRow {
  id: string;
  client: string;
  project: string;
  incomeSource: IncomeSourceType;
  billNo: string;
  earnedDate: string;
  invoiceDate: string;
  dueDate: string;
  receiptDate: string;
  amount: number;
  receivedAmount: number;
  creditAmount: number;
}

const initialAccountingRows: AccountingLedgerRow[] = [
  {
    id: 'acc-1',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    incomeSource: 'BIM Retainer / Campaign Fee',
    billNo: 'INV-2026-104',
    earnedDate: '2026-11-01',
    invoiceDate: '2026-11-01',
    dueDate: '2026-11-10',
    receiptDate: '2026-11-09',
    amount: 180000,
    receivedAmount: 180000,
    creditAmount: 0,
  },
  {
    id: 'acc-2',
    client: 'Sun Creators',
    project: 'Sun Imperia',
    incomeSource: 'GruhNest Onboarding / Content Fee',
    billNo: 'INV-2026-108',
    earnedDate: '2026-11-04',
    invoiceDate: '2026-11-05',
    dueDate: '2026-11-15',
    receiptDate: '2026-11-14',
    amount: 150000,
    receivedAmount: 90000,
    creditAmount: 10000,
  },
  {
    id: 'acc-3',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    incomeSource: 'Sales Commission',
    billNo: 'INV-2026-115',
    earnedDate: '2026-11-12',
    invoiceDate: '2026-11-14',
    dueDate: '2026-11-21',
    receiptDate: '2026-11-20',
    amount: 20000,
    receivedAmount: 8000,
    creditAmount: 0,
  },
  {
    id: 'acc-4',
    client: 'Sun Creators',
    project: 'Sun Centrica',
    incomeSource: 'GruhNest Pro Setup & Monthly Fee',
    billNo: 'INV-2026-112',
    earnedDate: '2026-11-10',
    invoiceDate: '2026-11-12',
    dueDate: '2026-11-28',
    receiptDate: '—',
    amount: 65000,
    receivedAmount: 0,
    creditAmount: 0,
  },
  {
    id: 'acc-5',
    client: 'Sun Creators',
    project: 'Sun Residency 4',
    incomeSource: 'Sales Commission',
    billNo: 'UNBILLED',
    earnedDate: '2026-11-19',
    invoiceDate: '—',
    dueDate: '—',
    receiptDate: '—',
    amount: 32000,
    receivedAmount: 0,
    creditAmount: 0,
  },
];

export function PaymentsView() {
  const {
    currentRole,
    scopedDeveloperClient,
    metaAdFunds,
    projects,
    syncCommissionBooking,
  } = useWorkspaceStore();

  const isAuthorizedFinance = canViewFinance(currentRole);
  const isClientPortal = isClientScopedRole(currentRole);

  const [asOfDate, setAsOfDate] = useState<string>('2026-11-25');
  const [sourceFilter, setSourceFilter] = useState<'All' | IncomeSourceType>('All');
  const [rows, setRows] = useState<AccountingLedgerRow[]>(initialAccountingRows);
  const [adjustTargetId, setAdjustTargetId] = useState<string | null>(null);
  const [adjustMode, setAdjustMode] = useState<'receipt' | 'credit'>('receipt');
  const [adjustAmount, setAdjustAmount] = useState<string>('5000');

  // Client / Developer portal booking form state
  const [selectedProjectName, setSelectedProjectName] = useState('Shakti Skyline');
  const [bookingId, setBookingId] = useState('BK-SKY-501');
  const [leadRef, setLeadRef] = useState('GN-LEAD-9201');
  const [unit, setUnit] = useState('Tower B - 902');
  const [dealValue, setDealValue] = useState('5000000');
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => sourceFilter === 'All' || r.incomeSource === sourceFilter);
  }, [rows, sourceFilter]);

  const accountingSummary = useMemo(() => {
    let earnedRevenue = 0;
    let billed = 0;
    let collections = 0;
    let outstanding = 0;
    let overdue = 0;
    let creditsApplied = 0;

    for (const r of filteredRows) {
      if (r.earnedDate !== '—' && r.earnedDate <= asOfDate) {
        earnedRevenue += r.amount;
      }
      const isBilledAsOf = r.invoiceDate !== '—' && r.invoiceDate <= asOfDate;
      if (isBilledAsOf) {
        billed += r.amount;
      }
      const receivedAsOf =
        r.receiptDate !== '—' && r.receiptDate <= asOfDate ? r.receivedAmount : 0;
      collections += receivedAsOf;
      creditsApplied += r.creditAmount;

      if (isBilledAsOf) {
        const unpaid = Math.max(0, r.amount - receivedAsOf - r.creditAmount);
        outstanding += unpaid;
        if (r.dueDate !== '—' && r.dueDate < asOfDate && unpaid > 0) {
          overdue += unpaid;
        }
      }
    }

    return { earnedRevenue, billed, collections, outstanding, overdue, creditsApplied };
  }, [filteredRows, asOfDate]);

  const handleApplyAdjustment = (id: string) => {
    const val = Number(adjustAmount) || 0;
    if (val <= 0) return;

    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;
        const maxRemaining = Math.max(0, row.amount - row.receivedAmount - row.creditAmount);
        const applied = Math.min(val, maxRemaining);
        if (adjustMode === 'receipt') {
          return {
            ...row,
            receivedAmount: row.receivedAmount + applied,
            receiptDate: asOfDate,
          };
        }
        return {
          ...row,
          creditAmount: row.creditAmount + applied,
        };
      })
    );
    setAdjustTargetId(null);
  };

  const handleClientBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = syncCommissionBooking({
      client: scopedDeveloperClient,
      project: selectedProjectName,
      bookingId,
      leadRef,
      unit,
      dealValue: Number(dealValue) || 0,
      dueDate: '28 Nov 2026',
    });
    setSyncMessage(
      res.deduplicated
        ? `Duplicate sync ignored for ${selectedProjectName} · ${bookingId}.`
        : `Authorized booking update submitted for ${selectedProjectName} · ${bookingId}.`
    );
  };

  // Restricted Developer / Client View
  if (isClientPortal) {
    const allowedProjects = projects.filter((p) => p.clientName === scopedDeveloperClient);
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
              <PaymentsIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-main">
                Booking Updates ({scopedDeveloperClient})
              </h1>
              <p className="text-xs text-text-muted">
                Restricted client portal: submit authorized project booking updates only. Agency fees &amp; accounting remain private.
              </p>
            </div>
          </div>
          <Badge variant="outline">Scoped Client: {scopedDeveloperClient}</Badge>
        </div>

        <Card className="p-5 space-y-4">
          <h3 className="text-sm font-bold text-text-main">Submit Authorized Booking Update</h3>
          {syncMessage && (
            <div className="p-3 rounded-btn bg-surface-subtle border border-border text-xs font-medium text-text-main">
              {syncMessage}
            </div>
          )}
          <form onSubmit={handleClientBookingSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
            <Input required value={bookingId} onChange={(e) => setBookingId(e.target.value)} placeholder="Booking ID" />
            <Input required value={leadRef} onChange={(e) => setLeadRef(e.target.value)} placeholder="Lead Ref" />
            <Input required value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit" />
            <Input required type="number" value={dealValue} onChange={(e) => setDealValue(e.target.value)} placeholder="Deal Value" />
            <Button type="submit" variant="brand" size="md">
              <Plus className="w-4 h-4" />
              <span>Submit Update</span>
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Strict Security Guard for Non-Finance Roles
  if (!isAuthorizedFinance) {
    return (
      <div className="space-y-6 pb-12">
        <Card className="p-8 text-center max-w-xl mx-auto space-y-3 border-2 border-border mt-8">
          <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border flex items-center justify-center mx-auto text-text-main">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-text-main">
            Payment Accounting Restricted for {currentRole}
          </h2>
          <p className="text-xs text-text-muted leading-relaxed">
            Client fees, income sources, sales commissions, invoices, and collections are private to <strong>Founder</strong> and <strong>Accountant</strong> roles only.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header & As-Of Date Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
            <PaymentsIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-text-main">Payment Accounting</h1>
              <Badge variant="outline">
                <ShieldCheck className="w-3 h-3" /> {currentRole} Authorized
              </Badge>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Revenue on earned date, billing on invoice date, collections on actual receipt date. Client Meta ad fund tracked separately.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white border border-border rounded-btn px-3 py-1.5 shadow-2xs shrink-0">
          <Calendar className="w-4 h-4 text-[#1D563B]" />
          <span className="text-xs font-semibold text-text-muted">As of Date:</span>
          <input
            type="date"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
            className="text-xs font-bold text-text-main bg-transparent outline-none cursor-pointer"
          />
        </div>
      </div>

      {/* Period & Balance Summary Strip (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Earned Revenue</span>
          <div className="text-xl font-extrabold text-text-main mt-1 tabular-nums">
            {formatCurrency(accountingSummary.earnedRevenue)}
          </div>
          <span className="text-[10px] text-text-subtle">On earned date (fees + comm.)</span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Billed</span>
          <div className="text-xl font-extrabold text-text-main mt-1 tabular-nums">
            {formatCurrency(accountingSummary.billed)}
          </div>
          <span className="text-[10px] text-text-subtle">On invoice date</span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Collections</span>
          <div className="text-xl font-extrabold text-[#1D563B] mt-1 tabular-nums">
            {formatCurrency(accountingSummary.collections)}
          </div>
          <span className="text-[10px] text-text-subtle">On actual receipt date</span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Outstanding</span>
          <div className="text-xl font-extrabold text-text-main mt-1 tabular-nums">
            {formatCurrency(accountingSummary.outstanding)}
          </div>
          <span className="text-[10px] text-text-subtle">Unpaid invoice balance</span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Overdue</span>
          <div className="text-xl font-extrabold text-text-main mt-1 tabular-nums">
            {formatCurrency(accountingSummary.overdue)}
          </div>
          {accountingSummary.overdue > 0 && (
            <Badge variant="urgent" className="mt-1 text-[9px]">Past Due Date</Badge>
          )}
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Credits Adjusted</span>
          <div className="text-xl font-extrabold text-text-main mt-1 tabular-nums">
            {formatCurrency(accountingSummary.creditsApplied)}
          </div>
          <span className="text-[10px] text-text-subtle">Partial receipts &amp; credits</span>
        </Card>
      </div>

      {/* Income Source Filter Pills */}
      <Card className="p-3.5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-text-muted mr-1">Income Sources:</span>
        {(['All', ...INCOME_SOURCES] as const).map((src) => (
          <button
            key={src}
            onClick={() => setSourceFilter(src)}
            className={`px-3 py-1 rounded-btn text-xs font-semibold transition-colors ${
              sourceFilter === src
                ? 'bg-[#E3EDE6] text-[#1D563B]'
                : 'text-text-muted hover:bg-surface-hover'
            }`}
          >
            {src}
          </button>
        ))}
      </Card>

      {/* Main Period & Balance Ledger */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-text-main">
              Income Sources, Dates &amp; Balance Adjustment Ledger
            </h2>
            <p className="text-[11px] text-text-muted">
              Tracks earned date, invoice date, due date, actual receipt date, partial receipts &amp; credit adjustments as of <strong>{asOfDate}</strong>
            </p>
          </div>
          <span className="text-xs font-medium text-text-subtle">{filteredRows.length} entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Client &amp; Project</th>
                <th className="py-3 px-4">Income Source &amp; Bill #</th>
                <th className="py-3 px-4">Earned / Invoice Date</th>
                <th className="py-3 px-4">Due / Receipt Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Receipts &amp; Credits</th>
                <th className="py-3 px-4">Outstanding / Overdue</th>
                <th className="py-3 px-4 text-right">Adjust</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredRows.map((row) => {
                const isBilledAsOf = row.invoiceDate !== '—' && row.invoiceDate <= asOfDate;
                const receivedAsOf =
                  row.receiptDate !== '—' && row.receiptDate <= asOfDate ? row.receivedAmount : 0;
                const unpaid = isBilledAsOf
                  ? Math.max(0, row.amount - receivedAsOf - row.creditAmount)
                  : 0;
                const isOverdue = isBilledAsOf && row.dueDate !== '—' && row.dueDate < asOfDate && unpaid > 0;

                return (
                  <tr key={row.id} className="hover:bg-surface-subtle/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-text-main">{row.project}</div>
                      <div className="text-[11px] text-text-muted">{row.client}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-text-main">{row.incomeSource}</div>
                      <div className="text-[11px] font-mono text-text-subtle">{row.billNo}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-text-muted">
                      <div>Earned: <strong className="text-text-main">{row.earnedDate}</strong></div>
                      <div>Invoice: <strong className="text-text-main">{row.invoiceDate}</strong></div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-text-muted">
                      <div>Due: <strong className="text-text-main">{row.dueDate}</strong></div>
                      <div>Receipt: <strong className="text-text-main">{row.receiptDate}</strong></div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-text-main tabular-nums">
                      {formatCurrency(row.amount)}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-[#1D563B] tabular-nums">
                        Paid: {formatCurrency(receivedAsOf)}
                      </div>
                      <div className="text-[11px] text-text-subtle tabular-nums">
                        Credit: {formatCurrency(row.creditAmount)}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-text-main tabular-nums">
                        {isBilledAsOf ? formatCurrency(unpaid) : 'Unbilled'}
                      </div>
                      {isOverdue ? (
                        <Badge variant="urgent" className="mt-1 text-[9px]">
                          Overdue: {formatCurrency(unpaid)}
                        </Badge>
                      ) : isBilledAsOf && unpaid === 0 ? (
                        <Badge variant="completed" className="mt-1 text-[9px]">
                          <CheckCircle2 className="w-3 h-3" /> Settled
                        </Badge>
                      ) : (
                        <Badge variant="pending" className="mt-1 text-[9px]">
                          {isBilledAsOf ? 'Open' : 'Earned Unbilled'}
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {unpaid > 0 && (
                        adjustTargetId === row.id ? (
                          <div className="inline-flex items-center gap-1">
                            <select
                              value={adjustMode}
                              onChange={(e) => setAdjustMode(e.target.value as 'receipt' | 'credit')}
                              className="text-[10px] border border-border rounded px-1 py-1 bg-white"
                            >
                              <option value="receipt">Receipt</option>
                              <option value="credit">Credit</option>
                            </select>
                            <input
                              type="number"
                              value={adjustAmount}
                              onChange={(e) => setAdjustAmount(e.target.value)}
                              className="w-20 px-1.5 py-1 text-xs border border-border rounded bg-white"
                            />
                            <Button
                              size="sm"
                              variant="brand"
                              onClick={() => handleApplyAdjustment(row.id)}
                            >
                              Save
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setAdjustTargetId(row.id);
                              setAdjustMode('receipt');
                              setAdjustAmount(String(Math.min(10000, unpaid)));
                            }}
                          >
                            + Receipt / Credit
                          </Button>
                        )
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Separate Client Meta Ad Fund Tracker */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-[#1D563B]" />
            <div>
              <h3 className="text-base font-bold text-text-main">
                Client Meta Ad Fund (Tracked Separately)
              </h3>
              <p className="text-[11px] text-text-muted">
                Pass-through client media budgets kept strictly separate from agency fees &amp; earned revenue
              </p>
            </div>
          </div>
          <Badge variant="outline">Excluded from Agency Revenue</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Client &amp; Project</th>
                <th className="py-3 px-4">Fund Deposited</th>
                <th className="py-3 px-4">Meta Spend Utilized</th>
                <th className="py-3 px-4">Unspent Ad Fund Balance</th>
                <th className="py-3 px-4">Last Top-Up Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {metaAdFunds.map((f) => (
                <tr key={f.id} className="hover:bg-surface-subtle/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-text-main">{f.project}</div>
                    <div className="text-[11px] text-text-muted">{f.client}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-text-main tabular-nums">
                    {formatCurrency(f.fundDeposited)}
                  </td>
                  <td className="py-3 px-4 text-text-muted tabular-nums">
                    {formatCurrency(f.metaSpendUtilized)}
                  </td>
                  <td className="py-3 px-4 font-bold text-[#1D563B] tabular-nums">
                    {formatCurrency(f.unspentBalance)}
                  </td>
                  <td className="py-3 px-4 text-text-subtle">{f.lastTopUpDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
