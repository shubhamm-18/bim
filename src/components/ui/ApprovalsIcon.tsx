import React from 'react';
import { LucideProps, ClipboardCheck } from 'lucide-react';

export interface ApprovalsIconProps extends LucideProps {
  alt?: string;
}

export function ApprovalsIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: ApprovalsIconProps) {
  return (
    <ClipboardCheck
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Approval Board'}
      {...props}
    />
  );
}
