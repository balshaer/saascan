import { AnalysisHistoryItem, analysisStorage } from '@/lib/analysisStorage';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from './useToast';

// Custom hook for managing analysis history
const useAnalysisHistory = () => {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<AnalysisHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    minScore: 0,
    maxScore: 100,
    innovationLevel: '' as '' | 'منخفض' | 'متوسط' | 'عالي',
    dateRange: {
      start: '',
      end: '',
    },
  });
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  // Check for cookie consent on mount
  useEffect(() => {
    const consent = analysisStorage.getCookieConsent();
    setCookieConsent(consent);
    if (consent === null) setShowDialog(true);
  }, []);

  // Load history only if consent is granted
  useEffect(() => {
    if (cookieConsent) {
      loadHistory();
    } else if (cookieConsent === false) {
      setHistory([]);
    }
  }, [cookieConsent, loadHistory]);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  // Apply filters when history, search query, or filters change
  useEffect(() => {
    applyFilters();
  }, [history, searchQuery, filters]);

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const historyData = analysisStorage.getAnalysisHistory();
      setHistory(historyData);
    } catch (error) {
      console.error('Failed to load history:', error);
      toast({
        title: 'خطأ في تحميل السجل',
        description: 'فشل في تحميل سجل التحليلات',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const applyFilters = useCallback(() => {
    let filtered = [...history];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = analysisStorage.searchAnalyses(searchQuery.trim());
    }

    // Apply score range filter
    filtered = filtered.filter(
      (item) => item.overallScore >= filters.minScore && item.overallScore <= filters.maxScore,
    );

    // Apply innovation level filter
    if (filters.innovationLevel) {
      filtered = filtered.filter(
        (item) => item.analysisResults.innovationLevel === filters.innovationLevel,
      );
    }

    // Apply date range filter
    if (filters.dateRange.start && filters.dateRange.end) {
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.timestamp);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setFilteredHistory(filtered);
  }, [history, searchQuery, filters]);

  const deleteAnalysis = useCallback(
    async (id: string) => {
      try {
        const success = analysisStorage.deleteAnalysis(id);
        if (success) {
          await loadHistory();
          setSelectedItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
          toast({
            title: 'تم الحذف بنجاح',
            description: 'تم حذف التحليل من السجل',
          });
        } else {
          throw new Error('Failed to delete analysis');
        }
      } catch (error) {
        console.error('Failed to delete analysis:', error);
        toast({
          title: 'خطأ في الحذف',
          description: 'فشل في حذف التحليل',
          variant: 'destructive',
        });
      }
    },
    [loadHistory, toast],
  );

  const deleteSelectedAnalyses = useCallback(async () => {
    if (selectedItems.size === 0) {
      toast({
        title: 'لا توجد عناصر محددة',
        description: 'يرجى تحديد التحليلات المراد حذفها',
        variant: 'destructive',
      });
      return;
    }

    try {
      const success = analysisStorage.deleteMultipleAnalyses(Array.from(selectedItems));
      if (success) {
        await loadHistory();
        setSelectedItems(new Set());
        toast({
          title: 'تم الحذف بنجاح',
          description: `تم حذف ${selectedItems.size} تحليل من السجل`,
        });
      } else {
        throw new Error('Failed to delete selected analyses');
      }
    } catch (error) {
      console.error('Failed to delete selected analyses:', error);
      toast({
        title: 'خطأ في الحذف',
        description: 'فشل في حذف التحليلات المحددة',
        variant: 'destructive',
      });
    }
  }, [selectedItems, loadHistory, toast]);

  const clearAllHistory = useCallback(async () => {
    try {
      const success = analysisStorage.clearHistory();
      if (success) {
        setHistory([]);
        setFilteredHistory([]);
        setSelectedItems(new Set());
        toast({
          title: 'تم مسح السجل',
          description: 'تم مسح جميع التحليلات من السجل',
        });
      } else {
        throw new Error('Failed to clear history');
      }
    } catch (error) {
      console.error('Failed to clear history:', error);
      toast({
        title: 'خطأ في المسح',
        description: 'فشل في مسح السجل',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const toggleItemSelection = useCallback((id: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const selectAllItems = useCallback(() => {
    const allIds = filteredHistory.map((item) => item.id);
    setSelectedItems(new Set(allIds));
  }, [filteredHistory]);

  const deselectAllItems = useCallback(() => {
    setSelectedItems(new Set());
  }, []);

  const exportHistory = useCallback(() => {
    try {
      const exportData = analysisStorage.exportHistory();
      const blob = new Blob([exportData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `saascan-history-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'تم التصدير بنجاح',
        description: 'تم تصدير سجل التحليلات بنجاح',
      });
    } catch (error) {
      console.error('Failed to export history:', error);
      toast({
        title: 'خطأ في التصدير',
        description: 'فشل في تصدير السجل',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const getStorageStats = useCallback(() => {
    return analysisStorage.getStorageStats();
  }, []);

  const handleConsent = (granted: boolean) => {
    analysisStorage.setCookieConsent(granted);
    setCookieConsent(granted);
    setShowDialog(false);
    if (granted) loadHistory();
    else setHistory([]);
  };

  return {
    history: filteredHistory,
    isLoading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    selectedItems,
    deleteAnalysis,
    deleteSelectedAnalyses,
    clearAllHistory,
    toggleItemSelection,
    selectAllItems,
    deselectAllItems,
    exportHistory,
    getStorageStats,
    refreshHistory: loadHistory,
    cookieConsent,
    showDialog,
    handleConsent,
  };
};

export default useAnalysisHistory;
