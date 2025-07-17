import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { AnalysisResult } from '@/lib/uxAnalyzer';
import { COMPREHENSIVE_SAAS_ANALYSIS_PROMPT } from '@/config/analysisPrompts';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  loadUserPreferences,
  saveUserPreferences,
  setCache,
  getCachedData,
} from '@/lib/storage';
import { measureAnalysisTime, trackUserAction, trackError } from '@/lib/performance';
import { getGeminiApiKey, getApiConfig, isDevelopment } from '@/lib/config';

const useSaasAnalysis = (language: string) => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [preferences, setPreferences] = useState(loadUserPreferences());
  const { toast } = useToast();

  // Load data on mount with enhanced error handling
  useEffect(() => {
    try {
      const savedResults = loadFromLocalStorage();
      if (savedResults.length > 0) {
        setResults(savedResults);
      }

      // Load user preferences
      const userPrefs = loadUserPreferences();
      setPreferences(userPrefs);

      // Auto-save preference
      if (userPrefs.autoSave) {
        console.log('Auto-save enabled');
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
      toast({
        title: 'Loading Error',
        description: "Some data couldn't be loaded. Starting fresh.",
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Enhanced save function with preferences
  const saveResults = useCallback(
    (newResults: AnalysisResult[]) => {
      try {
        const success = saveToLocalStorage(newResults);
        if (!success) {
          throw new Error('Failed to save to localStorage');
        }
        setResults(newResults);

        if (preferences.notifications) {
          toast({
            title: 'Data Saved',
            description: 'Your analysis has been saved successfully',
          });
        }
      } catch (error) {
        console.error('Failed to save results:', error);
        toast({
          title: 'Save Error',
          description: 'Failed to save your analysis. Please try again.',
          variant: 'destructive',
        });
      }
    },
    [preferences.notifications, toast],
  );

  const handleAnalyze = async () => {
    if (!input.trim()) {
      trackUserAction('analysis_attempted_empty_input');
      toast({
        title: 'Input Required',
        description: 'Please enter your SaaS idea to analyze',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    const endTiming = measureAnalysisTime();
    trackUserAction('analysis_started', {
      inputLength: input.length.toString(),
    });

    try {
      const apiConfig = getApiConfig();
      let GEMINI_API_KEY: string;

      try {
        GEMINI_API_KEY = getGeminiApiKey();
      } catch (error) {
        console.log('No API key found, using mock analysis');
        const { analyzeUX } = await import('@/lib/uxAnalyzer');
        const mockResult = analyzeUX(input, 'en');

        const newResult: AnalysisResult = {
          ...mockResult,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          input,
          language: 'en',
        };

        const updatedResults = [newResult, ...results];
        saveResults(updatedResults);
        setInput('');
        endTiming();
        trackUserAction('analysis_completed_mock');

        toast({
          title: 'Analysis Complete 🎉',
          description: 'Your SaaS idea has been analyzed successfully',
        });
        return;
      }

      // Insert the input into our comprehensive analysis prompt
      const prompt = COMPREHENSIVE_SAAS_ANALYSIS_PROMPT.replace('{SAAS_CONCEPT}', input);

      const response = await fetch(
        `${apiConfig.gemini.baseUrl}/${apiConfig.gemini.model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: apiConfig.gemini.temperature,
              topK: apiConfig.gemini.topK,
              topP: apiConfig.gemini.topP,
              maxOutputTokens: apiConfig.gemini.maxTokens,
            },
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `Gemini API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error('No response content received from Gemini API');
      }

      let parsed: Partial<AnalysisResult> = {};
      try {
        const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
        parsed = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', content);
        const { analyzeUX } = await import('@/lib/uxAnalyzer');
        parsed = analyzeUX(input, 'en');
      }

      const newResult: AnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        input,
        score: typeof parsed.score === 'number' ? Math.max(40, Math.min(95, parsed.score)) : 75,
        issues: Array.isArray(parsed.issues) ? parsed.issues : ['No specific issues identified'],
        recommendations: Array.isArray(parsed.recommendations)
          ? parsed.recommendations
          : ['Focus on market validation'],
        language: 'en',
      };

      const updatedResults = [newResult, ...results];
      saveResults(updatedResults);
      setInput('');
      endTiming();
      trackUserAction('analysis_completed_api', {
        score: newResult.score.toString(),
        validity: newResult.validity || 'unknown',
      });

      toast({
        title: 'Analysis Complete 🎉',
        description: 'Your SaaS idea has been analyzed with detailed insights',
      });
    } catch (error) {
      console.error('Scan error:', error);
      endTiming();
      trackError('analysis_failed', {
        errorType: error instanceof Error ? error.name : 'unknown',
        errorMessage: error instanceof Error ? error.message : 'unknown',
      });

      toast({
        title: 'Analysis Error',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saascan-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Export Complete',
      description: 'Your analysis results have been exported successfully',
    });
  };

  const handleClear = useCallback(() => {
    try {
      setResults([]);
      saveToLocalStorage([]);
      toast({
        title: 'History Cleared',
        description: 'All analysis results have been cleared',
      });
    } catch (error) {
      console.error('Failed to clear results:', error);
      toast({
        title: 'Clear Error',
        description: 'Failed to clear analysis history',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Update user preferences
  const updatePreferences = useCallback(
    (newPrefs: Partial<typeof preferences>) => {
      try {
        const updatedPrefs = { ...preferences, ...newPrefs };
        setPreferences(updatedPrefs);
        saveUserPreferences(updatedPrefs);

        if (preferences.notifications) {
          toast({
            title: 'Preferences Updated',
            description: 'Your settings have been saved',
          });
        }
      } catch (error) {
        console.error('Failed to update preferences:', error);
        toast({
          title: 'Settings Error',
          description: 'Failed to save your preferences',
          variant: 'destructive',
        });
      }
    },
    [preferences, toast],
  );

  return {
    input,
    setInput,
    isAnalyzing,
    results,
    preferences,
    handleAnalyze,
    handleExport,
    handleClear,
    updatePreferences,
    saveResults,
  };
};

export default useSaasAnalysis;
