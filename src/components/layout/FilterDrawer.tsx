'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { X, Check } from 'lucide-react';

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
    <div className="absolute right-8 top-16 z-30 w-72 bg-white rounded-xl shadow-xl border border-[#e4e5ec] p-4 animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-[#f0f1f5]">
        <span className="text-xs font-bold uppercase tracking-wider text-[#20222c]">
          Filter Workspace
        </span>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="p-1 text-[#8e91a0] hover:text-[#20222c] rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-3">
        <label className="block text-xs font-semibold text-[#727583] mb-2">Filter by Client</label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedClientFilter(null)}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
              selectedClientFilter === null
                ? 'bg-[#efeafb] text-[#7040cd] font-semibold'
                : 'text-[#535767] hover:bg-[#f7f6fa]'
            }`}
          >
            <span>All Clients & Projects</span>
            {selectedClientFilter === null && <Check className="w-3.5 h-3.5 text-[#7040cd]" />}
          </button>
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClientFilter(c.name)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                selectedClientFilter === c.name
                  ? 'bg-[#efeafb] text-[#7040cd] font-semibold'
                  : 'text-[#535767] hover:bg-[#f7f6fa]'
              }`}
            >
              <span>{c.name}</span>
              {selectedClientFilter === c.name && <Check className="w-3.5 h-3.5 text-[#7040cd]" />}
            </button>
          ))}
        </div>
      </div>

      {selectedClientFilter && (
        <div className="pt-2 border-t border-[#f0f1f5]">
          <button
            onClick={() => setSelectedClientFilter(null)}
            className="w-full py-1.5 text-xs text-[#7040cd] hover:underline font-medium text-center"
          >
            Clear active filters
          </button>
        </div>
      )}
    </div>
  );
}
