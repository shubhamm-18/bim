'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { UserPlus } from 'lucide-react';
import { LeadStage } from '@/types';
import { agencyConfig } from '@/config/agency.config';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export function NewLeadModal() {
  const {
    isNewLeadModalOpen,
    setIsNewLeadModalOpen,
    projects,
    addLead,
  } = useWorkspaceStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [source, setSource] = useState<string>(agencyConfig.acquisitionSources[0]);
  const [stage, setStage] = useState<LeadStage>('New lead');
  const [notes, setNotes] = useState('');
  const [expectedValue, setExpectedValue] = useState(7500000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const proj = projects.find((p) => p.id === projectId) || projects[0];

    addLead({
      name,
      phone,
      email,
      projectId: proj.id,
      projectName: proj.name,
      source,
      stage,
      notes,
      expectedValue,
    });

    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setIsNewLeadModalOpen(false);
  };

  return (
    <Modal
      isOpen={isNewLeadModalOpen}
      onClose={() => setIsNewLeadModalOpen(false)}
      title="Log New Property Lead"
      description="Track prospective home buyer inquiry & site visit"
      icon={<UserPlus className="w-5 h-5 text-text-muted" />}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Contact Name</label>
            <Input
              required
              placeholder="e.g. Ramesh Shah"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Phone Number</label>
            <Input
              type="tel"
              required
              placeholder="+91 98250 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Interested Project</label>
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
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Acquisition Source</label>
            <Select
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              {agencyConfig.acquisitionSources.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Pipeline Stage</label>
            <Select
              value={stage}
              onChange={(e) => setStage(e.target.value as LeadStage)}
            >
              {agencyConfig.leadStages.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">
              Expected Budget / Deal ({agencyConfig.locale.currencySymbol})
            </label>
            <Input
              type="number"
              step="500000"
              value={expectedValue}
              onChange={(e) => setExpectedValue(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-main mb-1.5">Requirement Notes</label>
          <textarea
            rows={2}
            placeholder="e.g. 3BHK East-facing, needs loan assistance"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-surface-input border border-border rounded-input text-xs text-text-main px-3.5 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all placeholder:text-text-subtle"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsNewLeadModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Add Lead to CRM
          </Button>
        </div>
      </form>
    </Modal>
  );
}
