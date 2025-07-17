import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AnalysisHistoryItem } from '@/lib/analysisStorage';
import { cssVars } from '@/utils/cssVariables';
import { motion } from 'framer-motion';
import { Brain, Calendar, Eye, EyeOff, Rocket, Target, Trash2, Users } from 'lucide-react';
import React, { useState } from 'react';

interface HistoryCardProps {
  item: AnalysisHistoryItem;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({
  item,
  isSelected,
  onToggleSelection,
  onDelete,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getScoreColorStyle = (score: number) => {
    if (score >= 80) return { backgroundColor: cssVars.tertiary, color: cssVars.buttonText };
    if (score >= 60) return { backgroundColor: '#f59e0b', color: cssVars.buttonText };
    return { backgroundColor: '#ef4444', color: cssVars.buttonText };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return `bg-[${cssVars.tertiary}] text-[${cssVars.buttonText}]`;
    if (score >= 60) return 'bg-[#f59e0b] text-white';
    return 'bg-[#ef4444] text-white';
  };

  const getInnovationColorStyle = (level: string) => {
    const levelMap: { [key: string]: string } = {
      عالي: 'High',
      متوسط: 'Medium',
      منخفض: 'Low',
      High: 'High',
      Medium: 'Medium',
      Low: 'Low',
    };
    const englishLevel = levelMap[level] || level;

    switch (englishLevel) {
      case 'High':
        return { backgroundColor: cssVars.tertiary, color: cssVars.buttonText };
      case 'Medium':
        return { backgroundColor: '#f59e0b', color: cssVars.buttonText };
      case 'Low':
      default:
        return {
          backgroundColor: cssVars.secondary,
          color: cssVars.buttonText,
        };
    }
  };

  const getInnovationColor = (level: string) => {
    const levelMap: { [key: string]: string } = {
      عالي: 'High',
      متوسط: 'Medium',
      منخفض: 'Low',
      High: 'High',
      Medium: 'Medium',
      Low: 'Low',
    };
    const englishLevel = levelMap[level] || level;

    switch (englishLevel) {
      case 'High':
        return `bg-[${cssVars.tertiary}] text-[${cssVars.buttonText}]`;
      case 'Medium':
        return 'bg-[#f59e0b] text-white';
      case 'Low':
      default:
        return `bg-[${cssVars.secondary}] text-[${cssVars.buttonText}]`;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`w-full transition-all duration-200 ${
          isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
        }`}
        dir="rtl"
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggleSelection(item.id)}
                className="mt-1"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-700">الفكرة الأصلية</span>
                </div>

                <p className="text-gray-800 leading-relaxed text-sm">
                  {isExpanded ? item.originalIdea : truncateText(item.originalIdea, 120)}
                </p>

                {item.originalIdea.length > 120 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-800"
                  >
                    {isExpanded ? (
                      <>
                        <EyeOff className="w-3 h-3 ml-1" />
                        إخفاء
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 ml-1" />
                        اقرأ المزيد
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={`${getScoreColor(item.overallScore)} font-bold`}>
                {item.overallScore}/100
              </Badge>

              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(item.id)}
                className="p-2"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Quick Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">الجمهور المستهدف:</span>
              </div>
              <p className="text-sm text-gray-700 pr-6">
                {truncateText(item.analysisResults.targetAudience, 80)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-medium text-gray-600">مستوى الابتكار:</span>
              </div>
              <div className="pr-6">
                <Badge
                  className={`${getInnovationColor(item.analysisResults.innovationLevel)} text-xs`}
                >
                  {item.analysisResults.innovationLevel}
                </Badge>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(item.timestamp)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Rocket className="w-3 h-3" />
              <span>
                {item.overallScore >= 80
                  ? 'ممتاز'
                  : item.overallScore >= 60
                    ? 'جيد'
                    : 'يحتاج تحسين'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HistoryCard;
