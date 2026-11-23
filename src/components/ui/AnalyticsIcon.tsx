import React from 'react';
import { LucideProps, TrendingUp } from 'lucide-react';

export interface AnalyticsIconProps extends LucideProps {
  alt?: string;
}

export function AnalyticsIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: AnalyticsIconProps) {
  return (
    <TrendingUp
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Analytics & Intelligence'}
      {...props}
    />
  );
}
