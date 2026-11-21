'use client';

import React, { useEffect, useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Search, X, FolderKanban, CheckSquare, Users, Clapperboard } from 'lucide-react';

export function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    projects,
    tasks,
    leads,
    contentItems,
    setCurrentView,
  } = useWorkspaceStore();

  const [term, setTerm] = useState('');

  // Handle Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProjects = term
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(term.toLowerCase()) ||
          p.clientName.toLowerCase().includes(term.toLowerCase())
      )
    : projects.slice(0, 3);

  const filteredTasks = term
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(term.toLowerCase()) ||
          t.projectName.toLowerCase().includes(term.toLowerCase())
      )
    : tasks.slice(0, 3);

  const filteredLeads = term
    ? leads.filter((l) => l.name.toLowerCase().includes(term.toLowerCase()))
    : leads.slice(0, 2);

  const filteredContent = term
    ? contentItems.filter((c) => c.name.toLowerCase().includes(term.toLowerCase()))
    : contentItems.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-[#e4e5ec] overflow-hidden">
        {/* Search Input Box */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#e4e5ec]">
          <Search className="w-5 h-5 text-[#8e91a0]" />
          <input
            type="text"
            placeholder="Type to search projects, tasks, leads, creatives..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            autoFocus
            className="flex-1 text-sm bg-transparent outline-none text-[#20222c] placeholder-[#8e91a0]"
          />
          {term && (
            <button onClick={() => setTerm('')} className="text-[#8e91a0] hover:text-[#20222c]">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-mono text-[#8e91a0] bg-[#f7f8fa] border border-[#e4e5ec] rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8e91a0]">
                Projects
              </div>
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentView('projects');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-lg hover:bg-[#f7f6fa] group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderKanban className="w-4 h-4 text-[#7040cd]" />
                      <span className="font-semibold text-[#20222c]">{p.name}</span>
                      <span className="text-xs text-[#727583]">({p.clientName})</span>
                    </div>
                    <span className="text-xs text-[#8e91a0] group-hover:text-[#7040cd]">Jump →</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8e91a0]">
                Tasks
              </div>
              <div className="space-y-1">
                {filteredTasks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setCurrentView('calendar');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-lg hover:bg-[#f7f6fa] group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckSquare className="w-4 h-4 text-[#3b82f6]" />
                      <span className="text-[#20222c] truncate">{t.title}</span>
                    </div>
                    <span className="text-xs text-[#8e91a0]">{t.due}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leads */}
          {filteredLeads.length > 0 && (
            <div>
              <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8e91a0]">
                Leads / Contacts
              </div>
              <div className="space-y-1">
                {filteredLeads.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setCurrentView('crm');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-lg hover:bg-[#f7f6fa] group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-[#10b981]" />
                      <span className="font-medium text-[#20222c]">{l.name}</span>
                      <span className="text-xs text-[#727583]">({l.projectName})</span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#f3f1f6] text-[#727583]">
                      {l.stage}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {filteredContent.length > 0 && (
            <div>
              <div className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8e91a0]">
                Creatives & Content
              </div>
              <div className="space-y-1">
                {filteredContent.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCurrentView('content');
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-lg hover:bg-[#f7f6fa] group transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clapperboard className="w-4 h-4 text-[#8b5cf6]" />
                      <span className="font-medium text-[#20222c]">{c.name}</span>
                    </div>
                    <span className="text-xs text-[#727583]">{c.format}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
