'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import {
  FolderKanban,
  CheckSquare,
  ClipboardCheck,
  Building2,
  Clapperboard,
  Megaphone,
  Workflow,
  ArrowRight,
  Plus,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

export function OverviewView() {
  const {
    projects,
    tasks,
    approvalItems,
    leads,
    campaigns,
    setCurrentView,
    setIsNewProjectModalOpen,
    updateTaskStatus,
    selectedClientFilter,
  } = useWorkspaceStore();

  const [activeTaskTab, setActiveTaskTab] = useState<'today' | 'overdue' | 'upcoming'>('overdue');

  const filteredProjects = selectedClientFilter
    ? projects.filter((p) => p.clientName === selectedClientFilter)
    : projects;

  const todayStr = new Date().toISOString().slice(0, 10);

  const todayTasks = tasks.filter((t) => t.due === todayStr && t.status !== 'Done');
  const overdueTasks = tasks.filter((t) => t.due < todayStr && t.status !== 'Done');
  const upcomingTasks = tasks.filter((t) => t.due > todayStr && t.status !== 'Done');

  const activeTasksList =
    activeTaskTab === 'today'
      ? todayTasks
      : activeTaskTab === 'overdue'
      ? overdueTasks
      : upcomingTasks;

  const pendingApprovals = approvalItems.filter((a) => a.status === 'Pending');
  const totalSiteVisits = campaigns.reduce((acc, c) => acc + c.siteVisits, 0) + leads.filter((l) => l.stage === 'Visit completed' || l.stage === 'Visit booked').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2a2438] via-[#352c48] to-[#201d2b] rounded-2xl p-7 text-white shadow-sm border border-[#3f3850]">
        <div className="absolute top-0 right-0 w-96 h-full opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a78bfa] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Saturday, 21 November 2026</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Agency Overview</h1>
            <p className="text-sm text-[#c4b5fd]/80 mt-1">
              Your real estate projects, team priorities and marketing performance in one connected workspace.
            </p>
          </div>
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-xs font-bold rounded-xl shadow-lg shadow-[#8b5cf6]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New project</span>
          </button>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <button
          onClick={() => setCurrentView('projects')}
          className="p-5 bg-white rounded-2xl border border-[#e4e5ec] hover:border-[#7040cd]/40 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#727583]">Client projects</span>
            <div className="p-2 rounded-xl bg-[#efeafb] text-[#7040cd] group-hover:scale-105 transition-transform">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#20222c] mt-3">
            {filteredProjects.length}
          </div>
          <span className="text-xs font-medium text-[#8e91a0] mt-1 block">
            {selectedClientFilter ? selectedClientFilter : '3 clients in workspace'}
          </span>
        </button>

        {/* KPI 2 */}
        <button
          onClick={() => {
            setCurrentView('calendar');
            setActiveTaskTab('overdue');
          }}
          className="p-5 bg-white rounded-2xl border border-[#e4e5ec] hover:border-[#3b82f6]/40 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#727583]">Tasks due today</span>
            <div className="p-2 rounded-xl bg-[#dbeafe] text-[#2563eb] group-hover:scale-105 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#20222c] mt-3">{todayTasks.length}</div>
          <span className="text-xs font-semibold text-[#ef4444] mt-1 block">
            {overdueTasks.length} overdue tasks
          </span>
        </button>

        {/* KPI 3 */}
        <button
          onClick={() => setCurrentView('approvals')}
          className="p-5 bg-white rounded-2xl border border-[#e4e5ec] hover:border-[#f97316]/40 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#727583]">Pending approvals</span>
            <div className="p-2 rounded-xl bg-[#ffedd5] text-[#ea580c] group-hover:scale-105 transition-transform">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#20222c] mt-3">
            {pendingApprovals.length}
          </div>
          <span className="text-xs font-medium text-[#8e91a0] mt-1 block">Awaiting review</span>
        </button>

        {/* KPI 4 */}
        <button
          onClick={() => setCurrentView('advertising')}
          className="p-5 bg-white rounded-2xl border border-[#e4e5ec] hover:border-[#10b981]/40 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#727583]">Reported site visits</span>
            <div className="p-2 rounded-xl bg-[#d1fae5] text-[#059669] group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#20222c] mt-3">{totalSiteVisits}</div>
          <span className="text-xs font-medium text-[#8e91a0] mt-1 block">Campaign snapshots</span>
        </button>
      </div>

      {/* Dashboard Duo: Priority Tasks & Service Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Priority Tasks (7 cols) */}
        <section className="lg:col-span-7 bg-white rounded-2xl border border-[#e4e5ec] p-5 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f1f5]">
            <h2 className="text-base font-bold text-[#20222c]">Priority tasks</h2>
            <button
              onClick={() => setCurrentView('calendar')}
              className="text-xs font-semibold text-[#7040cd] hover:underline"
            >
              View all tasks →
            </button>
          </div>

          {/* Queue Tabs */}
          <div className="flex items-center gap-1 my-3 p-1 bg-[#f7f8fa] rounded-xl w-fit">
            <button
              onClick={() => setActiveTaskTab('today')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTaskTab === 'today'
                  ? 'bg-white text-[#20222c] shadow-sm'
                  : 'text-[#727583] hover:text-[#20222c]'
              }`}
            >
              <span>Today</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[#f0f1f5]">
                {todayTasks.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTaskTab('overdue')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTaskTab === 'overdue'
                  ? 'bg-white text-[#ef4444] shadow-sm'
                  : 'text-[#727583] hover:text-[#20222c]'
              }`}
            >
              <span>Overdue</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[#fee2e2] text-[#ef4444]">
                {overdueTasks.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTaskTab('upcoming')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTaskTab === 'upcoming'
                  ? 'bg-white text-[#20222c] shadow-sm'
                  : 'text-[#727583] hover:text-[#20222c]'
              }`}
            >
              <span>Upcoming</span>
              <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-[#f0f1f5]">
                {upcomingTasks.length}
              </span>
            </button>
          </div>

          {/* Task Rows */}
          <div className="flex-1 space-y-2 overflow-y-auto">
            {activeTasksList.length === 0 ? (
              <div className="py-10 text-center text-xs text-[#8e91a0] flex flex-col items-center justify-center">
                <CheckSquare className="w-8 h-8 text-[#d8d9e2] mb-2" />
                <span>No {activeTaskTab} tasks in this queue.</span>
              </div>
            ) : (
              activeTasksList.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-[#e4e5ec] hover:border-[#7040cd]/30 bg-[#fafafc] hover:bg-white transition-all group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.status === 'Done'}
                      onChange={() => updateTaskStatus(task.id, 'Done')}
                      className="mt-1 w-4 h-4 rounded text-[#7040cd] focus:ring-[#7040cd] cursor-pointer"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#20222c] truncate group-hover:text-[#7040cd]">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#727583]">
                        <span className="font-semibold text-[#8e91a0]">{task.projectName}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(task.due)}
                        </span>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 rounded bg-white border border-[#e4e5ec] text-[10px] font-semibold">
                          {task.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0 ml-2 ${
                      task.priority === 'Urgent'
                        ? 'bg-[#fee2e2] text-[#dc2626]'
                        : task.priority === 'High'
                        ? 'bg-[#ffedd5] text-[#ea580c]'
                        : 'bg-[#f0f1f5] text-[#535767]'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* 360° Service Modules (5 cols) */}
        <section className="lg:col-span-5 bg-white rounded-2xl border border-[#e4e5ec] p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f1f5]">
              <h2 className="text-base font-bold text-[#20222c]">Service modules</h2>
              <span className="text-[11px] font-semibold text-[#7040cd] bg-[#efeafb] px-2 py-0.5 rounded-full">
                360° Model
              </span>
            </div>

            <div className="space-y-2 mt-4">
              {/* Content Studio */}
              <button
                onClick={() => setCurrentView('content')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#e4e5ec] hover:border-[#7040cd] hover:bg-[#fafafc] transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#efeafb] text-[#7040cd]">
                    <Clapperboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#20222c] group-hover:text-[#7040cd]">
                      Content studio
                    </h4>
                    <p className="text-[11px] text-[#8e91a0]">Production & publishing pipeline</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8e91a0] group-hover:text-[#7040cd] group-hover:translate-x-1 transition-all" />
              </button>

              {/* Advertising */}
              <button
                onClick={() => setCurrentView('advertising')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#e4e5ec] hover:border-[#f97316] hover:bg-[#fafafc] transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#ffedd5] text-[#ea580c]">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#20222c] group-hover:text-[#ea580c]">
                      Advertising
                    </h4>
                    <p className="text-[11px] text-[#8e91a0]">Campaigns & performance metrics</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8e91a0] group-hover:text-[#ea580c] group-hover:translate-x-1 transition-all" />
              </button>

              {/* Automation & CRM */}
              <button
                onClick={() => setCurrentView('crm')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#e4e5ec] hover:border-[#2563eb] hover:bg-[#fafafc] transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#dbeafe] text-[#2563eb]">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#20222c] group-hover:text-[#2563eb]">
                      Automation & CRM
                    </h4>
                    <p className="text-[11px] text-[#8e91a0]">Lead flow & pre-sales tracking</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8e91a0] group-hover:text-[#2563eb] group-hover:translate-x-1 transition-all" />
              </button>

              {/* Gruhnest */}
              <button
                onClick={() => setCurrentView('gruhnest')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#e4e5ec] hover:border-[#059669] hover:bg-[#fafafc] transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#d1fae5] text-[#059669]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#20222c] group-hover:text-[#059669]">
                      Gruhnest
                    </h4>
                    <p className="text-[11px] text-[#8e91a0]">Property media & listing inventory</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8e91a0] group-hover:text-[#059669] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Client Projects Data Table */}
      <section className="bg-white rounded-2xl border border-[#e4e5ec] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-[#f0f1f5]">
          <div>
            <h2 className="text-base font-bold text-[#20222c]">Client projects</h2>
            <p className="text-xs text-[#8e91a0]">Active mandates under execution</p>
          </div>
          <button
            onClick={() => setCurrentView('projects')}
            className="text-xs font-semibold text-[#7040cd] hover:underline"
          >
            View all ({filteredProjects.length}) →
          </button>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#f0f1f5] text-[#8e91a0] font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Project</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">City</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Info Status</th>
                <th className="py-3 px-3">Budget / Spend</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f1f5]">
              {filteredProjects.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#fafafc] transition-colors">
                  <td className="py-3.5 px-3 font-bold text-[#20222c] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#efeafb] text-[#7040cd] flex items-center justify-center text-[10px] font-bold">
                      {proj.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span>{proj.name}</span>
                  </td>
                  <td className="py-3.5 px-3 text-[#535767] font-medium">{proj.clientName}</td>
                  <td className="py-3.5 px-3 text-[#727583]">{proj.city}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        proj.status === 'Active'
                          ? 'bg-[#d1fae5] text-[#059669]'
                          : 'bg-[#dbeafe] text-[#2563eb]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {proj.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#fef3c7] text-[#d97706]">
                      {proj.infoStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-[#535767]">
                    <span>{formatCurrency(proj.budget || 0)}</span>
                    <span className="text-[#8e91a0] ml-1">/ {formatCurrency(proj.spend || 0)}</span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setCurrentView('projects')}
                      className="px-2.5 py-1 text-xs font-semibold text-[#7040cd] hover:bg-[#efeafb] rounded-lg transition-colors"
                    >
                      Open record →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Duo: Lead Pipeline & Needs Attention */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lead Pipeline */}
        <div className="bg-white rounded-2xl border border-[#e4e5ec] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f1f5]">
            <h2 className="text-base font-bold text-[#20222c]">Lead pipeline</h2>
            <button
              onClick={() => setCurrentView('crm')}
              className="text-xs font-semibold text-[#7040cd] hover:underline"
            >
              Open CRM →
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="p-3 bg-[#f7f8fa] rounded-xl text-center">
              <span className="text-[11px] text-[#8e91a0] block">Total Leads</span>
              <strong className="text-xl font-bold text-[#20222c]">{leads.length}</strong>
            </div>
            <div className="p-3 bg-[#f7f8fa] rounded-xl text-center">
              <span className="text-[11px] text-[#8e91a0] block">Site Visits</span>
              <strong className="text-xl font-bold text-[#20222c]">
                {leads.filter((l) => l.stage === 'Visit booked' || l.stage === 'Visit completed').length}
              </strong>
            </div>
            <div className="p-3 bg-[#f7f8fa] rounded-xl text-center">
              <span className="text-[11px] text-[#8e91a0] block">Bookings</span>
              <strong className="text-xl font-bold text-[#059669]">
                {leads.filter((l) => l.stage === 'Booked').length}
              </strong>
            </div>
          </div>
          <p className="text-xs text-[#727583]">
            Lead-to-site-visit conversion:{' '}
            <b className="text-[#20222c]">
              {leads.length > 0
                ? `${Math.round(
                    (leads.filter((l) => l.stage === 'Visit booked' || l.stage === 'Visit completed').length /
                      leads.length) *
                      100
                  )}%`
                : '—'}
            </b>
          </p>
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-2xl border border-[#e4e5ec] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0f1f5]">
            <h2 className="text-base font-bold text-[#20222c]">Needs attention</h2>
            <span className="text-xs font-semibold text-[#ef4444] bg-[#fee2e2] px-2 py-0.5 rounded-full">
              Action Required
            </span>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#fafafc] border border-[#e4e5ec] text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-medium text-[#20222c]">Budget alerts</span>
              </div>
              <span className="font-bold text-[#727583]">0</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#fafafc] border border-[#e4e5ec] text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3b82f6]" />
                <span className="font-medium text-[#20222c]">Follow-up gaps</span>
              </div>
              <span className="font-bold text-[#727583]">0</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#fee2e2]/40 border border-[#fecaca] text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
                <span className="font-semibold text-[#ef4444]">Overdue tasks</span>
              </div>
              <span className="font-extrabold text-[#ef4444]">{overdueTasks.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
