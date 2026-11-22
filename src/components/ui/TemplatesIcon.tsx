import React from 'react';

export interface TemplatesIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function TemplatesIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Templates',
  ...props
}: TemplatesIconProps) {
  return (
    <img
      src="/icons/templates-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
