import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site.config';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.documentTitle,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.website }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-surface-app text-text-main antialiased selection:bg-brand selection:text-white" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
