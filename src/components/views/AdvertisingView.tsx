'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Megaphone, DollarSign, TrendingUp, Users, Eye, Target } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

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
      <div>
        <h1 className="text-2xl font-bold text-[#20222c]">Advertising & Performance</h1>
        <p className="text-xs text-[#8e91a0]">
          Meta, Google and LinkedIn ad campaigns driving buyer inquiries and verified site visits.
        </p>
      </div>

      {/* Campaign Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm">
          <span className="text-xs font-semibold text-[#8e91a0]">Total Ad Budget</span>
          <div className="text-xl font-extrabold text-[#20222c] mt-1">{formatCurrency(totalBudget)}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm">
          <span className="text-xs font-semibold text-[#8e91a0]">Reported Spend</span>
          <div className="text-xl font-extrabold text-[#7040cd] mt-1">{formatCurrency(totalSpend)}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm">
          <span className="text-xs font-semibold text-[#8e91a0]">Total Impressions</span>
          <div className="text-xl font-extrabold text-[#20222c] mt-1">{(totalImpressions / 1000).toFixed(0)}k</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm">
          <span className="text-xs font-semibold text-[#8e91a0]">Leads Acquired</span>
          <div className="text-xl font-extrabold text-[#059669] mt-1">{totalLeads}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm">
          <span className="text-xs font-semibold text-[#8e91a0]">Average CPL</span>
          <div className="text-xl font-extrabold text-[#ea580c] mt-1">₹{avgCPL}</div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-2xl border border-[#e4e5ec] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#f0f1f5] flex items-center justify-between">
          <h3 className="text-base font-bold text-[#20222c]">Active Ad Campaigns</h3>
          <span className="text-xs text-[#8e91a0] font-medium">{campaigns.length} campaigns running</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#f0f1f5] text-[#8e91a0] font-semibold uppercase tracking-wider text-[10px] bg-[#f7f8fa]">
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">Budget / Spend</th>
                <th className="py-3 px-4">Impressions</th>
                <th className="py-3 px-4">Leads Generated</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f1f5]">
              {campaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#20222c]">{cmp.name}</td>
                  <td className="py-3.5 px-4 text-[#535767] font-medium">{cmp.projectName}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        cmp.platform === 'Meta'
                          ? 'bg-[#dbeafe] text-[#2563eb]'
                          : cmp.platform === 'Google'
                          ? 'bg-[#fef3c7] text-[#d97706]'
                          : 'bg-[#e0e7ff] text-[#4f46e5]'
                      }`}
                    >
                      {cmp.platform}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#20222c]">
                    <span>{formatCurrency(cmp.spend)}</span>
                    <span className="text-[#8e91a0]"> / {formatCurrency(cmp.budget)}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#535767]">{cmp.impressions.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-bold text-[#059669]">{cmp.leads}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d1fae5] text-[#059669]">
                      {cmp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
