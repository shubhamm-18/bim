'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Plus, Search, Building2, MapPin, Layers } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { ProjectStatus } from '@/types';

export function ProjectsView() {
  const {
    projects,
    clients,
    setIsNewProjectModalOpen,
    updateProject,
    selectedClientFilter,
  } = useWorkspaceStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = projects.filter((p) => {
    const matchClient = selectedClientFilter ? p.clientName === selectedClientFilter : true;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' ? true : p.status === statusFilter;
    return matchClient && matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20222c]">Client Projects</h1>
          <p className="text-xs text-[#8e91a0]">
            Manage all active mandates, real estate developers, and deliverables.
          </p>
        </div>
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7040cd] hover:bg-[#5e35ce] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New project</span>
        </button>
      </div>

      {/* Developer Accounts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clients.map((c) => {
          const clientProjects = projects.filter((p) => p.clientId === c.id);
          return (
            <div
              key={c.id}
              className="p-5 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#efeafb] text-[#7040cd] font-bold text-xs flex items-center justify-center">
                      {c.tag.toUpperCase()}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#20222c]">{c.name}</h3>
                      <span className="text-[10px] text-[#8e91a0]">{c.owner}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#f3f1f6] text-[#7040cd]">
                    {clientProjects.length} {clientProjects.length === 1 ? 'proj' : 'projs'}
                  </span>
                </div>
                <p className="text-xs text-[#535767] mt-3">{c.scope}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-[#f0f1f5] text-[11px] text-[#8e91a0]">
                Deliverables: <b className="text-[#20222c] font-medium">{c.deliverables}</b>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-[#e4e5ec]">
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-[#f7f8fa] rounded-xl border border-[#e4e5ec] w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8e91a0]" />
          <input
            type="text"
            placeholder="Search projects by name, city, developer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-transparent outline-none text-[#20222c]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#727583] font-medium">Status:</span>
          {['All', 'Active', 'Planning', 'On hold'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === st
                  ? 'bg-[#efeafb] text-[#7040cd]'
                  : 'text-[#727583] hover:bg-[#f7f6fa]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-5 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm hover:border-[#7040cd]/40 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7040cd]">
                    {proj.clientName}
                  </span>
                  <h3 className="text-base font-bold text-[#20222c] mt-0.5">{proj.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#727583] mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8e91a0]" />
                    <span>{proj.city}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-[#8e91a0]" />
                      {proj.template}
                    </span>
                  </div>
                </div>

                <select
                  value={proj.status}
                  onChange={(e) => updateProject(proj.id, { status: e.target.value as ProjectStatus })}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer outline-none ${
                    proj.status === 'Active'
                      ? 'bg-[#d1fae5] text-[#059669] border-[#a7f3d0]'
                      : 'bg-[#dbeafe] text-[#2563eb] border-[#bfdbfe]'
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Planning">Planning</option>
                  <option value="On hold">On hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Budget & Spend Progress */}
              <div className="my-4 p-3 bg-[#f7f8fa] rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#727583]">Budget & Spend</span>
                  <span className="font-bold text-[#20222c]">
                    {formatCurrency(proj.spend || 0)} / {formatCurrency(proj.budget || 0)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#e4e5ec] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7040cd] rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round(((proj.spend || 0) / (proj.budget || 1)) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs py-1">
                <div>
                  <span className="text-[10px] text-[#8e91a0] block">Leads</span>
                  <strong className="text-[#20222c]">{proj.leadsCount || 0}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#8e91a0] block">Site Visits</span>
                  <strong className="text-[#20222c]">{proj.siteVisitsCount || 0}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#8e91a0] block">Bookings</span>
                  <strong className="text-[#059669]">{proj.bookingsCount || 0}</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-[#f0f1f5] flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#8e91a0]">
                Info: <b className="text-[#f59e0b]">{proj.infoStatus}</b>
              </span>
              <button className="text-xs font-semibold text-[#7040cd] hover:underline">
                View Project Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
