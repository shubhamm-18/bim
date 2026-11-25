import type { Metadata } from 'next';
import { GruhnestView } from '@/components/views/GruhnestView';

export const metadata: Metadata = {
  title: 'GuruNest Pro',
  description: 'Project status, active sales users, last login, last human CRM update, AI calls, visits booked and pending handoffs.',
};

export default function GruhnestPage() {
  return <GruhnestView />;
}
