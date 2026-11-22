import { ProjectTemplate } from '@/types';

export const initialTemplates: ProjectTemplate[] = [
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
