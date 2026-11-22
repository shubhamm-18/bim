'use client';

import React, { useEffect, useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { themePresets, ThemePreset } from '@/config/theme.config';
import { useWorkspaceStore } from '@/store/workspace-store';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const { activeThemePreset, setActiveThemePreset } = useWorkspaceStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentPreset =
    themePresets.find((p) => p.id === activeThemePreset) || themePresets[0];

  const applyTheme = (preset: ThemePreset) => {
    setActiveThemePreset(preset.id);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--brand', preset.brandColor);
      root.style.setProperty('--brand-hover', preset.brandHover);
      root.style.setProperty('--brand-subtle', preset.brandSubtle);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    // Sync theme on initial load from persisted store
    if (currentPreset && typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--brand', currentPreset.brandColor);
      root.style.setProperty('--brand-hover', currentPreset.brandHover);
      root.style.setProperty('--brand-subtle', currentPreset.brandSubtle);
    }
  }, [activeThemePreset, currentPreset]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs border border-border rounded-btn bg-surface-card hover:bg-surface-hover text-text-muted transition-all"
        title="Change UI Theme Palette"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shadow-xs"
          style={{ backgroundColor: currentPreset.brandColor }}
        />
        <Palette className="w-3.5 h-3.5 text-text-subtle" />
        <span className="hidden sm:inline font-semibold text-text-main text-[11px]">
          {currentPreset.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-surface-card border border-border rounded-card shadow-lg p-1.5 z-50 animate-scale-in">
            <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-subtle border-b border-border-subtle mb-1">
              Select Color Palette
            </div>
            <div className="space-y-0.5">
              {themePresets.map((preset) => {
                const isSelected = preset.id === currentPreset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => applyTheme(preset)}
                    className={cn(
                      'w-full flex items-center justify-between px-2 py-1.5 rounded-btn text-xs font-medium transition-colors text-left',
                      isSelected
                        ? 'bg-brand-subtle text-brand font-semibold'
                        : 'text-text-main hover:bg-surface-hover'
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: preset.brandColor }}
                      />
                      <span>{preset.name}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-brand" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
