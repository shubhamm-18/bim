'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { X, CheckSquare } from 'lucide-react';
import { PriorityLevel, RoleView, TaskRecurrence } from '@/types';

export function NewTaskModal() {
  const {
    isNewTaskModalOpen,
    setIsNewTaskModalOpen,
    projects,
    addTask,
  } = useWorkspaceStore();

  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [due, setDue] = useState(new Date().toISOString().slice(0, 10));
  const [priority, setPriority] = useState<PriorityLevel>('Medium');
  const [role, setRole] = useState<RoleView>('Project Management');
  const [recurrence, setRecurrence] = useState<TaskRecurrence>('None');

  if (!isNewTaskModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const proj = projects.find((p) => p.id === projectId) || projects[0];

    addTask({
      title,
      projectId: proj.id,
      projectName: proj.name,
      due,
      priority,
      role,
      status: 'Open',
      recurrence,
    });

    setTitle('');
    setIsNewTaskModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#e4e5ec] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f1f5]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#dbeafe] text-[#2563eb] rounded-xl">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#20222c]">Add Actionable Task</h3>
              <p className="text-xs text-[#8e91a0]">Assign deliverable or milestone to team role</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewTaskModalOpen(false)}
            className="p-1 text-[#8e91a0] hover:text-[#20222c] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Task Description</label>
            <input
              type="text"
              required
              placeholder="e.g. Confirm recording date with developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm border border-[#e4e5ec] rounded-xl outline-none focus:border-[#7040cd]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Associated Project</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.clientName})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Due Date</label>
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Assigned Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as RoleView)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                <option value="Founder">Founder</option>
                <option value="Project Management">Project Management</option>
                <option value="Content">Content</option>
                <option value="Video">Video</option>
                <option value="Ads/Performance">Ads/Performance</option>
                <option value="Developer">Developer</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#20222c] mb-1.5">Recurrence</label>
              <select
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value as TaskRecurrence)}
                className="w-full px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
              >
                <option value="None">None</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f0f1f5]">
            <button
              type="button"
              onClick={() => setIsNewTaskModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-[#535767] hover:bg-[#f7f6fa] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-[#7040cd] hover:bg-[#5e35ce] rounded-xl shadow-sm transition-all"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
