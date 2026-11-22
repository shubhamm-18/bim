import React from 'react';

export interface AdvertisingIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function AdvertisingIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Advertising',
  ...props
}: AdvertisingIconProps) {
  return (
    <img
      src="/icons/advertising-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
