import React from 'react';
import { cn } from '@/lib/utils';
import { FolderOpen } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-card bg-surface-subtle/40',
        className
      )}
    >
      <div className="p-3 bg-surface-card rounded-full border border-border text-text-subtle mb-3 shadow-sm">
        {icon || <FolderOpen className="w-6 h-6" />}
      </div>
      <h3 className="text-sm font-bold text-text-main mb-1">{title}</h3>
      <p className="text-xs text-text-subtle max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="brand" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
