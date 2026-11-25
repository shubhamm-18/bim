'use client';

import React, { useMemo, useState } from 'react';
import {
  Activity,
  Clock,
  Filter,
  PhoneCall,
  RefreshCw,
  Search,
  UserCheck,
  Users,
} from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { isClientScopedRole } from '@/lib/permissions';
import { gruhNestProRecords, GruhNestProRecord } from '@/data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GruhnestIcon } from '@/components/ui';

export function GruhnestView() {
  const { currentRole, scopedDeveloperClient, selectedClientFilter } = useWorkspaceStore();
  const clientScoped = isClientScopedRole(currentRole);

  const [statusFilter, setStatusFilter] = useState<'All' | GruhNestProRecord['status']>('All');
  const [search, setSearch] = useState('');

  const effectiveClient = clientScoped
    ? scopedDeveloperClient
    : selectedClientFilter || 'All';

  const filteredRows = useMemo(() => {
    return gruhNestProRecords.filter((row) => {
      if (effectiveClient !== 'All' && row.client !== effectiveClient) return false;
      if (statusFilter !== 'All' && row.status !== statusFilter) return false;
      if (
        search &&
        !row.project.toLowerCase().includes(search.toLowerCase()) &&
        !row.client.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [effectiveClient, statusFilter, search]);

  const totals = useMemo(() => {
    const activeUsers = filteredRows.reduce((s, r) => s + r.activeSalesUsers, 0);
    const leads = filteredRows.reduce((s, r) => s + r.leadsReceived, 0);
    const aiAttempted = filteredRows.reduce((s, r) => s + r.aiCallsAttempted, 0);
    const connected = filteredRows.reduce((s, r) => s + r.connectedCalls, 0);
    const visits = filteredRows.reduce((s, r) => s + r.visitsBooked, 0);
    const handoffs = filteredRows.reduce((s, r) => s + r.pendingHandoffs, 0);
    const attemptPct = leads > 0 ? Math.round((aiAttempted / leads) * 100) : 0;
    return { activeUsers, leads, aiAttempted, connected, visits, handoffs, attemptPct };
  }, [filteredRows]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-2xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
            <GruhnestIcon className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-2 px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-[#10241A] text-white border border-[#2D5E43]">
              PRO
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-text-main">GuruNest Pro</h1>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider bg-[#10241A] text-white">
                PRO
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Project status, active sales users, last login, last human CRM update, leads received vs. AI calls attempted, connected calls, visits booked, and pending handoffs.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-xs font-semibold text-text-muted shrink-0">
          <RefreshCw className="w-3.5 h-3.5 text-[#1D563B]" />
          <span>Last Sync: 25 Nov, 03:45 PM</span>
        </div>
      </div>

      {/* Executive Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Tracked Projects</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{filteredRows.length}</div>
          <span className="text-[10px] text-text-subtle">
            {filteredRows.filter((r) => r.status === 'Live').length} Live
          </span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Active Sales Users</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{totals.activeUsers}</div>
          <span className="text-[10px] text-text-subtle">Across projects</span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Leads vs AI Attempted</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {totals.leads} / {totals.aiAttempted}
          </div>
          <span className="text-[10px] font-semibold text-[#1D563B]">{totals.attemptPct}% attempted</span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Connected Calls</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{totals.connected}</div>
          <span className="text-[10px] text-text-subtle">AI voice conversations</span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Visits Booked</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{totals.visits}</div>
          <span className="text-[10px] font-semibold text-[#1D563B]">Confirmed site visits</span>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Pending Handoffs</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{totals.handoffs}</div>
          {totals.handoffs > 0 && (
            <Badge variant="pending" className="mt-1 text-[9px]">Needs Sales Action</Badge>
          )}
        </Card>
      </div>

      {/* Search & Status Filter */}
      <Card className="p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-subtle rounded-btn border border-border w-full sm:w-80">
          <Search className="w-4 h-4 text-text-subtle" />
          <input
            type="text"
            placeholder="Search project or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-transparent outline-none text-text-main placeholder:text-text-subtle"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {(['All', 'Live', 'Sync Issue', 'Inactive'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-btn text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-[#E3EDE6] text-[#1D563B]'
                  : 'text-text-muted hover:bg-surface-hover'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Usage & AI Calling Table (Login and Actual Usage as Separate Fields) */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#1D563B]" />
            <div>
              <h2 className="text-base font-bold text-text-main">
                Project Usage, AI Calling &amp; Human CRM Telemetry
              </h2>
              <p className="text-[11px] text-text-muted">
                <strong>Last Login</strong> and <strong>Last Human CRM Update</strong> are tracked as separate fields to verify real team adoption.
              </p>
            </div>
          </div>
          <Badge variant="outline">Login ≠ Actual Usage</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Project &amp; Status</th>
                <th className="py-3 px-4">Active Sales Users</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4">Last Human CRM Update</th>
                <th className="py-3 px-4">Leads vs AI Attempted</th>
                <th className="py-3 px-4">Connected Calls</th>
                <th className="py-3 px-4">Visits Booked</th>
                <th className="py-3 px-4">Pending Handoffs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredRows.map((row) => {
                const attemptRatio =
                  row.leadsReceived > 0
                    ? Math.round((row.aiCallsAttempted / row.leadsReceived) * 100)
                    : 0;

                return (
                  <tr key={row.id} className="hover:bg-surface-subtle/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-text-main">{row.project}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] text-text-muted">{row.client}</span>
                        <Badge
                          variant={
                            row.status === 'Live'
                              ? 'completed'
                              : row.status === 'Sync Issue'
                              ? 'urgent'
                              : 'pending'
                          }
                        >
                          {row.status}
                        </Badge>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-bold text-text-main">
                        <Users className="w-3.5 h-3.5 text-[#1D563B]" />
                        {row.activeSalesUsers} users
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 text-text-main font-medium">
                        <UserCheck className="w-3.5 h-3.5 text-text-subtle" />
                        {row.lastLogin}
                      </div>
                      <div className="text-[10px] text-text-subtle mt-0.5">Session Login</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5 font-bold text-text-main">
                        <Activity className="w-3.5 h-3.5 text-[#1D563B]" />
                        {row.lastHumanCrmUpdate}
                      </div>
                      <div className="text-[10px] text-text-subtle mt-0.5">
                        Sync: {row.lastSuccessfulSync}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 min-w-[165px]">
                      <div className="flex items-center justify-between font-bold text-text-main">
                        <span>
                          {row.leadsReceived} leads / {row.aiCallsAttempted} AI
                        </span>
                        <span className="text-[10px] text-[#1D563B]">{attemptRatio}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface-subtle rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#1D563B] rounded-full"
                          style={{ width: `${attemptRatio}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-text-main tabular-nums">
                      {row.connectedCalls}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-[#1D563B] tabular-nums">
                      {row.visitsBooked}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          row.pendingHandoffs >= 10
                            ? 'urgent'
                            : row.pendingHandoffs > 0
                            ? 'pending'
                            : 'completed'
                        }
                      >
                        <Clock className="w-3 h-3" />
                        {row.pendingHandoffs} Pending
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
