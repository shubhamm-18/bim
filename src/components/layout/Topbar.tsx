'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useWorkspaceStore } from '@/store/workspace-store';
import { RoleView } from '@/types';
import { agencyConfig } from '@/config/agency.config';
import { navigationConfig } from '@/config/navigation.config';
import { isClientScopedRole } from '@/lib/permissions';
import {
  Search,
  Filter,
  Bell,
  Briefcase,
  ChevronRight,
  UserCheck,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  OverviewIcon,
  AnalyticsIcon,
  ProjectsIcon,
  CalendarIcon,
  ApprovalsIcon,
  ContentIcon,
  AdvertisingIcon,
  CrmIcon,
  GruhnestIcon,
  CompareIcon,
  PaymentsIcon,
  TemplatesIcon,
} from '@/components/ui';

const routeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  overview: OverviewIcon,
  analytics: AnalyticsIcon,
  projects: ProjectsIcon,
  calendar: CalendarIcon,
  approvals: ApprovalsIcon,
  content: ContentIcon,
  advertising: AdvertisingIcon,
  crm: CrmIcon,
  gruhnest: GruhnestIcon,
  compare: CompareIcon,
  payments: PaymentsIcon,
  templates: TemplatesIcon,
};

interface TopbarProps {
  onOpenMobileNav?: () => void;
}

export function Topbar({ onOpenMobileNav }: TopbarProps) {
  const pathname = usePathname();
  const {
    currentView,
    currentRole,
    setCurrentRole,
    scopedDeveloperClient,
    setScopedDeveloperClient,
    clients,
    setIsSearchOpen,
    isFilterOpen,
    setIsFilterOpen,
    selectedClientFilter,
  } = useWorkspaceStore();

  const currentRoute =
    navigationConfig.allRoutes.find(
      (r) => r.href === pathname || (r.href !== '/' && pathname?.startsWith(r.href))
    ) || navigationConfig.allRoutes.find((r) => r.id === currentView);

  const activeLabel = currentRoute?.label || 'Overview';
  const activeRouteId = currentRoute?.id || (currentView as string) || 'overview';
  const RouteIcon = routeIconMap[activeRouteId] || OverviewIcon;

  return (
    <header className="sticky top-0 z-20 h-topbar bg-surface-card border-b border-border px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        {onOpenMobileNav && (
          <button
            onClick={onOpenMobileNav}
            className="md:hidden p-2 text-text-subtle hover:text-text-main hover:bg-surface-subtle rounded-btn"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2 text-xs sm:text-sm text-text-muted min-w-0 truncate">
          <Briefcase className="w-4 h-4 text-text-subtle shrink-0 hidden sm:inline" />
          <span className="hidden sm:inline">Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-text-subtle/50 shrink-0 hidden sm:inline" />
          <span className="font-bold text-text-main truncate flex items-center gap-1.5">
            <RouteIcon className="w-4 h-4 shrink-0 inline-block" />
            <span>{activeLabel}</span>
          </span>
          {selectedClientFilter && (
            <Badge variant="outline" className="ml-1 sm:ml-2 shrink-0">
              Filtered: {selectedClientFilter}
            </Badge>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Bar */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-text-muted bg-surface-subtle hover:bg-brand-subtle hover:text-brand border border-border rounded-btn transition-all"
        >
          <Search className="w-3.5 h-3.5 text-text-subtle" />
          <span className="hidden lg:inline">Search workspace...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-surface-card border border-border rounded text-text-subtle">
            ⌘ K
          </kbd>
        </button>

        {/* Filter Trigger */}
        <Button
          variant={isFilterOpen || selectedClientFilter ? 'brand' : 'secondary'}
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filters</span>
          {selectedClientFilter && <span className="w-1.5 h-1.5 rounded-full bg-current"></span>}
        </Button>
        
        {/* Universal Role Switcher */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border rounded-btn bg-surface-card">
          <UserCheck className="w-3.5 h-3.5 text-brand" />
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as RoleView)}
            className="text-xs font-semibold text-text-main bg-transparent outline-none cursor-pointer pr-1"
          >
            {agencyConfig.roles.map((role) => (
              <option key={role} value={role}>
                {role} view
              </option>
            ))}
          </select>
        </div>

        {/* Client Scope Selector when Developer / Client login is active */}
        {isClientScopedRole(currentRole) && (
          <div className="hidden lg:flex items-center gap-1 px-2 py-1 text-xs border border-border rounded-btn bg-surface-subtle">
            <span className="text-[10px] font-bold text-text-subtle uppercase">Scope:</span>
            <select
              value={scopedDeveloperClient}
              onChange={(e) => setScopedDeveloperClient(e.target.value)}
              className="text-xs font-semibold text-text-main bg-transparent outline-none cursor-pointer"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Notification Bell */}
        <button
          aria-label="Notifications"
          className="relative p-2 text-text-muted hover:bg-surface-hover rounded-btn transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full ring-2 ring-surface-card" />
        </button>
      </div>
    </header>
  );
}
