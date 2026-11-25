import type { Metadata } from 'next';
import { CrmView } from '@/components/views/CrmView';

export const metadata: Metadata = {
  title: 'GuruNest',
  description: 'Map every live video to its Meta Ad ID(s), video-wise spend, leads, CPL, qualified leads, CPQL, visits and bookings.',
};

export default function CrmPage() {
  return <CrmView />;
}
