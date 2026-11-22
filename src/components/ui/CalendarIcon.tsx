import React from 'react';

export interface CalendarIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function CalendarIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Tasks & Calendar',
  ...props
}: CalendarIconProps) {
  return (
    <img
      src="/icons/calendar-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
