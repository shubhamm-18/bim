'use client';

import React, { useState } from 'react';
import { useWorkspaceStore } from '@/store/workspace-store';
import { Building2 } from 'lucide-react';
import { ProjectStatus, InfoStatus } from '@/types';
import { agencyConfig } from '@/config/agency.config';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export function NewProjectModal() {
  const {
    isNewProjectModalOpen,
    setIsNewProjectModalOpen,
    clients,
    templates,
    addProject,
  } = useWorkspaceStore();

  const [name, setName] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [city, setCity] = useState<string>(agencyConfig.locale.defaultCity);
  const [status, setStatus] = useState<ProjectStatus>('Active');
  const [infoStatus, setInfoStatus] = useState<InfoStatus>('Tentative');
  const [template, setTemplate] = useState(templates[0]?.name || 'Full Launch');
  const [budget, setBudget] = useState(500000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedClient = clients.find((c) => c.id === clientId) || clients[0];

    addProject({
      name,
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      city,
      status,
      infoStatus,
      template,
      budget,
      startDate: new Date().toISOString().slice(0, 10),
    });

    setName('');
    setIsNewProjectModalOpen(false);
  };

  return (
    <Modal
      isOpen={isNewProjectModalOpen}
      onClose={() => setIsNewProjectModalOpen(false)}
      title="Create New Real Estate Project"
      description="Add a project under a developer or onboarding client"
      icon={<Building2 className="w-5 h-5 text-brand" />}
    >
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-main mb-1.5">Project Name</label>
          <Input
            required
            placeholder="e.g. Skyline Heights, Sun Vista"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Client Developer</label>
            <Select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">City / Location</label>
            <Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {agencyConfig.locale.supportedCities.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Workflow Template</label>
            <Select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              {templates.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">
              Marketing Budget ({agencyConfig.locale.currencySymbol})
            </label>
            <Input
              type="number"
              step="50000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Project Status</label>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            >
              {agencyConfig.projectStatuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-main mb-1.5">Info Readiness</label>
            <Select
              value={infoStatus}
              onChange={(e) => setInfoStatus(e.target.value as InfoStatus)}
            >
              {agencyConfig.infoStatuses.map((inf) => (
                <option key={inf} value={inf}>
                  {inf}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsNewProjectModalOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="brand">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
