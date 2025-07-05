import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Trash2, 
  Eye, 
  EyeOff, 
  Target,
  Users,
  Rocket,
  Brain,
  CheckSquare,
  Square
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AnalysisHistoryItem } from "@/lib/analysisStorage";

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
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
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

  const getInnovationColor = (level: string) => {
    switch (level) {
      case "عالي":
        return "bg-green-100 text-green-800 border-green-200";
      case "متوسط":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "منخفض":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
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
          isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
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
                  {isExpanded 
                    ? item.originalIdea 
                    : truncateText(item.originalIdea, 120)
                  }
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
                <Badge className={`${getInnovationColor(item.analysisResults.innovationLevel)} text-xs`}>
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
                {item.overallScore >= 80 ? "ممتاز" : 
                 item.overallScore >= 60 ? "جيد" : "يحتاج تحسين"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HistoryCard;
