import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Wrench, 
  Lightbulb, 
  Search, 
  TrendingUp, 
  DollarSign, 
  Brain, 
  Rocket 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HorizontalAnalysisResult } from "@/lib/uxAnalyzer";

interface HorizontalAnalysisTableProps {
  result: HorizontalAnalysisResult;
  className?: string;
}

// Table row configuration
interface TableRow {
  key: keyof HorizontalAnalysisResult;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  renderValue?: (value: any) => React.ReactNode;
}

const TABLE_ROWS: TableRow[] = [
  {
    key: "targetAudience",
    icon: Users,
    label: "Target Audience",
  },
  {
    key: "problemsSolved",
    icon: Wrench,
    label: "Problems Solved",
  },
  {
    key: "proposedSolution",
    icon: Lightbulb,
    label: "Proposed Solution",
  },
  {
    key: "competitors",
    icon: Search,
    label: "Competitors",
    renderValue: (competitors: string[]) => (
      <div className="flex flex-wrap gap-1">
        {competitors.map((competitor, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {competitor}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    key: "scalability",
    icon: TrendingUp,
    label: "Scalability",
  },
  {
    key: "revenueModel",
    icon: DollarSign,
    label: "Revenue Model",
  },
  {
    key: "innovationLevel",
    icon: Brain,
    label: "Innovation Level",
    renderValue: (level: "Low" | "Medium" | "High") => {
      const getInnovationColor = (level: string) => {
        switch (level) {
          case "High":
            return "bg-green-100 text-green-800 border-green-200";
          case "Medium":
            return "bg-yellow-100 text-yellow-800 border-yellow-200";
          case "Low":
            return "bg-red-100 text-red-800 border-red-200";
          default:
            return "bg-gray-100 text-gray-800 border-gray-200";
        }
      };

      return (
        <Badge className={`${getInnovationColor(level)} font-medium`}>
          {level}
        </Badge>
      );
    },
  },
  {
    key: "overallScore",
    icon: Rocket,
    label: "Overall Score",
    renderValue: (score: number) => {
      const getRatingColor = (rating: number) => {
        if (rating >= 80) return "bg-green-100 text-green-800 border-green-200";
        if (rating >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
        return "bg-red-100 text-red-800 border-red-200";
      };

      return (
        <div className="flex items-center gap-2">
          <Badge className={`${getRatingColor(score)} font-bold text-lg px-3 py-1`}>
            {score}/100
          </Badge>
          <span className="text-sm text-gray-600">
            {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement"}
          </span>
        </div>
      );
    },
  },
];

const HorizontalAnalysisTable: React.FC<HorizontalAnalysisTableProps> = ({
  result,
  className = ""
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full shadow-lg" dir="ltr">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600" />
            Detailed Analysis Results
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {TABLE_ROWS.map((row, index) => {
                  const IconComponent = row.icon;
                  const value = result[row.key];
                  
                  return (
                    <motion.tr
                      key={row.key}
                      variants={rowVariants}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                    >
                      {/* Label Column */}
                      <td className="py-4 px-4 bg-gray-50 border-r border-gray-200 w-1/3 min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="font-semibold text-gray-800 text-sm">
                            {row.label}
                          </span>
                        </div>
                      </td>
                      
                      {/* Value Column */}
                      <td className="py-4 px-4 w-2/3">
                        <div className="text-gray-700 leading-relaxed">
                          {row.renderValue ? row.renderValue(value) : (
                            <span className="text-sm">{value as string}</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HorizontalAnalysisTable;
