import React from 'react';

export interface ContentIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function ContentIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Content Studio',
  ...props
}: ContentIconProps) {
  return (
    <img
      src="/icons/content-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
