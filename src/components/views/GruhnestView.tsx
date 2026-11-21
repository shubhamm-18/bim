'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Building2, Home, CheckCircle, Clock, Video, FileText, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function GruhnestView() {
  const { propertyProfiles } = useWorkspaceStore();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#20222c]">Gruhnest Property Media & Listings</h1>
        <p className="text-xs text-[#8e91a0]">
          Standardized real estate property profiles, sample-flat media assets, and commission rates.
        </p>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {propertyProfiles.map((prop) => {
          const estimatedCommission = (prop.expectedDealValue * prop.commissionRatePercent) / 100;
          return (
            <div
              key={prop.id}
              className="p-5 bg-white rounded-2xl border border-[#e4e5ec] shadow-sm hover:border-[#059669]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669]">
                      {prop.developer}
                    </span>
                    <h3 className="text-base font-bold text-[#20222c] mt-0.5">{prop.projectName}</h3>
                    <p className="text-xs text-[#727583]">{prop.city}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0]">
                    {prop.sampleFlatStatus}
                  </span>
                </div>

                {/* Property Facts */}
                <div className="my-4 p-3.5 bg-[#f7f8fa] rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#727583]">Possession:</span>
                    <span className="font-semibold text-[#20222c]">{prop.towerPossession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#727583]">Inventory:</span>
                    <span className="font-semibold text-[#20222c]">
                      {prop.availableInventory} / {prop.totalInventory} units available
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#727583]">Starting Price:</span>
                    <span className="font-bold text-[#7040cd]">{prop.startingPrice}</span>
                  </div>
                </div>

                {/* Media Assets Status */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#fafafc] border border-[#f0f1f5]">
                    <span className="flex items-center gap-1.5 text-[#535767]">
                      <Video className="w-3.5 h-3.5 text-[#7040cd]" />
                      <span>Video Walkthrough</span>
                    </span>
                    <span className="font-bold text-[10px] text-[#059669]">
                      {prop.walkthroughAssetStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#fafafc] border border-[#f0f1f5]">
                    <span className="flex items-center gap-1.5 text-[#535767]">
                      <FileText className="w-3.5 h-3.5 text-[#3b82f6]" />
                      <span>Location Explainer</span>
                    </span>
                    <span className="font-bold text-[10px] text-[#f59e0b]">
                      {prop.explainerAssetStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Commission Calculator Footer */}
              <div className="pt-4 mt-4 border-t border-[#f0f1f5] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8e91a0] block">
                    Commission ({prop.commissionRatePercent}%)
                  </span>
                  <strong className="text-xs font-bold text-[#059669]">
                    {formatCurrency(estimatedCommission)} / deal
                  </strong>
                </div>
                <button className="text-xs font-semibold text-[#7040cd] hover:underline">
                  View Media Assets →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
