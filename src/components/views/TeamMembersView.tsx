'use client';

import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  Plus,
  Shield,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { RoleView } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

interface MemberRule {
  id: string;
  text: string;
  compliant: boolean;
}

interface TeamMemberProfile {
  id: string;
  name: string;
  role: RoleView;
  designation: string;
  contact: string;
  rules: MemberRule[];
  assignedTaskIds: string[];
}

const initialMembers: TeamMemberProfile[] = [
  {
    id: 'mem-1',
    name: 'Kunal Mehta',
    role: 'Content & Video',
    designation: 'Lead Video Editor',
    contact: 'kunal@beyondimagine.in',
    rules: [
      { id: 'r-1', text: 'Update edit stage & upload cut before 6:00 PM daily', compliant: true },
      { id: 'r-2', text: 'Finance, client fees & 0.4% commissions strictly private', compliant: true },
    ],
    assignedTaskIds: ['task-5'],
  },
  {
    id: 'mem-2',
    name: 'Pooja Sharma',
    role: 'Ads/Performance',
    designation: 'Performance Marketing Lead',
    contact: 'pooja@beyondimagine.in',
    rules: [
      { id: 'r-3', text: 'Pause ads crossing min test spend with 0 leads', compliant: true },
      { id: 'r-4', text: 'Map every live video to its Meta Ad ID(s)', compliant: false },
    ],
    assignedTaskIds: ['task-7'],
  },
  {
    id: 'mem-3',
    name: 'Rohan Patel',
    role: 'Content & Video',
    designation: 'Content & Script Strategist',
    contact: 'rohan@beyondimagine.in',
    rules: [
      { id: 'r-5', text: 'Record blocker owner on any client approval delay', compliant: true },
      { id: 'r-6', text: 'Log committed due date on all scheduled reels', compliant: true },
    ],
    assignedTaskIds: ['task-6'],
  },
  {
    id: 'mem-4',
    name: 'Ananya Nair',
    role: 'Project Management',
    designation: 'Senior Project Manager',
    contact: 'ananya@beyondimagine.in',
    rules: [
      { id: 'r-7', text: 'Follow up on client complaints within 24 hours', compliant: true },
      { id: 'r-8', text: 'Verify sales feedback status before marking CPL healthy', compliant: true },
    ],
    assignedTaskIds: ['task-1', 'task-2', 'task-3'],
  },
];

export function TeamMembersView() {
  const { tasks, projects, addTask, updateTaskStatus, deleteTask } = useWorkspaceStore();

  const [members, setMembers] = useState<TeamMemberProfile[]>(initialMembers);
  const [showAddMember, setShowAddMember] = useState(false);

  // Add Member form state
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState<RoleView>('Content & Video');
  const [memberDesignation, setMemberDesignation] = useState('');
  const [memberContact, setMemberContact] = useState('');
  const [memberRuleInput, setMemberRuleInput] = useState('');

  // Per-member inline rule / task assignment state
  const [newRuleInputs, setNewRuleInputs] = useState<Record<string, string>>({});
  const [assignTaskTarget, setAssignTaskTarget] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskProjectName, setTaskProjectName] = useState(projects[0]?.name || 'Shakti Skyline');
  const [taskDue, setTaskDue] = useState('2026-11-28');
  const [taskPriority, setTaskPriority] = useState<'Medium' | 'High' | 'Urgent'>('High');

  const stats = useMemo(() => {
    const totalRules = members.reduce((s, m) => s + m.rules.length, 0);
    const compliantRules = members.reduce(
      (s, m) => s + m.rules.filter((r) => r.compliant).length,
      0
    );
    const doneTasks = tasks.filter((t) => t.status === 'Done').length;
    const pendingTasks = tasks.filter((t) => t.status !== 'Done').length;
    return { totalRules, compliantRules, doneTasks, pendingTasks };
  }, [members, tasks]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    const parsedRules: MemberRule[] = memberRuleInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((text, idx) => ({
        id: `r-${Date.now()}-${idx}`,
        text,
        compliant: false,
      }));

    const newMember: TeamMemberProfile = {
      id: `mem-${Date.now()}`,
      name: memberName.trim(),
      role: memberRole,
      designation: memberDesignation.trim() || memberRole,
      contact: memberContact.trim() || `${memberName.trim().toLowerCase().replace(/\s+/g, '.')}@beyondimagine.in`,
      rules:
        parsedRules.length > 0
          ? parsedRules
          : [
              {
                id: `r-${Date.now()}`,
                text: 'Update assigned task status daily before EOD',
                compliant: false,
              },
            ],
      assignedTaskIds: [],
    };

    setMembers((prev) => [newMember, ...prev]);
    setMemberName('');
    setMemberDesignation('');
    setMemberContact('');
    setMemberRuleInput('');
    setShowAddMember(false);
  };

  const handleAddRuleToMember = (memberId: string) => {
    const text = (newRuleInputs[memberId] || '').trim();
    if (!text) return;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              rules: [...m.rules, { id: `r-${Date.now()}`, text, compliant: false }],
            }
          : m
      )
    );
    setNewRuleInputs((prev) => ({ ...prev, [memberId]: '' }));
  };

  const handleToggleRule = (memberId: string, ruleId: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              rules: m.rules.map((r) =>
                r.id === ruleId ? { ...r, compliant: !r.compliant } : r
              ),
            }
          : m
      )
    );
  };

  const handleAssignTaskToMember = (e: React.FormEvent, member: TeamMemberProfile) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const proj = projects.find((p) => p.name === taskProjectName) || projects[0];
    const beforeIds = new Set(useWorkspaceStore.getState().tasks.map((t) => t.id));

    addTask({
      projectId: proj?.id || 'proj-1',
      projectName: proj?.name || taskProjectName,
      title: `${taskTitle.trim()} (${member.name})`,
      due: taskDue,
      status: 'Open',
      priority: taskPriority,
      role: member.role,
      recurrence: 'None',
    });

    const createdTask = useWorkspaceStore
      .getState()
      .tasks.find((t) => !beforeIds.has(t.id));

    if (createdTask) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === member.id
            ? { ...m, assignedTaskIds: [createdTask.id, ...m.assignedTaskIds] }
            : m
        )
      );
    }

    setTaskTitle('');
    setAssignTaskTarget(null);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Team Members &amp; Rules</h1>
            <p className="text-xs text-text-muted mt-0.5">
              Add team members, define operational rules, assign tasks directly, and track done vs pending status.
            </p>
          </div>
        </div>

        <Button
          variant="brand"
          size="md"
          onClick={() => setShowAddMember(!showAddMember)}
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Team Member</span>
        </Button>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Total Members</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{members.length}</div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Rules Compliance</span>
          <div className="text-xl font-extrabold text-[#1D563B] mt-1">
            {stats.compliantRules} / {stats.totalRules}
          </div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Tasks Done</span>
          <div className="text-xl font-extrabold text-[#1D563B] mt-1">{stats.doneTasks}</div>
        </Card>
        <Card className="p-4">
          <span className="text-[11px] font-semibold text-text-muted">Tasks Pending</span>
          <div className="text-xl font-extrabold text-text-main mt-1">{stats.pendingTasks}</div>
        </Card>
      </div>

      {/* Add Member Inline Form */}
      {showAddMember && (
        <Card className="p-5 border-2 border-[#1D563B]/30 space-y-4">
          <h3 className="text-sm font-bold text-text-main">Add New Team Member &amp; Rules</h3>
          <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              required
              placeholder="Full Name (e.g. Vikram Joshi)"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <Select
              value={memberRole}
              onChange={(e) => setMemberRole(e.target.value as RoleView)}
            >
              <option value="Project Management">Project Management</option>
              <option value="Content & Video">Content &amp; Video</option>
              <option value="Ads/Performance">Ads/Performance</option>
              <option value="Sales">Sales</option>
              <option value="Developer">Developer</option>
            </Select>
            <Input
              placeholder="Designation (e.g. Reel Editor)"
              value={memberDesignation}
              onChange={(e) => setMemberDesignation(e.target.value)}
            />
            <Input
              placeholder="Email / Contact"
              value={memberContact}
              onChange={(e) => setMemberContact(e.target.value)}
            />
            <div className="sm:col-span-2">
              <Input
                placeholder="Initial Rules (comma-separated, e.g. Submit rough cut by 5 PM, No finance access)"
                value={memberRuleInput}
                onChange={(e) => setMemberRuleInput(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddMember(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm">
                Save Member
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {members.map((member) => {
          const memberTasks = tasks.filter(
            (t) =>
              member.assignedTaskIds.includes(t.id) ||
              t.title.includes(`(${member.name})`)
          );
          const doneCount = memberTasks.filter((t) => t.status === 'Done').length;
          const pct =
            memberTasks.length > 0 ? Math.round((doneCount / memberTasks.length) * 100) : 0;

          return (
            <Card key={member.id} className="p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Member Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border-subtle pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-text-main">{member.name}</h3>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                    <p className="text-xs text-text-muted mt-0.5">
                      {member.designation} • {member.contact}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#1D563B]">
                      {doneCount} / {memberTasks.length} Done ({pct}%)
                    </span>
                    <div className="w-24 h-1.5 bg-surface-subtle rounded-full mt-1 overflow-hidden ml-auto">
                      <div
                        className="h-full bg-[#1D563B] rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Member Rules & Compliance */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-subtle flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#1D563B]" />
                      Member Rules ({member.rules.filter((r) => r.compliant).length}/{member.rules.length})
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {member.rules.map((rule) => (
                      <label
                        key={rule.id}
                        className="flex items-start gap-2 p-2 rounded-lg bg-surface-subtle border border-border-subtle text-xs cursor-pointer hover:bg-surface-hover transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={rule.compliant}
                          onChange={() => handleToggleRule(member.id, rule.id)}
                          className="mt-0.5 w-3.5 h-3.5 rounded cursor-pointer"
                        />
                        <span
                          className={
                            rule.compliant
                              ? 'text-text-main font-medium'
                              : 'text-text-muted'
                          }
                        >
                          {rule.text}
                        </span>
                      </label>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Give new rule to member..."
                      value={newRuleInputs[member.id] || ''}
                      onChange={(e) =>
                        setNewRuleInputs((prev) => ({
                          ...prev,
                          [member.id]: e.target.value,
                        }))
                      }
                      className="flex-1 px-2.5 py-1 text-xs border border-border rounded-btn bg-white text-text-main"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddRuleToMember(member.id)}
                    >
                      + Rule
                    </Button>
                  </div>
                </div>

                {/* Assigned Tasks + Done / Pending Status */}
                <div className="space-y-2 pt-2 border-t border-border-subtle">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-text-subtle flex items-center gap-1">
                      <ClipboardList className="w-3.5 h-3.5 text-[#1D563B]" />
                      Assigned Tasks ({memberTasks.length})
                    </span>
                    <Button
                      size="sm"
                      variant="brand"
                      onClick={() =>
                        setAssignTaskTarget(
                          assignTaskTarget === member.id ? null : member.id
                        )
                      }
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Assign Task</span>
                    </Button>
                  </div>

                  {assignTaskTarget === member.id && (
                    <form
                      onSubmit={(e) => handleAssignTaskToMember(e, member)}
                      className="p-3 rounded-xl bg-surface-subtle border border-border space-y-2"
                    >
                      <Input
                        required
                        placeholder={`Assign task to ${member.name}...`}
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <Select
                          value={taskProjectName}
                          onChange={(e) => setTaskProjectName(e.target.value)}
                        >
                          {projects.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </Select>
                        <Input
                          type="date"
                          value={taskDue}
                          onChange={(e) => setTaskDue(e.target.value)}
                        />
                        <Select
                          value={taskPriority}
                          onChange={(e) =>
                            setTaskPriority(e.target.value as 'Medium' | 'High' | 'Urgent')
                          }
                        >
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Urgent">Urgent</option>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setAssignTaskTarget(null)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" size="sm" variant="brand">
                          Save Task
                        </Button>
                      </div>
                    </form>
                  )}

                  {memberTasks.length === 0 ? (
                    <div className="text-xs text-text-subtle py-2">
                      No tasks assigned yet.
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {memberTasks.map((t) => {
                        const isDone = t.status === 'Done';
                        return (
                          <div
                            key={t.id}
                            className="p-2.5 rounded-lg border border-border-subtle bg-white flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-start gap-2 min-w-0">
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() =>
                                  updateTaskStatus(t.id, isDone ? 'Open' : 'Done')
                                }
                                className="mt-0.5 w-3.5 h-3.5 rounded cursor-pointer"
                              />
                              <div className="min-w-0">
                                <div
                                  className={`font-semibold truncate ${
                                    isDone
                                      ? 'line-through text-text-subtle'
                                      : 'text-text-main'
                                  }`}
                                >
                                  {t.title}
                                </div>
                                <div className="text-[10px] text-text-subtle">
                                  {t.projectName} · Due {t.due}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <Badge variant={isDone ? 'completed' : 'pending'}>
                                {isDone ? (
                                  <>
                                    <CheckCircle2 className="w-3 h-3" /> Done
                                  </>
                                ) : (
                                  'Pending'
                                )}
                              </Badge>
                              <button
                                onClick={() => deleteTask(t.id)}
                                className="p-1 text-text-subtle hover:text-text-main"
                                title="Delete task"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
