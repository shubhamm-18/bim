'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { overviewAnalyticsData } from '@/data/analytics.data';

export function ProjectMandateEfficiency() {
  const { mandates, growthRecommendation } = overviewAnalyticsData;

  return (
    <Card className="lg:col-span-4 flex flex-col justify-between">
      <div>
        <div className="pb-3 border-b border-border-subtle mb-4">
          <h3 className="text-sm font-bold text-text-main">Project Mandate Efficiency</h3>
          <p className="text-xs text-text-subtle">Ad Spend vs. Revenue Pipeline Multiple</p>
        </div>

        <div className="space-y-4">
          {mandates.map((m) => (
            <div key={m.name}>
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span className="text-text-main">{m.name}</span>
                <span className="text-status-success font-mono font-bold">{m.roas}</span>
              </div>
              <div className="w-full bg-surface-subtle h-2.5 rounded-full overflow-hidden">
                <div className={`${m.barColor} h-full rounded-full`} style={{ width: m.width }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-text-subtle mt-1 font-medium">
                <span>{m.spend}</span>
                <span>{m.pipeline}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-brand-subtle rounded-btn border border-brand/20 mt-4">
        <span className="text-[11px] text-brand font-bold block">💡 Growth Recommendation:</span>
        <p className="text-[11px] text-text-muted mt-0.5">
          {growthRecommendation}
        </p>
      </div>
    </Card>
  );
}
