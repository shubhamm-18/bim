import React from 'react';

export interface CompareIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function CompareIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Project Comparison',
  ...props
}: CompareIconProps) {
  return (
    <img
      src="/icons/compare-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
