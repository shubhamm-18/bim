'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brand' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'brand', size = 'md', children, ...props }, ref) => {
    const variantStyles = {
      brand: 'bg-brand hover:bg-brand-hover text-brand-fg shadow-sm font-semibold',
      secondary: 'bg-surface-subtle hover:bg-surface-hover text-text-main border border-border font-semibold',
      outline: 'bg-transparent hover:bg-brand-subtle text-text-main border border-border hover:border-brand/40 hover:text-brand font-semibold',
      ghost: 'bg-transparent hover:bg-surface-hover text-text-muted hover:text-text-main font-medium',
      danger: 'bg-status-dangerSubtle hover:bg-status-danger text-status-danger hover:text-white font-semibold transition-colors',
      success: 'bg-status-successSubtle hover:bg-status-success text-status-success hover:text-white font-semibold transition-colors',
    };

    const sizeStyles = {
      sm: 'px-2.5 py-1 text-xs rounded-btn gap-1.5',
      md: 'px-4 py-2 text-xs rounded-btn gap-2',
      lg: 'px-5 py-2.5 text-sm rounded-btn gap-2.5',
      icon: 'p-2 rounded-btn',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center transition-all select-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
