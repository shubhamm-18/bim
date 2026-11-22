'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { AlertTriangle, MapPin } from 'lucide-react';
import { AdvertisingIcon } from '@/components/ui';
import { advertisingAnalyticsData } from '@/data/analytics.data';

export function AdvertisingAnalytics() {
  const {
    channelDistribution,
    cplFatigueCurve,
    topBuyerGeographies,
    summary,
    demographic,
    creativeFatigueNotice,
  } = advertisingAnalyticsData;

  return (
    <div className="space-y-6 pt-6">
      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-border flex-1"></div>
        <div className="px-4 py-1.5 rounded-full bg-status-warningSubtle border border-status-warning/20 text-xs font-bold uppercase tracking-wider text-status-warning flex items-center gap-2">
          <AdvertisingIcon className="w-4 h-4" />
          <span>Paid Ad Campaign Analytics & Statistical Attribution</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Channel Budget Distribution */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Channel Budget Share vs. Leads</h3>
              <p className="text-xs text-text-subtle">Meta Ads vs. Google Search vs. LinkedIn</p>
            </div>

            <div className="space-y-4">
              {channelDistribution.map((ch) => (
                <div key={ch.channel}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className={ch.color}>{ch.channel}</span>
                    <span className="text-text-main font-mono">{ch.spendLabel}</span>
                  </div>
                  <div className="w-full bg-surface-subtle h-3 rounded-full overflow-hidden">
                    <div className={`${ch.barColor} h-full rounded-full`} style={{ width: ch.percentage }}></div>
                  </div>
                  <span className="text-[10px] text-text-subtle mt-1 block">{ch.leadsLabel}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-muted">
            {summary}
          </div>
        </Card>

        {/* CPL Decay & Saturation Curve */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">30-Day CPL Fatigue Curve</h3>
              <p className="text-xs text-text-subtle">Audience saturation tracking over time</p>
            </div>

            <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-border-subtle pb-2">
              {cplFatigueCurve.map((curve) => (
                <div
                  key={curve.range}
                  className={`w-12 bg-surface-subtle rounded-t-lg flex flex-col items-center justify-end ${curve.wrapHeight} relative group`}
                >
                  <span className={`text-[10px] font-mono font-bold ${curve.textColor} mb-1`}>
                    {curve.cpl}
                  </span>
                  <div className={`w-full ${curve.barColor} rounded-t-lg ${curve.barHeight}`}></div>
                  <span className="absolute -bottom-5 text-[9px] text-text-subtle font-medium">
                    {curve.range}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-status-dangerSubtle text-status-danger rounded-btn text-xs font-semibold mt-6">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{creativeFatigueNotice}</span>
          </div>
        </Card>

        {/* Geographic Density & Buyer Demographics */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Top Buyer Geographies</h3>
              <p className="text-xs text-text-subtle">Location density of verified inquiries</p>
            </div>

            <div className="space-y-3 text-xs">
              {topBuyerGeographies.map((geo) => (
                <div key={geo.name} className="flex items-center justify-between p-2.5 bg-surface-subtle rounded-btn">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${geo.iconColor}`} />
                    <span className="font-medium text-text-main">{geo.name}</span>
                  </div>
                  <strong className="font-mono text-text-main">{geo.share}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-subtle flex justify-between">
            <span>Primary Demographic:</span>
            <strong className="text-text-main">{demographic}</strong>
          </div>
        </Card>
      </div>
    </div>
  );
}
