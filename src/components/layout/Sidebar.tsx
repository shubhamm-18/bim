'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWorkspaceStore } from '@/store/workspace-store';
import { NavView } from '@/types';
import { agencyConfig } from '@/config/agency.config';
import { navigationConfig, NavRouteItem } from '@/config/navigation.config';
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
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge, GruhnestIcon, AnalyticsIcon, ApprovalsIcon, CalendarIcon, ProjectsIcon, ContentIcon, AdvertisingIcon, CrmIcon, CompareIcon, PaymentsIcon, TemplatesIcon, OverviewIcon } from '@/components/ui';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  TrendingUp,
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
  GruhnestIcon,
  AnalyticsIcon,
  ApprovalsIcon,
  CalendarIcon,
  ProjectsIcon,
  ContentIcon,
  AdvertisingIcon,
  CrmIcon,
  CompareIcon,
  PaymentsIcon,
  TemplatesIcon,
  OverviewIcon,
};

interface SidebarProps {
  onItemClick?: () => void;
  className?: string;
}

export function Sidebar({ onItemClick, className }: SidebarProps) {
  const pathname = usePathname();
  const { currentView, setCurrentView, approvalItems } = useWorkspaceStore();

  const pendingApprovalsCount = approvalItems.filter((i) => i.status === 'Pending').length;

  const handleNavClick = (item: NavRouteItem) => {
    setCurrentView(item.id as NavView);
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <aside
      className={cn(
        'w-sidebar bg-surface-card border-r border-border flex flex-col select-none transition-all h-screen',
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-topbar px-5 flex items-center border-b border-border-subtle shrink-0">
        <Link href="/" className="block w-full">
          <img
            src="/images/beyond-imagine-logo.png"
            alt="Beyond Imagine Media Solutions"
            className="h-11 w-auto max-w-full object-contain"
          />
        </Link>
      </div>

      {/* Navigation Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigationConfig.groups.map((group) => (
          <div key={group.id}>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-text-subtle">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const IconComponent =
                  item.id === 'overview'
                    ? OverviewIcon
                    : item.id === 'gruhnest'
                    ? GruhnestIcon
                    : item.id === 'analytics'
                    ? AnalyticsIcon
                    : item.id === 'approvals'
                    ? ApprovalsIcon
                    : item.id === 'calendar'
                    ? CalendarIcon
                    : item.id === 'projects'
                    ? ProjectsIcon
                    : item.id === 'content'
                    ? ContentIcon
                    : item.id === 'advertising'
                    ? AdvertisingIcon
                    : item.id === 'crm'
                    ? CrmIcon
                    : item.id === 'compare'
                    ? CompareIcon
                    : item.id === 'payments'
                    ? PaymentsIcon
                    : item.id === 'templates'
                    ? TemplatesIcon
                    : iconMap[item.iconName] || LayoutDashboard;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href)) ||
                  currentView === item.id;

                const badgeCount =
                  item.badgeKey === 'pendingApprovals' ? pendingApprovalsCount : undefined;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group',
                      isActive
                        ? 'bg-brand-subtle text-brand'
                        : 'text-text-muted hover:bg-surface-hover hover:text-text-main'
                    )}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <IconComponent
                        className={cn(
                          'w-5 h-5 shrink-0 transition-colors',
                          isActive ? 'text-brand' : 'text-text-subtle group-hover:text-text-main'
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {badgeCount !== undefined && badgeCount > 0 && (
                      <Badge variant={isActive ? 'brand' : 'neutral'}>
                        {badgeCount}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-border flex items-center gap-3.5 bg-surface-card shrink-0">
        <div className="w-10 h-10 rounded-full bg-brand-subtle text-brand font-bold text-xs flex items-center justify-center border border-border shrink-0">
          {agencyConfig.user.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text-main truncate">{agencyConfig.user.name}</p>
          <p className="text-xs text-text-subtle truncate">{agencyConfig.user.role}</p>
        </div>
      </div>
    </aside>
  );
}
