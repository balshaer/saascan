import InputValidation from '@/core/components/analysis/InputValidation';
import { AnalysisButton } from '@/core/components/input';
import React, { useEffect, useRef, useState } from 'react';
import { WordRotate } from '../ui/WordRotate';
import { BorderTrail } from '../ui/border-trail';

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  useEffect(() => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    const newHeight = Math.min(Math.max(textarea.scrollHeight, 80), 300);
    textarea.style.height = `${newHeight}px`;
  }, [input]);

  return (
    <div
      className={`relative w-full bg-card rounded-lg transition-all duration-300 p-4`}
      style={{
        boxShadow: isFocused
          ? '0px 0px 60px 30px rgb(255 255 255 / 0.5), 0 0 100px 60px rgb(0 0 0 / 0.5), 0 0 140px 90px rgb(0 0 0 / 0.5)'
          : 'none',
      }}
    >
      {isFocused && (
        <BorderTrail
          size={100}
          style={{
            boxShadow:
              '0px 0px 60px 30px rgb(255 255 255 / 0.5), 0 0 100px 60px rgb(0 0 0 / 0.5), 0 0 140px 90px rgb(0 0 0 / 0.5)',
          }}
        />
      )}

      {input.length === 0 && !isFocused && (
        <div
          className="pointer-events-none absolute left-2 top-2 text-base opacity-80 transition-all duration-300"
        >
          <WordRotate
            words={[
              'Describe your SaaS idea in detail...',
              'What problem does it solve?',
              'Who is your target audience?',
              'What makes it unique?',
            ]}
            className="inline font-medium text-highlight"
          />
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isAnalyzing}
        className="w-full bg-transparent resize-none outline-none border-none text-card-headline text-base"
        rows={1}
        style={{ minHeight: '40px' }}
      />

      <div className="flex justify-between items-center mt-4">
        <InputValidation input={input} isAnalyzing={isAnalyzing} />
        <AnalysisButton onClick={handleAnalyze} isAnalyzing={isAnalyzing} input={input} />
      </div>
    </div>
  );
};

export default IdeaInputForm;
