'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Check, X, MessageSquare, Video, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ApprovalsIcon, AdvertisingIcon } from '@/components/ui';

export function ApprovalsView() {
  const { approvalItems, updateApprovalStatus } = useWorkspaceStore();

  const pendingItems = approvalItems.filter((i) => i.status === 'Pending');
  const pastItems = approvalItems.filter((i) => i.status !== 'Pending');

  const getKindIcon = (kind: string) => {
    switch (kind) {
      case 'Video Cut':
        return <Video className="w-4 h-4 text-text-muted" />;
      case 'Ad Creative':
        return <AdvertisingIcon className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4 text-text-muted" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center p-2 shadow-xs shrink-0">
          <ApprovalsIcon className="w-8 h-8" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-text-main">Approval Board</h1>
            {pendingItems.length > 0 && (
              <Badge variant="pending">{pendingItems.length} Awaiting Sign-off</Badge>
            )}
          </div>
          <p className="text-xs text-text-subtle mt-0.5">
            Review and approve production cuts, scripts, and ad creatives before client handoff.
          </p>
        </div>
      </div>

      {/* Pending Items Queue */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand mb-3 flex items-center gap-2">
          <span>Awaiting Review ({pendingItems.length})</span>
        </h3>

        {pendingItems.length === 0 ? (
          <Card className="text-center py-8 text-xs text-text-subtle">
            <ApprovalsIcon className="w-10 h-10 opacity-40 mx-auto mb-2 grayscale" />
            <span>All creative assets are currently approved!</span>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingItems.map((item) => (
              <Card
                key={item.id}
                className="border-2 border-brand/20 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {getKindIcon(item.kind)}
                      <span>{item.kind}</span>
                    </Badge>
                    <span className="text-xs text-text-subtle">
                      Submitted {formatDate(item.submittedAt)}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-text-main mt-3">{item.title}</h4>
                  <p className="text-xs text-text-muted mt-1">
                    Project: <b className="text-text-main font-semibold">{item.projectName}</b> • By{' '}
                    <span className="text-text-muted font-medium">{item.submittedBy}</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-text-muted">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{item.commentsCount} comments</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateApprovalStatus(item.id, 'Changes Requested')}
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Request Changes</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => updateApprovalStatus(item.id, 'Approved')}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed / Archived Approvals */}
      {pastItems.length > 0 && (
        <div className="pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-text-subtle mb-3">
            Recent Review History
          </h3>
          <Card className="divide-y divide-border-subtle p-0 overflow-hidden">
            {pastItems.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <h5 className="font-bold text-text-main">{item.title}</h5>
                  <span className="text-text-subtle">{item.projectName}</span>
                </div>
                <Badge variant={item.status === 'Approved' ? 'completed' : 'urgent'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
