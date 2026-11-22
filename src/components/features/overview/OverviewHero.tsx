'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { agencyConfig } from '@/config/agency.config';
import { useWorkspaceStore } from '@/store/workspace-store';
import { getHeroDateFormatted } from '@/lib/utils';

export function OverviewHero() {
  const { setIsNewProjectModalOpen } = useWorkspaceStore();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface-darkHero border border-border-darkHero shadow-2xl text-white">
      {/* Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-brand/20 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-hero items-stretch">
        {/* LEFT SIDE: Text, Badges, Headline & Button */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative z-10">
          <div>
            {/* Eyebrow Badge: Frosted Glass Capsule with Gold Trim */}
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

            {/* Main Hero Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1] mb-2">
              Agency Overview.
            </h1>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm text-gray-400 mt-4 max-w-lg leading-relaxed font-normal">
              {agencyConfig.brand.tagline}
            </p>

            {/* Primary Action Pill Button (Left Side) */}
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

        {/* RIGHT SIDE: Clean Architectural Photograph with Smooth Gradient Bleed */}
        <div
          className="lg:col-span-5 relative min-h-heroMedia lg:min-h-full overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/banners/nova-architectural-hero.jpg')" }}
        >
          {/* Smooth Gradient Bleed into Left Dark Area */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface-darkHero via-surface-darkHero/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
