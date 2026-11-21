'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Plus, CheckSquare, Clock, Repeat, Trash2, Calendar as CalIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { TaskStatus, RoleView } from '@/types';

export function CalendarView() {
  const {
    tasks,
    setIsNewTaskModalOpen,
    updateTaskStatus,
    deleteTask,
    selectedClientFilter,
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
        <div>
          <h1 className="text-2xl font-bold text-[#20222c]">Tasks & Calendar</h1>
          <p className="text-xs text-[#8e91a0]">
            Track cross-functional deliverables, shoot schedules, and review milestones.
          </p>
        </div>
        <button
          onClick={() => setIsNewTaskModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#7040cd] hover:bg-[#5e35ce] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add task</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#e4e5ec]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-[#727583]">Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs font-medium border border-[#e4e5ec] rounded-lg px-2.5 py-1.5 bg-white outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Founder">Founder</option>
            <option value="Project Management">Project Management</option>
            <option value="Content">Content</option>
            <option value="Video">Video</option>
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
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                statusFilter === st
                  ? 'bg-[#efeafb] text-[#7040cd]'
                  : 'text-[#727583] hover:bg-[#f7f6fa]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-[#e4e5ec] shadow-sm divide-y divide-[#f0f1f5] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#8e91a0]">
            <CheckSquare className="w-8 h-8 text-[#d8d9e2] mx-auto mb-2" />
            <span>No tasks match the selected filter.</span>
          </div>
        ) : (
          filtered.map((task) => {
            const isOverdue = task.due < todayStr && task.status !== 'Done';
            return (
              <div
                key={task.id}
                className="p-4 flex items-center justify-between hover:bg-[#fafafc] transition-colors group"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.status === 'Done'}
                    onChange={() =>
                      updateTaskStatus(task.id, task.status === 'Done' ? 'Open' : 'Done')
                    }
                    className="mt-1 w-4 h-4 rounded text-[#7040cd] focus:ring-[#7040cd] cursor-pointer"
                  />
                  <div>
                    <h4
                      className={`text-sm font-semibold ${
                        task.status === 'Done'
                          ? 'line-through text-[#8e91a0]'
                          : 'text-[#20222c] group-hover:text-[#7040cd]'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-[#727583]">
                      <span className="font-medium text-[#7040cd] bg-[#efeafb] px-2 py-0.5 rounded-md">
                        {task.projectName}
                      </span>
                      <span>•</span>
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          isOverdue ? 'text-[#ef4444] font-bold' : 'text-[#727583]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(task.due)} {isOverdue && '(Overdue)'}
                      </span>
                      <span>•</span>
                      <span className="px-2 py-0.5 bg-[#f7f8fa] border border-[#e4e5ec] rounded-md font-medium text-[11px]">
                        {task.role}
                      </span>
                      {task.recurrence !== 'None' && (
                        <span className="flex items-center gap-1 text-[11px] text-[#3b82f6] font-semibold bg-[#dbeafe] px-2 py-0.5 rounded-md">
                          <Repeat className="w-3 h-3" />
                          {task.recurrence}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                      task.priority === 'Urgent'
                        ? 'bg-[#fee2e2] text-[#dc2626]'
                        : task.priority === 'High'
                        ? 'bg-[#ffedd5] text-[#ea580c]'
                        : 'bg-[#f0f1f5] text-[#535767]'
                    }`}
                  >
                    {task.priority}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 text-[#8e91a0] hover:text-[#ef4444] hover:bg-[#fee2e2] rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
