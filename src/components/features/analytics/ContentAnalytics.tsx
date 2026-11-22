'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Sparkles } from 'lucide-react';
import { ContentIcon } from '@/components/ui';
import { contentAnalyticsData } from '@/data/analytics.data';

export function ContentAnalytics() {
  const { formatSplit, turnaround, organicViews } = contentAnalyticsData;

  return (
    <div className="space-y-6 pt-6">
      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-border flex-1"></div>
        <div className="px-4 py-1.5 rounded-full bg-brand-subtle border border-brand/20 text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-2">
          <ContentIcon className="w-4 h-4" />
          <span>Content Production Velocity & Organic Reach Metrics</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Asset Format Split</h3>
              <p className="text-xs text-text-subtle">Production volume by media type</p>
            </div>

            <div className="space-y-3 text-xs">
              {formatSplit.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-text-main">{item.label}</span>
                    <span className={`font-mono ${item.textColor} font-bold`}>{item.percent}</span>
                  </div>
                  <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
                    <div className={`${item.barColor} h-full rounded-full`} style={{ width: item.percent }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-subtle">
            Video walkthroughs driving highest watch-time retention.
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Turnaround Cycle Time</h3>
              <div className="text-3xl font-black text-text-main mt-2">{turnaround.days}</div>
              <p className="text-xs text-text-subtle mt-1">{turnaround.subtitle}</p>
            </div>

            <div className="p-3 bg-surface-subtle rounded-btn border border-border text-xs">
              <span className="text-brand font-bold block">{turnaround.fastestLabel}</span>
              <span className="text-text-main block mt-0.5">{turnaround.fastestAsset}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-status-success font-semibold">
            {turnaround.revisionNote}
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Estimated Organic Video Views</h3>
              <div className="text-3xl font-black text-status-success mt-2">{organicViews.total}</div>
              <p className="text-xs text-text-subtle mt-1">{organicViews.subtitle}</p>
            </div>

            <div className="p-3 bg-status-successSubtle rounded-btn border border-status-success/20 text-xs text-status-success font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{organicViews.highlight}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-subtle">
            {organicViews.nextScheduled}
          </div>
        </Card>
      </div>
    </div>
  );
}
