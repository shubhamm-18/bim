'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { X, UserPlus } from 'lucide-react';
import { LeadStage } from '@/types';

export function NewLeadModal() {
  const {
    isNewLeadModalOpen,
    setIsNewLeadModalOpen,
    projects,
    addLead,
  } = useWorkspaceStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [source, setSource] = useState('Meta Ads');
  const [stage, setStage] = useState<LeadStage>('New lead');
  const [notes, setNotes] = useState('');
  const [expectedValue, setExpectedValue] = useState(7500000);

  if (!isNewLeadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const proj = projects.find((p) => p.id === projectId) || projects[0];

    addLead({
      name,
      phone,
      email,
      projectId: proj.id,
      projectName: proj.name,
      source,
      stage,
      notes,
      expectedValue,
    });

    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setIsNewLeadModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#e4e5ec] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f1f5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#ecfdf5] text-[#059669] rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#20222c]">Log New Property Lead</h3>
              <p className="text-xs text-[#8e91a0]">Track prospective home buyer inquiry & site visit</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewLeadModalOpen(false)}
            className="p-1 text-[#8e91a0] hover:text-[#20222c] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Contact Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Shah"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-[#e4e5ec] rounded-xl outline-none focus:border-[#7040cd]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98250 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-[#e4e5ec] rounded-xl outline-none focus:border-[#7040cd]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Interested Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Acquisition Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                <option value="Meta Ads">Meta Ads (Facebook/Instagram)</option>
                <option value="Google Search">Google Search Ads</option>
                <option value="Walk-in Referral">Walk-in Referral</option>
                <option value="Broker Network">Broker Network</option>
                <option value="Gruhnest Portal">Gruhnest Listing Portal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Pipeline Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as LeadStage)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                <option value="New lead">New lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Visit booked">Visit booked</option>
                <option value="Visit completed">Visit completed</option>
                <option value="Booked">Booked</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Expected Budget / Deal (₹)</label>
              <input
                type="number"
                step="500000"
                value={expectedValue}
                onChange={(e) => setExpectedValue(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm border border-[#e4e5ec] rounded-xl outline-none focus:border-[#7040cd]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Requirement Notes</label>
            <textarea
              rows={2}
              placeholder="e.g. 3BHK East-facing, budget 75-80L, needs loan assistance"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-[#e4e5ec] rounded-xl outline-none focus:border-[#7040cd]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f0f1f5]">
            <button
              type="button"
              onClick={() => setIsNewLeadModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#535767] hover:bg-[#f7f6fa] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-xl shadow-sm transition-all"
            >
              Add Lead to CRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
