import { ApprovalItem } from '@/types';

export const initialApprovalItems: ApprovalItem[] = [
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
