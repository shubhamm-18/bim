'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AdvertisingIcon } from '@/components/ui';
import { AdvertisingAnalytics } from '@/components/features/analytics';

export function AdvertisingView() {
  const { campaigns } = useWorkspaceStore();

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalSpend = campaigns.reduce((acc, c) => acc + c.spend, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leads, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const avgCPL = totalLeads > 0 ? Math.round(totalSpend / totalLeads) : 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
          <AdvertisingIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Advertising & Performance</h1>
          <p className="text-xs text-text-subtle">
            Meta, Google and LinkedIn ad campaigns driving buyer inquiries and verified site visits.
          </p>
        </div>
      </div>

      {/* Campaign Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <span className="text-xs font-semibold text-text-subtle">Total Ad Budget</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{formatCurrency(totalBudget)}</div>
        </Card>
        <Card className="p-4">
          <span className="text-xs font-semibold text-text-subtle">Reported Spend</span>
          <div className="text-xl font-extrabold text-brand mt-1">{formatCurrency(totalSpend)}</div>
        </Card>
        <Card className="p-4">
          <span className="text-xs font-semibold text-text-subtle">Total Impressions</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{(totalImpressions / 1000).toFixed(0)}k</div>
        </Card>
        <Card className="p-4">
          <span className="text-xs font-semibold text-text-subtle">Leads Acquired</span>
          <div className="text-xl font-extrabold text-status-success mt-1">{totalLeads}</div>
        </Card>
        <Card className="p-4">
          <span className="text-xs font-semibold text-text-subtle">Average CPL</span>
          <div className="text-xl font-extrabold text-status-warning mt-1">₹{avgCPL}</div>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex items-center justify-between">
          <h3 className="text-base font-bold text-text-main">Active Ad Campaigns</h3>
          <span className="text-xs text-text-subtle font-medium">{campaigns.length} campaigns running</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Budget / Spend</th>
                <th className="py-3 px-4">Impressions</th>
                <th className="py-3 px-4">Leads Generated</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-surface-subtle transition-colors">
                  <td className="py-3.5 px-4 font-bold text-text-main">{cmp.name}</td>
                  <td className="py-3.5 px-4 text-text-muted font-medium">{cmp.projectName}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant={cmp.platform === 'Meta' ? 'info' : cmp.platform === 'Google' ? 'warning' : 'brand'}>
                      {cmp.platform}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-text-main">
                    <span>{formatCurrency(cmp.spend)}</span>
                    <span className="text-text-subtle"> / {formatCurrency(cmp.budget)}</span>
                  </td>
                  <td className="py-3.5 px-4 text-text-muted">{cmp.impressions.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-bold text-status-success">{cmp.leads}</td>
                  <td className="py-3.5 px-4">
                    <Badge variant="success">{cmp.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Embedded Paid Ads Statistical Analytics */}
      <AdvertisingAnalytics />
    </div>
  );
}
