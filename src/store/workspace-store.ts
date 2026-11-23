import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  RoleView,
  NavView,
  Client,
  Project,
  Task,
  ContentItem,
  Campaign,
  Lead,
  PropertyProfile,
  ApprovalItem,
  PaymentRecord,
  ProjectTemplate,
} from '@/types';
import {
  initialClients,
  initialProjects,
  initialTasks,
  initialLeads,
  initialCampaigns,
  initialContentItems,
  initialApprovalItems,
  initialPayments,
  initialPropertyProfiles,
  initialTemplates,
} from '@/data';

export interface WorkspaceState {
  // Navigation & Role
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  currentRole: RoleView;
  setCurrentRole: (role: RoleView) => void;

  // Active Color Theme Preset
  activeThemePreset: string;
  setActiveThemePreset: (presetId: string) => void;

  // Global UI Modals & State
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  isNewProjectModalOpen: boolean;
  setIsNewProjectModalOpen: (open: boolean) => void;
  isNewTaskModalOpen: boolean;
  setIsNewTaskModalOpen: (open: boolean) => void;
  isNewLeadModalOpen: boolean;
  setIsNewLeadModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedClientFilter: string | null;
  setSelectedClientFilter: (clientId: string | null) => void;

  // Core Data
  clients: Client[];
  projects: Project[];
  tasks: Task[];
  contentItems: ContentItem[];
  campaigns: Campaign[];
  leads: Lead[];
  propertyProfiles: PropertyProfile[];
  approvalItems: ApprovalItem[];
  payments: PaymentRecord[];
  templates: ProjectTemplate[];

  // Actions
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  deleteTask: (id: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStage: (id: string, stage: Lead['stage']) => void;
  addContentItem: (item: Omit<ContentItem, 'id'>) => void;
  updateContentStage: (id: string, stage: ContentItem['stage']) => void;
  updateApprovalStatus: (id: string, status: ApprovalItem['status']) => void;

  // Reset to Factory Seed
  resetToDefaults: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      // Navigation & Role Defaults
      currentView: 'overview',
      setCurrentView: (view) => set({ currentView: view }),
      currentRole: 'Founder',
      setCurrentRole: (role) => set({ currentRole: role }),

      // Theme Preset
      activeThemePreset: 'monochrome',
      setActiveThemePreset: (presetId) => set({ activeThemePreset: presetId }),

      // Modal Defaults
      isSearchOpen: false,
      setIsSearchOpen: (open) => set({ isSearchOpen: open }),
      isFilterOpen: false,
      setIsFilterOpen: (open) => set({ isFilterOpen: open }),
      isNewProjectModalOpen: false,
      setIsNewProjectModalOpen: (open) => set({ isNewProjectModalOpen: open }),
      isNewTaskModalOpen: false,
      setIsNewTaskModalOpen: (open) => set({ isNewTaskModalOpen: open }),
      isNewLeadModalOpen: false,
      setIsNewLeadModalOpen: (open) => set({ isNewLeadModalOpen: open }),
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedClientFilter: null,
      setSelectedClientFilter: (clientId) => set({ selectedClientFilter: clientId }),

      // Core Data Collections (Initialized from @/data)
      clients: initialClients,
      projects: initialProjects,
      tasks: initialTasks,
      contentItems: initialContentItems,
      campaigns: initialCampaigns,
      leads: initialLeads,
      propertyProfiles: initialPropertyProfiles,
      approvalItems: initialApprovalItems,
      payments: initialPayments,
      templates: initialTemplates,

      // Project Actions
      addProject: (projectData) =>
        set((state) => ({
          projects: [
            ...state.projects,
            { ...projectData, id: `proj-${Date.now()}` },
          ],
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      // Task Actions
      addTask: (taskData) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { ...taskData, id: `task-${Date.now()}` },
          ],
        })),

      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, status } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      // Lead Actions
      addLead: (leadData) =>
        set((state) => ({
          leads: [
            ...state.leads,
            {
              ...leadData,
              id: `lead-${Date.now()}`,
              createdAt: new Date().toISOString().slice(0, 10),
            },
          ],
        })),

      updateLeadStage: (id, stage) =>
        set((state) => ({
          leads: state.leads.map((l) =>
            l.id === id ? { ...l, stage } : l
          ),
        })),

      // Content Actions
      addContentItem: (itemData) =>
        set((state) => ({
          contentItems: [
            ...state.contentItems,
            { ...itemData, id: `cnt-${Date.now()}` },
          ],
        })),

      updateContentStage: (id, stage) =>
        set((state) => ({
          contentItems: state.contentItems.map((c) =>
            c.id === id ? { ...c, stage } : c
          ),
        })),

      // Approval Actions
      updateApprovalStatus: (id, status) =>
        set((state) => ({
          approvalItems: state.approvalItems.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        })),

      // Factory Reset
      resetToDefaults: () =>
        set({
          clients: initialClients,
          projects: initialProjects,
          tasks: initialTasks,
          contentItems: initialContentItems,
          campaigns: initialCampaigns,
          leads: initialLeads,
          propertyProfiles: initialPropertyProfiles,
          approvalItems: initialApprovalItems,
          payments: initialPayments,
          templates: initialTemplates,
        }),
    }),
    {
      name: 'bim-workspace-storage-v2',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({
        // Only persist data & preference state (not transient open modals)
        currentRole: state.currentRole,
        activeThemePreset: state.activeThemePreset,
        projects: state.projects,
        tasks: state.tasks,
        leads: state.leads,
        contentItems: state.contentItems,
        approvalItems: state.approvalItems,
        payments: state.payments,
      }),
    }
  )
);
