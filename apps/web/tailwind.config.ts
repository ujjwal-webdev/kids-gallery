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
        // Primary — high-energy CTAs, active states
        primary: {
          DEFAULT: '#ae2f34',
          container: '#ffdad6',
          on: '#ffffff',
          'on-container': '#410003',
        },
        // Secondary — warmth, guidance
        secondary: {
          DEFAULT: '#785900',
          container: '#ffdf9e',
          on: '#ffffff',
          'on-container': '#261900',
        },
        // Tertiary — complementary mint/teal accents
        tertiary: {
          DEFAULT: '#3a6658',
          container: '#bcecd9',
          'on-container': '#002117',
        },
        // Surface hierarchy — layered canvas
        surface: {
          DEFAULT: '#fff9eb',
          'container-lowest': '#ffffff',
          'container-low': '#fff3dc',
          container: '#feeece',
          'container-high': '#f9e8c8',
          'container-highest': '#f3e2c2',
          on: '#1d1c13',
          'on-variant': '#4d4639',
        },
        // Outlines & borders
        outline: {
          DEFAULT: '#7f7667',
          variant: '#d0c5b4',
        },
        // Error
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
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
