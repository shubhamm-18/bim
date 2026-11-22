import type { Metadata } from 'next';
import { CalendarView } from '@/components/views/CalendarView';

export const metadata: Metadata = {
  title: 'Tasks & Calendar',
  description: 'Track cross-functional deliverables, shoot schedules, and review milestones.',
};

export default function CalendarPage() {
  return <CalendarView />;
}
