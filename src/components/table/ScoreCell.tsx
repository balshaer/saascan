import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '../../themes';
import { getThemeScoreColor, getThemeValidityColor } from '../../utils/themeUtils';

interface ScoreCellProps {
  score: number;
  validity?: string;
}

const ScoreCell: React.FC<ScoreCellProps> = ({ score, validity }) => {
  const { theme } = useTheme();

  const getScoreColorStyle = (score: number) => getThemeScoreColor(score, theme);
  const getValidityColorStyle = (validity?: string) => getThemeValidityColor(validity || '', theme);

  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="space-y-2">
        <div
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={getScoreColorStyle(score)}
        >
          {score}/100
        </div>
        <Badge style={getValidityColorStyle(validity)}>{validity || 'N/A'}</Badge>
      </div>
    </td>
  );
};

export default ScoreCell;
