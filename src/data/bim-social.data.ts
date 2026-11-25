export type SocialStage =
  | 'Script'
  | 'Shoot'
  | 'Edit'
  | 'Approval'
  | 'Delivery'
  | 'Published';

export const SOCIAL_STAGES: SocialStage[] = [
  'Script',
  'Shoot',
  'Edit',
  'Approval',
  'Delivery',
  'Published',
];

export interface MonthlyClientScope {
  client: string;
  project: string;
  monthlyReelsTarget: number;
  monthlyReelsDone: number;
  monthlyPostsTarget: number;
  monthlyPostsDone: number;
  avgFeedback: number;
  openComplaints: number;
}

export interface SocialDeliverableItem {
  id: string;
  client: string;
  project: string;
  title: string;
  contentType: 'Reel' | 'Post / Carousel' | 'Walkthrough' | 'Podcast Clip';
  assignee: string;
  committedDueDate: string;
  stage: SocialStage;
  actualDeliveryDate: string;
  liveLink: string;
  clientFeedback: 1 | 2 | 3 | 4 | 5;
  openComplaint: string;
  lastFeedbackDate: string;
  pmFollowUp: string;
}

export const initialMonthlyScopes: MonthlyClientScope[] = [
  {
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    monthlyReelsTarget: 12,
    monthlyReelsDone: 8,
    monthlyPostsTarget: 8,
    monthlyPostsDone: 6,
    avgFeedback: 4.7,
    openComplaints: 0,
  },
  {
    client: 'Sun Creators',
    project: 'Sun Imperia · Residency 4 · Centrica',
    monthlyReelsTarget: 16,
    monthlyReelsDone: 9,
    monthlyPostsTarget: 10,
    monthlyPostsDone: 7,
    avgFeedback: 3.8,
    openComplaints: 2,
  },
  {
    client: 'Gruhnest',
    project: 'Buyer Guide & Showcase',
    monthlyReelsTarget: 8,
    monthlyReelsDone: 5,
    monthlyPostsTarget: 6,
    monthlyPostsDone: 4,
    avgFeedback: 4.5,
    openComplaints: 0,
  },
];

export const initialSocialDeliverables: SocialDeliverableItem[] = [
  {
    id: 'bim-1',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    title: 'Possession Milestone & Tower B Sky Deck Reel',
    contentType: 'Reel',
    assignee: 'Kunal Mehta',
    committedDueDate: '2026-11-18',
    stage: 'Published',
    actualDeliveryDate: '2026-11-18',
    liveLink: 'https://instagram.com/reel/shakti-skyline-tower-b',
    clientFeedback: 5,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-20',
    pmFollowUp: 'Closed — client loved pacing & aerial transition',
  },
  {
    id: 'bim-2',
    client: 'Sun Creators',
    project: 'Sun Imperia',
    title: 'Festive Villa Lifestyle & Courtyard Carousel',
    contentType: 'Post / Carousel',
    assignee: 'Pooja Sharma',
    committedDueDate: '2026-11-19',
    stage: 'Published',
    actualDeliveryDate: '2026-11-19',
    liveLink: 'https://instagram.com/p/sun-imperia-festive',
    clientFeedback: 4,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-21',
    pmFollowUp: 'Published on schedule; boosted for weekend visits',
  },
  {
    id: 'bim-3',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    title: '3BHK Sample Flat Architectural Walkthrough',
    contentType: 'Walkthrough',
    assignee: 'Kunal Mehta',
    committedDueDate: '2026-11-22',
    stage: 'Delivery',
    actualDeliveryDate: '2026-11-22',
    liveLink: 'Drive Link Ready (Scheduled 26 Nov)',
    clientFeedback: 5,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-23',
    pmFollowUp: 'Final 4K master delivered; caption approved by client',
  },
  {
    id: 'bim-4',
    client: 'Sun Creators',
    project: 'Sun Imperia',
    title: 'Clubhouse Evening Sunset Cut (V2)',
    contentType: 'Reel',
    assignee: 'Rohan Patel',
    committedDueDate: '2026-11-21',
    stage: 'Approval',
    actualDeliveryDate: 'Pending',
    liveLink: '—',
    clientFeedback: 3,
    openComplaint: 'Warm color grade on terrace shot needs cooling',
    lastFeedbackDate: '2026-11-23',
    pmFollowUp: 'Color fix uploaded; PM following up with Sun marketing lead today',
  },
  {
    id: 'bim-5',
    client: 'Sun Creators',
    project: 'Sun Residency 4',
    title: 'Weekend Site Visit Invitation Reel',
    contentType: 'Reel',
    assignee: 'Ananya Nair',
    committedDueDate: '2026-11-24',
    stage: 'Approval',
    actualDeliveryDate: 'Pending',
    liveLink: '—',
    clientFeedback: 4,
    openComplaint: 'Update RERA number font size in end slate',
    lastFeedbackDate: '2026-11-24',
    pmFollowUp: 'Revised end-slate sent on WhatsApp for sign-off',
  },
  {
    id: 'bim-6',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    title: 'Founder Vision & RERA Transparency Podcast Clip',
    contentType: 'Podcast Clip',
    assignee: 'Kunal Mehta',
    committedDueDate: '2026-11-26',
    stage: 'Edit',
    actualDeliveryDate: 'Pending',
    liveLink: '—',
    clientFeedback: 4,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-22',
    pmFollowUp: 'B-roll & subtitles being added; rough cut due 25 Nov 7 PM',
  },
  {
    id: 'bim-7',
    client: 'Gruhnest',
    project: 'Buyer Guide & Showcase',
    title: 'Top 5 Emerging Investment Corridors Explainer',
    contentType: 'Reel',
    assignee: 'Rohan Patel',
    committedDueDate: '2026-11-27',
    stage: 'Edit',
    actualDeliveryDate: 'Pending',
    liveLink: '—',
    clientFeedback: 5,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-21',
    pmFollowUp: 'Motion graphics map overlay in progress',
  },
  {
    id: 'bim-8',
    client: 'Sun Creators',
    project: 'Sun Centrica',
    title: 'Commercial High-Street ROI & Footfall Reel',
    contentType: 'Reel',
    assignee: 'Rohan Patel',
    committedDueDate: '2026-11-28',
    stage: 'Shoot',
    actualDeliveryDate: 'Pending',
    liveLink: '—',
    clientFeedback: 4,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-20',
    pmFollowUp: 'Drone & gimbal shoot booked for 26 Nov 9:00 AM',
  },
  {
    id: 'bim-9',
    client: 'Shakti Group',
    project: 'Shakti Skyline',
    title: 'Construction Progress Monthly Time-Lapse Post',
    contentType: 'Post / Carousel',
    assignee: 'Ananya Nair',
    committedDueDate: '2026-11-29',
    stage: 'Shoot',
    actualDeliveryDate: 'Pending',
    liveLink: '—',
    clientFeedback: 5,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-19',
    pmFollowUp: 'Site engineer confirmed tower access on 26 Nov',
  },
  {
    id: 'bim-10',
    client: 'Sun Creators',
    project: 'Sun Residency 4',
    title: 'Family Testimonial & Handover Story Script',
    contentType: 'Reel',
    assignee: 'Rohan Patel',
    committedDueDate: '2026-11-30',
    stage: 'Script',
    actualDeliveryDate: 'Pending',
    liveLink: '—',
    clientFeedback: 4,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-22',
    pmFollowUp: 'Hook variations drafted; review with founder scheduled',
  },
  {
    id: 'bim-11',
    client: 'Gruhnest',
    project: 'Buyer Guide & Showcase',
    title: 'Home Loan & Stamp Duty Checklist Carousel',
    contentType: 'Post / Carousel',
    assignee: 'Pooja Sharma',
    committedDueDate: '2026-11-30',
    stage: 'Script',
    actualDeliveryDate: 'Pending',
    liveLink: '—',
    clientFeedback: 4,
    openComplaint: 'None',
    lastFeedbackDate: '2026-11-20',
    pmFollowUp: 'Copywriting finalized; moving to design queue',
  },
];
