'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Plus, Phone } from 'lucide-react';
import { LeadStage } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CrmIcon } from '@/components/ui';
import { CrmAnalytics } from '@/components/features/analytics';

const leadStages: LeadStage[] = [
  'New lead',
  'Contacted',
  'Qualified',
  'Visit booked',
  'Visit completed',
  'Booked',
];

export function CrmView() {
  const { leads, setIsNewLeadModalOpen, updateLeadStage } = useWorkspaceStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
            <CrmIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Automation & CRM</h1>
            <p className="text-xs text-text-subtle">
              Track property buyer leads from initial click through site visit and final booking.
            </p>
          </div>
        </div>
        <Button
          variant="success"
          size="md"
          onClick={() => setIsNewLeadModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Log New Lead</span>
        </Button>
      </div>

      {/* Visual Pipeline Funnel */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
        {leadStages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          return (
            <div
              key={stage}
              className="bg-surface-subtle p-3 rounded-card border border-border min-w-[210px] flex flex-col"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
                <span className="text-xs font-bold text-text-main">{stage}</span>
                <Badge variant="success" className="px-2 py-0">
                  {stageLeads.length}
                </Badge>
              </div>

              <div className="space-y-2 flex-1">
                {stageLeads.map((lead) => (
                  <Card
                    key={lead.id}
                    className="p-3 hover:border-border-hover shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-text-main">{lead.name}</h5>
                        <Badge variant="neutral" className="text-[9px]">
                          {lead.source}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-text-muted mt-1.5">
                        <Phone className="w-3 h-3 text-text-subtle" />
                        <span>{lead.phone}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-text-main mt-1">
                        {lead.projectName}
                      </p>
                      {lead.notes && (
                        <p className="text-[10px] text-text-subtle mt-1 bg-surface-subtle p-1.5 rounded-btn line-clamp-2">
                          {lead.notes}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-border-subtle flex items-center justify-between">
                      <span className="text-[10px] font-bold text-text-main">
                        {lead.expectedValue ? formatCurrency(lead.expectedValue) : '—'}
                      </span>
                      <select
                        value={lead.stage}
                        onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
                        className="text-[10px] font-semibold text-text-main bg-surface-subtle border border-border rounded-btn px-1.5 py-0.5 outline-none cursor-pointer"
                      >
                        {leadStages.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Funnel & Lead Velocity Analytics */}
      <CrmAnalytics />
    </div>
  );
}
