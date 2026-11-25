'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useWorkspaceStore } from '@/store/workspace-store';
import { RoleView } from '@/types';
import { agencyConfig } from '@/config/agency.config';
import { navigationConfig } from '@/config/navigation.config';
import { getRoleRoutePolicy, isClientScopedRole } from '@/lib/permissions';
import {
  Search,
  Filter,
  Bell,
  Briefcase,
  ChevronRight,
  UserCheck,
  Users,
  Menu,
} from 'lucide-react';
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
  FinanceIcon,
  TemplatesIcon,
} from '@/components/ui';

const routeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  overview: OverviewIcon,
  finance: FinanceIcon,
  analytics: AnalyticsIcon,
  projects: ProjectsIcon,
  calendar: CalendarIcon,
  approvals: ApprovalsIcon,
  content: ContentIcon,
  advertising: AdvertisingIcon,
  crm: CrmIcon,
  gruhnest: GruhnestIcon,
  team: Users,
  compare: CompareIcon,
  payments: PaymentsIcon,
  templates: TemplatesIcon,
};

interface TopbarProps {
  onOpenMobileNav?: () => void;
}

export function Topbar({ onOpenMobileNav }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    currentView,
    setCurrentView,
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

  const syncServerSession = (nextRole: RoleView, nextClientScope?: string) => {
    if (typeof document !== 'undefined') {
      document.cookie = `bim_role=${encodeURIComponent(nextRole)}; path=/; SameSite=Lax`;
      if (nextClientScope) {
        document.cookie = `bim_client_scope=${encodeURIComponent(nextClientScope)}; path=/; SameSite=Lax`;
      }
    }
    void fetch('/api/auth/session', {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: nextRole,
        ...(nextClientScope ? { clientScope: nextClientScope } : {}),
      }),
    }).catch(() => {});
  };

  const handleRoleSwitch = (nextRole: RoleView) => {
    setCurrentRole(nextRole);
    syncServerSession(nextRole, scopedDeveloperClient);
    const policy = getRoleRoutePolicy(nextRole);
    setCurrentView(policy.defaultView);
    if (pathname !== policy.defaultHref) {
      router.push(policy.defaultHref);
    } else {
      router.refresh();
    }
  };

  const handleClientScopeChange = (nextClient: string) => {
    setScopedDeveloperClient(nextClient);
    syncServerSession(currentRole, nextClient);
    router.refresh();
  };

  const currentRoute =
    navigationConfig.allRoutes.find(
      (r) => r.href === pathname || (r.href !== '/' && pathname?.startsWith(r.href))
    ) || navigationConfig.allRoutes.find((r) => r.id === currentView);

  const activeLabel = currentRoute?.label || 'Overview';
  const activeRouteId = currentRoute?.id || (currentView as string) || 'overview';
  const RouteIcon = routeIconMap[activeRouteId] || OverviewIcon;

  return (
    <header className="sticky top-0 z-20 h-topbar overflow-hidden bg-gradient-to-r from-[#0E1F16] via-[#10241A] to-[#0C1B13] backdrop-blur-2xl border-b border-[#1F3A2B] shadow-[0_8px_28px_-10px_rgba(10,24,17,0.45)] px-4 sm:px-8 flex items-center justify-between gap-4 text-[#D9E5DD]">
      {/* Subtle Dark Forest Glass Sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 0%, rgba(62,123,89,0.28) 0%, transparent 45%), radial-gradient(circle at 85% 100%, rgba(45,94,67,0.22) 0%, transparent 50%)',
        }}
      />

      {/* Left: Mobile Menu & Breadcrumb */}
      <div className="relative z-10 flex items-center gap-3 min-w-0">
        {onOpenMobileNav && (
          <button
            onClick={onOpenMobileNav}
            className="md:hidden p-2 text-[#89A896] hover:text-white hover:bg-[#173023] rounded-btn"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#89A896] min-w-0 truncate">
          <Briefcase className="w-4 h-4 text-[#89A896] shrink-0 hidden sm:inline" />
          <span className="hidden sm:inline">Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#5D7C6B] shrink-0 hidden sm:inline" />
          <span className="font-bold text-white truncate flex items-center gap-1.5">
            <RouteIcon className="w-4 h-4 shrink-0 inline-block text-[#89C2A0]" />
            <span>{activeLabel}</span>
          </span>
          {selectedClientFilter && (
            <span className="ml-1 sm:ml-2 shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#183124] text-[#D9E5DD] border border-[#2C553E]">
              Filtered: {selectedClientFilter}
            </span>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search Bar */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs text-[#C8D8CE] bg-[#142A1E] hover:bg-[#1A3727] hover:text-white border border-[#234332] rounded-full transition-all shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-[#89A896]" />
          <span className="hidden lg:inline">Search workspace...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-[#0E1F16] border border-[#234332] rounded-full text-[#89A896]">
            ⌘ K
          </kbd>
        </button>

        {/* Filter Trigger */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all shadow-xs ${
            isFilterOpen || selectedClientFilter
              ? 'bg-gradient-to-r from-[#2D5E43] to-[#1E442F] text-white border-[#3E7B59]'
              : 'bg-[#142A1E] hover:bg-[#1A3727] text-[#C8D8CE] hover:text-white border-[#234332]'
          }`}
        >
          <Filter className="w-3.5 h-3.5 text-[#89A896]" />
          <span className="hidden sm:inline">Filters</span>
          {selectedClientFilter && <span className="w-1.5 h-1.5 rounded-full bg-current"></span>}
        </button>

        {/* Universal Role Switcher (shifts pages & enforces PDF role permissions) */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-[#234332] rounded-full bg-[#142A1E] hover:bg-[#1A3727] transition-colors shadow-xs">
          <UserCheck className="w-3.5 h-3.5 text-[#89C2A0] shrink-0" />
          <select
            value={currentRole}
            onChange={(e) => handleRoleSwitch(e.target.value as RoleView)}
            aria-label="Switch workspace role"
            className="text-xs font-semibold text-white bg-transparent outline-none cursor-pointer pr-1"
          >
            {agencyConfig.roles.map((role) => (
              <option key={role} value={role} className="bg-[#10241A] text-white">
                {role} view
              </option>
            ))}
          </select>
        </div>

        {/* Client Scope Selector when Developer / Client login is active */}
        {isClientScopedRole(currentRole) && (
          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs border border-[#234332] rounded-full bg-[#142A1E]">
            <span className="text-[10px] font-bold text-[#89A896] uppercase">Scope:</span>
            <select
              value={scopedDeveloperClient}
              onChange={(e) => handleClientScopeChange(e.target.value)}
              className="text-xs font-semibold text-white bg-transparent outline-none cursor-pointer"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.name} className="bg-[#10241A] text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Notification Bell */}
        <button
          aria-label="Notifications"
          className="relative p-2 text-[#C8D8CE] hover:bg-[#173023] hover:text-white rounded-full transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4ADE80] rounded-full ring-2 ring-[#10241A]" />
        </button>
      </div>
    </header>
  );
}
