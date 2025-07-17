import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '../../themes';
import { getThemeRiskColor } from '../../utils/themeUtils';

interface Risk {
  category: string;
  risk: string;
  probability: string;
  impact: string;
  mitigation: string;
}

interface Opportunity {
  area: string;
  opportunity: string;
  effort_required: string;
}

interface RiskCellProps {
  risks?: Risk[];
  opportunities?: Opportunity[];
}

const RiskCell: React.FC<RiskCellProps> = ({ risks, opportunities }) => {
  const { theme } = useTheme();
  const getRiskColorStyle = (level: string) => getThemeRiskColor(level, theme);

  return (
    <td className="px-6 py-4">
      <div className="space-y-2 max-w-xs">
        {risks && risks.length > 0 && (
          <div>
            <span className="text-xs font-medium" style={{ color: cssVars.textSecondary }}>
              Top Risks:
            </span>
            <div className="space-y-1 mt-1">
              {risks.slice(0, 3).map((risk, idx) => (
                <div
                  key={idx}
                  className="border rounded p-2"
                  style={{ borderColor: cssVars.borderPrimary }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Badge variant="outline" className="text-xs">
                      {risk.category}
                    </Badge>
                    <div className="flex gap-1">
                      <Badge style={getRiskColorStyle(risk.probability)}>{risk.probability}</Badge>
                      <Badge style={getRiskColorStyle(risk.impact)}>{risk.impact}</Badge>
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: cssVars.textPrimary }}>
                    {risk.risk}
                  </p>
                  <p className="text-xs mt-1" style={{ color: cssVars.textMuted }}>
                    <strong>Mitigation:</strong> {risk.mitigation}
                  </p>
                </div>
              ))}
              {risks.length > 3 && (
                <p className="text-xs" style={{ color: cssVars.textMuted }}>
                  +{risks.length - 3} more risks
                </p>
              )}
            </div>
          </div>
        )}
        {opportunities && opportunities.length > 0 && (
          <div>
            <span className="text-xs font-medium" style={{ color: cssVars.textSecondary }}>
              Opportunities:
            </span>
            <div className="space-y-1 mt-1">
              {opportunities.slice(0, 2).map((opp, idx) => (
                <div
                  key={idx}
                  className="border rounded p-2"
                  style={{
                    borderColor: cssVars.successBorder,
                    backgroundColor: cssVars.successBg,
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <Badge variant="outline" className="text-xs">
                      {opp.area}
                    </Badge>
                    <Badge style={getRiskColorStyle(opp.effort_required)}>
                      {opp.effort_required}
                    </Badge>
                  </div>
                  <p className="text-xs" style={{ color: cssVars.textPrimary }}>
                    {opp.opportunity}
                  </p>
                </div>
              ))}
              {opportunities.length > 2 && (
                <p className="text-xs" style={{ color: cssVars.textMuted }}>
                  +{opportunities.length - 2} more opportunities
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </td>
  );
};

export default RiskCell;
