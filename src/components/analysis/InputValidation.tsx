import { Badge } from '@/components/ui/badge';
import { AnimatePresence, motion } from 'framer-motion';

interface InputValidationProps {
  input: string;
  isAnalyzing: boolean;
}

const MAX_CHARACTERS = 500;

const InputValidation = ({ input, isAnalyzing }: InputValidationProps) => {
  const length = input.length;

  let status = '';
  let highlightColor = '#7f5af0';

  if (length < 50) {
    status = 'Too short';
    highlightColor = '#f59e0b';
  } else if (length <= 300) {
    status = 'Good length';
    highlightColor = '#22c55e';
  } else if (length <= MAX_CHARACTERS) {
    status = 'Almost long';
    highlightColor = '#f97316';
  } else {
    status = 'Too long';
    highlightColor = '#ef4444';
  }

  return (
    <div className="flex items-center gap-2 justify-center ">
      <Badge variant="outline" className="text-xs">
        {length} / {MAX_CHARACTERS}
      </Badge>

      <AnimatePresence mode="wait">
        <motion.div className="text-xs font-semibold mt-1 text-[var(--headline)]">
          <span
            className={[
              'px-2 py-0.5 rounded transition-colors duration-300',
              status === 'Too short' && 'bg-yellow-200 text-yellow-800',
              status === 'Good length' && 'bg-green-200 text-green-800',
              status === 'Almost long' && 'bg-orange-200 text-orange-800',
              status === 'Too long' && 'bg-red-200 text-red-800',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {status}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InputValidation;
