'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { overviewAnalyticsData } from '@/data/analytics.data';

interface OverviewMacroMetricsProps {
  blendedCpl: number;
}

export function OverviewMacroMetrics({ blendedCpl }: OverviewMacroMetricsProps) {
  const { pipeline, cpl, visitConversion, q4Retainers } = overviewAnalyticsData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Weighted Pipeline Value */}
      <Card className="hover:border-border-hover transition-all">
        <div className="flex items-center justify-between text-xs text-text-subtle font-semibold">
          <span>Weighted Pipeline Value</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-subtle text-text-main border border-border font-bold text-[10px]">
            {pipeline.change}
          </span>
        </div>
        <div className="text-2xl font-black text-text-main mt-2">{pipeline.value}</div>
        <div className="flex items-center justify-between mt-2 text-[11px] text-text-muted">
          <span>95% CI Range</span>
          <span className="font-mono font-bold text-text-main">{pipeline.range}</span>
        </div>
        <div className="w-full bg-surface-subtle h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="bg-zinc-400 h-full rounded-full" style={{ width: pipeline.fillWidth }}></div>
        </div>
      </Card>

      {/* Blended Portfolio CPL */}
      <Card className="hover:border-border-hover transition-all">
        <div className="flex items-center justify-between text-xs text-text-subtle font-semibold">
          <span>Blended Portfolio CPL</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-subtle text-text-main border border-border font-bold text-[10px]">
            -14.2% Lower
          </span>
        </div>
        <div className="text-2xl font-black text-text-main mt-2">
          ₹{blendedCpl.toLocaleString('en-IN')}
        </div>
        <div className="flex items-center justify-between mt-2 text-[11px] text-text-muted">
          <span>Market Benchmark</span>
          <span className="font-mono text-text-subtle">{cpl.benchmark}</span>
        </div>
        <div className="w-full bg-surface-subtle h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="bg-zinc-400 h-full rounded-full" style={{ width: '85%' }}></div>
        </div>
      </Card>

      {/* Site Visit Conversion Ratio */}
      <Card className="hover:border-border-hover transition-all">
        <div className="flex items-center justify-between text-xs text-text-subtle font-semibold">
          <span>Site Visit Conversion Ratio</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-subtle text-text-main border border-border font-bold text-[10px]">
            Top Decile
          </span>
        </div>
        <div className="text-2xl font-black text-text-main mt-2">{visitConversion.rate}</div>
        <div className="flex items-center justify-between mt-2 text-[11px] text-text-muted">
          <span>Verified Visits</span>
          <span className="font-mono font-bold text-text-main">{visitConversion.booked}</span>
        </div>
        <div className="w-full bg-surface-subtle h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="bg-zinc-400 h-full rounded-full" style={{ width: visitConversion.fillWidth }}></div>
        </div>
      </Card>

      {/* Projected Q4 Retainers */}
      <Card className="hover:border-border-hover transition-all">
        <div className="flex items-center justify-between text-xs text-text-subtle font-semibold">
          <span>Projected Q4 Retainers</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-subtle text-text-main border border-border font-bold text-[10px]">
            P90 Forecast
          </span>
        </div>
        <div className="text-2xl font-black text-text-main mt-2">{q4Retainers.amount}</div>
        <div className="flex items-center justify-between mt-2 text-[11px] text-text-muted">
          <span>Commission Yield</span>
          <span className="font-mono font-bold text-text-main">{q4Retainers.commission}</span>
        </div>
        <div className="w-full bg-surface-subtle h-1.5 rounded-full mt-3 overflow-hidden">
          <div className="bg-zinc-400 h-full rounded-full" style={{ width: q4Retainers.fillWidth }}></div>
        </div>
      </Card>
    </div>
  );
}
