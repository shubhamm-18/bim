'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { CheckSquare } from 'lucide-react';
import { PriorityLevel, RoleView, TaskRecurrence } from '@/types';
import { agencyConfig } from '@/config/agency.config';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

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
    <Modal
      isOpen={isNewTaskModalOpen}
      onClose={() => setIsNewTaskModalOpen(false)}
      title="Add Actionable Task"
      description="Assign deliverable or milestone to team role"
      icon={<CheckSquare className="w-5 h-5 text-brand" />}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-main mb-1.5">Task Description</label>
          <Input
            required
            placeholder="e.g. Confirm recording date with developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Associated Project</label>
            <Select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.clientName})
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Due Date</label>
            <Input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Priority</label>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityLevel)}
            >
              {agencyConfig.taskPriorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Assigned Role</label>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as RoleView)}
            >
              {agencyConfig.roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Recurrence</label>
            <Select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value as TaskRecurrence)}
            >
              {agencyConfig.taskRecurrence.map((rec) => (
                <option key={rec} value={rec}>
                  {rec}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsNewTaskModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="brand">
            Save Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
