'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GruhnestIcon, ProjectsIcon, TemplatesIcon, AdvertisingIcon } from '@/components/ui';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatCurrency } from '@/lib/utils';

export function ProjectsSummaryTable() {
  const { projects, selectedClientFilter, setCurrentView } = useWorkspaceStore();

  const filteredProjects = selectedClientFilter
    ? projects.filter((p) => p.clientName === selectedClientFilter)
    : projects;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-subtle border border-border flex items-center justify-center shrink-0 text-text-muted">
            <ProjectsIcon className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Client projects</CardTitle>
            <CardDescription>Active mandates under execution</CardDescription>
          </div>
        </div>
        <Link
          href="/projects"
          onClick={() => setCurrentView('projects')}
          className="text-xs font-semibold text-text-main hover:underline"
        >
          View all ({filteredProjects.length}) →
        </Link>
      </CardHeader>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Project</th>
              <th className="py-3 px-3">Client</th>
              <th className="py-3 px-3">City</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Info Status</th>
              <th className="py-3 px-3">Budget / Spend</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredProjects.map((proj) => (
              <tr key={proj.id} className="hover:bg-surface-subtle transition-colors">
                <td className="py-3 px-3">
                  <div className="font-bold text-text-main">{proj.name}</div>
                  <div className="text-[10px] text-text-subtle flex items-center gap-1 mt-0.5">
                    {proj.template?.toLowerCase().includes('gruhnest') ? (
                      <GruhnestIcon className="w-3 h-3 shrink-0" />
                    ) : proj.template?.toLowerCase().includes('full') ? (
                      <ProjectsIcon className="w-3 h-3 shrink-0" />
                    ) : proj.template?.toLowerCase().includes('ad machine') || proj.template?.toLowerCase().includes('performance') ? (
                      <AdvertisingIcon className="w-3 h-3 shrink-0" />
                    ) : (
                      <TemplatesIcon className="w-3 h-3 shrink-0" />
                    )}
                    <span>{proj.template}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-text-muted font-medium">
                  <div className="flex items-center gap-1.5">
                    {proj.clientName === 'Gruhnest' && <GruhnestIcon className="w-3.5 h-3.5" />}
                    <span>{proj.clientName}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-text-muted">{proj.city}</td>
                <td className="py-3 px-3">
                  <Badge variant={proj.status === 'Active' ? 'success' : 'neutral'}>
                    {proj.status}
                  </Badge>
                </td>
                <td className="py-3 px-3">
                  <Badge variant={proj.infoStatus === 'Verified' ? 'brand' : 'warning'}>
                    {proj.infoStatus}
                  </Badge>
                </td>
                <td className="py-3 px-3">
                  <div className="font-semibold text-text-main">
                    {formatCurrency(proj.budget || 0)}
                  </div>
                  <div className="text-[10px] text-brand font-medium">
                    Spend: {formatCurrency(proj.spend || 0)}
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <Link href="/projects" onClick={() => setCurrentView('projects')}>
                    <Button variant="ghost" size="sm">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
