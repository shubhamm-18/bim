'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Plus, Video, ArrowRight } from 'lucide-react';
import { ContentFormat } from '@/types';
import { formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ContentIcon } from '@/components/ui';
import { ContentAnalytics } from '@/components/features/analytics';
import { contentStages } from '@/data/content.data';

export function ContentStudioView() {
  const { contentItems, projects, addContentItem, updateContentStage } = useWorkspaceStore();

  const [activeTab, setActiveTab] = useState<'board' | 'calendar'>('board');
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [format, setFormat] = useState<ContentFormat>('Walkthrough');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const proj = projects.find((p) => p.id === projectId) || projects[0];

    addContentItem({
      name,
      format,
      projectId: proj.id,
      projectName: proj.name,
      service: 'Content',
      stage: 'Idea',
      date: new Date().toISOString().slice(0, 10),
      owner: 'Content Team',
    });

    setName('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            <ContentIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-main">Content Studio</h1>
            <p className="text-xs text-text-subtle">
              Architectural walkthroughs, developer podcasts, reels, and script-to-screen pipeline.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-surface-subtle rounded-btn text-xs font-semibold">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 rounded-btn transition-all ${
                activeTab === 'board' ? 'bg-surface-card text-brand shadow-sm' : 'text-text-muted'
              }`}
            >
              Stage Board
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-btn transition-all ${
                activeTab === 'calendar' ? 'bg-surface-card text-brand shadow-sm' : 'text-text-muted'
              }`}
            >
              Calendar
            </button>
          </div>
          <Button
            variant="brand"
            size="md"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="w-4 h-4" />
            <span>Add Creative</span>
          </Button>
        </div>
      </div>

      {/* Add Creative Inline Card */}
      {showAddForm && (
        <Card className="border-brand/40 shadow-cardHover space-y-4 animate-fade-in">
          <h4 className="text-sm font-bold text-text-main">Add New Content Production Item</h4>
          <form onSubmit={handleAdd} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                required
                placeholder="e.g. Skyline 3BHK Cinematic Reel"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                value={format}
                onChange={(e) => setFormat(e.target.value as ContentFormat)}
              >
                <option value="Walkthrough">Walkthrough</option>
                <option value="Explainer">Developer Explainer</option>
                <option value="Shoot">On-Site Shoot</option>
                <option value="Edit">Reel / Video Cut</option>
                <option value="Script">Script Drafting</option>
                <option value="Podcast">Podcast Episode</option>
              </Select>
              <Select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="brand" size="sm">
                Save Item
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Kanban Board of Stages */}
      {activeTab === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto pb-4">
          {contentStages.map((st) => {
            const itemsInStage = contentItems.filter((c) => c.stage === st);
            return (
              <div key={st} className="bg-surface-subtle p-3 rounded-card border border-border min-w-[200px] flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border">
                  <span className="text-xs font-bold text-text-main">{st}</span>
                  <Badge variant="brand" className="px-1.5 py-0">
                    {itemsInStage.length}
                  </Badge>
                </div>

                <div className="space-y-2 flex-1">
                  {itemsInStage.map((item) => (
                    <Card
                      key={item.id}
                      className="p-3 hover:border-brand/40 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-brand block">{item.format}</span>
                        <h5 className="text-xs font-bold text-text-main mt-0.5">{item.name}</h5>
                        <p className="text-[10px] text-text-subtle mt-1">{item.projectName}</p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-border-subtle flex items-center justify-between">
                        <span className="text-[10px] text-text-subtle">{formatDate(item.date)}</span>
                        {st !== 'Posted' && (
                          <button
                            onClick={() => {
                              const nextStage = contentStages[contentStages.indexOf(st) + 1];
                              if (nextStage) updateContentStage(item.id, nextStage);
                            }}
                            title="Move to next stage"
                            className="p-1 text-brand hover:bg-brand-subtle rounded-btn"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Calendar View of Content */
        <Card className="p-5">
          <div className="space-y-3">
            {contentItems.map((c) => (
              <div key={c.id} className="p-3.5 rounded-btn border border-border flex items-center justify-between hover:bg-surface-subtle transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-subtle text-brand rounded-btn">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-text-main">{c.name}</h5>
                    <span className="text-[11px] text-text-subtle">{c.projectName} • {c.format}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="neutral">{c.stage}</Badge>
                  <span className="text-xs font-bold text-text-main">{formatDate(c.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Embedded Content Production & Reach Analytics */}
      <ContentAnalytics />
    </div>
  );
}
