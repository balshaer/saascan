import { AnalysisResult } from '@/lib/uxAnalyzer';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from '../../themes';
import { cssVars } from '../../utils/cssVariables';
import FinancialCell from './FinancialCell';
import MarketAnalysisCell from './MarketAnalysisCell';
import RecommendationsCell from './RecommendationsCell';
import RiskCell from './RiskCell';
import ScoreCell from './ScoreCell';
import TechnicalCell from './TechnicalCell';
import UXCell from './UXCell';

interface TableRowProps {
  result: AnalysisResult;
  index: number;
  totalResults: number;
}

const TableRow: React.FC<TableRowProps> = ({ result, index, totalResults }) => {
  const { theme } = useTheme();

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hover: {
      backgroundColor: cssVars.tableRowBgHover,
      transition: {
        duration: 0.2,
      },
    },
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

  return (
    <motion.tr
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay: index * 0.1 }}
      className="theme-table-row transition-colors duration-200"
      style={{
        backgroundColor: cssVars.tableRowBg,
        color: cssVars.tableRowText,
      }}
    >
      {/* Analysis Column */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              #{totalResults - index}
            </Badge>
            <span className="text-xs" style={{ color: cssVars.textMuted }}>
              {formatDate(result.timestamp)}
            </span>
          </div>
          <div className="text-sm max-w-xs" >
            <p className="truncate" title={result.input}>
              {result.input.length > 100 ? `${result.input.substring(0, 100)}...` : result.input}
            </p>
          </div>
          {result.summary && (
            <p
              className="text-xs italic max-w-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {result.summary.length > 80
                ? `${result.summary.substring(0, 80)}...`
                : result.summary}
            </p>
          )}
        </div>
      </td>

      {/* Score & Validity Column */}
      <ScoreCell score={result.score} validity={result.validity} />

      {/* Market Analysis Column */}
      <MarketAnalysisCell market={result.market} />

      {/* Technical Feasibility Column */}
      <TechnicalCell technical={result.technical} />

      {/* User Experience Column */}
      <UXCell user_experience={result.user_experience} />

      {/* Financial Projections Column */}
      <FinancialCell financials={result.financials} />

      {/* Risk Assessment Column */}
      <RiskCell risks={result.risks} opportunities={result.opportunities} />

      {/* Recommendations Column */}
      <RecommendationsCell
        recommendations={result.recommendations}
        structured_recommendations={result.structured_recommendations}
        validation_experiments={result.validation_experiments}
      />
    </motion.tr>
  );
};

export default TableRow;
