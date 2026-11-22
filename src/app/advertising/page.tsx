import type { Metadata } from 'next';
import { AdvertisingView } from '@/components/views/AdvertisingView';

export const metadata: Metadata = {
  title: 'Advertising & Performance',
  description: 'Meta, Google and LinkedIn campaigns driving buyer inquiries and site visits.',
};

export default function AdvertisingPage() {
  return <AdvertisingView />;
}
