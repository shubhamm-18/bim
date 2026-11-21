'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { SearchModal } from '@/components/layout/SearchModal';
import { FilterDrawer } from '@/components/layout/FilterDrawer';
import { NewProjectModal } from '@/components/modals/NewProjectModal';
import { NewTaskModal } from '@/components/modals/NewTaskModal';
import { NewLeadModal } from '@/components/modals/NewLeadModal';

// Views
import { OverviewView } from '@/components/views/OverviewView';
import { ProjectsView } from '@/components/views/ProjectsView';
import { CalendarView } from '@/components/views/CalendarView';
import { ApprovalsView } from '@/components/views/ApprovalsView';
import { ContentStudioView } from '@/components/views/ContentStudioView';
import { AdvertisingView } from '@/components/views/AdvertisingView';
import { CrmView } from '@/components/views/CrmView';
import { GruhnestView } from '@/components/views/GruhnestView';
import { CompareView } from '@/components/views/CompareView';
import { PaymentsView } from '@/components/views/PaymentsView';
import { TemplatesView } from '@/components/views/TemplatesView';

export default function WorkspacePage() {
  const { currentView } = useWorkspaceStore();

  const renderActiveView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView />;
      case 'projects':
        return <ProjectsView />;
      case 'calendar':
        return <CalendarView />;
      case 'approvals':
        return <ApprovalsView />;
      case 'content':
        return <ContentStudioView />;
      case 'advertising':
        return <AdvertisingView />;
      case 'crm':
        return <CrmView />;
      case 'gruhnest':
        return <GruhnestView />;
      case 'compare':
        return <CompareView />;
      case 'payments':
        return <PaymentsView />;
      case 'templates':
        return <TemplatesView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] flex flex-col">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-60 flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <SearchModal />
      <FilterDrawer />
      <NewProjectModal />
      <NewTaskModal />
      <NewLeadModal />
    </div>
  );
}
