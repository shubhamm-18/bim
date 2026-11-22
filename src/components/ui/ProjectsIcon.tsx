import React from 'react';

export interface ProjectsIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function ProjectsIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Client Projects',
  ...props
}: ProjectsIconProps) {
  return (
    <img
      src="/icons/projects-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
