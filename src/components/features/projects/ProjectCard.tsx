import React from 'react';
import { Project } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GruhnestIcon, TemplatesIcon, ProjectsIcon, AdvertisingIcon } from '@/components/ui';
import { MapPin } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const percentSpent = Math.min(
    100,
    Math.round(((project.spend || 0) / (project.budget || 1)) * 100)
  );

  return (
    <Card className="hover:border-brand/40 hover:shadow-cardHover flex flex-col justify-between transition-all">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
              {project.clientName.toLowerCase().includes('gruhnest') && (
                <GruhnestIcon className="w-3.5 h-3.5" />
              )}
              <span>{project.clientName}</span>
            </span>
            <h3 className="text-base font-bold text-text-main mt-0.5">{project.name}</h3>
            <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
              <MapPin className="w-3.5 h-3.5 text-text-subtle" />
              <span>{project.city}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {project.template?.toLowerCase().includes('gruhnest') ? (
                  <GruhnestIcon className="w-3.5 h-3.5 shrink-0" />
                ) : project.template?.toLowerCase().includes('full') ? (
                  <ProjectsIcon className="w-3.5 h-3.5 shrink-0" />
                ) : project.template?.toLowerCase().includes('ad machine') || project.template?.toLowerCase().includes('performance') ? (
                  <AdvertisingIcon className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <TemplatesIcon className="w-3.5 h-3.5 shrink-0" />
                )}
                {project.template}
              </span>
            </div>
          </div>

          <Badge variant={project.status === 'Active' ? 'completed' : 'pending'}>
            {project.status}
          </Badge>
        </div>

        {/* Budget & Spend Progress */}
        <div className="my-4 p-3 bg-surface-subtle rounded-btn space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Budget & Spend</span>
            <span className="font-bold text-text-main">
              {formatCurrency(project.spend || 0)} / {formatCurrency(project.budget || 0)}
            </span>
          </div>
          <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all"
              style={{ width: `${percentSpent}%` }}
            />
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs py-1">
          <div>
            <span className="text-[10px] text-text-subtle block">Leads</span>
            <strong className="text-text-main">{project.leadsCount || 0}</strong>
          </div>
          <div>
            <span className="text-[10px] text-text-subtle block">Site Visits</span>
            <strong className="text-text-main">{project.siteVisitsCount || 0}</strong>
          </div>
          <div>
            <span className="text-[10px] text-text-subtle block">Bookings</span>
            <strong className="text-text-main">{project.bookingsCount || 0}</strong>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-3 border-t border-border-subtle flex items-center justify-between">
        <Badge variant={project.infoStatus === 'Verified' ? 'brand' : 'pending'}>{project.infoStatus}</Badge>
        <button
          onClick={() => onViewDetails?.(project)}
          className="text-xs font-semibold text-brand hover:underline"
        >
          View Project Details →
        </button>
      </div>
    </Card>
  );
}
