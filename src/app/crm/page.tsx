import type { Metadata } from 'next';
import { CrmView } from '@/components/views/CrmView';

export const metadata: Metadata = {
  title: 'Automation & CRM',
  description: 'Track property buyer leads through site visit booking and unit token advance.',
};

export default function CrmPage() {
  return <CrmView />;
}
