'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { GruhnestIcon } from '@/components/ui';
import { gruhnestAnalyticsData } from '@/data/analytics.data';

export function GruhnestAnalytics() {
  const { inventoryBalance, readiness, dealPool } = gruhnestAnalyticsData;

  return (
    <div className="space-y-6 pt-6">
      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-border flex-1"></div>
        <div className="px-4 py-1.5 rounded-full bg-surface-subtle border border-border text-xs font-bold uppercase tracking-wider text-text-main flex items-center gap-2">
          <GruhnestIcon className="w-4 h-4" />
          <span>Gruhnest Inventory Turnover & Media Asset Yield</span>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Marketplace Inventory Balance</h3>
              <div className="text-3xl font-black text-text-main mt-2">300 Units</div>
              <p className="text-xs text-text-muted font-medium mt-1">115 Units Remaining Available (38.3%)</p>
            </div>

            <div className="space-y-2 text-xs">
              {inventoryBalance.map((item, idx) => (
                <div
                  key={item.name}
                  className={`flex justify-between ${idx < inventoryBalance.length - 1 ? 'border-b border-border-subtle py-1.5' : 'py-1.5'}`}
                >
                  <span className="text-text-muted">{item.name}</span>
                  <span className="font-mono font-bold text-text-main">{item.available}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-subtle">
            Inventory turnover index: 61.7% occupied across active mandates.
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Media Asset Production Readiness</h3>
              <div className="text-3xl font-black text-text-main mt-2">{readiness.percent}</div>
              <p className="text-xs text-text-muted font-medium mt-1">4K Walkthroughs & Explainer Films</p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1 font-semibold">
                  <span>Sample Flat 4K Walkthroughs</span>
                  <span className="text-text-main font-bold">{readiness.sampleFlatDelivered}</span>
                </div>
                <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
                  <div className="bg-zinc-400 h-full rounded-full" style={{ width: readiness.sampleFlatWidth }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1 font-semibold">
                  <span>Location Infrastructure Explainers</span>
                  <span className="text-text-muted font-bold">{readiness.locationExplainerScheduled}</span>
                </div>
                <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden">
                  <div className="bg-zinc-300 h-full rounded-full" style={{ width: readiness.locationExplainerWidth }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-subtle">
            Drone shoot permits approved for highway flyover visuals.
          </div>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-border-subtle mb-4">
              <h3 className="text-sm font-bold text-text-main">Expected Deal Commission Pool</h3>
              <div className="text-3xl font-black text-text-main mt-2">{dealPool.amount}</div>
              <p className="text-xs text-text-subtle mt-1">{dealPool.subtext}</p>
            </div>

            <div className="p-3 bg-surface-subtle rounded-btn border border-border text-xs">
              <span className="text-text-muted block font-medium">Fastest Moving Category:</span>
              <strong className="text-text-main block mt-0.5">{dealPool.fastestCategory}</strong>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-muted font-semibold">
            {dealPool.exclusivityNote}
          </div>
        </Card>
      </div>
    </div>
  );
}
