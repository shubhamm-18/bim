import type { Metadata } from 'next';
import { TeamMembersView } from '@/components/views/TeamMembersView';

export const metadata: Metadata = {
  title: 'Team Members',
  description: 'Add team members, define rules, assign tasks, and track completion status.',
};

export default function TeamPage() {
  return <TeamMembersView />;
}
