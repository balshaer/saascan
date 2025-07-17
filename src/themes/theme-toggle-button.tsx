'use client';

import { Expand } from '@theme-toggles/react';
import '@theme-toggles/react/css/Expand.css';
import { useTheme } from 'next-themes';
import React from 'react';

import { AnimationStart, AnimationVariant, createAnimation } from './theme-animations';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant;
  start?: AnimationStart;
  showLabel?: boolean;
  url?: string;
  className?: string;
}

export function ThemeToggleButton({
  variant = 'circle-blur',
  start = 'top-left',
  showLabel = false,
  url = '',
  className = '',
}: ThemeToggleAnimationProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const styleId = 'theme-transition-styles';

  const updateStyles = React.useCallback((css: string, name: string) => {
    if (typeof window === 'undefined') return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, url);

    updateStyles(animation.css, animation.name);

    if (typeof window === 'undefined') return;

    const switchTheme = () => {
      setTheme(isDark ? 'light' : 'dark');
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [isDark, setTheme, variant, start, url, updateStyles]);

  const handleToggle = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleTheme();
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleTheme}
          role="button"
          tabIndex={0}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          className={className}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleToggle(e);
            }
          }}
        >
          <Expand toggled={isDark} duration={750} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{isDark ? 'Dark Mode' : 'Light Mode'}</TooltipContent>
    </Tooltip>
  );
}
