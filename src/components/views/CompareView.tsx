'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { CompareIcon, TemplatesIcon } from '@/components/ui';

export function CompareView() {
  const { projects } = useWorkspaceStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
          <CompareIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Project Comparison</h1>
          <p className="text-xs text-text-subtle">
            Cross-compare marketing budgets, lead velocity, and site visit conversions across developer projects.
          </p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                <th className="py-3.5 px-4">Metric</th>
                {projects.map((p) => (
                  <th key={p.id} className="py-3.5 px-4 font-bold text-text-main">
                    {p.name}
                    <span className="block text-[10px] font-normal text-text-subtle">{p.clientName}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-text-muted">City / Micro-Market</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-medium text-text-main">
                    {p.city}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-text-muted">Marketing Budget</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-text-main">
                    {formatCurrency(p.budget || 0)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-text-muted">Reported Spend</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-brand">
                    {formatCurrency(p.spend || 0)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-text-muted">Total Inquiries / Leads</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-text-main">
                    {p.leadsCount || 0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-text-muted">Site Visits Completed</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-status-success">
                    {p.siteVisitsCount || 0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-text-muted">Confirmed Bookings</td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 font-bold text-status-info">
                    {p.bookingsCount || 0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <TemplatesIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>Onboarding Template</span>
                  </div>
                </td>
                {projects.map((p) => (
                  <td key={p.id} className="py-3.5 px-4 text-text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <TemplatesIcon className="w-3 h-3 shrink-0 opacity-80" />
                      <span>{p.template}</span>
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
