import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { HorizontalAnalysisResult } from "@/lib/uxAnalyzer";
import { createPdfExportService } from "@/lib/pdfExportService";
import IdeaDisplayCard from "./IdeaDisplayCard";
import HorizontalAnalysisTable from "./HorizontalAnalysisTable";

interface AnalysisResultProps {
  result: HorizontalAnalysisResult;
  onClear?: () => void;
  className?: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({
  result,
  onClear,
  className = ""
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportToPdf = async () => {
    setIsExporting(true);
    try {
      const pdfService = createPdfExportService();
      await pdfService.exportSingleResult(result);
      
      toast({
        title: "Export Successful",
        description: "Analysis results have been exported to PDF successfully",
      });
    } catch (error) {
      console.error("PDF export failed:", error);
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
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
    <AnimatePresence mode="wait">
      <motion.div
        className={`space-y-6 ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        dir="ltr"
      >
        {/* Action Buttons */}
        <motion.div
          className="flex justify-between items-center"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Idea Analysis Results
            </h2>
          </div>

          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleExportToPdf}
                variant="outline"
                size="sm"
                disabled={isExporting}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {isExporting ? "Generating PDF..." : "📄 Export to PDF"}
              </Button>
            </motion.div>

            {onClear && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={onClear}
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Results
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Idea Display Card */}
        <motion.div variants={itemVariants}>
          <IdeaDisplayCard
            originalIdea={result.originalIdea}
            timestamp={result.timestamp}
            overallScore={result.overallScore}
          />
        </motion.div>

        {/* Horizontal Analysis Table */}
        <motion.div variants={itemVariants}>
          <HorizontalAnalysisTable result={result} />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            💡 Tips to Improve Your Idea
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Conduct market research to validate the problem and solution</li>
            <li>• Develop a simple prototype to test core assumptions</li>
            <li>• Get feedback from potential customers early in the process</li>
            <li>• Study competitors and identify your unique differentiators</li>
            <li>• Create a clear financial plan and sustainable business model</li>
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnalysisResult;
