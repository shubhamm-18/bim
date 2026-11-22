import React from 'react';

export interface OverviewIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function OverviewIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Overview',
  ...props
}: OverviewIconProps) {
  return (
    <img
      src="/icons/overview-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
