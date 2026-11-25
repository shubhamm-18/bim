'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Plus, CheckSquare, Clock, Repeat, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CalendarIcon } from '@/components/ui';
import { CalendarAnalytics } from '@/components/features/analytics';

export function CalendarView() {
  const {
    tasks,
    setIsNewTaskModalOpen,
    updateTaskStatus,
    deleteTask,
  } = useWorkspaceStore();

  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = tasks.filter((t) => {
    const matchRole = roleFilter === 'All' ? true : t.role === roleFilter;
    const matchStatus = statusFilter === 'All' ? true : t.status === statusFilter;
    return matchRole && matchStatus;
  });

  const todayStr = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-surface-subtle border border-border text-text-muted flex items-center justify-center p-2 shadow-xs shrink-0">
            <CalendarIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Tasks & Calendar</h1>
            <p className="text-xs text-text-subtle mt-0.5">
              Track cross-functional deliverables, shoot schedules, and review milestones.
            </p>
          </div>
        </div>
        <Button
          variant="brand"
          size="md"
          onClick={() => setIsNewTaskModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Add task</span>
        </Button>
      </div>

      {/* Filters Bar */}
      <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-text-muted">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs font-medium border border-border rounded-btn px-2.5 py-1.5 bg-surface-card outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Founder">Founder</option>
            <option value="Project Management">Project Management</option>
            <option value="Content & Video">Content &amp; Video</option>
            <option value="Ads/Performance">Ads/Performance</option>
            <option value="Developer">Developer</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Open', 'Done'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 text-xs font-semibold rounded-btn transition-colors ${
                statusFilter === st
                  ? 'bg-brand-subtle text-brand'
                  : 'text-text-muted hover:bg-surface-hover'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </Card>

      {/* Task List */}
      <Card className="divide-y divide-border-subtle p-0 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-text-subtle">
            <CheckSquare className="w-8 h-8 text-border mx-auto mb-2" />
            <span>No tasks match the selected filter.</span>
          </div>
        ) : (
          filtered.map((task) => {
            const isOverdue = task.due < todayStr && task.status !== 'Done';
            return (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between hover:bg-surface-subtle transition-colors group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.status === 'Done'}
                    onChange={() =>
                      updateTaskStatus(task.id, task.status === 'Done' ? 'Open' : 'Done')
                    }
                    className="mt-1 w-4 h-4 rounded text-brand focus:ring-brand cursor-pointer"
                  />
                  <div>
                    <h4
                      className={`text-sm font-semibold ${
                        task.status === 'Done'
                          ? 'line-through text-text-subtle'
                          : 'text-text-main group-hover:text-brand'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-text-muted">
                      <span className="font-semibold text-text-muted">{task.projectName}</span>
                      <span>•</span>
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          isOverdue ? 'text-text-main font-bold underline' : 'text-text-muted'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(task.due)} {isOverdue && '(Overdue)'}
                      </span>
                      <span>•</span>
                      <Badge variant="outline">{task.role}</Badge>
                      {task.recurrence !== 'None' && (
                        <Badge variant="info">
                          <Repeat className="w-3 h-3" />
                          <span>{task.recurrence}</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {task.status === 'Done' ? (
                    <Badge variant="completed">Completed</Badge>
                  ) : (
                    <Badge
                      variant={
                        task.priority === 'Urgent'
                          ? 'urgent'
                          : task.priority === 'High'
                          ? 'pending'
                          : 'neutral'
                      }
                    >
                      {task.priority}
                    </Badge>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-text-subtle hover:text-text-main hover:bg-surface-hover rounded-btn transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </Card>

      {/* Embedded Team Throughput & Velocity Analytics */}
      <CalendarAnalytics />
    </div>
  );
}
