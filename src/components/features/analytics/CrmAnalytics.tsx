'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { CrmIcon } from '@/components/ui';
import { crmAnalyticsData } from '@/data/analytics.data';

export function CrmAnalytics() {
  const { funnelStages, speedToCallImpact } = crmAnalyticsData;

  const getStatusIcon = (status: 'success' | 'warning' | 'danger') => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'warning':
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  const getStatusTextColor = (_status: 'success' | 'warning' | 'danger') => {
    return 'text-text-main';
  };

  return (
    <div className="space-y-6 pt-6">
      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-border flex-1"></div>
        <div className="px-4 py-1.5 rounded-full bg-surface-subtle border border-border text-xs font-bold uppercase tracking-wider text-text-main flex items-center gap-2">
          <CrmIcon className="w-4 h-4" />
          <span>Lead Velocity & 6-Stage Conversion Funnel</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 6-Stage Statistical Funnel (7 Cols) */}
        <Card className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border-subtle">
              <div>
                <h3 className="text-sm font-bold text-text-main">Stage-by-Stage Attrition Funnel</h3>
                <p className="text-xs text-text-subtle">Cumulative retention probabilities across 511 total leads</p>
              </div>
              <Badge variant="neutral" className="font-mono font-bold">
                17.6% Visit→Closure
              </Badge>
            </div>

            <div className="space-y-3.5 mt-2">
              {funnelStages.map((st) => (
                <div key={st.step}>
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-text-main">{st.step}</span>
                    <span className={st.highlight ? 'font-mono font-bold text-text-main' : 'font-mono text-text-subtle'}>
                      {st.count}
                    </span>
                  </div>
                  <div className="w-full bg-surface-subtle h-6 rounded-btn overflow-hidden relative flex items-center">
                    <div className={`${st.color} h-full rounded-btn transition-all`} style={{ width: st.width }}></div>
                    {st.drop && (
                      <span className="absolute right-2 top-1 text-[10px] text-text-subtle font-mono">
                        {st.drop}
                      </span>
                    )}
                    {st.highlight && (
                      <span className="absolute right-2 top-1 text-[10px] text-text-main font-bold">
                        {st.highlight}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
            <span className="text-text-muted">Primary Conversion Choke Point:</span>
            <span className="font-semibold text-text-main bg-surface-subtle border border-border px-2 py-0.5 rounded-full text-[11px]">
              Contacted → Qualified (-49.5% Attrition)
            </span>
          </div>
        </Card>

        {/* Lead Velocity & Speed-to-Call (5 Cols) */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Speed-to-Call Response Impact</h3>
              <p className="text-xs text-text-subtle">Correlation between initial call speed and booking success</p>
            </div>

            <div className="space-y-3.5">
              {speedToCallImpact.map((item) => (
                <div key={item.label} className="p-3 bg-surface-subtle rounded-btn border border-border">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className={`${getStatusTextColor(item.status)} flex items-center gap-1.5`}>
                      {getStatusIcon(item.status)}
                      {item.label}
                    </span>
                    <span className="text-text-main font-mono font-bold">{item.rate}</span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-surface-subtle rounded-btn border border-border mt-4">
            <span className="text-xs font-bold text-text-main block">WhatsApp Automation Active</span>
            <p className="text-[11px] text-text-muted mt-0.5">
              Average automated brochure dispatch time: <strong>42 seconds</strong>.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
