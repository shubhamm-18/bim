import React from 'react';

export interface PaymentsIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function PaymentsIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Payments & Billing',
  ...props
}: PaymentsIconProps) {
  return (
    <img
      src="/icons/payments-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
