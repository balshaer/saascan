import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HorizontalAnalysisResult } from '@/lib/uxAnalyzer';
import { useTheme } from '@/themes';
import { cssVars } from '@/utils/cssVariables';
import { getThemeRiskColor, getThemeScoreColor } from '@/utils/themeUtils';
import { motion } from 'framer-motion';
import {
  Brain,
  DollarSign,
  Lightbulb,
  Rocket,
  Search,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import React from 'react';
import IdeaDisplayCard from './IdeaDisplayCard';

interface HorizontalAnalysisTableProps {
  result: HorizontalAnalysisResult;
  className?: string;
}

interface TableRow {
  key: keyof HorizontalAnalysisResult;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  renderValue?: (value: any) => React.ReactNode;
}

const HorizontalAnalysisTable: React.FC<HorizontalAnalysisTableProps> = ({
  result,
  className = '',
}) => {
  const { themeMode } = useTheme();

  const getInnovationLevelStyle = (level: string) => getThemeRiskColor(level, themeMode);
  const getScoreColorStyle = (score: number) => getThemeScoreColor(score, themeMode);

  const getTableRows = (): TableRow[] => [
    {
      key: 'targetAudience',
      icon: Users,
      label: 'Target Audience',
    },
    {
      key: 'problemsSolved',
      icon: Wrench,
      label: 'Problems Solved',
    },
    {
      key: 'proposedSolution',
      icon: Lightbulb,
      label: 'Proposed Solution',
    },
    {
      key: 'competitors',
      icon: Search,
      label: 'Competitors',
      renderValue: (competitors: string[]) => (
        <div className="flex flex-wrap gap-1">
          {competitors.map((competitor, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {competitor}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'scalability',
      icon: TrendingUp,
      label: 'Scalability',
    },
    {
      key: 'revenueModel',
      icon: DollarSign,
      label: 'Revenue Model',
    },
    {
      key: 'innovationLevel',
      icon: Brain,
      label: 'Innovation Level',
      renderValue: (level: 'Low' | 'Medium' | 'High') => (
        <Badge className="font-medium" style={getInnovationLevelStyle(level)}>
          {level}
        </Badge>
      ),
    },
    {
      key: 'overallScore',
      icon: Rocket,
      label: 'Overall Score',
      renderValue: (score: number) => (
        <div className="flex items-center gap-2">
          <Badge className="font-bold text-sm px-3 py-1" style={getScoreColorStyle(score)}>
            {score}/100
          </Badge>
          <span className="text-sm" style={{ color: cssVars.textSecondary }}>
            {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className={className + 'bg-[var(--card)]'}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full shadow-lg" dir="ltr">
        <IdeaDisplayCard
          originalIdea={result.originalIdea}
          timestamp={result.timestamp}
          overallScore={result.overallScore}
        />
        <CardHeader className="pb-4">
          <CardTitle
            className="text-xl font-bold flex items-center gap-2"
            style={{ color: cssVars.textPrimary }}
          >
            <Brain className="w-6 h-6" style={{ color: cssVars.accent }} />
            Detailed Analysis Results
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {getTableRows().map((row) => {
                  const IconComponent = row.icon as any;
                  const value = result[row.key];

                  return (
                    <motion.tr
                      key={row.key}
                      variants={rowVariants}
                      className="border-b transition-colors duration-200"
                      style={{ borderColor: cssVars.borderPrimary }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = cssVars.bgSecondary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <td
                        className="py-4 px-4 border-r w-1/3 min-w-[200px]"
                        style={{
                          backgroundColor: cssVars.bgSecondary,
                          borderColor: cssVars.borderPrimary,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent
                            className="w-5 h-5 flex-shrink-0"
                            style={{ color: cssVars.accent }}
                          />
                          <span
                            className="font-semibold text-sm"
                            style={{ color: cssVars.textPrimary }}
                          >
                            {row.label}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 w-2/3">
                        <div className="leading-relaxed" style={{ color: cssVars.textSecondary }}>
                          {row.renderValue ? (
                            row.renderValue(value)
                          ) : (
                            <span className="text-sm">{value as string}</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HorizontalAnalysisTable;
