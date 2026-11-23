'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { ApprovalsIcon, CalendarIcon, ProjectsIcon, AdvertisingIcon } from '@/components/ui';
import { useWorkspaceStore } from '@/store/workspace-store';

export function OverviewMetrics() {
  const {
    projects,
    tasks,
    approvalItems,
    leads,
    campaigns,
    selectedClientFilter,
    setCurrentView,
  } = useWorkspaceStore();

  const filteredProjects = selectedClientFilter
    ? projects.filter((p) => p.clientName === selectedClientFilter)
    : projects;

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = tasks.filter((t) => t.due === todayStr && t.status !== 'Done');
  const overdueTasks = tasks.filter((t) => t.due < todayStr && t.status !== 'Done');
  const pendingApprovals = approvalItems.filter((a) => a.status === 'Pending');

  const totalSiteVisits =
    campaigns.reduce((acc, c) => acc + c.siteVisits, 0) +
    leads.filter((l) => l.stage === 'Visit completed' || l.stage === 'Visit booked').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1 */}
      <Link href="/projects" onClick={() => setCurrentView('projects')}>
        <Card className="hover:border-brand/40 hover:shadow-cardHover cursor-pointer text-left group h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Client projects</span>
            <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-border text-text-muted group-hover:text-text-main group-hover:border-border-hover group-hover:scale-105 transition-all flex items-center justify-center">
              <ProjectsIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl lg:text-4xl font-black text-text-main mt-3">
            {filteredProjects.length}
          </div>
          <span className="text-xs font-medium text-text-subtle mt-1 block">
            {selectedClientFilter ? selectedClientFilter : 'All active clients'}
          </span>
        </Card>
      </Link>

      {/* KPI 2 */}
      <Link href="/calendar" onClick={() => setCurrentView('calendar')}>
        <Card className="hover:border-status-info/40 hover:shadow-cardHover cursor-pointer text-left group h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Tasks due today</span>
            <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-border text-text-muted group-hover:text-text-main group-hover:border-border-hover group-hover:scale-105 transition-all flex items-center justify-center">
              <CalendarIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl lg:text-4xl font-black text-text-main mt-3">{todayTasks.length}</div>
          <span className="text-xs font-semibold text-status-danger mt-1 block">
            {overdueTasks.length} overdue tasks
          </span>
        </Card>
      </Link>

      {/* KPI 3 */}
      <Link href="/approvals" onClick={() => setCurrentView('approvals')}>
        <Card className="hover:border-status-warning/40 hover:shadow-cardHover cursor-pointer text-left group h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Pending approvals</span>
            <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-border text-text-muted group-hover:text-text-main group-hover:border-border-hover group-hover:scale-105 transition-all flex items-center justify-center">
              <ApprovalsIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl lg:text-4xl font-black text-text-main mt-3">
            {pendingApprovals.length}
          </div>
          <span className="text-xs font-medium text-text-subtle mt-1 block">Awaiting review</span>
        </Card>
      </Link>

      {/* KPI 4 */}
      <Link href="/advertising" onClick={() => setCurrentView('advertising')}>
        <Card className="hover:border-status-success/40 hover:shadow-cardHover cursor-pointer text-left group h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted">Reported site visits</span>
            <div className="w-11 h-11 rounded-xl bg-surface-subtle border border-border text-text-muted group-hover:text-text-main group-hover:border-border-hover group-hover:scale-105 transition-all flex items-center justify-center">
              <AdvertisingIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl lg:text-4xl font-black text-text-main mt-3">{totalSiteVisits}</div>
          <span className="text-xs font-medium text-text-subtle mt-1 block">Campaign snapshots</span>
        </Card>
      </Link>
    </div>
  );
}
