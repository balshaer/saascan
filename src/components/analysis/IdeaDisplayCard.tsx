import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cssVars } from '@/utils/cssVariables';
import { motion } from 'framer-motion';
import { Calendar, Eye, EyeOff, Target } from 'lucide-react';
import React, { useState } from 'react';

interface IdeaDisplayCardProps {
  originalIdea: string;
  timestamp: string;
  overallScore: number;
  className?: string;
}

const IdeaDisplayCard: React.FC<IdeaDisplayCardProps> = ({
  originalIdea,
  timestamp,
  overallScore,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  // Truncate text to exactly 180 characters
  const truncateText = (text: string) => {
    if (text.length <= 180) return text;
    return text.substring(0, 180) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="w-full border-none" dir="ltr" style={{ borderLeftColor: cssVars.highlight }}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle
              className="text-xl font-bold flex items-center gap-2"
              style={{ color: cssVars.headline }}
            >
              <Target className="w-6 h-6" style={{ color: cssVars.highlight }} />
              Original Idea
            </CardTitle>
            <Badge className="font-bold px-3 py-1" style={getScoreColorStyle(overallScore)}>
              {overallScore}/100 - {getScoreLabel(overallScore)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 ">
          {/* Original Idea Text with Expandable Preview */}
          <div
            className="rounded-lg p-4 border-l-2"
            style={{
              backgroundColor: cssVars.hover,
              borderLeftColor: cssVars.highlight,
            }}
          >
            <p
              className="leading-relaxed text-base font-medium whitespace-normal break-words"
              style={{ color: cssVars.headline }}
            >
              {isExpanded ? originalIdea : truncateText(originalIdea)}
            </p>

            {originalIdea.length > 180 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 p-0 h-auto"
                style={{ color: cssVars.highlight }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = cssVars.highlight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = cssVars.highlight;
                }}
              >
                {isExpanded ? (
                  <>
                    <EyeOff className="w-3 h-3 mr-1" />
                    Read less
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3 mr-1" />
                    Read more
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Metadata */}
          <div
            className="flex items-center text-[var(--paragraph)]  justify-between text-sm pt-2 border-t"
            style={{
              color: cssVars.textSecondary,
              borderColor: cssVars.borderPrimary,
            }}
          >
            <div className="flex  items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: cssVars.textSecondary }} />
              <span className="text-[var(--paragraph)] font-medium">Analysis Date:</span>
              <span>{formatDate(timestamp)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IdeaDisplayCard;
