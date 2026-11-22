'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'pills' | 'underline';
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'pills',
}: TabsProps) {
  if (variant === 'underline') {
    return (
      <div className={cn('flex items-center gap-6 border-b border-border', className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'flex items-center gap-2 py-3 text-xs font-semibold border-b-2 transition-all relative',
                isActive
                  ? 'border-brand text-brand'
                  : 'border-transparent text-text-muted hover:text-text-main'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <Badge variant={isActive ? 'brand' : 'neutral'}>{tab.count}</Badge>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-1.5 p-1 bg-surface-subtle border border-border rounded-btn', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-btn text-xs font-semibold transition-all select-none',
              isActive
                ? 'bg-surface-card text-brand shadow-sm'
                : 'text-text-muted hover:text-text-main'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <Badge variant={isActive ? 'brand' : 'neutral'}>{tab.count}</Badge>
            )}
          </button>
        );
      })}
    </div>
  );
}
