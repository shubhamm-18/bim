'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { ClipboardCheck, Check, X, MessageSquare, Video, FileText, Megaphone } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function ApprovalsView() {
  const { approvalItems, updateApprovalStatus } = useWorkspaceStore();

  const pendingItems = approvalItems.filter((i) => i.status === 'Pending');
  const pastItems = approvalItems.filter((i) => i.status !== 'Pending');

  const getKindIcon = (kind: string) => {
    switch (kind) {
      case 'Video Cut':
        return <Video className="w-4 h-4 text-[#8b5cf6]" />;
      case 'Ad Creative':
        return <Megaphone className="w-4 h-4 text-[#ea580c]" />;
      default:
        return <FileText className="w-4 h-4 text-[#2563eb]" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#20222c]">Approval Board</h1>
        <p className="text-xs text-[#8e91a0]">
          Review and approve production cuts, scripts, and ad creatives before client handoff.
        </p>
      </div>

      {/* Pending Items Queue */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#7040cd] mb-3 flex items-center gap-2">
          <span>Awaiting Review ({pendingItems.length})</span>
        </h3>

        {pendingItems.length === 0 ? (
          <div className="p-8 bg-white rounded-2xl border border-[#e4e5ec] text-center text-xs text-[#8e91a0]">
            <ClipboardCheck className="w-8 h-8 text-[#d8d9e2] mx-auto mb-2" />
            <span>All creative assets are currently approved!</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white rounded-2xl border-2 border-[#7040cd]/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#efeafb] text-[#7040cd] text-xs font-semibold">
                      {getKindIcon(item.kind)}
                      <span>{item.kind}</span>
                    </span>
                    <span className="text-xs text-[#8e91a0]">Submitted {formatDate(item.submittedAt)}</span>
                  </div>

                  <h4 className="text-base font-bold text-[#20222c] mt-3">{item.title}</h4>
                  <p className="text-xs text-[#727583] mt-1">
                    Project: <b className="text-[#20222c] font-semibold">{item.projectName}</b> • By{' '}
                    <span className="text-[#535767] font-medium">{item.submittedBy}</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f0f1f5] flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-[#727583]">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{item.commentsCount} comments</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateApprovalStatus(item.id, 'Changes Requested')}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#dc2626] bg-[#fee2e2] hover:bg-[#fecaca] rounded-lg transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Request Changes</span>
                    </button>
                    <button
                      onClick={() => updateApprovalStatus(item.id, 'Approved')}
                      className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg shadow-sm transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed / Archived Approvals */}
      {pastItems.length > 0 && (
        <div className="pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8e91a0] mb-3">
            Recent Review History
          </h3>
          <div className="bg-white rounded-2xl border border-[#e4e5ec] divide-y divide-[#f0f1f5]">
            {pastItems.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-[#20222c]">{item.title}</h5>
                  <span className="text-[#8e91a0]">{item.projectName}</span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-bold ${
                    item.status === 'Approved'
                      ? 'bg-[#d1fae5] text-[#059669]'
                      : 'bg-[#fee2e2] text-[#dc2626]'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
