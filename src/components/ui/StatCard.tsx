import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from './Card';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  variant?: 'default' | 'brand' | 'success' | 'warning';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  trend,
  icon,
  variant = 'default',
  className,
}: StatCardProps) {
  const valueColor = {
    default: 'text-text-main',
    brand: 'text-brand',
    success: 'text-status-success',
    warning: 'text-status-warning',
  }[variant];

  return (
    <Card className={cn('p-5 transition-all hover:shadow-cardHover', className)}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-subtle">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-btn bg-surface-subtle text-text-muted">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className={cn('text-2xl font-black tracking-tight', valueColor)}>
          {value}
        </span>
        {change && (
          <span
            className={cn(
              'inline-flex items-center text-[11px] font-bold px-1.5 py-0.5 rounded-full',
              trend === 'up'
                ? 'bg-status-successSubtle text-status-success'
                : trend === 'down'
                ? 'bg-status-dangerSubtle text-status-danger'
                : 'bg-surface-subtle text-text-subtle'
            )}
          >
            {trend === 'up' && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
            {trend === 'down' && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {trend === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-text-subtle leading-normal">{subtitle}</p>
      )}
    </Card>
  );
}
