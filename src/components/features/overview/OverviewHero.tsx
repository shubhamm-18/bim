'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { agencyConfig } from '@/config/agency.config';
import { useWorkspaceStore } from '@/store/workspace-store';

export function OverviewHero() {
  const { setIsNewProjectModalOpen } = useWorkspaceStore();

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border-darkHero shadow-2xl text-white bg-black bg-cover bg-center sm:bg-right bg-no-repeat min-h-hero flex items-center"
      style={{ backgroundImage: "url('/banners/hero banner.jpg')" }}
    >
      {/* Smooth Dark Shade on Left so Text is 100% Crystal Clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Content Area */}
      <div className="p-6 sm:p-10 lg:p-12 relative z-10 max-w-xl">
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] mb-2">
          Agency Overview
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 mt-4 leading-relaxed font-normal">
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
  );
}