import { agencyConfig } from '@/config/agency.config';

export type PaymentStatus = (typeof agencyConfig.paymentStatuses)[number];

export interface PaymentRecord {
  id: string;
  projectId: string;
  projectName: string;
  invoiceNo: string;
  description: string;
  amount: number;
  paidAmount: number;
  status: PaymentStatus;
  dueDate: string;
  paidDate?: string;
}
