'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { GitCompare, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function CompareView() {
  const { projects } = useWorkspaceStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#20222c]">Project Comparison</h1>
        <p className="text-xs text-[#8e91a0]">
          Cross-compare marketing budgets, lead velocity, and site visit conversions across developer projects.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#e4e5ec] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#f0f1f5] text-[#8e91a0] font-semibold uppercase tracking-wider text-[10px] bg-[#f7f8fa]">
                <th className="py-3.5 px-4">Metric</th>
                {projects.map((p) => (
                  <th key={p.id} className="py-3.5 px-4 font-bold text-[#20222c]">
                    {p.name}
                    <span className="block text-[10px] font-normal text-[#8e91a0]">{p.clientName}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f1f5]">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#727583]">City / Micro-Market</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-medium text-[#20222c]">
                    {p.city}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#727583]">Marketing Budget</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-[#20222c]">
                    {formatCurrency(p.budget || 0)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#727583]">Reported Spend</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-[#7040cd]">
                    {formatCurrency(p.spend || 0)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#727583]">Total Inquiries / Leads</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-[#20222c]">
                    {p.leadsCount || 0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#727583]">Site Visits Completed</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-[#059669]">
                    {p.siteVisitsCount || 0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#727583]">Confirmed Bookings</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-[#2563eb]">
                    {p.bookingsCount || 0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#727583]">Onboarding Template</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 text-[#535767]">
                    {p.template}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
