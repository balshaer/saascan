// Application configuration and constants

export const APP_CONFIG = {
  // Application metadata
  name: 'Mindful UX Analyzer',
  version: '2.0.0',
  description: 'Advanced SaaS concept analysis with comprehensive UX insights',
  
  // API configuration
  api: {
    gemini: {
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
      model: 'gemini-1.5-flash-latest',
      maxTokens: 4096,
      temperature: 0.3,
      topK: 1,
      topP: 0.8,
    },
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },
  
  // Storage configuration
  storage: {
    maxResults: 100,
    maxErrors: 10,
    cacheExpiryHours: 24,
    autoSaveEnabled: true,
    compressionEnabled: true,
  },
  
  // Performance monitoring
  performance: {
    metricsEnabled: true,
    maxMetrics: 100,
    webVitalsEnabled: true,
    customMetricsEnabled: true,
  },
  
  // UI configuration
  ui: {
    animationDuration: 300,
    debounceDelay: 500,
    toastDuration: 5000,
    maxInputLength: 5000,
    resultsPerPage: 10,
  },
  
  // Feature flags
  features: {
    advancedAnalytics: true,
    exportToPdf: true,
    realTimeAnalysis: false,
    collaborativeMode: false,
    aiEnhancedPrompts: true,
    multiLanguageSupport: true,
  },
  
  // Error handling
  errors: {
    enableErrorBoundary: true,
    enableErrorReporting: true,
    enableConsoleLogging: process.env.NODE_ENV === 'development',
    enablePerformanceLogging: process.env.NODE_ENV === 'development',
  },
  
  // Security
  security: {
    enableCSP: true,
    enableSanitization: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['json', 'csv', 'txt'],
  },
} as const;

// Environment-specific configuration
export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  
  // API keys (should be set via environment variables)
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY,
  
  // External service URLs
  analyticsUrl: import.meta.env.VITE_ANALYTICS_URL,
  errorReportingUrl: import.meta.env.VITE_ERROR_REPORTING_URL,
  
  // Build information
  buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
  commitHash: import.meta.env.VITE_COMMIT_HASH || 'unknown',
} as const;

// Validation functions
export const validateConfig = () => {
  const errors: string[] = [];
  
  // Check required environment variables in production
  if (ENV_CONFIG.isProduction) {
    if (!ENV_CONFIG.geminiApiKey) {
      errors.push('VITE_GEMINI_API_KEY is required in production');
    }
  }
  
  // Validate numeric values
  if (APP_CONFIG.api.timeout <= 0) {
    errors.push('API timeout must be positive');
  }
  
  if (APP_CONFIG.storage.maxResults <= 0) {
    errors.push('Max results must be positive');
  }
  
  if (APP_CONFIG.ui.maxInputLength <= 0) {
    errors.push('Max input length must be positive');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Helper functions for configuration access
export const getApiConfig = () => APP_CONFIG.api;
export const getStorageConfig = () => APP_CONFIG.storage;
export const getPerformanceConfig = () => APP_CONFIG.performance;
export const getUIConfig = () => APP_CONFIG.ui;
export const getFeatureFlags = () => APP_CONFIG.features;
export const getErrorConfig = () => APP_CONFIG.errors;
export const getSecurityConfig = () => APP_CONFIG.security;

// Feature flag checker
export const isFeatureEnabled = (feature: keyof typeof APP_CONFIG.features): boolean => {
  return APP_CONFIG.features[feature];
};

// Environment checker
export const isDevelopment = () => ENV_CONFIG.isDevelopment;
export const isProduction = () => ENV_CONFIG.isProduction;
export const isTest = () => ENV_CONFIG.isTest;

// API configuration with fallbacks
export const getGeminiApiKey = (): string => {
  const key = ENV_CONFIG.geminiApiKey;
  
  if (!key && isProduction()) {
    throw new Error('Gemini API key is required in production environment');
  }
  
  // Return fallback key for development/demo
  return key || "AIzaSyACk_TwCNngF9-vYxtUjkIq51ugGr4BY9Y";
};

// Build information
export const getBuildInfo = () => ({
  version: APP_CONFIG.version,
  buildTime: ENV_CONFIG.buildTime,
  commitHash: ENV_CONFIG.commitHash,
  environment: process.env.NODE_ENV,
});

// Configuration validation on module load
const validation = validateConfig();
if (!validation.isValid) {
  console.warn('Configuration validation failed:', validation.errors);
  
  if (isProduction()) {
    throw new Error(`Configuration errors: ${validation.errors.join(', ')}`);
  }
}

// Export default configuration
export default {
  app: APP_CONFIG,
  env: ENV_CONFIG,
  validate: validateConfig,
  isFeatureEnabled,
  isDevelopment,
  isProduction,
  isTest,
  getGeminiApiKey,
  getBuildInfo,
};
