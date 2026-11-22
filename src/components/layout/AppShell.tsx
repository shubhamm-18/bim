'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { SearchModal } from './SearchModal';
import { FilterDrawer } from './FilterDrawer';
import { NewProjectModal } from '@/components/modals/NewProjectModal';
import { NewTaskModal } from '@/components/modals/NewTaskModal';
import { NewLeadModal } from '@/components/modals/NewLeadModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-app flex flex-col antialiased">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="md:ml-sidebar flex-1 flex flex-col min-w-0 transition-all">
        <Topbar onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-workspace w-full mx-auto">
          {children}
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
