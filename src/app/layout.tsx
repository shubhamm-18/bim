import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Beyond Imagine Media (BIM) — Agency Workspace',
  description: 'Connected real estate service workspace for agency production, ad campaigns, lead management, and property media.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f7f8fa] text-[#20222c]">
        {children}
      </body>
    </html>
  );
}
