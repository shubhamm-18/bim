'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Clapperboard, Plus, Video, Calendar, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { ContentStage, ContentFormat } from '@/types';
import { formatDate } from '@/lib/utils';

const stages: ContentStage[] = ['Idea', 'Script', 'Shoot', 'Edit', 'Approval', 'Ready to post', 'Posted'];

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
    });

    setName('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20222c]">Content Studio</h1>
          <p className="text-xs text-[#8e91a0]">
            Architectural walkthroughs, developer podcasts, reels, and script-to-screen pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-[#f0f1f5] rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'board' ? 'bg-white text-[#7040cd] shadow-sm' : 'text-[#727583]'
              }`}
            >
              Stage Board
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'calendar' ? 'bg-white text-[#7040cd] shadow-sm' : 'text-[#727583]'
              }`}
            >
              Calendar
            </button>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-[#7040cd] hover:bg-[#5e35ce] text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Creative</span>
          </button>
        </div>
      </div>

      {/* Add Creative Inline Card */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="p-5 bg-white rounded-2xl border border-[#7040cd]/40 shadow-md space-y-4 animate-fade-in">
          <h4 className="text-sm font-bold text-[#20222c]">Add New Content Production Item</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              placeholder="e.g. Skyline 3BHK Cinematic Reel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3.5 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none"
            />
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as ContentFormat)}
              className="px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
            >
              <option value="Walkthrough">Walkthrough</option>
              <option value="Explainer">Developer Explainer</option>
              <option value="Shoot">On-Site Shoot</option>
              <option value="Edit">Reel / Video Cut</option>
              <option value="Script">Script Drafting</option>
              <option value="Podcast">Podcast Episode</option>
            </select>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="px-3 py-2 text-xs border border-[#e4e5ec] rounded-xl outline-none bg-white font-medium"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-[#727583]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#7040cd] rounded-xl"
            >
              Save Item
            </button>
          </div>
        </form>
      )}

      {/* Kanban Board of Stages */}
      {activeTab === 'board' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto pb-4">
          {stages.map((st) => {
            const itemsInStage = contentItems.filter((c) => c.stage === st);
            return (
              <div key={st} className="bg-[#f7f8fa] p-3 rounded-2xl border border-[#e4e5ec] min-w-[200px] flex flex-col">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e4e5ec]">
                  <span className="text-xs font-bold text-[#20222c]">{st}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white border border-[#e4e5ec] text-[#7040cd]">
                    {itemsInStage.length}
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  {itemsInStage.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-xl border border-[#e4e5ec] shadow-sm hover:border-[#7040cd]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-[#7040cd] block">{item.format}</span>
                        <h5 className="text-xs font-bold text-[#20222c] mt-0.5">{item.name}</h5>
                        <p className="text-[10px] text-[#8e91a0] mt-1">{item.projectName}</p>
                      </div>

                      <div className="pt-2 mt-2 border-t border-[#f0f1f5] flex items-center justify-between">
                        <span className="text-[10px] text-[#8e91a0]">{formatDate(item.date)}</span>
                        {st !== 'Posted' && (
                          <button
                            onClick={() => {
                              const nextStage = stages[stages.indexOf(st) + 1];
                              if (nextStage) updateContentStage(item.id, nextStage);
                            }}
                            title="Move to next stage"
                            className="p-1 text-[#7040cd] hover:bg-[#efeafb] rounded"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Calendar View of Content */
        <div className="bg-white rounded-2xl border border-[#e4e5ec] p-5 shadow-sm">
          <div className="space-y-3">
            {contentItems.map((c) => (
              <div key={c.id} className="p-3.5 rounded-xl border border-[#e4e5ec] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#efeafb] text-[#7040cd] rounded-xl">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#20222c]">{c.name}</h5>
                    <span className="text-[11px] text-[#8e91a0]">{c.projectName} • {c.format}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f3f1f6] text-[#727583]">
                    {c.stage}
                  </span>
                  <span className="text-xs font-bold text-[#20222c]">{formatDate(c.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
