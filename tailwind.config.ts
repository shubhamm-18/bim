import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          subtle: "var(--brand-subtle)",
          fg: "var(--brand-foreground)",
        },
        surface: {
          app: "var(--bg-app)",
          appSubtle: "var(--bg-app-subtle)",
          card: "var(--bg-card)",
          hover: "var(--bg-card-hover)",
          subtle: "var(--bg-card-subtle)",
          input: "var(--bg-input)",
          darkHero: "var(--bg-dark-hero)",
          darkPanel: "var(--bg-dark-panel)",
          darkControl: "var(--bg-dark-control)",
          darkCard: "var(--bg-dark-card)",
        },
        text: {
          main: "var(--text-main)",
          muted: "var(--text-muted)",
          subtle: "var(--text-subtle)",
          inverse: "var(--text-inverse)",
        },
        border: {
          DEFAULT: "var(--border-default)",
          subtle: "var(--border-subtle)",
          hover: "var(--border-hover)",
          darkHero: "var(--border-dark-hero)",
          darkPanel: "var(--border-dark-panel)",
          darkControl: "var(--border-dark-control)",
          darkCard: "var(--border-dark-card)",
        },
        status: {
          success: "var(--success)",
          successSubtle: "var(--success-subtle)",
          warning: "var(--warning)",
          warningSubtle: "var(--warning-subtle)",
          danger: "var(--danger)",
          dangerSubtle: "var(--danger-subtle)",
          info: "var(--info)",
          infoSubtle: "var(--info-subtle)",
        },
      },
      borderRadius: {
        card: "var(--radius-card)",
        btn: "var(--radius-button)",
        input: "var(--radius-input)",
        badge: "var(--radius-badge)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        cardHover: "var(--shadow-hover)",
      },
      width: {
        sidebar: "var(--sidebar-width)",
      },
      spacing: {
        sidebar: "var(--sidebar-width)",
        topbar: "var(--topbar-height)",
      },
      minHeight: {
        hero: "380px",
        heroMedia: "280px",
      },
      maxWidth: {
        workspace: "1600px",
      },
    },
  },
  plugins: [],
} satisfies Config;
