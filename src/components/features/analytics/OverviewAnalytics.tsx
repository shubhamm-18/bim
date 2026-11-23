'use client';

import React from 'react';
import { AnalyticsIcon } from '@/components/ui';
import { useWorkspaceStore } from '@/store/workspace-store';
import { OverviewMacroMetrics } from './OverviewMacroMetrics';
import { SpendVelocityChart } from './SpendVelocityChart';
import { ProjectMandateEfficiency } from './ProjectMandateEfficiency';

export function OverviewAnalytics() {
  const { campaigns } = useWorkspaceStore();

  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leads, 0);
  const blendedCpl = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 1240;

  return (
    <div className="space-y-6 pt-6">
      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-border flex-1"></div>
        <div className="px-4 py-1.5 rounded-full bg-surface-subtle border border-border text-xs font-bold uppercase tracking-wider text-text-main flex items-center gap-2">
          <AnalyticsIcon className="w-4 h-4" />
          <span>Macro Statistical Intelligence & Forecasting</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>

      {/* 4 Statistical Metric Cards */}
      <OverviewMacroMetrics blendedCpl={blendedCpl} />

      {/* Charts & Efficiency Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SpendVelocityChart />
        <ProjectMandateEfficiency />
      </div>
    </div>
  );
}
