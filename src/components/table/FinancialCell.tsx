import { useTheme } from '@/themes';
import { Badge } from '@/components/ui/badge';
import React from 'react';

interface FinancialData {
  pricing_model?: string;
  arpu_range?: string;
  ltv_cac_ratio?: string;
  churn_rate?: string;
  gross_margin?: string;
}

interface FinancialCellProps {
  financials?: FinancialData;
}

const FinancialCell: React.FC<FinancialCellProps> = ({ financials }) => {
  const { themeMode } = useTheme();

  if (!financials) {
    return (
      <td className="px-6 py-4">
        <div className="text-xs text-[var(--paragraph)]">No financial data</div>
      </td>
    );
  }

  return (
    <td className="px-6 py-4">
      <div className="space-y-2 max-w-xs">
        {financials.pricing_model && (
          <div>
            <span className="text-xs font-medium" >
              Pricing:
            </span>
            <Badge variant="outline">{financials.pricing_model}</Badge>
          </div>
        )}
        {financials.arpu_range && (
          <div>
            <span
              className="text-xs font-medium"
              style={{
                color: theme.colors.text?.secondary || theme.colors.paragraph,
              }}
            >
              ARPU:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {financials.arpu_range}
            </p>
          </div>
        )}
        {financials.ltv_cac_ratio && (
          <div>
            <span
              className="text-xs font-medium"
              style={{
                color: theme.colors.text?.secondary || theme.colors.paragraph,
              }}
            >
              LTV:CAC:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {financials.ltv_cac_ratio}
            </p>
          </div>
        )}
        {financials.churn_rate && (
          <div>
            <span
              className="text-xs font-medium"
              style={{
                color: theme.colors.text?.secondary || theme.colors.paragraph,
              }}
            >
              Churn:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {financials.churn_rate}
            </p>
          </div>
        )}
        {financials.gross_margin && (
          <div>
            <span
              className="text-xs font-medium"
              style={{
                color: theme.colors.text?.secondary || theme.colors.paragraph,
              }}
            >
              Margin:
            </span>
            <p
              className="text-xs"
              style={{
                color: theme.colors.text?.tertiary || theme.colors.muted,
              }}
            >
              {financials.gross_margin}
            </p>
          </div>
        )}
      </div>
    </td>
  );
};

export default FinancialCell;
