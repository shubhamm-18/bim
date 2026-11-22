/**
 * ============================================================================
 * 🎨 THEME & VISUAL STYLING CONFIGURATION
 * Edit this file to change default presets, color palettes, and hero backgrounds.
 * ============================================================================
 */

export interface ThemePreset {
  id: string;
  name: string;
  brandColor: string;
  brandHover: string;
  brandSubtle: string;
  previewBg: string;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'crimson',
    name: 'Ruby Crimson',
    brandColor: '#cd4055',
    brandHover: '#b83245',
    brandSubtle: '#fde8ea',
    previewBg: 'bg-[#cd4055]',
  },
  {
    id: 'violet',
    name: 'Royal Violet',
    brandColor: '#7040cd',
    brandHover: '#5c32b0',
    brandSubtle: '#f0ebfa',
    previewBg: 'bg-[#7040cd]',
  },
  {
    id: 'sapphire',
    name: 'Sapphire Blue',
    brandColor: '#2563eb',
    brandHover: '#1d4ed8',
    brandSubtle: '#eff6ff',
    previewBg: 'bg-[#2563eb]',
  },
  {
    id: 'emerald',
    name: 'Emerald Mint',
    brandColor: '#059669',
    brandHover: '#047857',
    brandSubtle: '#ecfdf5',
    previewBg: 'bg-[#059669]',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    brandColor: '#d97706',
    brandHover: '#b45309',
    brandSubtle: '#fffbeb',
    previewBg: 'bg-[#d97706]',
  },
  {
    id: 'slate',
    name: 'Slate Executive',
    brandColor: '#334155',
    brandHover: '#1e293b',
    brandSubtle: '#f1f5f9',
    previewBg: 'bg-[#334155]',
  },
];

export interface HeroBannerOption {
  id: string;
  label: string;
  file?: string;
  category: string;
}

export const heroBannerOptions: HeroBannerOption[] = [
  {
    id: 'banner-1',
    label: '1. Luxury Villa',
    file: '/banners/banner-1.jpg',
    category: 'Architecture',
  },
  {
    id: 'banner-2',
    label: '2. 3D Geometry',
    file: '/banners/banner-2.jpg',
    category: 'Abstract',
  },
  {
    id: 'banner-3',
    label: '3. City Skyline',
    file: '/banners/banner-3.jpg',
    category: 'Commercial',
  },
  {
    id: 'banner-4',
    label: '4. Minimal Slate',
    file: '/banners/banner-4.jpg',
    category: 'Minimal',
  },
  {
    id: 'gradient',
    label: 'Default Gradient',
    category: 'Atmospheric',
  },
];

export const themeConfig = {
  defaultPreset: 'crimson',
  presets: themePresets,
  defaultBanner: 'banner-1',
  bannerOptions: heroBannerOptions,
  dimensions: {
    sidebarWidth: '15rem', // 240px
    topbarHeight: '4rem',  // 64px
    contentMaxWidth: '80rem', // 1280px (max-w-7xl)
  },
} as const;
