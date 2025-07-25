import { Badge } from '@/components/ui/badge';
import React from 'react';
import { useTheme } from '../../themes';
import { cssVars } from '../../utils/cssVariables';
import { getThemeComplexityColor } from '../../utils/themeUtils';

interface TechnicalData {
  complexity_rating?: string;
  mvp_time_months?: number;
  development_cost?: string;
  team_size_needed?: number;
  tech_stack?: string[];
}

interface TechnicalCellProps {
  technical?: TechnicalData;
}

const TechnicalCell: React.FC<TechnicalCellProps> = ({ technical }) => {
  const { theme } = useTheme();

  if (!technical) {
    return (
      <td className="px-6 py-4">
        <div className="text-xs" style={{ color: cssVars.textMuted }}>
          No technical data
        </div>
      </td>
    );
  }

  return (
    <td className="px-6 py-4">
      <div className="space-y-2 max-w-xs">
        {technical.complexity_rating && (
          <div>
            <span className="text-xs font-medium" >
              Complexity:
            </span>
            <Badge style={getThemeComplexityColor(technical.complexity_rating, theme)}>
              {technical.complexity_rating}
            </Badge>
          </div>
        )}
        {technical.mvp_time_months && (
          <div>
            <span className="text-xs font-medium" >
              MVP Timeline:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {technical.mvp_time_months} months
            </p>
          </div>
        )}
        {technical.development_cost && (
          <div>
            <span
              className="text-xs font-medium"
              style={{
                color: theme.colors.text?.secondary || theme.colors.paragraph,
              }}
            >
              Dev Cost:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {technical.development_cost}
            </p>
          </div>
        )}
        {technical.team_size_needed && (
          <div>
            <span
              className="text-xs font-medium"
              style={{
                color: theme.colors.text?.secondary || theme.colors.paragraph,
              }}
            >
              Team Size:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {technical.team_size_needed} devs
            </p>
          </div>
        )}
        {technical.tech_stack && technical.tech_stack.length > 0 && (
          <div>
            <span className="text-xs font-medium" >
              Tech Stack:
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {technical.tech_stack.slice(0, 3).map((tech, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {technical.tech_stack.length > 3 && (
                <span className="text-xs" style={{ color: cssVars.textMuted }}>
                  +{technical.tech_stack.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </td>
  );
};

export default TechnicalCell;
