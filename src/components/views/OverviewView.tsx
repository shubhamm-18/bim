'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  CreditCard,
  FileText,
  FolderPlus,
  IndianRupee,
  MessageSquare,
  Plus,
  Rocket,
  Target,
  UserPlus,
  Users,
  Zap,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { OverviewIcon } from '@/components/ui/OverviewIcon';
import { FinanceOverviewChart, OnTimeDeliveryBox } from '@/components/features/overview';
import { useWorkspaceStore } from '@/store/workspace-store';
import { agencyConfig } from '@/config/agency.config';
import { canViewFinance } from '@/lib/permissions';

function MiniSparkBars({ heights }: { heights: number[] }) {
  return (
    <div className="flex items-end gap-1 h-9 shrink-0" aria-hidden="true">
      {heights.map((h, idx) => (
        <span
          key={idx}
          className={`w-2 rounded-t-sm transition-all ${
            idx === heights.length - 1 ? 'bg-[#4C8466]' : 'bg-[#CFE0D4]'
          }`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

const recentActivities = [
  { text: 'New project assigned: Luxury Villas Campaign', time: '2m ago', icon: CheckCircle2, accent: 'text-[#1D563B]' },
  { text: 'Payment received: ₹26,500', time: '5m ago', icon: CreditCard, accent: 'text-[#102F27]' },
  { text: 'Client approved proposal', time: '12m ago', icon: CheckCircle2, accent: 'text-[#1D563B]' },
  { text: 'New lead from Website', time: '18m ago', icon: UserPlus, accent: 'text-[#1D563B]' },
  { text: 'Project deadline updated', time: '30m ago', icon: Calendar, accent: 'text-[#4F6A5C]' },
];

export function OverviewView() {
  const {
    currentRole,
    setIsNewProjectModalOpen,
    setCurrentView,
    payments,
    commissionBookings,
    projects,
    clients,
    tasks,
  } = useWorkspaceStore();

  const showFinance = canViewFinance(currentRole);
  const totalEarned =
    payments.reduce((acc, p) => acc + p.amount, 0) +
    commissionBookings.reduce((acc, c) => acc + c.commissionAmount, 0);
  const formattedLakhs = (totalEarned / 100000).toFixed(2);

  return (
    <div className="space-y-5 pb-12 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0 shadow-2xs">
            <OverviewIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-[26px] font-bold text-text-main tracking-tight">
              Beyond Imagine
            </h1>
            <p className="text-xs text-text-muted mt-0.5">{agencyConfig.brand.tagline}</p>
          </div>
        </div>
        <Button variant="brand" size="md" onClick={() => setIsNewProjectModalOpen(true)} className="shrink-0">
          <Plus className="w-4 h-4" />
          <span>New project</span>
        </Button>
      </div>

      {/* Row 1: 4 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href={showFinance ? '/payments' : '/projects'} onClick={() => setCurrentView(showFinance ? 'payments' : 'projects')}>
          <Card className="p-4 hover:border-border-hover hover:shadow-cardHover transition-all h-full flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
                <span className="w-6 h-6 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center">
                  <IndianRupee className="w-3.5 h-3.5" />
                </span>
                <span>Total Revenue</span>
              </div>
              <div className="text-2xl font-extrabold text-text-main mt-3">
                {showFinance ? `₹${formattedLakhs} Lakh` : 'Private'}
              </div>
            </div>
            <MiniSparkBars heights={[38, 52, 46, 72, 92]} />
          </Card>
        </Link>

        <Link href="/projects" onClick={() => setCurrentView('projects')}>
          <Card className="p-4 hover:border-border-hover hover:shadow-cardHover transition-all h-full flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
                <span className="w-6 h-6 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5" />
                </span>
                <span>Total Projects</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-extrabold text-text-main">{Math.max(projects.length, 18)}</span>
                <span className="text-xs font-bold text-[#1D563B]">↑ 8.3%</span>
              </div>
            </div>
            <MiniSparkBars heights={[34, 48, 62, 74, 90]} />
          </Card>
        </Link>

        <Link href="/projects" onClick={() => setCurrentView('projects')}>
          <Card className="p-4 hover:border-border-hover hover:shadow-cardHover transition-all h-full flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
                <span className="w-6 h-6 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center">
                  <Users className="w-3.5 h-3.5" />
                </span>
                <span>Active Clients</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-extrabold text-text-main">{Math.max(clients.length, 25)}</span>
                <span className="text-xs font-bold text-[#1D563B]">↑ 6.7%</span>
              </div>
            </div>
            <MiniSparkBars heights={[30, 44, 58, 76, 94]} />
          </Card>
        </Link>

        <Link href="/crm" onClick={() => setCurrentView('crm')}>
          <Card className="p-4 hover:border-border-hover hover:shadow-cardHover transition-all h-full flex items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
                <span className="w-6 h-6 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center">
                  <Target className="w-3.5 h-3.5" />
                </span>
                <span>Conversion Rate</span>
              </div>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-extrabold text-text-main">12.5%</span>
                <span className="text-xs font-bold text-[#1D563B]">↑ 1.2%</span>
              </div>
            </div>
            <MiniSparkBars heights={[28, 46, 54, 72, 92]} />
          </Card>
        </Link>
      </div>

      {/* Row 2: Finance Overview Chart + Task On-Time Delivery Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <FinanceOverviewChart showFinance={showFinance} onNavigate={setCurrentView} />
        <OnTimeDeliveryBox tasks={tasks} onNavigate={setCurrentView} />
      </div>

      {/* Row 3: Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <Card className="lg:col-span-6 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-text-main">Recent Activity</h2>
            </div>
            <Link href="/calendar" onClick={() => setCurrentView('calendar')} className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-border-subtle">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.text} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${act.accent}`} />
                    <span className="text-text-main font-medium truncate">{act.text}</span>
                  </div>
                  <span className="text-[11px] text-text-subtle shrink-0">{act.time}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="lg:col-span-6 p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-7 h-7 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center">
              <Rocket className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-text-main">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-auto">
            <button onClick={() => setIsNewProjectModalOpen(true)} className="p-4 rounded-xl bg-surface-subtle hover:bg-surface-hover border border-border-subtle hover:border-border-hover flex flex-col items-center justify-center gap-2.5 text-center transition-all duration-150 active:scale-[0.97] group cursor-pointer">
              <FolderPlus className="w-5 h-5 text-[#1D563B] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-bold text-text-main">Create Project</span>
            </button>
            <Link href="/projects" onClick={() => setCurrentView('projects')} className="p-4 rounded-xl bg-surface-subtle hover:bg-surface-hover border border-border-subtle hover:border-border-hover flex flex-col items-center justify-center gap-2.5 text-center transition-all duration-150 active:scale-[0.97] group">
              <UserPlus className="w-5 h-5 text-[#1D563B] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-bold text-text-main">Add Client</span>
            </Link>
            <Link href={showFinance ? '/finance' : '/advertising'} onClick={() => setCurrentView(showFinance ? 'finance' : 'advertising')} className="p-4 rounded-xl bg-surface-subtle hover:bg-surface-hover border border-border-subtle hover:border-border-hover flex flex-col items-center justify-center gap-2.5 text-center transition-all duration-150 active:scale-[0.97] group">
              <BarChart3 className="w-5 h-5 text-[#1D563B] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-bold text-text-main">View Reports</span>
            </Link>
            <Link href="/crm" onClick={() => setCurrentView('crm')} className="p-4 rounded-xl bg-surface-subtle hover:bg-surface-hover border border-border-subtle hover:border-border-hover flex flex-col items-center justify-center gap-2.5 text-center transition-all duration-150 active:scale-[0.97] group">
              <MessageSquare className="w-5 h-5 text-[#1D563B] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-bold text-text-main">Open CRM</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
