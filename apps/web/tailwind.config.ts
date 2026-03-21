import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      /* ─────────────────────────────────────────────
       * Colors — "The Digital Playroom" Design System
       * Derived from primary #ae2f34, secondary #785900, surface #fff9eb
       * ───────────────────────────────────────────── */
      colors: {
        "error-container": "#ffdad6",
        "background": "#fff9eb",
        "on-tertiary-container": "#00504c",
        "on-secondary": "#ffffff",
        "on-error-container": "#93000a",
        "tertiary": "#006a65",
        "on-tertiary": "#ffffff",
        "primary-fixed": "#ffdad8",
        "on-surface-variant": "#5d3f3e",
        "on-error": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#1d1c13",
        "tertiary-container": "#7cf6ec",
        "on-tertiary-fixed": "#00201e",
        "tertiary-fixed-dim": "#5dd9d0",
        "primary-fixed-dim": "#ffb3b0",
        "on-primary-fixed-variant": "#8c1520",
        "on-background": "#1d1c13",
        "primary-container": "#ffdad8",
        "on-primary-container": "#8c1520",
        "on-primary": "#ffffff",
        "surface": "#fff9eb",
        "surface-container-low": "#f9f3e5",
        "secondary": "#785900",
        "surface-bright": "#fff9eb",
        "on-secondary-fixed-variant": "#5b4300",
        "inverse-on-surface": "#f6f0e2",
        "outline-variant": "#e7bdba",
        "secondary-fixed": "#ffdf9e",
        "surface-container": "#f3ede0",
        "secondary-container": "#ffdf9e",
        "error": "#ba1a1a",
        "surface-container-highest": "#e8e2d4",
        "primary": "#ae2f34",
        "surface-container-high": "#ede8da",
        "outline": "#926e6d",
        "on-tertiary-fixed-variant": "#00504c",
        "secondary-fixed-dim": "#fabd00",
        "surface-dim": "#dfdacc",
        "on-secondary-container": "#5b4300",
        "surface-variant": "#e8e2d4",
        "inverse-surface": "#333027",
        "on-secondary-fixed": "#261a00",
        "surface-tint": "#ae2f34",
        "tertiary-fixed": "#7cf6ec",
        "on-primary-fixed": "#410006",
        "inverse-primary": "#ffb3b0"
      },

      /* ─────────────────────────────────────────
       * Typography — Plus Jakarta Sans
       * ───────────────────────────────────────── */
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-md': ['2.75rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-md': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title-lg': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'title-md': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '600' }],
        'label-md': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em', fontWeight: '500' }],
      },

      /* ─────────────────────────────────────────
       * Border Radius — soft, bubbly shapes
       * ───────────────────────────────────────── */
      borderRadius: {
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '3rem',
        full: '9999px',
      },

      /* ─────────────────────────────────────────
       * Ambient Shadows — tinted, ultra-diffused
       * Never use flat grey shadows
       * ───────────────────────────────────────── */
      boxShadow: {
        ambient: '0 8px 32px rgba(29, 28, 19, 0.04)',
        'ambient-md': '0 12px 48px rgba(29, 28, 19, 0.05)',
        'ambient-lg': '0 16px 64px rgba(29, 28, 19, 0.06)',
        glass: '0 8px 32px rgba(29, 28, 19, 0.08)',
      },

      /* ─────────────────────────────────────────
       * Backdrop Blur — for glassmorphism
       * ───────────────────────────────────────── */
      backdropBlur: {
        glass: '20px',
        'glass-lg': '40px',
      },

      /* ─────────────────────────────────────────
       * Keyframes & animations
       * ───────────────────────────────────────── */
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        float: 'float 3s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
