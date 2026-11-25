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
  commissionBookings as initialCommissionBookings,
  clientMetaAdFunds as initialMetaAdFunds,
  initialFinanceAuditLogs,
  CommissionBookingRecord,
  ClientMetaAdFundRecord,
  FinanceAuditEntry,
  PeriodFilter,
  BusinessLineFilter,
} from '@/data';

export interface WorkspaceState {
  // Navigation & Role
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  currentRole: RoleView;
  setCurrentRole: (role: RoleView) => void;
  scopedDeveloperClient: string;
  setScopedDeveloperClient: (clientName: string) => void;

  // Global Dashboard Filters
  periodFilter: PeriodFilter;
  setPeriodFilter: (period: PeriodFilter) => void;
  businessLineFilter: BusinessLineFilter;
  setBusinessLineFilter: (line: BusinessLineFilter) => void;

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
  commissionBookings: CommissionBookingRecord[];
  metaAdFunds: ClientMetaAdFundRecord[];
  financeAuditLogs: FinanceAuditEntry[];

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
  syncCommissionBooking: (input: {
    client: string;
    project: string;
    bookingId: string;
    leadRef: string;
    unit: string;
    dealValue: number;
    dueDate: string;
  }) => { deduplicated: boolean };
  recordCommissionReceipt: (id: string, receiptAmount: number, actor: string) => void;
  recordPaymentReceipt: (id: string, receiptAmount: number, actor: string) => void;

  // Reset to Factory Seed
  resetToDefaults: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      // Navigation & Role Defaults
      currentView: 'overview',
      setCurrentView: (view) => set({ currentView: view }),
      currentRole: 'Founder',
      setCurrentRole: (role) => set({ currentRole: role }),
      scopedDeveloperClient: 'Shakti Group',
      setScopedDeveloperClient: (clientName) => set({ scopedDeveloperClient: clientName }),

      // Global Dashboard Filters
      periodFilter: 'This month',
      setPeriodFilter: (period) => set({ periodFilter: period }),
      businessLineFilter: 'All',
      setBusinessLineFilter: (line) => set({ businessLineFilter: line }),

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
      commissionBookings: initialCommissionBookings,
      metaAdFunds: initialMetaAdFunds,
      financeAuditLogs: initialFinanceAuditLogs,

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

      // 0.4% Commission Sync (Deduplicated by Project + Booking ID)
      syncCommissionBooking: (input) => {
        const normalizedKey = `${input.project.trim().toLowerCase()}::${input.bookingId.trim().toLowerCase()}`;
        const existing = get().commissionBookings.find(
          (c) => `${c.project.trim().toLowerCase()}::${c.bookingId.trim().toLowerCase()}` === normalizedKey
        );
        const nowLabel = new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        if (existing) {
          set((state) => ({
            commissionBookings: state.commissionBookings.map((c) =>
              c.id === existing.id ? { ...c, syncCount: c.syncCount + 1 } : c
            ),
            financeAuditLogs: [
              {
                id: `aud-${Date.now()}`,
                timestamp: nowLabel,
                actor: state.currentRole,
                action: 'Duplicate Booking Sync Ignored',
                target: `${existing.project} · ${existing.bookingId}`,
                details: `Sync #${existing.syncCount + 1} received for ₹${input.dealValue.toLocaleString('en-IN')} deal; commission preserved at ₹${existing.commissionAmount.toLocaleString('en-IN')} (1x counted).`,
              },
              ...state.financeAuditLogs,
            ],
          }));
          return { deduplicated: true };
        }

        const commissionAmount = Math.round(input.dealValue * 0.004);
        const newRecord: CommissionBookingRecord = {
          id: `com-${Date.now()}`,
          client: input.client,
          project: input.project,
          bookingId: input.bookingId.trim(),
          leadRef: input.leadRef.trim() || 'GN-LEAD-NEW',
          unit: input.unit.trim() || 'Unit TBD',
          bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          dealValue: input.dealValue,
          commissionRate: 0.004,
          commissionAmount,
          receiptEntered: 0,
          pendingAmount: commissionAmount,
          dueDate: input.dueDate || '30 Nov 2026',
          stage: 'Verified / Earned',
          gruhNestSourceVerified: true,
          syncCount: 1,
        };

        set((state) => ({
          commissionBookings: [newRecord, ...state.commissionBookings],
          financeAuditLogs: [
            {
              id: `aud-${Date.now()}`,
              timestamp: nowLabel,
              actor: state.currentRole,
              action: '0.4% Commission Earned',
              target: `${newRecord.project} · ${newRecord.bookingId}`,
              details: `Verified deal ₹${input.dealValue.toLocaleString('en-IN')} × 0.004 = ₹${commissionAmount.toLocaleString('en-IN')}.`,
            },
            ...state.financeAuditLogs,
          ],
        }));
        return { deduplicated: false };
      },

      // Partial / Full Commission Receipt + Auto Pending/Overdue
      recordCommissionReceipt: (id, receiptAmount, actor) =>
        set((state) => {
          const target = state.commissionBookings.find((c) => c.id === id);
          if (!target || receiptAmount <= 0) return state;
          const nextReceived = Math.min(target.commissionAmount, target.receiptEntered + receiptAmount);
          const nextPending = Math.max(0, target.commissionAmount - nextReceived);
          const nextStage: CommissionBookingRecord['stage'] =
            nextPending === 0 ? 'Paid' : target.stage === 'Overdue' ? 'Overdue' : 'Part-Paid';
          const nowLabel = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return {
            commissionBookings: state.commissionBookings.map((c) =>
              c.id === id
                ? {
                    ...c,
                    receiptEntered: nextReceived,
                    pendingAmount: nextPending,
                    stage: nextStage,
                  }
                : c
            ),
            financeAuditLogs: [
              {
                id: `aud-${Date.now()}`,
                timestamp: nowLabel,
                actor,
                action: nextPending === 0 ? 'Commission Settled' : 'Partial Receipt Recorded',
                target: `${target.project} · ${target.bookingId}`,
                details: `Added receipt ₹${receiptAmount.toLocaleString('en-IN')}; total received ₹${nextReceived.toLocaleString('en-IN')}, pending ₹${nextPending.toLocaleString('en-IN')}.`,
              },
              ...state.financeAuditLogs,
            ],
          };
        }),

      // Partial / Full Invoice Payment Receipt
      recordPaymentReceipt: (id, receiptAmount, actor) =>
        set((state) => {
          const target = state.payments.find((p) => p.id === id);
          if (!target || receiptAmount <= 0) return state;
          const nextPaid = Math.min(target.amount, target.paidAmount + receiptAmount);
          const nextStatus: PaymentRecord['status'] =
            nextPaid >= target.amount ? 'Paid' : target.status === 'Overdue' ? 'Overdue' : 'Part paid';
          const nowLabel = new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return {
            payments: state.payments.map((p) =>
              p.id === id ? { ...p, paidAmount: nextPaid, status: nextStatus } : p
            ),
            financeAuditLogs: [
              {
                id: `aud-${Date.now()}`,
                timestamp: nowLabel,
                actor,
                action: 'Invoice Receipt Entered',
                target: `${target.invoiceNo} · ${target.projectName}`,
                details: `Received ₹${receiptAmount.toLocaleString('en-IN')}; balance ₹${(target.amount - nextPaid).toLocaleString('en-IN')}.`,
              },
              ...state.financeAuditLogs,
            ],
          };
        }),

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
          commissionBookings: initialCommissionBookings,
          metaAdFunds: initialMetaAdFunds,
          financeAuditLogs: initialFinanceAuditLogs,
        }),
    }),
    {
      name: 'bim-workspace-storage-v3',
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
        scopedDeveloperClient: state.scopedDeveloperClient,
        activeThemePreset: state.activeThemePreset,
        projects: state.projects,
        tasks: state.tasks,
        leads: state.leads,
        contentItems: state.contentItems,
        approvalItems: state.approvalItems,
        payments: state.payments,
        commissionBookings: state.commissionBookings,
        financeAuditLogs: state.financeAuditLogs,
      }),
    }
  )
);
