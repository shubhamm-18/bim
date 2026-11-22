'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Video, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GruhnestIcon } from '@/components/ui';
import { GruhnestAnalytics } from '@/components/features/analytics';

export function GruhnestView() {
  const { propertyProfiles } = useWorkspaceStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center p-2 shadow-xs shrink-0">
          <GruhnestIcon className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-text-main">Gruhnest Property Media & Listings</h1>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-emerald-500/15 text-emerald-700 border border-emerald-500/30">
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
              className="hover:border-status-success/40 hover:shadow-cardHover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-status-success">
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
                      <Video className="w-3.5 h-3.5 text-brand" />
                      <span>Video Walkthrough</span>
                    </span>
                    <Badge variant="success">{prop.walkthroughAssetStatus}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-btn bg-surface-card border border-border-subtle">
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <FileText className="w-3.5 h-3.5 text-status-info" />
                      <span>Location Explainer</span>
                    </span>
                    <Badge variant="warning">{prop.explainerAssetStatus}</Badge>
                  </div>
                </div>
              </div>

              {/* Commission Calculator Footer */}
              <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-text-subtle block">
                    Commission ({prop.commissionRatePercent}%)
                  </span>
                  <strong className="text-xs font-bold text-status-success">
                    {formatCurrency(estimatedCommission)} / deal
                  </strong>
                </div>
                <button className="text-xs font-semibold text-brand hover:underline">
                  View Media Assets →
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Embedded Property Media & Inventory Analytics */}
      <GruhnestAnalytics />
    </div>
  );
}
