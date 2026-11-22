import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'outline';
}

export function Badge({
  className,
  variant = 'neutral',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    brand: 'bg-brand-subtle text-brand',
    success: 'bg-status-successSubtle text-status-success',
    warning: 'bg-status-warningSubtle text-status-warning',
    danger: 'bg-status-dangerSubtle text-status-danger',
    info: 'bg-status-infoSubtle text-status-info',
    neutral: 'bg-surface-subtle text-text-muted border border-border-subtle',
    outline: 'bg-transparent text-text-muted border border-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-badge text-[10px] font-bold uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
