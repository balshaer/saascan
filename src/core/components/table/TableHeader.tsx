import React from 'react';
import { useTheme } from '../../themes';

interface TableHeaderProps {
  language: 'en' | 'ar';
}

const TableHeader: React.FC<TableHeaderProps> = ({ language }) => {
  const { theme } = useTheme();

  const headers = {
    en: [
      'Analysis',
      'Score & Validity',
      'Market Analysis',
      'Technical Feasibility',
      'User Experience',
      'Financial Projections',
      'Risk Assessment',
      'Recommendations',
    ],
    ar: [
      'التحليل',
      'النتيجة والصحة',
      'تحليل السوق',
      'الجدوى التقنية',
      'تجربة المستخدم',
      'التوقعات المالية',
      'تقييم المخاطر',
      'التوصيات',
    ],
  };

  return (
    <thead className="theme-table-header" style={{ backgroundColor: cssVars.tableHeaderBg }}>
      <tr>
        {headers[language].map((header, index) => (
          <th
            key={index}
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
            style={{ color: cssVars.tableHeaderText }}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
