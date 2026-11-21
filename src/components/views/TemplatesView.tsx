'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export function TemplatesView() {
  const { templates, setIsNewProjectModalOpen } = useWorkspaceStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#20222c]">Project Templates</h1>
        <p className="text-xs text-[#8e91a0]">
          Standardized blueprints for onboarding new developers, 360° launches, and performance retainers.
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {templates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="p-6 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm hover:border-[#7040cd]/40 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#efeafb] text-[#7040cd]">
                  {tmpl.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#20222c] mt-3">{tmpl.name}</h3>
              <p className="text-xs text-[#535767] mt-1.5">{tmpl.description}</p>

              {/* Feature Checklist */}
              <div className="mt-4 pt-4 border-t border-[#f0f1f5] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e91a0]">
                  Included Workflows:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {tmpl.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-[#535767]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-[#f0f1f5] flex justify-end">
              <button
                onClick={() => setIsNewProjectModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#7040cd] hover:bg-[#5e35ce] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
              >
                <span>Use Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
