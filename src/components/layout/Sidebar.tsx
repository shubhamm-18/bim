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
  Lock,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRoleRoutePolicy, isRouteAllowedForRole } from '@/lib/permissions';
import { Badge, GruhnestIcon, AnalyticsIcon, ApprovalsIcon, CalendarIcon, ProjectsIcon, ContentIcon, AdvertisingIcon, CrmIcon, CompareIcon, PaymentsIcon, FinanceIcon, TemplatesIcon, OverviewIcon } from '@/components/ui';

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
  const { currentView, setCurrentView, approvalItems, currentRole } = useWorkspaceStore();
  const rolePolicy = getRoleRoutePolicy(currentRole);

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
        'w-sidebar bg-gradient-to-b from-[#0E1F16] via-[#10241A] to-[#0A1811] border-r border-[#1F3A2B] flex flex-col select-none transition-all h-screen text-[#D9E5DD]',
        className
      )}
    >
      {/* Brand Header */}
      <div className="h-topbar px-4 sm:px-5 flex items-center border-b border-[#1E3829] shrink-0">
        <Link href={rolePolicy.defaultHref} className="flex items-center w-full">
          <img
            src="/images/beyond-imagine-logo-dark.png"
            alt="Beyond Imagine Media Solutions"
            className="w-full h-auto max-h-[76px] object-contain object-left"
          />
        </Link>
      </div>

      {/* Navigation Scroll Area (Filtered by Role Policy) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navigationConfig.groups.map((group) => {
          const visibleItems = group.items.filter((item) =>
            isRouteAllowedForRole(currentRole, item.id as NavView)
          );
          if (visibleItems.length === 0) return null;

          return (
          <div key={group.id}>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#7E9A8A]">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {visibleItems.map((item) => {
                const displayLabel =
                  item.id === 'payments' && currentRole === 'Accountant'
                    ? 'Billing & Commission'
                    : item.id === 'payments' && currentRole === 'Developer'
                    ? 'Booking Updates'
                    : item.label;
                const IconComponent =
                  item.id === 'overview' || item.id === 'dashboard'
                    ? OverviewIcon
                    : item.id === 'finance'
                    ? FinanceIcon
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
                    ? GruhnestIcon
                    : item.id === 'compare'
                    ? CompareIcon
                    : item.id === 'team'
                    ? Users
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
                        ? 'bg-gradient-to-r from-[#2D5E43] via-[#1E442F] to-[#12291D] text-white border border-[#3E7B59]/60 font-bold shadow-xs'
                        : 'text-[#C8D8CE] hover:bg-[#173023] hover:text-white border border-transparent'
                    )}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <IconComponent
                        className={cn(
                          'w-5 h-5 shrink-0 transition-colors',
                          isActive ? 'text-white' : 'text-[#89A896] group-hover:text-white'
                        )}
                      />
                      <span className="truncate">{displayLabel}</span>
                    </div>
                    {item.id === 'gruhnest' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-[#2C553E] text-[#D9E5DD] border border-[#3E7B59]/70">
                        PRO
                      </span>
                    )}
                    {badgeCount !== undefined && badgeCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3B6B50] text-white">
                        {badgeCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          );
        })}
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-[#1E3829] shrink-0">
        <div className="p-2.5 rounded-xl bg-[#142A1E] border border-[#234332] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#2C553E] text-white font-bold text-xs flex items-center justify-center border border-[#3E7B59] shrink-0">
            {agencyConfig.user.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{agencyConfig.user.name}</p>
            <p className="text-[11px] text-[#89A896] truncate">{currentRole} view</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
