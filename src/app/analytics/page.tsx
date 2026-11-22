'use client';

import React, { useState } from 'react';
import {
  OverviewAnalytics,
  AdvertisingAnalytics,
  CrmAnalytics,
  GruhnestAnalytics,
  ProjectsAnalytics,
  CalendarAnalytics,
  ContentAnalytics,
} from '@/components/features/analytics';
import { Tabs, TabItem } from '@/components/ui/Tabs';
import { GruhnestIcon, AnalyticsIcon, CalendarIcon, ProjectsIcon, ContentIcon, AdvertisingIcon, CrmIcon, OverviewIcon } from '@/components/ui';
import { analyticsModuleTabConfigs } from '@/data/analytics.data';

const tabIconMap: Record<string, React.ReactNode> = {
  all: <AnalyticsIcon className="w-3.5 h-3.5" />,
  overview: <OverviewIcon className="w-3.5 h-3.5" />,
  advertising: <AdvertisingIcon className="w-3.5 h-3.5" />,
  crm: <CrmIcon className="w-3.5 h-3.5" />,
  gruhnest: <GruhnestIcon className="w-3.5 h-3.5" />,
  projects: <ProjectsIcon className="w-3.5 h-3.5" />,
  calendar: <CalendarIcon className="w-3.5 h-3.5" />,
  content: <ContentIcon className="w-3.5 h-3.5" />,
};

export default function AnalyticsPage() {
  const [activeModule, setActiveModule] = useState<string>('all');

  const tabs: TabItem[] = analyticsModuleTabConfigs.map((t) => ({
    id: t.id,
    label: t.label,
    icon: tabIconMap[t.id],
  }));

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center p-2 shadow-xs shrink-0">
            <AnalyticsIcon className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand mb-0.5">
              <span>Workspace Statistical Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-main">
              Analytics & Growth Engine
            </h1>
            <p className="text-xs sm:text-sm text-text-subtle mt-0.5">
              Statistical modeling, multi-channel ad efficiency, and conversion probability analysis.
            </p>
          </div>
        </div>

        {/* Module Switcher Pills */}
        <div className="overflow-x-auto pb-1 sm:pb-0">
          <Tabs tabs={tabs} activeTab={activeModule} onChange={setActiveModule} />
        </div>
      </div>

      {/* Render Modules Based on Active Filter */}
      {(activeModule === 'all' || activeModule === 'overview') && <OverviewAnalytics />}
      {(activeModule === 'all' || activeModule === 'advertising') && <AdvertisingAnalytics />}
      {(activeModule === 'all' || activeModule === 'crm') && <CrmAnalytics />}
      {(activeModule === 'all' || activeModule === 'gruhnest') && <GruhnestAnalytics />}
      {(activeModule === 'all' || activeModule === 'projects') && <ProjectsAnalytics />}
      {(activeModule === 'all' || activeModule === 'calendar') && <CalendarAnalytics />}
      {(activeModule === 'all' || activeModule === 'content') && <ContentAnalytics />}
    </div>
  );
}
