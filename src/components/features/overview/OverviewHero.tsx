'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { agencyConfig } from '@/config/agency.config';
import { useWorkspaceStore } from '@/store/workspace-store';

export function OverviewHero() {
  const { setIsNewProjectModalOpen } = useWorkspaceStore();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface-darkHero border border-border-darkHero shadow-2xl text-white">
      {/* Subtle Ambient Brand Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-brand/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-hero items-center">
        {/* LEFT SIDE: Text, Headline & Button */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative z-10">
          <div>
            {/* Main Hero Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] mb-2">
              Agency Overview
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm text-gray-400 mt-4 max-w-lg leading-relaxed font-normal">
              {agencyConfig.brand.tagline}
            </p>

            {/* Primary Action Pill Button */}
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

        {/* RIGHT SIDE: Cute, Seamlessly Blended Infinity Logo */}
        <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-8 relative">
          {/* Soft ambient cosmic glow behind the infinity */}
          <div className="absolute w-56 h-56 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          {/* 
            mix-blend-screen: Image ke pure black background ko 100% transparent bana deta hai!
            radial-gradient mask: Charo taraf ke edges ko feather karke background me seamlessly blend kar deta hai!
          */}
          <img
            src="/banners/hero banner.jpg"
            alt="Beyond Imagine Infinity Logo"
            className="w-full max-w-xs sm:max-w-sm h-auto object-contain select-none pointer-events-none mix-blend-screen transition-all"
            style={{
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 75%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
