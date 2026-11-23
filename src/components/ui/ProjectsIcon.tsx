import React from 'react';
import { LucideProps, FolderKanban } from 'lucide-react';

export interface ProjectsIconProps extends LucideProps {
  alt?: string;
}

export function ProjectsIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: ProjectsIconProps) {
  return (
    <FolderKanban
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Client Projects'}
      {...props}
    />
  );
}
