import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AnalysisResult } from '@/lib/uxAnalyzer';
import { AlertTriangle, Calendar, CheckCircle, Target, TrendingUp } from 'lucide-react';

interface AnalysisTableProps {
  results: AnalysisResult[];
  language: 'en' | 'ar';
}

const AnalysisTable = ({ results, language }: AnalysisTableProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[hsl(var(--score-good))] bg-[hsl(var(--score-good-bg))]';
    if (score >= 60) return 'text-[hsl(var(--score-warning))] bg-[hsl(var(--score-warning-bg))]';
    return 'text-[hsl(var(--score-error))] bg-[hsl(var(--score-error-bg))]';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4" />;
    if (score >= 60) return <TrendingUp className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <Card
          key={result.id}
          className="overflow-hidden shadow-lg border-0 bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm"
        >
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Input Text */}
              <div className="lg:col-span-2">
                <h3 className="font-semibold text-[hsl(var(--navbar-text))] mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  SaaS Concept
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] bg-[hsl(var(--accent))] p-3 rounded-lg leading-relaxed">
                  {result.input.length > 200
                    ? `${result.input.substring(0, 200)}...`
                    : result.input}
                </p>
              </div>

              {/* Analysis Score */}
              <div>
                <h3 className="font-semibold text-[hsl(var(--navbar-text))] mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Viability Score
                </h3>
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg font-bold text-2xl ${getScoreColor(
                    result.score,
                  )}`}
                >
                  {getScoreIcon(result.score)}
                  {result.score}/100
                </div>
              </div>

              {/* Metadata */}
              <div>
                <h3 className="font-semibold text-[hsl(var(--navbar-text))] mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Analysis Date
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
                  {formatDate(result.timestamp)}
                </p>
                <Badge variant="secondary" className="text-xs">
                  Analysis #{(results.length - index).toString()}
                </Badge>
              </div>
            </div>

            {/* Issues and Recommendations */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[hsl(var(--issues-text))] mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Key Challenges
                </h4>
                <ul className="space-y-2 text-sm">
                  {result.issues.map((issue, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 p-2 bg-[hsl(var(--issues-bg))] rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 bg-[hsl(var(--score-error))] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[hsl(var(--issues-text))]">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[hsl(var(--recommendations-text))] mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Recommendations
                </h4>
                <ul className="space-y-2 text-sm">
                  {result.recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 p-2 bg-[hsl(var(--recommendations-bg))] rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 bg-[hsl(var(--score-good))] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[hsl(var(--recommendations-text))]">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AnalysisTable;
