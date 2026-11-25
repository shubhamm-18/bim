'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Filter,
  Lock,
  Search,
  Sliders,
  Unlink,
  Video,
} from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatCurrency } from '@/lib/utils';
import { canViewCampaignSpend, isClientScopedRole } from '@/lib/permissions';
import { gruhNestAdRecords } from '@/data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GruhnestIcon } from '@/components/ui';

interface UnmatchedLeadRow {
  id: string;
  leadName: string;
  phone: string;
  client: string;
  project: string;
  source: string;
  capturedAt: string;
  status: 'Qualification Pending' | 'Unmapped Ad ID' | 'Manual Follow-up';
}

const unmatchedLeadsData: UnmatchedLeadRow[] = [
  {
    id: 'um-1',
    leadName: 'Rajesh Verma',
    phone: '+91 98250 11420',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    source: 'Instagram Bio / Direct DM',
    capturedAt: '24 Nov 2026',
    status: 'Unmapped Ad ID',
  },
  {
    id: 'um-2',
    leadName: 'Meera Desai',
    phone: '+91 98791 44812',
    client: 'Sun Creators',
    project: 'Sun Imperia',
    source: 'Meta Instant Form (Legacy ID)',
    capturedAt: '24 Nov 2026',
    status: 'Qualification Pending',
  },
  {
    id: 'um-3',
    leadName: 'Suresh Kulkarni',
    phone: '+91 97240 66219',
    client: 'Sun Creators',
    project: 'Sun Residency 4',
    source: 'WhatsApp Click-to-Chat',
    capturedAt: '23 Nov 2026',
    status: 'Unmapped Ad ID',
  },
  {
    id: 'um-4',
    leadName: 'Kiran Joshi',
    phone: '+91 99099 78341',
    client: 'Sun Creators',
    project: 'Sun Centrica',
    source: 'Walk-in / Referral Call',
    capturedAt: '22 Nov 2026',
    status: 'Manual Follow-up',
  },
];

export function CrmView() {
  const { currentRole, scopedDeveloperClient, selectedClientFilter } = useWorkspaceStore();
  const showSpend = canViewCampaignSpend(currentRole);
  const clientScoped = isClientScopedRole(currentRole);

  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const effectiveClient = clientScoped
    ? scopedDeveloperClient
    : selectedClientFilter || 'All';

  const filteredVideos = useMemo(() => {
    return gruhNestAdRecords.filter((ad) => {
      if (effectiveClient !== 'All' && ad.client !== effectiveClient) return false;
      if (projectFilter !== 'All' && ad.project !== projectFilter) return false;
      if (
        search &&
        !ad.videoTitle.toLowerCase().includes(search.toLowerCase()) &&
        !ad.metaAdId.toLowerCase().includes(search.toLowerCase()) &&
        !ad.project.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [effectiveClient, projectFilter, search]);

  const filteredUnmatched = useMemo(() => {
    return unmatchedLeadsData.filter((u) => {
      if (effectiveClient !== 'All' && u.client !== effectiveClient) return false;
      if (projectFilter !== 'All' && u.project !== projectFilter) return false;
      return true;
    });
  }, [effectiveClient, projectFilter]);

  const totals = useMemo(() => {
    const spend = filteredVideos.reduce((s, a) => s + a.spend, 0);
    const leads = filteredVideos.reduce((s, a) => s + a.leads, 0);
    const qualified = filteredVideos.reduce((s, a) => s + a.qualifiedLeads, 0);
    const visits = filteredVideos.reduce((s, a) => s + a.visitsCompleted, 0);
    const bookings = filteredVideos.reduce((s, a) => s + a.confirmedBookings, 0);
    const avgCpl = leads > 0 ? Math.round(spend / leads) : 0;
    const avgCpql = qualified > 0 ? Math.round(spend / qualified) : 0;
    return { spend, leads, qualified, visits, bookings, avgCpl, avgCpql };
  }, [filteredVideos]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
            <GruhnestIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-text-main">GuruNest</h1>
              <Badge variant="outline">Video → Meta Ad ID Attribution</Badge>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Map every live video to its Meta Ad ID(s). Display video-wise spend, leads, CPL, qualified leads, cost per qualified lead, visits, and bookings. Keep unmatched leads separate.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Video Spend</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {showSpend ? formatCurrency(totals.spend) : 'Private'}
          </div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Matched Leads</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{totals.leads}</div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Avg CPL</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {showSpend ? (totals.avgCpl > 0 ? formatCurrency(totals.avgCpl) : '—') : 'Private'}
          </div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Qualified Leads</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{totals.qualified}</div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Cost / Qualified Lead</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {showSpend ? (totals.avgCpql > 0 ? formatCurrency(totals.avgCpql) : '—') : 'Private'}
          </div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Visits / Bookings</span>
          <div className="text-xl font-extrabold text-text-main mt-1">
            {totals.visits} / {totals.bookings}
          </div>
        </Card>
      </div>

      {/* Search & Project Filter */}
      <Card className="p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-subtle rounded-btn border border-border w-full sm:w-80">
          <Search className="w-4 h-4 text-text-subtle" />
          <input
            type="text"
            placeholder="Search live video, Meta Ad ID, project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-transparent outline-none text-text-main placeholder:text-text-subtle"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Project:
          </span>
          {['All', 'Shakti Skyline', 'Sun Imperia', 'Sun Residency 4', 'Sun Centrica'].map((p) => (
            <button
              key={p}
              onClick={() => setProjectFilter(p)}
              className={`px-3 py-1 rounded-btn text-xs font-semibold transition-colors ${
                projectFilter === p
                  ? 'bg-[#E3EDE6] text-[#1D563B]'
                  : 'text-text-muted hover:bg-surface-hover'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Card>

      {/* Video-to-Meta Ad ID Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-[#1D563B]" />
            <div>
              <h2 className="text-base font-bold text-text-main">
                Live Videos Mapped to Meta Ad ID(s)
              </h2>
              <p className="text-[11px] text-text-muted">
                Video-wise spend, leads, CPL, qualified leads, cost per qualified lead, visits &amp; confirmed bookings
              </p>
            </div>
          </div>
          {!showSpend && (
            <Badge variant="pending">
              <Lock className="w-3 h-3" /> Spend Private for {currentRole}
            </Badge>
          )}
          <Link
            href="/advertising"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Configure Ad Alert Rule Thresholds →</span>
          </Link>
        </div>

        <div className="px-5 py-2.5 bg-surface-subtle/80 border-b border-border-subtle text-[11px] text-text-muted">
          <strong>Ad Alert Rule:</strong> Triggers a review alert on zero leads, high cost, or zero qualified leads after a project&apos;s minimum test spend limit is reached; displays <strong>&ldquo;Qualification Pending&rdquo;</strong> when sales feedback is pending.
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Live Video &amp; Project</th>
                <th className="py-3 px-4">Mapped Meta Ad ID(s)</th>
                {showSpend && <th className="py-3 px-4">Spend</th>}
                <th className="py-3 px-4">Leads</th>
                {showSpend && <th className="py-3 px-4">CPL</th>}
                <th className="py-3 px-4">Qualified Leads</th>
                {showSpend && <th className="py-3 px-4">Cost / Qualified Lead</th>}
                <th className="py-3 px-4">Visits</th>
                <th className="py-3 px-4">Bookings</th>
                <th className="py-3 px-4">Alert Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredVideos.map((ad) => {
                const cpl = ad.leads > 0 ? Math.round(ad.spend / ad.leads) : null;
                const cpql =
                  ad.qualifiedLeads > 0 ? Math.round(ad.spend / ad.qualifiedLeads) : null;

                return (
                  <tr key={ad.id} className="hover:bg-surface-subtle/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-text-main">{ad.videoTitle}</div>
                      <div className="text-[11px] text-text-muted mt-0.5">
                        {ad.project} • {ad.client} • {ad.plannedVsLive}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block font-mono text-[11px] font-semibold px-2.5 py-1 rounded-btn bg-surface-subtle border border-border text-text-main">
                        {ad.metaAdId}
                      </span>
                    </td>
                    {showSpend && (
                      <td className="py-3.5 px-4 font-bold text-text-main tabular-nums">
                        {formatCurrency(ad.spend)}
                      </td>
                    )}
                    <td className="py-3.5 px-4 font-bold text-text-main tabular-nums">
                      {ad.leads}
                    </td>
                    {showSpend && (
                      <td className="py-3.5 px-4 font-semibold text-text-main tabular-nums">
                        {cpl !== null ? formatCurrency(cpl) : '—'}
                      </td>
                    )}
                    <td className="py-3.5 px-4 font-bold text-text-main tabular-nums">
                      {ad.qualifiedLeads}
                    </td>
                    {showSpend && (
                      <td className="py-3.5 px-4 font-semibold text-text-main tabular-nums">
                        {cpql !== null ? formatCurrency(cpql) : '—'}
                      </td>
                    )}
                    <td className="py-3.5 px-4 font-semibold text-text-main tabular-nums">
                      {ad.visitsCompleted}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-text-main tabular-nums">
                      {ad.confirmedBookings}
                    </td>
                    <td className="py-3.5 px-4">
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Separate Unmatched Leads Bucket */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Unlink className="w-4 h-4 text-text-main" />
            <div>
              <h2 className="text-base font-bold text-text-main">
                Unmatched Leads (Kept Separate)
              </h2>
              <p className="text-[11px] text-text-muted">
                Leads without a matched Meta Ad ID are isolated here so video-wise CPL &amp; cost per qualified lead remain accurate
              </p>
            </div>
          </div>
          <Badge variant="pending">
            <AlertTriangle className="w-3 h-3" /> {filteredUnmatched.length} Unmatched
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Lead Name</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Incoming Source</th>
                <th className="py-3 px-4">Captured Date</th>
                <th className="py-3 px-4">Attribution Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredUnmatched.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface-subtle/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-text-main">{lead.leadName}</td>
                  <td className="py-3 px-4 font-mono text-text-muted">{lead.phone}</td>
                  <td className="py-3 px-4 font-semibold text-text-main">
                    {lead.project} ({lead.client})
                  </td>
                  <td className="py-3 px-4 text-text-muted">{lead.source}</td>
                  <td className="py-3 px-4 text-text-subtle">{lead.capturedAt}</td>
                  <td className="py-3 px-4">
                    <Badge variant="pending">{lead.status}</Badge>
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
