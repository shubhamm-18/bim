'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { SocialDeliverableItem } from '@/data';
import { Button } from '@/components/ui/Button';

interface ComplaintsModalProps {
  clientName: string | null;
  complaints: SocialDeliverableItem[];
  onClose: () => void;
  onResolve: (id: string) => void;
  onFilterToTable: (clientName: string) => void;
}

export function ComplaintsModal({
  clientName,
  complaints,
  onClose,
  onResolve,
  onFilterToTable,
}: ComplaintsModalProps) {
  if (!clientName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-border rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-3">
          <div className="flex items-start gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 text-red-900 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-text-main">
                Open Complaints — {clientName}
              </h3>
              <p className="text-xs text-text-muted mt-0.5">
                Review client complaints, PM follow-up status, and mark resolved once fixed.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-btn border border-border text-text-muted hover:text-text-main cursor-pointer"
            aria-label="Close complaints modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {complaints.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-surface-subtle border border-border text-xs text-text-muted space-y-1.5">
            <CheckCircle2 className="w-6 h-6 text-[#1D563B] mx-auto" />
            <p className="font-bold text-text-main">All complaints resolved!</p>
            <p>No open complaints remain for {clientName}.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl border border-border bg-surface-subtle space-y-2.5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-bold text-text-main">{c.title}</div>
                    <div className="text-[11px] text-text-muted mt-0.5">
                      {c.project} • Assignee: <strong>{c.assignee}</strong> • Stage:{' '}
                      <strong>{c.stage}</strong> • Feedback: <strong>{c.clientFeedback}/5</strong>
                    </div>
                  </div>
                  <Button size="sm" variant="brand" onClick={() => onResolve(c.id)}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Resolved</span>
                  </Button>
                </div>

                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-900">
                  Complaint: {c.openComplaint}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-text-muted">
                  <span>
                    <strong>PM Follow-up:</strong> {c.pmFollowUp}
                  </span>
                  <span>Last Feedback: {c.lastFeedbackDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-border-subtle flex justify-between items-center text-xs">
          <button
            type="button"
            onClick={() => onFilterToTable(clientName)}
            className="font-semibold text-brand hover:underline cursor-pointer"
          >
            Filter Calendar Table to These Complaints →
          </button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
