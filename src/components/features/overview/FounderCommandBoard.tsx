'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowUpRight,
  Clock,
  DollarSign,
  Filter,
  Lock,
  Megaphone,
  PhoneCall,
  RefreshCw,
  Users,
  X,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useWorkspaceStore } from '@/store/workspace-store';
import {
  actionAlertRecords,
  BusinessLineFilter,
  gruhNestAdRecords,
  gruhNestProRecords,
  PeriodFilter,
  teamDeliveryRecords,
} from '@/data';
import { formatCurrency } from '@/lib/utils';
import {
  canViewCampaignSpend,
  canViewFinance,
  getRoleAccessSummary,
  isClientScopedRole,
} from '@/lib/permissions';
import { ClientDetailModal } from '@/components/features/projects';

type DrilldownKind =
  | null
  | {
      title: string;
      subtitle: string;
      type: 'finance' | 'delivery' | 'gruhnest' | 'pro';
    };

export function FounderCommandBoard() {
  const {
    currentRole,
    scopedDeveloperClient,
    periodFilter,
    setPeriodFilter,
    businessLineFilter,
    setBusinessLineFilter,
    selectedClientFilter,
    setSelectedClientFilter,
    clients,
    projects,
    payments,
    commissionBookings,
    approvalItems,
  } = useWorkspaceStore();

  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [drilldown, setDrilldown] = useState<DrilldownKind>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [detailClientName, setDetailClientName] = useState<string | null>(null);

  const showFinance = canViewFinance(currentRole);
  const showSpend = canViewCampaignSpend(currentRole);
  const clientScoped = isClientScopedRole(currentRole);

  const effectiveClient = clientScoped ? scopedDeveloperClient : selectedClientFilter || 'All';

  // Live filtered collections
  const scopedProjects = useMemo(() => {
    return projects.filter((p) => {
      if (effectiveClient !== 'All' && p.clientName !== effectiveClient) return false;
      if (projectFilter !== 'All' && p.name !== projectFilter) return false;
      return true;
    });
  }, [projects, effectiveClient, projectFilter]);

  const filteredPayments = useMemo(() => {
    return payments.filter((pay) => {
      const proj = projects.find((p) => p.name === pay.projectName);
      if (effectiveClient !== 'All' && proj?.clientName !== effectiveClient) return false;
      if (projectFilter !== 'All' && pay.projectName !== projectFilter) return false;
      return true;
    });
  }, [payments, projects, effectiveClient, projectFilter]);

  const filteredCommissions = useMemo(() => {
    return commissionBookings.filter((com) => {
      if (effectiveClient !== 'All' && com.client !== effectiveClient) return false;
      if (projectFilter !== 'All' && com.project !== projectFilter) return false;
      return true;
    });
  }, [commissionBookings, effectiveClient, projectFilter]);

  const filteredAds = useMemo(() => {
    return gruhNestAdRecords.filter((ad) => {
      if (effectiveClient !== 'All' && ad.client !== effectiveClient) return false;
      if (projectFilter !== 'All' && ad.project !== projectFilter) return false;
      return true;
    });
  }, [effectiveClient, projectFilter]);

  const filteredPro = useMemo(() => {
    return gruhNestProRecords.filter((pro) => {
      if (effectiveClient !== 'All' && pro.client !== effectiveClient) return false;
      if (projectFilter !== 'All' && pro.project !== projectFilter) return false;
      return true;
    });
  }, [effectiveClient, projectFilter]);

  const filteredAlerts = useMemo(() => {
    return actionAlertRecords.filter((a) => {
      if (!showFinance && a.isFinanceOnly) return false;
      if (businessLineFilter !== 'All' && a.businessLine !== businessLineFilter) return false;
      if (effectiveClient !== 'All' && !a.clientProject.includes(effectiveClient)) return false;
      if (projectFilter !== 'All' && !a.clientProject.includes(projectFilter)) return false;
      return true;
    });
  }, [showFinance, businessLineFilter, effectiveClient, projectFilter]);

  // Finance totals calculated live from invoices + 0.4% commissions
  const financeTotals = useMemo(() => {
    const billedInvoices = filteredPayments.reduce((s, p) => s + p.amount, 0);
    const paidInvoices = filteredPayments.reduce((s, p) => s + p.paidAmount, 0);
    const totalCommission = filteredCommissions.reduce((s, c) => s + c.commissionAmount, 0);
    const collectedCommission = filteredCommissions.reduce((s, c) => s + c.receiptEntered, 0);

    const earnedRevenue = billedInvoices + totalCommission;
    const billed = billedInvoices + filteredCommissions.filter((c) => c.stage === 'Invoiced' || c.stage === 'Part-Paid' || c.stage === 'Paid' || c.stage === 'Overdue').reduce((s, c) => s + c.commissionAmount, 0);
    const collection = paidInvoices + collectedCommission;
    const outstanding = earnedRevenue - collection;
    const overdue =
      filteredPayments
        .filter((p) => p.status === 'Overdue')
        .reduce((s, p) => s + (p.amount - p.paidAmount), 0) +
      filteredCommissions
        .filter((c) => c.stage === 'Overdue')
        .reduce((s, c) => s + c.pendingAmount, 0);
    const unbilledCommission = filteredCommissions
      .filter((c) => c.stage === 'Verified / Earned' || c.stage === 'Reported')
      .reduce((s, c) => s + c.pendingAmount, 0);

    return { earnedRevenue, billed, collection, outstanding, overdue, unbilledCommission };
  }, [filteredPayments, filteredCommissions]);

  const deliveryTotals = useMemo(() => {
    const due = teamDeliveryRecords.reduce((s, t) => s + t.assigned, 0);
    const onTime = teamDeliveryRecords.reduce((s, t) => s + t.onTime, 0);
    const late = teamDeliveryRecords.reduce((s, t) => s + t.late, 0);
    const pendingApprovals = approvalItems.filter((a) => a.status === 'Pending').length;
    return {
      due,
      delivered: onTime + late,
      onTimePct: due > 0 ? Math.round((onTime / due) * 100) : 0,
      overdue: late,
      stuckApproval: pendingApprovals,
      atRiskClients: 1,
    };
  }, [approvalItems]);

  const adTotals = useMemo(() => {
    const spend = filteredAds.reduce((s, a) => s + a.spend, 0);
    const leads = filteredAds.reduce((s, a) => s + a.leads, 0);
    const qualified = filteredAds.reduce((s, a) => s + a.qualifiedLeads, 0);
    const visits = filteredAds.reduce((s, a) => s + a.visitsCompleted, 0);
    const bookings = filteredAds.reduce((s, a) => s + a.confirmedBookings, 0);
    const wasted = filteredAds
      .filter((a) => a.adAlert === 'Wasted Spend')
      .reduce((s, a) => s + a.spend, 0);
    return { spend, leads, qualified, visits, bookings, wasted };
  }, [filteredAds]);

  return (
    <div className="space-y-5">
      {/* Global Filter Bar & Active Role Access Notice */}
      <Card className="p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-text-main flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-text-subtle" />
              Founder Filters:
            </span>

            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as PeriodFilter)}
              className="text-xs font-semibold border border-border rounded-btn px-2.5 py-1.5 bg-surface-card text-text-main"
            >
              <option value="This month">Period: This month</option>
              <option value="Last month">Period: Last month</option>
              <option value="This quarter">Period: This quarter</option>
              <option value="YTD">Period: YTD</option>
            </select>

            <select
              value={businessLineFilter}
              onChange={(e) => setBusinessLineFilter(e.target.value as BusinessLineFilter)}
              className="text-xs font-semibold border border-border rounded-btn px-2.5 py-1.5 bg-surface-card text-text-main"
            >
              <option value="All">Business: All (BIM / GruhNest / Pro)</option>
              <option value="BIM">BIM</option>
              <option value="GruhNest">GruhNest</option>
              <option value="GruhNest Pro">GruhNest Pro</option>
            </select>

            <select
              disabled={clientScoped}
              value={effectiveClient}
              onChange={(e) =>
                setSelectedClientFilter(e.target.value === 'All' ? null : e.target.value)
              }
              className="text-xs font-semibold border border-border rounded-btn px-2.5 py-1.5 bg-surface-card text-text-main disabled:opacity-60"
            >
              <option value="All">Client: All Accounts</option>
              {clients.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="text-xs font-semibold border border-border rounded-btn px-2.5 py-1.5 bg-surface-card text-text-main"
            >
              <option value="All">Project: All ({scopedProjects.length})</option>
              {projects
                .filter((p) => effectiveClient === 'All' || p.clientName === effectiveClient)
                .map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
            </select>
          </div>

          <span className="text-[11px] font-medium text-text-subtle">
            {getRoleAccessSummary(currentRole)}
          </span>
        </div>
      </Card>

      {/* 1. FINANCE · OWNER ONLY */}
      <Card className="p-5 bg-gradient-to-br from-white via-white to-emerald-50/40 border-emerald-200/60">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-bold text-text-main">Finance · Owner Only</h2>
            <span className="text-[10px] font-medium text-text-subtle">
              Click any counter for payer, project, service, bill &amp; receipt records
            </span>
          </div>
          {showFinance ? (
            <Link
              href="/payments"
              className="text-xs font-semibold text-text-main hover:underline"
            >
              Open Full Ledger &amp; 0.4% Commission →
            </Link>
          ) : (
            <Badge variant="pending">
              <Lock className="w-3 h-3" /> Private for {currentRole}
            </Badge>
          )}
        </div>

        {showFinance ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Earned Revenue', val: formatINR(financeTotals.earnedRevenue), tone: 'neutral' },
              { label: 'Billed', val: formatINR(financeTotals.billed), tone: 'neutral' },
              { label: 'Collection', val: formatINR(financeTotals.collection), tone: 'completed' },
              { label: 'Total Outstanding', val: formatINR(financeTotals.outstanding), tone: 'pending' },
              { label: 'Overdue', val: formatINR(financeTotals.overdue), tone: 'urgent' },
              { label: 'Earned-Unbilled Comm.', val: formatINR(financeTotals.unbilledCommission), tone: 'pending' },
            ].map((kpi) => (
              <button
                key={kpi.label}
                onClick={() =>
                  setDrilldown({
                    title: `Finance Records — ${kpi.label}`,
                    subtitle: 'Payer, project, service, bill #, due date & received amount',
                    type: 'finance',
                  })
                }
                className="text-left p-3.5 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-text-muted">
                  <span className="truncate">{kpi.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 shrink-0" />
                </div>
                <div className="text-lg font-extrabold text-text-main mt-1">{kpi.val}</div>
                {kpi.tone === 'urgent' && financeTotals.overdue > 0 && (
                  <Badge variant="urgent" className="mt-1">Overdue</Badge>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-3.5 rounded-xl border border-dashed border-border bg-surface-subtle text-xs text-text-muted flex items-center gap-2">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              Security enforced: Client fees, property deal values, 0.4% commissions, invoices &amp; collections are restricted to Founder &amp; Accountant views.
            </span>
          </div>
        )}
      </Card>

      {/* 2 & 3. DELIVERY AUR TEAM + GRUHNEST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Delivery & Team */}
        <Card className="lg:col-span-5 p-5 flex flex-col justify-between bg-gradient-to-br from-white via-white to-indigo-50/45 border-indigo-200/60">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-200/80 text-indigo-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </span>
                <h2 className="text-sm font-bold text-text-main">Delivery aur Team</h2>
              </div>
              <button
                onClick={() => {
                  setSelectedMember(null);
                  setDrilldown({
                    title: 'Team Delivery Records',
                    subtitle: 'On-time % = time par delivered ÷ period ke total due (overdue in denominator)',
                    type: 'delivery',
                  });
                }}
                className="text-[11px] font-semibold text-text-muted hover:text-text-main underline"
              >
                All Members
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { label: 'Due vs Delivered', val: `${deliveryTotals.due} / ${deliveryTotals.delivered}` },
                { label: 'On-Time %', val: `${deliveryTotals.onTimePct}%` },
                { label: 'Overdue Work', val: String(deliveryTotals.overdue) },
                { label: 'Stuck in Approval', val: String(deliveryTotals.stuckApproval) },
                { label: 'At-Risk Clients', val: String(deliveryTotals.atRiskClients) },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setSelectedMember(null);
                    setDrilldown({
                      title: `Delivery — ${item.label}`,
                      subtitle: 'Assigned, on-time, late, rework & blocker owner attribution',
                      type: 'delivery',
                    });
                  }}
                  className="text-left p-3 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover transition-all"
                >
                  <div className="text-[11px] text-text-muted">{item.label}</div>
                  <div className="text-base font-extrabold text-text-main mt-1">{item.val}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle flex flex-wrap gap-1.5">
            {teamDeliveryRecords.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMember(m.member);
                  setDrilldown({
                    title: `Member Stats: ${m.member}`,
                    subtitle: `${m.role} • Assigned ${m.assigned}, On-Time ${m.onTime}, Late ${m.late}, Rework ${m.rework}`,
                    type: 'delivery',
                  });
                }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-border bg-white hover:bg-surface-subtle text-text-main transition-colors"
              >
                {m.member} ({m.onTime}/{m.assigned})
              </button>
            ))}
          </div>
        </Card>

        {/* GruhNest */}
        <Card className="lg:col-span-7 p-5 bg-gradient-to-br from-white via-white to-sky-50/50 border-sky-200/60">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200/80 text-sky-700 flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-text-main">GruhNest — Videos &amp; Meta Funnel</h2>
            </div>
            {showSpend && adTotals.wasted > 0 && (
              <Badge variant="urgent">Wasted Spend Alert: {formatINR(adTotals.wasted)} (0 Leads)</Badge>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3.5">
            {[
              { label: 'Meta Spend', val: showSpend ? formatINR(adTotals.spend) : 'Private' },
              { label: 'Leads', val: String(adTotals.leads) },
              { label: 'Qualified Leads', val: String(adTotals.qualified) },
              { label: 'Visits Completed', val: String(adTotals.visits) },
              { label: 'Bookings', val: String(adTotals.bookings) },
            ].map((k) => (
              <button
                key={k.label}
                onClick={() =>
                  setDrilldown({
                    title: `GruhNest — ${k.label}`,
                    subtitle: 'Client-wise videos planned vs live, Meta Ad IDs & waste spend highlights',
                    type: 'gruhnest',
                  })
                }
                className="text-left p-3 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover transition-all"
              >
                <div className="text-[11px] text-text-muted">{k.label}</div>
                <div className="text-base font-extrabold text-text-main mt-1">{k.val}</div>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                onClick={() => setDetailClientName(ad.client)}
                className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border border-border-subtle bg-surface-subtle hover:bg-surface-hover cursor-pointer text-xs transition-colors"
              >
                <div>
                  <span className="font-bold text-text-main">{ad.project}</span>
                  <span className="text-text-subtle mx-1.5">•</span>
                  <span className="text-text-muted">{ad.plannedVsLive}</span>
                  <span className="text-text-subtle mx-1.5">•</span>
                  <span className="font-mono text-[11px] text-text-subtle">{ad.metaAdId}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  {showSpend && <span className="font-bold text-text-main">{formatINR(ad.spend)}</span>}
                  <span className="text-text-muted">{ad.leads} leads</span>
                  <Badge
                    variant={
                      ad.adAlert === 'Wasted Spend'
                        ? 'urgent'
                        : ad.adAlert === 'Healthy'
                        ? 'completed'
                        : 'pending'
                    }
                  >
                    {ad.adAlert}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* 4 & 5. GRUHNEST PRO + AAJ ACTION CHAHIYE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-5 p-5 bg-gradient-to-br from-white via-white to-violet-50/45 border-violet-200/60">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-violet-50 border border-violet-200/80 text-violet-700 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-text-main">GruhNest Pro</h2>
            </div>
            <span className="text-[10px] font-medium text-text-subtle flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Last Sync: 25 Nov, 03:45 PM
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                label: 'Live Projects',
                val: String(filteredPro.length),
                sub: 'Last update: 25 Nov, 03:45 PM',
              },
              {
                label: '7-Day CRM Updated',
                val: String(filteredPro.filter((p) => p.status === 'Live').length),
                sub: 'Last update: 25 Nov, 10:45 AM',
              },
              {
                label: 'Inactive Clients',
                val: String(filteredPro.filter((p) => p.status === 'Inactive').length),
                sub: 'Last update: 11 Nov, 04:00 PM',
              },
              {
                label: 'AI Calling / Sync Issues',
                val: String(filteredPro.filter((p) => p.status === 'Sync Issue').length),
                sub: 'Last sync: 23 Nov, 09:30 PM',
              },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() =>
                  setDrilldown({
                    title: `GruhNest Pro — ${p.label}`,
                    subtitle: 'Active sales users, Last Login vs Last Human CRM Update & AI call handoffs',
                    type: 'pro',
                  })
                }
                className="text-left p-3 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover transition-all"
              >
                <div className="text-[11px] text-text-muted">{p.label}</div>
                <div className="text-lg font-extrabold text-text-main mt-0.5">{p.val}</div>
                <div className="text-[10px] text-text-subtle mt-1 truncate">{p.sub}</div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-7 p-5 bg-gradient-to-br from-white via-white to-amber-50/45 border-amber-200/60">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-text-main">
                Aaj Action Chahiye ({filteredAlerts.length})
              </h2>
            </div>
            <span className="text-[10px] font-medium text-text-subtle">
              Finance alerts restricted to Founder &amp; Accountant views
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {filteredAlerts.map((al) => (
              <div
                key={al.id}
                className="p-3 rounded-xl border border-border bg-surface-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={al.severity === 'urgent' ? 'urgent' : 'pending'}>
                      {al.pendingDays}d Pending
                    </Badge>
                    <span className="text-xs font-bold text-text-main">{al.clientProject}</span>
                    {al.isFinanceOnly && <Badge variant="outline">Finance Only</Badge>}
                  </div>
                  <p className="text-xs text-text-main">{al.issue}</p>
                  <p className="text-[11px] text-text-muted">
                    <strong>Next:</strong> {al.nextAction} · <strong>Owner:</strong> {al.responsiblePerson}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-text-main shrink-0">
                  <Clock className="w-3 h-3" /> {al.deadline}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Unified Client Quick-Access Buttons ("Client kholne par kya dikhega") */}
      <Card className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-subtle">
            Client Kholne Par (Open 4-Tab Unified Client Record)
          </h3>
          <p className="text-[11px] text-text-muted">
            Inspect BIM Social Media, GruhNest Video Ads, GruhNest Pro Usage &amp; Team Reporting per developer
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {clients
            .filter((c) => !clientScoped || c.name === scopedDeveloperClient)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => setDetailClientName(c.name)}
                className="px-3.5 py-1.5 rounded-btn border border-border bg-surface-subtle hover:bg-surface-hover text-xs font-bold text-text-main transition-colors"
              >
                Open {c.name} →
              </button>
            ))}
        </div>
      </Card>

      {/* Counter Click Drilldown Modal */}
      {drilldown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-border rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-3">
              <div>
                <h3 className="text-base font-bold text-text-main">{drilldown.title}</h3>
                <p className="text-xs text-text-muted mt-0.5">{drilldown.subtitle}</p>
              </div>
              <button
                onClick={() => {
                  setDrilldown(null);
                  setSelectedMember(null);
                }}
                className="p-1.5 rounded-btn border border-border text-text-muted hover:text-text-main"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {drilldown.type === 'finance' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                        <th className="py-2 pr-3">Project &amp; Invoice</th>
                        <th className="py-2 pr-3">Service</th>
                        <th className="py-2 pr-3">Due Date</th>
                        <th className="py-2 pr-3">Billed</th>
                        <th className="py-2 pr-3">Received</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {filteredPayments.map((p) => (
                        <tr key={p.id}>
                          <td className="py-2 pr-3 font-bold text-text-main">
                            {p.projectName} · {p.invoiceNo}
                          </td>
                          <td className="py-2 pr-3 text-text-muted">{p.description}</td>
                          <td className="py-2 pr-3">{p.dueDate}</td>
                          <td className="py-2 pr-3 font-semibold">{formatINR(p.amount)}</td>
                          <td className="py-2 pr-3">{formatINR(p.paidAmount)}</td>
                          <td className="py-2">
                            <Badge variant={p.status === 'Overdue' ? 'urgent' : p.status === 'Paid' ? 'completed' : 'pending'}>
                              {p.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {filteredCommissions.map((c) => (
                        <tr key={c.id}>
                          <td className="py-2 pr-3 font-bold text-text-main">
                            {c.project} · {c.bookingId} ({c.client})
                          </td>
                          <td className="py-2 pr-3 text-text-muted">0.4% Sale Commission</td>
                          <td className="py-2 pr-3">{c.dueDate}</td>
                          <td className="py-2 pr-3 font-semibold">{formatINR(c.commissionAmount)}</td>
                          <td className="py-2 pr-3">{formatINR(c.receiptEntered)}</td>
                          <td className="py-2">
                            <Badge variant={c.stage === 'Overdue' ? 'urgent' : c.stage === 'Paid' ? 'completed' : 'pending'}>
                              {c.stage}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {drilldown.type === 'delivery' && (
              <div className="space-y-2">
                {teamDeliveryRecords
                  .filter((m) => !selectedMember || m.member === selectedMember)
                  .map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-xl border border-border bg-surface-subtle text-xs flex flex-wrap justify-between items-center gap-2"
                    >
                      <div>
                        <div className="font-bold text-text-main">
                          {m.member} ({m.role})
                        </div>
                        <div className="text-text-muted mt-0.5">
                          Blocker Owner: <strong>{m.blockerOwner}</strong> — {m.delayReason}
                        </div>
                      </div>
                      <div className="font-semibold text-text-main">
                        Assigned: {m.assigned} · On-Time: {m.onTime} · Late: {m.late} · Rework: {m.rework}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {drilldown.type === 'gruhnest' && (
              <div className="space-y-2">
                {filteredAds.map((ad) => (
                  <div
                    key={ad.id}
                    className="p-3 rounded-xl border border-border bg-surface-subtle text-xs flex flex-wrap justify-between items-center gap-2"
                  >
                    <div>
                      <div className="font-bold text-text-main">
                        {ad.project} — {ad.videoTitle}
                      </div>
                      <div className="text-text-muted mt-0.5">
                        Meta Ad ID: <span className="font-mono">{ad.metaAdId}</span> · {ad.plannedVsLive}
                      </div>
                    </div>
                    <div className="font-semibold text-text-main">
                      {showSpend ? `${formatINR(ad.spend)} · ` : ''}
                      {ad.leads} Leads · {ad.qualifiedLeads} Qual · {ad.confirmedBookings} Bookings
                    </div>
                  </div>
                ))}
              </div>
            )}

            {drilldown.type === 'pro' && (
              <div className="space-y-2">
                {filteredPro.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl border border-border bg-surface-subtle text-xs flex flex-wrap justify-between items-center gap-2"
                  >
                    <div>
                      <div className="font-bold text-text-main">
                        {p.project} ({p.status})
                      </div>
                      <div className="text-text-muted mt-0.5">
                        Last Login: {p.lastLogin} · Last Human CRM Update: {p.lastHumanCrmUpdate}
                      </div>
                    </div>
                    <div className="font-semibold text-text-main">
                      {p.leadsReceived} Leads · {p.aiCallsAttempted} AI Calls · {p.pendingHandoffs} Pending Handoffs
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4-Tab Unified Client Record Modal */}
      <ClientDetailModal
        clientName={detailClientName}
        onClose={() => setDetailClientName(null)}
      />
    </div>
  );
}

function formatINR(val: number): string {
  return formatCurrency(val);
}
