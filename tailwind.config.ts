/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        navbar: 'var(--navbar)',
        headline: 'var(--headline)',
        paragraph: 'var(--paragraph)',
        main: 'var(--main)',

        border: 'var(--border)',
        input: 'var(--stroke)',
        ring: 'var(--highlight)',
        accent: 'var(--highlight)',
        muted: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        gridline: 'var(--grid-line)',

        primary: {
          DEFAULT: 'var(--button)',
          foreground: 'var(--button-text)',
          hover: 'var(--button-hover)',
        },

        secondary: {
          DEFAULT: 'var(--button-secondary)',
          foreground: 'var(--button-secondary-text)',
          hover: 'var(--button-secondary-hover)',
        },

        destructive: {
          DEFAULT: 'var(--danger)',
          foreground: 'var(--danger-text)',
          hover: 'var(--danger-hover)',
        },

        card: {
          DEFAULT: 'var(--card)',
          border: 'var(--card-border)',
          foreground: 'var(--card-main)',
          headline: 'var(--card-headline)',
          paragraph: 'var(--card-paragraph)',
          button: 'var(--card-button)',
          'button-text': 'var(--card-button-text)',
          stroke: 'var(--card-stroke)',
          highlight: 'var(--card-highlight)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'loading-wave': {
          '0%, 100%': { height: '0.625rem' },
          '50%': { height: '3.125rem' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'loading-wave': 'loading-wave 1s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
