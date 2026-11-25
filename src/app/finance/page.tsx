import type { Metadata } from 'next';
import { FinanceView } from '@/components/views/FinanceView';

export const metadata: Metadata = {
  title: 'Finance (Owner Only)',
  description: 'Owner-only revenue, billed, collection, outstanding, overdue and 0.4% unbilled commission ledger.',
};

export default function FinancePage() {
  return <FinanceView />;
}
