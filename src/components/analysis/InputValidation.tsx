import { Badge } from "@/components/ui/badge";
import { RoughNotation } from "react-rough-notation";
import { motion, AnimatePresence } from "framer-motion";

interface InputValidationProps {
  input: string;
  isAnalyzing: boolean;
}

const MAX_CHARACTERS = 500;

const InputValidation = ({ input, isAnalyzing }: InputValidationProps) => {
  const length = input.length;
  const remaining = MAX_CHARACTERS - length;

  let status = "";
  let highlightColor = "#7f5af0"; // Example highlight color (purple)

  if (length < 50) {
    status = "Too short";
    highlightColor = "#f59e0b"; // amber/yellow for warning
  } else if (length <= 300) {
    status = "Good length";
    highlightColor = "#22c55e"; // green for good
  } else if (length <= MAX_CHARACTERS) {
    status = "Almost long";
    highlightColor = "#f97316"; // orange
  } else {
    status = "Too long";
    highlightColor = "#ef4444"; // red for error
  }

  return (
    <div className="flex items-center gap-2 justify-center ">
      <Badge variant="outline" className="text-xs">
        {length} / {MAX_CHARACTERS}
      </Badge>

      <AnimatePresence mode="wait">
        <motion.div className="text-xs font-semibold  mt-1  text-[var(--headline)]">
          <RoughNotation
            type="highlight"
            show={true}
            color={highlightColor}
            animationDuration={800}
            iterations={1}
            padding={[-20, 0]}
            strokeWidth={4}
          >
            {status}
          </RoughNotation>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default InputValidation;
