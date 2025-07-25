/**
 * Utility functions for Tailwind-only theme styling (no CSS variables)
 */

/**
 * Get score-based Tailwind class names
 */
export const getTailwindScoreClass = (score: number) => {
  if (score >= 80) return 'bg-green-500 text-white';
  if (score >= 60) return 'bg-yellow-500 text-white';
  if (score >= 40) return 'bg-orange-500 text-white';
  return 'bg-red-500 text-white';
};

/**
 * Get risk level Tailwind class names
 */
export const getTailwindRiskClass = (level: string) => {
  switch (level.toLowerCase()) {
    case 'low':
      return 'bg-green-500 text-white';
    case 'medium':
      return 'bg-yellow-500 text-white';
    case 'high':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

/**
 * Get status type Tailwind class names
 */
export const getTailwindStatusClass = (status: 'success' | 'warning' | 'error' | 'info') => {
  const base: Record<typeof status, string> = {
    success: 'bg-green-500 text-white border-green-500',
    warning: 'bg-yellow-500 text-white border-yellow-500',
    error: 'bg-red-500 text-white border-red-500',
    info: 'bg-blue-500 text-white border-blue-500',
  };
  return base[status];
};

/**
 * Get validity type Tailwind class names
 */
export const getTailwindValidityClass = (validity: string) => {
  switch (validity) {
    case 'Realistic':
    case 'Promising':
      return getTailwindStatusClass('success');
    case 'Weak':
      return getTailwindStatusClass('warning');
    case 'High-Risk':
      return getTailwindStatusClass('error');
    default:
      return getTailwindStatusClass('info');
  }
};

/**
 * Get complexity level Tailwind class names
 */
export const getTailwindComplexityClass = (complexity: string) => {
  switch (complexity.toLowerCase()) {
    case 'low':
    case 'simple':
      return getTailwindRiskClass('low');
    case 'medium':
    case 'moderate':
      return getTailwindRiskClass('medium');
    case 'high':
    case 'complex':
    case 'very high':
      return getTailwindRiskClass('high');
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

/**
 * Get priority level Tailwind class names
 */
export const getTailwindPriorityClass = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return getTailwindStatusClass('error');
    case 'medium':
      return getTailwindStatusClass('warning');
    case 'low':
      return getTailwindStatusClass('success');
    default:
      return getTailwindStatusClass('info');
  }
};

/**
 * Get hover state Tailwind class names
 */
export const getTailwindHoverClass = () => {
  return 'hover:bg-slate-200';
};
