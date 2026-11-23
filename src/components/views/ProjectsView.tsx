'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Plus, Search } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProjectsIcon } from '@/components/ui';
import { ProjectCard, ClientAccountCard } from '@/components/features/projects';
import { ProjectsAnalytics } from '@/components/features/analytics';

export function ProjectsView() {
  const {
    projects,
    clients,
    setIsNewProjectModalOpen,
    selectedClientFilter,
  } = useWorkspaceStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = projects.filter((p) => {
    const matchClient = selectedClientFilter ? p.clientName === selectedClientFilter : true;
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' ? true : p.status === statusFilter;
    return matchClient && matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
            <ProjectsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Client Projects</h1>
            <p className="text-xs text-text-subtle">
              Manage all active mandates, real estate developers, and deliverables.
            </p>
          </div>
        </div>
        <Button
          variant="brand"
          size="md"
          onClick={() => setIsNewProjectModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>New project</span>
        </Button>
      </div>

      {/* Developer Accounts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clients.map((c) => {
          const clientProjects = projects.filter((p) => p.clientId === c.id);
          return (
            <ClientAccountCard
              key={c.id}
              client={c}
              projectsCount={clientProjects.length}
            />
          );
        })}
      </div>

      {/* Filter and Search Bar */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-2.5 px-3 py-1.5 bg-surface-subtle rounded-btn border border-border w-full sm:w-80">
          <Search className="w-4 h-4 text-text-subtle" />
          <input
            type="text"
            placeholder="Search projects by name, city, developer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-transparent outline-none text-text-main placeholder:text-text-subtle"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-text-muted font-medium">Status:</span>
          {['All', 'Active', 'Planning', 'On hold'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-btn transition-colors shrink-0 ${
                statusFilter === st
                  ? 'bg-brand-subtle text-brand'
                  : 'text-text-muted hover:bg-surface-hover'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<ProjectsIcon className="w-10 h-10" />}
          title="No projects found"
          description="Try clearing your search query or status filter to see other projects."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setStatusFilter('All');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      )}

      {/* Embedded Portfolio Budget & Health Analytics */}
      <ProjectsAnalytics />
    </div>
  );
}
