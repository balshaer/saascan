import { Card, CardContent } from '@/components/ui/card';
import { cssVars } from '@/utils/cssVariables';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface InputContainerProps {
  children: React.ReactNode;
  title?: string;
}

const InputContainer: React.FC<InputContainerProps> = ({
  children,
  title = 'Analyze Your SaaS Idea',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const headerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const sparklesVariants = {
    idle: { rotate: 0 },
    focused: { rotate: 360 },
  };

  return (
    <motion.div
      className="grid border-[var(--border)]  border-2 rounded-[12px] grid-cols-1 gap-8 w-full mx-auto"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Card
        className="border-0 overflow-hidden px-0 "
        style={{ backgroundColor: `${cssVars.surface}CC` }}
      >
        <CardContent className="space-y-6 relative z-10 p-0">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onFocus: () => setIsFocused(true),
                onBlur: () => setIsFocused(false),
              } as any);
            }
            return child;
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InputContainer;
