import React from 'react';
import { LucideProps, GitCompare } from 'lucide-react';

export interface CompareIconProps extends LucideProps {
  alt?: string;
}

export function CompareIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: CompareIconProps) {
  return (
    <GitCompare
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Project Comparison'}
      {...props}
    />
  );
}
