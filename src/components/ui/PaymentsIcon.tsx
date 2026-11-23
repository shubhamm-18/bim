import React from 'react';
import { LucideProps, CreditCard } from 'lucide-react';

export interface PaymentsIconProps extends LucideProps {
  alt?: string;
}

export function PaymentsIcon({
  className = 'w-5 h-5',
  strokeWidth = 1.8,
  alt,
  ...props
}: PaymentsIconProps) {
  return (
    <CreditCard
      className={className}
      strokeWidth={strokeWidth}
      aria-label={alt || 'Payments'}
      {...props}
    />
  );
}
