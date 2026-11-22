import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full bg-surface-input border border-border rounded-input text-xs text-text-main px-3.5 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all placeholder:text-text-subtle',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
