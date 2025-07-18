import { Badge } from '@/core/components/ui/badge';
import React from 'react';
import { useTheme } from '../../themes';
import { cssVars } from '../../utils/cssVariables';
import { getThemePriorityColor } from '../../utils/themeUtils';

interface StructuredRecommendation {
  priority: string;
  action: string;
  rationale: string;
  timeline: string;
  resources: string;
}

interface ValidationExperiment {
  experiment: string;
  cost: string;
  timeline: string;
  success_criteria: string;
  learning_objective: string;
}

interface RecommendationsCellProps {
  recommendations?: string[];
  structured_recommendations?: StructuredRecommendation[];
  validation_experiments?: ValidationExperiment[];
}

const RecommendationsCell: React.FC<RecommendationsCellProps> = ({
  recommendations,
  structured_recommendations,
  validation_experiments,
}) => {
  const { theme } = useTheme();

  return (
    <td className="px-6 py-4">
      <div className="space-y-2 max-w-xs">
        {/* Legacy recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div>
            <span className="text-xs font-medium" >
              Key Actions:
            </span>
            <ul className="space-y-1 mt-1">
              {recommendations.slice(0, 3).map((rec, idx) => (
                <li
                  key={idx}
                  className="text-xs flex items-start gap-1"
                  style={{
                    color: theme.colors.text?.tertiary || theme.colors.muted,
                  }}
                >
                  <div
                    className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                    style={{ backgroundColor: cssVars.accent }}
                  />
                  <span>
                    {typeof rec === 'string'
                      ? rec
                      : (rec as any)?.action || (rec as any)?.recommendation || 'No recommendation'}
                  </span>
                </li>
              ))}
              {recommendations.length > 3 && (
                <li className="text-xs" style={{ color: cssVars.textMuted }}>
                  +{recommendations.length - 3} more
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Structured recommendations */}
        {structured_recommendations && structured_recommendations.length > 0 && (
          <div>
            <span className="text-xs font-medium" >
              Action Plan:
            </span>
            <div className="space-y-1 mt-1">
              {structured_recommendations.slice(0, 3).map((rec, idx) => (
                <div
                  key={idx}
                  className="border rounded p-2"
                  style={{
                    borderColor: cssVars.infoBorder,
                    backgroundColor: cssVars.infoBg,
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Badge style={getThemePriorityColor(rec.priority, theme)}>{rec.priority}</Badge>
                    <span className="text-xs" style={{ color: cssVars.textMuted }}>
                      {rec.timeline}
                    </span>
                  </div>
                  <p className="text-xs" >
                    {rec.action}
                  </p>
                  <p className="text-xs mt-1" style={{ color: cssVars.textMuted }}>
                    {rec.rationale}
                  </p>
                </div>
              ))}
              {structured_recommendations.length > 3 && (
                <p className="text-xs" style={{ color: cssVars.textMuted }}>
                  +{structured_recommendations.length - 3} more actions
                </p>
              )}
            </div>
          </div>
        )}

        {/* Validation experiments */}
        {validation_experiments && validation_experiments.length > 0 && (
          <div>
            <span className="text-xs font-medium" >
              Validation Tests:
            </span>
            <div className="space-y-1 mt-1">
              {validation_experiments.slice(0, 2).map((exp, idx) => (
                <div
                  key={idx}
                  className="border rounded p-2"
                  style={{
                    borderColor: cssVars.accent,
                    backgroundColor: cssVars.accent,
                  }}
                >
                  <p className="text-xs font-medium" >
                    {exp.experiment}
                  </p>
                  <div
                    className="flex justify-between text-xs mt-1"
                    style={{ color: cssVars.textMuted }}
                  >
                    <span>{exp.cost}</span>
                    <span>{exp.timeline}</span>
                  </div>
                </div>
              ))}
              {validation_experiments.length > 2 && (
                <p className="text-xs" style={{ color: cssVars.textMuted }}>
                  +{validation_experiments.length - 2} more tests
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </td>
  );
};

export default RecommendationsCell;
