import React, { useState } from "react";
import { EnhancedTextarea } from "@/components/ui/textarea";
import InputValidation from "@/components/analysis/InputValidation";
import { AnalysisButton } from "@/components/input";
import { cssVars } from "../../utils/cssVariables";
import { WordRotate } from "../ui/WordRotate";

interface IdeaInputFormProps {
  input: string;
  setInput: (value: string) => void;
  isAnalyzing: boolean;
  handleAnalyze: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const IdeaInputForm: React.FC<IdeaInputFormProps> = ({
  input,
  setInput,
  isAnalyzing,
  handleAnalyze,
  onFocus,
  onBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <div className="relative space-y-3">
      {input.length === 0 && !isFocused && (
        <div
          className="pointer-events-none absolute left-4  top-4 text-base opacity-80 transition-all duration-300"
          style={{ color: cssVars.paragraph }}
        >
          <WordRotate
            words={[
              "Describe your SaaS idea in detail...",
              "What problem does it solve?",
              "Who is your target audience?",
              "What makes it unique?",
            ]}
            className="inline font-medium"
            style={{ color: cssVars.highlight }}
          />
        </div>
      )}

      <EnhancedTextarea
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setInput(e.target.value)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoResize={true}
        className="h-full min-h-[10px] border-none w-full text-[var(--card-headline)] rounded-[12px] text-base transition-all duration-300"
        disabled={isAnalyzing}
      >
        <div className="flex justify-between p-4 items-center">
          <InputValidation input={input} isAnalyzing={isAnalyzing} />

          <AnalysisButton
            onClick={handleAnalyze}
            isAnalyzing={isAnalyzing}
            input={input}
          />
        </div>
      </EnhancedTextarea>
    </div>
  );
};

export default IdeaInputForm;
