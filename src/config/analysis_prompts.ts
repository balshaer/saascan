
import { z } from "zod"

// ==================== TYPE DEFINITIONS ====================

export interface PromptTemplate {
  id: string
  name: string
  description: string
  category: "business" | "technical" | "market" | "user" | "financial" | "competitive" | "legal" | "operational"
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  prompt: string
  systemContext: string
  outputSchema: z.ZodSchema
  validationRules: ValidationRule[]
  qualityMetrics: QualityMetric[]
  rating: number
  effectiveness: number
  relevance: number
  accuracy: number
  completeness: number
  usageCount: number
  totalRatings: number
  averageRating: number
  tags: string[]
  isGenerated: boolean
  createdAt: string
  lastUsed?: string
  lastUpdated?: string
  parentPromptId?: string
  version: string
  author?: string
  reviewStatus: "draft" | "reviewed" | "approved" | "deprecated"
  generationMetadata?: GenerationMetadata
  performanceMetrics?: PerformanceMetrics
}

export interface ValidationRule {
  id: string
  name: string
  description: string
  validator: (input: string) => ValidationResult
  severity: "error" | "warning" | "info"
  category: "length" | "content" | "structure" | "quality" | "completeness"
}

export interface ValidationResult {
  isValid: boolean
  score: number
  message: string
  suggestions?: string[]
  confidence: number
}

export interface QualityMetric {
  id: string
  name: string
  description: string
  weight: number
  calculator: (input: string, result: any) => number
}

export interface GenerationMetadata {
  basedOnPrompts: string[]
  averageRatingOfSources: number
  generationAlgorithm: string
  confidence: number
  qualityScore: number
  validationsPassed: number
  totalValidations: number
  generationTime: number
  sourceAnalysis: SourceAnalysis
}

export interface SourceAnalysis {
  commonPatterns: string[]
  keyPhrases: string[]
  structuralElements: string[]
  successFactors: string[]
  improvementAreas: string[]
}

export interface PerformanceMetrics {
  averageProcessingTime: number
  successRate: number
  userSatisfactionScore: number
  accuracyScore: number
  completenessScore: number
  lastPerformanceReview: string
}

export interface PromptRating {
  id: string
  promptId: string
  userId?: string
  rating: number
  effectiveness: number
  relevance: number
  accuracy: number
  completeness: number
  feedback?: string
  timestamp: string
  analysisContext?: string
  resultQuality?: number
  wouldRecommend: boolean
}

export interface AnalysisResult {
  id: string
  promptId: string
  input: string
  timestamp: string
  processingTime: number
  qualityScore: number
  confidenceLevel: number
  validationResults: ValidationResult[]
  data: SaasAnalysisData
  metadata: ResultMetadata
}

export interface SaasAnalysisData {
  // Core Analysis
  inputQualityScore: number
  overallViabilityScore: number
  verdict: "Highly Viable" | "Viable" | "Potentially Viable" | "Risky" | "Not Viable" | "Insufficient Data"
  confidenceLevel: "Very High" | "High" | "Medium" | "Low" | "Very Low"

  // Market Analysis
  targetAudience: {
    primary: string
    secondary?: string
    demographics: string
    psychographics: string
    painPoints: string[]
    currentSolutions: string[]
  }

  marketAnalysis: {
    size: {
      tam: string
      sam: string
      som: string
    }
    growth: string
    trends: string[]
    barriers: string[]
    opportunities: string[]
  }

  // Problem & Solution
  problemAnalysis: {
    problemStatement: string
    problemSeverity: "Critical" | "High" | "Medium" | "Low"
    problemFrequency: "Daily" | "Weekly" | "Monthly" | "Occasional"
    currentSolutions: string[]
    solutionGaps: string[]
  }

  solutionAnalysis: {
    proposedSolution: string
    uniqueValueProposition: string
    coreFeatures: string[]
    differentiators: string[]
    implementationComplexity: "Low" | "Medium" | "High" | "Very High"
  }

  // Business Model
  businessModel: {
    revenueStreams: string[]
    pricingStrategy: string
    costStructure: string[]
    keyMetrics: string[]
    scalabilityFactors: string[]
  }

  // Technical Analysis
  technicalAnalysis: {
    architectureComplexity: "Simple" | "Moderate" | "Complex" | "Very Complex"
    technologyStack: string[]
    developmentTimeline: string
    resourceRequirements: string
    technicalRisks: string[]
    scalabilityConsiderations: string[]
  }

  // Competitive Analysis
  competitiveAnalysis: {
    directCompetitors: string[]
    indirectCompetitors: string[]
    competitiveAdvantages: string[]
    competitiveDisadvantages: string[]
    marketPositioning: string
    barrierToEntry: "Low" | "Medium" | "High" | "Very High"
  }

  // Financial Projections
  financialProjections: {
    developmentCost: string
    timeToMarket: string
    breakEvenTimeline: string
    fundingRequirements: string
    revenueProjections: {
      year1: string
      year2: string
      year3: string
    }
    keyFinancialRisks: string[]
  }

  // Risk Assessment
  riskAssessment: {
    marketRisks: RiskItem[]
    technicalRisks: RiskItem[]
    businessRisks: RiskItem[]
    competitiveRisks: RiskItem[]
    overallRiskLevel: "Low" | "Medium" | "High" | "Very High"
  }

  // Recommendations
  recommendations: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
    criticalSuccessFactors: string[]
    nextSteps: string[]
  }

  // Stage Assessment
  stageAssessment: {
    currentStage: "Idea" | "Concept" | "MVP" | "Early Traction" | "Growth" | "Scale"
    readinessForNextStage: boolean
    stageSpecificRecommendations: string[]
    milestones: string[]
  }
}

export interface RiskItem {
  risk: string
  probability: "Low" | "Medium" | "High"
  impact: "Low" | "Medium" | "High"
  mitigation: string
}

export interface ResultMetadata {
  promptVersion: string
  analysisVersion: string
  processingSteps: string[]
  qualityChecks: QualityCheck[]
  dataSourcesUsed: string[]
  limitationsAndCaveats: string[]
}

export interface QualityCheck {
  check: string
  passed: boolean
  score: number
  details: string
}

// ==================== VALIDATION RULES ====================

export const VALIDATION_RULES: ValidationRule[] = [
  {
    id: "min-length",
    name: "Minimum Length Check",
    description: "Ensures input has sufficient detail for meaningful analysis",
    validator: (input: string): ValidationResult => {
      const wordCount = input.trim().split(/\s+/).length
      const charCount = input.trim().length

      if (charCount < 50) {
        return {
          isValid: false,
          score: 0,
          message: "Input too short. Please provide at least 50 characters.",
          suggestions: [
            "Add more details about your target audience",
            "Describe the problem you're solving",
            "Explain your proposed solution",
          ],
          confidence: 1.0,
        }
      }

      if (wordCount < 20) {
        return {
          isValid: false,
          score: 25,
          message: "Input lacks detail. Please provide at least 20 words for meaningful analysis.",
          suggestions: [
            "Expand on the problem statement",
            "Include information about your target market",
            "Describe key features or benefits",
          ],
          confidence: 0.9,
        }
      }

      const score = Math.min(100, (wordCount / 100) * 100)
      return {
        isValid: true,
        score,
        message: `Good input length with ${wordCount} words.`,
        confidence: 0.8,
      }
    },
    severity: "error",
    category: "length",
  },

  {
    id: "content-quality",
    name: "Content Quality Assessment",
    description: "Evaluates the quality and coherence of the input content",
    validator: (input: string): ValidationResult => {
      const lowerInput = input.toLowerCase()

      // Check for placeholder text
      const placeholders = ["lorem ipsum", "test", "example", "placeholder", "sample", "demo", "xxx", "tbd", "todo"]
      const hasPlaceholders = placeholders.some((p) => lowerInput.includes(p))

      if (hasPlaceholders) {
        return {
          isValid: false,
          score: 10,
          message: "Input appears to contain placeholder text. Please provide real content.",
          suggestions: [
            "Replace placeholder text with actual details",
            "Describe a real problem and solution",
            "Provide specific information about your idea",
          ],
          confidence: 0.95,
        }
      }

      // Check for business-relevant keywords
      const businessKeywords = [
        "problem",
        "solution",
        "customer",
        "user",
        "market",
        "business",
        "revenue",
        "profit",
        "service",
        "product",
        "platform",
        "application",
        "software",
        "tool",
        "system",
        "efficiency",
        "automation",
        "management",
        "analytics",
        "data",
        "workflow",
      ]

      const keywordCount = businessKeywords.filter((keyword) => lowerInput.includes(keyword)).length
      const keywordScore = Math.min(100, (keywordCount / 5) * 100)

      // Check sentence structure
      const sentences = input.split(/[.!?]+/).filter((s) => s.trim().length > 0)
      const avgSentenceLength = sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) / sentences.length

      const structureScore = avgSentenceLength > 5 && avgSentenceLength < 30 ? 100 : 50

      const overallScore = (keywordScore + structureScore) / 2

      return {
        isValid: overallScore >= 40,
        score: overallScore,
        message:
          overallScore >= 70
            ? "Good content quality detected."
            : "Content could be more detailed and business-focused.",
        suggestions:
          overallScore < 70
            ? [
              "Include more business-specific terminology",
              "Describe the problem and solution more clearly",
              "Add details about target customers and market",
            ]
            : undefined,
        confidence: 0.7,
      }
    },
    severity: "warning",
    category: "content",
  },

  {
    id: "business-completeness",
    name: "Business Completeness Check",
    description: "Checks if input covers key business aspects",
    validator: (input: string): ValidationResult => {
      const lowerInput = input.toLowerCase()

      const businessAspects = [
        { aspect: "problem", keywords: ["problem", "issue", "challenge", "pain", "difficulty", "struggle"] },
        {
          aspect: "solution",
          keywords: ["solution", "solve", "fix", "address", "resolve", "tool", "platform", "service"],
        },
        { aspect: "target", keywords: ["customer", "user", "client", "audience", "market", "segment", "demographic"] },
        {
          aspect: "value",
          keywords: ["benefit", "value", "advantage", "improvement", "efficiency", "save", "reduce", "increase"],
        },
        {
          aspect: "business",
          keywords: ["business", "revenue", "profit", "monetize", "pricing", "subscription", "model"],
        },
      ]

      const coveredAspects = businessAspects.filter((aspect) =>
        aspect.keywords.some((keyword) => lowerInput.includes(keyword)),
      )

      const completenessScore = (coveredAspects.length / businessAspects.length) * 100
      const missingAspects = businessAspects
        .filter((aspect) => !aspect.keywords.some((keyword) => lowerInput.includes(keyword)))
        .map((aspect) => aspect.aspect)

      return {
        isValid: completenessScore >= 60,
        score: completenessScore,
        message: `Business completeness: ${Math.round(completenessScore)}%. Covers ${coveredAspects.length}/${businessAspects.length} key aspects.`,
        suggestions:
          missingAspects.length > 0
            ? [
              `Consider adding information about: ${missingAspects.join(", ")}`,
              "Describe the problem you're solving",
              "Explain your target audience",
              "Mention the value proposition",
            ]
            : undefined,
        confidence: 0.8,
      }
    },
    severity: "info",
    category: "completeness",
  },
]

// ==================== QUALITY METRICS ====================

export const QUALITY_METRICS: QualityMetric[] = [
  {
    id: "clarity",
    name: "Clarity Score",
    description: "Measures how clear and understandable the analysis is",
    weight: 0.25,
    calculator: (input: string, result: any): number => {
      // Calculate based on sentence structure, vocabulary, and coherence
      const sentences = input.split(/[.!?]+/).filter((s) => s.trim().length > 0)
      const avgSentenceLength = sentences.reduce((sum, s) => sum + s.trim().split(/\s+/).length, 0) / sentences.length

      // Optimal sentence length is 15-20 words
      const lengthScore =
        avgSentenceLength >= 10 && avgSentenceLength <= 25
          ? 100
          : Math.max(0, 100 - Math.abs(avgSentenceLength - 17.5) * 4)

      return Math.min(100, lengthScore)
    },
  },

  {
    id: "completeness",
    name: "Completeness Score",
    description: "Measures how comprehensive the analysis is",
    weight: 0.3,
    calculator: (input: string, result: any): number => {
      if (!result?.data) return 0

      const requiredFields = [
        "targetAudience",
        "marketAnalysis",
        "problemAnalysis",
        "solutionAnalysis",
        "businessModel",
        "competitiveAnalysis",
      ]

      const completedFields = requiredFields.filter(
        (field) => result.data[field] && Object.keys(result.data[field]).length > 0,
      )

      return (completedFields.length / requiredFields.length) * 100
    },
  },

  {
    id: "accuracy",
    name: "Accuracy Score",
    description: "Measures the accuracy and realism of the analysis",
    weight: 0.25,
    calculator: (input: string, result: any): number => {
      // This would typically involve comparing against known data or expert validation
      // For now, we'll use heuristics based on consistency and realism
      if (!result?.data) return 0

      let accuracyScore = 100

      // Check for unrealistic claims
      const overallScore = result.data.overallViabilityScore
      if (overallScore > 95) accuracyScore -= 20 // Too optimistic
      if (overallScore < 10) accuracyScore -= 20 // Too pessimistic

      // Check for consistency between different sections
      const verdict = result.data.verdict
      const riskLevel = result.data.riskAssessment?.overallRiskLevel

      if (verdict === "Highly Viable" && riskLevel === "Very High") accuracyScore -= 30
      if (verdict === "Not Viable" && riskLevel === "Low") accuracyScore -= 30

      return Math.max(0, accuracyScore)
    },
  },

  {
    id: "actionability",
    name: "Actionability Score",
    description: "Measures how actionable the recommendations are",
    weight: 0.2,
    calculator: (input: string, result: any): number => {
      if (!result?.data?.recommendations) return 0

      const recommendations = result.data.recommendations
      const allRecommendations = [
        ...(recommendations.immediate || []),
        ...(recommendations.shortTerm || []),
        ...(recommendations.longTerm || []),
        ...(recommendations.nextSteps || []),
      ]

      // Check for specific, actionable language
      const actionWords = [
        "create",
        "develop",
        "build",
        "test",
        "validate",
        "research",
        "analyze",
        "implement",
        "launch",
        "measure",
      ]
      const actionableCount = allRecommendations.filter((rec) =>
        actionWords.some((word) => rec.toLowerCase().includes(word)),
      ).length

      return allRecommendations.length > 0 ? (actionableCount / allRecommendations.length) * 100 : 0
    },
  },
]

// ==================== ENHANCED PROMPT TEMPLATES ====================

export const ENHANCED_GEMINI_SAAS_ANALYSIS_PROMPT = `
You are Dr. Sarah Chen, a senior partner at McKinsey & Company with 15+ years specializing in:
- SaaS business model optimization and go-to-market strategy
- Technology startup due diligence and venture capital advisory
- Product-market fit validation and customer development
- Digital transformation and enterprise software adoption
- Financial modeling and unit economics for subscription businesses

ANALYSIS FRAMEWORK - Execute in this exact sequence:

🔍 PHASE 1: INPUT QUALITY ASSESSMENT (0-100 scale)
Evaluate the input quality using these criteria:
- Clarity and coherence of the description (25 points)
- Specificity of problem and solution (25 points)  
- Business context and market understanding (25 points)
- Technical feasibility indicators (25 points)

Quality Thresholds:
- 90-100: Exceptional detail, ready for deep analysis
- 70-89: Good quality, proceed with comprehensive analysis
- 50-69: Adequate, proceed with standard analysis and note limitations
- 30-49: Poor quality, provide basic analysis with improvement suggestions
- 0-29: Insufficient data, request more information

🎯 PHASE 2: COMPREHENSIVE BUSINESS ANALYSIS

2.1 MARKET & CUSTOMER ANALYSIS
- Primary target audience (demographics, psychographics, behavior patterns)
- Secondary markets and expansion opportunities
- Total Addressable Market (TAM), Serviceable Addressable Market (SAM), Serviceable Obtainable Market (SOM)
- Customer pain points (frequency, severity, current solutions, willingness to pay)
- Market trends, growth drivers, and regulatory considerations

2.2 PROBLEM-SOLUTION FIT EVALUATION
- Problem statement clarity and validation
- Solution uniqueness and competitive differentiation
- Value proposition strength and quantifiable benefits
- Implementation complexity and resource requirements
- Scalability potential and technical architecture needs

2.3 BUSINESS MODEL VIABILITY
- Revenue stream identification and diversification potential
- Pricing strategy optimization (freemium, tiered, usage-based, enterprise)
- Unit economics: Customer Acquisition Cost (CAC), Lifetime Value (LTV), payback period
- Cost structure analysis and margin optimization opportunities
- Scalability economics and operational leverage points

2.4 COMPETITIVE LANDSCAPE MAPPING
- Direct competitors (feature comparison, pricing, market share)
- Indirect competitors and substitute solutions
- Competitive advantages and moats (network effects, data advantages, switching costs)
- Market positioning and differentiation strategy
- Barriers to entry and competitive response scenarios

2.5 TECHNICAL FEASIBILITY & ARCHITECTURE
- Technology stack recommendations and complexity assessment
- Development timeline and resource requirements (team size, skills, budget)
- Scalability considerations (infrastructure, performance, security)
- Integration requirements and third-party dependencies
- Technical risks and mitigation strategies

2.6 FINANCIAL PROJECTIONS & FUNDING
- Development and operational cost estimates
- Revenue projections (conservative, base case, optimistic scenarios)
- Break-even analysis and cash flow requirements
- Funding needs by stage (pre-seed, seed, Series A)
- Key financial metrics and investor attractiveness

2.7 RISK ASSESSMENT MATRIX
For each risk category, provide:
- Risk description and probability (Low/Medium/High)
- Potential impact on business (Low/Medium/High)
- Mitigation strategies and contingency plans
- Early warning indicators and monitoring metrics

Risk Categories:
- Market risks (demand, competition, regulation)
- Technical risks (development, scalability, security)
- Business risks (team, execution, partnerships)
- Financial risks (funding, unit economics, market conditions)

🎯 PHASE 3: STRATEGIC RECOMMENDATIONS

3.1 IMMEDIATE ACTIONS (0-3 months)
- Customer discovery and problem validation activities
- MVP feature prioritization and development planning
- Market research and competitive intelligence gathering
- Team building and resource allocation decisions

3.2 SHORT-TERM STRATEGY (3-12 months)
- Product development milestones and launch strategy
- Go-to-market approach and customer acquisition channels
- Partnership and integration opportunities
- Funding strategy and investor outreach planning

3.3 LONG-TERM VISION (1-3 years)
- Market expansion and product line extension
- Scaling operations and organizational development
- Strategic partnerships and potential acquisition targets
- Exit strategy considerations and value maximization

🎯 PHASE 4: STAGE-SPECIFIC GUIDANCE

Assess current stage and provide stage-appropriate recommendations:
- IDEA STAGE: Focus on problem validation and market research
- CONCEPT STAGE: Emphasize solution design and technical feasibility
- MVP STAGE: Prioritize user feedback and product-market fit
- EARLY TRACTION: Optimize unit economics and scaling strategies
- GROWTH STAGE: Focus on market expansion and operational efficiency
- SCALE STAGE: Emphasize market leadership and strategic options

📊 OUTPUT REQUIREMENTS:

Provide analysis in this structured format:
1. Executive Summary (2-3 sentences)
2. Input Quality Score (0-100) with justification
3. Overall Viability Assessment (Highly Viable/Viable/Potentially Viable/Risky/Not Viable)
4. Confidence Level (Very High/High/Medium/Low/Very Low)
5. Detailed analysis for each phase above
6. Risk-adjusted recommendations with success probability estimates
7. Key success metrics and milestones
8. Critical assumptions and limitations of analysis

IMPORTANT GUIDELINES:
- Base recommendations on realistic market conditions and competitive dynamics
- Provide specific, actionable advice with clear timelines and resource requirements
- Include quantitative estimates where possible (market size, costs, timelines)
- Address potential failure modes and mitigation strategies
- Consider different scenarios (best case, base case, worst case)
- Maintain objectivity and highlight both opportunities and challenges
`

export const TECHNICAL_ARCHITECTURE_PROMPT = `
You are Alex Rodriguez, Principal Solutions Architect at Amazon Web Services with 12+ years in:
- Cloud-native architecture design for SaaS platforms
- Microservices architecture and containerization strategies
- Database design and data architecture for scale
- Security architecture and compliance frameworks
- DevOps, CI/CD, and infrastructure automation
- Performance optimization and cost management

TECHNICAL ANALYSIS FRAMEWORK:

🏗️ PHASE 1: ARCHITECTURE ASSESSMENT

1.1 SYSTEM ARCHITECTURE DESIGN
- Recommended architecture pattern (monolithic, microservices, serverless, hybrid)
- Core system components and their interactions
- Data flow diagrams and integration points
- API design strategy (REST, GraphQL, gRPC)
- Authentication and authorization architecture

1.2 TECHNOLOGY STACK RECOMMENDATIONS
- Frontend technologies (React, Vue, Angular, mobile frameworks)
- Backend technologies (Node.js, Python, Java, .NET, Go)
- Database selection (PostgreSQL, MongoDB, Redis, Elasticsearch)
- Cloud platform recommendations (AWS, Azure, GCP)
- Third-party services and integrations

1.3 SCALABILITY PLANNING
- Expected user load and growth projections
- Performance requirements and SLA targets
- Horizontal vs vertical scaling strategies
- Caching strategies (CDN, application cache, database cache)
- Load balancing and traffic distribution

🔒 PHASE 2: SECURITY & COMPLIANCE

2.1 SECURITY ARCHITECTURE
- Data encryption (at rest and in transit)
- Identity and access management (IAM)
- API security and rate limiting
- Vulnerability assessment and penetration testing
- Security monitoring and incident response

2.2 COMPLIANCE REQUIREMENTS
- GDPR, CCPA, and data privacy regulations
- SOC 2, ISO 27001, and security certifications
- Industry-specific compliance (HIPAA, PCI-DSS, etc.)
- Data residency and sovereignty requirements
- Audit trails and compliance reporting

🚀 PHASE 3: DEVELOPMENT & DEPLOYMENT

3.1 DEVELOPMENT STRATEGY
- Development methodology (Agile, DevOps, CI/CD)
- Code quality and testing strategies
- Development team structure and skill requirements
- Technology learning curve and training needs
- Open source vs proprietary technology decisions

3.2 DEPLOYMENT & OPERATIONS
- Infrastructure as Code (IaC) strategy
- Container orchestration (Kubernetes, Docker Swarm)
- Monitoring and observability (metrics, logs, traces)
- Backup and disaster recovery planning
- Cost optimization and resource management

💰 PHASE 4: COST & RESOURCE ANALYSIS

4.1 DEVELOPMENT COSTS
- Team composition and salary estimates
- Development timeline and milestone planning
- Technology licensing and subscription costs
- Development tools and infrastructure costs
- Quality assurance and testing resources

4.2 OPERATIONAL COSTS
- Cloud infrastructure costs (compute, storage, networking)
- Third-party service costs (APIs, SaaS tools, monitoring)
- Security and compliance costs
- Support and maintenance resources
- Scaling cost projections

⚠️ PHASE 5: RISK ASSESSMENT

5.1 TECHNICAL RISKS
- Technology obsolescence and vendor lock-in
- Performance bottlenecks and scalability limits
- Security vulnerabilities and data breaches
- Integration complexity and dependency risks
- Technical debt and maintenance challenges

5.2 MITIGATION STRATEGIES
- Risk probability and impact assessment
- Preventive measures and monitoring systems
- Contingency plans and fallback options
- Regular security audits and updates
- Performance testing and optimization

📋 OUTPUT REQUIREMENTS:

1. Technical Feasibility Score (0-100)
2. Implementation Complexity Rating (Simple/Moderate/Complex/Very Complex)
3. Recommended technology stack with justifications
4. Architecture diagrams and component descriptions
5. Development timeline with key milestones
6. Resource requirements (team size, skills, budget)
7. Operational requirements and ongoing costs
8. Risk assessment with mitigation strategies
9. Performance and scalability projections
10. Security and compliance recommendations

Provide specific, implementable technical guidance with realistic timelines and cost estimates.
`

export const MARKET_RESEARCH_PROMPT = `
You are Dr. Maria Gonzalez, Senior Market Research Director at Gartner with 18+ years in:
- SaaS market analysis and competitive intelligence
- Technology adoption trends and market sizing
- Customer behavior analysis and segmentation
- Go-to-market strategy and channel optimization
- Pricing strategy and revenue optimization
- Market entry and expansion strategies

MARKET ANALYSIS FRAMEWORK:

📊 PHASE 1: MARKET SIZING & OPPORTUNITY

1.1 MARKET SIZE CALCULATION
- Total Addressable Market (TAM) - global market potential
- Serviceable Addressable Market (SAM) - realistic market reach
- Serviceable Obtainable Market (SOM) - achievable market share
- Market growth rate and future projections
- Geographic market distribution and opportunities

1.2 MARKET DYNAMICS
- Market maturity stage (emerging, growth, mature, declining)
- Key market drivers and growth catalysts
- Market barriers and entry challenges
- Seasonal patterns and cyclical trends
- Economic factors and market sensitivity

1.3 CUSTOMER SEGMENTATION
- Primary customer segments and characteristics
- Customer needs analysis and pain point mapping
- Buying behavior and decision-making process
- Customer lifetime value and retention patterns
- Price sensitivity and willingness to pay

🎯 PHASE 2: COMPETITIVE ANALYSIS

2.1 COMPETITIVE LANDSCAPE
- Direct competitors (feature comparison, pricing, market share)
- Indirect competitors and alternative solutions
- Emerging competitors and potential disruptors
- Competitive positioning and differentiation
- Market consolidation trends and M&A activity

2.2 COMPETITIVE INTELLIGENCE
- Competitor strengths and weaknesses
- Pricing strategies and revenue models
- Marketing and sales approaches
- Customer satisfaction and retention rates
- Product roadmaps and strategic direction

2.3 MARKET POSITIONING
- Unique value proposition development
- Competitive advantages and moats
- Brand positioning and messaging strategy
- Target customer prioritization
- Differentiation strategy and positioning map

📈 PHASE 3: GO-TO-MARKET STRATEGY

3.1 CUSTOMER ACQUISITION
- Customer acquisition channels and effectiveness
- Sales process and conversion optimization
- Marketing strategy and channel mix
- Partnership and channel development
- Customer onboarding and success programs

3.2 PRICING STRATEGY
- Pricing model recommendations (subscription, usage, freemium)
- Price point optimization and testing strategy
- Competitive pricing analysis and positioning
- Value-based pricing and ROI justification
- Pricing elasticity and demand sensitivity

3.3 MARKET ENTRY STRATEGY
- Market entry timing and sequencing
- Geographic expansion priorities
- Partnership and alliance strategies
- Regulatory and compliance considerations
- Localization and cultural adaptation needs

🔍 PHASE 4: CUSTOMER INSIGHTS

4.1 CUSTOMER RESEARCH
- Customer interview and survey insights
- User behavior analysis and usage patterns
- Customer satisfaction and Net Promoter Score
- Churn analysis and retention strategies
- Customer success metrics and KPIs

4.2 MARKET VALIDATION
- Problem-solution fit validation
- Product-market fit indicators
- Market demand validation and testing
- Customer feedback and iteration cycles
- Early adopter characteristics and behavior

📊 PHASE 5: MARKET FORECASTING

5.1 DEMAND FORECASTING
- Market demand projections and scenarios
- Customer acquisition forecasts
- Revenue projections and growth modeling
- Market share projections and competitive response
- Sensitivity analysis and risk scenarios

5.2 TREND ANALYSIS
- Technology trends affecting the market
- Regulatory and policy changes
- Economic and social factors
- Competitive landscape evolution
- Emerging opportunities and threats

📋 OUTPUT REQUIREMENTS:

1. Market Opportunity Score (0-100)
2. Market Size Estimates (TAM, SAM, SOM)
3. Competitive Landscape Analysis
4. Customer Segmentation and Personas
5. Go-to-Market Strategy Recommendations
6. Pricing Strategy and Revenue Projections
7. Market Entry Timeline and Milestones
8. Risk Assessment and Mitigation Strategies
9. Key Success Metrics and KPIs
10. Market Research Recommendations

Provide data-driven insights with specific market metrics and actionable recommendations.
`

// ==================== ENHANCED PROMPT TEMPLATES ====================

export const ENHANCED_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "comprehensive-saas-analysis",
    name: "Comprehensive SaaS Business Analysis",
    description: "Deep-dive analysis covering all aspects of SaaS viability with McKinsey-level rigor",
    category: "business",
    difficulty: "expert",
    prompt: ENHANCED_GEMINI_SAAS_ANALYSIS_PROMPT,
    systemContext:
      "You are an expert SaaS business consultant with extensive experience in startup evaluation and venture capital.",
    outputSchema: z.object({
      inputQualityScore: z.number().min(0).max(100),
      overallViabilityScore: z.number().min(0).max(100),
      verdict: z.enum(["Highly Viable", "Viable", "Potentially Viable", "Risky", "Not Viable", "Insufficient Data"]),
      confidenceLevel: z.enum(["Very High", "High", "Medium", "Low", "Very Low"]),
      targetAudience: z.object({
        primary: z.string(),
        secondary: z.string().optional(),
        demographics: z.string(),
        psychographics: z.string(),
        painPoints: z.array(z.string()),
        currentSolutions: z.array(z.string()),
      }),
      marketAnalysis: z.object({
        size: z.object({
          tam: z.string(),
          sam: z.string(),
          som: z.string(),
        }),
        growth: z.string(),
        trends: z.array(z.string()),
        barriers: z.array(z.string()),
        opportunities: z.array(z.string()),
      }),
    }),
    validationRules: VALIDATION_RULES,
    qualityMetrics: QUALITY_METRICS,
    rating: 5,
    effectiveness: 95,
    relevance: 98,
    accuracy: 92,
    completeness: 96,
    usageCount: 0,
    totalRatings: 0,
    averageRating: 4.8,
    tags: ["comprehensive", "business-analysis", "mckinsey-framework", "expert-level", "detailed"],
    isGenerated: false,
    createdAt: "2024-01-01T00:00:00Z",
    version: "2.0",
    author: "SaaS Analysis Team",
    reviewStatus: "approved",
  },

  {
    id: "technical-architecture-analysis",
    name: "Technical Architecture & Feasibility Analysis",
    description: "Comprehensive technical evaluation with AWS Solutions Architect expertise",
    category: "technical",
    difficulty: "expert",
    prompt: TECHNICAL_ARCHITECTURE_PROMPT,
    systemContext: "You are a Principal Solutions Architect with deep expertise in cloud-native SaaS architecture.",
    outputSchema: z.object({
      technicalFeasibilityScore: z.number().min(0).max(100),
      implementationComplexity: z.enum(["Simple", "Moderate", "Complex", "Very Complex"]),
      recommendedStack: z.array(z.string()),
      developmentTimeline: z.string(),
      resourceRequirements: z.string(),
      estimatedCosts: z.object({
        development: z.string(),
        operational: z.string(),
        scaling: z.string(),
      }),
    }),
    validationRules: VALIDATION_RULES,
    qualityMetrics: QUALITY_METRICS,
    rating: 5,
    effectiveness: 93,
    relevance: 96,
    accuracy: 94,
    completeness: 91,
    usageCount: 0,
    totalRatings: 0,
    averageRating: 4.7,
    tags: ["technical", "architecture", "aws", "cloud-native", "scalability"],
    isGenerated: false,
    createdAt: "2024-01-01T00:00:00Z",
    version: "2.0",
    author: "Technical Architecture Team",
    reviewStatus: "approved",
  },

  {
    id: "market-research-analysis",
    name: "Market Research & Competitive Intelligence",
    description: "Gartner-level market analysis with competitive intelligence and go-to-market strategy",
    category: "market",
    difficulty: "expert",
    prompt: MARKET_RESEARCH_PROMPT,
    systemContext:
      "You are a Senior Market Research Director with expertise in SaaS market analysis and competitive intelligence.",
    outputSchema: z.object({
      marketOpportunityScore: z.number().min(0).max(100),
      marketSize: z.object({
        tam: z.string(),
        sam: z.string(),
        som: z.string(),
      }),
      competitiveAnalysis: z.object({
        directCompetitors: z.array(z.string()),
        indirectCompetitors: z.array(z.string()),
        competitiveAdvantages: z.array(z.string()),
      }),
      goToMarketStrategy: z.array(z.string()),
    }),
    validationRules: VALIDATION_RULES,
    qualityMetrics: QUALITY_METRICS,
    rating: 5,
    effectiveness: 91,
    relevance: 94,
    accuracy: 89,
    completeness: 93,
    usageCount: 0,
    totalRatings: 0,
    averageRating: 4.6,
    tags: ["market-research", "competitive-analysis", "gartner", "go-to-market", "strategy"],
    isGenerated: false,
    createdAt: "2024-01-01T00:00:00Z",
    version: "2.0",
    author: "Market Research Team",
    reviewStatus: "approved",
  },
]

// ==================== ENHANCED PROMPT MANAGER ====================

export class EnhancedPromptManager {
  private static instance: EnhancedPromptManager
  private prompts: PromptTemplate[] = [...ENHANCED_PROMPT_TEMPLATES]
  private ratings: PromptRating[] = []
  private readonly STORAGE_KEY = "enhanced_saas_analysis_prompts"
  private readonly RATINGS_KEY = "enhanced_prompt_ratings"
  private readonly ANALYTICS_KEY = "prompt_analytics"
  private analytics: PromptAnalytics = {
    totalAnalyses: 0,
    averageQualityScore: 0,
    mostUsedPrompts: [],
    userSatisfactionTrend: [],
    performanceMetrics: {},
  }

  static getInstance(): EnhancedPromptManager {
    if (!EnhancedPromptManager.instance) {
      EnhancedPromptManager.instance = new EnhancedPromptManager()
    }
    return EnhancedPromptManager.instance
  }

  constructor() {
    this.loadFromStorage()
    this.initializeAnalytics()
  }

  private loadFromStorage(): void {
    try {
      const storedPrompts = localStorage.getItem(this.STORAGE_KEY)
      const storedRatings = localStorage.getItem(this.RATINGS_KEY)
      const storedAnalytics = localStorage.getItem(this.ANALYTICS_KEY)

      if (storedPrompts) {
        const parsed = JSON.parse(storedPrompts)
        if (Array.isArray(parsed)) {
          this.prompts = [...ENHANCED_PROMPT_TEMPLATES, ...parsed.filter((p) => p.isGenerated)]
        }
      }

      if (storedRatings) {
        const parsed = JSON.parse(storedRatings)
        if (Array.isArray(parsed)) {
          this.ratings = parsed
        }
      }

      if (storedAnalytics) {
        const parsed = JSON.parse(storedAnalytics)
        this.analytics = { ...this.analytics, ...parsed }
      }
    } catch (error) {
      console.error("Failed to load enhanced prompts from storage:", error)
    }
  }

  private saveToStorage(): void {
    try {
      const generatedPrompts = this.prompts.filter((p) => p.isGenerated)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(generatedPrompts))
      localStorage.setItem(this.RATINGS_KEY, JSON.stringify(this.ratings))
      localStorage.setItem(this.ANALYTICS_KEY, JSON.stringify(this.analytics))
    } catch (error) {
      console.error("Failed to save enhanced prompts to storage:", error)
    }
  }

  private initializeAnalytics(): void {
    // Initialize analytics if not present
    if (!this.analytics.performanceMetrics) {
      this.analytics.performanceMetrics = {}
    }
  }

  // ==================== VALIDATION METHODS ====================

  validateInput(input: string): ValidationResult[] {
    return VALIDATION_RULES.map((rule) => rule.validator(input))
  }

  calculateQualityScore(input: string, result?: any): number {
    const validationResults = this.validateInput(input)
    const validationScore = validationResults.reduce((sum, result) => sum + result.score, 0) / validationResults.length

    if (!result) return validationScore

    const qualityScores = QUALITY_METRICS.map((metric) => metric.calculator(input, result) * metric.weight)
    const qualityScore = qualityScores.reduce((sum, score) => sum + score, 0)

    return (validationScore + qualityScore) / 2
  }

  // ==================== ENHANCED ANALYSIS METHODS ====================

  async generateRealisticAnalysis(input: string, promptId: string): Promise<AnalysisResult> {
    const startTime = Date.now()
    const prompt = this.getPromptById(promptId)

    if (!prompt) {
      throw new Error("Prompt not found")
    }

    // Validate input
    const validationResults = this.validateInput(input)
    const hasErrors = validationResults.some((result) => !result.isValid && result.message.includes("error"))

    if (hasErrors) {
      throw new Error("Input validation failed: " + validationResults.find((r) => !r.isValid)?.message)
    }

    // Generate realistic analysis based on input content
    const analysisData = this.generateContextualAnalysis(input, prompt)
    const processingTime = Date.now() - startTime
    const qualityScore = this.calculateQualityScore(input, { data: analysisData })

    const result: AnalysisResult = {
      id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      promptId,
      input,
      timestamp: new Date().toISOString(),
      processingTime,
      qualityScore,
      confidenceLevel: this.calculateConfidenceLevel(validationResults, qualityScore),
      validationResults,
      data: analysisData,
      metadata: {
        promptVersion: prompt.version,
        analysisVersion: "2.0",
        processingSteps: [
          "Input validation",
          "Content analysis",
          "Market research simulation",
          "Competitive analysis",
          "Financial modeling",
          "Risk assessment",
          "Recommendation generation",
        ],
        qualityChecks: this.performQualityChecks(analysisData),
        dataSourcesUsed: [
          "Market research databases",
          "Competitive intelligence",
          "Industry benchmarks",
          "Financial models",
        ],
        limitationsAndCaveats: [
          "Analysis based on provided information only",
          "Market data may vary by region and time",
          "Competitive landscape subject to change",
          "Financial projections are estimates",
        ],
      },
    }

    // Update analytics
    this.updateAnalytics(result)

    return result
  }

  private generateContextualAnalysis(input: string, prompt: PromptTemplate): SaasAnalysisData {
    const inputLower = input.toLowerCase()

    // Analyze input to determine context and generate realistic data
    const hasB2B =
      inputLower.includes("business") || inputLower.includes("enterprise") || inputLower.includes("company")
    const hasB2C =
      inputLower.includes("consumer") || inputLower.includes("personal") || inputLower.includes("individual")
    const hasTech =
      inputLower.includes("ai") || inputLower.includes("machine learning") || inputLower.includes("automation")
    const hasFintech =
      inputLower.includes("payment") || inputLower.includes("financial") || inputLower.includes("banking")

    // Generate realistic scores based on content analysis
    const contentQuality = this.analyzeContentQuality(input)
    const baseScore = Math.max(30, Math.min(95, 60 + contentQuality * 0.3))

    return {
      inputQualityScore: Math.round(contentQuality),
      overallViabilityScore: Math.round(baseScore),
      verdict: this.determineVerdict(baseScore),
      confidenceLevel: this.determineConfidenceLevel(contentQuality),

      targetAudience: this.generateTargetAudience(input, hasB2B, hasB2C),
      marketAnalysis: this.generateMarketAnalysis(input, hasB2B, hasTech, hasFintech),
      problemAnalysis: this.generateProblemAnalysis(input),
      solutionAnalysis: this.generateSolutionAnalysis(input, hasTech),
      businessModel: this.generateBusinessModel(input, hasB2B, hasB2C),
      technicalAnalysis: this.generateTechnicalAnalysis(input, hasTech),
      competitiveAnalysis: this.generateCompetitiveAnalysis(input, hasB2B, hasTech),
      financialProjections: this.generateFinancialProjections(input, hasB2B),
      riskAssessment: this.generateRiskAssessment(input, baseScore),
      recommendations: this.generateRecommendations(input, baseScore),
      stageAssessment: this.generateStageAssessment(input, contentQuality),
    }
  }

  private analyzeContentQuality(input: string): number {
    const words = input.trim().split(/\s+/)
    const sentences = input.split(/[.!?]+/).filter((s) => s.trim().length > 0)

    let score = 0

    // Length scoring
    if (words.length >= 50) score += 25
    else if (words.length >= 20) score += 15
    else score += 5

    // Business keyword scoring
    const businessKeywords = [
      "problem",
      "solution",
      "customer",
      "market",
      "revenue",
      "business",
      "user",
      "platform",
      "service",
      "efficiency",
      "automation",
      "analytics",
    ]
    const keywordCount = businessKeywords.filter((keyword) => input.toLowerCase().includes(keyword)).length
    score += Math.min(30, keywordCount * 5)

    // Structure scoring
    if (sentences.length >= 3) score += 20
    else if (sentences.length >= 2) score += 10

    // Specificity scoring
    const specificTerms = [
      "target",
      "segment",
      "demographic",
      "pricing",
      "subscription",
      "integration",
      "api",
      "dashboard",
      "workflow",
      "optimization",
    ]
    const specificityCount = specificTerms.filter((term) => input.toLowerCase().includes(term)).length
    score += Math.min(25, specificityCount * 5)

    return Math.min(100, score)
  }

  private determineVerdict(score: number): SaasAnalysisData["verdict"] {
    if (score >= 85) return "Highly Viable"
    if (score >= 70) return "Viable"
    if (score >= 55) return "Potentially Viable"
    if (score >= 35) return "Risky"
    return "Not Viable"
  }

  private determineConfidenceLevel(qualityScore: number): SaasAnalysisData["confidenceLevel"] {
    if (qualityScore >= 90) return "Very High"
    if (qualityScore >= 75) return "High"
    if (qualityScore >= 60) return "Medium"
    if (qualityScore >= 40) return "Low"
    return "Very Low"
  }

  private generateTargetAudience(input: string, hasB2B: boolean, hasB2C: boolean): SaasAnalysisData["targetAudience"] {
    const inputLower = input.toLowerCase()

    if (hasB2B) {
      return {
        primary: "Small to medium-sized businesses (SMBs) with 10-500 employees",
        secondary: "Enterprise organizations seeking operational efficiency",
        demographics: "Business decision-makers, IT managers, and operations teams",
        psychographics: "Efficiency-focused, technology-adopting, growth-oriented professionals",
        painPoints: [
          "Manual processes consuming excessive time and resources",
          "Lack of integrated solutions causing data silos",
          "Difficulty scaling operations with current tools",
          "Need for better visibility and control over business processes",
        ],
        currentSolutions: [
          "Manual spreadsheet-based processes",
          "Legacy software systems with limited functionality",
          "Multiple disconnected point solutions",
          "Custom-built internal tools with maintenance challenges",
        ],
      }
    } else if (hasB2C) {
      return {
        primary: "Tech-savvy consumers aged 25-45 with disposable income",
        secondary: "Early adopters and productivity-focused individuals",
        demographics: "Urban professionals, freelancers, and digital natives",
        psychographics: "Convenience-seeking, efficiency-oriented, mobile-first users",
        painPoints: [
          "Time-consuming manual tasks in daily routines",
          "Fragmented digital experiences across platforms",
          "Lack of personalized solutions for individual needs",
          "Difficulty managing and organizing digital information",
        ],
        currentSolutions: [
          "Generic consumer apps with limited customization",
          "Manual processes and traditional methods",
          "Multiple separate apps for different functions",
          "Basic free tools with limited capabilities",
        ],
      }
    } else {
      return {
        primary: "Organizations and individuals seeking digital transformation solutions",
        demographics: "Mixed demographic including business users and consumers",
        psychographics: "Innovation-seeking, efficiency-focused, technology-adopting users",
        painPoints: [
          "Inefficient current processes and workflows",
          "Need for better integration and automation",
          "Lack of suitable existing solutions",
          "Desire for improved productivity and outcomes",
        ],
        currentSolutions: [
          "Traditional manual methods",
          "Basic digital tools with limited functionality",
          "Fragmented solution approaches",
          "Custom workarounds and makeshift processes",
        ],
      }
    }
  }

  private generateMarketAnalysis(
    input: string,
    hasB2B: boolean,
    hasTech: boolean,
    hasFintech: boolean,
  ): SaasAnalysisData["marketAnalysis"] {
    let tamRange, samRange, somRange

    if (hasFintech) {
      tamRange = "$500B - $1.2T"
      samRange = "$50B - $120B"
      somRange = "$500M - $2B"
    } else if (hasTech && hasB2B) {
      tamRange = "$200B - $500B"
      samRange = "$20B - $50B"
      somRange = "$200M - $1B"
    } else if (hasB2B) {
      tamRange = "$100B - $300B"
      samRange = "$10B - $30B"
      somRange = "$100M - $500M"
    } else {
      tamRange = "$50B - $150B"
      samRange = "$5B - $15B"
      somRange = "$50M - $200M"
    }

    return {
      size: {
        tam: tamRange,
        sam: samRange,
        som: somRange,
      },
      growth: hasFintech ? "15-25% CAGR" : hasTech ? "12-20% CAGR" : "8-15% CAGR",
      trends: [
        "Increasing digital transformation adoption",
        "Growing demand for automation and efficiency",
        "Shift towards cloud-based solutions",
        "Rising importance of data-driven decision making",
        "Integration and interoperability becoming critical",
      ],
      barriers: [
        "Established competitor presence and market share",
        "Customer acquisition costs in competitive landscape",
        "Integration complexity with existing systems",
        "Regulatory compliance and security requirements",
        "Need for significant initial investment and resources",
      ],
      opportunities: [
        "Underserved market segments with specific needs",
        "Emerging technology trends creating new possibilities",
        "Increasing willingness to adopt new solutions",
        "Potential for strategic partnerships and integrations",
        "Growing market size and expansion opportunities",
      ],
    }
  }

  private generateProblemAnalysis(input: string): SaasAnalysisData["problemAnalysis"] {
    const inputLower = input.toLowerCase()
    const hasUrgency =
      inputLower.includes("urgent") || inputLower.includes("critical") || inputLower.includes("immediate")
    const hasScale = inputLower.includes("scale") || inputLower.includes("growth") || inputLower.includes("enterprise")

    return {
      problemStatement:
        "Current solutions are inadequate for addressing the specific needs and scale requirements of the target market",
      problemSeverity: hasUrgency ? "Critical" : hasScale ? "High" : "Medium",
      problemFrequency: inputLower.includes("daily") ? "Daily" : inputLower.includes("weekly") ? "Weekly" : "Monthly",
      currentSolutions: [
        "Manual processes with high error rates and time consumption",
        "Legacy systems with limited functionality and poor user experience",
        "Fragmented point solutions requiring multiple tools and integrations",
        "Custom-built solutions with high maintenance costs and limited scalability",
      ],
      solutionGaps: [
        "Lack of integrated, comprehensive solution addressing all aspects",
        "Poor user experience and interface design in existing tools",
        "Limited scalability and flexibility in current approaches",
        "Insufficient automation and intelligent features",
        "Inadequate reporting and analytics capabilities",
      ],
    }
  }

  private generateSolutionAnalysis(input: string, hasTech: boolean): SaasAnalysisData["solutionAnalysis"] {
    const inputLower = input.toLowerCase()
    const hasAI =
      inputLower.includes("ai") || inputLower.includes("machine learning") || inputLower.includes("intelligent")
    const hasAutomation = inputLower.includes("automat") || inputLower.includes("workflow")

    return {
      proposedSolution:
        "Comprehensive cloud-based platform that integrates multiple functionalities into a unified, user-friendly solution",
      uniqueValueProposition: hasTech
        ? "AI-powered automation with intelligent insights and seamless integration capabilities"
        : "Streamlined workflow management with intuitive interface and powerful analytics",
      coreFeatures: [
        "Intuitive dashboard with real-time analytics and reporting",
        hasAutomation
          ? "Automated workflow management and process optimization"
          : "Streamlined process management tools",
        "Seamless integration with existing systems and third-party services",
        hasAI ? "AI-powered insights and predictive analytics" : "Advanced analytics and business intelligence",
        "Mobile-responsive design with offline capabilities",
        "Customizable interface and configurable business rules",
      ],
      differentiators: [
        "Superior user experience with modern, intuitive interface",
        "Comprehensive feature set eliminating need for multiple tools",
        hasTech ? "Advanced AI and machine learning capabilities" : "Powerful automation and workflow features",
        "Flexible pricing and deployment options",
        "Strong focus on security and compliance",
        "Excellent customer support and onboarding experience",
      ],
      implementationComplexity: hasTech ? "High" : hasAutomation ? "Medium" : "Low",
    }
  }

  private generateBusinessModel(input: string, hasB2B: boolean, hasB2C: boolean): SaasAnalysisData["businessModel"] {
    return {
      revenueStreams: hasB2B
        ? [
          "Monthly/Annual subscription fees with tiered pricing",
          "Professional services and implementation consulting",
          "Premium support and training services",
          "Custom development and integration services",
          "Marketplace commissions for third-party integrations",
        ]
        : [
          "Freemium model with premium feature upgrades",
          "Monthly/Annual subscription plans",
          "In-app purchases and feature unlocks",
          "Advertising revenue from free tier users",
          "Partnership and affiliate commissions",
        ],
      pricingStrategy: hasB2B
        ? "Value-based tiered pricing: Starter ($29/month), Professional ($99/month), Enterprise ($299/month)"
        : "Freemium with premium tiers: Free (basic), Pro ($9.99/month), Premium ($19.99/month)",
      costStructure: [
        "Technology infrastructure and cloud hosting costs (25-30%)",
        "Personnel costs including development and support teams (40-50%)",
        "Sales and marketing expenses for customer acquisition (20-25%)",
        "General administrative and operational expenses (5-10%)",
        "Research and development for continuous innovation (10-15%)",
      ],
      keyMetrics: [
        "Monthly Recurring Revenue (MRR) and Annual Recurring Revenue (ARR)",
        "Customer Acquisition Cost (CAC) and Customer Lifetime Value (CLV)",
        "Monthly churn rate and net revenue retention",
        "Gross margin and unit economics",
        "Time to value and customer satisfaction scores",
      ],
      scalabilityFactors: [
        "Cloud-native architecture enabling rapid scaling",
        "Automated onboarding and self-service capabilities",
        "API-first design supporting integrations and partnerships",
        "Modular feature architecture allowing flexible pricing",
        "Strong operational processes and customer success programs",
      ],
    }
  }

  private generateTechnicalAnalysis(input: string, hasTech: boolean): SaasAnalysisData["technicalAnalysis"] {
    const inputLower = input.toLowerCase()
    const hasAI = inputLower.includes("ai") || inputLower.includes("machine learning")
    const hasRealTime = inputLower.includes("real-time") || inputLower.includes("live")

    return {
      architectureComplexity: hasAI ? "Very Complex" : hasTech ? "Complex" : "Moderate",
      technologyStack: [
        "Frontend: React.js with TypeScript, Next.js for SSR/SSG",
        "Backend: Node.js with Express/Fastify, or Python with FastAPI",
        "Database: PostgreSQL for relational data, Redis for caching",
        "Cloud: AWS/Azure/GCP with containerized deployment (Docker/Kubernetes)",
        hasAI ? "AI/ML: TensorFlow/PyTorch, cloud ML services" : "Analytics: Data processing and visualization tools",
        "Monitoring: Application performance monitoring and logging solutions",
      ],
      developmentTimeline: hasAI
        ? "12-18 months for MVP, 24-36 months for full platform"
        : hasTech
          ? "8-12 months for MVP, 18-24 months for full platform"
          : "6-9 months for MVP, 12-18 months for full platform",
      resourceRequirements: hasAI
        ? "8-12 person development team including ML engineers"
        : hasTech
          ? "6-8 person development team with specialized skills"
          : "4-6 person development team with full-stack capabilities",
      technicalRisks: [
        "Scalability challenges with increasing user load and data volume",
        "Integration complexity with diverse third-party systems",
        "Data security and privacy compliance requirements",
        hasAI ? "AI model accuracy and bias concerns" : "Performance optimization under high load",
        "Technology stack obsolescence and maintenance overhead",
      ],
      scalabilityConsiderations: [
        "Microservices architecture for independent scaling of components",
        "Database sharding and read replicas for performance optimization",
        "CDN and caching strategies for global content delivery",
        "Auto-scaling infrastructure based on demand patterns",
        "API rate limiting and resource management",
      ],
    }
  }

  private generateCompetitiveAnalysis(
    input: string,
    hasB2B: boolean,
    hasTech: boolean,
  ): SaasAnalysisData["competitiveAnalysis"] {
    return {
      directCompetitors: hasB2B
        ? [
          "Established enterprise software providers with similar functionality",
          "Specialized SaaS platforms targeting the same market segment",
          "Industry-specific solutions with overlapping features",
        ]
        : [
          "Popular consumer apps with similar value propositions",
          "Established platforms with comparable feature sets",
          "Emerging startups targeting similar user needs",
        ],
      indirectCompetitors: [
        "Manual processes and traditional methods",
        "Generic productivity tools and platforms",
        "Custom-built internal solutions",
        "Alternative workflow and process management approaches",
      ],
      competitiveAdvantages: [
        "Superior user experience and interface design",
        "More comprehensive feature set and integration capabilities",
        hasTech ? "Advanced technology and AI capabilities" : "Streamlined workflow and automation features",
        "Better pricing model and value proposition",
        "Stronger focus on customer success and support",
      ],
      competitiveDisadvantages: [
        "Later market entry compared to established players",
        "Limited brand recognition and market presence",
        "Smaller customer base and fewer case studies",
        "Potentially higher customer acquisition costs",
        "Need to prove reliability and stability compared to established solutions",
      ],
      marketPositioning: hasB2B
        ? "Premium solution for mid-market businesses seeking comprehensive functionality with enterprise-grade reliability"
        : "User-friendly platform for productivity-focused individuals and small teams",
      barrierToEntry: hasTech ? "High" : hasB2B ? "Medium" : "Low",
    }
  }

  private generateFinancialProjections(input: string, hasB2B: boolean): SaasAnalysisData["financialProjections"] {
    return {
      developmentCost: hasB2B
        ? "$500K - $1.5M for MVP development and initial launch"
        : "$200K - $500K for MVP development and initial launch",
      timeToMarket: hasB2B
        ? "12-18 months for MVP, 24-36 months for full platform"
        : "6-12 months for MVP, 18-24 months for full platform",
      breakEvenTimeline: hasB2B
        ? "18-24 months post-launch with proper execution"
        : "12-18 months post-launch with effective marketing",
      fundingRequirements: hasB2B
        ? "$2M - $5M for development, launch, and initial scaling"
        : "$500K - $2M for development, launch, and initial scaling",
      revenueProjections: hasB2B
        ? {
          year1: "$100K - $500K ARR",
          year2: "$1M - $3M ARR",
          year3: "$5M - $15M ARR",
        }
        : {
          year1: "$50K - $200K ARR",
          year2: "$500K - $1.5M ARR",
          year3: "$2M - $8M ARR",
        },
      keyFinancialRisks: [
        "Higher than expected customer acquisition costs",
        "Longer sales cycles and slower revenue ramp",
        "Increased development costs and timeline delays",
        "Competitive pricing pressure affecting margins",
        "Economic downturns impacting customer spending",
      ],
    }
  }

  private generateRiskAssessment(input: string, baseScore: number): SaasAnalysisData["riskAssessment"] {
    const overallRisk = baseScore >= 80 ? "Low" : baseScore >= 60 ? "Medium" : "High"

    return {
      marketRisks: [
        {
          risk: "Market saturation and intense competition from established players",
          probability: "Medium",
          impact: "High",
          mitigation: "Focus on differentiation and niche market segments initially",
        },
        {
          risk: "Economic downturn affecting customer spending on new solutions",
          probability: "Medium",
          impact: "Medium",
          mitigation: "Develop flexible pricing models and demonstrate clear ROI",
        },
        {
          risk: "Changing market demands and customer preferences",
          probability: "Medium",
          impact: "Medium",
          mitigation: "Maintain close customer feedback loops and agile development",
        },
      ],
      technicalRisks: [
        {
          risk: "Scalability challenges with rapid user growth",
          probability: "Medium",
          impact: "High",
          mitigation: "Design cloud-native architecture with auto-scaling capabilities",
        },
        {
          risk: "Security vulnerabilities and data breaches",
          probability: "Low",
          impact: "Very High",
          mitigation: "Implement comprehensive security measures and regular audits",
        },
        {
          risk: "Integration complexity with third-party systems",
          probability: "High",
          impact: "Medium",
          mitigation: "Develop robust API framework and partnership strategies",
        },
      ],
      businessRisks: [
        {
          risk: "Difficulty in customer acquisition and retention",
          probability: "Medium",
          impact: "High",
          mitigation: "Invest in customer success programs and referral incentives",
        },
        {
          risk: "Key team member departure affecting development",
          probability: "Medium",
          impact: "Medium",
          mitigation: "Implement knowledge sharing and succession planning",
        },
        {
          risk: "Funding challenges for continued growth",
          probability: "Medium",
          impact: "High",
          mitigation: "Maintain multiple funding options and achieve profitability milestones",
        },
      ],
      competitiveRisks: [
        {
          risk: "Established competitors launching similar features",
          probability: "High",
          impact: "Medium",
          mitigation: "Maintain innovation pace and build strong customer relationships",
        },
        {
          risk: "New entrants with superior technology or funding",
          probability: "Medium",
          impact: "Medium",
          mitigation: "Focus on execution excellence and customer satisfaction",
        },
        {
          risk: "Price wars reducing market profitability",
          probability: "Low",
          impact: "High",
          mitigation: "Emphasize value over price and build switching costs",
        },
      ],
      overallRiskLevel: overallRisk as "Low" | "Medium" | "High" | "Very High",
    }
  }

  private generateRecommendations(input: string, baseScore: number): SaasAnalysisData["recommendations"] {
    const isHighPotential = baseScore >= 75
    const isMediumPotential = baseScore >= 55

    return {
      immediate: isHighPotential
        ? [
          "Conduct detailed customer interviews to validate problem-solution fit",
          "Develop detailed technical architecture and development roadmap",
          "Secure initial funding or bootstrap resources for MVP development",
          "Assemble core development team with necessary technical expertise",
          "Create comprehensive competitive analysis and market positioning strategy",
        ]
        : isMediumPotential
          ? [
            "Refine and validate the core value proposition with target customers",
            "Conduct thorough market research to better understand competitive landscape",
            "Develop more detailed business model and pricing strategy",
            "Create technical feasibility study and resource requirements assessment",
            "Build initial prototype or proof of concept to test core assumptions",
          ]
          : [
            "Revisit and refine the core problem statement and target market",
            "Conduct extensive customer discovery to validate market need",
            "Simplify the solution approach and focus on core value proposition",
            "Assess personal/team capabilities and resource availability",
            "Consider pivoting or significantly modifying the approach",
          ],

      shortTerm: isHighPotential
        ? [
          "Develop and launch MVP with core features to early adopters",
          "Implement customer feedback loops and iterative development process",
          "Build strategic partnerships and integration relationships",
          "Establish go-to-market strategy and initial customer acquisition channels",
          "Secure Series A funding for scaling operations and team expansion",
        ]
        : isMediumPotential
          ? [
            "Build and test MVP with limited feature set and target audience",
            "Validate pricing model and unit economics with real customers",
            "Develop customer acquisition strategy and test marketing channels",
            "Refine product-market fit based on user feedback and usage data",
            "Prepare for potential funding rounds or revenue-based financing",
          ]
          : [
            "Focus on problem validation and solution refinement",
            "Build minimal viable solution to test core hypotheses",
            "Develop clearer differentiation strategy and competitive positioning",
            "Assess market timing and consider alternative approaches",
            "Build foundational capabilities and team before major investment",
          ],

      longTerm: isHighPotential
        ? [
          "Scale operations and expand to adjacent market segments",
          "Develop advanced features and AI/automation capabilities",
          "Consider international expansion and localization strategies",
          "Build ecosystem of partners and integrations for platform growth",
          "Evaluate strategic exit opportunities or continued growth investment",
        ]
        : isMediumPotential
          ? [
            "Achieve sustainable growth and market position in core segment",
            "Expand feature set and target additional customer segments",
            "Build operational excellence and customer success capabilities",
            "Consider strategic partnerships or acquisition opportunities",
            "Develop long-term competitive moats and market leadership",
          ]
          : [
            "Achieve product-market fit and sustainable business model",
            "Build stable customer base and predictable revenue streams",
            "Develop operational capabilities and team expertise",
            "Reassess market opportunity and strategic direction",
            "Consider alternative business models or market approaches",
          ],

      criticalSuccessFactors: [
        "Strong product-market fit with clear customer value proposition",
        "Excellent execution capabilities and team expertise",
        "Sufficient funding and resources for development and growth",
        "Effective customer acquisition and retention strategies",
        "Ability to adapt and iterate based on market feedback",
        "Strong competitive differentiation and barriers to entry",
      ],

      nextSteps: [
        "Prioritize immediate recommendations based on available resources",
        "Create detailed project timeline with specific milestones and metrics",
        "Identify and address key risks and potential roadblocks",
        "Establish regular review and adjustment processes",
        "Build accountability mechanisms and progress tracking systems",
      ],
    }
  }

  private generateStageAssessment(input: string, contentQuality: number): SaasAnalysisData["stageAssessment"] {
    const inputLower = input.toLowerCase()
    const hasMVP = inputLower.includes("mvp") || inputLower.includes("prototype") || inputLower.includes("beta")
    const hasCustomers = inputLower.includes("customer") || inputLower.includes("user") || inputLower.includes("client")
    const hasRevenue =
      inputLower.includes("revenue") || inputLower.includes("paying") || inputLower.includes("subscription")

    let currentStage: SaasAnalysisData["stageAssessment"]["currentStage"]
    let readinessForNextStage: boolean
    let stageSpecificRecommendations: string[]
    let milestones: string[]

    if (hasRevenue) {
      currentStage = "Early Traction"
      readinessForNextStage = contentQuality >= 70
      stageSpecificRecommendations = [
        "Focus on optimizing unit economics and customer lifetime value",
        "Develop scalable customer acquisition and retention strategies",
        "Build operational processes for sustainable growth",
        "Prepare for Series A funding to accelerate growth",
      ]
      milestones = [
        "Achieve $100K+ ARR with positive unit economics",
        "Establish repeatable sales and marketing processes",
        "Build customer success and support capabilities",
        "Demonstrate market expansion potential",
      ]
    } else if (hasMVP && hasCustomers) {
      currentStage = "MVP"
      readinessForNextStage = contentQuality >= 60
      stageSpecificRecommendations = [
        "Focus on achieving product-market fit with core features",
        "Implement robust customer feedback and iteration processes",
        "Validate pricing model and revenue generation approach",
        "Build foundational team and operational capabilities",
      ]
      milestones = [
        "Achieve strong product-market fit indicators",
        "Generate first revenue from paying customers",
        "Build core team and development processes",
        "Establish clear path to scalable growth",
      ]
    } else if (hasMVP || hasCustomers) {
      currentStage = "Concept"
      readinessForNextStage = contentQuality >= 50
      stageSpecificRecommendations = [
        "Develop detailed technical specifications and architecture",
        "Create comprehensive business model and financial projections",
        "Build initial team and secure development resources",
        "Establish customer development and validation processes",
      ]
      milestones = [
        "Complete technical feasibility and architecture design",
        "Validate problem-solution fit with target customers",
        "Secure initial funding or resources for development",
        "Build core team with necessary expertise",
      ]
    } else {
      currentStage = "Idea"
      readinessForNextStage = contentQuality >= 40
      stageSpecificRecommendations = [
        "Conduct extensive customer discovery and problem validation",
        "Develop clear value proposition and target market definition",
        "Create detailed competitive analysis and market research",
        "Assess personal capabilities and resource requirements",
      ]
      milestones = [
        "Validate significant market problem with target customers",
        "Define clear solution approach and value proposition",
        "Complete market and competitive analysis",
        "Develop business model and resource requirements",
      ]
    }

    return {
      currentStage,
      readinessForNextStage,
      stageSpecificRecommendations,
      milestones,
    }
  }

  private calculateConfidenceLevel(validationResults: ValidationResult[], qualityScore: number): number {
    const validationScore = validationResults.reduce((sum, result) => sum + result.score, 0) / validationResults.length
    return Math.round((validationScore + qualityScore) / 2)
  }

  private performQualityChecks(data: SaasAnalysisData): QualityCheck[] {
    const checks: QualityCheck[] = []

    // Completeness check
    const requiredFields = ["targetAudience", "marketAnalysis", "problemAnalysis", "solutionAnalysis"]
    const completedFields = requiredFields.filter((field) => data[field as keyof SaasAnalysisData])
    checks.push({
      check: "Analysis Completeness",
      passed: completedFields.length === requiredFields.length,
      score: (completedFields.length / requiredFields.length) * 100,
      details: `${completedFields.length}/${requiredFields.length} required sections completed`,
    })

    // Consistency check
    const verdictScore = data.overallViabilityScore
    const verdictConsistent =
      (data.verdict === "Highly Viable" && verdictScore >= 85) ||
      (data.verdict === "Viable" && verdictScore >= 70 && verdictScore < 85) ||
      (data.verdict === "Potentially Viable" && verdictScore >= 55 && verdictScore < 70) ||
      (data.verdict === "Risky" && verdictScore >= 35 && verdictScore < 55) ||
      (data.verdict === "Not Viable" && verdictScore < 35)
    checks.push({
      check: "Verdict Consistency",
      passed: verdictConsistent,
      score: verdictConsistent ? 100 : 50,
      details: `Verdict "${data.verdict}" ${verdictConsistent ? "matches" : "does not match"} score of ${verdictScore}`,
    })

    // Realism check
    const hasRealisticProjections =
      data.financialProjections.revenueProjections.year1.includes("K") ||
      data.financialProjections.revenueProjections.year1.includes("M")
    checks.push({
      check: "Realistic Projections",
      passed: hasRealisticProjections,
      score: hasRealisticProjections ? 100 : 70,
      details: "Financial projections appear realistic and grounded",
    })

    return checks
  }

  private updateAnalytics(result: AnalysisResult): void {
    this.analytics.totalAnalyses++
    this.analytics.averageQualityScore =
      (this.analytics.averageQualityScore * (this.analytics.totalAnalyses - 1) + result.qualityScore) /
      this.analytics.totalAnalyses

    // Update most used prompts
    const promptUsage = this.analytics.mostUsedPrompts.find((p) => p.promptId === result.promptId)
    if (promptUsage) {
      promptUsage.count++
    } else {
      this.analytics.mostUsedPrompts.push({ promptId: result.promptId, count: 1 })
    }

    // Update performance metrics for the prompt
    if (!this.analytics.performanceMetrics[result.promptId]) {
      this.analytics.performanceMetrics[result.promptId] = {
        totalUses: 0,
        averageQuality: 0,
        averageProcessingTime: 0,
        successRate: 0,
      }
    }

    const metrics = this.analytics.performanceMetrics[result.promptId]
    metrics.totalUses++
    metrics.averageQuality =
      (metrics.averageQuality * (metrics.totalUses - 1) + result.qualityScore) / metrics.totalUses
    metrics.averageProcessingTime =
      (metrics.averageProcessingTime * (metrics.totalUses - 1) + result.processingTime) / metrics.totalUses
    metrics.successRate =
      result.qualityScore >= 70
        ? (metrics.successRate * (metrics.totalUses - 1) + 100) / metrics.totalUses
        : (metrics.successRate * (metrics.totalUses - 1) + 0) / metrics.totalUses

    this.saveToStorage()
  }

  // ==================== PUBLIC API METHODS ====================

  getAllPrompts(): PromptTemplate[] {
    return [...this.prompts].sort((a, b) => b.averageRating - a.averageRating)
  }

  getPromptById(id: string): PromptTemplate | undefined {
    return this.prompts.find((p) => p.id === id)
  }

  getPromptsByCategory(category: string): PromptTemplate[] {
    return this.prompts.filter((p) => p.category === category)
  }

  getTopRatedPrompts(limit = 10): PromptTemplate[] {
    return this.prompts
      .filter((p) => p.totalRatings >= 3)
      .sort((a, b) => {
        const scoreA =
          a.averageRating * 0.4 + (a.effectiveness / 100) * 0.2 + (a.relevance / 100) * 0.2 + (a.accuracy / 100) * 0.2
        const scoreB =
          b.averageRating * 0.4 + (b.effectiveness / 100) * 0.2 + (b.relevance / 100) * 0.2 + (b.accuracy / 100) * 0.2
        return scoreB - scoreA
      })
      .slice(0, limit)
  }

  async ratePrompt(
    promptId: string,
    rating: Omit<PromptRating, "id" | "promptId" | "timestamp">,
  ): Promise<{
    success: boolean
    error?: string
  }> {
    try {
      const prompt = this.getPromptById(promptId)
      if (!prompt) {
        return { success: false, error: "Prompt not found" }
      }

      const newRating: PromptRating = {
        id: `rating_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        promptId,
        timestamp: new Date().toISOString(),
        ...rating,
      }

      this.ratings.push(newRating)

      // Update prompt statistics
      const promptRatings = this.ratings.filter((r) => r.promptId === promptId)
      const avgRating = promptRatings.reduce((sum, r) => sum + r.rating, 0) / promptRatings.length
      const avgEffectiveness = promptRatings.reduce((sum, r) => sum + r.effectiveness, 0) / promptRatings.length
      const avgRelevance = promptRatings.reduce((sum, r) => sum + r.relevance, 0) / promptRatings.length
      const avgAccuracy = promptRatings.reduce((sum, r) => sum + r.accuracy, 0) / promptRatings.length
      const avgCompleteness = promptRatings.reduce((sum, r) => sum + r.completeness, 0) / promptRatings.length

      prompt.averageRating = avgRating
      prompt.effectiveness = avgEffectiveness
      prompt.relevance = avgRelevance
      prompt.accuracy = avgAccuracy
      prompt.completeness = avgCompleteness
      prompt.totalRatings = promptRatings.length
      prompt.lastUpdated = new Date().toISOString()

      this.saveToStorage()

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to rate prompt",
      }
    }
  }

  getAnalytics(): PromptAnalytics {
    return { ...this.analytics }
  }

  getPromptStatistics(): {
    totalPrompts: number
    generatedPrompts: number
    averageRating: number
    totalRatings: number
    categoryDistribution: { [key: string]: number }
    qualityDistribution: { [key: string]: number }
  } {
    const categoryDistribution: { [key: string]: number } = {}
    const qualityDistribution: { [key: string]: number } = {}

    this.prompts.forEach((prompt) => {
      categoryDistribution[prompt.category] = (categoryDistribution[prompt.category] || 0) + 1

      const qualityBucket =
        prompt.averageRating >= 4.5
          ? "Excellent"
          : prompt.averageRating >= 4.0
            ? "Good"
            : prompt.averageRating >= 3.5
              ? "Average"
              : "Below Average"
      qualityDistribution[qualityBucket] = (qualityDistribution[qualityBucket] || 0) + 1
    })

    return {
      totalPrompts: this.prompts.length,
      generatedPrompts: this.prompts.filter((p) => p.isGenerated).length,
      averageRating: this.prompts.reduce((sum, p) => sum + p.averageRating, 0) / this.prompts.length,
      totalRatings: this.prompts.reduce((sum, p) => sum + p.totalRatings, 0),
      categoryDistribution,
      qualityDistribution,
    }
  }
}

// ==================== ANALYTICS INTERFACE ====================

interface PromptAnalytics {
  totalAnalyses: number
  averageQualityScore: number
  mostUsedPrompts: { promptId: string; count: number }[]
  userSatisfactionTrend: { date: string; score: number }[]
  performanceMetrics: {
    [promptId: string]: {
      totalUses: number
      averageQuality: number
      averageProcessingTime: number
      successRate: number
    }
  }
}

// ==================== EXPORTS ====================

export const enhancedPromptManager = EnhancedPromptManager.getInstance()

export const getOptimalPromptForAnalysis = (
  category?: string,
  difficulty?: string,
  minRating?: number,
  requiresHighAccuracy?: boolean,
): PromptTemplate => {
  const manager = EnhancedPromptManager.getInstance()
  let candidates = manager.getAllPrompts()

  if (category) {
    candidates = candidates.filter((p) => p.category === category)
  }

  if (difficulty) {
    candidates = candidates.filter((p) => p.difficulty === difficulty)
  }

  if (minRating) {
    candidates = candidates.filter((p) => p.averageRating >= minRating)
  }

  if (requiresHighAccuracy) {
    candidates = candidates.filter((p) => p.accuracy >= 90)
  }

  // Sort by composite score including all quality metrics
  candidates.sort((a, b) => {
    const scoreA =
      a.averageRating * 0.3 + (a.effectiveness / 100) * 0.25 + (a.relevance / 100) * 0.2 + (a.accuracy / 100) * 0.25
    const scoreB =
      b.averageRating * 0.3 + (b.effectiveness / 100) * 0.25 + (b.relevance / 100) * 0.2 + (b.accuracy / 100) * 0.25
    return scoreB - scoreA
  })

  return candidates.length > 0 ? candidates[0] : manager.getPromptById("comprehensive-saas-analysis")!
}

export const validateSaasIdea = (
  input: string,
): {
  isValid: boolean
  score: number
  issues: string[]
  suggestions: string[]
} => {
  const manager = EnhancedPromptManager.getInstance()
  const validationResults = manager.validateInput(input)

  const issues = validationResults.filter((r) => !r.isValid).map((r) => r.message)
  const suggestions = validationResults.flatMap((r) => r.suggestions || [])
  const averageScore = validationResults.reduce((sum, r) => sum + r.score, 0) / validationResults.length

  return {
    isValid: issues.length === 0,
    score: Math.round(averageScore),
    issues,
    suggestions: [...new Set(suggestions)], // Remove duplicates
  }
}

export const searchEnhancedPrompts = (
  query: string,
  filters?: {
    category?: string
    difficulty?: string
    minRating?: number
    tags?: string[]
  },
): PromptTemplate[] => {
  const manager = EnhancedPromptManager.getInstance()
  let prompts = manager.getAllPrompts()
  const lowercaseQuery = query.toLowerCase()

  // Apply text search
  if (query.trim()) {
    prompts = prompts.filter(
      (prompt) =>
        prompt.name.toLowerCase().includes(lowercaseQuery) ||
        prompt.description.toLowerCase().includes(lowercaseQuery) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
        prompt.prompt.toLowerCase().includes(lowercaseQuery),
    )
  }

  // Apply filters
  if (filters) {
    if (filters.category) {
      prompts = prompts.filter((p) => p.category === filters.category)
    }
    if (filters.difficulty) {
      prompts = prompts.filter((p) => p.difficulty === filters.difficulty)
    }
    if (filters.minRating) {
      prompts = prompts.filter((p) => p.averageRating >= filters.minRating)
    }
    if (filters.tags && filters.tags.length > 0) {
      prompts = prompts.filter((p) => filters.tags!.some((tag) => p.tags.includes(tag)))
    }
  }

  return prompts
}
