'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GruhnestIcon, ContentIcon, AdvertisingIcon, CrmIcon } from '@/components/ui';
import { useWorkspaceStore } from '@/store/workspace-store';
import { initialServiceModules } from '@/data/services.data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  content: ContentIcon,
  advertising: AdvertisingIcon,
  crm: CrmIcon,
  gruhnest: GruhnestIcon,
};

export function ServiceModulesSection() {
  const { setCurrentView } = useWorkspaceStore();

  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <CardHeader>
          <CardTitle>Service modules</CardTitle>
          <Badge variant="brand">360° Model</Badge>
        </CardHeader>

        <div className="space-y-2.5 mt-2">
          {initialServiceModules.map((svc) => {
            const Icon = iconMap[svc.id] || ContentIcon;
            return (
              <Link
                key={svc.id}
                href={svc.href}
                onClick={() => setCurrentView(svc.id as any)}
                className="w-full flex items-center justify-between p-3 rounded-btn border border-border hover:border-brand hover:bg-surface-hover transition-all text-left group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${svc.colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-text-main group-hover:text-brand truncate">
                      {svc.title}
                    </h4>
                    <p className="text-xs text-text-subtle truncate">{svc.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-text-subtle group-hover:text-brand group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </Link>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
