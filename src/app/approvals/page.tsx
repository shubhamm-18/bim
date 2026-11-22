import type { Metadata } from 'next';
import { ApprovalsView } from '@/components/views/ApprovalsView';

export const metadata: Metadata = {
  title: 'Approval Board',
  description: 'Review and approve creative cuts, video walkthroughs, and ad copies.',
};

export default function ApprovalsPage() {
  return <ApprovalsView />;
}
