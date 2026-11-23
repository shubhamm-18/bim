import React from 'react';
import { LucideProps, Megaphone } from 'lucide-react';

export interface AdvertisingIconProps extends LucideProps {
  alt?: string;
}

export function AdvertisingIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: AdvertisingIconProps) {
  return (
    <Megaphone
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Advertising'}
      {...props}
    />
  );
}
