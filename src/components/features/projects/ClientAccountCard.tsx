import React from 'react';
import { Client } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { GruhnestIcon } from '@/components/ui';

export interface ClientAccountCardProps {
  client: Client;
  projectsCount: number;
}

export function ClientAccountCard({ client, projectsCount }: ClientAccountCardProps) {
  const isGruhnest = client.name.toLowerCase().includes('gruhnest');

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isGruhnest ? (
              <div className="w-8 h-8 rounded-btn bg-surface-subtle border border-border flex items-center justify-center p-1.5 shadow-xs shrink-0 text-text-muted">
                <GruhnestIcon className="w-full h-full" />
              </div>
            ) : (
              <span className="w-8 h-8 rounded-btn bg-surface-subtle text-text-main border border-border font-bold text-xs flex items-center justify-center">
                {client.tag.toUpperCase()}
              </span>
            )}
            <div>
              <h3 className="text-sm font-bold text-text-main">{client.name}</h3>
              <span className="text-[10px] text-text-subtle">{client.owner}</span>
            </div>
          </div>
          <Badge variant="brand">
            {projectsCount} {projectsCount === 1 ? 'proj' : 'projs'}
          </Badge>
        </div>
        <p className="text-xs text-text-muted mt-3">{client.scope}</p>
      </div>
      <div className="pt-3 mt-3 border-t border-border-subtle text-[11px] text-text-subtle">
        Deliverables: <b className="text-text-main font-medium">{client.deliverables}</b>
      </div>
    </Card>
  );
}
