'use client';

import React from 'react';
import {
  OverviewHero,
  OverviewMetrics,
  TaskPrioritySection,
  ServiceModulesSection,
  ProjectsSummaryTable,
} from '@/components/features/overview';

export function OverviewView() {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Hero Banner with Customizable Background */}
      <OverviewHero />

      {/* 2. Core KPI Metric Cards */}
      <OverviewMetrics />

      {/* 3. Priority Tasks & 360° Service Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TaskPrioritySection />
        </div>
        <div className="lg:col-span-5">
          <ServiceModulesSection />
        </div>
      </div>

      {/* 4. Client Projects Summary Table */}
      <ProjectsSummaryTable />
    </div>
  );
}
