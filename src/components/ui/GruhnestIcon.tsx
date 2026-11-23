import React from 'react';
import { LucideProps, Building2 } from 'lucide-react';

export interface GruhnestIconProps extends LucideProps {
  alt?: string;
}

export function GruhnestIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: GruhnestIconProps) {
  return (
    <Building2
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Gruhnest'}
      {...props}
    />
  );
}
