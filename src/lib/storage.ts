import { AnalysisResult } from './uxAnalyzer';

// Storage keys
const STORAGE_KEYS = {
  RESULTS: 'mindful-ux-analyzer-results',
  PREFERENCES: 'mindful-ux-analyzer-preferences',
  CACHE: 'mindful-ux-analyzer-cache',
  ANALYTICS: 'mindful-ux-analyzer-analytics',
} as const;

const MAX_RESULTS = 100; // Increased limit for better user experience
const CACHE_EXPIRY_HOURS = 24; // Cache expiry time

// User preferences interface
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'ar';
  autoSave: boolean;
  showOnboarding: boolean;
  defaultAnalysisView: 'overview' | 'detailed';
  exportFormat: 'json' | 'csv' | 'pdf';
  notifications: boolean;
}

// Cache interface for performance optimization
export interface CacheEntry {
  key: string;
  data: any;
  timestamp: number;
  expiresAt: number;
}

// Analytics data for usage tracking
export interface AnalyticsData {
  totalAnalyses: number;
  lastAnalysisDate: string;
  averageScore: number;
  mostCommonIssues: string[];
  userJourney: string[];
}

// Enhanced storage functions with error handling and validation
export const saveToLocalStorage = (results: AnalysisResult[]): boolean => {
  try {
    // Validate input
    if (!Array.isArray(results)) {
      console.warn('Invalid results array provided to saveToLocalStorage');
      return false;
    }

    // Keep only the most recent results and ensure data integrity
    const limitedResults = results
      .slice(0, MAX_RESULTS)
      .filter((result) => result && result.id && result.timestamp);

    // Add metadata
    const storageData = {
      results: limitedResults,
      lastUpdated: new Date().toISOString(),
      version: '2.0',
    };

    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(storageData));

    // Update analytics
    updateAnalytics(limitedResults);

    return true;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    // Try to clear corrupted data and retry once
    try {
      localStorage.removeItem(STORAGE_KEYS.RESULTS);
      localStorage.setItem(
        STORAGE_KEYS.RESULTS,
        JSON.stringify({
          results: results.slice(0, 10), // Save only recent results as fallback
          lastUpdated: new Date().toISOString(),
          version: '2.0',
        }),
      );
      return true;
    } catch (retryError) {
      console.error('Failed to save even after cleanup:', retryError);
      return false;
    }
  }
};

export const loadFromLocalStorage = (): AnalysisResult[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.RESULTS);
    if (!stored) {
      // Initialize with sample data for demo purposes
      const sampleData = generateSampleData();
      saveToLocalStorage(sampleData);
      return sampleData;
    }

    const parsedData = JSON.parse(stored);

    // Handle legacy format
    if (Array.isArray(parsedData)) {
      const legacyResults = parsedData as AnalysisResult[];
      saveToLocalStorage(legacyResults); // Migrate to new format
      return legacyResults;
    }

    // Handle new format with metadata
    if (parsedData.results && Array.isArray(parsedData.results)) {
      return parsedData.results;
    }

    // Fallback to empty array if data is corrupted
    console.warn('Corrupted localStorage data detected, resetting...');
    localStorage.removeItem(STORAGE_KEYS.RESULTS);
    return [];
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    // Try to recover by clearing corrupted data
    try {
      localStorage.removeItem(STORAGE_KEYS.RESULTS);
    } catch (clearError) {
      console.error('Failed to clear corrupted localStorage:', clearError);
    }
    return [];
  }
};

const generateSampleData = (): AnalysisResult[] => {
  return [
    {
      id: 'sample_1',
      input:
        'My e-commerce checkout process has multiple steps. Users need to create an account, verify email, fill shipping details, and payment info. Many users abandon during account creation.',
      score: 68,
      issues: [
        'Too many required form fields could cause abandonment',
        'Complex multi-step process may frustrate users',
        'Email verification step creates friction in checkout flow',
      ],
      recommendations: [
        'Allow guest checkout without account creation',
        'Reduce checkout steps to 2-3 maximum',
        'Make email verification optional or post-purchase',
      ],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      language: 'en',
    },
    {
      id: 'sample_2',
      input:
        'عملية التسجيل في تطبيقي معقدة ومتعددة الخطوات. المستخدمون يحتاجون لملء معلومات شخصية كثيرة والتحقق من الهاتف قبل الوصول للتطبيق.',
      score: 72,
      issues: [
        'كثرة الحقول المطلوبة في النموذج قد تسبب الهجر',
        'عملية التحقق من الهاتف قد تخلق حاجز دخول',
        'هيكل التنقل المعقد قد يربك المستخدمين',
      ],
      recommendations: [
        'تقليل حقول النموذج للمعلومات الأساسية فقط',
        'جعل التحقق من الهاتف اختياري في البداية',
        'تبسيط عملية التسجيل لخطوة واحدة أو خطوتين',
      ],
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      language: 'ar',
    },
  ];
};

// User preferences management
export const saveUserPreferences = (preferences: Partial<UserPreferences>): boolean => {
  try {
    const currentPrefs = loadUserPreferences();
    const updatedPrefs = { ...currentPrefs, ...preferences };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updatedPrefs));
    return true;
  } catch (error) {
    console.error('Failed to save user preferences:', error);
    return false;
  }
};

export const loadUserPreferences = (): UserPreferences => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!stored) {
      return getDefaultPreferences();
    }
    const parsed = JSON.parse(stored);
    return { ...getDefaultPreferences(), ...parsed };
  } catch (error) {
    console.error('Failed to load user preferences:', error);
    return getDefaultPreferences();
  }
};

const getDefaultPreferences = (): UserPreferences => ({
  theme: 'system',
  language: 'en',
  autoSave: true,
  showOnboarding: true,
  defaultAnalysisView: 'overview',
  exportFormat: 'json',
  notifications: true,
});

// Cache management for performance optimization
export const setCache = (
  key: string,
  data: any,
  expiryHours: number = CACHE_EXPIRY_HOURS,
): boolean => {
  try {
    const cacheEntry: CacheEntry = {
      key,
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + expiryHours * 60 * 60 * 1000,
    };

    const existingCache = getCache();
    existingCache[key] = cacheEntry;

    localStorage.setItem(STORAGE_KEYS.CACHE, JSON.stringify(existingCache));
    return true;
  } catch (error) {
    console.error('Failed to set cache:', error);
    return false;
  }
};

export const getCache = (): Record<string, CacheEntry> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CACHE);
    if (!stored) return {};

    const cache = JSON.parse(stored);
    const now = Date.now();

    // Clean expired entries
    const cleanCache: Record<string, CacheEntry> = {};
    Object.values(cache).forEach((entry: CacheEntry) => {
      if (entry.expiresAt > now) {
        cleanCache[entry.key] = entry;
      }
    });

    // Save cleaned cache back
    localStorage.setItem(STORAGE_KEYS.CACHE, JSON.stringify(cleanCache));
    return cleanCache;
  } catch (error) {
    console.error('Failed to get cache:', error);
    return {};
  }
};

export const getCachedData = (key: string): any | null => {
  const cache = getCache();
  const entry = cache[key];
  return entry && entry.expiresAt > Date.now() ? entry.data : null;
};

// Analytics and usage tracking
const updateAnalytics = (results: AnalysisResult[]): void => {
  try {
    const analytics: AnalyticsData = {
      totalAnalyses: results.length,
      lastAnalysisDate: results[0]?.timestamp || new Date().toISOString(),
      averageScore:
        results.length > 0
          ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
          : 0,
      mostCommonIssues: extractMostCommonIssues(results),
      userJourney: extractUserJourney(results),
    };

    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  } catch (error) {
    console.error('Failed to update analytics:', error);
  }
};

export const getAnalytics = (): AnalyticsData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to get analytics:', error);
    return null;
  }
};

const extractMostCommonIssues = (results: AnalysisResult[]): string[] => {
  const issueCount: Record<string, number> = {};

  results.forEach((result) => {
    result.issues?.forEach((issue) => {
      issueCount[issue] = (issueCount[issue] || 0) + 1;
    });
  });

  return Object.entries(issueCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([issue]) => issue);
};

const extractUserJourney = (results: AnalysisResult[]): string[] => {
  return results
    .slice(0, 10)
    .map((result) => `${result.score}-${result.validity || 'unknown'}`)
    .reverse();
};

// Clear all storage data
export const clearAllData = (): boolean => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Failed to clear all data:', error);
    return false;
  }
};

// Export data for backup
export const exportAllData = () => {
  try {
    const data = {
      results: loadFromLocalStorage(),
      preferences: loadUserPreferences(),
      analytics: getAnalytics(),
      exportDate: new Date().toISOString(),
      version: '2.0',
    };

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Failed to export data:', error);
    return null;
  }
};
