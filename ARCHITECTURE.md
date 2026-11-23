# 🏗️ Beyond Imagine Media (BIM) — Enterprise Workspace Architecture

This project is structured according to **modern industry standards** for enterprise Next.js 15 (App Router) applications. It is strictly modular, allowing you to edit a **particular file for a particular purpose** with zero side effects.

---

## 🗂️ Project Directory Map

```text
src/
├── app/                        # 🌐 Next.js 15 App Router (Routes & Metadata)
│   ├── layout.tsx              # Root HTML shell, SEO metadata, AppShell provider
│   ├── globals.css             # CSS design tokens, CSS variables & resets
│   ├── error.tsx               # Production error boundary
│   ├── not-found.tsx           # 404 Not Found screen
│   ├── page.tsx                # / (Agency Dashboard)
│   ├── projects/page.tsx       # /projects (Client Projects)
│   ├── calendar/page.tsx       # /calendar (Tasks & Calendar)
│   ├── approvals/page.tsx      # /approvals (Creative Approval Board)
│   ├── content/page.tsx        # /content (Content Studio Pipeline)
│   ├── advertising/page.tsx    # /advertising (Paid Ad Campaigns)
│   ├── crm/page.tsx            # /crm (Buyer Lead Funnel & CRM)
│   ├── gruhnest/page.tsx       # /gruhnest (Property Media & Listings)
│   ├── compare/page.tsx        # /compare (Side-by-Side Project Comparison)
│   ├── payments/page.tsx       # /payments (Financial Ledger & Retainers)
│   └── templates/page.tsx      # /templates (Project Launch Blueprints)
│
├── config/                     # ⚙️ Dedicated Configuration Modules
│   ├── site.config.ts          # Branding, agency name, tagline, SEO meta, copyright
│   ├── navigation.config.ts    # Sidebar navigation items, groups, icons, badges
│   ├── theme.config.ts         # Color themes (Ruby, Violet, Sapphire, Emerald, Slate)
│   ├── agency.config.ts        # Business roles, stages, statuses, currencies, cities
│   └── index.ts                # Central configuration barrel export
│
├── data/                       # 📊 Seed & Mock Datasets (Edit data directly here!)
│   ├── clients.data.ts         # Developer client accounts
│   ├── projects.data.ts        # Real estate project mandates
│   ├── tasks.data.ts           # Cross-functional team deliverables
│   ├── leads.data.ts           # Property buyer inquiries & stages
│   ├── campaigns.data.ts       # Meta & Google performance ad campaigns
│   ├── content.data.ts         # Walkthrough reels, scripts & production assets
│   ├── approvals.data.ts       # Creative sign-off requests
│   ├── payments.data.ts        # Retainers, milestone billings & invoices
│   ├── properties.data.ts      # Gruhnest property media profiles
│   ├── templates.data.ts       # Starter package templates
│   └── index.ts                # Central data barrel export
│
├── components/                 # 🧱 UI & Domain Component Library
│   ├── ui/                     # Universal Atomic UI Primitives
│   │   ├── Button.tsx          # Buttons with variants (brand, secondary, ghost, danger)
│   │   ├── Card.tsx            # Cards with CardHeader, CardTitle, CardDescription
│   │   ├── Badge.tsx           # Semantic badges (brand, success, warning, danger)
│   │   ├── Input.tsx           # Form inputs & textareas
│   │   ├── Select.tsx          # Form select dropdowns
│   │   ├── Modal.tsx           # Accessible backdrop dialog modals
│   │   ├── StatCard.tsx        # KPI Metric cards with trend indicators
│   │   ├── Tabs.tsx            # Segmented tabs and pill switches
│   │   ├── Table.tsx           # Composable data table primitives
│   │   ├── EmptyState.tsx      # Zero-state placeholder with call-to-action
│   │   └── ThemeSelector.tsx   # Instant UI color theme switcher
│   ├── layout/                 # Layout Shell & Navigation
│   │   ├── AppShell.tsx        # Master layout wrapper (Sidebar + Topbar + Modals)
│   │   ├── Sidebar.tsx         # Responsive sidebar with dynamic navigation config
│   │   ├── Topbar.tsx          # Dynamic breadcrumbs, search (⌘K), role switcher
│   │   ├── MobileNav.tsx       # Mobile drawer for smartphone & tablet screens
│   │   ├── SearchModal.tsx     # ⌘K Command palette search
│   │   └── FilterDrawer.tsx    # Slide-over client filter drawer
│   ├── modals/                 # Global Entity Creation Modals
│   │   ├── NewProjectModal.tsx # "Create New Project" modal
│   │   ├── NewTaskModal.tsx    # "Add New Task" modal
│   │   └── NewLeadModal.tsx    # "Log New Lead" modal
│   ├── features/               # Modular Feature Components
│   │   ├── overview/           # OverviewHero, OverviewMetrics, TaskPrioritySection
│   │   └── projects/           # ProjectCard, ClientAccountCard
│   └── views/                  # Primary View Assemblies
│       ├── DashboardView.tsx
│       ├── ProjectsView.tsx
│       ├── CalendarView.tsx
│       ├── ApprovalsView.tsx
│       ├── ContentStudioView.tsx
│       ├── AdvertisingView.tsx
│       ├── CrmView.tsx
│       ├── GruhnestView.tsx
│       ├── CompareView.tsx
│       ├── PaymentsView.tsx
│       └── TemplatesView.tsx
│
├── store/                      # 🧠 State Management & Persistence
│   └── workspace-store.ts      # Zustand store with LocalStorage persistence
│
├── types/                      # 🏷️ Strongly Typed Domain Interfaces
│   ├── common.types.ts         # BaseEntity, RoleView, NavView
│   ├── project.types.ts        # Client, Project, ProjectTemplate
│   ├── task.types.ts           # Task, PriorityLevel, TaskStatus
│   ├── crm.types.ts            # Lead, LeadStage, AcquisitionSource
│   ├── content.types.ts        # ContentItem, ContentFormat, ContentStage
│   ├── marketing.types.ts      # Campaign, AdPlatform, CampaignStatus
│   ├── finance.types.ts        # PaymentRecord, PaymentStatus
│   ├── property.types.ts       # PropertyProfile, SampleFlatStatus
│   ├── approval.types.ts       # ApprovalItem, ApprovalStatus
│   └── index.ts                # Central types barrel export
│
└── lib/                        # 🛠️ Universal Helpers & Utilities
    └── utils.ts                # cn(), formatCurrency(), formatDate(), getTodayFormatted()
```

---

## 🎯 Quick Reference: "How do I change...?"

| What you want to change | Which file to edit |
|:---|:---|
| **Agency Brand Name, Tagline, SEO Metadata** | `src/config/site.config.ts` |
| **Sidebar Menu Items, Icons, or Navigation Links** | `src/config/navigation.config.ts` |
| **Color Schemes, Theme Presets, or Hero Backgrounds** | `src/config/theme.config.ts` or `src/app/globals.css` |
| **Business Roles, Pipeline Stages, or Currencies** | `src/config/agency.config.ts` |
| **Initial / Sample Projects** | `src/data/projects.data.ts` |
| **Initial / Sample Leads** | `src/data/leads.data.ts` |
| **Initial / Sample Tasks** | `src/data/tasks.data.ts` |
| **Initial / Sample Ad Campaigns** | `src/data/campaigns.data.ts` |
| **Initial / Sample Invoices & Payments** | `src/data/payments.data.ts` |
| **Initial / Sample Content Studio Items** | `src/data/content.data.ts` |
| **Dashboard Hero Banner Component** | `src/components/features/overview/OverviewHero.tsx` |
| **Dashboard Metrics (KPI Cards)** | `src/components/features/overview/OverviewMetrics.tsx` |
| **Project Card UI** | `src/components/features/projects/ProjectCard.tsx` |
| **Buttons, Inputs, Cards, Badges, Modals** | `src/components/ui/` |
| **Add a New Route/Page** | Add a folder in `src/app/<route-name>/page.tsx` and register in `navigation.config.ts` |

---

## 🚀 Running the Production App

```bash
# Start local development server with clean cache
npm run dev

# Build optimized production bundle
npm run build

# Start production server
npm start
```
