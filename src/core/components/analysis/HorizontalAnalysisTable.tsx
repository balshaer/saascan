import { Badge } from '@/core/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { HorizontalAnalysisResult } from '@/lib/uxAnalyzer';
import { useTheme } from '@/themes';
import { motion, Variants } from 'framer-motion';
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
import React, { memo, useMemo } from 'react';
import IdeaDisplayCard from './IdeaDisplayCard';

interface HorizontalAnalysisTableProps {
  result: HorizontalAnalysisResult;
  className?: string;
}

interface TableRow<T = unknown> {
  key: keyof HorizontalAnalysisResult;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  renderValue?: (value: T) => React.ReactNode;
}

const innovationLevelStyles: Record<'Low' | 'Medium' | 'High', React.CSSProperties> = {
  Low: { backgroundColor: '#F87171', color: '#fff' },
  Medium: { backgroundColor: '#FBBF24', color: '#000' },
  High: { backgroundColor: '#34D399', color: '#000' },
};

const getInnovationLevelStyle = (level: 'Low' | 'Medium' | 'High'): React.CSSProperties =>
  innovationLevelStyles[level] ?? {};

const getScoreColorStyle = (score: number): React.CSSProperties => {
  if (score >= 80) return { backgroundColor: '#34D399', color: '#000' };
  if (score >= 60) return { backgroundColor: '#FBBF24', color: '#000' };
  return { backgroundColor: '#F87171', color: '#fff' };
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const HorizontalAnalysisTable: React.FC<HorizontalAnalysisTableProps> = memo(
  ({ result, className = '' }) => {
    const { themeMode } = useTheme();

    const tableRows: TableRow[] = useMemo(
      () => [
        { key: 'targetAudience', icon: Users, label: 'Target Audience' },
        { key: 'problemsSolved', icon: Wrench, label: 'Problems Solved' },
        { key: 'proposedSolution', icon: Lightbulb, label: 'Proposed Solution' },
        {
          key: 'competitors',
          icon: Search,
          label: 'Competitors',
          renderValue: (competitors: string[]) => (
            <div className="flex flex-wrap gap-1">
              {competitors.map((competitor) => (
                <Badge key={competitor} variant="outline" className="text-xs">
                  {competitor}
                </Badge>
              ))}
            </div>
          ),
        },
        { key: 'scalability', icon: TrendingUp, label: 'Scalability' },
        { key: 'revenueModel', icon: DollarSign, label: 'Revenue Model' },
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
              <span className="text-sm">
                {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
          ),
        },
      ],
      []
    );

    return (
      <motion.div
        className={`${className} bg-[var(--card)]`}
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
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Detailed Analysis Results
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {tableRows.map(({ key, icon: Icon, label, renderValue }) => {
                    const value = result[key];
                    return (
                      <motion.tr
                        key={key as string}
                        variants={rowVariants}
                        className="border-b transition-colors duration-200"
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <td className="py-4 px-4 border-r w-1/3 min-w-[200px]">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="font-semibold text-sm">{label}</span>
                          </div>
                        </td>

                        <td className="py-4 px-4 w-2/3">
                          <div className="leading-relaxed text-sm">
                            {renderValue ? renderValue(value) : (value as React.ReactNode)}
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
  }
);

export default HorizontalAnalysisTable;
