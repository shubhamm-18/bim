'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { RoleView } from '@/types';
import {
  Search,
  Filter,
  Bell,
  Plus,
  Briefcase,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

const roleOptions: RoleView[] = [
  'Founder',
  'Project Management',
  'Content',
  'Video',
  'Ads/Performance',
  'Developer',
  'Sales',
];

const viewLabels: Record<string, string> = {
  overview: 'Overview',
  projects: 'Client projects',
  calendar: 'Tasks & calendar',
  approvals: 'Approval board',
  content: 'Content studio',
  advertising: 'Advertising & performance',
  crm: 'Automation & CRM',
  gruhnest: 'Gruhnest property media',
  compare: 'Project comparison',
  payments: 'Payments & billing',
  templates: 'Project templates',
};

export function Topbar() {
  const {
    currentView,
    currentRole,
    setCurrentRole,
    setIsSearchOpen,
    isFilterOpen,
    setIsFilterOpen,
    selectedClientFilter,
    setIsNewProjectModalOpen,
  } = useWorkspaceStore();

  return (
    <header className="sticky top-0 z-20 h-16 bg-white border-b border-[#e4e5ec] px-8 flex items-center justify-between">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#727583]">
        <Briefcase className="w-4 h-4 text-[#8e91a0]" />
        <span>Workspace</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#c3c3ce]" />
        <span className="font-semibold text-[#20222c]">{viewLabels[currentView] || 'Overview'}</span>
        {selectedClientFilter && (
          <span className="ml-2 px-2 py-0.5 text-xs bg-[#efeafb] text-[#7040cd] rounded-full font-medium">
            Filtered
          </span>
        )}
      </div>

      {/* Top Actions */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-[#727583] bg-[#f7f8fa] hover:bg-[#efeafb] hover:text-[#7040cd] border border-[#e4e5ec] rounded-lg transition-all"
        >
          <Search className="w-3.5 h-3.5 text-[#8e91a0]" />
          <span>Search workspace...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-[#e4e5ec] rounded text-[#8e91a0]">
            ⌘ K
          </kbd>
        </button>

        {/* Filter Trigger */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-all ${
            isFilterOpen || selectedClientFilter
              ? 'bg-[#efeafb] text-[#7040cd] border-[#7040cd]/30'
              : 'text-[#535767] border-[#e4e5ec] hover:bg-[#f7f6fa]'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
          {selectedClientFilter && <span className="w-2 h-2 rounded-full bg-[#7040cd]"></span>}
        </button>

        <div className="h-5 w-px bg-[#e4e5ec]" />

        {/* Role Switcher */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-[#e4e5ec] rounded-lg bg-white">
          <UserCheck className="w-3.5 h-3.5 text-[#7040cd]" />
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as RoleView)}
            className="text-xs font-semibold text-[#20222c] bg-transparent outline-none cursor-pointer pr-1"
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role} view
              </option>
            ))}
          </select>
        </div>

        {/* Quick New Project Button */}
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#7040cd] hover:bg-[#5e35ce] rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New project</span>
        </button>

        {/* Notification Bell */}
        <button
          aria-label="Notifications"
          className="relative p-2 text-[#6b6c79] hover:bg-[#f3f1f8] rounded-lg transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7040cd] rounded-full ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
}
