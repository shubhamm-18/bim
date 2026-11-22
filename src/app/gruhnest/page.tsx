import type { Metadata } from 'next';
import { GruhnestView } from '@/components/views/GruhnestView';

export const metadata: Metadata = {
  title: 'Gruhnest Property Media',
  description: 'Property media listing portal, inventory tracker, and sample-flat assets.',
};

export default function GruhnestPage() {
  return <GruhnestView />;
}
