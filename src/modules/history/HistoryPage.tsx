'use client';

import SaasAnalysisTable from '@/core/components/analysis/SaasAnalysisTable';
import Navbar from '@/core/components/common/Navbar';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent } from '@/core/components/ui/card';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface SaasScanResult {
  [key: string]: unknown;
}

const STORAGE_KEY = 'saascanResults';

const HistoryPage: React.FC = () => {
  const [results, setResults] = useState<SaasScanResult[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setResults(parsed);
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClear = useCallback(() => {
    setResults([]);
    localStorage.removeItem(STORAGE_KEY);
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

      {isMobile && (
        <div className="flex justify-center gap-4 bg-[var(--navbar)] border-b border-[var(--border)] py-2 px-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/">Home</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={results.length === 0}
          >
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            disabled={results.length === 0}
          >
            Clear All
          </Button>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 space-y-8 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-[var(--background)]/70 backdrop-blur-sm border-0 shadow-lg">
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
