'use client';

import React, { useState } from 'react';
import { Building2, X, Lock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import {
  bimSocialItems,
  gruhNestAdRecords,
  gruhNestProRecords,
  teamDeliveryRecords,
} from '@/data';
import { formatCurrency } from '@/lib/utils';
import { useWorkspaceStore } from '@/store/workspace-store';
import { canViewFinance, canViewCampaignSpend } from '@/lib/permissions';

interface ClientDetailModalProps {
  clientName: string | null;
  onClose: () => void;
}

/**
 * 4-tab unified client drilldown implementing the PDF brief's
 * "Client kholne par kya dikhega" specification.
 */
export function ClientDetailModal({ clientName, onClose }: ClientDetailModalProps) {
  const { currentRole, projects, leads } = useWorkspaceStore();
  const [activeTab, setActiveTab] = useState<'bim' | 'gruhnest' | 'pro' | 'team'>('bim');

  if (!clientName) return null;

  const canSeeFinance = canViewFinance(currentRole);
  const canSeeSpend = canViewCampaignSpend(currentRole);

  const clientProjects = projects.filter(
    (p) => p.clientName.toLowerCase() === clientName.toLowerCase()
  );
  const socialRows = bimSocialItems.filter(
    (s) => s.client.toLowerCase() === clientName.toLowerCase() || s.project.toLowerCase().includes(clientName.toLowerCase())
  );
  const adRows = gruhNestAdRecords.filter(
    (a) => a.client.toLowerCase() === clientName.toLowerCase() || a.project.toLowerCase().includes(clientName.toLowerCase())
  );
  const proRows = gruhNestProRecords.filter(
    (p) => p.client.toLowerCase() === clientName.toLowerCase() || p.project.toLowerCase().includes(clientName.toLowerCase())
  );
  const clientLeadsCount = leads.filter((l) =>
    clientProjects.some((cp) => cp.name === l.projectName)
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-border rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-xl space-y-4 max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border flex items-center justify-center text-text-main shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-text-main">{clientName}</h2>
                <Badge variant="outline">Unified Client Record</Badge>
                <span className="text-[11px] font-semibold text-text-subtle">
                  {clientProjects.length} linked project(s) · {clientLeadsCount} tracked leads
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                {clientProjects.map((p) => p.name).join(' • ') || 'Active developer mandate'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-btn border border-border text-text-muted hover:text-text-main"
            aria-label="Close client details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Tab Switcher */}
        <div className="flex flex-wrap gap-1.5 bg-surface-subtle p-1 rounded-xl border border-border">
          {[
            { id: 'bim', label: 'BIM · Social Media' },
            { id: 'gruhnest', label: 'GruhNest · Video Ads' },
            { id: 'pro', label: 'GruhNest Pro · Usage' },
            { id: 'team', label: 'Team · Reporting' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-text-main border border-border shadow-xs'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: BIM Social Media */}
        {activeTab === 'bim' && (
          <div className="space-y-3">
            {socialRows.length === 0 ? (
              <div className="p-4 rounded-xl bg-surface-subtle border border-border text-xs text-text-muted">
                No pending social media deliverables logged for this account this month (update pending).
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                      <th className="py-2 pr-3">Reel / Post &amp; Live Link</th>
                      <th className="py-2 pr-3">Assignee</th>
                      <th className="py-2 pr-3">Stage</th>
                      <th className="py-2 pr-3">Committed vs Actual</th>
                      <th className="py-2 pr-3">Feedback (1-5)</th>
                      <th className="py-2">Complaint &amp; PM Follow-up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {socialRows.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2.5 pr-3">
                          <div className="font-bold text-text-main">{item.title}</div>
                          <div className="text-[11px] text-text-subtle">
                            {item.project} · {item.liveLink}
                          </div>
                        </td>
                        <td className="py-2.5 pr-3 text-text-main">{item.assignee}</td>
                        <td className="py-2.5 pr-3">
                          <Badge variant={item.stage === 'Published' ? 'completed' : 'pending'}>
                            {item.stage}
                          </Badge>
                        </td>
                        <td className="py-2.5 pr-3 text-text-muted">
                          Due: {item.committedDue}
                          <br />
                          Actual: {item.actualDelivery}
                        </td>
                        <td className="py-2.5 pr-3 font-bold text-text-main">
                          {item.feedbackScore} / 5
                          <div className="text-[10px] font-normal text-text-subtle">{item.lastFeedbackDate}</div>
                        </td>
                        <td className="py-2.5">
                          <div className="text-text-main">{item.openComplaint}</div>
                          <div className="text-[11px] text-text-subtle">{item.pmFollowUp}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: GruhNest Video Ads */}
        {activeTab === 'gruhnest' && (
          <div className="space-y-3">
            {!canSeeSpend && (
              <div className="p-3 rounded-xl bg-surface-subtle border border-border text-xs text-text-muted flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Ad spend amounts restricted to Ads/Performance &amp; Finance roles.</span>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                    <th className="py-2 pr-3">Video &amp; Meta Ad ID</th>
                    {canSeeSpend && <th className="py-2 pr-3">Spend</th>}
                    <th className="py-2 pr-3">Leads {canSeeSpend ? '/ CPL' : ''}</th>
                    <th className="py-2 pr-3">Qualified {canSeeSpend ? '/ CPQL' : ''}</th>
                    <th className="py-2 pr-3">Visits / Bookings</th>
                    <th className="py-2">Ad Alert Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {adRows.map((ad) => (
                    <tr key={ad.id}>
                      <td className="py-2.5 pr-3">
                        <div className="font-bold text-text-main">{ad.videoTitle}</div>
                        <div className="text-[11px] font-mono text-text-subtle">
                          {ad.metaAdId} · {ad.project}
                        </div>
                      </td>
                      {canSeeSpend && (
                        <td className="py-2.5 pr-3 font-semibold text-text-main">
                          {formatCurrency(ad.spend)}
                        </td>
                      )}
                      <td className="py-2.5 pr-3 text-text-main">
                        {ad.leads}
                        {canSeeSpend && ad.leads > 0
                          ? ` (${formatCurrency(Math.round(ad.spend / ad.leads))})`
                          : ''}
                      </td>
                      <td className="py-2.5 pr-3 text-text-main">
                        {ad.qualifiedLeads}
                        {canSeeSpend && ad.qualifiedLeads > 0
                          ? ` (${formatCurrency(Math.round(ad.spend / ad.qualifiedLeads))})`
                          : ''}
                      </td>
                      <td className="py-2.5 pr-3 text-text-main">
                        {ad.visitsCompleted} visits / {ad.confirmedBookings} bookings
                      </td>
                      <td className="py-2.5">
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
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 rounded-xl bg-surface-subtle border border-border text-xs text-text-muted">
              <strong>Unmatched Leads Bucket:</strong> Leads without Meta Ad ID mapping are separated into the unmatched attribution bucket to keep video CPL accurate.
            </div>
          </div>
        )}

        {/* Tab 3: GruhNest Pro Usage */}
        {activeTab === 'pro' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                  <th className="py-2 pr-3">Project &amp; Status</th>
                  <th className="py-2 pr-3">Active Sales Users</th>
                  <th className="py-2 pr-3">Last Login (Separate)</th>
                  <th className="py-2 pr-3">Last Human CRM Update</th>
                  <th className="py-2 pr-3">Leads vs AI Calls</th>
                  <th className="py-2">Connected / Visits / Handoffs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {proRows.map((p) => (
                  <tr key={p.id}>
                    <td className="py-2.5 pr-3">
                      <div className="font-bold text-text-main">{p.project}</div>
                      <Badge
                        variant={
                          p.status === 'Live'
                            ? 'completed'
                            : p.status === 'Sync Issue'
                            ? 'urgent'
                            : 'pending'
                        }
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-2.5 pr-3 text-text-main">{p.activeSalesUsers} users</td>
                    <td className="py-2.5 pr-3 text-text-muted">{p.lastLogin}</td>
                    <td className="py-2.5 pr-3 font-semibold text-text-main">{p.lastHumanCrmUpdate}</td>
                    <td className="py-2.5 pr-3 text-text-main">
                      {p.leadsReceived} leads / {p.aiCallsAttempted} AI calls
                    </td>
                    <td className="py-2.5 text-text-main">
                      {p.connectedCalls} connected · {p.visitsBooked} visits · {p.pendingHandoffs} pending handoffs
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Team Reporting */}
        {activeTab === 'team' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-surface-subtle border border-border text-xs text-text-muted">
              <strong>On-Time % Formula:</strong> Time par delivered items ÷ Period ke total due items (pending overdue items stay in denominator). Blocker owner is recorded separately so client approval delays never blame individuals.
              {!canSeeFinance && ' (Financial billing values remain private for your role.)'}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-text-subtle uppercase text-[10px]">
                    <th className="py-2 pr-3">Member</th>
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
      </div>
    </div>
  );
}
