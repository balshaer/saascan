import { HorizontalAnalysisResult } from './uxAnalyzer';

// Storage key for analysis history
const STORAGE_KEY = 'saascan_analysis_history';

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
  // Save analysis to history
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

      // Keep only last 50 analyses to prevent localStorage overflow
      const limitedHistory = updatedHistory.slice(0, 50);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory));
      return true;
    } catch (error) {
      console.error('Failed to save analysis to history:', error);
      return false;
    }
  }

  // Get all analysis history
  getAnalysisHistory(): AnalysisHistoryItem[] {
    try {
      const historyData = localStorage.getItem(STORAGE_KEY);
      if (!historyData) return [];

      const parsedHistory = JSON.parse(historyData);

      // Validate data structure
      if (!Array.isArray(parsedHistory)) {
        console.warn('Invalid history data structure, resetting...');
        this.clearHistory();
        return [];
      }

      return parsedHistory.filter(this.validateHistoryItem);
    } catch (error) {
      console.error('Failed to load analysis history:', error);
      this.clearHistory(); // Clear corrupted data
      return [];
    }
  }

  // Get analysis by ID
  getAnalysisById(id: string): AnalysisHistoryItem | null {
    const history = this.getAnalysisHistory();
    return history.find((item) => item.id === id) || null;
  }

  // Delete analysis by ID
  deleteAnalysis(id: string): boolean {
    try {
      const history = this.getAnalysisHistory();
      const updatedHistory = history.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
      return true;
    } catch (error) {
      console.error('Failed to delete analysis:', error);
      return false;
    }
  }

  // Delete multiple analyses
  deleteMultipleAnalyses(ids: string[]): boolean {
    try {
      const history = this.getAnalysisHistory();
      const updatedHistory = history.filter((item) => !ids.includes(item.id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
      return true;
    } catch (error) {
      console.error('Failed to delete multiple analyses:', error);
      return false;
    }
  }

  // Clear all history
  clearHistory(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear history:', error);
      return false;
    }
  }

  // Search analyses by text
  searchAnalyses(query: string): AnalysisHistoryItem[] {
    const history = this.getAnalysisHistory();
    const lowerQuery = query.toLowerCase();

    return history.filter(
      (item) =>
        item.originalIdea.toLowerCase().includes(lowerQuery) ||
        item.analysisResults.targetAudience.toLowerCase().includes(lowerQuery) ||
        item.analysisResults.problemsSolved.toLowerCase().includes(lowerQuery),
    );
  }

  // Filter analyses by score range
  filterByScoreRange(minScore: number, maxScore: number): AnalysisHistoryItem[] {
    const history = this.getAnalysisHistory();
    return history.filter((item) => item.overallScore >= minScore && item.overallScore <= maxScore);
  }

  // Filter analyses by date range
  filterByDateRange(startDate: Date, endDate: Date): AnalysisHistoryItem[] {
    const history = this.getAnalysisHistory();
    return history.filter((item) => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  // Filter analyses by innovation level
  filterByInnovationLevel(level: 'منخفض' | 'متوسط' | 'عالي'): AnalysisHistoryItem[] {
    const history = this.getAnalysisHistory();
    return history.filter((item) => item.analysisResults.innovationLevel === level);
  }

  // Get storage statistics
  getStorageStats(): { totalAnalyses: number; storageSize: string; oldestAnalysis?: string } {
    const history = this.getAnalysisHistory();
    const storageData = localStorage.getItem(STORAGE_KEY) || '';
    const sizeInBytes = new Blob([storageData]).size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);

    return {
      totalAnalyses: history.length,
      storageSize: `${sizeInKB} KB`,
      oldestAnalysis: history.length > 0 ? history[history.length - 1].timestamp : undefined,
    };
  }

  // Validate history item structure
  private validateHistoryItem(item: any): item is AnalysisHistoryItem {
    return (
      item &&
      typeof item.id === 'string' &&
      typeof item.timestamp === 'string' &&
      typeof item.originalIdea === 'string' &&
      typeof item.overallScore === 'number' &&
      item.analysisResults &&
      typeof item.analysisResults === 'object'
    );
  }

  // Export history as JSON
  exportHistory(): string {
    const history = this.getAnalysisHistory();
    return JSON.stringify(history, null, 2);
  }

  // Import history from JSON
  importHistory(jsonData: string): boolean {
    try {
      const importedData = JSON.parse(jsonData);

      if (!Array.isArray(importedData)) {
        throw new Error('Invalid data format');
      }

      const validItems = importedData.filter(this.validateHistoryItem);

      if (validItems.length === 0) {
        throw new Error('No valid items found');
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(validItems));
      return true;
    } catch (error) {
      console.error('Failed to import history:', error);
      return false;
    }
  }
}

// Factory function for creating storage service
export const createAnalysisStorageService = (): AnalysisStorageService => {
  return new AnalysisStorageService();
};

// Default storage service instance
export const analysisStorage = createAnalysisStorageService();
