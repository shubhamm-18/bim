'use client';

import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Filter,
  LayoutGrid,
  List,
  MessageSquare,
  Plus,
  Search,
  Star,
  User,
} from 'lucide-react';
import { ComplaintsModal } from '@/components/features/projects';
import { useWorkspaceStore } from '@/store/workspace-store';
import { isClientScopedRole } from '@/lib/permissions';
import {
  initialMonthlyScopes,
  initialSocialDeliverables,
  SOCIAL_STAGES,
  SocialDeliverableItem,
  SocialStage,
} from '@/data';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ProjectsIcon } from '@/components/ui';

function getStageBadgeVariant(stage: SocialStage): 'completed' | 'pending' | 'outline' {
  if (stage === 'Published' || stage === 'Delivery') return 'completed';
  if (stage === 'Approval' || stage === 'Edit') return 'pending';
  return 'outline';
}

export function ProjectsView() {
  const { currentRole, scopedDeveloperClient, selectedClientFilter } = useWorkspaceStore();
  const clientScoped = isClientScopedRole(currentRole);

  const [deliverables, setDeliverables] = useState<SocialDeliverableItem[]>(initialSocialDeliverables);
  const [viewMode, setViewMode] = useState<'calendar' | 'board'>('calendar');
  const [clientFilter, setClientFilter] = useState<string>('All');
  const [stageFilter, setStageFilter] = useState<SocialStage | 'All'>('All');
  const [complaintsOnly, setComplaintsOnly] = useState(false);
  const [complaintModalClient, setComplaintModalClient] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Add Reel / Post form state
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('Shakti Group');
  const [newProject, setNewProject] = useState('Shakti Skyline');
  const [newType, setNewType] = useState<SocialDeliverableItem['contentType']>('Reel');
  const [newAssignee, setNewAssignee] = useState('Kunal Mehta');
  const [newDueDate, setNewDueDate] = useState('2026-11-29');

  const effectiveClient = clientScoped
    ? scopedDeveloperClient
    : selectedClientFilter || clientFilter;

  const visibleScopes = useMemo(() => {
    return initialMonthlyScopes.filter(
      (s) => effectiveClient === 'All' || s.client === effectiveClient
    );
  }, [effectiveClient]);

  const clientScopedRows = useMemo(() => {
    return deliverables.filter((item) => {
      if (effectiveClient !== 'All' && item.client !== effectiveClient) return false;
      return true;
    });
  }, [deliverables, effectiveClient]);

  const stageDistribution = useMemo(() => {
    return SOCIAL_STAGES.map((stage) => ({
      stage,
      count: clientScopedRows.filter((i) => i.stage === stage).length,
    }));
  }, [clientScopedRows]);

  const filteredRows = useMemo(() => {
    return clientScopedRows.filter((item) => {
      if (complaintsOnly && item.openComplaint === 'None') return false;
      if (stageFilter !== 'All' && item.stage !== stageFilter) return false;
      if (
        search &&
        !item.title.toLowerCase().includes(search.toLowerCase()) &&
        !item.assignee.toLowerCase().includes(search.toLowerCase()) &&
        !item.project.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [clientScopedRows, complaintsOnly, stageFilter, search]);

  const modalComplaints = useMemo(() => {
    if (!complaintModalClient) return [];
    return deliverables.filter(
      (d) => d.client === complaintModalClient && d.openComplaint !== 'None'
    );
  }, [deliverables, complaintModalClient]);

  const handleResolveComplaint = (id: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setDeliverables((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              openComplaint: 'None',
              pmFollowUp: `Resolved & closed on ${today}`,
            }
          : item
      )
    );
  };

  const handleStageChange = (id: string, nextStage: SocialStage) => {
    const today = new Date().toISOString().slice(0, 10);
    setDeliverables((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const actualDeliveryDate =
          nextStage === 'Delivery' || nextStage === 'Published'
            ? item.actualDeliveryDate === 'Pending'
              ? today
              : item.actualDeliveryDate
            : 'Pending';
        const liveLink =
          nextStage === 'Published' && item.liveLink === '—'
            ? `https://instagram.com/reel/${item.id}`
            : item.liveLink;
        return { ...item, stage: nextStage, actualDeliveryDate, liveLink };
      })
    );
  };

  const handleFeedbackChange = (id: string, score: 1 | 2 | 3 | 4 | 5) => {
    const today = new Date().toISOString().slice(0, 10);
    setDeliverables((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, clientFeedback: score, lastFeedbackDate: today } : item
      )
    );
  };

  const handleAddDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: SocialDeliverableItem = {
      id: `bim-${Date.now()}`,
      client: clientScoped ? scopedDeveloperClient : newClient,
      project: newProject,
      title: newTitle.trim(),
      contentType: newType,
      assignee: newAssignee,
      committedDueDate: newDueDate,
      stage: 'Script',
      actualDeliveryDate: 'Pending',
      liveLink: '—',
      clientFeedback: 5,
      openComplaint: 'None',
      lastFeedbackDate: new Date().toISOString().slice(0, 10),
      pmFollowUp: 'Added to monthly scope calendar',
    };
    setDeliverables((prev) => [item, ...prev]);
    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#E3EDE6] border border-[#CFE0D4] text-[#1D563B] flex items-center justify-center shrink-0">
            <ProjectsIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-text-main">
                BIM · Social Media Monthly Scope &amp; Calendar
              </h1>
              <Badge variant="outline">
                Script → Shoot → Edit → Approval → Delivery → Published
              </Badge>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Track every reel &amp; post: assignee, committed vs actual delivery, live link, client feedback (1–5), open complaints &amp; PM follow-up.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-white border border-border rounded-btn p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'calendar'
                  ? 'bg-[#E3EDE6] text-[#1D563B]'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Calendar Table</span>
            </button>
            <button
              onClick={() => setViewMode('board')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'board'
                  ? 'bg-[#E3EDE6] text-[#1D563B]'
                  : 'text-text-muted hover:text-text-main'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Stage Distribution</span>
            </button>
          </div>

          <Button
            variant="brand"
            size="md"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="w-4 h-4" />
            <span>Add Reel / Post</span>
          </Button>
        </div>
      </div>

      {/* Monthly Scope Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleScopes.map((sc) => {
          const reelsPct = Math.round((sc.monthlyReelsDone / sc.monthlyReelsTarget) * 100);
          const postsPct = Math.round((sc.monthlyPostsDone / sc.monthlyPostsTarget) * 100);
          const liveOpenComplaints = deliverables.filter(
            (d) => d.client === sc.client && d.openComplaint !== 'None'
          ).length;
          return (
            <Card key={sc.client} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-text-main">{sc.client}</h3>
                  <p className="text-[11px] text-text-muted">{sc.project}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="completed">
                    <Star className="w-3 h-3" /> {sc.avgFeedback}/5
                  </Badge>
                  {liveOpenComplaints > 0 && (
                    <button
                      type="button"
                      onClick={() => setComplaintModalClient(sc.client)}
                      title="Click to view & resolve open complaints"
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-badge text-[10px] font-bold uppercase tracking-wider bg-red-900 hover:bg-red-800 text-white border border-red-800 shadow-xs transition-all cursor-pointer"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>
                        {liveOpenComplaints}{' '}
                        {liveOpenComplaints === 1 ? 'Complaint' : 'Complaints'}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-text-muted font-medium">Monthly Reels Scope</span>
                    <span className="font-bold text-text-main">
                      {sc.monthlyReelsDone} / {sc.monthlyReelsTarget}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1D563B] rounded-full"
                      style={{ width: `${reelsPct}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-text-muted font-medium">Monthly Posts / Carousels</span>
                    <span className="font-bold text-text-main">
                      {sc.monthlyPostsDone} / {sc.monthlyPostsTarget}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4C8466] rounded-full"
                      style={{ width: `${postsPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 6-Stage Proper Distribution Strip (Clickable Filter) */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-text-subtle">
            Stage-Wise Distribution (Click any stage to filter)
          </span>
          {stageFilter !== 'All' && (
            <button
              onClick={() => setStageFilter('All')}
              className="text-xs font-semibold text-brand hover:underline"
            >
              Show All ({clientScopedRows.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {stageDistribution.map(({ stage, count }) => {
            const active = stageFilter === stage;
            const sharePct =
              clientScopedRows.length > 0
                ? Math.round((count / clientScopedRows.length) * 100)
                : 0;
            return (
              <button
                key={stage}
                onClick={() => setStageFilter(active ? 'All' : stage)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  active
                    ? 'bg-[#E3EDE6] border-[#1D563B] shadow-xs'
                    : 'bg-surface-subtle border-border hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-main">{stage}</span>
                  <span className="text-xs font-mono font-bold text-[#1D563B]">
                    {sharePct}%
                  </span>
                </div>
                <div className="text-xl font-extrabold text-text-main mt-1">{count}</div>
                <div className="w-full h-1 bg-white/80 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#1D563B] rounded-full"
                    style={{ width: `${sharePct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Add Reel / Post Inline Form */}
      {showAddForm && (
        <Card className="p-5 border-2 border-[#1D563B]/30 space-y-3">
          <h3 className="text-sm font-bold text-text-main">
            Schedule New Reel / Post in Monthly Calendar
          </h3>
          <form onSubmit={handleAddDeliverable} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              required
              placeholder="Reel / Post Title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <Select
              disabled={clientScoped}
              value={clientScoped ? scopedDeveloperClient : newClient}
              onChange={(e) => setNewClient(e.target.value)}
            >
              <option value="Shakti Group">Shakti Group</option>
              <option value="Sun Creators">Sun Creators</option>
              <option value="Gruhnest">Gruhnest</option>
            </Select>
            <Input
              placeholder="Project Name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <Select
              value={newType}
              onChange={(e) => setNewType(e.target.value as SocialDeliverableItem['contentType'])}
            >
              <option value="Reel">Reel</option>
              <option value="Post / Carousel">Post / Carousel</option>
              <option value="Walkthrough">Walkthrough</option>
              <option value="Podcast Clip">Podcast Clip</option>
            </Select>
            <Select value={newAssignee} onChange={(e) => setNewAssignee(e.target.value)}>
              <option value="Kunal Mehta">Kunal Mehta</option>
              <option value="Rohan Patel">Rohan Patel</option>
              <option value="Pooja Sharma">Pooja Sharma</option>
              <option value="Ananya Nair">Ananya Nair</option>
            </Select>
            <Input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
            <div className="sm:col-span-3 flex justify-end gap-2 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm">
                Add to Calendar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Search & Client Filter Bar */}
      <Card className="p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-subtle rounded-btn border border-border w-full sm:w-80">
          <Search className="w-4 h-4 text-text-subtle" />
          <input
            type="text"
            placeholder="Search reel/post, project, assignee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-transparent outline-none text-text-main placeholder:text-text-subtle"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Client:
          </span>
          {['All', 'Shakti Group', 'Sun Creators', 'Gruhnest'].map((c) => (
            <button
              key={c}
              disabled={clientScoped && c !== scopedDeveloperClient}
              onClick={() => setClientFilter(c)}
              className={`px-3 py-1 rounded-btn text-xs font-semibold transition-colors disabled:opacity-40 ${
                effectiveClient === c
                  ? 'bg-[#E3EDE6] text-[#1D563B]'
                  : 'text-text-muted hover:bg-surface-hover'
              }`}
            >
              {c}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setComplaintsOnly(!complaintsOnly)}
            className={`px-3 py-1 rounded-btn text-xs font-semibold inline-flex items-center gap-1 transition-colors border ${
              complaintsOnly
                ? 'bg-red-900 text-white border-red-800'
                : 'bg-white text-text-muted border-border hover:bg-surface-hover'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>
              Complaints (
              {clientScopedRows.filter((d) => d.openComplaint !== 'None').length})
            </span>
          </button>
        </div>
      </Card>

      {/* Main Content: Calendar Table OR 6-Stage Distribution Board */}
      {viewMode === 'calendar' ? (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-text-subtle font-semibold uppercase tracking-wider text-[10px] bg-surface-subtle">
                  <th className="py-3 px-4">Reel / Post &amp; Project</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4">Stage (Track)</th>
                  <th className="py-3 px-4">Committed vs Actual</th>
                  <th className="py-3 px-4">Live Link</th>
                  <th className="py-3 px-4">Feedback (1–5)</th>
                  <th className="py-3 px-4">Open Complaint &amp; PM Follow-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredRows.map((item) => {
                  const hasComplaint = item.openComplaint !== 'None';
                  return (
                    <tr key={item.id} className="hover:bg-surface-subtle/70 transition-colors align-top">
                      <td className="py-3.5 px-4 min-w-[210px]">
                        <div className="font-bold text-text-main">{item.title}</div>
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-text-muted">
                          <span className="font-semibold text-text-main">{item.client}</span>
                          <span>•</span>
                          <span>{item.project}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                            {item.contentType}
                          </Badge>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-text-main">
                          <User className="w-3.5 h-3.5 text-text-subtle" />
                          {item.assignee}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={item.stage}
                          onChange={(e) => handleStageChange(item.id, e.target.value as SocialStage)}
                          className="text-xs font-bold border border-border rounded-btn px-2 py-1 bg-white text-text-main cursor-pointer mb-1.5 block"
                        >
                          {SOCIAL_STAGES.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <Badge variant={getStageBadgeVariant(item.stage)}>
                          {item.stage}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="text-text-main font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-text-subtle" />
                          Due: {item.committedDueDate}
                        </div>
                        <div
                          className={`text-[11px] mt-1 ${
                            item.actualDeliveryDate === 'Pending'
                              ? 'text-text-subtle'
                              : 'text-[#1D563B] font-semibold'
                          }`}
                        >
                          Actual: {item.actualDeliveryDate}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 max-w-[160px]">
                        {item.liveLink.startsWith('http') ? (
                          <a
                            href={item.liveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
                          >
                            <span>View Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-[11px] text-text-subtle">{item.liveLink}</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {([1, 2, 3, 4, 5] as const).map((score) => (
                            <button
                              key={score}
                              onClick={() => handleFeedbackChange(item.id, score)}
                              title={`Set feedback ${score}/5`}
                              className={`w-5 h-5 rounded text-[10px] font-bold transition-colors ${
                                item.clientFeedback >= score
                                  ? 'bg-[#1D563B] text-white'
                                  : 'bg-surface-subtle text-text-subtle border border-border'
                              }`}
                            >
                              {score}
                            </button>
                          ))}
                        </div>
                        <div className="text-[10px] text-text-subtle mt-1">
                          Last: {item.lastFeedbackDate}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 min-w-[230px] space-y-1.5">
                        {hasComplaint ? (
                          <div className="inline-flex items-start gap-1.5 text-[11px] font-semibold text-red-900 bg-red-500/10 border border-red-500/20 px-2 py-1 rounded-lg">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                            <span>{item.openComplaint}</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1D563B]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> No Open Complaint
                          </div>
                        )}
                        <div className="text-[11px] text-text-muted flex items-start gap-1">
                          <MessageSquare className="w-3 h-3 shrink-0 mt-0.5 text-text-subtle" />
                          <span>
                            <strong>PM:</strong> {item.pmFollowUp}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {SOCIAL_STAGES.map((stage) => {
            const stageItems = filteredRows.filter((i) => i.stage === stage);
            return (
              <div
                key={stage}
                className="bg-white/90 p-3 rounded-card border border-border min-w-[205px] flex flex-col"
              >
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-border-subtle">
                  <span className="text-xs font-bold text-text-main">{stage}</span>
                  <span className="text-xs font-mono font-bold text-[#1D563B]">
                    ({stageItems.length})
                  </span>
                </div>

                <div className="space-y-2.5 flex-1">
                  {stageItems.map((item) => {
                    const nextStage = SOCIAL_STAGES[SOCIAL_STAGES.indexOf(stage) + 1];
                    return (
                      <Card key={item.id} className="p-3 space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-[#1D563B] uppercase">
                            {item.contentType}
                          </span>
                          <span className="text-[10px] font-bold text-text-main">
                            {item.clientFeedback}/5 ★
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-text-main leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-text-muted">
                          {item.project} · {item.assignee}
                        </p>
                        {item.openComplaint !== 'None' && (
                          <p className="text-[10px] font-semibold text-red-900 bg-red-500/10 p-1.5 rounded">
                            {item.openComplaint}
                          </p>
                        )}
                        <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-[10px] text-text-subtle">
                          <span>Due: {item.committedDueDate}</span>
                          {nextStage && (
                            <button
                              onClick={() => handleStageChange(item.id, nextStage)}
                              title={`Move to ${nextStage}`}
                              className="inline-flex items-center gap-0.5 font-bold text-[#1D563B] hover:underline"
                            >
                              <span>{nextStage}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Open Complaints Modal */}
      <ComplaintsModal
        clientName={complaintModalClient}
        complaints={modalComplaints}
        onClose={() => setComplaintModalClient(null)}
        onResolve={handleResolveComplaint}
        onFilterToTable={(name) => {
          setClientFilter(name);
          setComplaintsOnly(true);
          setViewMode('calendar');
          setComplaintModalClient(null);
        }}
      />
    </div>
  );
}
