'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { agencyConfig } from '@/config/agency.config';
import { useWorkspaceStore } from '@/store/workspace-store';

export function OverviewHero() {
  const { setIsNewProjectModalOpen } = useWorkspaceStore();

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border shadow-xs text-text-main bg-surface-card bg-cover bg-center sm:bg-right bg-no-repeat min-h-hero flex items-center"
      style={{ backgroundImage: "url('/banners/hero banner.jpg')" }}
    >
      {/* Smooth Shade on Left so Text is 100% Crystal Clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-card/90 via-surface-card/50 to-transparent pointer-events-none" />

      {/* Content Area */}
      <div className="p-6 sm:p-10 lg:p-12 relative z-10 max-w-xl">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-text-main leading-[1.1] mb-2">
          Agency Overview
        </h1>

        <p className="text-xs sm:text-sm text-text-muted mt-4 leading-relaxed font-normal">
          {agencyConfig.brand.tagline}
        </p>

        <div className="mt-8">
          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-surface-subtle text-text-main border border-border font-bold text-xs hover:bg-surface-hover transition-all shadow-sm hover:scale-105 active:scale-95"
          >
            <span className="text-base leading-none font-black">+</span>
            <span>New project</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}