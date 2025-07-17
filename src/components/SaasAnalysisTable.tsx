import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Calendar, Target, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import ScrambleIn, { ScrambleInHandle } from '@/components/ui/scramble-in';
import type { AnalysisResult } from '@/lib/uxAnalyzer';

interface SaasAnalysisTableProps {
  results: AnalysisResult[];
  language: 'en' | 'ar';
}

const SaasAnalysisTable = ({ results, language }: SaasAnalysisTableProps) => {
  const scrambleRefs = useRef<(ScrambleInHandle | null)[]>([]);

  useEffect(() => {
    // Start scramble animation for all text elements with staggered delay
    results.forEach((_, resultIndex) => {
      const baseDelay = resultIndex * 200; // Delay between results

      // Start animations for each text element in this result
      for (let i = 0; i < 8; i++) {
        const delay = baseDelay + i * 50;
        setTimeout(() => {
          const refIndex = resultIndex * 8 + i;
          scrambleRefs.current[refIndex]?.start();
        }, delay);
      }
    });
  }, [results]);

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return date;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[var(--button-text)] bg-[var(--tertiary)]';
    if (score >= 60) return 'text-[var(--button-text)] bg-[#f59e0b]';
    return 'text-[var(--button-text)] bg-[#ef4444]';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4" />;
    if (score >= 60) return <TrendingUp className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {results.map((result, index) => {
        // Safeguard missing fields with defaults
        const issues = Array.isArray(result.issues) ? result.issues : [];
        const recommendations = Array.isArray(result.recommendations) ? result.recommendations : [];
        const score = typeof result.score === 'number' ? result.score : 0;

        return (
          <Card
            key={result.id || index}
            className="overflow-hidden shadow-lg border-0 bg-[var(--background)]/70 backdrop-blur-sm"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Analysis #{results.length - index}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {formatDate(result.timestamp || '')}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SaaS Concept Overview */}
              <div>
                <h3 className="font-semibold text-[var(--headline)] mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <ScrambleIn
                    ref={(el) => {
                      scrambleRefs.current[index * 8 + 0] = el;
                    }}
                    text="SaaS Concept"
                    scrambleSpeed={25}
                    scrambledLetterCount={3}
                    autoStart={false}
                  />
                </h3>
                <div className="text-sm text-[var(--paragraph)] bg-[var(--secondary)]/10 p-4 rounded-lg leading-relaxed">
                  <ScrambleIn
                    ref={(el) => {
                      scrambleRefs.current[index * 8 + 1] = el;
                    }}
                    text={
                      result.input?.length > 300
                        ? `${result.input.substring(0, 300)}...`
                        : result.input || ''
                    }
                    scrambleSpeed={15}
                    scrambledLetterCount={5}
                    autoStart={false}
                  />
                </div>
              </div>

              {/* Analysis Results Table */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Viability Score */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-[var(--headline)] mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <ScrambleIn
                        ref={(el) => {
                          scrambleRefs.current[index * 8 + 2] = el;
                        }}
                        text="Viability Score"
                        scrambleSpeed={25}
                        scrambledLetterCount={3}
                        autoStart={false}
                      />
                    </h4>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg font-bold text-2xl ${getScoreColor(
                        score,
                      )}`}
                    >
                      {getScoreIcon(score)}
                      <ScrambleIn
                        ref={(el) => {
                          scrambleRefs.current[index * 8 + 3] = el;
                        }}
                        text={`${score}/100`}
                        scrambleSpeed={30}
                        scrambledLetterCount={2}
                        autoStart={false}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Challenges */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-[var(--headline)] mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <ScrambleIn
                        ref={(el) => {
                          scrambleRefs.current[index * 8 + 4] = el;
                        }}
                        text="Key Challenges"
                        scrambleSpeed={25}
                        scrambledLetterCount={3}
                        autoStart={false}
                      />
                    </h4>
                    <ul className="space-y-2 text-sm max-h-32 overflow-y-auto">
                      {issues.length > 0 ? (
                        issues.slice(0, 3).map((issue, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 p-2 bg-[#ef4444]/10 rounded-lg"
                          >
                            <div className="w-1.5 h-1.5 bg-[#ef4444] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-[var(--paragraph)] text-xs">
                              <ScrambleIn
                                ref={(el) => {
                                  scrambleRefs.current[index * 8 + 5 + idx] = el;
                                }}
                                text={issue}
                                scrambleSpeed={20}
                                scrambledLetterCount={4}
                                autoStart={false}
                              />
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-[var(--paragraph)] text-xs italic">
                          No major challenges identified
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-[var(--headline)] mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <ScrambleIn
                        ref={(el) => {
                          scrambleRefs.current[index * 8 + 7] = el;
                        }}
                        text="Recommendations"
                        scrambleSpeed={25}
                        scrambledLetterCount={3}
                        autoStart={false}
                      />
                    </h4>
                    <ul className="space-y-2 text-sm max-h-32 overflow-y-auto">
                      {recommendations.length > 0 ? (
                        recommendations.slice(0, 3).map((rec, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 p-2 bg-[var(--tertiary)]/10 rounded-lg"
                          >
                            <div className="w-1.5 h-1.5 bg-[var(--tertiary)] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-[var(--paragraph)] text-xs">
                              <ScrambleIn
                                text={rec}
                                scrambleSpeed={20}
                                scrambledLetterCount={4}
                                autoStart={false}
                              />
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-[var(--paragraph)] text-xs italic">
                          No specific recommendations
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analysis Table */}
              <div>
                <h4 className="font-semibold text-[var(--headline)] mb-3">Detailed Analysis</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Aspect</TableHead>
                      <TableHead>Assessment</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Market Opportunity</TableCell>
                      <TableCell className="text-sm text-[var(--paragraph)]">
                        {recommendations[0] || 'Strong potential in target market'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={getScoreColor(score)}>{Math.max(70, score - 10)}</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Technical Feasibility</TableCell>
                      <TableCell className="text-sm text-[var(--paragraph)]">
                        {issues[0] || 'Good technical foundation required'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={getScoreColor(score)}>{Math.max(60, score - 20)}</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Competitive Advantage</TableCell>
                      <TableCell className="text-sm text-[var(--paragraph)]">
                        {recommendations[1] || 'Unique value proposition needed'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge className={getScoreColor(score)}>{score}</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SaasAnalysisTable;
