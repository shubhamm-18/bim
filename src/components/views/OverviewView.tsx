'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { OverviewIcon } from '@/components/ui/OverviewIcon';
import { useWorkspaceStore } from '@/store/workspace-store';
import { agencyConfig } from '@/config/agency.config';
import {
  FounderCommandBoard,
  TaskPrioritySection,
  ServiceModulesSection,
  ProjectsSummaryTable,
} from '@/components/features/overview';

export function OverviewView() {
  const { setIsNewProjectModalOpen } = useWorkspaceStore();

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Sleek Top Header (Clean standard dashboard header) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
            <OverviewIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Beyond Imagine</h1>
            <p className="text-xs text-text-subtle">
              {agencyConfig.brand.tagline}
            </p>
          </div>
        </div>
        <Button
          variant="brand"
          onClick={() => setIsNewProjectModalOpen(true)}
          className="shrink-0"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>New project</span>
        </Button>
      </div>

      {/* Founder Homepage Command Sections (PDF Tech Brief Live Integration) */}
      <FounderCommandBoard />

      {/* Priority Tasks & 360° Service Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TaskPrioritySection />
        </div>
        <div className="lg:col-span-5">
          <ServiceModulesSection />
        </div>
      </div>

      {/* Client Projects Summary Table */}
      <ProjectsSummaryTable />
    </div>
  );
}
