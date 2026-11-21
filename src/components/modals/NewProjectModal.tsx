'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { X, Building2 } from 'lucide-react';
import { ProjectStatus, InfoStatus } from '@/types';

export function NewProjectModal() {
  const {
    isNewProjectModalOpen,
    setIsNewProjectModalOpen,
    clients,
    templates,
    addProject,
  } = useWorkspaceStore();

  const [name, setName] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [city, setCity] = useState('Vapi');
  const [status, setStatus] = useState<ProjectStatus>('Active');
  const [infoStatus, setInfoStatus] = useState<InfoStatus>('Tentative');
  const [template, setTemplate] = useState(templates[0]?.name || 'Full Launch');
  const [budget, setBudget] = useState(500000);

  if (!isNewProjectModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedClient = clients.find((c) => c.id === clientId) || clients[0];

    addProject({
      name,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      city,
      status,
      infoStatus,
      template,
      budget,
      startDate: new Date().toISOString().slice(0, 10),
    });

    setName('');
    setIsNewProjectModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#e4e5ec] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f1f5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#efeafb] text-[#7040cd] rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#20222c]">Create New Real Estate Project</h3>
              <p className="text-xs text-[#8e91a0]">Add a project under a developer or onboarding client</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewProjectModalOpen(false)}
            className="p-1 text-[#8e91a0] hover:text-[#20222c] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Project Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Skyline Heights, Sun Vista"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-[#e4e5ec] rounded-xl outline-none focus:border-[#7040cd] focus:ring-2 focus:ring-[#7040cd]/10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Client Developer</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">City / Location</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-[#e4e5ec] rounded-xl outline-none focus:border-[#7040cd]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Workflow Template</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Marketing Budget (₹)</label>
              <input
                type="number"
                step="50000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-sm border border-[#e4e5ec] rounded-xl outline-none focus:border-[#7040cd]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Project Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                <option value="Active">Active</option>
                <option value="Planning">Planning</option>
                <option value="On hold">On hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Info Readiness</label>
              <select
                value={infoStatus}
                onChange={(e) => setInfoStatus(e.target.value as InfoStatus)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                <option value="Verified">Verified</option>
                <option value="Tentative">Tentative</option>
                <option value="Missing">Missing</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f0f1f5]">
            <button
              type="button"
              onClick={() => setIsNewProjectModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#535767] hover:bg-[#f7f6fa] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#7040cd] hover:bg-[#5e35ce] rounded-xl shadow-sm transition-all"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
