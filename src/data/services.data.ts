export interface ServiceModuleItem {
  id: string;
  href: string;
  title: string;
  description: string;
  colorClass: string;
  previewBg: string;
}

export const initialServiceModules: ServiceModuleItem[] = [
  {
    id: 'content',
    href: '/content',
    title: 'Content studio',
    description: 'Production & publishing pipeline',
    colorClass: 'bg-surface-subtle border border-border text-text-muted group-hover:text-text-main group-hover:border-border-hover',
    previewBg: 'bg-surface-subtle border border-border text-text-muted',
  },
  {
    id: 'advertising',
    href: '/advertising',
    title: 'Advertising',
    description: 'Campaigns & performance metrics',
    colorClass: 'bg-surface-subtle border border-border text-text-muted group-hover:text-text-main group-hover:border-border-hover',
    previewBg: 'bg-surface-subtle border border-border text-text-muted',
  },
  {
    id: 'crm',
    href: '/crm',
    title: 'Automation & CRM',
    description: 'Lead flow & pre-sales tracking',
    colorClass: 'bg-surface-subtle border border-border text-text-muted group-hover:text-text-main group-hover:border-border-hover',
    previewBg: 'bg-surface-subtle border border-border text-text-muted',
  },
  {
    id: 'gruhnest',
    href: '/gruhnest',
    title: 'Gruhnest',
    description: 'Property media & listing inventory',
    colorClass: 'bg-surface-subtle border border-border text-text-muted group-hover:text-text-main group-hover:border-border-hover',
    previewBg: 'bg-surface-subtle border border-border text-text-muted',
  },
];
