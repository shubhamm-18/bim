import { Client } from '@/types';

export const initialClients: Client[] = [
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
