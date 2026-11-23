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
    id: 'monochrome',
    name: 'Minimal Monochrome',
    brandColor: '#18181b',
    brandHover: '#27272a',
    brandSubtle: '#f4f4f5',
    previewBg: 'bg-zinc-900',
  },
  {
    id: 'slate',
    name: 'Slate Executive',
    brandColor: '#27272a',
    brandHover: '#18181b',
    brandSubtle: '#f4f4f5',
    previewBg: 'bg-zinc-800',
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
  defaultPreset: 'monochrome',
  presets: themePresets,
  defaultBanner: 'banner-1',
  bannerOptions: heroBannerOptions,
  dimensions: {
    sidebarWidth: '15rem', // 240px
    topbarHeight: '4rem',  // 64px
    contentMaxWidth: '80rem', // 1280px (max-w-7xl)
  },
} as const;
