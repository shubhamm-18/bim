'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckSquare, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useWorkspaceStore } from '@/store/workspace-store';
import { formatDate } from '@/lib/utils';

export function TaskPrioritySection() {
  const { tasks, updateTaskStatus, setCurrentView } = useWorkspaceStore();
  const [activeTaskTab, setActiveTaskTab] = useState<'today' | 'overdue' | 'upcoming'>('overdue');

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = tasks.filter((t) => t.due === todayStr && t.status !== 'Done');
  const overdueTasks = tasks.filter((t) => t.due < todayStr && t.status !== 'Done');
  const upcomingTasks = tasks.filter((t) => t.due > todayStr && t.status !== 'Done');

  const activeTasksList =
    activeTaskTab === 'today'
      ? todayTasks
      : activeTaskTab === 'overdue'
      ? overdueTasks
      : upcomingTasks;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Priority tasks</CardTitle>
        <Link
          href="/calendar"
          onClick={() => setCurrentView('calendar')}
          className="text-xs font-semibold text-brand hover:underline"
        >
          View all tasks →
        </Link>
      </CardHeader>

      {/* Queue Tabs */}
      <div className="flex items-center gap-1 mb-4 p-1 bg-surface-subtle rounded-btn w-fit">
        <button
          onClick={() => setActiveTaskTab('today')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold transition-all ${
            activeTaskTab === 'today'
              ? 'bg-surface-card text-text-main shadow-sm'
              : 'text-text-muted hover:text-text-main'
          }`}
        >
          <span>Today</span>
          <Badge variant="neutral" className="px-1.5 py-0">
            {todayTasks.length}
          </Badge>
        </button>
        <button
          onClick={() => setActiveTaskTab('overdue')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold transition-all ${
            activeTaskTab === 'overdue'
              ? 'bg-surface-card text-text-main font-bold shadow-sm'
              : 'text-text-muted hover:text-text-main'
          }`}
        >
          <span>Overdue</span>
          <Badge variant="danger" className="px-1.5 py-0">
            {overdueTasks.length}
          </Badge>
        </button>
        <button
          onClick={() => setActiveTaskTab('upcoming')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-btn text-xs font-semibold transition-all ${
            activeTaskTab === 'upcoming'
              ? 'bg-surface-card text-text-main shadow-sm'
              : 'text-text-muted hover:text-text-main'
          }`}
        >
          <span>Upcoming</span>
          <Badge variant="neutral" className="px-1.5 py-0">
            {upcomingTasks.length}
          </Badge>
        </button>
      </div>

      {/* Task Rows */}
      <div className="flex-1 space-y-2 overflow-y-auto max-h-[360px]">
        {activeTasksList.length === 0 ? (
          <div className="py-10 text-center text-xs text-text-subtle flex flex-col items-center justify-center">
            <CheckSquare className="w-8 h-8 text-border mb-2" />
            <span>No {activeTaskTab} tasks in this queue.</span>
          </div>
        ) : (
          activeTasksList.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-btn border border-border hover:border-brand/30 bg-surface-subtle hover:bg-surface-card transition-all group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={task.status === 'Done'}
                  onChange={() => updateTaskStatus(task.id, 'Done')}
                  className="mt-1 w-4 h-4 rounded text-brand focus:ring-brand cursor-pointer"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-text-main truncate group-hover:text-brand">
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-text-muted">
                    <span className="font-semibold text-text-subtle truncate max-w-[120px]">
                      {task.projectName}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {formatDate(task.due)}
                    </span>
                    <span>•</span>
                    <Badge variant="outline" className="text-[9px] shrink-0">
                      {task.role}
                    </Badge>
                  </div>
                </div>
              </div>

              <Badge
                variant={
                  task.priority === 'Urgent'
                    ? 'danger'
                    : task.priority === 'High'
                    ? 'warning'
                    : 'neutral'
                }
                className="shrink-0 ml-2"
              >
                {task.priority}
              </Badge>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
