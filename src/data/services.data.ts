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
    colorClass: 'bg-blue-500/10 text-blue-600',
    previewBg: 'bg-purple-500/10 border-purple-500/20 text-purple-600',
  },
  {
    id: 'advertising',
    href: '/advertising',
    title: 'Advertising',
    description: 'Campaigns & performance metrics',
    colorClass: 'bg-amber-500/10 text-amber-600',
    previewBg: 'bg-amber-500/10 border-amber-500/20 text-amber-600',
  },
  {
    id: 'crm',
    href: '/crm',
    title: 'Automation & CRM',
    description: 'Lead flow & pre-sales tracking',
    colorClass: 'bg-indigo-500/10 text-indigo-600',
    previewBg: 'bg-blue-500/10 border-blue-500/20 text-blue-600',
  },
  {
    id: 'gruhnest',
    href: '/gruhnest',
    title: 'Gruhnest',
    description: 'Property media & listing inventory',
    colorClass: 'bg-emerald-500/10 text-emerald-700',
    previewBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600',
  },
];
