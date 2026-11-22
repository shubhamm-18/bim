import { PaymentRecord } from '@/types';

export const initialPayments: PaymentRecord[] = [
  {
    id: 'pay-1',
    projectId: 'proj-1',
    projectName: 'Shakti Skyline',
    invoiceNo: 'INV-2026-089',
    description: 'October Retainer & Video Production Fee',
    amount: 150000,
    paidAmount: 75000,
    status: 'Part paid',
    dueDate: '2026-11-15',
  },
  {
    id: 'pay-2',
    projectId: 'proj-2',
    projectName: 'Sun Imperia',
    invoiceNo: 'INV-2026-092',
    description: 'Ad Management & Content Retainer (Nov)',
    amount: 180000,
    paidAmount: 180000,
    status: 'Paid',
    dueDate: '2026-11-10',
  },
  {
    id: 'pay-3',
    projectId: 'proj-3',
    projectName: 'Sun Residency 4',
    invoiceNo: 'INV-2026-095',
    description: 'Launch Campaign Setup & Creatives',
    amount: 95000,
    paidAmount: 0,
    status: 'Pending',
    dueDate: '2026-11-25',
  },
];
