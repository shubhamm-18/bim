'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Plus, Users, Phone, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { LeadStage } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';

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
        <div>
          <h1 className="text-2xl font-bold text-[#20222c]">Automation & CRM</h1>
          <p className="text-xs text-[#8e91a0]">
            Track property buyer leads from initial click through site visit and final booking.
          </p>
        </div>
        <button
          onClick={() => setIsNewLeadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Lead</span>
        </button>
      </div>

      {/* Visual Pipeline Funnel */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
        {leadStages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage === stage);
          return (
            <div
              key={stage}
              className="bg-[#f7f8fa] p-3 rounded-2xl border border-[#e4e5ec] min-w-[210px] flex flex-col"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e4e5ec]">
                <span className="text-xs font-bold text-[#20222c]">{stage}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#e4e5ec] text-[#059669]">
                  {stageLeads.length}
                </span>
              </div>

              <div className="space-y-2 flex-1">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3 bg-white rounded-xl border border-[#e4e5ec] shadow-sm hover:border-[#059669]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-[#20222c]">{lead.name}</h5>
                        <span className="text-[10px] font-semibold text-[#8e91a0] bg-[#f7f8fa] px-1.5 py-0.5 rounded">
                          {lead.source}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#535767] mt-1.5">
                        <Phone className="w-3 h-3 text-[#8e91a0]" />
                        <span>{lead.phone}</span>
                      </div>
                      <p className="text-[11px] font-semibold text-[#7040cd] mt-1">
                        {lead.projectName}
                      </p>
                      {lead.notes && (
                        <p className="text-[10px] text-[#8e91a0] mt-1 bg-[#f7f8fa] p-1.5 rounded line-clamp-2">
                          {lead.notes}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-[#f0f1f5] flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#20222c]">
                        {lead.expectedValue ? formatCurrency(lead.expectedValue) : '—'}
                      </span>
                      <select
                        value={lead.stage}
                        onChange={(e) => updateLeadStage(lead.id, e.target.value as LeadStage)}
                        className="text-[10px] font-semibold text-[#059669] bg-[#ecfdf5] border border-[#a7f3d0] rounded px-1.5 py-0.5 outline-none cursor-pointer"
                      >
                        {leadStages.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
