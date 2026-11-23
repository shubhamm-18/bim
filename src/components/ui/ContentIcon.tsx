import React from 'react';
import { LucideProps, Clapperboard } from 'lucide-react';

export interface ContentIconProps extends LucideProps {
  alt?: string;
}

export function ContentIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: ContentIconProps) {
  return (
    <Clapperboard
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Content Studio'}
      {...props}
    />
  );
}
