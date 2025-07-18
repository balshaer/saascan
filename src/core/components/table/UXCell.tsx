import { Badge } from '@/core/components/ui/badge';
import React from 'react';
import { useTheme } from '../../themes';
import { cssVars } from '../../utils/cssVariables';
import { getThemeRiskColor } from '../../utils/themeUtils';

interface UXData {
  complexity_level?: string;
  user_journey_quality?: string;
  onboarding_difficulty?: string;
  accessibility_score?: number;
  mobile_readiness?: string;
}

interface UXCellProps {
  user_experience?: UXData;
}

const UXCell: React.FC<UXCellProps> = ({ user_experience }) => {
  const { theme } = useTheme();
  const getRiskColorStyle = (level: string) => getThemeRiskColor(level, theme);

  if (!user_experience) {
    return (
      <td className="px-6 py-4">
        <div className="text-xs" style={{ color: cssVars.textMuted }}>
          No UX data
        </div>
      </td>
    );
  }

  return (
    <td className="px-6 py-4">
      <div className="space-y-2 max-w-xs">
        {user_experience.complexity_level && (
          <div>
            <span className="text-xs font-medium" >
              UX Complexity:
            </span>
            <Badge variant="outline">{user_experience.complexity_level}</Badge>
          </div>
        )}
        {user_experience.user_journey_quality && (
          <div>
            <span className="text-xs font-medium" >
              Journey Quality:
            </span>
            <Badge
              style={getRiskColorStyle(
                user_experience.user_journey_quality === 'Smooth'
                  ? 'Low'
                  : user_experience.user_journey_quality === 'Acceptable'
                    ? 'Medium'
                    : 'High',
              )}
            >
              {user_experience.user_journey_quality}
            </Badge>
          </div>
        )}
        {user_experience.onboarding_difficulty && (
          <div>
            <span className="text-xs font-medium" >
              Onboarding:
            </span>
            <Badge variant="outline">{user_experience.onboarding_difficulty}</Badge>
          </div>
        )}
        {user_experience.accessibility_score && (
          <div>
            <span className="text-xs font-medium" >
              Accessibility:
            </span>
            <div
              className="px-2 py-1 rounded text-xs font-semibold"
              style={{
                backgroundColor:
                  user_experience.accessibility_score >= 8
                    ? cssVars.scoreExcellentBg
                    : user_experience.accessibility_score >= 6
                      ? cssVars.scoreGoodBg
                      : cssVars.scorePoorBg,
                color:
                  user_experience.accessibility_score >= 8
                    ? cssVars.scoreExcellentText
                    : user_experience.accessibility_score >= 6
                      ? cssVars.scoreGoodText
                      : cssVars.scorePoorText,
              }}
            >
              {user_experience.accessibility_score}/10
            </div>
          </div>
        )}
        {user_experience.mobile_readiness && (
          <div>
            <span className="text-xs font-medium" >
              Mobile:
            </span>
            <Badge variant="outline">{user_experience.mobile_readiness}</Badge>
          </div>
        )}
      </div>
    </td>
  );
};

export default UXCell;
