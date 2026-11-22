import type { Metadata } from 'next';
import { TemplatesView } from '@/components/views/TemplatesView';

export const metadata: Metadata = {
  title: 'Project Templates',
  description: 'Standardized launch templates and campaign blueprint packages.',
};

export default function TemplatesPage() {
  return <TemplatesView />;
}
