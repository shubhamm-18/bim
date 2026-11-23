'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Search,
  Filter,
  User,
  Bell,
} from 'lucide-react';
import {
  OverviewIcon,
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
import { useWorkspaceStore } from '@/store/workspace-store';
import { agencyConfig } from '@/config/agency.config';
import { getTodayFormatted, getHeroDateFormatted } from '@/lib/utils';
import { initialServiceModules } from '@/data/services.data';

const previewServiceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  content: ContentIcon,
  advertising: AdvertisingIcon,
  crm: CrmIcon,
  gruhnest: GruhnestIcon,
};

export default function PreviewPage() {
  const {
    projects,
    tasks,
    approvalItems,
    campaigns,
    leads,
    setIsNewProjectModalOpen,
  } = useWorkspaceStore();

  const [scaleMode, setScaleMode] = useState<'scaled' | 'split'>('scaled');
  const [iconSize] = useState<'medium' | 'large'>('large');
  const [heroOption, setHeroOption] = useState<'architectural' | 'wave'>('architectural');
  const [eyebrowStyle, setEyebrowStyle] = useState<'white-gold' | 'emblem' | 'frosted'>('white-gold');
  const [activeTaskTab, setActiveTaskTab] = useState<'today' | 'overdue' | 'upcoming'>('today');

  // KPI Calculations
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = tasks.filter((t) => t.due === todayStr && t.status !== 'Done');
  const overdueTasks = tasks.filter((t) => t.due < todayStr && t.status !== 'Done');
  const pendingApprovals = approvalItems.filter((a) => a.status === 'Pending');
  const totalSiteVisits =
    campaigns.reduce((acc, c) => acc + c.siteVisits, 0) +
    leads.filter((l) => l.stage === 'Visit completed' || l.stage === 'Visit booked').length;

  const sidebarIconClass = iconSize === 'large' ? 'w-6 h-6' : 'w-5 h-5';
  const sidebarTextClass = iconSize === 'large' ? 'text-[14px]' : 'text-xs';
  const sidebarPadding = iconSize === 'large' ? 'px-4 py-2.5' : 'px-3 py-2';

  const navGroups = [
    {
      title: 'WORKSPACE',
      items: [
        { id: 'overview', label: 'Overview', icon: OverviewIcon, active: true },
        { id: 'projects', label: 'Client projects', icon: ProjectsIcon },
        { id: 'calendar', label: 'Tasks & calendar', icon: CalendarIcon },
        { id: 'approvals', label: 'Approval board', icon: ApprovalsIcon, badge: pendingApprovals.length || 2 },
      ],
    },
    {
      title: 'SERVICE MODULES',
      items: [
        { id: 'content', label: 'Content studio', icon: ContentIcon },
        { id: 'advertising', label: 'Advertising', icon: AdvertisingIcon },
        { id: 'crm', label: 'Automation & CRM', icon: CrmIcon },
        { id: 'gruhnest', label: 'Gruhnest', icon: GruhnestIcon },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: 'compare', label: 'Project comparison', icon: CompareIcon },
        { id: 'payments', label: 'Payments', icon: PaymentsIcon },
        { id: 'templates', label: 'Templates', icon: TemplatesIcon },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-surface-appSubtle text-[#1e2029]">
      {/* Floating Preview Control Bar */}
      <div className="sticky top-0 z-50 bg-surface-darkPanel text-white px-6 py-3 shadow-xl border-b border-border-darkPanel flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
            UI Scale & Layout Preview
          </span>
          <span className="text-xs text-gray-400 hidden sm:inline">|</span>
          <span className="text-xs text-gray-300 hidden sm:inline">
            Horizontally & Vertically Scaled Layout
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Eyebrow Logo Switcher */}
          <div className="flex items-center bg-surface-darkControl p-1 rounded-lg border border-border-darkControl text-xs">
            <button
              onClick={() => setEyebrowStyle('white-gold')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                eyebrowStyle === 'white-gold' ? 'bg-amber-500 text-black font-bold shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              Badge A: Gold Capsule ★
            </button>
            <button
              onClick={() => setEyebrowStyle('emblem')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                eyebrowStyle === 'emblem' ? 'bg-amber-500 text-black font-bold shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              Badge B: Emblem
            </button>
            <button
              onClick={() => setEyebrowStyle('frosted')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                eyebrowStyle === 'frosted' ? 'bg-amber-500 text-black font-bold shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              Badge C: Frosted Glass
            </button>
          </div>

          {/* Hero Banner Style Switcher */}
          <div className="flex items-center bg-surface-darkControl p-1 rounded-lg border border-border-darkControl text-xs">
            <button
              onClick={() => setHeroOption('architectural')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                heroOption === 'architectural' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              Architectural Hero (Live)
            </button>
            <button
              onClick={() => setHeroOption('wave')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                heroOption === 'wave' ? 'bg-purple-600 text-white shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              Purple Wave Hero
            </button>
          </div>

          {/* Scale / Compare Switcher */}
          <div className="flex items-center bg-surface-darkControl p-1 rounded-lg border border-border-darkControl text-xs">
            <button
              onClick={() => setScaleMode('scaled')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                scaleMode === 'scaled' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Full Preview
            </button>
            <button
              onClick={() => setScaleMode('split')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                scaleMode === 'split' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Compare with Reference
            </button>
          </div>

          <Link
            href="/"
            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-all"
          >
            ← Back to App
          </Link>
        </div>
      </div>

      {scaleMode === 'split' ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">
          {/* Reference Screenshot */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800">User Reference Screenshot</h3>
              <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                Target Reference
              </span>
            </div>
            <img
              src="/reference-screenshot.jpg"
              alt="User Reference Screenshot"
              className="w-full rounded-xl border border-gray-200 shadow-xs"
            />
          </div>

          {/* Scaled Preview Frame */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-800">Proposed Scaled-Up Implementation</h3>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Live Interactive Mock
              </span>
            </div>
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-inner bg-surface-appSubtle">
              {renderFullScaledWorkspace()}
            </div>
          </div>
        </div>
      ) : (
        renderFullScaledWorkspace()
      )}
    </div>
  );

  function renderFullScaledWorkspace() {
    return (
      <div className="flex min-h-[calc(100vh-50px)]">
        {/* EXPANDED SIDEBAR (w-72 / 288px) */}
        <aside className="w-72 shrink-0 bg-white border-r border-[#e5e7eb] flex flex-col justify-between shadow-xs select-none">
          <div>
            {/* Header / Brand */}
            <div className="h-20 px-6 border-b border-gray-100 flex items-center">
              <Link href="/" className="block w-full">
                <img
                  src="/images/beyond-imagine-logo.png"
                  alt="Beyond Imagine Media Solutions"
                  className="h-11 w-auto max-w-full object-contain"
                />
              </Link>
            </div>

            {/* Navigation Sections */}
            <div className="py-5 px-3 space-y-6">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <div className="px-3.5 mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    {group.title}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.active;
                      return (
                        <div
                          key={item.id}
                          className={`w-full flex items-center justify-between ${sidebarPadding} rounded-xl ${sidebarTextClass} font-semibold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-purple-50 text-purple-700 shadow-xs'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <Icon className={`${sidebarIconClass} shrink-0`} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge !== undefined && (
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                                isActive ? 'bg-purple-200 text-purple-800' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile Footer */}
          <div className="p-5 border-t border-gray-100 flex items-center gap-3.5 bg-gray-50/60">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-extrabold text-xs flex items-center justify-center border border-purple-200 shrink-0">
              RS
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 truncate">Rahul Shrivastav</p>
              <p className="text-[11px] text-gray-500 truncate">Workspace owner</p>
            </div>
          </div>
        </aside>

        {/* EXPANDED MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* TOPBAR */}
          <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between gap-4 sticky top-0 z-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <span>Workspace</span>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <OverviewIcon className="w-4 h-4" />
                <span>Overview</span>
              </div>
            </div>

            {/* Actions: Search, Filter, Founder View, Bell */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
                <Search className="w-3.5 h-3.5 text-gray-400" />
                <span>Search</span>
                <kbd className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded-md font-mono text-gray-400 shadow-xs">
                  ⌘ K
                </kbd>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                <Filter className="w-3.5 h-3.5 text-gray-500" />
                <span>Filters</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                <User className="w-3.5 h-3.5 text-gray-500" />
                <span>Founder view</span>
                <ChevronRight className="w-3 h-3 text-gray-400 rotate-90" />
              </div>

              <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand ring-2 ring-white" />
              </button>
            </div>
          </header>

          {/* MAIN VIEW CONTENT (EXPANDED HORIZONTALLY & VERTICALLY) */}
          <main className="p-8 lg:p-10 space-y-8 max-w-workspace w-full mx-auto">
            {/* HERO BANNER - SWITCHABLE IN PREVIEW */}
            {heroOption === 'architectural' ? (
              <div className="relative overflow-hidden rounded-3xl bg-surface-darkHero border border-border-darkHero shadow-2xl text-white">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-brand/20 rounded-full blur-3xl pointer-events-none" />
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-hero items-stretch">
                  <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative z-10">
                    <div>
                      {eyebrowStyle === 'white-gold' && (
                        <div className="inline-flex items-center gap-3 px-4 sm:px-4.5 py-2 rounded-full bg-black/60 border border-amber-500/70 shadow-lg shadow-black/40 backdrop-blur-md mb-6">
                          <img
                            src="/images/beyond-imagine-logo-dark.png"
                            alt="Beyond Imagine Media"
                            className="h-5 sm:h-5.5 w-auto object-contain"
                          />
                          <span className="text-xs sm:text-[12px] font-bold tracking-wider text-amber-300 uppercase whitespace-nowrap">
                            • {getHeroDateFormatted()}
                          </span>
                        </div>
                      )}
                      {eyebrowStyle === 'emblem' && (
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-amber-500/30 backdrop-blur-sm mb-6">
                          <img
                            src="/images/beyond-imagine-emblem.png"
                            alt="B"
                            className="h-5 w-auto object-contain"
                          />
                          <span className="text-xs font-black tracking-wide text-white uppercase">Beyond Imagine</span>
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span className="text-[11px] font-semibold text-amber-300/90 uppercase tracking-wider">
                            {getTodayFormatted()}
                          </span>
                        </div>
                      )}
                      {eyebrowStyle === 'frosted' && (
                        <div className="inline-flex items-center gap-3 mb-6">
                          <div className="px-3.5 py-1 rounded-full bg-white border border-amber-400/70 shadow-md flex items-center">
                            <img
                              src="/images/beyond-imagine-logo.png"
                              alt="Beyond Imagine Media"
                              className="h-4.5 w-auto object-contain"
                            />
                          </div>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase">
                            {getTodayFormatted()}
                          </span>
                        </div>
                      )}
                      <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] mb-2">
                        Agency Overview.
                      </h1>
                      <p className="text-xs sm:text-sm text-gray-400 mt-4 max-w-lg leading-relaxed font-normal">
                        {agencyConfig.brand.tagline}
                      </p>
                      <div className="mt-8">
                        <button
                          onClick={() => setIsNewProjectModalOpen(true)}
                          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-brand hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
                        >
                          <span className="text-base leading-none font-black">+</span>
                          <span>New project</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    className="lg:col-span-5 relative min-h-heroMedia lg:min-h-full overflow-hidden bg-cover bg-center"
                    style={{ backgroundImage: "url('/banners/nova-architectural-hero.jpg')" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-darkHero via-surface-darkHero/30 to-transparent" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-surface-darkCard border border-border-darkCard shadow-xl text-white min-h-[260px] flex items-center">
                <div
                  className="absolute inset-y-0 right-0 w-full md:w-3/5 pointer-events-none opacity-90 bg-right bg-no-repeat bg-contain"
                  style={{ backgroundImage: "url('/banners/purple-wave-banner.svg')" }}
                />
                <div className="relative z-10 p-8 sm:p-12 max-w-xl">
                  <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-purple-300/80 mb-4">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>SUNDAY, 22 NOVEMBER 2026</span>
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                    Agency overview
                  </h1>
                  <p className="text-sm text-gray-400 mt-3 font-normal leading-relaxed">
                    Your projects, priorities and performance in one place.
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setIsNewProjectModalOpen(true)}
                      className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs hover:bg-gray-100 transition-all shadow-lg hover:scale-105 active:scale-95"
                    >
                      <span className="text-base leading-none font-black">+</span>
                      <span>New project</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4 CORE KPI METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Metric 1 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Client projects</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 flex items-center justify-center">
                    <ProjectsIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-black text-gray-900 mt-3 tracking-tight">
                  {projects.length || 5}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">3 clients in workspace</div>
              </div>

              {/* Metric 2 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Tasks due today</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-black text-gray-900 mt-3 tracking-tight">
                  {todayTasks.length || 1}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">
                  {overdueTasks.length || 5} overdue tasks
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Pending approvals</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center">
                    <ApprovalsIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-black text-gray-900 mt-3 tracking-tight">
                  {pendingApprovals.length || 2}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">Awaiting review</div>
              </div>

              {/* Metric 4 */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Reported site visits</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
                    <AdvertisingIcon className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-black text-gray-900 mt-3 tracking-tight">
                  {totalSiteVisits || 13}
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1">Campaign snapshots</div>
              </div>
            </div>

            {/* TWO-COLUMN SECTION: PRIORITY TASKS (60%) & SERVICE MODULES (40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* LEFT: PRIORITY TASKS */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">Priority tasks</h3>
                    <Link href="/calendar" className="text-xs font-bold text-purple-600 hover:underline">
                      View all
                    </Link>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => setActiveTaskTab('today')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        activeTaskTab === 'today'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Today <span className="ml-1 opacity-70">1</span>
                    </button>
                    <button
                      onClick={() => setActiveTaskTab('overdue')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        activeTaskTab === 'overdue'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Overdue <span className="ml-1 opacity-70">5</span>
                    </button>
                    <button
                      onClick={() => setActiveTaskTab('upcoming')}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        activeTaskTab === 'upcoming'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Upcoming <span className="ml-1 opacity-70">2</span>
                    </button>
                  </div>

                  {/* Task Item Row */}
                  <div className="mt-5 space-y-3">
                    <div className="p-4 rounded-xl border border-gray-200/70 hover:border-purple-300 transition-all flex items-start justify-between gap-4 bg-gray-50/40">
                      <div className="flex items-start gap-3.5">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 leading-snug">
                            Confirm walkthrough shoot slot
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <span>Vapi buyer guide</span>
                            <span>•</span>
                            <span className="text-gray-500">Tentative</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 shrink-0">
                        • Medium
                      </span>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-200/70 hover:border-purple-300 transition-all flex items-start justify-between gap-4 bg-gray-50/40">
                      <div className="flex items-start gap-3.5">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 leading-snug">
                            Review meta ads creative refresh
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <span>Gruhnest Media</span>
                            <span>•</span>
                            <span className="text-gray-500">In Review</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 shrink-0">
                        • Urgent
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: SERVICE MODULES */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">Service modules</h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200/60">
                      360° model
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {initialServiceModules.map((svc) => {
                      const Icon = previewServiceIconMap[svc.id] || ContentIcon;
                      return (
                        <div
                          key={svc.id}
                          className="p-3.5 rounded-xl border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 ${svc.previewBg}`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                                {svc.title}
                              </h4>
                              <p className="text-xs text-gray-400 truncate">{svc.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-600 transition-colors shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* CLIENT PROJECTS SUMMARY TABLE */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <ProjectsIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Client projects</h3>
                </div>
                <Link href="/projects" className="text-xs font-bold text-purple-600 hover:underline">
                  View all
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-gray-400 uppercase tracking-wider text-[11px] border-b border-gray-100">
                      <th className="py-3 px-4 font-bold">Project</th>
                      <th className="py-3 px-4 font-bold">Client</th>
                      <th className="py-3 px-4 font-bold">City</th>
                      <th className="py-3 px-4 font-bold">Status</th>
                      <th className="py-3 px-4 font-bold">Info status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-gray-900">
                          {proj.name}
                          <div className="text-[11px] text-gray-400 font-normal flex items-center gap-1 mt-0.5">
                            <TemplatesIcon className="w-3 h-3 inline-block opacity-70" />
                            <span>{proj.template}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 font-semibold">
                          <div className="flex items-center gap-1.5">
                            {proj.clientName.toLowerCase().includes('gruhnest') && (
                              <GruhnestIcon className="w-3.5 h-3.5 shrink-0" />
                            )}
                            <span>{proj.clientName}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-gray-500">{proj.city}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {proj.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                            {proj.infoStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
