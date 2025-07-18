import { Button } from '@/core/components/ents/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ents/ui/card';
import ScrambleIn, { ScrambleInHandle } from '@/core/components/ents/ui/scramble-in';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ents/ui/tabs';
import { Badge } from '@/core/components/ui/badge';
import { cssVars } from '@/core/utils/cssVariables';
import { AnalysisResult } from '@/lib/uxAnalyzer';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertTriangle,
    CheckCircle,
    Download,
    Eye,
    EyeOff,
    Lightbulb,
    Target,
    Trash2
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
    getThemeComplexityColor,
    getThemePriorityColor,
    getThemeRiskColor,
    getThemeScoreColor,
    getThemeValidityColor,
} from '../../utils/themeUtils';
import { useTheme } from '../themes';

interface ComprehensiveAnalysisTableProps {
  results: AnalysisResult[];
  language: 'en' | 'ar';
  onExport?: () => void;
  onClear?: () => void;
}

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const tabContentVariants = {
  hidden: {
    opacity: 0,
    x: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    scale: 0.98,
    transition: {
      duration: 0.2,
    },
  },
};

const badgeVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 25,
      delay: 0.1,
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

const ComprehensiveAnalysisTable = ({
  results,
  language,
  onExport,
  onClear,
}: ComprehensiveAnalysisTableProps) => {
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState('overview');
  const { theme } = useTheme();
  const scrambleRefs = useRef<(ScrambleInHandle | null)[]>([]);

  useEffect(() => {
    // Start scramble animation for all text elements with staggered delay
    results.forEach((_, resultIndex) => {
      const baseDelay = resultIndex * 300; // Delay between results

      // Start animations for each text element in this result
      for (let i = 0; i < 10; i++) {
        const delay = baseDelay + i * 60;
        setTimeout(() => {
          const refIndex = resultIndex * 10 + i;
          scrambleRefs.current[refIndex]?.start();
        }, delay);
      }
    });
  }, [results]);

  const toggleExpanded = (resultId: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(resultId)) {
      newExpanded.delete(resultId);
    } else {
      newExpanded.add(resultId);
    }
    setExpandedResults(newExpanded);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Theme-aware color functions
  const getScoreColorStyle = (score: number) => getThemeScoreColor(score, theme);
  const getValidityColorStyle = (validity?: string) => getThemeValidityColor(validity || '', theme);
  const getRiskColorStyle = (level: string) => getThemeRiskColor(level, theme);
  const getComplexityColorStyle = (complexity: string) =>
    getThemeComplexityColor(complexity, theme);
  const getPriorityColorStyle = (priority: string) => getThemePriorityColor(priority, theme);

  if (results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
            >
              <Target className="w-12 h-12 mx-auto mb-4" style={{ color: cssVars.textMuted }} />
            </motion.div>
            <motion.h3
              className="text-lg font-semibold mb-2"
              
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              No Analysis Results Yet
            </motion.h3>
            <motion.p
              className="text-sm"
              style={{ color: cssVars.textMuted }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Start by analyzing your first SaaS concept to see detailed results here.
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Actions */}
      <motion.div className="flex justify-between items-center" variants={cardVariants}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold" >
            Analysis Results
          </h2>
          <motion.p
            className="text-sm"
            
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {results.length} analysis{results.length !== 1 ? 'es' : ''} completed
          </motion.p>
        </motion.div>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {onExport && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={onExport} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </motion.div>
          )}
          {onClear && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={onClear} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Results List */}
      <AnimatePresence>
        {results.map((result, index) => {
          const isExpanded = expandedResults.has(result.id);

          return (
            <motion.div
              key={result.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              layout
            >
              <Card className="w-full shadow-lg overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <motion.div
                        className="flex items-center gap-3 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div variants={badgeVariants} whileHover="hover">
                          <Badge variant="secondary" className="text-xs">
                            <ScrambleIn
                              ref={(el) => {
                                scrambleRefs.current[index * 10 + 0] = el;
                              }}
                              text={`Analysis #${results.length - index}`}
                              scrambleSpeed={25}
                              scrambledLetterCount={3}
                              autoStart={false}
                            />
                          </Badge>
                        </motion.div>
                        <motion.div variants={badgeVariants} whileHover="hover">
                          <Badge className={getValidityColor(result.validity)}>
                            <ScrambleIn
                              ref={(el) => {
                                scrambleRefs.current[index * 10 + 1] = el;
                              }}
                              text={result.validity || 'N/A'}
                              scrambleSpeed={30}
                              scrambledLetterCount={2}
                              autoStart={false}
                            />
                          </Badge>
                        </motion.div>
                        <motion.div
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                            result.score,
                          )}`}
                          variants={badgeVariants}
                          whileHover="hover"
                        >
                          <ScrambleIn
                            ref={(el) => {
                              scrambleRefs.current[index * 10 + 2] = el;
                            }}
                            text={`${result.score}/100`}
                            scrambleSpeed={35}
                            scrambledLetterCount={2}
                            autoStart={false}
                          />
                        </motion.div>
                      </motion.div>
                      <CardTitle className="text-lg mb-2">
                        <ScrambleIn
                          ref={(el) => {
                            scrambleRefs.current[index * 10 + 3] = el;
                          }}
                          text="SaaS Concept Analysis"
                          scrambleSpeed={25}
                          scrambledLetterCount={4}
                          autoStart={false}
                        />
                      </CardTitle>
                      <p className="text-sm mb-2" >
                        <ScrambleIn
                          ref={(el) => {
                            scrambleRefs.current[index * 10 + 4] = el;
                          }}
                          text={formatDate(result.timestamp)}
                          scrambleSpeed={30}
                          scrambledLetterCount={3}
                          autoStart={false}
                        />
                      </p>
                      {result.summary && (
                        <p className="text-sm italic" >
                          <ScrambleIn
                            ref={(el) => {
                              scrambleRefs.current[index * 10 + 5] = el;
                            }}
                            text={result.summary}
                            scrambleSpeed={20}
                            scrambledLetterCount={5}
                            autoStart={false}
                          />
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(result.id)}
                      className="ml-4"
                    >
                      {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Input Text */}
                  <div className="mb-6">
                    <h4
                      className="font-semibold mb-2 flex items-center gap-2"
                      
                    >
                      <Target className="w-4 h-4" />
                      Original Concept
                    </h4>
                    <div
                      className="p-4 rounded-lg"
                      style={{
                        backgroundColor: cssVars.bgSecondary,
                      }}
                    >
                      <p className="text-sm" >
                        {isExpanded
                          ? result.input
                          : result.input.length > 200
                            ? `${result.input.substring(0, 200)}...`
                            : result.input}
                      </p>
                    </div>
                  </div>

                  {isExpanded && (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="market">Market</TabsTrigger>
                        <TabsTrigger value="ux">UX</TabsTrigger>
                        <TabsTrigger value="financial">Financial</TabsTrigger>
                        <TabsTrigger value="technical">Technical</TabsTrigger>
                        <TabsTrigger value="risks">Risks & Ops</TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Legacy Issues */}
                          {result.issues && result.issues.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Key Issues
                              </h4>
                              <ul className="space-y-2">
                                {result.issues.map((issue, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                    <span>{issue}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Legacy Recommendations */}
                          {result.recommendations && result.recommendations.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Recommendations
                              </h4>
                              <ul className="space-y-2">
                                {result.recommendations.map((rec, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="market" className="mt-4">
                        {result.market && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {result.market.pain_severity && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">Pain Severity</h5>
                                  <Badge className={getRiskColor(result.market.pain_severity)}>
                                    {result.market.pain_severity}
                                  </Badge>
                                </div>
                              )}
                              {result.market.tam_estimate && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">
                                    Market Size (TAM)
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {result.market.tam_estimate}
                                  </p>
                                </div>
                              )}
                            </div>
                            {result.market.pain_description && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">
                                  Problem Description
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {result.market.pain_description}
                                </p>
                              </div>
                            )}
                            {result.market.buyer_personas &&
                              result.market.buyer_personas.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">
                                    Target Personas
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {result.market.buyer_personas.map((persona, idx) => (
                                      <Badge key={idx} variant="outline">
                                        {persona}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="ux" className="mt-4">
                        {result.user_experience && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.user_experience.complexity_level && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">UX Complexity</h5>
                                <Badge variant="outline">
                                  {result.user_experience.complexity_level}
                                </Badge>
                              </div>
                            )}
                            {result.user_experience.user_journey_quality && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">
                                  User Journey Quality
                                </h5>
                                <Badge
                                  className={getRiskColor(
                                    result.user_experience.user_journey_quality === 'Smooth'
                                      ? 'Low'
                                      : result.user_experience.user_journey_quality === 'Acceptable'
                                        ? 'Medium'
                                        : 'High',
                                  )}
                                >
                                  {result.user_experience.user_journey_quality}
                                </Badge>
                              </div>
                            )}
                            {result.user_experience.onboarding_difficulty && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">
                                  Onboarding Difficulty
                                </h5>
                                <Badge variant="outline">
                                  {result.user_experience.onboarding_difficulty}
                                </Badge>
                              </div>
                            )}
                            {result.user_experience.accessibility_score && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">
                                  Accessibility Score
                                </h5>
                                <div
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    result.user_experience.accessibility_score >= 8
                                      ? 'text-green-700 bg-green-100'
                                      : result.user_experience.accessibility_score >= 6
                                        ? 'text-yellow-700 bg-yellow-100'
                                        : 'text-red-700 bg-red-100'
                                  }`}
                                >
                                  {result.user_experience.accessibility_score}
                                  /10
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="financial" className="mt-4">
                        {result.financials && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {result.financials.pricing_model && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">Pricing Model</h5>
                                  <Badge variant="outline">{result.financials.pricing_model}</Badge>
                                </div>
                              )}
                              {result.financials.ltv_cac_ratio && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">LTV:CAC Ratio</h5>
                                  <p className="text-sm text-gray-600">
                                    {result.financials.ltv_cac_ratio}
                                  </p>
                                </div>
                              )}
                              {result.financials.arpu_range && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">ARPU Range</h5>
                                  <p className="text-sm text-gray-600">
                                    {result.financials.arpu_range}
                                  </p>
                                </div>
                              )}
                              {result.financials.churn_rate && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">Expected Churn</h5>
                                  <p className="text-sm text-gray-600">
                                    {result.financials.churn_rate}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="technical" className="mt-4">
                        {result.technical && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {result.technical.complexity_rating && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">
                                    Technical Complexity
                                  </h5>
                                  <Badge
                                    className={getRiskColor(
                                      result.technical.complexity_rating === 'Low'
                                        ? 'Low'
                                        : result.technical.complexity_rating === 'Medium'
                                          ? 'Medium'
                                          : 'High',
                                    )}
                                  >
                                    {result.technical.complexity_rating}
                                  </Badge>
                                </div>
                              )}
                              {result.technical.mvp_time_months && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">MVP Timeline</h5>
                                  <p className="text-sm text-gray-600">
                                    {result.technical.mvp_time_months} months
                                  </p>
                                </div>
                              )}
                              {result.technical.development_cost && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">
                                    Development Cost
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {result.technical.development_cost}
                                  </p>
                                </div>
                              )}
                              {result.technical.team_size_needed && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">
                                    Team Size Needed
                                  </h5>
                                  <p className="text-sm text-gray-600">
                                    {result.technical.team_size_needed} developers
                                  </p>
                                </div>
                              )}
                            </div>
                            {result.technical.tech_stack &&
                              result.technical.tech_stack.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-gray-800 mb-2">
                                    Recommended Tech Stack
                                  </h5>
                                  <div className="flex flex-wrap gap-2">
                                    {result.technical.tech_stack.map((tech, idx) => (
                                      <Badge key={idx} variant="outline">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="risks" className="mt-4">
                        <div className="space-y-6">
                          {/* Risks */}
                          {result.risks && result.risks.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Risk Analysis
                              </h4>
                              <div className="space-y-3">
                                {result.risks.map((risk, idx) => (
                                  <div
                                    key={idx}
                                    className="border border-red-200 rounded-lg p-4 bg-red-50"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {risk.category}
                                      </Badge>
                                      <div className="flex gap-2">
                                        <Badge className={getRiskColor(risk.probability)} size="sm">
                                          {risk.probability} Prob
                                        </Badge>
                                        <Badge className={getRiskColor(risk.impact)} size="sm">
                                          {risk.impact} Impact
                                        </Badge>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-800 mb-2">{risk.risk}</p>
                                    <p className="text-xs text-gray-600">
                                      <strong>Mitigation:</strong> {risk.mitigation}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Opportunities */}
                          {result.opportunities && result.opportunities.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" />
                                Opportunities
                              </h4>
                              <div className="space-y-3">
                                {result.opportunities.map((opp, idx) => (
                                  <div
                                    key={idx}
                                    className="border border-green-200 rounded-lg p-4 bg-green-50"
                                  >
                                    <div className="flex justify-between items-start mb-2">
                                      <Badge variant="outline" className="text-xs">
                                        {opp.area}
                                      </Badge>
                                      <Badge
                                        className={getRiskColor(opp.effort_required)}
                                        size="sm"
                                      >
                                        {opp.effort_required} Effort
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-800 mb-2">{opp.opportunity}</p>
                                    <p className="text-xs text-gray-600">
                                      <strong>Impact:</strong> {opp.potential_impact}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Structured Recommendations */}
                          {result.structured_recommendations &&
                            result.structured_recommendations.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Action Plan
                                </h4>
                                <div className="space-y-3">
                                  {result.structured_recommendations.map((rec, idx) => (
                                    <div
                                      key={idx}
                                      className="border border-blue-200 rounded-lg p-4 bg-blue-50"
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <Badge
                                          className={
                                            rec.priority === 'High'
                                              ? 'bg-red-100 text-red-700'
                                              : rec.priority === 'Medium'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-green-100 text-green-700'
                                          }
                                          size="sm"
                                        >
                                          {rec.priority} Priority
                                        </Badge>
                                        <span className="text-xs text-gray-600">
                                          {rec.timeline}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-800 mb-2">{rec.action}</p>
                                      <p className="text-xs text-gray-600 mb-1">
                                        <strong>Why:</strong> {rec.rationale}
                                      </p>
                                      <p className="text-xs text-gray-600">
                                        <strong>Resources:</strong> {rec.resources_needed}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};

export default ComprehensiveAnalysisTable;
