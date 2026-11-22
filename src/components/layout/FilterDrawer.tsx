'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { X, Check } from 'lucide-react';
import { GruhnestIcon } from '@/components/ui';

export function FilterDrawer() {
  const {
    isFilterOpen,
    setIsFilterOpen,
    clients,
    selectedClientFilter,
    setSelectedClientFilter,
  } = useWorkspaceStore();

  if (!isFilterOpen) return null;

  return (
    <div className="absolute right-8 top-16 z-30 w-72 bg-surface-card rounded-card shadow-xl border border-border p-4 animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
        <span className="text-xs font-bold uppercase tracking-wider text-text-main">
          Filter Workspace
        </span>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="p-1 text-text-subtle hover:text-text-main rounded-btn transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-3">
        <label className="block text-xs font-semibold text-text-muted mb-2">Filter by Client</label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedClientFilter(null)}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-btn transition-colors ${
              selectedClientFilter === null
                ? 'bg-brand-subtle text-brand font-semibold'
                : 'text-text-muted hover:bg-surface-hover'
            }`}
          >
            <span>All Clients & Projects</span>
            {selectedClientFilter === null && <Check className="w-3.5 h-3.5 text-brand" />}
          </button>
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClientFilter(c.name)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-btn transition-colors ${
                selectedClientFilter === c.name
                  ? 'bg-brand-subtle text-brand font-semibold'
                  : 'text-text-muted hover:bg-surface-hover'
              }`}
            >
              <span className="flex items-center gap-2">
                {c.name.toLowerCase().includes('gruhnest') && <GruhnestIcon className="w-3.5 h-3.5" />}
                {c.name}
              </span>
              {selectedClientFilter === c.name && <Check className="w-3.5 h-3.5 text-brand" />}
            </button>
          ))}
        </div>
      </div>

      {selectedClientFilter && (
        <div className="pt-2 border-t border-border-subtle">
          <button
            onClick={() => setSelectedClientFilter(null)}
            className="w-full py-1.5 text-xs text-brand hover:underline font-semibold text-center"
          >
            Clear active filters
          </button>
        </div>
      )}
    </div>
  );
}
