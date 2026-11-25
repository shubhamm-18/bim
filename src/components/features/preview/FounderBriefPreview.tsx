'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Filter,
  Lock,
  Megaphone,
  PhoneCall,
  RefreshCw,
  ShieldCheck,
  Users,
  Video,
  X,
} from 'lucide-react';
import {
  actionAlertRecords,
  bimSocialItems,
  BusinessLineFilter,
  commissionBookings,
  financeRecords,
  gruhNestAdRecords,
  gruhNestProRecords,
  PeriodFilter,
  PreviewRole,
  teamDeliveryRecords,
} from '@/data/founder-brief.data';

type DrilldownKind =
  | null
  | { title: string; subtitle: string; type: 'finance' | 'delivery' | 'gruhnest' | 'pro' | 'commission' };

function formatINR(val: number): string {
  return '₹' + val.toLocaleString('en-IN');
}

export function FounderBriefPreview() {
  const [period, setPeriod] = useState<PeriodFilter>('This month');
  const [businessLine, setBusinessLine] = useState<BusinessLineFilter>('All');
  const [clientFilter, setClientFilter] = useState<string>('All');
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [roleView, setRoleView] = useState<PreviewRole>('Founder');
  const [clientTab, setClientTab] = useState<'bim' | 'gruhnest' | 'pro' | 'team'>('bim');
  const [drilldown, setDrilldown] = useState<DrilldownKind>(null);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  const canSeeFinance = roleView === 'Founder' || roleView === 'Accountant';

  const clients = ['All', 'Shakti Group', 'Sun Creators'];
  const projects = ['All', 'Shakti Skyline', 'Sun Imperia', 'Sun Residency 4', 'Sun Centrica'];

  const filteredFinance = useMemo(() => {
    return financeRecords.filter((r) => {
      if (businessLine !== 'All' && r.businessLine !== businessLine) return false;
      if (clientFilter !== 'All' && r.payer !== clientFilter) return false;
      if (projectFilter !== 'All' && r.project !== projectFilter) return false;
      return true;
    });
  }, [businessLine, clientFilter, projectFilter]);

  const filteredAds = useMemo(() => {
    return gruhNestAdRecords.filter((r) => {
      if (clientFilter !== 'All' && r.client !== clientFilter) return false;
      if (projectFilter !== 'All' && r.project !== projectFilter) return false;
      return true;
    });
  }, [clientFilter, projectFilter]);

  const filteredPro = useMemo(() => {
    return gruhNestProRecords.filter((r) => {
      if (clientFilter !== 'All' && r.client !== clientFilter) return false;
      if (projectFilter !== 'All' && r.project !== projectFilter) return false;
      return true;
    });
  }, [clientFilter, projectFilter]);

  const filteredAlerts = useMemo(() => {
    return actionAlertRecords.filter((a) => {
      if (!canSeeFinance && a.isFinanceOnly) return false;
      if (businessLine !== 'All' && a.businessLine !== businessLine) return false;
      if (clientFilter !== 'All' && !a.clientProject.includes(clientFilter)) return false;
      if (projectFilter !== 'All' && !a.clientProject.includes(projectFilter)) return false;
      return true;
    });
  }, [canSeeFinance, businessLine, clientFilter, projectFilter]);

  const financeTotals = useMemo(() => {
    const billed = filteredFinance
      .filter((r) => r.status !== 'Unbilled')
      .reduce((s, r) => s + r.billedAmount, 0);
    const collection = filteredFinance.reduce((s, r) => s + r.receivedAmount, 0);
    const outstanding = filteredFinance
      .filter((r) => r.status !== 'Unbilled')
      .reduce((s, r) => s + (r.billedAmount - r.receivedAmount), 0);
    const overdue = filteredFinance
      .filter((r) => r.status === 'Overdue')
      .reduce((s, r) => s + (r.billedAmount - r.receivedAmount), 0);
    const unbilledCommission = filteredFinance
      .filter((r) => r.status === 'Unbilled')
      .reduce((s, r) => s + r.billedAmount, 0);
    const earnedRevenue = billed + unbilledCommission;
    return { earnedRevenue, billed, collection, outstanding, overdue, unbilledCommission };
  }, [filteredFinance]);

  const deliveryTotals = useMemo(() => {
    const due = teamDeliveryRecords.reduce((s, t) => s + t.assigned, 0);
    const onTime = teamDeliveryRecords.reduce((s, t) => s + t.onTime, 0);
    const late = teamDeliveryRecords.reduce((s, t) => s + t.late, 0);
    const pct = due > 0 ? Math.round((onTime / due) * 100) : 0;
    return { due, delivered: onTime + late, onTimePct: pct, overdue: late, stuckApproval: 2, atRiskClients: 1 };
  }, []);

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
    <div className="space-y-6 pb-16">
      {/* Top Brief Header & Global Filters */}
      <div className="bg-white border border-border rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-surface-subtle border border-border text-text-main">
                Tech Build Brief Preview
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-subtle">
                BIM · GruhNest · GruhNest Pro
              </span>
            </div>
            <h1 className="text-2xl font-bold text-text-main">Founder Homepage</h1>
            <p className="text-xs text-text-muted mt-0.5">
              Default view &ldquo;This month&rdquo; — Har counter par click karke uske peeche ke records khol sakte hain.
            </p>
          </div>

          {/* Role Access Preview Switcher (Page 2 Requirement) */}
          <div className="flex flex-col items-start lg:items-end gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-subtle flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Role Access Preview (Kisko Kya Dikhega)
            </span>
            <div className="flex flex-wrap gap-1.5 bg-surface-subtle p-1 rounded-xl border border-border">
              {(['Founder', 'Accountant', 'PM / Team / Ads', 'Client / Developer'] as PreviewRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleView(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    roleView === r
                      ? 'bg-white text-text-main border border-border shadow-xs'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Period, Business, Client & Project Filters */}
        <div className="pt-4 border-t border-border-subtle flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodFilter)}
            className="text-xs font-medium border border-border rounded-lg px-3 py-1.5 bg-white text-text-main"
          >
            <option value="This month">Period: This month</option>
            <option value="Last month">Period: Last month</option>
            <option value="This quarter">Period: This quarter</option>
            <option value="YTD">Period: YTD</option>
          </select>

          <select
            value={businessLine}
            onChange={(e) => setBusinessLine(e.target.value as BusinessLineFilter)}
            className="text-xs font-medium border border-border rounded-lg px-3 py-1.5 bg-white text-text-main"
          >
            <option value="All">Business: All Lines</option>
            <option value="BIM">Business: BIM</option>
            <option value="GruhNest">Business: GruhNest</option>
            <option value="GruhNest Pro">Business: GruhNest Pro</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="text-xs font-medium border border-border rounded-lg px-3 py-1.5 bg-white text-text-main"
          >
            {clients.map((c) => (
              <option key={c} value={c}>
                Client: {c}
              </option>
            ))}
          </select>

          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="text-xs font-medium border border-border rounded-lg px-3 py-1.5 bg-white text-text-main"
          >
            {projects.map((p) => (
              <option key={p} value={p}>
                Project: {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SECTION 1: FINANCE · OWNER ONLY */}
      <section className="bg-white border border-border rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-text-main" />
            <h2 className="text-sm font-bold text-text-main">Finance · Owner Only</h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-border text-text-muted">
              Click any number for bill &amp; payer details
            </span>
          </div>
          {!canSeeFinance && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-800 border border-amber-500/20">
              <Lock className="w-3 h-3" /> Private for {roleView}
            </span>
          )}
        </div>

        {canSeeFinance ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Earned Revenue', value: formatINR(financeTotals.earnedRevenue), tone: 'neutral' },
              { label: 'Billed', value: formatINR(financeTotals.billed), tone: 'neutral' },
              { label: 'Collection', value: formatINR(financeTotals.collection), tone: 'completed' },
              { label: 'Total Outstanding', value: formatINR(financeTotals.outstanding), tone: 'pending' },
              { label: 'Overdue', value: formatINR(financeTotals.overdue), tone: 'urgent' },
              { label: 'Earned-but-Unbilled Comm.', value: formatINR(financeTotals.unbilledCommission), tone: 'pending' },
            ].map((kpi) => (
              <button
                key={kpi.label}
                onClick={() =>
                  setDrilldown({
                    title: `Finance Drilldown — ${kpi.label}`,
                    subtitle: 'Payer, project, service, bill, due date & received amount',
                    type: 'finance',
                  })
                }
                className="text-left p-3.5 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-text-muted">
                  <span className="truncate">{kpi.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 shrink-0" />
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-lg font-bold text-text-main">{kpi.value}</span>
                </div>
                {kpi.tone === 'urgent' && financeTotals.overdue > 0 && (
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-900 text-white">
                    Due Date Crossed
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-border bg-surface-subtle text-xs text-text-muted flex items-center gap-2">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              Security rule enforced: Client fees, property deal value, 0.4% commission, invoices &amp; collections are hidden for <strong>{roleView}</strong>.
            </span>
          </div>
        )}
      </section>

      {/* SECTION 2 & 3: DELIVERY + GRUHNEST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Delivery aur Team */}
        <section className="lg:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-text-main" />
                <h2 className="text-sm font-bold text-text-main">Delivery aur Team</h2>
              </div>
              <button
                onClick={() =>
                  setDrilldown({
                    title: 'Team Delivery Drilldown',
                    subtitle: 'Team member-wise assigned, on-time, late & rework breakdown',
                    type: 'delivery',
                  })
                }
                className="text-[11px] font-semibold text-text-muted hover:text-text-main underline"
              >
                View Team Records
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { label: 'Due vs Delivered', val: `${deliveryTotals.due} / ${deliveryTotals.delivered}` },
                { label: 'On-Time Delivery %', val: `${deliveryTotals.onTimePct}%` },
                { label: 'Overdue Work', val: String(deliveryTotals.overdue), urgent: true },
                { label: 'Approval Mein Atke', val: String(deliveryTotals.stuckApproval), pending: true },
                { label: 'At-Risk Clients', val: String(deliveryTotals.atRiskClients), urgent: true },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() =>
                    setDrilldown({
                      title: `Delivery — ${item.label}`,
                      subtitle: 'Click a team member below for assigned, on-time, late & rework',
                      type: 'delivery',
                    })
                  }
                  className="text-left p-3 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover transition-all"
                >
                  <div className="text-[11px] text-text-muted">{item.label}</div>
                  <div className="text-base font-bold text-text-main mt-1">{item.val}</div>
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
                    subtitle: `${m.role} • Assigned: ${m.assigned}, On-time: ${m.onTime}, Late: ${m.late}, Rework: ${m.rework}`,
                    type: 'delivery',
                  });
                }}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-border bg-white hover:bg-surface-subtle text-text-main"
              >
                {m.member} ({m.onTime}/{m.assigned})
              </button>
            ))}
          </div>
        </section>

        {/* GruhNest */}
        <section className="lg:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-text-main" />
              <h2 className="text-sm font-bold text-text-main">GruhNest — Video Ads &amp; Funnel</h2>
            </div>
            {adTotals.wasted > 0 && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-900 text-white">
                Wasted Spend Alert: {formatINR(adTotals.wasted)} (0 Leads)
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
            {[
              { label: 'Meta Spend', val: formatINR(adTotals.spend) },
              { label: 'Leads', val: String(adTotals.leads) },
              { label: 'Qualified Leads', val: String(adTotals.qualified) },
              { label: 'Visits Completed', val: String(adTotals.visits) },
              { label: 'Confirmed Bookings', val: String(adTotals.bookings) },
            ].map((k) => (
              <button
                key={k.label}
                onClick={() =>
                  setDrilldown({
                    title: `GruhNest — ${k.label}`,
                    subtitle: 'Client-wise videos planned vs live, Meta Ad IDs, CPL & waste spend',
                    type: 'gruhnest',
                  })
                }
                className="text-left p-3 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover transition-all"
              >
                <div className="text-[11px] text-text-muted">{k.label}</div>
                <div className="text-base font-bold text-text-main mt-1">{k.val}</div>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl border border-border-subtle bg-surface-subtle text-xs"
              >
                <div>
                  <span className="font-bold text-text-main">{ad.project}</span>
                  <span className="text-text-subtle mx-1.5">•</span>
                  <span className="text-text-muted">{ad.plannedVsLive}</span>
                  <span className="text-text-subtle mx-1.5">•</span>
                  <span className="font-mono text-[11px] text-text-subtle">{ad.metaAdId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-text-main">{formatINR(ad.spend)}</span>
                  <span className="text-text-muted">{ad.leads} leads</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ad.adAlert === 'Wasted Spend'
                        ? 'bg-red-900 text-white'
                        : ad.adAlert === 'Qualification Pending' || ad.adAlert === 'High CPL'
                        ? 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20'
                    }`}
                  >
                    {ad.adAlert}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* SECTION 4 & 5: GRUHNEST PRO + AAJ ACTION CHAHIYE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* GruhNest Pro */}
        <section className="lg:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-text-main" />
              <h2 className="text-sm font-bold text-text-main">GruhNest Pro</h2>
            </div>
            <span className="text-[10px] font-medium text-text-subtle flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Sync: 25 Nov, 03:45 PM
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
                label: '7-Day CRM Active',
                val: String(filteredPro.filter((p) => p.status === 'Live').length),
                sub: 'Last update: 25 Nov, 10:45 AM',
              },
              {
                label: 'Inactive Clients',
                val: String(filteredPro.filter((p) => p.status === 'Inactive').length),
                sub: 'Last human CRM: 11 Nov',
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
                    subtitle: 'Active sales users, last login vs last human CRM update & AI calls',
                    type: 'pro',
                  })
                }
                className="text-left p-3 rounded-xl border border-border bg-surface-subtle hover:bg-surface-hover transition-all"
              >
                <div className="text-[11px] text-text-muted">{p.label}</div>
                <div className="text-lg font-bold text-text-main mt-0.5">{p.val}</div>
                <div className="text-[10px] text-text-subtle mt-1 truncate">{p.sub}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Aaj Action Chahiye */}
        <section className="lg:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-text-main" />
              <h2 className="text-sm font-bold text-text-main">Aaj Action Chahiye ({filteredAlerts.length})</h2>
            </div>
            <span className="text-[10px] font-semibold text-text-subtle">
              Finance alerts sirf authorized finance view me dikhte hain
            </span>
          </div>

          <div className="space-y-2">
            {filteredAlerts.map((al) => (
              <div
                key={al.id}
                className="p-3 rounded-xl border border-border bg-surface-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        al.severity === 'urgent'
                          ? 'bg-red-900 text-white'
                          : 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                      }`}
                    >
                      {al.pendingDays}d Pending
                    </span>
                    <span className="text-xs font-bold text-text-main">{al.clientProject}</span>
                    {al.isFinanceOnly && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-border text-text-muted">
                        Finance Only
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-main">{al.issue}</p>
                  <p className="text-[11px] text-text-muted">
                    <strong>Next:</strong> {al.nextAction} • <strong>Owner:</strong> {al.responsiblePerson}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-text-main">
                    <Clock className="w-3 h-3" /> {al.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CLIENT KHOLNE PAR KYA DIKHEGA (4-TAB CLIENT DRILLDOWN) */}
      <section className="bg-white border border-border rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div>
            <h2 className="text-base font-bold text-text-main flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Client Kholne Par Kya Dikhega (Unified Client Record Drilldown)
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Ek developer ke multiple projects aur services ek hi client record se linked
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-surface-subtle p-1 rounded-xl border border-border">
            {[
              { id: 'bim', label: 'BIM · Social Media' },
              { id: 'gruhnest', label: 'GruhNest · Video Ads' },
              { id: 'pro', label: 'GruhNest Pro · Usage' },
              { id: 'team', label: 'Team · Reporting' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setClientTab(t.id as typeof clientTab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  clientTab === t.id
                    ? 'bg-white text-text-main border border-border shadow-xs'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {clientTab === 'bim' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                  <th className="py-2 pr-3">Deliverable</th>
                  <th className="py-2 pr-3">Assignee</th>
                  <th className="py-2 pr-3">Stage</th>
                  <th className="py-2 pr-3">Committed vs Actual</th>
                  <th className="py-2 pr-3">Feedback (1-5)</th>
                  <th className="py-2">Complaint &amp; PM Follow-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {bimSocialItems.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2.5 pr-3">
                      <div className="font-bold text-text-main">{s.title}</div>
                      <div className="text-[11px] text-text-subtle">{s.project} • {s.liveLink}</div>
                    </td>
                    <td className="py-2.5 pr-3 text-text-main">{s.assignee}</td>
                    <td className="py-2.5 pr-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border border-border">
                        {s.stage}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-text-muted">
                      Due: {s.committedDue} <br /> Actual: {s.actualDelivery}
                    </td>
                    <td className="py-2.5 pr-3 font-bold text-text-main">{s.feedbackScore} / 5</td>
                    <td className="py-2.5">
                      <div className="text-text-main">{s.openComplaint}</div>
                      <div className="text-[11px] text-text-subtle">{s.pmFollowUp}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {clientTab === 'gruhnest' && (
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                    <th className="py-2 pr-3">Video &amp; Meta Ad ID</th>
                    <th className="py-2 pr-3">Spend</th>
                    <th className="py-2 pr-3">Leads / CPL</th>
                    <th className="py-2 pr-3">Qualified / CPQL</th>
                    <th className="py-2 pr-3">Visits / Bookings</th>
                    <th className="py-2">Ad Alert Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredAds.map((ad) => (
                    <tr key={ad.id}>
                      <td className="py-2.5 pr-3">
                        <div className="font-bold text-text-main">{ad.videoTitle}</div>
                        <div className="text-[11px] font-mono text-text-subtle">{ad.metaAdId} • {ad.project}</div>
                      </td>
                      <td className="py-2.5 pr-3 font-semibold text-text-main">{formatINR(ad.spend)}</td>
                      <td className="py-2.5 pr-3 text-text-main">
                        {ad.leads} ({ad.leads > 0 ? formatINR(Math.round(ad.spend / ad.leads)) : '—'})
                      </td>
                      <td className="py-2.5 pr-3 text-text-main">
                        {ad.qualifiedLeads} ({ad.qualifiedLeads > 0 ? formatINR(Math.round(ad.spend / ad.qualifiedLeads)) : '—'})
                      </td>
                      <td className="py-2.5 pr-3 text-text-main">
                        {ad.visitsCompleted} visits / {ad.confirmedBookings} booked
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            ad.adAlert === 'Wasted Spend'
                              ? 'bg-red-900 text-white'
                              : ad.adAlert === 'Healthy'
                              ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                          }`}
                        >
                          {ad.adAlert}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-surface-subtle border border-border text-xs text-text-muted">
              <strong>Unmatched Leads Bucket:</strong> 4 leads without Meta Ad ID attribution tracked separately so video-wise ROAS stays accurate.
            </div>
          </div>
        )}

        {clientTab === 'pro' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                  <th className="py-2 pr-3">Project &amp; Status</th>
                  <th className="py-2 pr-3">Sales Users</th>
                  <th className="py-2 pr-3">Last Login (Separate)</th>
                  <th className="py-2 pr-3">Last Human CRM Update</th>
                  <th className="py-2 pr-3">Leads vs AI Attempted</th>
                  <th className="py-2">Connected / Visits / Handoffs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredPro.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2.5 pr-3">
                      <div className="font-bold text-text-main">{p.project}</div>
                      <span className="text-[10px] font-semibold text-text-muted">{p.status}</span>
                    </td>
                    <td className="py-2.5 pr-3 text-text-main">{p.activeSalesUsers} active</td>
                    <td className="py-2.5 pr-3 text-text-muted">{p.lastLogin}</td>
                    <td className="py-2.5 pr-3 font-semibold text-text-main">{p.lastHumanCrmUpdate}</td>
                    <td className="py-2.5 pr-3 text-text-main">
                      {p.leadsReceived} leads / {p.aiCallsAttempted} AI calls
                    </td>
                    <td className="py-2.5 text-text-main">
                      {p.connectedCalls} connected • {p.visitsBooked} visits • {p.pendingHandoffs} pending handoffs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {clientTab === 'team' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-surface-subtle border border-border text-xs text-text-muted">
              <strong>On-Time Formula:</strong> Time par delivered items ÷ Period ke total due items (pending overdue items stay in denominator). Blocker owner recorded separately so client approval delay never penalizes an individual.
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                    <th className="py-2 pr-3">Team Member</th>
                    <th className="py-2 pr-3">Assigned</th>
                    <th className="py-2 pr-3">On-Time</th>
                    <th className="py-2 pr-3">Late</th>
                    <th className="py-2 pr-3">Rework</th>
                    <th className="py-2">Blocker Owner &amp; Delay Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {teamDeliveryRecords.map((m) => (
                    <tr key={m.id}>
                      <td className="py-2.5 pr-3">
                        <div className="font-bold text-text-main">{m.member}</div>
                        <div className="text-[11px] text-text-subtle">{m.role}</div>
                      </td>
                      <td className="py-2.5 pr-3">{m.assigned}</td>
                      <td className="py-2.5 pr-3 font-semibold">{m.onTime}</td>
                      <td className="py-2.5 pr-3">{m.late}</td>
                      <td className="py-2.5 pr-3">{m.rework}</td>
                      <td className="py-2.5">
                        <div className="font-semibold text-text-main">{m.blockerOwner}</div>
                        <div className="text-[11px] text-text-subtle">{m.delayReason}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* PAGE 2: GRUHNEST BOOKING SE 0.4% COMMISSION TAK */}
      <section className="bg-white border border-border rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-text-main">
              GruhNest Booking se 0.4% Commission Tracker (Page 2 Spec)
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              Deduplication active: Same Project + Booking ID synced twice counts commission once. Deal Value × 0.004.
            </p>
          </div>
          {canSeeFinance && (
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-surface-subtle border border-border text-text-main">
              1 Update → 2 Verify → 3 Calculate (0.4%) → 4 Recover
            </span>
          )}
        </div>

        {canSeeFinance ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                  <th className="py-2 pr-3">Booking &amp; Project</th>
                  <th className="py-2 pr-3">Deal Value</th>
                  <th className="py-2 pr-3">0.4% Commission</th>
                  <th className="py-2 pr-3">Receipt Entered</th>
                  <th className="py-2 pr-3">Pending / Overdue</th>
                  <th className="py-2">Stage &amp; Sync Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {commissionBookings.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5 pr-3">
                      <div className="font-bold text-text-main">
                        {c.project} • {c.bookingId}
                      </div>
                      <div className="text-[11px] text-text-subtle">
                        {c.unit} • Lead: {c.leadRef}
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 font-medium">{formatINR(c.dealValue)}</td>
                    <td className="py-2.5 pr-3 font-bold text-text-main">{formatINR(c.commissionAmount)}</td>
                    <td className="py-2.5 pr-3">{formatINR(c.receiptEntered)}</td>
                    <td className="py-2.5 pr-3 font-semibold">
                      {c.pendingAmount > 0 ? formatINR(c.pendingAmount) : '₹0'} (Due: {c.dueDate})
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            c.stage === 'Overdue'
                              ? 'bg-red-900 text-white'
                              : c.stage === 'Paid'
                              ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                          }`}
                        >
                          {c.stage}
                        </span>
                        {c.syncCount > 1 && (
                          <span className="text-[10px] text-text-subtle border border-border px-1.5 py-0.5 rounded-full">
                            Synced {c.syncCount}x (1x counted)
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-border bg-surface-subtle text-xs text-text-muted flex items-center gap-2">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              End-to-End Security Check: Property deal values (₹50L) and 0.4% commissions (₹20,000 / ₹12,000 overdue) are hidden for <strong>{roleView}</strong>.
            </span>
          </div>
        )}
      </section>

      {/* INTERACTIVE COUNTER DRILLDOWN MODAL */}
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
                className="p-1.5 rounded-lg border border-border text-text-muted hover:text-text-main"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {drilldown.type === 'finance' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                      <th className="py-2 pr-3">Payer &amp; Project</th>
                      <th className="py-2 pr-3">Service / Source</th>
                      <th className="py-2 pr-3">Bill &amp; Due Date</th>
                      <th className="py-2 pr-3">Billed</th>
                      <th className="py-2 pr-3">Received</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {filteredFinance.map((f) => (
                      <tr key={f.id}>
                        <td className="py-2.5 pr-3">
                          <div className="font-bold text-text-main">{f.payer}</div>
                          <div className="text-[11px] text-text-subtle">{f.project}</div>
                        </td>
                        <td className="py-2.5 pr-3">{f.incomeSource}</td>
                        <td className="py-2.5 pr-3 text-text-muted">
                          {f.billNo} <br /> Due: {f.dueDate}
                        </td>
                        <td className="py-2.5 pr-3 font-semibold">{formatINR(f.billedAmount)}</td>
                        <td className="py-2.5 pr-3">{formatINR(f.receivedAmount)}</td>
                        <td className="py-2.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              f.status === 'Overdue'
                                ? 'bg-red-900 text-white'
                                : f.status === 'Paid'
                                ? 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-800 border border-amber-500/20'
                            }`}
                          >
                            {f.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {drilldown.type === 'delivery' && (
              <div className="space-y-2">
                {teamDeliveryRecords
                  .filter((m) => !selectedMember || m.member === selectedMember)
                  .map((m) => (
                    <div key={m.id} className="p-3 rounded-xl border border-border bg-surface-subtle text-xs flex justify-between items-center">
                      <div>
                        <div className="font-bold text-text-main">{m.member} ({m.role})</div>
                        <div className="text-text-muted mt-0.5">Blocker: {m.blockerOwner} — {m.delayReason}</div>
                      </div>
                      <div className="text-right font-semibold">
                        Assigned: {m.assigned} • On-Time: {m.onTime} • Late: {m.late} • Rework: {m.rework}
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {drilldown.type === 'gruhnest' && (
              <div className="space-y-2">
                {filteredAds.map((ad) => (
                  <div key={ad.id} className="p-3 rounded-xl border border-border bg-surface-subtle text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-text-main">{ad.project} — {ad.videoTitle}</div>
                      <div className="text-text-muted mt-0.5">Meta Ad ID: {ad.metaAdId} • {ad.plannedVsLive}</div>
                    </div>
                    <div className="text-right font-semibold">
                      {formatINR(ad.spend)} • {ad.leads} Leads • {ad.qualifiedLeads} Qualified • {ad.confirmedBookings} Bookings
                    </div>
                  </div>
                ))}
              </div>
            )}

            {drilldown.type === 'pro' && (
              <div className="space-y-2">
                {filteredPro.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl border border-border bg-surface-subtle text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-text-main">{p.project} ({p.status})</div>
                      <div className="text-text-muted mt-0.5">
                        Last Login: {p.lastLogin} • Last Human CRM Update: {p.lastHumanCrmUpdate}
                      </div>
                    </div>
                    <div className="text-right font-semibold">
                      {p.leadsReceived} Leads • {p.aiCallsAttempted} AI Calls • {p.pendingHandoffs} Pending Handoffs
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
