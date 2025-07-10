import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { TextShimmer } from "@/components/ui/text-shimmer";
import ClickSpark from "../ui/ClickSpark";

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
        <ClickSpark
          sparkColor="var(--button-text)"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
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
                  Analyzing idea...
                </motion.div>
              ) : (
                <motion.div
                  key="analyze"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Analyze SaaS Idea
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </ClickSpark>
      </motion.div>
    </div>
  );
};

export default AnalysisButton;
