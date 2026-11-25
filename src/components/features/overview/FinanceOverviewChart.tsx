'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { NavView } from '@/types';

interface FinanceOverviewChartProps {
  showFinance: boolean;
  onNavigate: (view: NavView) => void;
}

const GRID_ROWS = [
  { y: 20, label: '5L' },
  { y: 46, label: '4L' },
  { y: 72, label: '3L' },
  { y: 98, label: '2L' },
  { y: 124, label: '1L' },
  { y: 148, label: '0' },
];

const CHART_POINTS = [
  { x: 45, y: 118, label: 'Week 1' },
  { x: 175, y: 74, label: 'Week 2' },
  { x: 305, y: 88, label: 'Week 3' },
  { x: 425, y: 56, label: 'Week 4' },
];

export function FinanceOverviewChart({ showFinance, onNavigate }: FinanceOverviewChartProps) {
  return (
    <Card className="lg:col-span-6 p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#E3EDE6] text-[#1D563B] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </span>
          <h2 className="text-base font-bold text-text-main">Finance Overview</h2>
        </div>
        {showFinance ? (
          <Link
            href="/payments"
            onClick={() => onNavigate('payments')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            <span>View Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-text-muted">
            <Lock className="w-3 h-3" /> Private
          </span>
        )}
      </div>

      {showFinance ? (
        <>
          <div className="flex items-center justify-center gap-5 text-[11px] font-medium text-text-muted mb-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1D563B]" /> This Month
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A8C4B2]" /> Last Month
            </span>
          </div>

          <div className="relative w-full h-48">
            <svg viewBox="0 0 460 165" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="financeAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {GRID_ROWS.map((row) => (
                <g key={row.label}>
                  <line x1="34" y1={row.y} x2="440" y2={row.y} stroke="#E6EFE9" strokeWidth="1" />
                  <text x="10" y={row.y + 4} fill="#647F71" fontSize="10" fontWeight="600">
                    {row.label}
                  </text>
                </g>
              ))}

              <path
                d="M 45 118 C 95 104, 130 74, 175 74 C 225 74, 255 90, 305 88 C 350 86, 385 60, 425 56 L 425 148 L 45 148 Z"
                fill="url(#financeAreaGrad)"
              />
              <path
                d="M 45 118 C 95 104, 130 74, 175 74 C 225 74, 255 90, 305 88 C 350 86, 385 60, 425 56"
                fill="none"
                stroke="#1D563B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {CHART_POINTS.map((pt) => (
                <g key={pt.label}>
                  <circle cx={pt.x} cy={pt.y} r="4" fill="#1D563B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x={pt.x} y="162" textAnchor="middle" fill="#647F71" fontSize="10" fontWeight="600">
                    {pt.label}
                  </text>
                </g>
              ))}

              <g transform="translate(362, 6)">
                <rect width="84" height="36" rx="8" fill="#10241A" />
                <text x="42" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="700">
                  ₹3.52 Lakh
                </text>
                <text x="42" y="28" textAnchor="middle" fill="#A8C4B2" fontSize="9">
                  Week 4
                </text>
              </g>
            </svg>
          </div>
        </>
      ) : (
        <div className="my-auto p-6 rounded-xl border border-dashed border-border bg-surface-subtle text-center text-xs text-text-muted space-y-1.5">
          <Lock className="w-5 h-5 mx-auto text-text-subtle" />
          <p className="font-semibold text-text-main">Finance Overview Restricted</p>
          <p>Revenue curves and collections are visible only to Founder &amp; Accountant views.</p>
        </div>
      )}
    </Card>
  );
}
