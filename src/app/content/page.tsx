import type { Metadata } from 'next';
import { ContentStudioView } from '@/components/views/ContentStudioView';

export const metadata: Metadata = {
  title: 'Content Studio',
  description: 'Real estate content production pipeline from idea to live post.',
};

export default function ContentStudioPage() {
  return <ContentStudioView />;
}
