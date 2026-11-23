export interface AnalyticsTabConfig {
  id: string;
  label: string;
}

export const analyticsModuleTabConfigs: AnalyticsTabConfig[] = [
  { id: 'all', label: 'All Modules' },
  { id: 'overview', label: 'Overview Macro' },
  { id: 'advertising', label: 'Paid Advertising' },
  { id: 'crm', label: 'CRM & Funnel' },
  { id: 'gruhnest', label: 'Gruhnest Media' },
  { id: 'projects', label: 'Client Projects' },
  { id: 'calendar', label: 'Tasks & Velocity' },
  { id: 'content', label: 'Content Studio' },
];

export const advertisingAnalyticsData = {
  channelDistribution: [
    {
      channel: 'Meta (Instagram & FB Reels)',
      spendLabel: '₹4.5L (64%)',
      percentage: '64%',
      leadsLabel: '361 Leads (₹1,246 CPL)',
      color: 'text-text-main font-semibold',
      barColor: 'bg-zinc-400',
    },
    {
      channel: 'Google Search Ads',
      spendLabel: '₹1.9L (27%)',
      percentage: '27%',
      leadsLabel: '140 Leads (₹1,357 CPL - High Intent)',
      color: 'text-text-muted font-medium',
      barColor: 'bg-zinc-300',
    },
    {
      channel: 'LinkedIn Commercial B2B',
      spendLabel: '₹0.6L (9%)',
      percentage: '9%',
      leadsLabel: '35 Leads (₹1,714 CPL - Showrooms)',
      color: 'text-text-subtle font-medium',
      barColor: 'bg-zinc-200',
    },
  ],
  cplFatigueCurve: [
    {
      range: 'Day 1-7',
      cpl: '₹890',
      barHeight: 'h-24',
      wrapHeight: 'h-28',
      barColor: 'bg-zinc-400',
      textColor: 'text-text-main',
    },
    {
      range: 'Day 8-14',
      cpl: '₹1,050',
      barHeight: 'h-28',
      wrapHeight: 'h-36',
      barColor: 'bg-zinc-350',
      textColor: 'text-text-main',
    },
    {
      range: 'Day 15-21',
      cpl: '₹1,320',
      barHeight: 'h-34',
      wrapHeight: 'h-40',
      barColor: 'bg-zinc-300',
      textColor: 'text-text-muted',
    },
    {
      range: 'Day 22-30',
      cpl: '₹1,840',
      barHeight: 'h-42',
      wrapHeight: 'h-44',
      barColor: 'bg-zinc-250',
      textColor: 'text-text-subtle',
    },
  ],
  topBuyerGeographies: [
    {
      name: 'Vapi & Daman Industrial',
      iconColor: 'text-text-main',
      share: '46% (248 leads)',
    },
    {
      name: 'Surat Textile Hub',
      iconColor: 'text-text-muted',
      share: '28% (151 leads)',
    },
    {
      name: 'Mumbai Western Suburbs',
      iconColor: 'text-text-subtle',
      share: '18% (97 leads)',
    },
  ],
  summary: 'Meta Reels driving 71% of all primary inquiry volume.',
  demographic: '32–48 yrs (HNW Families)',
  creativeFatigueNotice: 'Creative fatigue trigger: Rotate video hooks every 18 days.',
};

export const calendarAnalyticsData = {
  sla: {
    rate: '87.5%',
    detail: '21 of 24 monthly milestones hit on schedule',
    benchmark: 'Benchmark target: 85% delivery punctuality.',
  },
  workloads: [
    { role: 'Project Management', count: '4 Tasks (Active)' },
    { role: 'Ads/Performance', count: '2 Tasks (Active)' },
    { role: 'Video & Content', count: '2 Tasks (Active)' },
  ],
  velocity: {
    days: '1.8 Days',
    detail: 'Average turnaround from task assignment to completion',
    note: '24-hr turnaround achieved on all Meta ad creative iterations.',
    progress: '✓ Overdue tasks reduced by 60% this week.',
  },
};

export const contentAnalyticsData = {
  formatSplit: [
    {
      label: 'Architectural Walkthroughs',
      percent: '40%',
      barColor: 'bg-zinc-400',
      textColor: 'text-text-main',
    },
    {
      label: 'Social Reels & Hooks',
      percent: '35%',
      barColor: 'bg-zinc-300',
      textColor: 'text-text-muted',
    },
    {
      label: 'Founder Interviews / Podcasts',
      percent: '25%',
      barColor: 'bg-zinc-200',
      textColor: 'text-text-subtle',
    },
  ],
  turnaround: {
    days: '4.2 Days',
    subtitle: 'Idea → Script → Shoot → Approval',
    fastestLabel: 'Fastest Asset:',
    fastestAsset: 'Festival Ad Hook Reel (28 Hours)',
    revisionNote: '✓ 0 edit revisions requested on Shakti Skyline cut.',
  },
  organicViews: {
    total: '184,000+',
    subtitle: 'Across Instagram, YouTube & LinkedIn',
    highlight: 'Shakti Skyline walkthrough generated 14 direct organic DM inquiries.',
    nextScheduled: 'Next scheduled shoot: Sun Centrica commercial floor tour.',
  },
};

export const crmAnalyticsData = {
  funnelStages: [
    {
      step: '1. New Inquiries (Top of Funnel)',
      count: '511 (100%)',
      width: '100%',
      color: 'bg-zinc-400',
    },
    {
      step: '2. Contacted on WhatsApp / Phone',
      count: '388 (75.9%)',
      width: '75.9%',
      color: 'bg-zinc-350',
      drop: '-24.1% Drop',
    },
    {
      step: '3. Budget & Locality Qualified',
      count: '196 (38.3%)',
      width: '38.3%',
      color: 'bg-zinc-300',
      drop: '-49.5% Drop',
    },
    {
      step: '4. Site Visit Booked',
      count: '42 (8.2%)',
      width: '8.2%',
      color: 'bg-zinc-250',
      drop: '-78.5% Drop',
    },
    {
      step: '5. Site Visit Completed (High Intent)',
      count: '17 (3.3%)',
      width: '3.3%',
      color: 'bg-zinc-200',
    },
    {
      step: '6. Token Booking Received',
      count: '3 (0.59% Gross)',
      width: '2.2%',
      color: 'bg-zinc-200',
      highlight: '17.6% from Visit',
    },
  ],
  speedToCallImpact: [
    {
      label: '< 15 Mins Response',
      rate: '18.2% Visit Rate',
      note: 'Calling buyers within 15 minutes produces 4.2x higher visit confirmations.',
      status: 'success' as const,
    },
    {
      label: '1 – 4 Hours Response',
      rate: '6.4% Visit Rate',
      note: 'Moderate drop-off as buyers contact other portals in the area.',
      status: 'warning' as const,
    },
    {
      label: '> 24 Hours Response',
      rate: '1.8% Visit Rate',
      note: 'Severe conversion degradation. High risk of lead decay.',
      status: 'danger' as const,
    },
  ],
};

export const gruhnestAnalyticsData = {
  inventoryBalance: [
    { name: 'Shakti Skyline', available: '48/140 Available' },
    { name: 'Sun Imperia', available: '22/96 Available' },
    { name: 'Sun Centrica (Commercial)', available: '45/64 Available' },
  ],
  readiness: {
    percent: '78% Complete',
    sampleFlatDelivered: '2/3 Delivered',
    sampleFlatWidth: '66%',
    locationExplainerScheduled: '1/3 Scheduled',
    locationExplainerWidth: '33%',
  },
  dealPool: {
    amount: '₹26.2 Lakhs',
    subtext: 'Avg 2.5% agency commission across closed inventory',
    fastestCategory: '3BHK East-Facing Luxury (Chala, Vapi)',
    exclusivityNote: '✓ 3 developer exclusivity agreements in place.',
  },
};

export const overviewAnalyticsData = {
  pipeline: {
    value: '₹4.25 Cr',
    change: '+18.4% MoM',
    range: '₹3.8 Cr – ₹4.7 Cr',
    fillWidth: '78%',
  },
  cpl: {
    benchmark: '₹1,450/lead',
  },
  visitConversion: {
    rate: '4.82%',
    booked: '17 Booked',
    fillWidth: '65%',
  },
  q4Retainers: {
    amount: '₹10.65 L',
    commission: '2.5% on Closures',
    fillWidth: '72%',
  },
  gridlines: [
    { spend: '₹2.0L Spend', leads: '120 Leads' },
    { spend: '₹1.5L Spend', leads: '90 Leads' },
    { spend: '₹1.0L Spend', leads: '60 Leads' },
    { spend: '₹0.5L Spend', leads: '30 Leads' },
  ],
  mandates: [
    {
      name: 'Shakti Skyline',
      roas: '4.2x ROAS',
      width: '84%',
      barColor: 'bg-zinc-400',
      spend: 'Spend: ₹2.1L',
      pipeline: 'Pipeline: ₹8.8Cr',
    },
    {
      name: 'Sun Imperia',
      roas: '3.8x ROAS',
      width: '76%',
      barColor: 'bg-zinc-300',
      spend: 'Spend: ₹3.8L',
      pipeline: 'Pipeline: ₹14.4Cr',
    },
    {
      name: 'Sun Centrica (Commercial)',
      roas: '5.6x ROAS',
      width: '92%',
      barColor: 'bg-zinc-200',
      spend: 'Spend: ₹0.95L',
      pipeline: 'Pipeline: ₹5.3Cr',
    },
  ],
  growthRecommendation: 'Commercial buyers on Sun Centrica yield 40% higher return per rupee spent.',
};

export const projectsAnalyticsData = {
  budgetRunway: [
    {
      name: 'Shakti Skyline (Launch Retainer)',
      spent: '46.7% Spent (₹2.1L / ₹4.5L)',
      width: '46.7%',
      color: 'bg-zinc-400',
    },
    {
      name: 'Sun Imperia (360° Media)',
      spent: '63.3% Spent (₹3.8L / ₹6.0L)',
      width: '63.3%',
      color: 'bg-zinc-300',
    },
    {
      name: 'Sun Centrica (Commercial Performance)',
      spent: '19.0% Spent (₹0.95L / ₹5.0L)',
      width: '19.0%',
      color: 'bg-zinc-200',
    },
  ],
  csatRatings: [
    { name: 'Shakti Group', score: '9.4', color: 'text-text-main' },
    { name: 'Sun Creators', score: '8.8', color: 'text-text-muted' },
    { name: 'Gruhnest', score: '9.1', color: 'text-text-subtle', isGruhnest: true },
  ],
};
