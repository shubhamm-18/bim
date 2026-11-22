import React from 'react';

export interface GruhnestIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function GruhnestIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Gruhnest',
  ...props
}: GruhnestIconProps) {
  return (
    <img
      src="/icons/gruhnest-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
