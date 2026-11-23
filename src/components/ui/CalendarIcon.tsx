import React from 'react';
import { LucideProps, CalendarDays } from 'lucide-react';

export interface CalendarIconProps extends LucideProps {
  alt?: string;
}

export function CalendarIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: CalendarIconProps) {
  return (
    <CalendarDays
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Tasks & Calendar'}
      {...props}
    />
  );
}
