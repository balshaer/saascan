import { Button } from '@/core/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import ClickSpark from '../ui/ClickSpark';
import { TextShimmer } from '../ui/text-shimmer';

interface AnalysisButtonProps {
  onClick: () => void;
  isAnalyzing: boolean;
  input: string;
  disabled?: boolean;
}

const AnalysisButton: React.FC<AnalysisButtonProps> = ({
  onClick,
  isAnalyzing,
  input,
  disabled = false,
}) => {
  const isDisabled = disabled || !input.trim() || input.length < 20;

  return (
    <div className="flex justify-center">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TextShimmer className="font-mono text-sm" duration={1}>
              Scanning...
            </TextShimmer>
          </motion.div>
        ) : (
          <motion.div
            key="button"
            whileHover="hover"
            whileTap="tap"
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <ClickSpark
              sparkColor="var(--button-text)"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <Button onClick={onClick} disabled={isDisabled} size="lg">
                <div className="flex items-center gap-2 text-[var(--button-text)]">
                  Analyze SaaS Idea
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Button>
            </ClickSpark>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalysisButton;
