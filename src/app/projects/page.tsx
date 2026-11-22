import type { Metadata } from 'next';
import { ProjectsView } from '@/components/views/ProjectsView';

export const metadata: Metadata = {
  title: 'Client Projects',
  description: 'Manage real estate developer accounts, active mandates, and deliverables.',
};

export default function ProjectsPage() {
  return <ProjectsView />;
}
