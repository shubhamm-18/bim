'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { GruhnestIcon, ProjectsIcon } from '@/components/ui';
import { CheckCircle2 } from 'lucide-react';
import { projectsAnalyticsData } from '@/data/analytics.data';

export function ProjectsAnalytics() {
  const { budgetRunway, csatRatings } = projectsAnalyticsData;

  return (
    <div className="space-y-6 pt-6">
      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-border flex-1"></div>
        <div className="px-4 py-1.5 rounded-full bg-surface-subtle border border-border text-xs font-bold uppercase tracking-wider text-text-main flex items-center gap-2">
          <ProjectsIcon className="w-4 h-4" />
          <span>Portfolio Budget Runway & Developer Delivery Health</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="pb-3 border-b border-border-subtle mb-4">
            <h3 className="text-sm font-bold text-text-main">Budget Burn Runway & Spend Efficiency</h3>
            <p className="text-xs text-text-subtle">
              Total Mandate Budget: ₹20.5 Lakhs | Spend to Date: ₹8.5 Lakhs (41.5%)
            </p>
          </div>

          <div className="space-y-4">
            {budgetRunway.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-text-main">{item.name}</span>
                  <span className={`font-mono ${item.color.replace('bg-', 'text-')} font-bold`}>{item.spent}</span>
                </div>
                <div className="w-full bg-surface-subtle h-2.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: item.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Developer Health Score & Feedback Index</h3>
              <p className="text-xs text-text-subtle">CSAT rating and sign-off velocity across accounts</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {csatRatings.map((rating) => (
                <div key={rating.name} className="p-3 bg-surface-subtle rounded-btn border border-border">
                  <div className={`text-2xl font-black ${rating.color} font-mono`}>{rating.score}</div>
                  <span className="text-[10px] text-text-subtle font-semibold flex items-center justify-center gap-1 mt-1">
                    {rating.isGruhnest && <GruhnestIcon className="w-3 h-3" />}
                    {rating.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-surface-subtle rounded-btn border border-border text-xs text-text-muted font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-text-muted" />
            <span>100% of October milestone invoices disbursed with zero disputes.</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
