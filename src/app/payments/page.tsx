import type { Metadata } from 'next';
import { PaymentsView } from '@/components/views/PaymentsView';

export const metadata: Metadata = {
  title: 'Payments & Billing',
  description: 'Manage retainers, milestone billings, invoices, and payment statuses.',
};

export default function PaymentsPage() {
  return <PaymentsView />;
}
