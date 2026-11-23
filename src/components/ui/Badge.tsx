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
    brand: 'bg-zinc-900 text-white',
    success: 'bg-zinc-100 text-zinc-900 border border-zinc-200',
    warning: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
    danger: 'bg-zinc-900 text-white',
    info: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
    neutral: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
    outline: 'bg-transparent text-zinc-700 border border-zinc-300',
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
