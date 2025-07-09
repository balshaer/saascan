import React from "react";
import {
  IdeaInputForm,
  AnalysisButton,
  InputContainer,
} from "@/components/input";

interface InputAnalysisSectionProps {
  input: string;
  setInput: (value: string) => void;
  isAnalyzing: boolean;
  handleAnalyze: () => void;
}

const InputAnalysisSection: React.FC<InputAnalysisSectionProps> = ({
  input,
  setInput,
  isAnalyzing,
  handleAnalyze,
}) => {
  return (
    <InputContainer  title="">
      <IdeaInputForm
        input={input}
        setInput={setInput}
        isAnalyzing={isAnalyzing}
      />
      <AnalysisButton
        onClick={handleAnalyze}
        isAnalyzing={isAnalyzing}
        input={input}
      />
    </InputContainer>
  );
};

export default InputAnalysisSection;
