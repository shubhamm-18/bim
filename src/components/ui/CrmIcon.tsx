import React from 'react';

export interface CrmIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function CrmIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Automation & CRM',
  ...props
}: CrmIconProps) {
  return (
    <img
      src="/icons/crm-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
