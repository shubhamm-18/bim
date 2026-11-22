'use client';

import React from 'react';
import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 rounded-full bg-brand-subtle text-brand flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-text-main mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-text-subtle max-w-md mb-6">
        The workspace module or section you are looking for does not exist or may have been moved.
      </p>
      <Link href="/">
        <Button variant="brand" size="md">
          <Home className="w-4 h-4 mr-2" />
          <span>Return to Dashboard</span>
        </Button>
      </Link>
    </div>
  );
}
