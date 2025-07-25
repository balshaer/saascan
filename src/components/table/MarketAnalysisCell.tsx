import { Badge } from '@/components/ui/badge';
import React from 'react';
import { useTheme } from '../../themes';
import { cssVars } from '../../utils/cssVariables';
import { getThemeRiskColor } from '../../utils/themeUtils';

interface MarketData {
  pain_severity?: string;
  tam_estimate?: string;
  competitive_pressure?: string;
  buyer_personas?: string[];
}

interface MarketAnalysisCellProps {
  market?: MarketData;
}

const MarketAnalysisCell: React.FC<MarketAnalysisCellProps> = ({ market }) => {
  const { theme } = useTheme();
  const getRiskColorStyle = (level: string) => getThemeRiskColor(level, theme);

  if (!market) {
    return (
      <td className="px-6 py-4">
        <div className="text-xs" style={{ color: cssVars.textMuted }}>
          No market data
        </div>
      </td>
    );
  }

  return (
    <td className="px-6 py-4">
      <div className="space-y-2 max-w-xs">
        {market.pain_severity && (
          <div>
            <span className="text-xs font-medium" >
              Pain Level:
            </span>
            <Badge style={getRiskColorStyle(market.pain_severity)}>{market.pain_severity}</Badge>
          </div>
        )}
        {market.tam_estimate && (
          <div>
            <span className="text-xs font-medium" >
              Market Size:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {market.tam_estimate}
            </p>
          </div>
        )}
        {market.competitive_pressure && (
          <div>
            <span
              className="text-xs font-medium"
              style={{
                color: theme.colors.text?.secondary || theme.colors.paragraph,
              }}
            >
              Competition:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {market.competitive_pressure}
            </p>
          </div>
        )}
        {market.buyer_personas && market.buyer_personas.length > 0 && (
          <div>
            <span className="text-xs font-medium" >
              Target:
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {market.buyer_personas.slice(0, 2).map((persona, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {persona}
                </Badge>
              ))}
              {market.buyer_personas.length > 2 && (
                <span className="text-xs" style={{ color: cssVars.textMuted }}>
                  +{market.buyer_personas.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </td>
  );
};

export default MarketAnalysisCell;
