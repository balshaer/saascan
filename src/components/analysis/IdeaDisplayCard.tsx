import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  const getScoreClass = (score: number) => {
    if (score >= 80) return 'bg-green-500 text-white';
    if (score >= 60) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

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
      <Card className="w-full border-none border-l-4 border-sky-500" dir="ltr">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Target className="w-6 h-6 text-sky-500" />
              Original Idea
            </CardTitle>
            <Badge className={`font-bold px-3 py-1 ${getScoreClass(overallScore)}`}>
              {overallScore}/100 - {getScoreLabel(overallScore)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="rounded-lg p-4 border-l-2 bg-slate-100 border-sky-500">
            <p className="leading-relaxed text-base font-medium whitespace-normal break-words">
              {isExpanded ? originalIdea : truncateText(originalIdea)}
            </p>

            {originalIdea.length > 180 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 p-0 h-auto text-sky-500 hover:text-sky-600"
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

          <div className="flex items-center justify-between text-sm pt-2 border-t text-slate-500 border-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Analysis Date:</span>
              <span>{formatDate(timestamp)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IdeaDisplayCard;
