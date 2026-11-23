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
      brand: 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm font-semibold',
      secondary: 'bg-surface-subtle hover:bg-surface-hover text-text-main border border-border font-semibold',
      outline: 'bg-transparent hover:bg-surface-hover text-text-main border border-border hover:border-zinc-400 font-semibold',
      ghost: 'bg-transparent hover:bg-surface-hover text-text-muted hover:text-text-main font-medium',
      danger: 'bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-colors',
      success: 'bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-colors',
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
