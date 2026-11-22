import React from 'react';

export interface ApprovalsIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
}

export function ApprovalsIcon({
  size,
  className = 'w-4 h-4',
  alt = 'Client Approvals',
  ...props
}: ApprovalsIconProps) {
  return (
    <img
      src="/icons/approvals-icon.png"
      alt={alt}
      className={`inline-block object-contain shrink-0 ${className}`}
      style={size ? { width: size, height: size, ...props.style } : props.style}
      {...props}
    />
  );
}
