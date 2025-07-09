import React, { useState } from "react";
import { EnhancedTextarea } from "@/components/ui/textarea";
import InputValidation from "@/components/analysis/InputValidation";
import { cssVars } from "../../utils/cssVariables";

interface IdeaInputFormProps {
  input: string;
  setInput: (value: string) => void;
  isAnalyzing: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const IdeaInputForm: React.FC<IdeaInputFormProps> = ({
  input,
  setInput,
  isAnalyzing,
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
    <div className="space-y-3">
      <div className="overflow-hidden">
        <EnhancedTextarea
          placeholder="Describe your SaaS idea in detail... What problem does it solve? Who is your target audience? What makes it unique?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoResize={true}
          className="h-full min-h-[250px] rounded-[12px] text-base border-[var(--border)]  border transition-all duration-300"
          disabled={isAnalyzing}
        />
      </div>

      <InputValidation input={input} isAnalyzing={isAnalyzing} />
    </div>
  );
};

export default IdeaInputForm;
