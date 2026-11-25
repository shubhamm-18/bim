import React from 'react';

/**
 * Custom executive Finance ledger & vault SVG icon for the Owner-only Finance sidebar item.
 */
export function FinanceIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Finance"
    >
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18" />
      <path d="M8 13.5h4.5" />
      <path d="M8 16.5h3" />
      <circle cx="16.5" cy="15" r="2.2" />
    </svg>
  );
}
