/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'saascan';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

const getInitialTheme = (defaultTheme?: ThemeMode): ThemeMode => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && (stored === 'light' || stored === 'dark')) {
      return stored as ThemeMode;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }

  if (defaultTheme) {
    return defaultTheme;
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  return 'light';
};

const applyThemeToDocument = (mode: ThemeMode) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', mode);
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getInitialTheme(defaultTheme));

  useEffect(() => {
    applyThemeToDocument(themeMode);
  }, [themeMode]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [themeMode]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (!stored) {
          setThemeMode(e.matches ? 'dark' : 'light');
        }
      } catch (error) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const contextValue: ThemeContextType = {
    themeMode,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.warn('useTheme called outside of ThemeProvider, using default theme');
    return {
      themeMode: 'light',
      toggleTheme: () => console.warn('toggleTheme called outside ThemeProvider'),
      setTheme: () => console.warn('setTheme called outside ThemeProvider'),
    };
  }
  return context;
};

export default ThemeContext;
