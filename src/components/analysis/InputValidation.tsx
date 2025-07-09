import { Badge } from "@/components/ui/badge";

interface InputValidationProps {
  input: string;
  isAnalyzing: boolean;
}

const InputValidation = ({ input, isAnalyzing }: InputValidationProps) => {
  return (
    <div className="flex items-center justify-between">
      <Badge variant="outline" className="text-xs">
        {input.length} characters
      </Badge>
    </div>
  );
};

export default InputValidation;
