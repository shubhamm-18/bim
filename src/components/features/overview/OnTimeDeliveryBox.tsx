'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { teamDeliveryRecords } from '@/data';
import { NavView, Task } from '@/types';

interface OnTimeDeliveryBoxProps {
  tasks: Task[];
  onNavigate: (view: NavView) => void;
}

export function OnTimeDeliveryBox({ tasks, onNavigate }: OnTimeDeliveryBoxProps) {
  const totalDue = teamDeliveryRecords.reduce((s, r) => s + r.assigned, 0);
  const deliveredOnTime = teamDeliveryRecords.reduce((s, r) => s + r.onTime, 0);
  const pendingOverdue = teamDeliveryRecords.reduce((s, r) => s + r.late, 0);
  const onTimePct = totalDue > 0 ? Math.round((deliveredOnTime / totalDue) * 100) : 0;

  const allPendingTasks = tasks.filter((t) => t.status !== 'Done');
  const visiblePending = allPendingTasks.slice(0, 4);

  return (
    <Card className="lg:col-span-6 p-5 flex flex-col justify-between space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </span>
          <h2 className="text-base font-bold text-text-main">Task On-Time Delivery Rate</h2>
        </div>
        <Link
          href="/calendar"
          onClick={() => onNavigate('calendar')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          <span>Tasks &amp; Calendar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="p-3.5 rounded-xl bg-surface-subtle border border-border-subtle flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-text-main tabular-nums">{onTimePct}%</span>
            <span className="text-xs font-semibold text-[#1D563B]">
              {deliveredOnTime} on time ÷ {totalDue} total due
            </span>
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">
            On-time % = items delivered on time ÷ total items due in that period ({pendingOverdue} pending overdue included in denominator).
          </p>
        </div>
        <Badge variant="pending">{pendingOverdue} Pending Overdue</Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">
            Pending Tasks
          </span>
          <span className="text-xs font-bold text-text-main">{allPendingTasks.length} Pending</span>
        </div>
        <div className="divide-y divide-border-subtle border border-border-subtle rounded-xl overflow-hidden bg-white">
          {visiblePending.map((task) => (
            <div key={task.id} className="px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs">
              <div className="min-w-0">
                <div className="font-semibold text-text-main truncate">{task.title}</div>
                <div className="text-[10px] text-text-subtle mt-0.5">
                  {task.projectName} · Due {task.due}
                </div>
              </div>
              <Badge variant="pending" className="shrink-0">
                Pending
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
