'use client';

import Navbar from '@/components/Navbar';
import SaasAnalysisTable from '@/components/SaasAnalysisTable';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import React from 'react';

const STORAGE_KEY = 'saascanResults';

const HistoryPage = () => {
  const [results, setResults] = React.useState<any[]>([]);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setResults(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
    }
  }, []);

  const handleClear = () => {
    setResults([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleExport = () => {
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
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onExport={handleExport} onClear={handleClear} resultsLength={results.length} />
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: 'var(--background)',
          backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
                            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: '14px 24px',
        }}
        aria-hidden="true"
      />
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
