'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { overviewAnalyticsData } from '@/data/analytics.data';

export function SpendVelocityChart() {
  const { gridlines } = overviewAnalyticsData;

  return (
    <Card className="lg:col-span-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-subtle">
          <div>
            <h3 className="text-sm font-bold text-text-main">
              Cumulative Lead Volume vs. Ad Spend (6-Week Velocity)
            </h3>
            <p className="text-xs text-text-subtle">
              Multi-series growth curves across active developer mandates
            </p>
          </div>
          <Badge variant="outline" className="font-mono font-bold">
            r = 0.89 Correlation
          </Badge>
        </div>

        <div className="h-56 relative w-full flex items-end">
          {/* Gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-text-subtle/60 font-mono">
            {gridlines.map((gl) => (
              <div key={gl.spend} className="border-b border-border-subtle flex justify-between">
                <span>{gl.spend}</span>
                <span>{gl.leads}</span>
              </div>
            ))}
          </div>

          {/* SVG Area Chart */}
          <svg className="w-full h-44 overflow-visible relative z-10" viewBox="0 0 600 180">
            <defs>
              <linearGradient id="brandAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18181b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#18181b" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="infoAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#71717a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#71717a" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Ad Spend Polygon */}
            <polygon
              points="40,140 140,110 240,80 340,95 440,40 540,55 540,180 40,180"
              fill="url(#brandAreaGrad)"
            />
            <polyline
              points="40,140 140,110 240,80 340,95 440,40 540,55"
              fill="none"
              stroke="#71717a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Leads Acquired Polygon */}
            <polygon
              points="40,155 140,130 240,105 340,120 440,65 540,75 540,180 40,180"
              fill="url(#infoAreaGrad)"
            />
            <polyline
              points="40,155 140,130 240,105 340,120 440,65 540,75"
              fill="none"
              stroke="#a1a1aa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />

            {/* Nodes */}
            <circle cx="40" cy="140" r="4.5" fill="#71717a" stroke="#fff" strokeWidth="2" />
            <circle cx="140" cy="110" r="4.5" fill="#71717a" stroke="#fff" strokeWidth="2" />
            <circle cx="240" cy="80" r="4.5" fill="#71717a" stroke="#fff" strokeWidth="2" />
            <circle cx="340" cy="95" r="4.5" fill="#71717a" stroke="#fff" strokeWidth="2" />
            <circle cx="440" cy="40" r="5.5" fill="#71717a" stroke="#fff" strokeWidth="2" />
            <circle cx="540" cy="55" r="4.5" fill="#71717a" stroke="#fff" strokeWidth="2" />
          </svg>
        </div>

        <div className="flex justify-between text-[11px] font-mono text-text-subtle pt-3 border-t border-border-subtle">
          <span>Oct W1</span>
          <span>Oct W2</span>
          <span>Oct W3</span>
          <span>Oct W4</span>
          <span>Nov W1</span>
          <span>Current Week</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-3 mt-3 border-t border-border-subtle">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-400"></span> Ad Spend (₹)
          </span>
          <span className="flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300"></span> Leads Generated
          </span>
        </div>
        <span className="text-text-muted font-semibold text-xs">
          Peak Efficiency: Week 1 Nov (₹980 CPL)
        </span>
      </div>
    </Card>
  );
}
