import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Badge } from '@/core/components/ents/ui/badge';
import { Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '@/lib/uxAnalyzer';
import { useI18n } from '@/hooks/useI18n';

interface HistoryPreviewProps {
  results: AnalysisResult[];
  language: 'en' | 'ar';
}

const HistoryPreview = ({ results, language }: HistoryPreviewProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
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

  if (results.length === 0) {
    return null;
  }

  return (
    <Card className="bg-[hsl(var(--card-bg))]/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="w-5 h-5" />
          Recent Analysis History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {results.slice(0, 5).map((result, index) => (
            <div
              key={result.id}
              className="flex items-center justify-between p-4 bg-[hsl(var(--accent))] rounded-lg"
            >
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium text-[hsl(var(--navbar-text))] truncate">
                  {result.input.length > 60 ? `${result.input.substring(0, 60)}...` : result.input}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  {formatDate(result.timestamp)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${getScoreColor(result.score)} flex items-center gap-1`}>
                  {getScoreIcon(result.score)}
                  {result.score}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryPreview;
