import React from 'react';
import { LucideProps, LayoutDashboard } from 'lucide-react';

export interface OverviewIconProps extends LucideProps {
  alt?: string;
}

export function OverviewIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: OverviewIconProps) {
  return (
    <LayoutDashboard
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Overview'}
      {...props}
    />
  );
}
