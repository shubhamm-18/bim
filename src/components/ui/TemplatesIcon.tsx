import React from 'react';
import { LucideProps, Layers } from 'lucide-react';

export interface TemplatesIconProps extends LucideProps {
  alt?: string;
}

export function TemplatesIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: TemplatesIconProps) {
  return (
    <Layers
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Templates'}
      {...props}
    />
  );
}
