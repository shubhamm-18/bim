'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { TemplatesIcon, GruhnestIcon, ProjectsIcon, AdvertisingIcon } from '@/components/ui';

export function TemplatesView() {
  const { templates, setIsNewProjectModalOpen } = useWorkspaceStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center shrink-0">
          <TemplatesIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Project Templates</h1>
          <p className="text-xs text-text-subtle">
            Standardized blueprints for onboarding new developers, 360° launches, and performance retainers.
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {templates.map((tmpl) => (
          <Card
            key={tmpl.id}
            className="hover:border-brand/40 hover:shadow-cardHover flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="brand">{tmpl.category}</Badge>
              </div>
              <h3 className="text-lg font-bold text-text-main mt-3 flex items-center gap-2">
                {tmpl.name.toLowerCase().includes('gruhnest') ? (
                  <GruhnestIcon className="w-5 h-5 shrink-0" />
                ) : tmpl.name.toLowerCase().includes('full real estate launch') || tmpl.id === 'tmpl-1' ? (
                  <ProjectsIcon className="w-5 h-5 shrink-0" />
                ) : tmpl.name.toLowerCase().includes('ad machine') || tmpl.id === 'tmpl-2' ? (
                  <AdvertisingIcon className="w-5 h-5 shrink-0" />
                ) : (
                  <TemplatesIcon className="w-5 h-5 shrink-0" />
                )}
                <span>{tmpl.name}</span>
              </h3>
              <p className="text-xs text-text-muted mt-1.5">{tmpl.description}</p>

              {/* Feature Checklist */}
              <div className="mt-4 pt-4 border-t border-border-subtle space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-subtle">
                  Included Workflows:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {tmpl.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-1.5 text-text-muted">
                      <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-border-subtle flex justify-end">
              <Button
                variant="brand"
                size="md"
                onClick={() => setIsNewProjectModalOpen(true)}
              >
                <span>Use Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
