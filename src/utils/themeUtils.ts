import { cssVars } from './cssVariables';

/**
 * Utility functions for theme-aware styling using CSS variables
 */

/**
 * Get theme-aware score color based on score value
 */
export const getThemeScoreColor = (score: number, themeMode: string) => {
  if (score >= 80) {
    return {
      backgroundColor: cssVars.success,
      color: cssVars.inverse,
    };
  }
  if (score >= 60) {
    return {
      backgroundColor: cssVars.warning,
      color: cssVars.inverse,
    };
  }
  if (score >= 40) {
    return {
      backgroundColor: '#f97316', // Orange for average
      color: cssVars.inverse,
    };
  }
  return {
    backgroundColor: cssVars.error,
    color: cssVars.inverse,
  };
};

/**
 * Get theme-aware risk color based on risk level
 */
export const getThemeRiskColor = (level: string, themeMode: string) => {
  switch (level.toLowerCase()) {
    case 'low':
      return {
        backgroundColor: cssVars.success,
        color: cssVars.inverse,
      };
    case 'medium':
      return {
        backgroundColor: cssVars.warning,
        color: cssVars.inverse,
      };
    case 'high':
      return {
        backgroundColor: cssVars.error,
        color: cssVars.inverse,
      };
    default:
      return {
        backgroundColor: cssVars.bgSecondary,
        color: cssVars.paragraph,
      };
  }
};

/**
 * Get theme-aware status color based on status type
 */
export const getThemeStatusColor = (status: 'success' | 'warning' | 'error' | 'info') => {
  const statusColors = {
    success: cssVars.success,
    warning: cssVars.warning,
    error: cssVars.error,
    info: cssVars.info,
  };

  return {
    backgroundColor: statusColors[status],
    color: cssVars.inverse,
    borderColor: statusColors[status],
  };
};

/**
 * Get theme-aware validity color based on validity level
 */
export const getThemeValidityColor = (validity: string) => {
  switch (validity) {
    case 'Realistic':
    case 'Promising':
      return getThemeStatusColor('success');
    case 'Weak':
      return getThemeStatusColor('warning');
    case 'High-Risk':
      return getThemeStatusColor('error');
    default:
      return getThemeStatusColor('info');
  }
};

/**
 * Get theme-aware complexity color based on complexity level
 */
export const getThemeComplexityColor = (complexity: string) => {
  switch (complexity.toLowerCase()) {
    case 'low':
    case 'simple':
      return getThemeRiskColor('low');
    case 'medium':
    case 'moderate':
      return getThemeRiskColor('medium');
    case 'high':
    case 'complex':
    case 'very high':
      return getThemeRiskColor('high');
    default:
      return {
        backgroundColor: cssVars.bgSecondary,
        color: cssVars.paragraph,
      };
  }
};

/**
 * Get theme-aware priority color based on priority level
 */
export const getThemePriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return getThemeStatusColor('error');
    case 'medium':
      return getThemeStatusColor('warning');
    case 'low':
      return getThemeStatusColor('success');
    default:
      return getThemeStatusColor('info');
  }
};

/**
 * Get theme-aware hover styles using CSS variables
 */
export const getThemeHoverStyles = () => {
  return {
    '&:hover': {
      backgroundColor: cssVars.hover,
    },
  };
};
