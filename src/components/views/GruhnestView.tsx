'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Video, FileText, Lock, Megaphone } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { canViewFinance, canViewCampaignSpend } from '@/lib/permissions';
import { gruhNestAdRecords } from '@/data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GruhnestIcon } from '@/components/ui';
import { GruhnestAnalytics } from '@/components/features/analytics';

export function GruhnestView() {
  const { propertyProfiles, currentRole } = useWorkspaceStore();
  const showFinance = canViewFinance(currentRole);
  const showSpend = canViewCampaignSpend(currentRole);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center p-2 shadow-xs shrink-0">
          <GruhnestIcon className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-text-main">Gruhnest Property Media & Listings</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-surface-subtle text-text-muted border border-border">
              3D Pro
            </span>
          </div>
          <p className="text-xs text-text-subtle mt-0.5">
            Standardized real estate property profiles, sample-flat media assets, and commission rates.
          </p>
        </div>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {propertyProfiles.map((prop) => {
          const estimatedCommission = (prop.expectedDealValue * prop.commissionRatePercent) / 100;
          return (
            <Card
              key={prop.id}
              className="hover:border-border-hover hover:shadow-cardHover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-subtle">
                      {prop.developer}
                    </span>
                    <h3 className="text-base font-bold text-text-main mt-0.5">{prop.projectName}</h3>
                    <p className="text-xs text-text-muted">{prop.city}</p>
                  </div>
                  <Badge variant="success">
                    {prop.sampleFlatStatus}
                  </Badge>
                </div>

                {/* Property Facts */}
                <div className="my-4 p-3.5 bg-surface-subtle rounded-btn space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Possession:</span>
                    <span className="font-semibold text-text-main">{prop.towerPossession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Inventory:</span>
                    <span className="font-semibold text-text-main">
                      {prop.availableInventory} / {prop.totalInventory} units available
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Starting Price:</span>
                    <span className="font-bold text-brand">{formatCurrency(prop.startingPrice)}</span>
                  </div>
                </div>

                {/* Media Assets Status */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-card border border-border-subtle">
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <Video className="w-3.5 h-3.5 text-text-muted" />
                      <span>Video Walkthrough</span>
                    </span>
                    <Badge variant="completed">{prop.walkthroughAssetStatus}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-card border border-border-subtle">
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <FileText className="w-3.5 h-3.5 text-text-muted" />
                      <span>Location Explainer</span>
                    </span>
                    <Badge variant="pending">{prop.explainerAssetStatus}</Badge>
                  </div>
                </div>
              </div>

              {/* Commission Calculator Footer (Private to Founder & Accountant) */}
              <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
                {showFinance ? (
                  <div>
                    <span className="text-[10px] text-text-subtle block">
                      Commission ({prop.commissionRatePercent}%)
                    </span>
                    <strong className="text-xs font-bold text-text-main">
                      {formatCurrency(estimatedCommission)} / deal
                    </strong>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] text-text-subtle">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Deal value &amp; 0.4% comm. private</span>
                  </div>
                )}
                <span className="text-xs font-semibold text-text-muted">
                  Meta Ad Mapped
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* GruhNest Video-Wise Meta Ad ID Attribution & Alert Rules */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-text-main" />
            <div>
              <h3 className="text-base font-bold text-text-main">
                Video-to-Meta Ad ID Attribution &amp; Ad Alert Rules
              </h3>
              <p className="text-[11px] text-text-subtle">
                Every live video mapped to Meta Ad ID(s) with test spend threshold &amp; qualification pending alerts
              </p>
            </div>
          </div>
          <Badge variant="outline">Unmatched Leads: 4 Separate</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Video Asset &amp; Meta Ad ID</th>
                <th className="py-3 px-4">Project</th>
                {showSpend && <th className="py-3 px-4">Spend / Min Test</th>}
                <th className="py-3 px-4">Leads {showSpend ? '(CPL)' : ''}</th>
                <th className="py-3 px-4">Qualified / Visits / Booked</th>
                <th className="py-3 px-4">Ad Alert Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {gruhNestAdRecords.map((ad) => (
                <tr key={ad.id} className="hover:bg-surface-subtle transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-text-main">{ad.videoTitle}</div>
                    <div className="text-[11px] font-mono text-text-subtle">
                      {ad.metaAdId} · {ad.plannedVsLive}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-text-main">{ad.project}</td>
                  {showSpend && (
                    <td className="py-3 px-4 text-text-main">
                      <span className="font-bold">{formatCurrency(ad.spend)}</span>
                      <span className="text-text-subtle"> / {formatCurrency(ad.minTestSpend)} min</span>
                    </td>
                  )}
                  <td className="py-3 px-4 text-text-main">
                    {ad.leads}
                    {showSpend && ad.leads > 0
                      ? ` (${formatCurrency(Math.round(ad.spend / ad.leads))})`
                      : ''}
                  </td>
                  <td className="py-3 px-4 text-text-main">
                    {ad.qualifiedLeads} qual · {ad.visitsCompleted} visits · {ad.confirmedBookings} booked
                  </td>
                  <td className="py-3 px-4">
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
      </Card>

      {/* Embedded Property Media & Inventory Analytics */}
      <GruhnestAnalytics />
    </div>
  );
}
