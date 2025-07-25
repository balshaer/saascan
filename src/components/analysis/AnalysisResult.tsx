import { createPdfExportService } from '@/lib/pdfExportService';
import { HorizontalAnalysisResult } from '@/lib/uxAnalyzer';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import HorizontalAnalysisTable from './HorizontalAnalysisTable';

interface AnalysisResultProps {
  result: HorizontalAnalysisResult;
  onClear?: () => void;
  className?: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, onClear, className = '' }) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExportToPdf = async () => {
    setIsExporting(true);
    try {
      const pdfService = createPdfExportService();
      await pdfService.exportSingleResult(result);

      toast({
        title: 'Export Successful',
        description: 'Analysis results have been exported to PDF successfully',
      });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast({
        title: 'Export Failed',
        description: 'Failed to export PDF. Please try again.',
        variant: 'destructive',
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
        ease: 'easeOut',
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
        ease: 'easeOut',
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
        <motion.div className="flex justify-between items-center" variants={itemVariants}>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold ">Idea Analysis Results</h2>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleExportToPdf}
              variant="secondary"
              size="sm"
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              {isExporting ? 'Generating PDF...' : '📄 Export to PDF'}
            </Button>
          </div>
        </motion.div>

        {/* Horizontal Analysis Table */}
        <motion.div variants={itemVariants}>
          <HorizontalAnalysisTable result={result} />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          className="bg-[var(--card)] border border-[var(--border)]  rounded-[12px] p-4"
          variants={itemVariants}
        >
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            💡 Tips to Improve Your Idea
          </h3>
          <ul className="text-sm  space-y-1">
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
