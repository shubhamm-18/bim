'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { SearchModal } from './SearchModal';
import { FilterDrawer } from './FilterDrawer';
import { NewProjectModal } from '@/components/modals/NewProjectModal';
import { NewTaskModal } from '@/components/modals/NewTaskModal';
import { NewLeadModal } from '@/components/modals/NewLeadModal';
import { useWorkspaceStore } from '@/store/workspace-store';
import { navigationConfig } from '@/config/navigation.config';
import { getRoleRoutePolicy, isRouteAllowedForRole } from '@/lib/permissions';
import { NavView } from '@/types';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const { currentRole, setCurrentView } = useWorkspaceStore();

  const matchedRoute = navigationConfig.allRoutes.find(
    (r) => r.href === pathname || (r.href !== '/' && pathname?.startsWith(r.href))
  );
  const rolePolicy = getRoleRoutePolicy(currentRole);
  const isAuthorizedRoute =
    !matchedRoute || isRouteAllowedForRole(currentRole, matchedRoute.id as NavView);

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

      {/* Main Content Area (Right-side sage mist canvas matching reference) */}
      <div className="md:ml-sidebar flex-1 flex flex-col min-w-0 transition-all bg-gradient-to-br from-[#F3F7F4] via-[#EAF2EC] to-[#DFECE3] min-h-screen">
        <Topbar onOpenMobileNav={() => setMobileNavOpen(true)} />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-workspace w-full mx-auto">
          {isAuthorizedRoute ? (
            children
          ) : (
            <div className="max-w-lg mx-auto mt-12 p-8 bg-white border border-border rounded-card text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-surface-subtle border border-border flex items-center justify-center mx-auto text-text-main">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-text-main">
                Access Restricted for {currentRole}
              </h2>
              <p className="text-xs text-text-muted leading-relaxed">
                This page (<strong>{matchedRoute?.label}</strong>) is outside the authorized permissions for <strong>{currentRole}</strong>.
              </p>
              <div className="pt-2">
                <Link
                  href={rolePolicy.defaultHref}
                  onClick={() => setCurrentView(rolePolicy.defaultView)}
                  className="inline-flex items-center px-4 py-2 rounded-btn bg-surface-subtle hover:bg-surface-hover border border-border text-xs font-bold text-text-main transition-colors"
                >
                  Go to Authorized {currentRole} Workspace →
                </Link>
              </div>
            </div>
          )}
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
