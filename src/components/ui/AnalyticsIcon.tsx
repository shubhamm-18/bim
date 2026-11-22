import React from 'react';

export interface AnalyticsIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function AnalyticsIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Analytics & Intelligence',
  ...props
}: AnalyticsIconProps) {
  return (
    <img
      src="/icons/analytics-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
