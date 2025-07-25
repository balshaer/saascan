import Cookies from 'js-cookie';
import { HorizontalAnalysisResult } from './uxAnalyzer';

// Storage key for analysis history
const STORAGE_KEY = 'saascan_analysis_history';
const COOKIE_CONSENT_KEY = 'saascan_cookie_consent';

// Interface for analysis history item
export interface AnalysisHistoryItem {
  id: string;
  timestamp: string;
  originalIdea: string;
  analysisResults: HorizontalAnalysisResult;
  overallScore: number;
}

// Analysis storage service following Single Responsibility Principle
export class AnalysisStorageService {
  // Save analysis to history using cookies
  saveAnalysis(analysis: HorizontalAnalysisResult): boolean {
    try {
      const historyItem: AnalysisHistoryItem = {
        id: analysis.id,
        timestamp: analysis.timestamp,
        originalIdea: analysis.originalIdea,
        analysisResults: analysis,
        overallScore: analysis.overallScore,
      };
      const existingHistory = this.getAnalysisHistory();
      const updatedHistory = [historyItem, ...existingHistory];
      const limitedHistory = updatedHistory.slice(0, 50);
      Cookies.set(STORAGE_KEY, JSON.stringify(limitedHistory), { expires: 365 });
      return true;
    } catch (error) {
      console.error('Failed to save analysis to history:', error);
      return false;
    }
  }

  // Get all analysis history from cookies
  getAnalysisHistory(): AnalysisHistoryItem[] {
    try {
      const historyData = Cookies.get(STORAGE_KEY);
      if (!historyData) return [];
      const parsedHistory = JSON.parse(historyData);
      if (!Array.isArray(parsedHistory)) return [];
      return parsedHistory;
    } catch (error) {
      console.error('Failed to load analysis history from cookies:', error);
      return [];
    }
  }

  // Remove all analysis history from cookies
  clearAnalysisHistory() {
    Cookies.remove(STORAGE_KEY);
  }

  // Cookie consent helpers
  getCookieConsent(): boolean | null {
    const consent = Cookies.get(COOKIE_CONSENT_KEY);
    if (consent === 'granted') return true;
    if (consent === 'denied') return false;
    return null;
  }
  setCookieConsent(granted: boolean) {
    Cookies.set(COOKIE_CONSENT_KEY, granted ? 'granted' : 'denied', { expires: 365 });
  }
}

// Factory function for creating storage service
export const createAnalysisStorageService = (): AnalysisStorageService => {
  return new AnalysisStorageService();
};

// Default storage service instance
export const analysisStorage = createAnalysisStorageService();
