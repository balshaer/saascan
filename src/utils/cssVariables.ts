// Utility functions for working with CSS variables

// Get a CSS variable value
export const getCSSVariable = (variableName: string): string => {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

// Set a CSS variable value
export const setCSSVariable = (variableName: string, value: string): void => {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty(variableName, value);
};

// CSS variable names matching themes.css
export const cssVars = {
  // Core theme colors from themes.css
  background: 'var(--background)',
  headline: 'var(--headline)',
  paragraph: 'var(--paragraph)',
  button: 'var(--button)',
  buttonText: 'var(--button-text)',
  stroke: 'var(--stroke)',
  main: 'var(--main)',
  highlight: 'var(--highlight)',
  secondary: 'var(--secondary)',
  tertiary: 'var(--tertiary)',

  // Semantic aliases for better component usage
  surface: 'var(--background)',
  hover: 'rgba(148, 161, 178, 0.1)', // Based on paragraph color with opacity
  focus: 'var(--highlight)',
  inverse: 'var(--button-text)',
  success: 'var(--tertiary)',
  warning: '#f59e0b',
  error: '#ef4444',
  info: 'var(--highlight)',

  // Text color aliases
  textPrimary: 'var(--headline)',
  textSecondary: 'var(--paragraph)',
  textTertiary: 'var(--secondary)',
  textMuted: 'var(--secondary)',
  textInverse: 'var(--button-text)',

  // Background color aliases
  bgPrimary: 'var(--background)',
  bgSecondary: 'rgba(148, 161, 178, 0.05)',
  bgTertiary: 'rgba(148, 161, 178, 0.1)',
  bgCard: 'var(--background)',

  // Border color aliases
  borderPrimary: 'rgba(148, 161, 178, 0.2)',
  borderSecondary: 'rgba(148, 161, 178, 0.15)',
  borderFocus: 'var(--highlight)',

  // Accent for active states
  accent: 'var(--button)',
} as const;

// Helper function to create style objects with CSS variables
export const createStyles = (styles: Record<string, string>) => styles;
