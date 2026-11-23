import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'brand'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral'
    | 'outline'
    | 'urgent'
    | 'pending'
    | 'completing'
    | 'completed';
}

export function Badge({
  className,
  variant,
  children,
  ...props
}: BadgeProps) {
  // Auto-resolve semantic variant based on text if variant not explicitly provided or generic
  let resolvedVariant = variant;
  if (!resolvedVariant) {
    const text = typeof children === 'string' ? children.toLowerCase().trim() : '';
    if (text.includes('urgent')) {
      resolvedVariant = 'urgent';
    } else if (text.includes('pending') || text.includes('awaiting')) {
      resolvedVariant = 'pending';
    } else if (
      text.includes('complet') ||
      text.includes('done') ||
      text.includes('approved') ||
      text.includes('delivered')
    ) {
      resolvedVariant = 'completed';
    } else {
      resolvedVariant = 'neutral';
    }
  }

  const variantStyles: Record<string, string> = {
    brand: 'bg-zinc-900 text-white shadow-xs',
    urgent: 'bg-red-900 text-white border border-red-800 shadow-xs font-bold',
    danger: 'bg-red-900 text-white border border-red-800 shadow-xs font-bold',
    pending: 'bg-amber-500/10 text-amber-800 border border-amber-500/20 font-semibold',
    warning: 'bg-amber-500/10 text-amber-800 border border-amber-500/20 font-semibold',
    completing: 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-semibold',
    completed: 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-semibold',
    success: 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-semibold',
    info: 'bg-zinc-100 text-zinc-800 border border-zinc-200',
    neutral: 'bg-zinc-100 text-zinc-600 border border-zinc-200',
    outline: 'bg-transparent text-zinc-700 border border-zinc-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-badge text-[10px] font-bold uppercase tracking-wider transition-colors',
        variantStyles[resolvedVariant] || variantStyles.neutral,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
