'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 rounded-full bg-surface-subtle text-text-muted border border-border flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-extrabold text-text-main mb-2">
        Something unexpected happened
      </h2>
      <p className="text-xs text-text-subtle max-w-md mb-6">
        {error.message || 'An unexpected rendering error occurred in this workspace view.'}
      </p>
      <Button variant="brand" size="md" onClick={() => reset()}>
        <RotateCcw className="w-4 h-4 mr-2" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}
