'use client';

import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SaasAnalysisTable from '../../components/analysis/SaasAnalysisTable';
import Navbar from '../../components/common/Navbar';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { analysisStorage } from '../../lib/analysisStorage';
import type { AnalysisResult } from '../../lib/uxAnalyzer';



const HistoryPage: React.FC = () => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const consent = analysisStorage.getCookieConsent();
    if (consent) {
      const parsed = analysisStorage.getAnalysisHistory();
      if (Array.isArray(parsed)) {
        parsed.sort((a, b) => {
          if (!a.timestamp || !b.timestamp) return 0;
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        // Map AnalysisHistoryItem to AnalysisResult for table compatibility
        setResults(parsed.map(item => ({
          id: item.id,
          input: item.originalIdea,
          score: item.overallScore,
          timestamp: item.timestamp,
          language: item.analysisResults.language,
          // Add more fields as needed for AnalysisResult compatibility
        })));
      }
    } else if (consent === false) {
      setResults([]);
    }
  }, []);

  const handleClear = useCallback(() => {
    setResults([]);
    analysisStorage.clearAnalysisHistory();
  }, []);

  const handleExport = useCallback(() => {
    try {
      const dataStr = JSON.stringify(results, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `saascan-history-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export history:', error);
    }
  }, [results]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onExport={handleExport} onClear={handleClear} resultsLength={results.length} />
      <div
        className="fixed inset-0 -z-10"
        aria-hidden="true"
        style={{
          backgroundColor: 'var(--background)',
          backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: '14px 24px',
        }}
      />

      <main className="container mx-auto  py-8 space-y-8 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[var(--background)]/70 px-0 backdrop-blur-sm border-0 shadow-lg">
            <CardContent>
              {results.length > 0 ? (
                <SaasAnalysisTable results={results} language="en" />
              ) : (
                <div className="text-center py-12 text-[var(--paragraph)]">
                  No analysis history found
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default HistoryPage;
