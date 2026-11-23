import React from 'react';
import { LucideProps, Workflow } from 'lucide-react';

export interface CrmIconProps extends LucideProps {
  alt?: string;
}

export function CrmIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: CrmIconProps) {
  return (
    <Workflow
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Automation & CRM'}
      {...props}
    />
  );
}
