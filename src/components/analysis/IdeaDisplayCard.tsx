import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, Calendar, Clock, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 border-green-200";
    if (score >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  // Truncate text to exactly 180 characters
  const truncateText = (text: string) => {
    if (text.length <= 180) return text;
    return text.substring(0, 180) + "...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="w-full shadow-lg border-l-4 border-l-blue-500" dir="ltr">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Original Idea
            </CardTitle>
            <Badge className={`${getScoreColor(overallScore)} font-bold px-3 py-1`}>
              {overallScore}/100 - {getScoreLabel(overallScore)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Original Idea Text with Expandable Preview */}
          <div className="bg-gray-50 rounded-lg p-4 border-l-2 border-l-blue-200">
            <p className="text-gray-800 leading-relaxed text-base font-medium">
              {isExpanded ? originalIdea : truncateText(originalIdea)}
            </p>

            {/* Toggle Button - Only show when text exceeds 180 characters */}
            {originalIdea.length > 180 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 p-0 h-auto text-blue-600 hover:text-blue-800"
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
          <div className="flex items-center justify-between text-sm text-gray-600 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Analysis Date:</span>
              <span className="font-medium">{formatDate(timestamp)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Analysis Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IdeaDisplayCard;
