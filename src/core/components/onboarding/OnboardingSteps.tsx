import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ents/ui/card';
import { Badge } from '@/core/components/ui/badge';
import { cssVars } from '@/core/utils/cssVariables';
import { useTheme } from '@/themes';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, Target, TrendingUp } from 'lucide-react';

const OnboardingSteps = () => {
  const { themeMode } = useTheme();

  const steps = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Describe Your Idea',
      description:
        'Share your SaaS concept, target market, and unique value proposition in detail.',
      color: cssVars.accent,
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Analysis',
      description:
        'Our AI analyzes market potential, technical feasibility, and competitive landscape.',
      color: cssVars.accent,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Get Insights',
      description: 'Receive detailed recommendations, risk assessment, and strategic guidance.',
      color: theme.colors.status.success.bg,
    },
  ];

  return (
    <Card
      className="backdrop-blur-sm border-0 shadow-lg"
      style={{ backgroundColor: `${cssVars.bgCard}B3` }}
    >
      <CardHeader>
        <CardTitle
          className="flex items-center gap-2 text-xl"
          
        >
          <CheckCircle className="w-5 h-5" style={{ color: theme.colors.status.success.text }} />
          How to Use Saascan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center space-y-4"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: step.color,
                  color: theme.colors.text.inverse,
                }}
              >
                {step.icon}
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  {step.title}
                </Badge>
                <p className="text-sm leading-relaxed" >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingSteps;
