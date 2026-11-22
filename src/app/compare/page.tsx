import type { Metadata } from 'next';
import { CompareView } from '@/components/views/CompareView';

export const metadata: Metadata = {
  title: 'Project Comparison',
  description: 'Side-by-side comparison of real estate developer mandates and metrics.',
};

export default function ComparePage() {
  return <CompareView />;
}
