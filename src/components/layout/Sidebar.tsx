'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { NavView } from '@/types';
import {
  LayoutDashboard,
  FolderKanban,
  CalendarDays,
  ClipboardCheck,
  Clapperboard,
  Megaphone,
  Workflow,
  Building2,
  GitCompare,
  CreditCard,
  Layers,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: NavView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export function Sidebar() {
  const { currentView, setCurrentView, approvalItems } = useWorkspaceStore();

  const pendingApprovalsCount = approvalItems.filter((i) => i.status === 'Pending').length;

  const workspaceNav: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Client projects', icon: FolderKanban },
    { id: 'calendar', label: 'Tasks & calendar', icon: CalendarDays },
    { id: 'approvals', label: 'Approval board', icon: ClipboardCheck, badge: pendingApprovalsCount },
  ];

  const serviceNav: NavItem[] = [
    { id: 'content', label: 'Content studio', icon: Clapperboard },
    { id: 'advertising', label: 'Advertising', icon: Megaphone },
    { id: 'crm', label: 'Automation & CRM', icon: Workflow },
    { id: 'gruhnest', label: 'Gruhnest', icon: Building2 },
  ];

  const managementNav: NavItem[] = [
    { id: 'compare', label: 'Project comparison', icon: GitCompare },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'templates', label: 'Templates', icon: Layers },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-60 bg-white border-r border-[#e4e5ec] flex flex-col z-30 select-none">
      {/* Brand Header */}
      <div className="h-20 px-5 flex items-center gap-3 border-b border-[#f0f1f5]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8653f5] to-[#5e35ce] flex items-center justify-center text-white shadow-sm ring-2 ring-[#7040cd]/10">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <strong className="block text-base font-bold tracking-tight text-[#20222c] leading-tight">
            Beyond Imagine
          </strong>
          <small className="block text-[10px] tracking-wider uppercase font-semibold text-[#8e91a0]">
            Media Solutions
          </small>
        </div>
      </div>

      {/* Nav Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Workspace */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#8e91a0]">
            Workspace
          </div>
          <div className="space-y-0.5">
            {workspaceNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#efeafb] text-[#7040cd] font-semibold'
                      : 'text-[#535767] hover:bg-[#f7f6fa] hover:text-[#20222c]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-[#7040cd]' : 'text-[#6f7382]')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={cn(
                        'px-2 py-0.5 text-xs font-semibold rounded-full',
                        isActive ? 'bg-[#7040cd] text-white' : 'bg-[#f3f1f6] text-[#6d6d77]'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Modules */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#8e91a0]">
            Service Modules
          </div>
          <div className="space-y-0.5">
            {serviceNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#efeafb] text-[#7040cd] font-semibold'
                      : 'text-[#535767] hover:bg-[#f7f6fa] hover:text-[#20222c]'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-[#7040cd]' : 'text-[#6f7382]')} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Management */}
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#8e91a0]">
            Management
          </div>
          <div className="space-y-0.5">
            {managementNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#efeafb] text-[#7040cd] font-semibold'
                      : 'text-[#535767] hover:bg-[#f7f6fa] hover:text-[#20222c]'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-[#7040cd]' : 'text-[#6f7382]')} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-[#e4e5ec] flex items-center gap-3 bg-white">
        <div className="w-9 h-9 rounded-full bg-[#ebe4f8] text-[#7040cd] font-bold text-xs flex items-center justify-center border border-[#ddd4f3]">
          RS
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#20222c] truncate">Rahul Shrivastav</p>
          <p className="text-[10px] text-[#8e91a0] truncate">Workspace owner</p>
        </div>
      </div>
    </aside>
  );
}
