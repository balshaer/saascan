import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { cssVars } from "../../utils/cssVariables";

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
  const isDisabled =
    disabled || isAnalyzing || !input.trim() || input.length < 20;

  return (
    <div className="flex justify-center">
      <motion.div
        whileHover="hover"
        whileTap="tap"
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button onClick={onClick} disabled={isDisabled} size="lg">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <TextShimmer className="font-mono text-sm" duration={1}>
                  Analyzing idea...
                </TextShimmer>
              </motion.div>
            ) : (
              <Button>Analyze SaaS Idea</Button>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};

export default AnalysisButton;
