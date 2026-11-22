'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
        aria-label="Close navigation"
      />

      {/* Drawer */}
      <div className="relative z-10 w-72 bg-surface-card h-full shadow-2xl flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-text-subtle hover:text-text-main rounded-btn bg-surface-subtle z-20"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <Sidebar onItemClick={onClose} className="w-full border-r-0" />
      </div>
    </div>
  );
}
