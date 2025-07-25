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
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const consent = analysisStorage.getCookieConsent();
    setCookieConsent(consent);
    if (consent === null) setShowDialog(true);
  }, []);

  useEffect(() => {
    if (cookieConsent) {
      const parsed = analysisStorage.getAnalysisHistory();
      if (Array.isArray(parsed)) {
        parsed.sort((a, b) => {
          if (!a.timestamp || !b.timestamp) return 0;
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        setResults(parsed);
      }
    } else if (cookieConsent === false) {
      setResults([]);
    }
  }, [cookieConsent]);

  const handleConsent = (granted: boolean) => {
    analysisStorage.setCookieConsent(granted);
    setCookieConsent(granted);
    setShowDialog(false);
    if (granted) {
      const parsed = analysisStorage.getAnalysisHistory();
      if (Array.isArray(parsed)) {
        parsed.sort((a, b) => {
          if (!a.timestamp || !b.timestamp) return 0;
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
        setResults(parsed);
      }
    } else {
      setResults([]);
    }
  };

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
      {showDialog && (
        <div className="cookie-toast">
          <div className="cookie-toast-title">Allow Cookies?</div>
          <div className="cookie-toast-desc">
            We use browser cookies to save your SaaS analysis history. Do you allow us to store your results in your browser?
          </div>
          <div className="cookie-toast-actions">
            <button className="cookie-toast-btn allow" onClick={() => handleConsent(true)}>
              Allow
            </button>
            <button className="cookie-toast-btn deny" onClick={() => handleConsent(false)}>
              Deny
            </button>
          </div>
        </div>
      )}
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
