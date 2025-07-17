export interface Risk {
  category: 'Market' | 'Technical' | 'Financial' | 'Execution';
  risk: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

export interface Opportunity {
  area: 'Market' | 'Product' | 'Technology' | 'Business Model';
  opportunity: string;
  potential_impact: string;
  effort_required: 'Low' | 'Medium' | 'High';
}

export interface ValidationExperiment {
  experiment: string;
  cost: string;
  timeline: string;
  success_criteria: string;
  learning_goal: string;
}

export interface Recommendation {
  priority: 'High' | 'Medium' | 'Low';
  action: string;
  rationale: string;
  timeline: string;
  resources_needed: string;
}

export interface Competitor {
  name: string;
  type: 'Direct' | 'Indirect' | 'Substitute';
  market_share: string;
  differentiation: string;
  switching_cost: 'Low' | 'Medium' | 'High';
}

// New interfaces for comprehensive SaaS analysis table
export interface ComprehensiveAnalysisResult {
  id: string;
  timestamp: string;
  language: 'en' | 'ar';

  // Core analysis data for the new table structure
  idea: string; // Original user input text verbatim
  targetAudience: string; // AI-generated identification of primary user segments
  problemsSolved: string; // AI-analyzed pain points the idea addresses
  proposedSolution: string; // AI-extracted unique value proposition
  competitors: string[]; // AI-researched list of existing competitors
  scalability: string; // AI-assessed growth potential with expansion strategies
  profitModel: string; // AI-suggested revenue generation methods
  innovationLevel: 'Low' | 'Medium' | 'High'; // AI-rated novelty
  overallRating: number; // AI-calculated score from 0-100

  // Additional metadata for enhanced functionality
  summary?: string;
  detailedAnalysis?: {
    marketAnalysis?: string;
    technicalFeasibility?: string;
    competitiveAdvantage?: string;
    riskAssessment?: string;
    recommendations?: string[];
  };
}

// Interface for horizontal table analysis result (English LTR version)
export interface HorizontalAnalysisResult {
  id: string;
  timestamp: string;
  language: 'en' | 'ar'; // Keep both for future flexibility

  // Core analysis data for horizontal table
  originalIdea: string; // Original user input text (displayed above table)
  targetAudience: string; // Target Audience
  problemsSolved: string; // Problems Solved
  proposedSolution: string; // Proposed Solution
  competitors: string[]; // Competitors
  scalability: string; // Scalability
  revenueModel: string; // Revenue Model (renamed from profitModel for clarity)
  innovationLevel: 'Low' | 'Medium' | 'High'; // Innovation Level - English values only
  overallScore: number; // Overall Score (45-95)
}

export interface AnalysisResult {
  id: string;
  input: string;
  score: number;
  validity?: 'Realistic' | 'Promising' | 'Weak' | 'High-Risk';
  summary?: string;

  // Legacy fields for backward compatibility
  issues?: string[];
  recommendations?: string[];

  // Enhanced structured data
  market?: {
    pain_severity?: 'Critical' | 'High' | 'Medium' | 'Low';
    pain_description?: string;
    buyer_personas?: string[];
    tam_estimate?: string;
    market_timing?: string;
    competitive_pressure?: string;
  };

  user_experience?: {
    complexity_level?: 'Simple' | 'Moderate' | 'Complex';
    user_journey_quality?: 'Smooth' | 'Acceptable' | 'Problematic';
    onboarding_difficulty?: 'Easy' | 'Medium' | 'Hard';
    learning_curve?: 'Minimal' | 'Moderate' | 'Steep';
    accessibility_score?: number;
    mobile_readiness?: 'Native' | 'Responsive' | 'Desktop-only';
  };

  financials?: {
    pricing_model?: string;
    arpu_range?: string;
    cac_estimate?: string;
    ltv_projection?: string;
    ltv_cac_ratio?: string;
    payback_period?: string;
    gross_margin?: string;
    churn_rate?: string;
  };

  technical?: {
    tech_stack?: string[];
    complexity_rating?: 'Low' | 'Medium' | 'High' | 'Very High';
    mvp_time_months?: number;
    team_size_needed?: number;
    development_cost?: string;
    scalability_concerns?: string[];
    security_requirements?: string[];
    integration_complexity?: 'Simple' | 'Moderate' | 'Complex';
  };

  competition?: Competitor[];
  risks?: Risk[];
  opportunities?: Opportunity[];
  validation_experiments?: ValidationExperiment[];
  structured_recommendations?: Recommendation[];

  timestamp: string;
  language: 'en' | 'ar';
}

const generateAnalysisId = () => {
  return `analysis_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

const sampleIssues = {
  en: [
    'Complex navigation structure may confuse users',
    'Too many required form fields could cause abandonment',
    'Lack of clear call-to-action buttons',
    'Insufficient visual hierarchy in content layout',
    'Missing feedback for user actions',
    'Poor mobile responsiveness detected',
    'Long loading times may impact user experience',
    'Unclear error messages and validation',
    'Inconsistent design patterns across pages',
    'Accessibility concerns for screen readers',
  ],
  ar: [
    'هيكل التنقل المعقد قد يربك المستخدمين',
    'كثرة الحقول المطلوبة في النموذج قد تسبب الهجر',
    'نقص في أزرار الدعوة للعمل الواضحة',
    'عدم كفاية التسلسل الهرمي المرئي في تخطيط المحتوى',
    'نقص في التغذية الراجعة لأعمال المستخدم',
    'ضعف في الاستجابة للأجهزة المحمولة',
    'أوقات التحميل الطويلة قد تؤثر على تجربة المستخدم',
    'رسائل خطأ غير واضحة والتحقق من الصحة',
    'أنماط تصميم غير متسقة عبر الصفحات',
    'مخاوف إمكانية الوصول لقارئات الشاشة',
  ],
};

const sampleRecommendations = {
  en: [
    'Simplify navigation with clear menu categories',
    'Reduce form fields to essential information only',
    'Add prominent, contrasting call-to-action buttons',
    'Implement clear visual hierarchy with proper spacing',
    'Provide immediate feedback for all user interactions',
    'Optimize layout for mobile-first design approach',
    'Implement progressive loading and performance optimization',
    'Write clear, actionable error messages',
    'Establish consistent design system and style guide',
    'Add ARIA labels and improve semantic HTML structure',
  ],
  ar: [
    'تبسيط التنقل بفئات قائمة واضحة',
    'تقليل حقول النموذج للمعلومات الأساسية فقط',
    'إضافة أزرار دعوة للعمل بارزة ومتباينة',
    'تنفيذ التسلسل الهرمي المرئي الواضح مع التباعد المناسب',
    'توفير تغذية راجعة فورية لجميع تفاعلات المستخدم',
    'تحسين التخطيط لنهج التصميم المحمول أولاً',
    'تنفيذ التحميل التدريجي وتحسين الأداء',
    'كتابة رسائل خطأ واضحة وقابلة للتنفيذ',
    'إنشاء نظام تصميم متسق ودليل أسلوب',
    'إضافة تسميات ARIA وتحسين هيكل HTML الدلالي',
  ],
};

// Interface for analysis service following Dependency Inversion Principle
export interface IAnalysisService {
  analyzeComprehensive(input: string, language: 'en' | 'ar'): Promise<ComprehensiveAnalysisResult>;
  analyzeLegacy(input: string, language: 'en' | 'ar'): AnalysisResult;
}

// Mock data for comprehensive analysis
const mockTargetAudiences = [
  'Small to medium businesses (SMBs) in retail and e-commerce',
  'Enterprise software development teams',
  'Digital marketing agencies and consultants',
  'Healthcare providers and medical practices',
  'Educational institutions and online learning platforms',
  'Financial services and fintech companies',
  'Real estate professionals and property managers',
  'Manufacturing and supply chain companies',
  'Professional services firms (legal, accounting, consulting)',
  'Non-profit organizations and NGOs',
];

const mockProblemsSolved = [
  'Inefficient manual processes leading to time waste and errors',
  'Lack of real-time data visibility and analytics',
  'Poor communication and collaboration between teams',
  'Difficulty in tracking and managing customer relationships',
  'Complex workflow management and task coordination',
  'Inadequate reporting and business intelligence capabilities',
  'Security vulnerabilities and compliance challenges',
  'Scalability issues with existing legacy systems',
  'High operational costs and resource inefficiencies',
  'Limited integration capabilities with existing tools',
];

const mockProposedSolutions = [
  'Cloud-based automation platform with AI-powered workflow optimization',
  'Real-time dashboard with advanced analytics and predictive insights',
  'Integrated communication hub with project management capabilities',
  'Comprehensive CRM system with automated lead nurturing',
  'Intelligent task management with resource allocation optimization',
  'Self-service business intelligence platform with custom reporting',
  'Zero-trust security framework with automated compliance monitoring',
  'Microservices architecture enabling seamless scalability',
  'Cost optimization engine with automated resource management',
  'Universal API gateway with pre-built integrations',
];

const mockCompetitors = [
  ['Salesforce', 'HubSpot', 'Pipedrive'],
  ['Microsoft Teams', 'Slack', 'Asana'],
  ['Tableau', 'Power BI', 'Looker'],
  ['AWS', 'Azure', 'Google Cloud'],
  ['Shopify', 'WooCommerce', 'BigCommerce'],
  ['Zoom', 'WebEx', 'Google Meet'],
  ['QuickBooks', 'Xero', 'FreshBooks'],
  ['Jira', 'Trello', 'Monday.com'],
  ['Mailchimp', 'Constant Contact', 'SendGrid'],
  ['Zendesk', 'Freshdesk', 'Intercom'],
];

const mockScalabilityOptions = [
  'Horizontal scaling with microservices architecture and containerization',
  'Global expansion through multi-region cloud deployment',
  'Vertical market expansion with industry-specific modules',
  'API-first approach enabling third-party integrations and partnerships',
  'White-label solutions for reseller and partner channels',
  'Enterprise-grade features with advanced security and compliance',
  'Mobile-first design supporting iOS and Android platforms',
  'AI/ML capabilities for predictive analytics and automation',
  'Multi-tenant architecture supporting unlimited users',
  'Marketplace ecosystem for third-party plugins and extensions',
];

const mockProfitModels = [
  'Freemium model with premium features and advanced analytics',
  'Tiered subscription pricing based on usage and features',
  'Per-seat pricing with volume discounts for enterprises',
  'Usage-based pricing with pay-as-you-scale model',
  'Enterprise licensing with custom implementation services',
  'Marketplace commission model with transaction fees',
  'Professional services and consulting revenue streams',
  'White-label licensing to partners and resellers',
  'Data monetization through anonymized insights and benchmarks',
  'Hybrid model combining subscriptions with one-time setup fees',
];

// Comprehensive analysis service implementation
export class ComprehensiveAnalysisService implements IAnalysisService {
  async analyzeComprehensive(
    input: string,
    language: 'en' | 'ar',
  ): Promise<ComprehensiveAnalysisResult> {
    // Simulate AI analysis with more sophisticated logic
    const wordCount = input.trim().split(/\s+/).length;
    const inputLower = input.toLowerCase();

    // Calculate innovation level based on keywords
    const innovativeKeywords = [
      'ai',
      'ml',
      'blockchain',
      'iot',
      'ar',
      'vr',
      'automation',
      'intelligent',
      'smart',
      'predictive',
    ];
    const innovationScore = innovativeKeywords.reduce((score, keyword) => {
      return inputLower.includes(keyword) ? score + 1 : score;
    }, 0);

    let innovationLevel: 'Low' | 'Medium' | 'High' = 'Low';
    if (innovationScore >= 3) innovationLevel = 'High';
    else if (innovationScore >= 1) innovationLevel = 'Medium';

    // Calculate overall rating based on multiple factors
    let baseRating = 65;

    // Adjust based on input quality
    if (wordCount > 50) baseRating += 10; // Detailed description
    if (wordCount > 100) baseRating += 5; // Very detailed
    if (inputLower.includes('problem') || inputLower.includes('solution')) baseRating += 8;
    if (inputLower.includes('market') || inputLower.includes('customer')) baseRating += 5;
    if (innovationScore > 0) baseRating += innovationScore * 3;

    // Add some randomness for realism
    baseRating += Math.floor(Math.random() * 10) - 5;

    const overallRating = Math.max(45, Math.min(95, baseRating));

    // Select appropriate mock data
    const targetAudience =
      mockTargetAudiences[Math.floor(Math.random() * mockTargetAudiences.length)];
    const problemsSolved =
      mockProblemsSolved[Math.floor(Math.random() * mockProblemsSolved.length)];
    const proposedSolution =
      mockProposedSolutions[Math.floor(Math.random() * mockProposedSolutions.length)];
    const competitors = mockCompetitors[Math.floor(Math.random() * mockCompetitors.length)];
    const scalability =
      mockScalabilityOptions[Math.floor(Math.random() * mockScalabilityOptions.length)];
    const profitModel = mockProfitModels[Math.floor(Math.random() * mockProfitModels.length)];

    return {
      id: generateAnalysisId(),
      timestamp: new Date().toISOString(),
      language,
      idea: input,
      targetAudience,
      problemsSolved,
      proposedSolution,
      competitors,
      scalability,
      profitModel,
      innovationLevel,
      overallRating,
      summary: `This SaaS concept shows ${innovationLevel.toLowerCase()} innovation potential with a ${overallRating}/100 viability score. ${
        overallRating >= 80
          ? 'Strong market opportunity with clear value proposition.'
          : overallRating >= 60
            ? 'Moderate potential requiring strategic refinement.'
            : 'Significant challenges requiring major pivots or improvements.'
      }`,
      detailedAnalysis: {
        marketAnalysis: `Target market shows ${overallRating >= 70 ? 'strong' : 'moderate'} demand signals with ${competitors.length} major competitors identified.`,
        technicalFeasibility: `${innovationLevel === 'High' ? 'Complex' : innovationLevel === 'Medium' ? 'Moderate' : 'Standard'} technical implementation required.`,
        competitiveAdvantage: `Differentiation through ${innovationLevel.toLowerCase()} innovation and ${profitModel.includes('Freemium') ? 'accessible' : 'premium'} positioning.`,
        riskAssessment: `${overallRating >= 70 ? 'Low to moderate' : 'Moderate to high'} risk profile with primary concerns in market adoption and competitive response.`,
        recommendations: [
          'Conduct customer discovery interviews to validate problem-solution fit',
          'Develop minimum viable product (MVP) to test core assumptions',
          'Analyze competitive landscape and identify differentiation opportunities',
          'Create detailed financial projections and funding strategy',
        ],
      },
    };
  }

  analyzeLegacy(input: string, language: 'en' | 'ar'): AnalysisResult {
    return analyzeUX(input, language);
  }
}

export const analyzeUX = (input: string, language: 'en' | 'ar'): AnalysisResult => {
  // Simulate AI analysis with realistic scoring
  const wordCount = input.trim().split(/\s+/).length;

  // Base score calculation (simulated AI logic)
  let baseScore = 85;

  // Adjust score based on input length
  if (wordCount > 50) baseScore += 5;
  if (wordCount > 100) baseScore += 3;

  // Adjust score based on input content (simple keyword analysis)
  const problemKeywords =
    language === 'en'
      ? ['problem', 'issue', 'difficult', 'confusing', 'abandon', 'error', 'slow', 'broken']
      : ['مشكلة', 'صعوبة', 'مربك', 'هجر', 'خطأ', 'بطيء', 'معطل'];

  const positiveKeywords =
    language === 'en'
      ? ['good', 'easy', 'clear', 'simple', 'fast', 'intuitive', 'user-friendly']
      : ['جيد', 'سهل', 'واضح', 'بسيط', 'سريع', 'بديهي', 'سهل الاستخدام'];

  const lowerInput = input.toLowerCase();

  problemKeywords.forEach((keyword) => {
    if (lowerInput.includes(keyword)) baseScore -= 5;
  });

  positiveKeywords.forEach((keyword) => {
    if (lowerInput.includes(keyword)) baseScore += 3;
  });

  const finalScore = Math.max(35, Math.min(95, baseScore));

  // Generate random issues and recommendations
  const issuePool = sampleIssues[language];
  const recommendationPool = sampleRecommendations[language];

  const numIssues = Math.max(2, Math.min(5, Math.floor((100 - finalScore) / 15)));
  const numRecommendations = numIssues;

  const shuffledIssues = [...issuePool].sort(() => 0.5 - Math.random());
  const shuffledRecommendations = [...recommendationPool].sort(() => 0.5 - Math.random());

  return {
    id: generateAnalysisId(),
    input,
    score: Math.round(finalScore),
    issues: shuffledIssues.slice(0, numIssues),
    recommendations: shuffledRecommendations.slice(0, numRecommendations),
    timestamp: new Date().toISOString(),
    language,
  };
};
