import { IdeaInputForm, InputContainer } from '@/components/input';
import React from 'react';

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
    <InputContainer title="">
      <IdeaInputForm
        input={input}
        setInput={setInput}
        isAnalyzing={isAnalyzing}
        handleAnalyze={handleAnalyze}
      />
    </InputContainer>
  );
};

export default InputAnalysisSection;
