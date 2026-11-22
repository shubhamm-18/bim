'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CalendarDays, Zap } from 'lucide-react';
import { calendarAnalyticsData } from '@/data/analytics.data';

export function CalendarAnalytics() {
  const { sla, workloads, velocity } = calendarAnalyticsData;

  return (
    <div className="space-y-6 pt-6">
      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-border flex-1"></div>
        <div className="px-4 py-1.5 rounded-full bg-status-infoSubtle border border-status-info/20 text-xs font-bold uppercase tracking-wider text-status-info flex items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Team Throughput & SLA Execution Velocity</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">On-Time SLA Completion</h3>
              <div className="text-3xl font-black text-status-success mt-2">{sla.rate}</div>
              <p className="text-xs text-text-subtle mt-1">{sla.detail}</p>
            </div>
            <div className="w-full bg-surface-subtle h-3 rounded-full overflow-hidden">
              <div className="bg-status-success h-full rounded-full" style={{ width: sla.rate }}></div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-subtle">
            {sla.benchmark}
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Role Workload Distribution</h3>
              <p className="text-xs text-text-subtle">Deliverables assigned by role</p>
            </div>
            <div className="space-y-2 text-xs">
              {workloads.map((item, idx) => (
                <div
                  key={item.role}
                  className={`flex justify-between ${idx < workloads.length - 1 ? 'border-b border-border-subtle pb-1.5' : 'pb-1'}`}
                >
                  <span className="text-text-muted">{item.role}</span>
                  <strong className="font-mono text-text-main">{item.count}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-subtle">
            Workload evenly distributed with zero bottleneck alerts.
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Resolution Velocity</h3>
              <div className="text-3xl font-black text-status-info mt-2">{velocity.days}</div>
              <p className="text-xs text-text-subtle mt-1">{velocity.detail}</p>
            </div>

            <div className="p-3 bg-status-infoSubtle rounded-btn border border-status-info/20 text-xs text-status-info flex items-center gap-2">
              <Zap className="w-4 h-4 shrink-0" />
              <span>{velocity.note}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-status-success font-semibold">
            {velocity.progress}
          </div>
        </Card>
      </div>
    </div>
  );
}
