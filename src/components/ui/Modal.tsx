'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  maxWidth = 'max-w-lg',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in">
      <div
        className={cn(
          'w-full bg-surface-card rounded-card shadow-2xl border border-border overflow-hidden animate-scale-in',
          maxWidth
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-brand-subtle text-brand rounded-btn flex items-center justify-center">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-text-main">{title}</h3>
              {description && (
                <p className="text-xs text-text-subtle mt-0.5">{description}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-text-subtle hover:text-text-main hover:bg-surface-subtle rounded-btn transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {children}
      </div>
    </div>
  );
}
