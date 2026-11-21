import { create } from 'zustand';
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

interface WorkspaceState {
  // Navigation & Role
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  currentRole: RoleView;
  setCurrentRole: (role: RoleView) => void;

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
}

const initialClients: Client[] = [
  {
    id: 'client-shakti',
    name: 'Shakti Group',
    tag: 'sh',
    scope: 'Developer personal branding and project marketing',
    deliverables: 'Podcast clips, reels, project campaigns and lead follow-up',
    owner: 'Project Management',
    activeProjectsCount: 1,
  },
  {
    id: 'client-sun',
    name: 'Sun Creators',
    tag: 'su',
    scope: 'Multi-project content and advertising',
    deliverables: 'Project films, lead creatives, ad campaigns and reporting',
    owner: 'Ads/Performance',
    activeProjectsCount: 3,
  },
  {
    id: 'client-gruhnest',
    name: 'Gruhnest',
    tag: 'gn',
    scope: 'Property media & listings marketplace',
    deliverables: 'Walkthroughs, explainers, sample-flat media, developer profiles',
    owner: 'Developer',
    activeProjectsCount: 1,
  },
];

const initialProjects: Project[] = [
  {
    id: 'proj-1',
    clientId: 'client-shakti',
    clientName: 'Shakti Group',
    name: 'Shakti Skyline',
    city: 'Vapi',
    status: 'Active',
    infoStatus: 'Tentative',
    template: 'Full Launch',
    budget: 450000,
    spend: 210000,
    leadsCount: 184,
    siteVisitsCount: 6,
    bookingsCount: 2,
    startDate: '2026-09-01',
  },
  {
    id: 'proj-2',
    clientId: 'client-sun',
    clientName: 'Sun Creators',
    name: 'Sun Imperia',
    city: 'Vapi',
    status: 'Active',
    infoStatus: 'Tentative',
    template: '360 Media',
    budget: 600000,
    spend: 380000,
    leadsCount: 242,
    siteVisitsCount: 4,
    bookingsCount: 1,
    startDate: '2026-08-15',
  },
  {
    id: 'proj-3',
    clientId: 'client-sun',
    clientName: 'Sun Creators',
    name: 'Sun Residency 4',
    city: 'Vapi',
    status: 'Active',
    infoStatus: 'Tentative',
    template: 'Performance',
    budget: 350000,
    spend: 140000,
    leadsCount: 110,
    siteVisitsCount: 2,
    bookingsCount: 0,
    startDate: '2026-10-01',
  },
  {
    id: 'proj-4',
    clientId: 'client-sun',
    clientName: 'Sun Creators',
    name: 'Sun Centrica',
    city: 'Vapi',
    status: 'Active',
    infoStatus: 'Tentative',
    template: 'Commercial',
    budget: 500000,
    spend: 95000,
    leadsCount: 78,
    siteVisitsCount: 1,
    bookingsCount: 0,
    startDate: '2026-10-20',
  },
  {
    id: 'proj-5',
    clientId: 'client-gruhnest',
    clientName: 'Gruhnest',
    name: 'Vapi buyer guide',
    city: 'Vapi',
    status: 'Planning',
    infoStatus: 'Tentative',
    template: 'Property Media',
    budget: 150000,
    spend: 25000,
    leadsCount: 45,
    siteVisitsCount: 0,
    bookingsCount: 0,
    startDate: '2026-11-10',
  },
];

const initialTasks: Task[] = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    title: 'Confirm tower-wise possession dates with engineering team',
    due: '2026-11-15',
    status: 'Open',
    priority: 'Urgent',
    role: 'Project Management',
    recurrence: 'None',
  },
  {
    id: 'task-2',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    title: 'Review the next campaign creative & hook scripts',
    due: '2026-11-16',
    status: 'Open',
    priority: 'High',
    role: 'Ads/Performance',
    recurrence: 'Weekly',
  },
  {
    id: 'task-3',
    projectId: 'proj-3',
    projectName: 'Sun Residency 4',
    title: 'Confirm launch invitation approval with developer lead',
    due: '2026-11-17',
    status: 'Open',
    priority: 'High',
    role: 'Founder',
    recurrence: 'None',
  },
  {
    id: 'task-4',
    projectId: 'proj-4',
    projectName: 'Sun Centrica',
    title: 'Verify commercial floor inventory and availability list',
    due: '2026-11-18',
    status: 'Open',
    priority: 'Medium',
    role: 'Developer',
    recurrence: 'None',
  },
  {
    id: 'task-5',
    projectId: 'proj-5',
    projectName: 'Vapi buyer guide',
    title: 'Shortlist properties for the first video walkthrough',
    due: '2026-11-19',
    status: 'Open',
    priority: 'Medium',
    role: 'Video',
    recurrence: 'None',
  },
  {
    id: 'task-6',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    title: 'Record founder interview on site & milestone reel',
    due: '2026-11-23',
    status: 'Open',
    priority: 'Medium',
    role: 'Content',
    recurrence: 'None',
  },
  {
    id: 'task-7',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    title: 'Optimize Meta ad audiences targeting high-intent investors',
    due: '2026-11-24',
    status: 'Open',
    priority: 'High',
    role: 'Ads/Performance',
    recurrence: 'Weekly',
  },
  {
    id: 'task-8',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    title: 'Update monthly performance analytics summary deck',
    due: '2026-11-26',
    status: 'Open',
    priority: 'Low',
    role: 'Project Management',
    recurrence: 'Monthly',
  },
];

const initialContentItems: ContentItem[] = [
  {
    id: 'cnt-1',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    name: 'Skyline Architecture Walkthrough',
    format: 'Walkthrough',
    service: 'Gruhnest',
    stage: 'Approval',
    date: '2026-11-21',
    owner: 'Content Team',
  },
  {
    id: 'cnt-2',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    name: 'Sample Flat 3BHK Cinematic Tour',
    format: 'Shoot',
    service: 'Content',
    stage: 'Approval',
    date: '2026-11-22',
    owner: 'Video Production',
  },
  {
    id: 'cnt-3',
    projectId: 'proj-3',
    projectName: 'Sun Residency 4',
    name: 'Exclusive Diwali Offer Reel',
    format: 'Ready to post',
    service: 'Advertising',
    stage: 'Ready to post',
    date: '2026-11-24',
    owner: 'Ads/Performance',
  },
  {
    id: 'cnt-4',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    name: 'Developer Interview: Crafting Skyline',
    format: 'Script',
    service: 'Content',
    stage: 'Script',
    date: '2026-11-25',
    owner: 'Content Team',
  },
  {
    id: 'cnt-5',
    projectId: 'proj-5',
    projectName: 'Vapi buyer guide',
    name: 'Top 5 Emerging Localities in Vapi 2026',
    format: 'Explainer',
    service: 'Gruhnest',
    stage: 'Idea',
    date: '2026-11-28',
    owner: 'Editorial',
  },
];

const initialCampaigns: Campaign[] = [
  {
    id: 'cmp-1',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    name: 'Skyline Luxury 3BHK Launch',
    platform: 'Meta',
    budget: 200000,
    spend: 145000,
    impressions: 480000,
    leads: 184,
    siteVisits: 6,
    status: 'Active',
    startDate: '2026-10-01',
  },
  {
    id: 'cmp-2',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    name: 'Imperia Prime Resident Outreach',
    platform: 'Google',
    budget: 250000,
    spend: 190000,
    impressions: 310000,
    leads: 140,
    siteVisits: 4,
    status: 'Active',
    startDate: '2026-09-15',
  },
  {
    id: 'cmp-3',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    name: 'Instagram High-Net-Worth Retargeting',
    platform: 'Meta',
    budget: 150000,
    spend: 110000,
    impressions: 220000,
    leads: 102,
    siteVisits: 3,
    status: 'Active',
    startDate: '2026-10-10',
  },
  {
    id: 'cmp-4',
    projectId: 'proj-3',
    projectName: 'Sun Residency 4',
    name: 'Affordable Living Series',
    platform: 'Meta',
    budget: 100000,
    spend: 60000,
    impressions: 140000,
    leads: 75,
    siteVisits: 2,
    status: 'Optimizing',
    startDate: '2026-10-25',
  },
];

const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    name: 'Rajesh Patel',
    phone: '+91 98250 11234',
    email: 'rajesh.patel@gmail.com',
    stage: 'Visit booked',
    source: 'Meta Ads',
    createdAt: '2026-11-18',
    siteVisitDate: '2026-11-23',
    notes: 'Interested in 14th floor east-facing 3BHK',
    expectedValue: 8500000,
  },
  {
    id: 'lead-2',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    name: 'Anand Sharma',
    phone: '+91 94268 77890',
    email: 'anand.sharma@yahoo.com',
    stage: 'Qualified',
    source: 'Google Search',
    createdAt: '2026-11-19',
    notes: 'Looking for ready possession or within 6 months',
    expectedValue: 6200000,
  },
  {
    id: 'lead-3',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    name: 'Kavita Desai',
    phone: '+91 98980 44521',
    stage: 'Contacted',
    source: 'Walk-in Referral',
    createdAt: '2026-11-20',
    notes: 'Needs floor plan sent on WhatsApp',
    expectedValue: 9000000,
  },
  {
    id: 'lead-4',
    projectId: 'proj-4',
    projectName: 'Sun Centrica',
    name: 'Mehta Logistics (Commercial)',
    phone: '+91 98790 33211',
    stage: 'Visit completed',
    source: 'LinkedIn Campaign',
    createdAt: '2026-11-12',
    siteVisitDate: '2026-11-16',
    notes: 'Inquired about 2200 sqft ground showroom',
    expectedValue: 14000000,
  },
  {
    id: 'lead-5',
    projectId: 'proj-3',
    projectName: 'Sun Residency 4',
    name: 'Suresh Vora',
    phone: '+91 94271 88992',
    stage: 'Booked',
    source: 'Meta Ads',
    createdAt: '2026-11-05',
    siteVisitDate: '2026-11-10',
    notes: 'Token advance ₹51,000 received for Unit B-402',
    expectedValue: 4800000,
  },
];

const initialPropertyProfiles: PropertyProfile[] = [
  {
    id: 'prop-1',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    developer: 'Shakti Group',
    city: 'Vapi (Chala)',
    towerPossession: 'Dec 2027 (Tower A & B)',
    sampleFlatStatus: 'Ready',
    totalInventory: 140,
    availableInventory: 48,
    startingPrice: '₹75 Lakhs',
    walkthroughAssetStatus: 'Delivered',
    explainerAssetStatus: 'Scheduled',
    expectedDealValue: 8000000,
    commissionRatePercent: 2.5,
  },
  {
    id: 'prop-2',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    developer: 'Sun Creators',
    city: 'Vapi (Gunjan)',
    towerPossession: 'June 2027',
    sampleFlatStatus: 'Ready',
    totalInventory: 96,
    availableInventory: 22,
    startingPrice: '₹58 Lakhs',
    walkthroughAssetStatus: 'Delivered',
    explainerAssetStatus: 'Delivered',
    expectedDealValue: 6200000,
    commissionRatePercent: 2.0,
  },
  {
    id: 'prop-3',
    projectId: 'proj-4',
    projectName: 'Sun Centrica',
    developer: 'Sun Creators',
    city: 'Vapi (NH48 Highway)',
    towerPossession: 'March 2028',
    sampleFlatStatus: 'Under Construction',
    totalInventory: 64,
    availableInventory: 45,
    startingPrice: '₹95 Lakhs',
    walkthroughAssetStatus: 'In Production',
    explainerAssetStatus: 'Pending',
    expectedDealValue: 12000000,
    commissionRatePercent: 3.0,
  },
];

const initialApprovalItems: ApprovalItem[] = [
  {
    id: 'app-1',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    title: 'Skyline Architecture Walkthrough Video (Final Cut)',
    kind: 'Video Cut',
    submittedBy: 'Kunal (Lead Editor)',
    submittedAt: '2026-11-20',
    status: 'Pending',
    commentsCount: 3,
  },
  {
    id: 'app-2',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    title: 'Meta Festive Ad Creative Carousel & Copy',
    kind: 'Ad Creative',
    submittedBy: 'Pooja (Performance Marketing)',
    submittedAt: '2026-11-21',
    status: 'Pending',
    commentsCount: 1,
  },
];

const initialPayments: PaymentRecord[] = [
  {
    id: 'pay-1',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    invoiceNo: 'INV-2026-089',
    description: 'October Retainer & Video Production Fee',
    amount: 150000,
    paidAmount: 75000,
    status: 'Part paid',
    dueDate: '2026-11-15',
  },
  {
    id: 'pay-2',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    invoiceNo: 'INV-2026-092',
    description: 'Ad Management & Content Retainer (Nov)',
    amount: 180000,
    paidAmount: 180000,
    status: 'Paid',
    dueDate: '2026-11-10',
  },
  {
    id: 'pay-3',
    projectId: 'proj-3',
    projectName: 'Sun Residency 4',
    invoiceNo: 'INV-2026-095',
    description: 'Launch Campaign Setup & Creatives',
    amount: 95000,
    paidAmount: 0,
    status: 'Pending',
    dueDate: '2026-11-25',
  },
];

const initialTemplates: ProjectTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Full Real Estate Launch',
    category: 'Full Launch',
    description: '360° launch campaign covering teaser reels, architectural walkthroughs, lead ads, and launch day live coverage.',
    features: ['Founder Interview', 'Drone & Architectural Film', 'Meta & Google Campaign Setup', 'CRM Lead Handoff'],
  },
  {
    id: 'tmpl-2',
    name: 'High-Performance Ad Machine',
    category: 'Performance',
    description: 'Focused strictly on lead velocity, CPL optimization, and site visit booking workflows.',
    features: ['Meta Ads Funnel', 'Dynamic Retargeting', 'WhatsApp Automation', 'Weekly CPL Dashboards'],
  },
  {
    id: 'tmpl-3',
    name: 'Gruhnest Property Media Onboarding',
    category: 'Property Media',
    description: 'Standardized inventory media package for developer listing and sample-flat showcasing.',
    features: ['Sample Flat Tour', 'Location Explainer Video', 'Unit Inventory Profile', 'Deal Commission Agreement'],
  },
  {
    id: 'tmpl-4',
    name: 'Blank Custom Project',
    category: 'Custom',
    description: 'Empty workspace tailored for bespoke client requests and consulting engagements.',
    features: ['Custom Tasks', 'Milestone Invoicing', 'Flexible Team Roles'],
  },
];

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentView: 'overview',
  setCurrentView: (view) => set({ currentView: view }),
  currentRole: 'Founder',
  setCurrentRole: (role) => set({ currentRole: role }),

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

  addProject: (projectData) =>
    set((state) => ({
      projects: [
        ...state.projects,
        {
          ...projectData,
          id: `proj-${Date.now()}`,
          leadsCount: 0,
          siteVisitsCount: 0,
          bookingsCount: 0,
          spend: 0,
        },
      ],
    })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  addTask: (taskData) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...taskData,
          id: `task-${Date.now()}`,
        },
      ],
    })),

  updateTaskStatus: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  addLead: (leadData) =>
    set((state) => ({
      leads: [
        {
          ...leadData,
          id: `lead-${Date.now()}`,
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...state.leads,
      ],
    })),

  updateLeadStage: (id, stage) =>
    set((state) => ({
      leads: state.leads.map((l) => (l.id === id ? { ...l, stage } : l)),
    })),

  addContentItem: (itemData) =>
    set((state) => ({
      contentItems: [
        ...state.contentItems,
        {
          ...itemData,
          id: `cnt-${Date.now()}`,
        },
      ],
    })),

  updateContentStage: (id, stage) =>
    set((state) => ({
      contentItems: state.contentItems.map((c) => (c.id === id ? { ...c, stage } : c)),
    })),

  updateApprovalStatus: (id, status) =>
    set((state) => ({
      approvalItems: state.approvalItems.map((a) => (a.id === id ? { ...a, status } : a)),
    })),
}));
