export type BusinessLineFilter = 'All' | 'BIM' | 'GruhNest' | 'GruhNest Pro';
export type PeriodFilter = 'This month' | 'Last month' | 'This quarter' | 'YTD';
export type PreviewRole = 'Founder' | 'Accountant' | 'PM / Team / Ads' | 'Client / Developer';

export interface FinanceRecord {
  id: string;
  payer: string;
  project: string;
  businessLine: Exclude<BusinessLineFilter, 'All'>;
  incomeSource: string;
  billNo: string;
  billDate: string;
  dueDate: string;
  billedAmount: number;
  receivedAmount: number;
  status: 'Paid' | 'Part-Paid' | 'Pending' | 'Overdue' | 'Unbilled';
}

export interface TeamDeliveryRecord {
  id: string;
  member: string;
  role: string;
  assigned: number;
  onTime: number;
  late: number;
  rework: number;
  blockerOwner: string;
  delayReason: string;
}

export interface GruhNestAdRecord {
  id: string;
  client: string;
  project: string;
  videoTitle: string;
  metaAdId: string;
  plannedVsLive: string;
  spend: number;
  minTestSpend: number;
  targetCpl: number;
  leads: number;
  qualifiedLeads: number;
  visitsCompleted: number;
  confirmedBookings: number;
  adAlert: 'Healthy' | 'Wasted Spend' | 'Qualification Pending' | 'High CPL';
}

export interface GruhNestProRecord {
  id: string;
  client: string;
  project: string;
  status: 'Live' | 'Sync Issue' | 'Inactive';
  activeSalesUsers: number;
  lastLogin: string;
  lastHumanCrmUpdate: string;
  lastSuccessfulSync: string;
  leadsReceived: number;
  aiCallsAttempted: number;
  connectedCalls: number;
  visitsBooked: number;
  pendingHandoffs: number;
}

export interface ActionAlertRecord {
  id: string;
  clientProject: string;
  businessLine: Exclude<BusinessLineFilter, 'All'>;
  issue: string;
  pendingDays: number;
  responsiblePerson: string;
  nextAction: string;
  deadline: string;
  severity: 'urgent' | 'pending';
  isFinanceOnly: boolean;
}

export interface BimSocialItem {
  id: string;
  client: string;
  project: string;
  title: string;
  assignee: string;
  committedDue: string;
  stage: 'Script' | 'Shoot' | 'Edit' | 'Approval' | 'Delivery' | 'Published';
  actualDelivery: string;
  liveLink: string;
  feedbackScore: number;
  openComplaint: string;
  lastFeedbackDate: string;
  pmFollowUp: string;
}

export interface CommissionBookingRecord {
  id: string;
  client: string;
  project: string;
  bookingId: string;
  leadRef: string;
  unit: string;
  bookingDate: string;
  dealValue: number;
  commissionRate: number;
  commissionAmount: number;
  receiptEntered: number;
  pendingAmount: number;
  dueDate: string;
  stage: 'Reported' | 'Verified / Earned' | 'Invoiced' | 'Part-Paid' | 'Paid' | 'Overdue';
  gruhNestSourceVerified: boolean;
  syncCount: number;
}

export const financeRecords: FinanceRecord[] = [
  {
    id: 'fin-1',
    payer: 'Shakti Group',
    project: 'Shakti Skyline',
    businessLine: 'BIM',
    incomeSource: 'BIM Retainer / Campaign Fee',
    billNo: 'INV-2026-104',
    billDate: '01 Nov 2026',
    dueDate: '10 Nov 2026',
    billedAmount: 180000,
    receivedAmount: 180000,
    status: 'Paid',
  },
  {
    id: 'fin-2',
    payer: 'Sun Creators',
    project: 'Sun Imperia',
    businessLine: 'GruhNest',
    incomeSource: 'GruhNest Onboarding / Content Fee',
    billNo: 'INV-2026-108',
    billDate: '05 Nov 2026',
    dueDate: '15 Nov 2026',
    billedAmount: 150000,
    receivedAmount: 90000,
    status: 'Overdue',
  },
  {
    id: 'fin-3',
    payer: 'Sun Creators',
    project: 'Sun Centrica',
    businessLine: 'GruhNest Pro',
    incomeSource: 'GruhNest Pro Setup & Monthly Fee',
    billNo: 'INV-2026-112',
    billDate: '12 Nov 2026',
    dueDate: '28 Nov 2026',
    billedAmount: 65000,
    receivedAmount: 0,
    status: 'Pending',
  },
  {
    id: 'fin-4',
    payer: 'Shakti Group',
    project: 'Shakti Skyline',
    businessLine: 'GruhNest',
    incomeSource: 'Sale Commission (0.4%)',
    billNo: 'INV-2026-115',
    billDate: '14 Nov 2026',
    dueDate: '21 Nov 2026',
    billedAmount: 20000,
    receivedAmount: 8000,
    status: 'Overdue',
  },
  {
    id: 'fin-5',
    payer: 'Sun Creators',
    project: 'Sun Residency 4',
    businessLine: 'GruhNest',
    incomeSource: 'Earned-but-Unbilled Commission',
    billNo: 'UNBILLED',
    billDate: '—',
    dueDate: '—',
    billedAmount: 32000,
    receivedAmount: 0,
    status: 'Unbilled',
  },
];

export const teamDeliveryRecords: TeamDeliveryRecord[] = [
  {
    id: 'tm-1',
    member: 'Kunal Mehta',
    role: 'Lead Video Editor',
    assigned: 12,
    onTime: 10,
    late: 2,
    rework: 1,
    blockerOwner: 'Client (Sun Imperia)',
    delayReason: 'Client approval pending 4 days on final cut',
  },
  {
    id: 'tm-2',
    member: 'Pooja Sharma',
    role: 'Performance Marketing',
    assigned: 9,
    onTime: 8,
    late: 1,
    rework: 0,
    blockerOwner: 'Meta Ad Review',
    delayReason: 'Creative policy re-verification',
  },
  {
    id: 'tm-3',
    member: 'Rohan Patel',
    role: 'Content & Script',
    assigned: 14,
    onTime: 11,
    late: 3,
    rework: 2,
    blockerOwner: 'Internal Shoot',
    delayReason: 'Site access rescheduled by developer PM',
  },
  {
    id: 'tm-4',
    member: 'Ananya Nair',
    role: 'Project Manager',
    assigned: 8,
    onTime: 8,
    late: 0,
    rework: 0,
    blockerOwner: 'None',
    delayReason: 'On schedule',
  },
];

export const gruhNestAdRecords: GruhNestAdRecord[] = [
  {
    id: 'gn-1',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    videoTitle: '3BHK Sky Deck Architectural Walkthrough',
    metaAdId: 'META-AD-88412',
    plannedVsLive: '6 / 5 Live',
    spend: 42000,
    minTestSpend: 15000,
    targetCpl: 950,
    leads: 48,
    qualifiedLeads: 19,
    visitsCompleted: 9,
    confirmedBookings: 2,
    adAlert: 'Healthy',
  },
  {
    id: 'gn-2',
    client: 'Sun Creators',
    project: 'Sun Imperia',
    videoTitle: 'Festive Villa Tour Reel (Hook B)',
    metaAdId: 'META-AD-90231',
    plannedVsLive: '8 / 6 Live',
    spend: 26500,
    minTestSpend: 15000,
    targetCpl: 1100,
    leads: 0,
    qualifiedLeads: 0,
    visitsCompleted: 0,
    confirmedBookings: 0,
    adAlert: 'Wasted Spend',
  },
  {
    id: 'gn-3',
    client: 'Sun Creators',
    project: 'Sun Residency 4',
    videoTitle: 'Sample Flat 3BHK Cinematic Cut',
    metaAdId: 'META-AD-90418',
    plannedVsLive: '4 / 3 Live',
    spend: 18500,
    minTestSpend: 12000,
    targetCpl: 900,
    leads: 14,
    qualifiedLeads: 0,
    visitsCompleted: 0,
    confirmedBookings: 0,
    adAlert: 'Qualification Pending',
  },
  {
    id: 'gn-4',
    client: 'Sun Creators',
    project: 'Sun Centrica',
    videoTitle: 'Commercial Floor ROI Explainer',
    metaAdId: 'META-AD-91005',
    plannedVsLive: '5 / 4 Live',
    spend: 21000,
    minTestSpend: 15000,
    targetCpl: 1000,
    leads: 11,
    qualifiedLeads: 6,
    visitsCompleted: 4,
    confirmedBookings: 1,
    adAlert: 'High CPL',
  },
];

export const gruhNestProRecords: GruhNestProRecord[] = [
  {
    id: 'pro-1',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    status: 'Live',
    activeSalesUsers: 6,
    lastLogin: '25 Nov, 11:20 AM',
    lastHumanCrmUpdate: '25 Nov, 10:45 AM',
    lastSuccessfulSync: '25 Nov, 03:45 PM',
    leadsReceived: 142,
    aiCallsAttempted: 138,
    connectedCalls: 89,
    visitsBooked: 24,
    pendingHandoffs: 3,
  },
  {
    id: 'pro-2',
    client: 'Sun Creators',
    project: 'Sun Imperia',
    status: 'Sync Issue',
    activeSalesUsers: 4,
    lastLogin: '24 Nov, 05:10 PM',
    lastHumanCrmUpdate: '16 Nov, 02:15 PM',
    lastSuccessfulSync: '23 Nov, 09:30 PM',
    leadsReceived: 98,
    aiCallsAttempted: 72,
    connectedCalls: 31,
    visitsBooked: 7,
    pendingHandoffs: 14,
  },
  {
    id: 'pro-3',
    client: 'Sun Creators',
    project: 'Sun Centrica',
    status: 'Inactive',
    activeSalesUsers: 1,
    lastLogin: '14 Nov, 01:00 PM',
    lastHumanCrmUpdate: '11 Nov, 04:00 PM',
    lastSuccessfulSync: '25 Nov, 03:40 PM',
    leadsReceived: 36,
    aiCallsAttempted: 36,
    connectedCalls: 18,
    visitsBooked: 5,
    pendingHandoffs: 8,
  },
];

export const actionAlertRecords: ActionAlertRecord[] = [
  {
    id: 'al-1',
    clientProject: 'Sun Creators · Sun Imperia',
    businessLine: 'GruhNest',
    issue: 'Active Meta Ad spent ₹26,500 (>₹15k limit) with 0 leads',
    pendingDays: 3,
    responsiblePerson: 'Pooja Sharma',
    nextAction: 'Pause Hook B & shift budget to Walkthrough Cut',
    deadline: 'Today, 06:00 PM',
    severity: 'urgent',
    isFinanceOnly: false,
  },
  {
    id: 'al-2',
    clientProject: 'Sun Creators · Sun Imperia',
    businessLine: 'BIM',
    issue: 'Invoice INV-2026-108 overdue (₹60,000 balance pending)',
    pendingDays: 10,
    responsiblePerson: 'Accountant / Founder',
    nextAction: 'Send formal payment reminder with receipt ledger',
    deadline: '26 Nov 2026',
    severity: 'urgent',
    isFinanceOnly: true,
  },
  {
    id: 'al-3',
    clientProject: 'Shakti Group · Shakti Skyline',
    businessLine: 'GruhNest',
    issue: '0.4% Commission balance ₹12,000 overdue (₹8k of ₹20k received)',
    pendingDays: 4,
    responsiblePerson: 'Accountant',
    nextAction: 'Follow up with Shakti accounts for balance ₹12,000',
    deadline: '26 Nov 2026',
    severity: 'urgent',
    isFinanceOnly: true,
  },
  {
    id: 'al-4',
    clientProject: 'Sun Creators · Sun Imperia',
    businessLine: 'GruhNest Pro',
    issue: 'AI Calling CRM sync failed & 14 handoffs pending since 9 days',
    pendingDays: 2,
    responsiblePerson: 'Tech / Pro Ops',
    nextAction: 'Reconnect webhook & notify Sun Imperia sales lead',
    deadline: 'Today, 08:00 PM',
    severity: 'pending',
    isFinanceOnly: false,
  },
  {
    id: 'al-5',
    clientProject: 'Sun Creators · Sun Residency 4',
    businessLine: 'BIM',
    issue: 'Walkthrough video stuck in client approval stage',
    pendingDays: 4,
    responsiblePerson: 'Ananya Nair (PM)',
    nextAction: 'Escalate on developer WhatsApp group (Client blocker)',
    deadline: '27 Nov 2026',
    severity: 'pending',
    isFinanceOnly: false,
  },
];

export const bimSocialItems: BimSocialItem[] = [
  {
    id: 'soc-1',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    title: 'Possession Milestone & Tower B Reel',
    assignee: 'Kunal Mehta',
    committedDue: '18 Nov 2026',
    stage: 'Published',
    actualDelivery: '18 Nov 2026',
    liveLink: 'instagram.com/reel/shakti-b',
    feedbackScore: 5,
    openComplaint: 'None',
    lastFeedbackDate: '20 Nov 2026',
    pmFollowUp: 'Closed — client appreciated pacing',
  },
  {
    id: 'soc-2',
    client: 'Sun Creators',
    project: 'Sun Imperia',
    title: 'Clubhouse Evening Lifestyle Cut',
    assignee: 'Rohan Patel',
    committedDue: '21 Nov 2026',
    stage: 'Approval',
    actualDelivery: 'Pending',
    liveLink: '—',
    feedbackScore: 3,
    openComplaint: 'Color grading too warm on terrace shot',
    lastFeedbackDate: '23 Nov 2026',
    pmFollowUp: 'Revision sent; awaiting client sign-off',
  },
  {
    id: 'soc-3',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    title: 'Founder Vision & RERA Transparency Talk',
    assignee: 'Kunal Mehta',
    committedDue: '26 Nov 2026',
    stage: 'Edit',
    actualDelivery: 'Pending',
    liveLink: '—',
    feedbackScore: 4,
    openComplaint: 'None',
    lastFeedbackDate: '22 Nov 2026',
    pmFollowUp: 'Rough cut scheduled for 25 Nov evening',
  },
];

export interface FinanceAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  details: string;
}

export interface ClientMetaAdFundRecord {
  id: string;
  client: string;
  project: string;
  fundDeposited: number;
  metaSpendUtilized: number;
  unspentBalance: number;
  lastTopUpDate: string;
}

export const clientMetaAdFunds: ClientMetaAdFundRecord[] = [
  {
    id: 'maf-1',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    fundDeposited: 100000,
    metaSpendUtilized: 42000,
    unspentBalance: 58000,
    lastTopUpDate: '10 Nov 2026',
  },
  {
    id: 'maf-2',
    client: 'Sun Creators',
    project: 'Sun Imperia',
    fundDeposited: 75000,
    metaSpendUtilized: 26500,
    unspentBalance: 48500,
    lastTopUpDate: '08 Nov 2026',
  },
  {
    id: 'maf-3',
    client: 'Sun Creators',
    project: 'Sun Residency 4',
    fundDeposited: 50000,
    metaSpendUtilized: 18500,
    unspentBalance: 31500,
    lastTopUpDate: '12 Nov 2026',
  },
  {
    id: 'maf-4',
    client: 'Sun Creators',
    project: 'Sun Centrica',
    fundDeposited: 40000,
    metaSpendUtilized: 21000,
    unspentBalance: 19000,
    lastTopUpDate: '14 Nov 2026',
  },
];

export const initialFinanceAuditLogs: FinanceAuditEntry[] = [
  {
    id: 'aud-1',
    timestamp: '20 Nov 2026, 04:15 PM',
    actor: 'Accountant (2FA Verified)',
    action: 'Partial Receipt Recorded',
    target: 'Shakti Skyline · BK-SKY-402',
    details: 'Entered ₹8,000 receipt against ₹20,000 commission; balance ₹12,000 pending.',
  },
  {
    id: 'aud-2',
    timestamp: '22 Nov 2026, 11:05 AM',
    actor: 'System Deduplicator',
    action: 'Duplicate Sync Ignored',
    target: 'Shakti Skyline · BK-SKY-402',
    details: 'Second sync detected for ₹50,00,000 booking; commission kept at ₹20,000 (1x counted).',
  },
  {
    id: 'aud-3',
    timestamp: '22 Nov 2026, 12:01 AM',
    actor: 'Recovery Monitor',
    action: 'Overdue Flagged',
    target: 'Shakti Skyline · BK-SKY-402',
    details: 'Due date 21 Nov 2026 crossed; ₹12,000 unpaid balance marked Overdue.',
  },
];

export const commissionBookings: CommissionBookingRecord[] = [
  {
    id: 'com-1',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    bookingId: 'BK-SKY-402',
    leadRef: 'GN-LEAD-8812',
    unit: 'Tower A - 1204 (3BHK)',
    bookingDate: '12 Nov 2026',
    dealValue: 5000000,
    commissionRate: 0.004,
    commissionAmount: 20000,
    receiptEntered: 8000,
    pendingAmount: 12000,
    dueDate: '21 Nov 2026',
    stage: 'Overdue',
    gruhNestSourceVerified: true,
    syncCount: 2,
  },
  {
    id: 'com-2',
    client: 'Sun Creators',
    project: 'Sun Residency 4',
    bookingId: 'BK-SR4-119',
    leadRef: 'GN-LEAD-9041',
    unit: 'Bungalow 14',
    bookingDate: '19 Nov 2026',
    dealValue: 8000000,
    commissionRate: 0.004,
    commissionAmount: 32000,
    receiptEntered: 0,
    pendingAmount: 32000,
    dueDate: '04 Dec 2026',
    stage: 'Verified / Earned',
    gruhNestSourceVerified: true,
    syncCount: 1,
  },
  {
    id: 'com-3',
    client: 'Sun Creators',
    project: 'Sun Centrica',
    bookingId: 'BK-CEN-088',
    leadRef: 'GN-LEAD-9102',
    unit: 'Showroom G-03',
    bookingDate: '06 Nov 2026',
    dealValue: 11000000,
    commissionRate: 0.004,
    commissionAmount: 44000,
    receiptEntered: 44000,
    pendingAmount: 0,
    dueDate: '16 Nov 2026',
    stage: 'Paid',
    gruhNestSourceVerified: true,
    syncCount: 1,
  },
];
