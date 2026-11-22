import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { agencyConfig } from '@/config/agency.config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Universal Currency Formatter
 * Automatically adapts to the currencySymbol and locale configured in agency.config.ts
 */
export function formatCurrency(amount: number): string {
  const { currencySymbol, currencyCode, localeString } = agencyConfig.locale;

  if (currencyCode === 'INR') {
    if (amount >= 10000000) {
      return `${currencySymbol}${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `${currencySymbol}${(amount / 100000).toFixed(2)} Lakh`;
    }
    return `${currencySymbol}${amount.toLocaleString(localeString)}`;
  }

  // International standard formatting (e.g. USD, EUR, GBP)
  if (amount >= 1000000) {
    return `${currencySymbol}${(amount / 1000000).toFixed(2)}M`;
  }
  if (amount >= 1000) {
    return `${currencySymbol}${(amount / 1000).toFixed(1)}k`;
  }
  return `${currencySymbol}${amount.toLocaleString(localeString)}`;
}

/**
 * Universal Date Formatter
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr + 'T12:00:00Z');
    return d.toLocaleDateString(agencyConfig.locale.dateFormat, {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Universal Dynamic Today Formatter (e.g., "Saturday, 21 November 2026")
 */
export function getTodayFormatted(): string {
  return new Intl.DateTimeFormat(agencyConfig.locale.dateFormat, {
    timeZone: agencyConfig.locale.timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());
}

/**
 * Compact Hero Date Formatter (e.g. "22 NOV 2026")
 */
export function getHeroDateFormatted(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleDateString(agencyConfig.locale.dateFormat, { month: 'short' }).toUpperCase();
  const year = now.getFullYear();
  return `${day} ${month} ${year}`;
}
