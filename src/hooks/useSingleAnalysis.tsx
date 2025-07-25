import { analysisStorage } from '@/lib/analysisStorage';
import { getApiConfig, getGeminiApiKey } from '@/lib/config';
import { measureAnalysisTime, trackError, trackUserAction } from '@/lib/performance';
import { HorizontalAnalysisResult } from '@/lib/uxAnalyzer';
import { useCallback, useState } from 'react';
import { ENHANCED_GEMINI_SAAS_ANALYSIS_PROMPT } from '../config/analysis_prompts';
import { useToast } from './useToast';

// Mock data for fallback analysis (English version)
const generateMockAnalysis = (originalIdea: string): HorizontalAnalysisResult => {
  const mockTargetAudiences = [
    'Small to medium businesses in e-commerce and retail',
    'Enterprise software development teams and IT departments',
    'Digital marketing agencies and consultants',
    'Healthcare providers and medical practices',
    'Educational institutions and online learning platforms',
  ];

  const mockProblems = [
    'Inefficient manual processes leading to time waste and human errors',
    'Lack of real-time data visibility and actionable analytics',
    'Poor communication and collaboration between teams',
    'Difficulty in tracking and managing customer relationships',
    'Complex workflow management and task coordination challenges',
  ];

  const mockSolutions = [
    'Cloud-based automation platform with AI-powered workflow optimization',
    'Real-time dashboard with advanced analytics and predictive insights',
    'Integrated communication hub with project management capabilities',
    'Comprehensive CRM system with automated lead nurturing',
    'Intelligent task management with resource allocation optimization',
  ];

  const mockCompetitors = [
    ['Salesforce', 'HubSpot', 'Pipedrive'],
    ['Microsoft Teams', 'Slack', 'Asana'],
    ['Tableau', 'Power BI', 'Looker'],
    ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud'],
    ['Shopify', 'WooCommerce', 'BigCommerce'],
  ];

  const mockScalability = [
    'Horizontal scaling with microservices architecture and containerization',
    'Global expansion through multi-region cloud deployment',
    'Vertical market expansion with industry-specific modules',
    'API-first approach enabling third-party integrations and partnerships',
    'White-label solutions for reseller and partner channels',
  ];

  const mockRevenueModels = [
    'Freemium model with premium features and advanced analytics',
    'Tiered subscription pricing based on usage and features',
    'Per-seat pricing with volume discounts for enterprises',
    'Usage-based pricing with pay-as-you-scale model',
    'Enterprise licensing with custom implementation services',
  ];

  const innovationLevels: ('Low' | 'Medium' | 'High')[] = ['Low', 'Medium', 'High'];

  // Simple scoring based on input length and keywords
  const inputLower = originalIdea.toLowerCase();
  let baseScore = 65;

  if (inputLower.includes('ai') || inputLower.includes('ذكاء')) baseScore += 10;
  if (inputLower.includes('automation') || inputLower.includes('أتمتة')) baseScore += 8;
  if (inputLower.includes('cloud') || inputLower.includes('سحابة')) baseScore += 5;
  if (originalIdea.length > 100) baseScore += 5;

  const finalScore = Math.max(45, Math.min(95, baseScore + Math.floor(Math.random() * 10) - 5));

  return {
    id: `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    timestamp: new Date().toISOString(),
    language: 'en',
    originalIdea,
    targetAudience: mockTargetAudiences[Math.floor(Math.random() * mockTargetAudiences.length)],
    problemsSolved: mockProblems[Math.floor(Math.random() * mockProblems.length)],
    proposedSolution: mockSolutions[Math.floor(Math.random() * mockSolutions.length)],
    competitors: mockCompetitors[Math.floor(Math.random() * mockCompetitors.length)],
    scalability: mockScalability[Math.floor(Math.random() * mockScalability.length)],
    revenueModel: mockRevenueModels[Math.floor(Math.random() * mockRevenueModels.length)],
    innovationLevel: innovationLevels[Math.floor(Math.random() * innovationLevels.length)],
    overallScore: finalScore,
  };
};

// Custom hook for single analysis mode
const useSingleAnalysis = () => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<HorizontalAnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = useCallback(async () => {
    if (!input.trim()) {
      trackUserAction('single_analysis_attempted_empty_input');
      toast({
        title: 'Input Required',
        description: 'Please enter your SaaS idea to analyze',
        variant: 'destructive',
      });
      return;
    }

    // Clear previous result
    setCurrentResult(null);
    setIsAnalyzing(true);

    const endTiming = measureAnalysisTime();
    trackUserAction('single_analysis_started', {
      inputLength: input.length.toString(),
    });

    try {
      const apiConfig = getApiConfig();
      let GEMINI_API_KEY: string;

      try {
        GEMINI_API_KEY = getGeminiApiKey();
      } catch (error) {
        console.log('No API key found, using mock analysis');
        const mockResult = generateMockAnalysis(input);

        // Save to history
        analysisStorage.saveAnalysis(mockResult);

        setCurrentResult(mockResult);
        setInput('');
        endTiming();
        trackUserAction('single_analysis_completed_mock');

        toast({
          title: 'Analysis Complete 🎉',
          description: 'Your SaaS idea has been analyzed successfully',
        });
        return;
      }

      // Use the enhanced Gemini SaaS analysis prompt
      const prompt = ENHANCED_GEMINI_SAAS_ANALYSIS_PROMPT.replace('{SAAS_CONCEPT}', input);

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

      let parsed: Partial<HorizontalAnalysisResult> = {};
      try {
        const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
        parsed = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error('Failed to parse Gemini response:', content);
        // Fallback to mock analysis if parsing fails
        const mockResult = generateMockAnalysis(input);
        setCurrentResult(mockResult);
        analysisStorage.saveAnalysis(mockResult);
        setInput('');
        endTiming();
        trackUserAction('single_analysis_completed_fallback');

        toast({
          title: 'Analysis Complete 🎉',
          description: 'Your SaaS idea has been analyzed successfully (fallback mode)',
        });
        return;
      }

      const newResult: HorizontalAnalysisResult = {
        id: `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        timestamp: new Date().toISOString(),
        language: 'en',
        originalIdea: input,
        targetAudience: parsed.targetAudience || 'Small to medium businesses',
        problemsSolved: parsed.problemsSolved || 'Efficiency and productivity challenges',
        proposedSolution: parsed.proposedSolution || 'Automated workflow solution',
        competitors: Array.isArray(parsed.competitors)
          ? parsed.competitors
          : ['Generic competitors'],
        scalability: parsed.scalability || 'Moderate scalability potential',
        revenueModel: parsed.revenueModel || 'Subscription-based model',
        innovationLevel: parsed.innovationLevel || 'Medium',
        overallScore:
          typeof parsed.overallScore === 'number'
            ? Math.max(45, Math.min(95, parsed.overallScore))
            : 70,
      };

      // Save to history
      analysisStorage.saveAnalysis(newResult);

      setCurrentResult(newResult);
      setInput('');
      endTiming();
      trackUserAction('single_analysis_completed_api', {
        score: newResult.overallScore.toString(),
        innovationLevel: newResult.innovationLevel,
      });

      toast({
        title: 'Analysis Complete 🎉',
        description: 'Your SaaS idea has been analyzed with comprehensive insights',
      });
    } catch (error) {
      console.error('Single analysis error:', error);
      endTiming();
      trackError('single_analysis_failed', {
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
  }, [input, toast]);

  const clearResult = useCallback(() => {
    setCurrentResult(null);
  }, []);

  return {
    input,
    setInput,
    isAnalyzing,
    currentResult,
    handleAnalyze,
    clearResult,
  };
};

export default useSingleAnalysis;
